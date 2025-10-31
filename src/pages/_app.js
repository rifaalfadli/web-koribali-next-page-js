import "@/assets/styles/style.css";
import "@/assets/styles/responsive.css";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps, router }) {
  const noLayoutRoutes = ["/login", "/register"];

  const isNoLayout = noLayoutRoutes.includes(router.pathname);

  if (isNoLayout) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
