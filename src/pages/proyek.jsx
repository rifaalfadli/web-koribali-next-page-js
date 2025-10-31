import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import Hero from "@/components/Hero";
import SectionRendering from "@/components/SectionRendering";
import Section3D from "@/components/Section3D";
import Section2D from "@/components/Section2D";
import SectionVBA from "@/components/SectionVBA";
import Sidebar from "@/components/Sidebar";

export default function ProyekPage() {
  return (
    <>
      <Head>
        <title>Proyek Kami - CV. KORI BALI</title>
        <meta
          name="description"
          content="Lihat daftar proyek yang telah diselesaikan oleh CV. KORI BALI, lengkap dengan dokumentasi dan foto hasil kerja."
        />
      </Head>

      <Hero title="Proyek Kami" />
      <Breadcrumb page="Proyek" />

      <main className="proyek-page">
        <SectionRendering />
        <Section3D />
        <Section2D />
        <SectionVBA />
        <Sidebar />
      </main>
    </>
  );
}
