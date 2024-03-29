import { useEffect } from "react";
import "../styles/globals.css";
import "../styles/custom.scss";
import { Web3ContextProvider } from "../context/Web3Context";
import { ToastContainer } from "react-toastify";
// import Coming from "../components/Coming";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import "../styles/antd_reset.scss";
import "../styles/light.scss";
import "../styles/dark.scss";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Head from "next/head";
// import Gleap from "gleap";

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   // Run within useEffect to execute this code on the frontend.
  //   Gleap.initialize("sg1UIYFMK3J926CjXOFNUTR26T1uF6yB");
  // }, []);

  return (
    <RecoilRoot>
      <Web3ContextProvider>
        <Head>
          <title>TopScore - Unlock Your Web3 Social Presence</title>
          <meta
            name="keywords"
            content="TopScore, KNN3, Lens, Web3 Social, Crypto, Ethereum, Bitcoin, Polygon, dApp"
          />
          <meta
            name="description"
            content="TopScore revolutionizes Web3 social strategy by providing data-driven insights and guidance to help you create, build, and monetize more efficiently and scientifically."
          />
          <link rel="icon" href="/topIcon.png" />
        </Head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1HB357LK81"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-1HB357LK81');
        `}
        </Script>
        <Component {...pageProps} />
        <ToastContainer position="top-right" />ƒ
      </Web3ContextProvider>
    </RecoilRoot>
  );
}
