import React, { useState, useEffect } from "react";
import config from "../config";
import { formatIPFS } from "../lib/tool";
import { shortenAddr, switchChain } from "../lib/tool";
import { useRecoilState } from "recoil";
import lensApi from "../api/lensApi";
import Image from "next/image";
import {
  currentProfileState,
  profileListState,
  loadingProfileListState,
  knn3TokenValidState,
} from "../store/state";
import useWeb3Context from "../hooks/useWeb3Context";
import { Popover, Dropdown, Space, Menu, Drawer, Input } from "antd";
import { useRouter } from "next/router";
import api from "../api";
import LoginConnect from "./connect/LoginConnect";
import SignLens from "./connect/SignLens";
import ImgLenster from "../statics/img/lest-head.png";
import ImgHome from "../statics/img/home.svg";
import ChangeProfile from "./connect/ChangeProfile";
import { DownOutlined } from "@ant-design/icons";

const ConnectBtn = () => {
  const router = useRouter();
  const { account, chainId, doLogout } = useWeb3Context();
  const [knn3TokenValid, setKnn3TokenValid] =
    useRecoilState(knn3TokenValidState);
  const [imageURI, setImageURI] = useState("");
  const [profileList, setProfileList] = useRecoilState(profileListState);
  const [loadingProfileList, setLoadingProfileList] = useRecoilState(
    loadingProfileListState
  );
  const [showModal, setShowModal] = useState([false, false, false]);
  const [openLensDrop, setOpenLensDrop] = useState(false);
  const [currentProfile, setCurrentProfile] =
    useRecoilState<any>(currentProfileState);

  useEffect(() => {
    if (!account || profileList.length > 0 || !knn3TokenValid) {
      return;
    }
    getLensHandle();
  }, [account, knn3TokenValid]);

  useEffect(() => {
    if (!knn3TokenValid) {
      return;
    }
    if (router.pathname === "/profile/[address]") {
      goProfile();
    }
  }, [profileList, knn3TokenValid]);

  useEffect(() => {
    if (!currentProfile.handle) {
      return;
    }
    getProfileByHandle(currentProfile.handle);
  }, [currentProfile.handle]);

  const getProfileByHandle = async (handle: string) => {
    const res = await lensApi.getProfileByHandle(handle);
    let hasPic = false;
    if (
      res &&
      res.picture &&
      res.picture.original &&
      res.picture.original.url
    ) {
      setImageURI(res.picture.original.url);
      hasPic = true;
    }
    if (res && res.picture && res.picture.uri) {
      setImageURI(res.picture.uri);
      hasPic = true;
    }

    if (!hasPic) {
      setImageURI('')
    }
  };

  const handleLogout = async () => {
    await doLogout();
    if (router.pathname === "/profile/[address]") {
      location.href = `/profile/0x09c85610154a276a71eb8a887e73c16072029b20`;
    }
  };

  const getLensHandle = async () => {
    setLoadingProfileList(true);
    const res: any = await api.get(`/lens/handles/${account}`);
    setProfileList(res.data);
    if (res.data.length > 0 && !currentProfile.handle) {
      setCurrentProfile(res.data[0]);
    }
    setLoadingProfileList(false);
  };

  const goProfile = () => {
    if (profileList.length > 0) {
      router.push(`/profile/${account}`);
    } else {
      router.push(`/profile/0x09c85610154a276a71eb8a887e73c16072029b20`);
    }
  };

  const handleShowModal = (show: boolean, i: number) => {
    setShowModal((pre) => {
      pre[i] = show;
      return [...pre];
    });
  };

  const doKnn3Refresh = async () => {
    const knn3RefreshToken = localStorage.getItem("knn3RefreshToken");

    if (!knn3RefreshToken) {
      return;
    }
    const res = await api.post("/auth/refresh", {
      refreshToken: knn3RefreshToken,
    });

    setKnn3TokenValid(true);

    localStorage.setItem("knn3Token", res.data.accessToken);
    localStorage.setItem("knn3RefreshToken", res.data.refreshToken);
    api.defaults.headers.authorization = `Bearer ${res.data.accessToken}`;
  };

  const checkKnn3Token = async () => {
    const token = localStorage.getItem("knn3Token");
    if (token) {
      const res = await api.post("/auth/verify", {
        accessToken: token,
      });
      // if token not valid
      if (res.data) {
        setKnn3TokenValid(true);
      } else {
        setKnn3TokenValid(false);
        doKnn3Refresh();
      }
    }
  };

  const gotoMyNft = () => {
    if (account && currentProfile.profileId) {
      router.push(`/nft/${account}?profileId=${currentProfile.profileId}`);
    }
  };

  const determineLoginModal = async () => {
    if (account) {
      handleShowModal(true, 1);
    } else {
      // await connectWallet();
      handleShowModal(true, 0);
    }
  };

  useEffect(() => {
    checkKnn3Token();
    const intervalId = setInterval(() => {
      checkKnn3Token();
    }, 50 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getImgUrl = (str: string) => {
    const imgUrl = str.replace(
      "https://ipfs.infura.io",
      "https://lens.infura-ipfs.io"
    );
    return formatIPFS(imgUrl);
  };

  return (
    <div className="w-full h-10 flex gap-3 items-center">
      <div className="h-8 flex gap-2 items-center">
        <div>Profile of</div>
        <div className="h-full">
          <Dropdown
            open={openLensDrop}
            onOpenChange={(e: any) => setOpenLensDrop(e)}
            overlay={
              <Menu className="lens-switch-component">
                <div className="py-1 w-[90%] mx-[5%] text-[#fff]">
                  <Input className="connect-component-input" placeholder="Search" allowClear/>
                  <p className="text-xl my-3">Yours</p>
                  <div className="flex items-center gap-1 mb-2">
                    <Image
                      className="w-[20px] h-[20px] rounded-[10px] mr-2"
                      src={ImgLenster}
                      alt=""
                    />
                    stani1.lens
                  </div>
                  <p className="text-xl my-3">Recommened</p>
                  <div className="flex items-center gap-1 mb-2">
                    <Image
                      className="w-[20px] h-[20px] rounded-[10px] mr-2"
                      src={ImgLenster}
                      alt=""
                    />
                    stani1.lens
                  </div>
                </div>
              </Menu>
            }
          >
            <div onClick={(e) => e.preventDefault()} className="flex h-full">
              <button className="h-full px-4 flex justify-center items-center bg-[#272727] rounded-[4px]">
                <Image
                  className="w-[20px] h-[20px] rounded-[10px] mr-2"
                  src={ImgLenster}
                  alt=""
                />

                {currentProfile.handle}
                <DownOutlined className='ml-3' />
              </button>
            </div>
          </Dropdown>
        </div>
        <div className="flex items-center justify-center bg-[#272727] rounded-[4px] h-8 w-8 cursor-pointer">
          <Image
            className="w-[18px] h-[18px]"
            src={ImgHome}
            alt=""
          />
        </div>
      </div>

      <div className="h-full ml-auto">
        {account && chainId && config.chainId !== chainId ? (
          <button
            onClick={() => switchChain(config.chainId)}
            className="h-full px-4 flex justify-center items-center bg-[#272727] rounded-[4px] text-[#fff]"
          >
            Switch to polygon
          </button>
        ) : (
          knn3TokenValid && (
            <>
              {router.query.address !== account &&
                router.pathname === "/nft/[address]" &&
                profileList.length > 0 && (
                  <button
                    className="h-full px-4 flex justify-center items-center bg-[#272727] rounded-[4px] text-[#fff]"
                    onClick={() => gotoMyNft()}
                  >
                    Check My NFT
                  </button>
                )}
              <Popover
                content={
                  <div>
                    <div className="text-[14px]">Address</div>
                    <div className="text-[#CE3900] border-b-[1px] pb-[4px] border-[#4A4A4A] font-[600] text-[16px]">
                      {shortenAddr(account)}
                    </div>
                    <div>
                      <div
                        onClick={() => handleShowModal(true, 2)}
                        className="cursor-pointer my-[10px] flex items-center px-2 py-1 rounded-[4px] hover:bg-[#555555]"
                      >
                        Switch Profile
                      </div>
                      <div
                        onClick={handleLogout}
                        className="cursor-pointer flex items-center px-2 py-1 rounded-[4px] hover:bg-[#555555]"
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                }
                placement="bottom"
              >
                <button className="h-full px-4 flex justify-center items-center bg-[#272727] rounded-[4px] text-[#fff]">
                  {imageURI ? (
                    <img
                      className="w-[20px] h-[20px] rounded-[15px] mr-2"
                      src={getImgUrl(imageURI)}
                      alt=""
                    />
                  ) : (
                    <Image
                      className="w-[20px] h-[20px] rounded-[15px] mr-2"
                      src={ImgLenster}
                      alt=""
                    />
                  )}

                  {currentProfile.handle}
                </button>
              </Popover>
            </>
          )
        )}
        {!knn3TokenValid && (
          <button
            onClick={determineLoginModal}
            className="h-full px-4 flex justify-center items-center bg-[#272727] rounded-[4px] text-[#fff]"
          >
            {account ? "Log in" : "Connect Wallet"}
          </button>
        )}
      </div>



      {/* {knn3TokenValid && profileList.length === 0 && (
        <button className="h-full px-4 flex justify-center items-center bg-[#272727] text-[#fff]">
          No profile detected
        </button>
      )} */}

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
          <button className="h-full px-4 flex justify-center items-center bg-[#272727] text-[#fff]">
            {currentProfile.handle}
          </button>
        </Dropdown>
      )} */}

      {showModal[0] && (
        <LoginConnect
          onCancel={() => handleShowModal(false, 0)}
          onConnect={() => {
            handleShowModal(true, 1);
          }}
        />
      )}

      {showModal[1] && <SignLens onCancel={() => handleShowModal(false, 1)} />}

      {showModal[2] && (
        <ChangeProfile onCancel={() => handleShowModal(false, 2)} />
      )}
    </div>
  );
};

export default ConnectBtn;
