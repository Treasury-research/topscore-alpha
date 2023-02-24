import React, { useState, useEffect, useCallback } from "react";
import Navbar from '../../components/Navbar'
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import { Dropdown, Space, Menu, Drawer, message, Popover } from "antd";
import BN from "bignumber.js";
import { formatIPFS } from "../../lib/tool";
import useWeb3Context from "../../hooks/useWeb3Context";
import ConnectBtn from '../../components/ConnectBtn'
import lensApi from "../../api/lensApi";
import Radar from '../../components/profile/Radar'
import log from "../../lib/log";
import Follow from '../../components/Follow'
import api from "../../api";
import Image from 'next/image'
import { useRecoilState } from 'recoil';
import { currentProfileState, profileListState, loadingProfileListState, knn3TokenValidState } from '../../store/state'
import ImgLenster from '../../statics/img/lest-head.png'
import ImgPremium from '../../statics/img/premium.gif'

const typeList = [
  "Influence",
  "Campaign",
  "Engagement",
  "Creation",
  "Collection",
  "Curation",
];

const defaultKnn3Profile = {
  address: "0x09c85610154a276a71eb8a887e73c16072029b20",
  handle: "knn3_network.lens",
  profileId: "101548",
  name: "KNN3 Network Official"
}

const Post = () => {

  const { account, doLogin } = useWeb3Context();
  const [showList, setShowList] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [currentProfile, setCurrentProfile] = useRecoilState<any>(currentProfileState);
  const [loadingProfileList] = useRecoilState<any>(loadingProfileListState);
  const [activeRankIndex, setActiveRankIndex] = useState<number>(0);
  const [canLoadAvatar, setCanLoadAvatar] = useState<boolean>(true);
  const [rankInfo, setRankInfo] = useState<any>({});
  const [imageURI, setImageURI] = useState<any>("");
  const [showRadorGif, setShowRadorGif] = useState(false);
  const [openScoreDropdown, setOpenScoreDropdown] = useState(false);
  const [radarDetailScore, setRadarDetailScore] = useState<any>({});
  const [profileList,] = useRecoilState(profileListState);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isHaveNft, setIsHaveNft] = useState<boolean>(false);
  const [knn3TokenValid, setKnn3TokenValid] =
    useRecoilState(knn3TokenValidState);

  const [rador1, setRador1] = useState([
    { name: "Influence", value: 0 },
    { name: "Campaign", value: 0 },
    { name: "Engagement", value: 0 },
    { name: "Curation", value: 0 },
    { name: "Collection", value: 0 },
    { name: "Creation", value: 0 },
  ]);

  const onClose = () => {
    setShowList(false);
  };

  const getAllNfts = async () => {
    const res = (await api.get(`/lens/tokenIds/${account}`));
    if (res && res.data && res.data.length > 0) {
      const res2: any = await api.get("/v1/nft/query_ids", {
        params: {
          ids: res.data.join(','),
        },
      });
      if (res2 && res2.data && res2.data.length > 0) {
        setIsHaveNft(true)
      }
    }
  }

  const getProfileByHandle = async (handle: string) => {
    const res = await lensApi.getProfileByHandle(handle);
    if (res && res.picture && res.picture.original && res.picture.original.url) {
      setImageURI(res.picture.original.url)
    }
    if (res && res.picture && res.picture.uri) {
      setImageURI(res.picture.uri)
    }
    console.log('profile info', res)
  }


  const getIndicators = async (profileId: string) => {
    const res: any = await api.get(`/lens/indicators/${profileId}`);
    if (res && res.data) {
      setUserInfo((prev: any) => ({
        ...prev,
        ...res.data,
      }));
    }

  };

  const getPublication = async (profileId: string) => {
    const res: any = await api.get(`/lens/publication/${profileId}`);
    if (res && res.data) {
      setUserInfo((prev: any) => ({
        ...prev,
        ...res.data,
      }));
    }
  };

  const getDetailScores = async (profileId: string) => {
    const res: any = await api.get(`/lens/scores/${profileId}`);
    if (res && res.data) {
      setRadarDetailScore(res.data);
    }
  };

  const getItemScore = () => {
    if (radarDetailScore && JSON.stringify(radarDetailScore) !== '{}') {
      if (activeRankIndex == 0) {
        return radarDetailScore.influScore
      }
      if (activeRankIndex == 1) {
        return radarDetailScore.campaignScore
      }
      if (activeRankIndex == 2) {
        return radarDetailScore.engagementScore
      }
      if (activeRankIndex == 3) {
        return radarDetailScore.creationScore
      }
      if (activeRankIndex == 4) {
        return radarDetailScore.collectionScore
      }
      if (activeRankIndex == 5) {
        return radarDetailScore.curationScore
      }
    }
  };

  const getItemRank = () => {
    if (radarDetailScore && JSON.stringify(radarDetailScore) !== '{}') {
      if (activeRankIndex == 0) {
        return radarDetailScore.influRank
      }
      if (activeRankIndex == 1) {
        return radarDetailScore.campaignRank
      }
      if (activeRankIndex == 2) {
        return radarDetailScore.engagementRank
      }
      if (activeRankIndex == 3) {
        return radarDetailScore.creationRank
      }
      if (activeRankIndex == 4) {
        return radarDetailScore.collectionRank
      }
      if (activeRankIndex == 5) {
        return radarDetailScore.curationRank
      }
    }
  };

  useEffect(() => {
    const {
      influReda,
      campaignReda,
      engagementReda,
      collectReda,
      creationReda,
      curationReda,
    } = rankInfo;

    setRador1(() => {
      return [
        ...[
          { name: "Influence", value: influReda },
          { name: "Campaign", value: campaignReda },
          { name: "Engagement", value: engagementReda },
          { name: "Curation", value: curationReda },
          { name: "Collection", value: collectReda },
          { name: "Creation", value: creationReda },
        ],
      ];
    });

  }, [rankInfo]);

  const getRankInfo = async (profileId: string) => {
    const res: any = await api.get(`/lens/scores/${profileId}`);
    if (res && res.data) {
      setRankInfo((prev: any) => ({
        ...prev,
        ...res.data,
      }));
    }
  };

  const getUserInfo = async (profileId: string) => {
    getRankInfo(profileId);
    getIndicators(profileId);
    getPublication(profileId);
    getDetailScores(profileId);
  };

  const showRank = (name: string) => {
    setActiveRankIndex(typeList.indexOf(name));
    setShowList(true);
  };

  const getContent = () => {
    return (
      <div>
        <p>Premium user</p>
      </div>
    )
  };

  useEffect(() => {
    if (loadingProfileList || !knn3TokenValid) {
      return
    }
    const { profileId } = currentProfile;
    if (profileId) {
      getUserInfo(profileId);
      getAllNfts();
    }
    if (currentProfile.handle) {
      getProfileByHandle(currentProfile.handle)
    }
  }, [currentProfile, loadingProfileList]);

  useEffect(() => {
    if (knn3TokenValid) {
      return
    }

    getUserInfo(defaultKnn3Profile.profileId);
    getProfileByHandle(defaultKnn3Profile.handle)

  }, [knn3TokenValid])

  useEffect(() => {
    log('visit_profile', account)
  }, [])

  useEffect(() => {
    setShowList(true)
  }, [])

  // useEffect(() => {
  //   if (account) {
  //     if (profileList.length == 0 && !loadingProfileList) {
  //       message.info("You must have a Lens Protocol Profile");
  //     }
  //   }
  // }, [profileList, account, loadingProfileList]);

  useEffect(() => {
    if (isLogin && account) {
      doLogin();
    }
  }, [isLogin, account]);

  return (
    <div className="w-full h-full bg-[#000] flex">
      <Navbar />
      <div className='p-5 w-full text-[#fff]'>
        <ConnectBtn />
        <div className="toscore-main">
          <div className="flex items-center justify-between">
            <div className="toscore-main-base-info">
              {imageURI && canLoadAvatar ? (
                <img
                  className="net-head-img"
                  onError={() => setCanLoadAvatar(false)}
                  src={formatIPFS(imageURI)}
                />
              ) : (
                <Image
                  className="net-head-img"
                  src={ImgLenster}
                  alt=""
                />
              )}

              {!loadingProfileList && <div>
                <div>
                  <span className="space">{(currentProfile.name || currentProfile.handle) ? (currentProfile.name || currentProfile.handle) : defaultKnn3Profile.name}</span>
                </div>
                <div>@{currentProfile.handle ? currentProfile.handle : defaultKnn3Profile.handle}</div>
              </div>}
              {
                isHaveNft && profileList.length > 0 &&
                <div className='mt-2 ml-1'>
                  <Popover placement="top" content={() => getContent()}>
                    <Image
                      className="h-[40px] w-[40px] object-cover"
                      alt=''
                      src={ImgPremium}
                    />
                  </Popover>
                </div>
              }
            </div>

            {/** Show follow button only when it's knn3 */}
            {!currentProfile.handle && account && !loadingProfileList && <Follow
              profileId={currentProfile.profileId}
              handle={currentProfile.handle}
            />}

          </div>

          <div className="top-rador">
            <div>
              <Radar
                data={rador1}
                id="top-rador"
                width={"100%"}
                height={"100%"}
                showTooltip={true}
                showList={(name: string) => showRank(name)}
              />
            </div>
            {/* {!account && (
              <div className="generate">
                {!showRadorGif && (
                  <Image
                    src={ImgGenerate}
                    alt=""
                    onMouseEnter={() => setShowRadorGif(true)}
                  />
                )}
                {showRadorGif && (
                  <Image
                    onMouseLeave={() => setShowRadorGif(false)}
                    onClick={() => connectAndLogin()}
                    src={ImgHoverGenerate}
                    alt=""
                  />
                )}
              </div>
            )} */}
            <div className="top-rador-info">
              <div className="rador-info">
                <div>
                  <div>
                    <div>
                      <p>{new BN(userInfo.following || 0).toFormat()}</p>
                      <p>Following</p>
                    </div>
                    <div>
                      <p>{new BN(userInfo.collect || 0).toFormat()}</p>
                      <p>Collections</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>{new BN(userInfo.follower || 0).toFormat()}</p>
                      <p>Followers</p>
                    </div>
                    <div>
                      <p>{new BN(userInfo.collectBy || 0).toFormat()}</p>
                      <p>Collected</p>
                    </div>
                  </div>
                </div>
                <div className="right-del-info">
                  <div>
                    <div>
                      <p>{new BN(userInfo.publication || 0).toFormat()}</p>
                      <p>Publications</p>
                    </div>
                  </div>
                  <div>
                    {/* <div>
                      <p>{new BN(userInfo.collectBy).toFormat()}</p>
                      <p>Collected</p>
                    </div> */}
                    <div className="diff-sty-info">
                      <p>
                        <span>{new BN(userInfo.post || 0).toFormat()}</span>
                        <span>Posts</span>
                      </p>
                      <p>
                        <span>{new BN(userInfo.comment || 0).toFormat()}</span>
                        <span>Comments</span>
                      </p>
                      <p>
                        <span>{new BN(userInfo.mirror || 0).toFormat()}</span>
                        <span>Mirrors</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Drawer
              title=""
              className="profile-tips"
              rootClassName="profile-drawer"
              placement="right"
              open={showList}
              closable={false}
              onClose={() => onClose()}
            >
              <div>
                <div className="drawer flex">
                  <div className="bg-[#262626] text-[#fff] h-10 px-6 flex justify-center items-center rounded-[4px]">
                    <Dropdown
                      open={openScoreDropdown}
                      onOpenChange={(e: any) => setOpenScoreDropdown(e)}
                      overlay={
                        <Menu>
                          {typeList.map((t, i) => (
                            <div
                              className="drop-menu text-[#fff]"
                              key={i}
                              onClick={(e) => {
                                setActiveRankIndex(i);
                                setOpenScoreDropdown(false);
                              }}
                            >
                              {t}
                            </div>
                          ))}
                        </Menu>
                      }
                    >
                      <div onClick={(e) => e.preventDefault()} className="flex">
                        <Space className="space">
                          <span className="list-type text-[18px]">
                            {typeList[activeRankIndex]}
                          </span>
                          <DownOutlined />
                        </Space>

                      </div>
                    </Dropdown>
                  </div>
                  <div onClick={() => onClose()} className="ml-[auto] cursor-pointer text-[18px] bg-[#262626] text-[#fff] h-10 w-10 flex justify-center items-center rounded-[4px]">
                    <CloseOutlined />
                  </div>
                </div>
                <div className="bg-[#262626] mt-2 rounded-[4px] py-3 pl-5 text-[rgba(255,255,255,1)]">
                  <div className="text-[#D1D1D1]">Score</div>
                  <div className="text-[24px] mb-4">{new BN(getItemScore() || 0).toFixed(2) || 0}</div>
                  {/* <div className="text-[#D1D1D1] text-[12px] mb-4">- 2  this week</div> */}
                  <div className="text-[#D1D1D1]">Rank</div>
                  <div className="text-[24px]">{getItemRank() || 0}</div>
                  {/* <div className="text-[#D1D1D1] text-[12px]">- 2  this week</div> */}
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Post
