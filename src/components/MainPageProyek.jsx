import { motion } from "framer-motion";
import { useState } from "react";
import {
  Image,
  Box,
  FileText,
  Calculator,
  ArrowRight,
  Eye,
} from "lucide-react";
import { Sidebar } from "./Sidebar";

export function MainPage() {
  const [fullImage, setFullImage] = useState(false);

  const sections = [
    {
      id: "rendering",
      title: "Rendering Proyek",
      icon: <Image className="icon-proyek" />,
      color: "blue",
      projects: [
        {
          title: "Rendering dan Visualisasi",
          img: "/images/gambar9.jpg",
          desc: "Visualisasi akhir proyek dalam bentuk render 3D untuk presentasi dan dokumentasi klien.",
        },
        {
          title: "Rendering Arsitektur",
          img: "/images/gambar11.jpg",
          desc: "Visualisasi akhir proyek dalam bentuk render 3D untuk presentasi dan dokumentasi klien.",
        },
        {
          title: "Rendering Interior",
          img: "/images/gambar12.jpg",
          desc: "Visualisasi akhir proyek dalam bentuk render 3D untuk presentasi dan dokumentasi klien.",
        },
      ],
      link: "/proyek/proyek-rendering",
    },
    {
      id: "pemodelan-3d",
      title: "Pemodelan 3D",
      icon: <Box className="icon-proyek" />,
      color: "purple",
      projects: [
        {
          title: "Pemodelan 3D Struktur",
          img: "/images/gambar5.jpg",
          desc: "Pemodelan struktur tiang dan sambungan menggunakan software 3D.",
        },
        {
          title: "Pemodelan Detail",
          img: "/images/gambar6.jpg",
          desc: "Pemodelan struktur tiang dan sambungan menggunakan software 3D.",
        },
        {
          title: "Pemodelan Fabrikasi",
          img: "/images/gambar7.jpg",
          desc: "Pemodelan struktur tiang dan sambungan menggunakan software 3D.",
        },
      ],
      link: "/proyek/proyek-3D",
    },
    {
      id: "gambar-2d",
      title: "Gambar Teknik 2D",
      icon: <FileText className="icon-proyek" />,
      color: "green",
      projects: [
        {
          title: "Pemodelan 2D Gambar Teknik",
          img: "/images/gambar1.jpg",
          desc: "Pembuatan gambar teknik detail seperti potongan dan denah.",
        },
        {
          title: "Pemodelan 2D Detail",
          img: "/images/gambar2.jpg",
          desc: "Pembuatan gambar teknik detail seperti potongan dan denah.",
        },
        {
          title: "Pemodelan 2D Akurat",
          img: "/images/gambar3.jpg",
          desc: "Pembuatan gambar teknik detail seperti potongan dan denah.",
        },
      ],
      link: "/proyek/proyek-2D",
    },
    {
      id: "vba",
      title: "Perhitungan Kalkulasi Menggunakan VBA",
      icon: <Calculator className="icon-proyek" />,
      color: "orange",
      projects: [
        {
          title: "Sistem Kalkulasi Otomatis VBA",
          img: "/images/gambar25.PNG",
          desc: "Sistem otomatisasi perhitungan teknis berbasis Excel VBA.",
        },
        {
          title: "Tool Perhitungan",
          img: "/images/gambar25.PNG",
          desc: "Sistem otomatisasi perhitungan teknis berbasis Excel VBA.",
        },
        {
          title: "Kalkulator Engineering",
          img: "/images/gambar25.PNG",
          desc: "Sistem otomatisasi perhitungan teknis berbasis Excel VBA.",
        },
      ],
      link: "/proyek/proyek-VBA",
    },
  ];

  const getCategoryLabel = (title) => {
    if (title.includes("Rendering")) {
      return "3D Rendering";
    } else if (title.includes("Pemodelan")) {
      return "3D Modeling";
    } else if (title.includes("Gambar")) {
      return "2D Drawing";
    } else if (title.includes("VBA")) {
      return "Kalkulasi VBA";
    } else {
      return "Proyek";
    }
  };

  return (
    <>
      <main className="main-page-proyek">
        <div className="container-page-proyek container">
          <Sidebar />
          <div className="content-page-proyek">
            {sections.map((section, i) => (
              <section key={i} id={section.id} className="section-page-proyek">
                <div className="section-header-page-proyek">
                  <div className="info-type-project">
                    <div
                      className={`icon-wrapper-page-proyek ${section.color}`}
                    >
                      {section.icon}
                    </div>
                    <div className="section-text-page-proyek">
                      <h2>{section.title}</h2>
                      <p>
                        {section.projects.length}{" "}
                        {section.projects.length > 1
                          ? "Proyek Tersedia"
                          : "Proyek Tersedia"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <a href={section.link} className="see-more-page-proyek">
                      Lihat semua proyek{" "}
                      <ArrowRight className="arrow-page-proyek" />
                    </a>
                  </div>
                </div>

                <div className="grid-page-proyek">
                  {section.projects.map((p, j) => (
                    <motion.article
                      key={j}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: j * 0.1 }}
                      className="card-page-proyek"
                    >
                      <div className="image-wrapper-page-proyek">
                        <img
                          src={p.img}
                          alt={p.title}
                          className="image-page-proyek"
                        />

                        {/* Kategori di kiri atas */}
                        <div className="category-label">
                          {getCategoryLabel(section.title)}
                        </div>

                        {/* Icon mata kanan atas */}
                        <div className="overlay-page-proyek">
                          <Eye
                            className="eye-icon-page-proyek"
                            onClick={() => setFullImage(p.img)}
                          />
                        </div>
                      </div>

                      <div className="content-page-proyek">
                        <h3>{p.title}</h3>
                        <p>{p.desc}</p>
                        {/* Tombol Lihat Detail */}
                        <a href={section.link} className="card-detail-link">
                          Lihat Detail{" "}
                          <ArrowRight className="card-detail-arrow" />
                        </a>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      {/* Overlay Gambar Full */}
      {fullImage && (
        <div className="image-overlay" onClick={() => setFullImage(null)}>
          <div className="image-popup">
            <img src={fullImage} alt="Full View" className="image-full" />
          </div>
        </div>
      )}
    </>
  );
}
