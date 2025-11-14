import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import MainHero from "@/components/MainHero";
import PageTransition from "@/components/shared/Transition";
import GaleriSection from "@/components/GaleriSection";

export default function Beranda() {
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const shouldShow = sessionStorage.getItem("showTransition");
    if (shouldShow === "true") {
      setShowTransition(true);
      sessionStorage.removeItem("showTransition"); // hapus supaya nggak muncul lagi
      const timer = setTimeout(() => setShowTransition(false), 1200);
      return () => clearTimeout(timer);
    }
  }, []);
  return (
    <div className="page-wrapper">
      {/* Tampilkan animasi di atas semua */}
      {showTransition &&
        typeof document !== "undefined" &&
        createPortal(<PageTransition />, document.body)}

      <MainHero />
      <main>
        {/* Tentang */}
        <section id="tentang" className="main-tentang">
          <div className="main-tentang-container">
            <h2>Tentang Kami</h2>
            <p>
              <strong>CV. KORI BALI</strong> adalah kantor cabang dan pusat
              pendukung dari perusahaan utama di Jepang, Yoshimoto Pole. Sejak
              berdiri, kami terlibat dalam berbagai proyek teknik dan struktur
              sesuai kebutuhan mitra di Jepang.
            </p>
            <p>
              Layanan kami mencakup kalkulasi beban tetap, angin, dan gempa,
              serta perhitungan kabel, tiang, arm, dan area struktur. Hasil
              analisis disajikan dalam laporan teknis lengkap beserta gambar 2D{" "}
              <i>(AutoCAD)</i> dan 3D <i>(Autodesk Inventor)</i>. Untuk
              efisiensi, kami juga membangun sistem kalkulasi berbasis{" "}
              <abbr title="Visual Basic for Applications">VBA</abbr> di{" "}
              <i>Excel</i> agar lebih cepat dan akurat.
            </p>
          </div>
        </section>

        {/* Layanan */}
        <section id="layanan" className="main-layanan">
          <div className="container">
            <h2>Layanan Utama</h2>
            {[
              {
                title: "Kalkulasi Teknis",
                desc: "Kalkulasi struktur tiang dan beban secara presisi.",
              },
              {
                title: "Pemodelan Gambar",
                desc: "Pemodelan 2D (AutoCAD) & 3D (Inventor) yang detail.",
              },
              {
                title: "Sistem VBA Excel",
                desc: "Automasi sistem kalkulasi dengan VBA berbasis Excel.",
              },
              {
                title: "Laporan Teknik",
                desc: "Laporan profesional lengkap dengan visualisasi hasil.",
              },
              {
                title: "Rendering 3D",
                desc: "Visualisasi 3D realistis untuk gambaran proyek.",
              },
            ].map((item, i) => (
              <div key={i} className="daftar-layanan">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Proyek */}
        <section id="proyek" className="main-proyek">
          <div className="container">
            <h2>Proyek Unggulan</h2>
            <div className="main-proyek-container">
              {[
                {
                  href: "/proyek/proyek-3D",
                  img: "/images/gambar6.jpg",
                  title: "Pemodelan 3D",
                  desc: "Pemodelan struktur tiang dan sambungan menggunakan software 3D untuk kebutuhan visualisasi dan fabrikasi.",
                },
                {
                  href: "/proyek/proyek-2D",
                  img: "/images/gambar2.jpg",
                  title: "Pemodelan 2D",
                  desc: "Pembuatan gambar teknik detail seperti potongan, tampak, dan denah sebagai acuan produksi.",
                },
                {
                  href: "/proyek/proyek-VBA",
                  img: "/images/gambar25.PNG",
                  title: "Sistem Kalkulasi VBA",
                  desc: "Sistem otomatisasi perhitungan teknis berbasis Excel VBA untuk validasi kekuatan dan efisiensi.",
                },
                {
                  href: "/proyek/proyek-rendering",
                  img: "/images/gambar9.jpg",
                  title: "Rendering",
                  desc: "Visualisasi akhir proyek dalam bentuk render 3D untuk presentasi dan dokumentasi klien.",
                },
              ].map((item, i) => (
                <article key={i} className="card-proyek">
                  <Link href={item.href}>
                    <div className="image-frame">
                      <img src={item.img} alt={item.title} width="300" />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </Link>
                </article>
              ))}
            </div>
            <div className="position-btn-proyek">
              <Link href="/proyek" className="btn">
                Lihat Proyek Lainnya
              </Link>
            </div>
          </div>
        </section>

        {/* Galeri */}
        <GaleriSection />

        {/* Kontak */}
        <section id="kontak" className="main-kontak">
          <div className="main-kontak-container">
            <h2>Jangan ragu untuk menghubungi Kami</h2>
            <p>
              Jika Anda membutuhkan dukungan teknis atau ingin menjalin kerja
              sama, kami siap membantu Anda dengan solusi terbaik.
            </p>
            <Link href="/kontak" className="btn">
              Hubungi Kami
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
