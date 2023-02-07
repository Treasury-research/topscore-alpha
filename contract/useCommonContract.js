import { useContext } from "react";
import { Web3Context } from "context/Web3Context";
import { notification } from "antd";
import Erc20Abi from "./abi/ERC20.json";
import BN from "bignumber.js";

export default function useCommonContract() {
  const { web3, account, sendTx } = useContext(Web3Context);

  return {
    async getBlockNumber() {
      return await web3.eth.getBlockNumber();
    },
    async getAllowance(tokenAddress, contractAddress) {
      const tokenContract = new web3.eth.Contract(Erc20Abi, tokenAddress);

      return new Promise((resolve, reject) => {
        tokenContract.methods
          .allowance(account, contractAddress)
          .call()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            console.log("Error", err);
          });
      });
    },

    async balanceOf(token) {
      const tokenContract = new web3.eth.Contract(Erc20Abi, token.address);
      return new Promise((resolve, reject) => {
        tokenContract.methods
          .balanceOf(account)
          .call()
          .then((res) => {
            resolve(new BN(res).shiftedBy(-token.decimals).toString());
          })
          .catch((err) => {
            console.log("Error", err);
            reject(err);
          });
      });
    },

    async totalSupply(token) {
      const tokenContract = new web3.eth.Contract(Erc20Abi, token.address);
      return new Promise((resolve, reject) => {
        tokenContract.methods
          .totalSupply()
          .call()
          .then((res) => {
            resolve(new BN(res).shiftedBy(-token.decimals).toString());
          })
          .catch((err) => {
            console.log("Error", err);
            reject(err);
          });
      });
    },

    async approve(tokenAddress, contractAddress) {
      const tokenContract = new web3.eth.Contract(Erc20Abi, tokenAddress);
      const func = tokenContract.methods.approve(
        contractAddress,
        web3.utils.toWei("10000000000000", "ether")
      );
      return await sendTx(func, "approve");
    },
  };
}
