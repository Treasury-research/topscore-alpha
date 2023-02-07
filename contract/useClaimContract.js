import { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import config from "../config";
import ClaimAbi from "./abi/Claim.json";

export default function useClaimContract() {
  const { account, sendTx, web3 } = useContext(Web3Context);

  return {
    async canClaim(merkleProof) {
      const contract = new web3.eth.Contract(ClaimAbi, config.contracts.claim);
      return await contract.methods.canClaim(account, merkleProof).call();
    },

    async claim(merkleProof) {
      const contract = new web3.eth.Contract(ClaimAbi, config.contracts.claim);
      const func = contract.methods.mint(merkleProof);
      return await sendTx(func);
    },
  };
}
