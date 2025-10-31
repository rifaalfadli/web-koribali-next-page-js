import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "@/assets/styles/registerLogin.module.css";

export const ContactForm = () => {
  const initialValues = {
    name: "",
    email: "",
    telephone: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Nama wajib diisi"),
    email: Yup.string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    telephone: Yup.number()
      .typeError("Nomor telepon hanya boleh berisi angka")
      .required("Nomor telepon wajib diisi"),
    message: Yup.string().required("Pesan wajib diisi"),
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
        throw new Error("Gagal mengirim pesan");
      }

      const data = await response.json();
      console.log("Pesan terkirim:", data);

      alert(
        "Pesan Anda berhasil dikirim! Terima kasih telah menghubungi kami."
      );
      resetForm();
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      alert("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={styles["contact-form"]}>
          {/* Name Field */}
          <div className={styles["form-group"]}>
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
                      meta.touched && meta.error ? styles["input-error"] : ""
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
                        meta.touched && meta.error ? styles["input-error"] : ""
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
                        meta.touched && meta.error ? styles["input-error"] : ""
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
                      meta.touched && meta.error ? styles["input-error"] : ""
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
  );
};
