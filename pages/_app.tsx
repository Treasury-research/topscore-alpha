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
import Gleap from "gleap";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Run within useEffect to execute this code on the frontend.
    Gleap.initialize("sg1UIYFMK3J926CjXOFNUTR26T1uF6yB");
  }, []);

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
          {/* <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Your 2022 Wrapped on Lens" />
          <meta name="twitter:description" content="TopScore - a KNN3-powered scoring system based on Lens Protocol to evaluate this campaign." />
          <meta
            property="twitter:image"
            content="https://pbs.twimg.com/media/FxXebUHaQAELp5H?format=jpg&name=small" />
          <meta property="og:title" content="Your 2022 Wrapped on Lens" />
          <meta property="og:description" content="TopScore - a KNN3-powered scoring system based on Lens Protocol to evaluate this campaign." />
          <meta
            property="og:image"
            content="https://pbs.twimg.com/media/FxXebUHaQAELp5H?format=jpg&name=small"
          // content={`https://lens-api.knn3.xyz/api/lens/generate/shareImg/${currentProfile.profileId}`}
          />
          <meta property="og:locale'" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://topscore.staging.knn3.xyz/home" />
          <meta property="og:site_name" content="Topscore" /> */}
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
