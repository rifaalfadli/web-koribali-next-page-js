import { Field, Formik, Form, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/router";
import { Eye, EyeOff } from "lucide-react";
import Head from "next/head";
import styles from "@/assets/styles/registerLogin.module.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Validation schema using Yup
  const RegisterSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number can't be longer than 15 digits")
      .required("Phone Number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Min 8 chars")
      .matches(/[a-z]/, "Must contain lowercase")
      .matches(/[A-Z]/, "Must contain uppercase")
      .matches(/\d/, "Must contain number"),
  });

  const handleRegister = async (item, { resetForm }) => {
    try {
      const checkResponse = await fetch("http://localhost:5000/anggota");
      const users = await checkResponse.json();

      const isDuplicate = users.some(
        (user) =>
          user.fullname.toLowerCase() === item.fullname.toLowerCase() ||
          user.email.toLowerCase() === item.email.toLowerCase() ||
          user.phoneNumber.toLowerCase() === item.phoneNumber.toLowerCase()
      );

      if (isDuplicate) {
        alert("Name, email, or phone number already exists!");
        return;
      }

      const response = await fetch("http://localhost:5000/anggota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: item.fullname,
          email: item.email,
          phoneNumber: item.phoneNumber,
          password: item.password,
        }),
      });

      if (!response.ok) throw new Error("Failed to register");

      const data = await response.json();
      alert("Register successful! Please log in");
      console.log("Register success:", data);

      resetForm();
      router.push("/login");
    } catch (error) {
      console.error("Register failed:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <>
      <Head>
        <title>Register - CV. KORI BALI</title>
        <meta name="description" content="Register Page CV. KORI BALI" />
      </Head>
      <div className={styles["begin-page"]}>
        <div className={styles["begin-card"]}>
          <h1 className={styles["begin-title"]}>Create Your Account</h1>
          <Formik
            initialValues={{
              fullname: "",
              email: "",
              phoneNumber: "",
              password: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegister}
          >
            <Form className={styles["register-form"]}>
              {/* Fullname Field */}
              <div className={styles["form-group"]}>
                <Field name="fullname">
                  {({ field, meta }) => (
                    <div
                      className={`${styles["form-group"]} ${
                        meta.touched && meta.error ? styles["shake"] : ""
                      }`}
                    >
                      <input
                        {...field}
                        id="fullname"
                        placeholder="Name"
                        className={`${styles["input-field"]} ${
                          meta.touched && meta.error
                            ? styles["input-error"]
                            : ""
                        }`}
                      />
                      <div className={styles["error-container"]}>
                        <ErrorMessage
                          name="fullname"
                          component="div"
                          className={styles["error-text"]}
                        />
                      </div>
                    </div>
                  )}
                </Field>
              </div>

              {/* Email Field */}
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

              {/* Phone Number Field */}
              <div className={styles["form-group"]}>
                <Field name="phoneNumber">
                  {({ field, meta }) => (
                    <div
                      className={`${styles["form-group"]} ${
                        meta.touched && meta.error ? styles["shake"] : ""
                      }`}
                    >
                      <input
                        {...field}
                        id="phoneNumber"
                        placeholder="Phone Number"
                        className={`${styles["input-field"]} ${
                          meta.touched && meta.error
                            ? styles["input-error"]
                            : ""
                        }`}
                      />
                      <div className={styles["error-container"]}>
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className={styles["error-text"]}
                        />
                      </div>
                    </div>
                  )}
                </Field>
              </div>

              {/* Password Field */}
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

              {/* Submit Button */}
              <button type="submit" className={styles["submit-btn"]}>
                Register
              </button>

              <p className={styles["text"]}>
                <Link href="/">Already have an account? Log in here</Link>.
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Register;
