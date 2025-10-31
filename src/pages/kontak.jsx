import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/shared/MapEmbed";
import Hero from "@/components/Hero";

export default function Kontak() {
  return (
    <>
      <Head>
        <title>Kontak - CV. KORI BALI</title>
        <meta
          name="description"
          content="Hubungi CV. KORI BALI untuk pertanyaan, informasi layanan, atau kerja sama bisnis. Kami siap membantu Anda."
        />
      </Head>

      <Hero title="Informasi Kontak" />
      <Breadcrumb page="Kontak" />

      <main>
        <section className="informasi-kontak container">
          <ContactInfo />
        </section>

        <section className="form-area container">
          <h2>Hubungi Kami</h2>
          <div className="form-kontak">
            <ContactForm />
            <MapEmbed />
          </div>
        </section>
      </main>
    </>
  );
}
