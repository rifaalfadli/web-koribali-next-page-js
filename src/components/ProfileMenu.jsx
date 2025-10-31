import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import Logout from "./Logout";
import styles from "@/assets/styles/profileMenu.module.css";

export default function ProfileMenu() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [username, setUsername] = useState("");

  // Ambil user berdasarkan ID di cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userCookie = Cookies.get("user");
        if (!userCookie) return;

        const { id } = JSON.parse(userCookie);
        const res = await fetch(`http://localhost:5000/anggota/${id}`);
        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        setUsername(data.fullname);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // Tutup menu saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${styles.profileSection}`)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      className={styles.profileSection}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <img
        src="/images/avatar.svg"
        alt="User"
        className={styles.profileAvatar}
        onClick={() => setShowProfileMenu(!showProfileMenu)}
      />

      {showTooltip && !showProfileMenu && (
        <span className={styles.profileTooltip}>My Account</span>
      )}

      {showProfileMenu && (
        <div className={styles.profilePopup}>
          <img
            src="/images/avatar.svg"
            alt="Profile"
            className={styles.profilePopupImg}
          />
          <p className={styles.profileUsername}>{username || "Loading..."}</p>
          <div className={styles.profilePopupActions}>
            <Link href="/profile" className={styles.profileLink}>
              Profile
            </Link>
            <Logout />
          </div>
        </div>
      )}
    </div>
  );
}
