import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import Hero from "@/components/Hero";

function DivisiTable({ id, title, data }) {
  return (
    <section id={id} className="container container-struktur">
      <h2>{title}</h2>
      <table id={`data-divisi-${id}`} border={1}>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No</th>
            <th>Nama</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((user, index) => (
              <tr key={user.id}>
                <td style={{ textAlign: "center" }}>{index + 1}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", color: "gray" }}>
                Belum ada anggota di divisi ini.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default function StrukturPegawai({ anggota }) {
  // Kelompokkan berdasarkan divisi
  const ys = anggota.filter((a) => a.divisi === "YS");
  const yp = anggota.filter((a) => a.divisi === "YP");
  const dev = anggota.filter((a) => a.divisi === "Development");

  return (
    <>
      <Head>
        <title>Struktur Pegawai - CV. KORI BALI</title>
        <meta
          name="description"
          content="Halaman struktur pegawai CV. KORI BALI yang menampilkan susunan tim setiap divisi."
        />
      </Head>
      <Hero title="Struktur Pegawai" />
      <Breadcrumb page="Struktur Pegawai" />

      <main>
        <DivisiTable id="ys" title="Divisi YS" data={ys} />
        <DivisiTable id="yp" title="Divisi YP" data={yp} />
        <DivisiTable id="development" title="Divisi Development" data={dev} />
      </main>
    </>
  );
}

// Fetch data pakai SSR
export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:5000/anggota", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Gagal ambil data anggota");
    const anggota = await res.json();

    // Kirim hanya data aman (tapi tetap include id)
    const safeData = anggota.map(({ fullname, email, divisi }) => ({
      fullname,
      email,
      divisi: divisi ?? "Tidak ada divisi",
    }));

    return {
      props: {
        anggota: safeData,
      },
    };
  } catch (err) {
    console.error("SSR Error:", err);
    return {
      props: {
        anggota: [],
      },
    };
  }
}
