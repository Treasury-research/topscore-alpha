import React, { useEffect, useState } from "react";
import useWeb3Context from "../../hooks/useWeb3Context";
import useLenshubContract from "../../contract/useLenshubContract";
import useErc20Contract from "../../contract/useErc20Contract";
import log from "../../lib/log";
import useErc721Contract from "../../contract/useErc721Contract";
import useFeeFollowContract from "../../contract/useFeeFollowContract";
import lensApi from "../../lib/lensApi";

export default function Lens({ profileId, handle }: any) {
  const [followBalance, setFollowBalance] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<any>({});
  const [feeInfo, setFeeInfo] = useState<any>({});
  const [tokenInfo, setTokenInfo] = useState<any>({});
  const lenshubContract = useLenshubContract();
  const erc721Contract = useErc721Contract();
  const erc20Contract = useErc20Contract();
  const feeFollowContract = useFeeFollowContract();
  const { account, chainId } = useWeb3Context();

  const doFollow = async () => {
    const res: any = await lenshubContract.follow(profileId, feeInfo);
    if (res) {
      setFollowBalance((prev: any) => {
        prev.push(res.events.Transfer.returnValues.tokenId);
        return [...prev];
      });
      log("follow", account || "");
    }
  };

  const getProfile = async () => {
    setLoading(true);
    const profileInfoRaw = await lensApi.getProfileByHandle(handle);
    setProfileInfo(profileInfoRaw);
    setLoading(false);

    const followBalanceRaw = await erc721Contract.getAll(
      profileInfoRaw.followNftAddress
    );
    setFollowBalance(followBalanceRaw);

    const feeInfoRaw = await feeFollowContract.getProfileData(profileId);

    setFeeInfo(feeInfoRaw);
  };

  const getTokenInfo = async () => {
    const symbol = await erc20Contract.symbol(feeInfo.currency);
    const decimals = await erc20Contract.decimals(feeInfo.currency);
    setTokenInfo({
      symbol,
      decimals,
    });
  };

  useEffect(() => {
    if (!feeInfo.amount || feeInfo.amount === "0") {
      return;
    }
    getTokenInfo();
  }, [feeInfo]);

  useEffect(() => {
    if (!profileId || !handle) {
      return;
    }
    getProfile();
  }, [profileId, handle, chainId]);

  return followBalance.length === 0 ? (
    <div className=" bg-[#4D0F00] px-4 py-2 cursor-pointer" onClick={doFollow}>
      Follow{` `}
    </div>
  ) : (
    <div className=" bg-[#4D0F00] px-4 py-2">Following</div>
  );
}
