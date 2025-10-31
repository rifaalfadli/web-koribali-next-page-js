import { useEffect, useState } from "react";
import styles from "@/assets/styles/transition.module.css";

const PageTransition = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Jalankan animasi buka tirai
    const timer = setTimeout(() => setActive(true), 100);
    return () => clearTimeout(timer); // bersihkan timer saat unmount
  }, []);

  return (
    <div className={`${styles.pageTransition} ${active ? styles.active : ""}`}>
      <div className={styles.transitionTop}></div>
      <div className={styles.transitionBottom}></div>
    </div>
  );
};

export default PageTransition;
