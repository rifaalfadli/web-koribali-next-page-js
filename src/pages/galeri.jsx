import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import Hero from "@/components/Hero";

export default function Galeri() {
  const galeriRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [fullImage, setFullImage] = useState(false);

  const images = [
    { src: "/images/gambar14.PNG", caption: "Tiang lampu jalan" },
    { src: "/images/gambar15.PNG", caption: "Tiang lampu jalan" },
    { src: "/images/gambar16.PNG", caption: "Tiang lampu jalan" },
    { src: "/images/gambar17.PNG", caption: "Tiang lampu jalan" },
    { src: "/images/gambar18.PNG", caption: "Tiang lampu jalan" },
    { src: "/images/gambar19.PNG", caption: "Tiang lampu jalan" },
    { src: "/images/gambar20.PNG", caption: "Tiang lampu sorot" },
    { src: "/images/gambar21.PNG", caption: "Tiang lampu sorot" },
    { src: "/images/gambar22.PNG", caption: "Tiang lampu sorot" },
  ];

  const scrollLeft = () =>
    galeriRef.current.scrollBy({ left: -350, behavior: "smooth" });
  const scrollRight = () =>
    galeriRef.current.scrollBy({ left: 350, behavior: "smooth" });

  useEffect(() => {
    const container = galeriRef.current;
    const handleScroll = () => {
      const scrollPos = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const index = Math.round((scrollPos / maxScroll) * (images.length - 1));
      setScrollIndex(index);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [images.length]);

  const isAtStart = scrollIndex === 0;
  const isAtEnd = scrollIndex === images.length - 1;

  return (
    <div className="page-wrapper">
      <Head>
        <title>Galeri Produk - CV. KORI BALI</title>
        <meta
          name="description"
          content="Lihat hasil pekerjaan CV. KORI BALI dalam bentuk foto dan dokumentasi proyek dari berbagai divisi."
        />
      </Head>

      <Hero title="Galeri Produk" />
      <Breadcrumb page="Galeri" />

      <main>
        <section id="galeri-preview" className="carousel-container">
          <div className="carousel container" ref={galeriRef}>
            {images.map((img, i) => (
              <figure className="card" key={i}>
                <img
                  src={img.src}
                  alt={img.caption}
                  onClick={() => setFullImage(img.src)}
                  style={{ cursor: "pointer" }}
                />
                <figcaption>{img.caption}</figcaption>
              </figure>
            ))}
          </div>

          {/* Tombol kiri & kanan */}
          <button
            className={`scroll-btn-galeri left-galeri ${
              isAtStart ? "disabled" : ""
            }`}
            onClick={scrollLeft}
            disabled={isAtStart}
          >
            <ChevronLeft size={28} />
          </button>
          <button
            className={`scroll-btn-galeri right-galeri ${
              isAtEnd ? "disabled" : ""
            }`}
            onClick={scrollRight}
            disabled={isAtEnd}
          >
            <ChevronRight size={28} />
          </button>

          {/* Dot indikator */}
          <div className="indicator-dots-galeri">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot-galeri ${
                  index === scrollIndex ? "active" : ""
                }`}
                onClick={() => {
                  const container = galeriRef.current;
                  const scrollAmount =
                    (container.scrollWidth - container.clientWidth) *
                    (index / (images.length - 1));
                  container.scrollTo({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }}
              ></span>
            ))}
          </div>
        </section>
      </main>

      {/* Overlay Gambar Full */}
      {fullImage && (
        <div className="image-overlay" onClick={() => setFullImage(null)}>
          <div className="image-popup">
            <img src={fullImage} alt="Full View" className="image-full" />
          </div>
        </div>
      )}
    </div>
  );
}
