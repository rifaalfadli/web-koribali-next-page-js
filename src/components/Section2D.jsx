import Link from "next/link";

export default function Section2D() {
  return (
    <section id="gambar-2d" className="container container-proyek">
      <h2>Gambar Teknik 2D</h2>

      <article>
        <h3>Pemodelan 2D Gambar Teknik</h3>
        <img src="/images/gambar1.jpg" alt="Pemodelan 2D" width="300" />
        <p>
          Pembuatan gambar teknik detail seperti potongan, tampak, dan denah
          sebagai acuan produksi.
        </p>
      </article>

      <article>
        <h3>Pemodelan 2D Gambar Teknik</h3>
        <img src="/images/gambar2.jpg" alt="Pemodelan 2D" width="300" />
        <p>
          Pembuatan gambar teknik detail seperti potongan, tampak, dan denah
          sebagai acuan produksi.
        </p>
      </article>

      <article>
        <h3>Pemodelan 2D Gambar Teknik</h3>
        <img src="/images/gambar3.jpg" alt="Pemodelan 2D" width="300" />
        <p>
          Pembuatan gambar teknik detail seperti potongan, tampak, dan denah
          sebagai acuan produksi.
        </p>
      </article>

      <Link href="/proyek/proyek-2d">Lihat Selengkapnya</Link>
    </section>
  );
}
