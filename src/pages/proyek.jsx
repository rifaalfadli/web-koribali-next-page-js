import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import Hero from "@/components/Hero";
import { MainPage } from "@/components/MainPageProyek";

export default function ProyekPage() {
  return (
    <div className="page-wrapper">
      <Head>
        <title>Proyek Kami - CV. KORI BALI</title>
        <meta
          name="description"
          content="Lihat daftar proyek yang telah diselesaikan oleh CV. KORI BALI, lengkap dengan dokumentasi dan foto hasil kerja."
        />
      </Head>

      <Hero title="Proyek Kami" />
      <Breadcrumb page="Proyek" />

      <MainPage />
    </div>
  );
}
