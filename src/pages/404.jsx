import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import styles from "@/assets/styles/404.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles["notfound-container"]}>
      {/* Lingkaran dekoratif di background */}
      <div className={styles["circle-bg"]}></div>

      {/* Konten utama */}
      <motion.div
        className={styles["notfound-content"]}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className={styles["notfound-title"]}>404</h1>
        <h2 className={styles["notfound-subtitle"]}>Halaman Tidak Ditemukan</h2>
        <p className={styles["notfound-desc"]}>
          Sepertinya halaman yang kamu cari tidak tersedia atau sudah
          dipindahkan.
        </p>
        <Link href="/" className={styles["btn-home"]}>
          <Home size={20} />
          <span>Kembali ke Beranda</span>
        </Link>
      </motion.div>
    </div>
  );
}
