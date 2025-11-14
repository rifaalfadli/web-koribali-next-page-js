import { Formik, Form, Field, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { Eye, EyeOff, X, CheckCircle, AlertCircle } from "lucide-react";
import Head from "next/head";
import styles from "@/assets/styles/registerLogin.module.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null); // untuk pesan sukses/error
  const [messageType, setMessageType] = useState(""); // "success" atau "error"
  const router = useRouter();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("*Invalid Email").required("*Email is required"),
    password: Yup.string().required("*Password is required"),
  });

  const handleLogin = async (values, { resetForm }) => {
    try {
      const res = await fetch("http://localhost:5000/anggota");
      const users = await res.json();

      const foundUser = users.find(
        (u) =>
          u.email === values.email.trim() &&
          u.password === values.password.trim()
      );

      if (foundUser) {
        setMessageType("success");
        setMessage("Login successful!");
        Cookies.set("user", JSON.stringify({ id: foundUser.id }), {
          expires: 1,
        });
        sessionStorage.setItem("showTransition", "true");

        resetForm();

        // Redirect setelah 2 detik agar user sempat lihat pesan
        setTimeout(() => router.push("/"), 2000);
      } else {
        setMessageType("error");
        setMessage("Email or password is incorrect!");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessageType("error");
      setMessage("An error occurred during login.");
    }
  };

  const closeMessage = () => {
    setMessage(null);
  };

  return (
    <>
      <Head>
        <title>Login - CV. KORI BALI</title>
        <meta name="description" content="Login Page CV. KORI BALI" />
      </Head>
      <div className={styles["begin-page"]}>
        <div className={styles["begin-card"]}>
          <h1 className={styles["begin-title"]}>Welcome Back!</h1>

          {/* Kotak pesan notifikasi */}
          {message && (
            <div
              className={`${styles["message-box"]} ${
                messageType === "error"
                  ? styles["message-error"]
                  : styles["message-success"]
              }`}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {messageType === "error" && <AlertCircle size={20} />}
                <span>{message}</span>
              </div>

              {messageType === "error" ? (
                <button
                  className={styles["message-close"]}
                  onClick={closeMessage}
                >
                  <X size={20} />
                </button>
              ) : (
                <CheckCircle size={20} />
              )}
            </div>
          )}

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className={styles["register-form"]}>
                {/* Email */}
                <div className={styles["form-group"]}>
                  <Field name="email">
                    {({ field, meta }) => (
                      <div
                        className={`${styles["form-group"]} ${
                          meta.touched && meta.error ? styles["shake"] : ""
                        }`}
                      >
                        <input
                          {...field}
                          id="email"
                          placeholder="Email"
                          className={`${styles["input-field"]} ${
                            meta.touched && meta.error
                              ? styles["input-error"]
                              : ""
                          }`}
                        />
                        <div className={styles["error-container"]}>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className={styles["error-text"]}
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                </div>

                {/* Password */}
                <div
                  className={`${styles["form-group"]} ${styles["password-group"]}`}
                >
                  <Field name="password">
                    {({ field, meta }) => (
                      <div
                        className={`${styles["form-group"]} ${
                          styles["password-group"]
                        } ${meta.touched && meta.error ? styles["shake"] : ""}`}
                      >
                        <div className={styles["password-wrapper"]}>
                          <input
                            {...field}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className={`${styles["input-field"]} ${
                              styles["password-input"]
                            } ${
                              meta.touched && meta.error
                                ? styles["input-error"]
                                : ""
                            }`}
                          />
                          <span
                            className={styles["eye-icon"]}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff size={25} />
                            ) : (
                              <Eye size={25} />
                            )}
                          </span>
                        </div>
                        <div className={styles["error-container"]}>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className={styles["error-text"]}
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles["submit-btn"]}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>

                <p className={styles["text"]}>
                  <Link href="/register">
                    Don't have an account? Register here
                  </Link>
                  .
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
