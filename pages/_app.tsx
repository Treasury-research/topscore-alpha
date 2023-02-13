import "../styles/globals.css";
import "../styles/custom.scss";
import { Web3ContextProvider } from "../context/Web3Context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/antd_reset.scss";
import type { AppProps } from "next/app";
import { RecoilRoot } from 'recoil'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Web3ContextProvider>
        <Head>
          <title>
            2022 Wrapped on Lens
          </title>
          <link rel="icon" href="/topIcon.png" />
        </Head>
        <Component {...pageProps} />
        <ToastContainer position="top-right" />ƒ
      </Web3ContextProvider>
    </RecoilRoot>
  );
}
