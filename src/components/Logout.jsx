import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import styles from "@/assets/styles/logout.module.css";

const Logout = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  function handleLogout() {
    Cookies.remove("user"); // hapus cookie
    router.push("/login"); // redirect ke login
  }

  return (
    <>
      <a onClick={() => setShowModal(true)} className={styles.logoutLink}>
        Logout
      </a>

      {showModal && (
        <div className={styles.logoutOverlay}>
          <div className={styles.logoutModal}>
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out of your account?</p>
            <div className={styles.logoutButtons}>
              <button
                className={styles.btnCancel}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className={styles.btnLogout} onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
