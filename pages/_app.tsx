import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import "../styles/global.css";
import Navboard from "../components/Navboard";
import Footer from "../components/Footerrights";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Collab@IITH</title>
      </Head>
      <Navbar />
      <Navboard />
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
      <Footer />
    </>
  );
}

export default MyApp;
