import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Head from "next/head";
import Hero from "@/components/Hero";
import Breadcrumb from "@/components/Breadcrumb";
import styles from "@/assets/styles/profilePage.module.css";

export default function ProfilePage() {
  // State utama yang menampung data user yang sedang login
  const [user, setUser] = useState(null);
  const [originalUser, setOriginalUser] = useState(null);

  // State untuk menandai apakah dalam mode edit atau tidak
  const [editMode, setEditMode] = useState(false);
  const [allValid, setAllValid] = useState(false);

  // State untuk menampung preview foto baru (base64) dan menampilkan foto penuh
  const [photoState, setPhotoState] = useState({
    preview: null,
    showFull: false,
  });

  // State untuk fokus ke input
  const [lastFocus, setLastFocus] = useState(null);
  const handleFocus = (e) => setLastFocus(e.target.id);

  useEffect(() => {
    if (editMode && lastFocus) {
      setTimeout(() => {
        const input = document.getElementById(lastFocus);
        if (input) input.focus();
      }, 0);
    }
  }, [editMode, user, allValid]);

  // Fungsi untuk toggle foto besar
  const toggleFullImage = () =>
    setPhotoState((prev) => ({ ...prev, showFull: !prev.showFull }));

  // =====================================================
  // Ambil data user yang sedang login dari Cookies
  // =====================================================
  const fetchUser = async () => {
    try {
      // Ambil id dari cookies
      const userCookie = Cookies.get("user");
      if (!userCookie) return;

      const { id } = JSON.parse(userCookie); // ambil id-nya

      // Ambil data user sesuai id dari server
      const res = await fetch(`http://localhost:5000/anggota/${id}`);
      if (!res.ok) throw new Error("Failed to fetch user data");

      const data = await res.json();
      // Set data user ke state
      setUser(data);
      setOriginalUser(data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  // Jalankan `fetchUser` hanya saat komponen pertama kali dirender
  useEffect(() => {
    fetchUser();
  }, []);

  // Validation schema using Yup
  const ProfileSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, "Too Short!") // Minimal 2 karakter
      .max(50, "Too Long!") // Maksimal 50 karakter
      .required("Name is required"), // Wajib diisi
    email: Yup.string()
      .email("Invalid Email") // Format email harus valid
      .required("Email is required"), // Wajib diisi
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits") // hanya angka
      .min(10, "Phone number must be at least 10 digits") // minimal 10 angka (opsional)
      .max(15, "Phone number can't be longer than 15 digits") // maksimal 15 angka (opsional)
      .required("Phone Number is required"), // Wajib diisi
    photo: Yup.mixed().test(
      "fileSize",
      "File too large (max 2MB)",
      (value) => !value || (value && value.size <= 2000000)
    ),
  });

  // =====================================================
  // Handle saat user memilih foto baru (preview sebelum disimpan)
  // =====================================================
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0]; // ambil file pertama
    if (!file) return;
    const reader = new FileReader(); // baca file sebagai base64
    reader.onloadend = () =>
      setPhotoState((prev) => ({ ...prev, preview: reader.result }));
    reader.readAsDataURL(file); // convert ke base64 string
  };

  // =====================================================
  // Simpan perubahan user ke database
  // =====================================================
  const handleSave = async (updatedUser) => {
    if (!updatedUser) return;

    try {
      // Gabungkan field lama (user) dengan yang baru (updatedUser)
      const mergedUser = { ...user, ...updatedUser };

      const res = await fetch(
        `http://localhost:5000/anggota/${mergedUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mergedUser), // kirim data lengkap
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        alert("Failed to update profile! Server said: " + errorText);
        return;
      }

      const savedUser = await res.json();
      setUser(savedUser);
      setOriginalUser(savedUser);
      setEditMode(false);
      setPhotoState((prev) => ({ ...prev, preview: null }));

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Error updating profile!");
    } finally {
      setEditMode(false);
    }
  };

  // Tampilkan pesan loading jika data belum tersedia
  if (!user)
    return <div className={styles["profile-loading"]}>Loading profile...</div>;

  // Komponen input reusable
  const InputField = ({
    name,
    label,
    readOnly,
    values,
    errors,
    touched,
    originalUser,
  }) => {
    const originalValue = originalUser?.[name] ?? "";
    const currentValue = values?.[name] ?? "";
    const isChanged = currentValue !== originalValue;

    let stateColor = "null";
    if (isChanged && errors[name]) stateColor = "red";
    else if (isChanged && !errors[name]) stateColor = "green";

    return (
      <div className={clsx(styles["form-group"], styles["info-row"])}>
        <Field name={name}>
          {({ field, meta }) => (
            <div
              className={`${styles["form-group"]} ${
                meta.touched && meta.error ? styles["shake"] : ""
              }`}
            >
              <label>{label}</label>
              <input
                {...field}
                id={name}
                readOnly={readOnly}
                onFocus={handleFocus}
                className={clsx(
                  styles["input-field"],
                  stateColor === "green" && styles["input-green"],
                  stateColor === "red" && styles["input-error"]
                )}
              />

              <div className={styles["error-container"]}>
                <ErrorMessage
                  name={name}
                  component="div"
                  className={styles["error-text"]}
                />
              </div>
            </div>
          )}
        </Field>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Profil Pengguna - CV. KORI BALI</title>
        <meta
          name="description"
          content="Halaman profil pengguna CV. KORI BALI untuk melihat dan mengedit data pribadi akun Anda."
        />
      </Head>

      <Hero title="My Profile" />
      <Breadcrumb page="Profile" />

      <div className={styles["profile-container"]}>
        <div
          className={`${styles["profile-card"]} ${
            editMode ? styles["profile-card-edit"] : ""
          } ${
            allValid === "green"
              ? styles["profile-card-valid"]
              : allValid === "red"
              ? styles["profile-card-error"]
              : ""
          }`}
        >
          <div className={styles["profile-photo-section"]}>
            <img
              src={photoState.preview || user.photo || "/images/avatar.svg"}
              alt="Profile"
              className={styles["profile-photo"]}
              onClick={toggleFullImage}
              style={{ cursor: "pointer" }}
            />
            {editMode && (
              <label className={styles["photo-upload-btn"]}>
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </label>
            )}
          </div>

          <Formik
            enableReinitialize
            initialValues={{
              id: user.id,
              fullname: user.fullname || "",
              email: user.email || "",
              phoneNumber: user.phoneNumber || "",
            }}
            validationSchema={ProfileSchema}
            onSubmit={(values) => handleSave(values)}
          >
            {({ values, errors, touched, isValid, dirty, resetForm }) => {
              const hasChanges =
                JSON.stringify(values) !==
                JSON.stringify({
                  id: user.id,
                  fullname: user.fullname || "",
                  email: user.email || "",
                  phoneNumber: user.phoneNumber || "",
                });

              useEffect(() => {
                if (!editMode) return setAllValid(false);
                if (!hasChanges) setAllValid("blue");
                else if (Object.keys(errors).length > 0) setAllValid("red");
                else setAllValid("green");
              }, [values, errors, editMode]);

              return (
                <Form className={styles["profile-info"]}>
                  <InputField
                    name="fullname"
                    label="Name:"
                    readOnly={!editMode}
                    values={values}
                    errors={errors}
                    touched={touched}
                    originalUser={originalUser}
                  />
                  <InputField
                    name="email"
                    label="Email:"
                    readOnly={!editMode}
                    values={values}
                    errors={errors}
                    touched={touched}
                    originalUser={originalUser}
                  />
                  <InputField
                    name="phoneNumber"
                    label="Phone Number:"
                    readOnly={!editMode}
                    values={values}
                    errors={errors}
                    touched={touched}
                    originalUser={originalUser}
                  />

                  <div className={styles["profile-buttons"]}>
                    {editMode ? (
                      <>
                        <button
                          type="button"
                          className={clsx(
                            styles["btn-cancel"],
                            styles["button-profile"]
                          )}
                          onClick={(e) => {
                            e.preventDefault();
                            setUser(originalUser);
                            setEditMode(false);
                            setPhotoState((prev) => ({
                              ...prev,
                              preview: null,
                            }));
                            resetForm({ values: originalUser });
                            setAllValid(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className={clsx(
                            styles["btn-save"],
                            styles["button-profile"]
                          )}
                          disabled={!isValid || !dirty}
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className={clsx(
                          styles["btn-edit"],
                          styles["button-profile"]
                        )}
                        onClick={() => {
                          setOriginalUser(user);
                          setEditMode(true);
                        }}
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>

      {photoState.showFull && (
        <div className={styles["image-overlay"]} onClick={toggleFullImage}>
          <div className={styles["image-popup"]}>
            <img
              src={photoState.preview || user.photo || "/images/avatar.svg"}
              alt="Full Profile"
              className={styles["image-full"]}
            />
          </div>
        </div>
      )}
    </>
  );
}
