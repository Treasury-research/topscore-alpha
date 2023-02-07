import config from "../config";
import useErc721Contract from "./useErc721Contract";
import useWeb3Context from "hooks/useWeb3Context";
import abi from 'ethereumjs-abi';
import useContract from "hooks/useContract";
import LenshubAbi from "./abi/Lenshub.json";
export default function useLenshubContract() {
  const { web3, sendTx, account } = useWeb3Context();
  const contract = useContract(LenshubAbi, config.contracts.lenshub);
  const erc721Contract = useErc721Contract();

  return {
    async getProfile(profileId) {
      return await contract.methods.getProfile(profileId).call();
    },
    async follow(profileId, feeInfo) {
      const initData = web3.eth.abi.encodeParameters(
        ["address", "uint256"],
        [feeInfo.currency, feeInfo.amount]
      );
      const func = contract.methods.follow([profileId], [initData]);
      return sendTx(func);
    },
    async unfollow(nftAddress, to, tokenId) {
      await erc721Contract.transferFrom(nftAddress, to, tokenId);
    },
    async getFollowNFT(profileId) {
      return await contract.methods.getFollowNFT(profileId).call();
    },

    async post(params) {
      // const initData = abi.rawEncode(
      //   ["uint256", "string", "address", "bytes", "address", "bytes"],
      //   [1, "https://hkxkrnbxl4zyr72hcihyp22zz3rzeuy2zsm6kfv6omhak4sskowq.arweave.net/Oq6otDdfM4j_RxIPh-tZzuOSUxrMmeUWvnMOBXJSU60", config.contracts.FreeCollectModule, web3.eth.abi.encodeParameters(["bool"], [true]), config.zeroAddress, []]
      // );
    
      const initData = web3.eth.abi.encodeParameters(["uint256", "string", "address", "bytes", "address", "bytes"], Object.values(params));
      console.log("foo", initData);
      const func = contract.methods.post([1, "https://hkxkrnbxl4zyr72hcihyp22zz3rzeuy2zsm6kfv6omhak4sskowq.arweave.net/Oq6otDdfM4j_RxIPh-tZzuOSUxrMmeUWvnMOBXJSU60", config.contracts.FreeCollectModule, web3.eth.abi.encodeParameters(["bool"], [true]), config.zeroAddress, []]);
      return sendTx(func);
    },
  };
}
