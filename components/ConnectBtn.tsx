import React, { useState, useEffect } from "react";
import config from "../config";
import { formatIPFS } from "../lib/tool";
import { shortenAddr, switchChain } from "../lib/tool";
import { useRecoilState } from "recoil";
import lensApi from "../api/lensApi";
import Image from "next/image";
import {
  currentProfileState,
  currentLoginProfileState,
  routerHandleState,
  profileListState,
  knn3TokenValidState,
  isHaveNftState,
  isHaveLensNftState,
  loadingProfileListState,
  commendProfileListState
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
import { ConsoleSqlOutlined, DownOutlined, LoadingOutlined } from "@ant-design/icons";
import PermissionMsg from './connect/PermissionMsg'

const noLensMsg = 'You need to hold Lens Handle, please go to Opensea to open it, all our functions can be realized.'

const noNftMsg = 'You need Campagin NFT, please go to Opensea settings, all our functions can be achieved.'

const lensCollectionLink = 'https://opensea.io/collection/lens-protocol-profiles'

const campignNftLink = 'https://opensea.io/collection/your-2022-wrapped-on-lens'

let timer = null;

let refreshNum = 0

const ConnectBtn = (props: any) => {
  const router = useRouter();
  const { account, chainId, doLogout, doLogin, connectWallet } = useWeb3Context();
  const [knn3TokenValid, setKnn3TokenValid] =
    useRecoilState(knn3TokenValidState);
  const [imageURI, setImageURI] = useState("");
  const [profileList, setProfileList] = useRecoilState(profileListState);
  const [loadingRouterHandle, setLoadingRouterHandle] = useRecoilState(
    routerHandleState
  );
  const [showModal, setShowModal] = useState([false, false, false]);
  const [openLensDrop, setOpenLensDrop] = useState(false);
  // const [commentUsers, setCommentUsers] = useState<any>([]);
  const [currentProfile, setCurrentProfile] =
    useRecoilState<any>(currentProfileState);

  const [currentLoginProfile, setCurrentLoginProfile] =
    useRecoilState<any>(currentLoginProfileState);

  const [searchHandles, setSearchHandles] = useState<any>([]);

  const [searchLoading, setSearchLoading] = useState<any>(false);

  const [inputValue, setInputValue] = useState<any>('');

  const [isHaveNft, setIsHaveNft] = useRecoilState<any>(isHaveNftState);

  const [loadingNft, setLoadingNft] = useState<any>(true);

  const [isHaveLensHandle, setIsHaveLensHandle] = useRecoilState<any>(isHaveLensNftState);

  const [commendProfileList, setCommendProfileList] = useRecoilState<any>(commendProfileListState);

  const [loadingProfileList, setLoadingProfileList] = useRecoilState(
    loadingProfileListState
  );

  const [showPermission, setShowPermission] = useState<boolean>(false);

  const [msgInfo, setMsgInfo] = useState<any>({
    msg: '',
    link: ''
  });

  useEffect(() => {
    console.log(currentProfile)
    if (!account || !knn3TokenValid) {
      setInputValue('')
      setIsHaveNft(false)
      setIsHaveLensHandle(false)
      if (commendProfileList.length > 0) {
        setCurrentProfile(commendProfileList[0])
      }
      setProfileList([]);
      return;
    }
    getLensHandle();
    getAllNfts()
  }, [account, knn3TokenValid]);

  useEffect(() => {
    console.log(currentProfile)
   
  }, [currentProfile]);

  const setCurrentProfileByRouter = (t:any) => {
    setInputValue('')
    if (props.type === 1) {
      const handle = t.handle ? t.handle.split('.')[0] : 'stani'
      router.push(`/profile/${handle}`)
    }else{
      setCurrentProfile(t)
    }
  }

  useEffect(() => {
    if (commendProfileList.length == 0) {
      getCommentsProfileList()
    }
  }, []);

  useEffect(() => {
    if (!currentLoginProfile.handle) {
      return;
    }
    getProfileByHandle(currentLoginProfile.handle);
  }, [currentLoginProfile.handle]);

  const getCommentsProfileList = async () => {
    const comments = [
      'stani.lens',
      'yoginth.lens',
      'lenster.lens',
      'lensprotocol.lens'
    ]

    let clist: any = []
    const res = (await api.get(`/lens/recommend`));
    if (res && res.data && res.data.length > 0) {
      res.data.forEach((t: any) => {
        let idx = comments.indexOf(t.handle)
        clist[idx] = t
      })
      if (!account || !knn3TokenValid) {
        setCurrentProfile(clist[0])
      }
      setCommendProfileList(clist)
    } else {
      setCommendProfileList([])
    }
  }

  const getAllNfts = async () => {
    setLoadingNft(true)
    const res = (await api.get(`/lens/tokenIds/${account}`));
    setLoadingNft(false)
    if (res && res.data && res.data.length > 0) {
      setIsHaveNft(true)
    } else {
      setIsHaveNft(false)
    }
  }

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
  };

  const getLensHandle = async () => {
    setLoadingProfileList(true);
    const res: any = await api.get(`/lens/handles/${account}`);
    if (res && res.data) {
      setProfileList(res.data);
      if (res.data.length > 0) {
        setIsHaveLensHandle(true)
        if (props.type === 2) {
          setCurrentProfile(res.data[0])
        }
        setCurrentLoginProfile(res.data[0])
      } else {
        if(commendProfileList.length > 0){
          setCurrentProfile(commendProfileList[0])
        }
        setIsHaveLensHandle(false)
      }
    }
    setLoadingProfileList(false);
  }

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

  const searchInputChange = (e) => {
    setInputValue(e.target.value)

    if (!e.target.value) return
    setSearchLoading(true)
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      searchHandle(e.target.value)
    }, 1000);
  }

  const searchHandle = async (str: any) => {
    setSearchLoading(true)
    const res = await api.get(`/lens/handles/byHandles/${str}`)
    setSearchLoading(false)
    if (res && res.data) {
      setSearchHandles(res.data)
    } else {
      setSearchHandles([])
    }
    // console.log(res)
  }

  const getImgUrl = (str: string) => {
    const imgUrl = str.replace(
      "https://ipfs.infura.io",
      "https://lens.infura-ipfs.io"
    );
    return formatIPFS(imgUrl);
  };

  const showCampNftMsg = () => {
    setShowPermission(true)
    setMsgInfo({
      msg: noNftMsg,
      link: campignNftLink
    })
  }

  const showLensMsg = () => {
    setShowPermission(true)
    setMsgInfo({
      msg: noLensMsg,
      link: lensCollectionLink
    })
  }

  const goHome = () => {
    if (props.type === 1) {
      if (isHaveLensHandle) {
        setCurrentProfileByRouter(profileList[0])
        // setCurrentProfile(profileList[0])
      } else {
        showLensMsg()
      }
    }
    if (props.type === 2) {
      if (isHaveNft && isHaveLensHandle) {
        // setCurrentProfile(profileList[0])
        setCurrentProfileByRouter(profileList[0])
      } else if ((isHaveNft && !isHaveLensHandle) || (!isHaveNft && !isHaveLensHandle)) {
        showLensMsg()
      } else if (!isHaveNft && isHaveLensHandle) {
        showCampNftMsg()
      }
    }
  }

  const toSearchPermission = () => {
    console.log(props.type)
    if (props.type === 2) {
      if (!isHaveNft) {
        showCampNftMsg()
      }
    }
  }

  const switchMyProfile = (item: any) => {
    if (props.type === 2 && (isHaveLensHandle && !isHaveNft)) {
      showLensMsg()
    } else {
      // setCurrentProfile(item);
      setCurrentProfileByRouter(item)
      setOpenLensDrop(false)
    }
  }

  useEffect(() => {
    if (account && !isHaveNft && knn3TokenValid && !loadingNft && props.type === 2) {
      showCampNftMsg()
    }
  }, [loadingNft]);

  const connectOrLogin = () => {
    if (account) {
      doLogin()
    } else {
      connectWallet()
    }
  }

  return (
    <div className="w-full h-10 flex gap-3 items-center">
      <div className="h-8 flex gap-2 items-center">
        <div>{props.type == 1 ? 'Profile of' : 'Dashboard of'}</div>
        <div className="h-full">
          <Dropdown
            open={openLensDrop}
            onOpenChange={(e: any) => setOpenLensDrop(e)}
            overlay={
              <Menu className="lens-switch-component">
                <div className={`py-1 mx-[5%] text-[#fff] ${props.type == 2 && !knn3TokenValid ? 'w-[200px]' : 'w-[90%]'}`}>
                  {
                    ((props.type == 2 && knn3TokenValid && account) || props.type === 1) &&
                    <Input className="connect-component-input" placeholder="Search" allowClear onClick={() => { toSearchPermission() }} onChange={(e) => searchInputChange(e)} value=

                      {inputValue} />
                  }
                  {
                    props.type == 2 && !knn3TokenValid &&
                    <div className="w-[90%] text-center py-1 bg-[#fff] rounded-[4px] text-[#000] text-[14px] font-[600] cursor-pointer" onClick={() => connectOrLogin()}>
                      {account ? 'Log in' : 'Connect'} to view more
                    </div>
                  }

                  {
                    !searchLoading && !inputValue &&
                    <>
                      {
                        profileList.length > 0 &&
                        <p className="text-xl my-3">Yours</p>
                      }
                      {
                        profileList.map((t: any, i: number) => (
                          <div className="flex text-[16px] items-center gap-1 mb-2 hover:opacity-70 cursor-pointer" key={i} onClick={() => { switchMyProfile(t) }}>
                            {
                              t.imageURI &&
                              <img
                                className="w-[26px] h-[26px] rounded-[13px] mr-2"
                                src={getImgUrl(t.imageURI)}
                                alt="" />
                            }
                            {
                              !t.imageURI &&
                              <Image
                                className="w-[26px] h-[26px] rounded-[13px] mr-2"
                                src={ImgLenster}
                                alt="" />
                            }
                            {t.handle}
                          </div>
                        ))
                      }
                      <p className="text-xl my-3">Recommend</p>
                      {
                        commendProfileList.map((t: any, i: number) => (
                          <div className="flex text-[16px] items-center gap-1 mb-2 hover:opacity-70 cursor-pointer" key={i} onClick={() => {
                            setCurrentProfileByRouter(t); setOpenLensDrop(false)
                          }}>
                            <img
                              className="w-[26px] h-[26px] rounded-[13px] mr-2"
                              src={getImgUrl(t.imageURI)}
                              alt=""
                            />
                            {t.handle}
                          </div>
                        ))
                      }
                    </>
                  }
                  {
                    searchLoading &&
                    <div className="w-full h-full flex items-center justify-center">
                      <div className=" my-[80px]">
                        <LoadingOutlined className="text-2xl block mx-auto" />
                        <div>Searching users</div>
                      </div>
                    </div>
                  }
                  {
                    !searchLoading && inputValue &&
                    <>
                      {
                        searchHandles.map((t: any, i: number) => (
                          <div className="flex items-center text-[16px] gap-1 mb-2 mt-2 hover:opacity-70 cursor-pointer" key={i} onClick={() => {
                            setCurrentProfileByRouter(t); setOpenLensDrop(false)
                          }}>
                            {
                              t.imageURI &&
                              // <img
                              //   className="w-[26px] h-[26px] rounded-[13px] mr-2"
                              //   src={getImgUrl(t.imageURI)}
                              //   alt="" />
                              <img
                                className="w-[26px] h-[26px] rounded-[50%] mr-2"
                                src={getImgUrl(t.imageURI)}
                                alt=""
                              />
                            }
                            {
                              !t.imageURI &&
                              <Image
                                className="w-[26px] h-[26px] rounded-[13px] mr-2"
                                src={ImgLenster}
                                alt="" />
                            }
                            {t.handle}
                          </div>
                        ))
                      }
                    </>
                  }
                </div>
              </Menu>
            }
          >
            <div onClick={(e) => e.preventDefault()} className="flex h-full">
              <button className="h-full px-4 flex justify-center items-center bg-[#272727] rounded-[4px] min-w-[100px]">
                {
                  currentProfile && currentProfile.handle &&
                  <>
                    {
                      currentProfile.imageURI ? (
                        <img
                          className="w-[20px] h-[20px] rounded-[10px] mr-2"
                          src={getImgUrl(currentProfile.imageURI)}
                          alt=""
                        />
                      ) : (
                        <Image
                          className="w-[20px] h-[20px] rounded-[10px] mr-2"
                          src={ImgLenster}
                          alt=""
                        />
                      )
                    }
                  </>
                }
                <span className="mr-3">{currentProfile?.handle}</span>
                <DownOutlined className='ml-auto' />
              </button>
            </div>
          </Dropdown>
        </div>
        {
          account && knn3TokenValid &&
          <div className="flex items-center justify-center bg-[#272727] rounded-[4px] h-8 w-8 cursor-pointer" onClick={() => goHome()}>
            <Image
              className="w-[18px] h-[18px]"
              src={ImgHome}
              alt=""
            />
          </div>
        }

        {
          showPermission &&
          <PermissionMsg
            info={msgInfo}
            onCancel={() => setShowPermission(false)}
          ></PermissionMsg>
        }
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
          knn3TokenValid && account && (
            <>
              {/* {router.query.address !== account &&
                router.pathname === "/nft/[address]" &&
                profileList.length > 0 && (
                  <></>
                  // <button
                  //   className="h-full px-4 flex justify-center items-center bg-[#272727] rounded-[4px] text-[#fff]"
                  //   onClick={() => gotoMyNft()}
                  // >
                  //   Check My NFT
                  // </button>
                )} */}
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
                  {
                    currentLoginProfile.handle &&
                    <>
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
                    </>
                  }
                  {currentLoginProfile.handle || shortenAddr(account)}
                </button>
              </Popover>
            </>
          )
        )}
        {!knn3TokenValid ? (
          <button
            onClick={determineLoginModal}
            className="h-full px-4 flex justify-center items-center bg-[#272727] rounded-[4px] text-[#fff]"
          >
            {account ? "Log in" : "Connect Wallet"}
          </button>
        ) : !account && (
          <button
            onClick={determineLoginModal}
            className="h-full px-4 flex justify-center items-center bg-[#272727] rounded-[4px] text-[#fff]"
          >
            Connect Wallet
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