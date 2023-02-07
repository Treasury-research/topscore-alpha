import "../styles/globals.css";
import { Web3ContextProvider } from "../context/Web3Context";
import { ToastContainer } from "react-toastify";
import "../styles/antd_reset.css";
import type { AppProps } from "next/app";
// import { configureChains, createClient, WagmiConfig } from "wagmi";
// import { mainnet, polygon } from "wagmi/chains";
// import { publicProvider } from "wagmi/providers/public";
// const { provider, webSocketProvider } = configureChains(
//   [polygon, mainnet],
//   [publicProvider()]
// );

// import { LensConfig, staging, LensProvider } from "@lens-protocol/react";
// import { localStorage } from "@lens-protocol/react/web";
// import { bindings as wagmiBindings } from "@lens-protocol/wagmi";

// const lensConfig: LensConfig = {
//   bindings: wagmiBindings(),
//   environment: staging,
//   storage: localStorage(),
// };

// const client = createClient({
//   autoConnect: true,
//   provider,
//   webSocketProvider,
// });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ContextProvider>
      <Component {...pageProps} />
      <ToastContainer position="top-right" />ƒ
    </Web3ContextProvider>
  );
}
