import React, { useState, useEffect } from "react";
import config from "../config";
import { shortenAddr, switchChain } from "../lib/tool";
import { useRecoilState } from "recoil";
import { currentProfileState, profileListState, loadingProfileListState, knn3TokenValidState } from "../store/state";
import useWeb3Context from "../hooks/useWeb3Context";
import lensApi from "../api/lensApi";
import { message, Popover } from "antd";
import { useRouter } from "next/router";
import api from "../api";
import LoginConnect from "./connect/LoginConnect";
import SignLens from "./connect/SignLens";
import ChangeProfile from "./connect/ChangeProfile";

const ConnectBtn = () => {
  const router = useRouter();
  const { account, connectWallet, chainId, signMessage } = useWeb3Context();
  const [knn3TokenValid, setKnn3TokenValid] = useRecoilState(knn3TokenValidState);
  const [profileList, setProfileList] = useRecoilState(profileListState);
  const [loadingProfileList, setLoadingProfileList] = useRecoilState(loadingProfileListState)
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
    if (router.pathname === "/profile/[address]") {
      goProfile();
    }
  }, [profileList]);

  const getLensHandle = async () => {
    setLoadingProfileList(true)
    const res: any = await api.get(`/lens/handles/${account}`);
    setProfileList(res.data);
    if(res.data.length > 0){
      setCurrentProfile(res.data[0]);
    }
    setLoadingProfileList(false);
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
    const res = await api.post("/auth/login", {
      message,
      signature,
    });
    localStorage.setItem("knn3Token", res.data.accessToken);
    localStorage.setItem("knn3RefreshToken", res.data.refreshToken);
    api.defaults.headers.authorization = `Bearer ${res.data.accessToken}`;
    setKnn3TokenValid(true)
  };

  const doLogin = async () => {
    const challenge = (await lensApi.getChallenge(account || "")).challenge
      .text;
    const signature = await signMessage(challenge);

    await doKnn3Login(challenge, signature);

    const token = (await lensApi.getAccessToken(account, signature))
      .authenticate;
    console.log("token", token);
    localStorage.setItem("accessToken", token.accessToken);
    lensApi.setToken(token.accessToken);
  };

  const handleShowModal = (show: boolean, i: number) => {
    setShowModal((pre) => {
      pre[i] = show;
      return [...pre];
    });
  };

  const doKnn3Refresh = async () => {
    const knn3RefreshToken = localStorage.getItem('knn3RefreshToken')

    if(!knn3RefreshToken){
      return
    }
    const res = await api.post('/auth/refresh',{
      refreshToken: knn3RefreshToken,
    });

    setKnn3TokenValid(true);
  
    localStorage.setItem("knn3Token", res.data.accessToken);
    localStorage.setItem("knn3RefreshToken", res.data.refreshToken);
    api.defaults.headers.authorization = `Bearer ${res.data.accessToken}`;
  }

  const checkKnn3Token = async () => {
    const token = localStorage.getItem("knn3Token");
    if (token) {
      const res = await api.post("/auth/verify", {
        accessToken: token,
      });
      // if token not valid
      if(res.data){
        setKnn3TokenValid(true);
      }else{
        setKnn3TokenValid(false);
        doKnn3Refresh();
      }
    }
  };

  useEffect(() => {
    checkKnn3Token();
    const intervalId = setInterval(() => {
      checkKnn3Token();
    }, 50 * 1000);

    return () => {
      clearInterval(intervalId)
    }

  }, []);

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
            <Popover
              content={
                <div>
                  <div className="text-[14px]">Logged in as</div>
                  <div className="text-[#CE3900] border-b-[1px] pb-[4px] border-[#4A4A4A] font-[600] text-[16px]">
                    @{currentProfile.handle}
                  </div>
                  <div>
                    <div
                      onClick={() => handleShowModal(true, 2)}
                      className="cursor-pointer my-[10px] flex items-center px-2 py-1 rounded-[4px] hover:bg-[#555555]"
                    >
                      Switch Profile
                    </div>
                    <div className="cursor-pointer flex items-center px-2 py-1 rounded-[4px] hover:bg-[#555555]">
                      Logout
                    </div>
                  </div>
                </div>
              }
              placement="bottom"
            >
              <button className="h-full px-4 flex justify-center items-center bg-[#4D0F00] text-[rgba(255,255,255,0.8)]">
                {shortenAddr(account)}
              </button>
            </Popover>
          )}
        </>
      ) : (
        <button
          onClick={() => {
            connectWallet();
          }}
          className="h-full px-4 flex justify-center items-center bg-[#4D0F00] text-[rgba(255,255,255,0.8)]"
        >
          Connect Wallet
        </button>
      )}

      {account && profileList.length > 0 && !knn3TokenValid && (
        <button
          onClick={() => doLogin()}
          className="h-full px-4 flex justify-center items-center bg-[#4D0F00] text-[rgba(255,255,255,0.8)]"
        >
          Log in
        </button>
      )}

      {/* {profileList.length > 0 && currentProfile && (
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
      )} */}

      {showModal[0] && (
        <LoginConnect onCancel={() => handleShowModal(false, 0)} />
      )}

      {showModal[1] && <SignLens onCancel={() => handleShowModal(false, 1)} />}

      {showModal[2] && (
        <ChangeProfile onCancel={() => handleShowModal(false, 2)} />
      )}
    </div>
  );
};

export default ConnectBtn;
