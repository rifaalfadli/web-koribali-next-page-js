import Head from "next/head";
import Breadcrumb from "@/components/Breadcrumb";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";

import Hero from "@/components/Hero";

export default function Kontak() {
  return (
    <div className="page-wrapper">
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

        <ContactForm />
      </main>
    </div>
  );
}
