import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";
import "../styles/global.css";
import Navboard from "../components/Navboard";
import Footer from "../components/Footerrights";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
