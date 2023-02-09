import React, { useState, useEffect } from "react";
import config from "../config";
import { shortenAddr, switchChain } from "../lib/tool";
import { useRecoilState } from "recoil";
import { currentProfileState, profileListState } from "../store/state";
import useWeb3Context from "../hooks/useWeb3Context";
import lensApi from "../api/lensApi";
import { message, Dropdown, Menu } from "antd";
import { useRouter } from "next/router";
import api from "../api";
import LoginConnect from './connect/LoginConnect'
import SignLens from './connect/SignLens'
import ChangeProfile from './connect/ChangeProfile'

const ConnectBtn = () => {
  const router = useRouter();
  const { account, connectWallet, chainId, signMessage } = useWeb3Context();
  const [profileList, setProfileList] = useRecoilState(profileListState);
  const [showModal, setShowModal] = useState([false, false, false]);
  const [currentProfile, setCurrentProfile] =
    useRecoilState<any>(currentProfileState);

  useEffect(() => {
    if (!account) {
      return;
    }
    getLensHandle();
  }, [account]);

  useEffect(() => {
  }, [currentProfile])

  const changeProfile = (profileId: number) => {
    // 如果在 profile 页面，把 profile 也切换掉。
    if (router.pathname === "/profile/[address]") {
      router.push(`/profile/${account}?queryProfileId=${profileId}`);
    }
  };

  useEffect(() => {
    if (router.pathname === "/profile/[address]") {
      goProfile();
    }
  }, [profileList]);

  const getLensHandle = async () => {
    const res: any = await api.get(`/lens/handles/${account}`);
    setProfileList(res.data);
    setCurrentProfile(res.data[0])
  };

  const goProfile = () => {
    if (profileList.length > 0) {
      router.push(`/profile/${account}`);
    } else {
      message.info("You must have a Lens Protocol Profile");
      router.push(`/profile/0x09c85610154a276a71eb8a887e73c16072029b20`);
    }
  };

  const doKnn3Login = async (message: string, signature: string) => {
    const res = await api.post('/auth/login', {
      message,
      signature,
    })
    sessionStorage.setItem("knn3Token", res.data.accessToken);
    api.defaults.headers.authorization = `Bearer ${res.data.accessToken}`
  }

  const doLogin = async () => {
    const challenge = (await lensApi.getChallenge(account || "")).challenge
      .text;
    const signature = await signMessage(challenge);
    console.log("sig", signature);

    await doKnn3Login(challenge, signature)

    const token = (await lensApi.getAccessToken(account, signature))
      .authenticate;
    console.log("token", token);
    sessionStorage.setItem("accessToken", token.accessToken);
    lensApi.setToken(token.accessToken);
  };

  const handleShowModal = (show: boolean, i: number) => {
    setShowModal((pre) => {
      pre[i] = show;
      return [...pre];
    });
  };
  
  return (
    <div className="w-full h-10 flex gap-3 justify-end ">
      {account ? (
        <>
          {account && chainId && config.chainId !== chainId ? (
            <button
              onClick={() => switchChain(config.chainId)}
              className="h-full px-4 flex justify-center items-center bg-[#4D0F00] text-[rgba(255,255,255,0.8)]"
            >
              Switch to polygon
            </button>
          ) : (
            <button className="h-full px-4 flex justify-center items-center bg-[#4D0F00] text-[rgba(255,255,255,0.8)]">
              {shortenAddr(account)}
            </button>
          )}
        </>
      ) : (
        <button
          onClick={() => connectWallet()}
          className="h-full px-4 flex justify-center items-center bg-[#4D0F00] text-[rgba(255,255,255,0.8)]"
        >
          Connect Wallet
        </button>
      )}

      {account && (
        <button
          onClick={() => doLogin()}
          className="h-full px-4 flex justify-center items-center bg-[#4D0F00] text-[rgba(255,255,255,0.8)]"
        >
          Log in
        </button>
      )}

      {profileList.length > 0 && currentProfile && (
        <Dropdown
          overlay={
            <Menu>
              {profileList.map((t: any, i: number) => (
                <div
                  className="drop-menu"
                  key={i}
                  onClick={() => {
                    changeProfile(t.profileId);
                    setCurrentProfile(t);
                  }}
                >
                  {t.handle}
                </div>
              ))}
            </Menu>
          }
        >
          <button className="h-full px-4 flex justify-center items-center bg-[#4D0F00] text-[rgba(255,255,255,0.8)]">
            {currentProfile.handle}
          </button>
        </Dropdown>
      )}

      {showModal[0] && (<LoginConnect onCancel={() => handleShowModal(false, 0)} />)}

      {showModal[1] && (<SignLens onCancel={() => handleShowModal(false, 1)} />)}

      {showModal[2] && (<ChangeProfile onCancel={() => handleShowModal(false, 2)} />)}
    </div>
  );
};

export default ConnectBtn;
