import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { MapEmbed } from "@/components/shared/MapEmbed";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import styles from "@/assets/styles/registerLogin.module.css";

export const ContactForm = () => {
  // State untuk pesan sukses/error
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    telephone: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("*Nama wajib diisi"),
    email: Yup.string()
      .email("*Email tidak valid")
      .required("*Email wajib diisi"),
    telephone: Yup.number()
      .typeError("*Nomor telepon hanya boleh berisi angka")
      .required("*Nomor telepon wajib diisi"),
    message: Yup.string()
      .required("*Pesan wajib diisi")
      .max(500, "*Max 500 characters"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Tambahkan data waktu kirim
      const now = new Date();
      const timestamp = now.toLocaleString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      // const timestamp = new Date().toISOString(); // opsi 2

      // Gabungkan ke data yang dikirim
      const payload = { ...values, timestamp };

      const response = await fetch("http://localhost:5000/pesan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);

        setMessageType("error");
        setMessage("Failed to update profile! Server said: " + errorText);
        return;
      }

      const data = await response.json();
      console.log("Pesan terkirim:", data);

      resetForm();
      setMessageType("success");
      // Tampilkan pop-up success
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 1000);
      // alert(
      //   "Pesan Anda berhasil dikirim! Terima kasih telah menghubungi kami."
      // );
    } catch (err) {
      console.error("Gagal mengirim pesan:", err);
      setMessageType("error");
      setMessage("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
    }
  };

  const closeMessage = () => {
    setMessage(null);
  };

  return (
    <>
      {showPopup && (
        <div className={styles["popup-overlay"]}>
          <div className={styles["popup-box"]}>
            <CheckCircle size={40} color="#2e7d32" />
            <p>Profile updated successfully!</p>
          </div>
        </div>
      )}
      <section className="form-area container">
        <h2>Hubungi Kami</h2>
        <div className="form-kontak">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className={styles["contact-form"]}>
                {/* Name Field */}
                <div className={styles["form-group"]}>
                  {/* Kotak pesan notifikasi */}
                  {message && messageType === "error" && (
                    <div
                      className={`${styles["message-box"]} ${styles["message-error"]}`}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <AlertCircle size={20} />
                        <span>{message}</span>
                      </div>
                      <button
                        className={styles["message-close"]}
                        onClick={closeMessage}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                  <label htmlFor="name">Nama:</label>
                  <Field name="name">
                    {({ field, meta }) => (
                      <div
                        className={`${styles["form-group"]} ${
                          meta.touched && meta.error ? styles["shake"] : ""
                        }`}
                      >
                        <input
                          {...field}
                          id="name"
                          placeholder="Masukkan Nama Anda"
                          className={`form-control ${
                            meta.touched && meta.error
                              ? styles["input-error"]
                              : ""
                          }`}
                        />
                        <div className={styles["error-container"]}>
                          <ErrorMessage
                            name="name"
                            component="div"
                            className={styles["error-text"]}
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                </div>

                <div className="form-row">
                  {/* Email Field */}
                  <div className={styles["form-group"]}>
                    <label htmlFor="email">Email:</label>
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
                            placeholder="Masukkan Email Anda"
                            className={`form-control ${
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

                  {/* Telephone Field */}
                  <div className={styles["form-group"]}>
                    <label htmlFor="telephone">No Telepon:</label>
                    <Field name="telephone">
                      {({ field, meta }) => (
                        <div
                          className={`${styles["form-group"]} ${
                            meta.touched && meta.error ? styles["shake"] : ""
                          }`}
                        >
                          <input
                            {...field}
                            id="telephone"
                            placeholder="Masukkan Nomor Telepon Anda"
                            className={`form-control ${
                              meta.touched && meta.error
                                ? styles["input-error"]
                                : ""
                            }`}
                          />
                          <div className={styles["error-container"]}>
                            <ErrorMessage
                              name="telephone"
                              component="div"
                              className={styles["error-text"]}
                            />
                          </div>
                        </div>
                      )}
                    </Field>
                  </div>
                </div>

                {/* Message Field */}
                <div className={styles["form-group"]}>
                  <label htmlFor="message">Pesan:</label>
                  <Field name="message">
                    {({ field, meta }) => (
                      <div
                        className={`${styles["form-group"]} ${
                          meta.touched && meta.error ? styles["shake"] : ""
                        }`}
                      >
                        <textarea
                          {...field}
                          id="message"
                          placeholder="Masukkan Pesan Anda"
                          rows="5"
                          className={`form-control ${
                            meta.touched && meta.error
                              ? styles["input-error"]
                              : ""
                          }`}
                        />
                        <div className={styles["error-container"]}>
                          <ErrorMessage
                            name="message"
                            component="div"
                            className={styles["error-text"]}
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                </div>

                <div>
                  <button type="submit" className="btn-form">
                    Kirim
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <MapEmbed />
        </div>
      </section>
    </>
  );
};
