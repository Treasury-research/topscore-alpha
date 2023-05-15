import { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import config from "../config";
import ProofAbi from "./abi/Proof.json";
import useContract from "hooks/useContract";
import Web3 from "web3";

export default function useProofContract() {
  const { account, sendTx, web3 } = useContext(Web3Context);
  const contract = useContract(ProofAbi, config.contracts.proof);
  return {
    async getValidator() {
      console.log(account)
      const validatorIndex = 0;
      console.log(window.ethereum)
      const lensWeb3 = new Web3(window.ethereum)
      const lensContract = new lensWeb3.eth.Contract(ProofAbi, config.contracts.proof);
      return await lensContract.methods.isRegistered(account).call();
      // return await contract.methods.getValidator(validatorIndex).call();
    },
  };
}
