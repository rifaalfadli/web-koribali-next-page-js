import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import Hero from "@/components/Hero";

export default function Galeri() {
  return (
    <>
      <Head>
        <title>Galery Preview - CV. KORI BALI</title>
        <meta
          name="description"
          content="Lihat hasil pekerjaan CV. KORI BALI dalam bentuk foto dan dokumentasi proyek dari berbagai divisi."
        />
      </Head>

      <Hero title="Galery Preview" />
      <Breadcrumb page="Galeri" />

      <main>
        <section id="galeri-preview" className="carousel-container">
          <div className="carousel container">
            <figure className="card">
              <img src="/images/gambar14.PNG" alt="Tiang lampu jalan" />
              <figcaption>Tiang lampu jalan</figcaption>
            </figure>
            <figure className="card">
              <img src="/images/gambar15.PNG" alt="Tiang lampu jalan" />
              <figcaption>Tiang lampu jalan</figcaption>
            </figure>
            <figure className="card">
              <img src="/images/gambar16.PNG" alt="Tiang lampu jalan" />
              <figcaption>Tiang lampu jalan</figcaption>
            </figure>
            <figure className="card">
              <img src="/images/gambar17.PNG" alt="Tiang lampu jalan" />
              <figcaption>Tiang lampu jalan</figcaption>
            </figure>
            <figure className="card">
              <img src="/images/gambar18.PNG" alt="Tiang lampu jalan" />
              <figcaption>Tiang lampu jalan</figcaption>
            </figure>
            <figure className="card">
              <img src="/images/gambar19.PNG" alt="Tiang lampu jalan" />
              <figcaption>Tiang lampu jalan</figcaption>
            </figure>
            <figure className="card">
              <img src="/images/gambar20.PNG" alt="Tiang lampu sorot" />
              <figcaption>Tiang lampu sorot</figcaption>
            </figure>
            <figure className="card">
              <img src="/images/gambar21.PNG" alt="Tiang lampu sorot" />
              <figcaption>Tiang lampu sorot</figcaption>
            </figure>
            <figure className="card">
              <img src="/images/gambar22.PNG" alt="Tiang lampu sorot" />
              <figcaption>Tiang lampu sorot</figcaption>
            </figure>
          </div>
        </section>
      </main>
    </>
  );
}
