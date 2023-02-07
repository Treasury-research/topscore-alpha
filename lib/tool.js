import Web3 from "web3";
import { message } from "antd";
import config from "../config";

const web3 = new Web3(config.provider);

export const shortenAddr = (address, length = 3) => {
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};

export function copyToClipboard(text) {
  const copied = document.createElement("input");
  copied.setAttribute("value", text);
  document.body.appendChild(copied);
  copied.select();
  document.execCommand("copy");
  document.body.removeChild(copied);
  message.success("Copied");
}

export const getAddrType = async (address) => {
  const code = await web3.eth.getCode(address);
  if (code === "0x") {
    return "EOA";
  } else {
    return "Contract";
  }
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const switchChain = async (chainId) => {
  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: `0x${chainId.toString(16)}` }],
  });
};

export const formatIPFS = (val) => {
  if (!val) {
    return val;
  }
  if (val.indexOf("ipfs://") > -1) {
    return val.replace("ipfs://", "https://lens.infura-ipfs.io/ipfs/");
  } else {
    return val;
  }
  // else if(val.indexOf("ipfs.infura.io") > -1){
  //   return val.replace("https://ipfs.infura.io/ipfs", "https://lens.infura-ipfs.io/ipfs/");
  // }
};
