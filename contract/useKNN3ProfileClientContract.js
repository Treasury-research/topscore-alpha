import config from "../config";
import useContract from "hooks/useContract";
import ChainlinkAbi from "./abi/Chainlink.json";

export default function useKNN3ProfileClientContract() {
  const contract = useContract(ChainlinkAbi, config.contracts.chainlink);

  return {
    async getAssetsInfo(address) {
      const assetsAndDefi = await contract.methods
        .AssetsAndDefiData(address)
        .call();
      const basicProfile = await contract.methods
        .BasicProfileData(address)
        .call();
      const governance = await contract.methods.GovernanceData(address).call();
      const socialStatus = await contract.methods
        .SocialStatusData(address)
        .call();

      return {
        assetsAndDefi,
        basicProfile,
        governance,
        socialStatus,
      };
    },
  };
}
