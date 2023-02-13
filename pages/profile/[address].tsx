import React, { useState, useEffect, useCallback } from "react";
import Navbar from '../../components/Navbar'
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import { Dropdown, Space, Menu, Drawer, message } from "antd";
import BN from "bignumber.js";
import { formatIPFS } from "../../lib/tool";
import useWeb3Context from "../../hooks/useWeb3Context";
import ConnectBtn from '../../components/ConnectBtn'
import lensApi from "../../api/lensApi";
import Radar from '../../components/profile/Radar'
import Router, { useRouter } from "next/router";
import api from "../../api";
import ImgGenerate from "../../statics/img/generate-button.gif";
import ImgHoverGenerate from "../../statics/img/hover-generate-button.gif";
import Image from 'next/image'
import { useRecoilState } from 'recoil';
import { currentProfileState, profileListState } from '../../store/state'

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
  profileId: "5",
  name: "KNN3 Network Official"
}

const Post = () => {

  const { account, connectWallet } = useWeb3Context();
  const [showList, setShowList] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [currentProfile, setCurrentProfile] = useRecoilState<any>(currentProfileState);
  const [activeRankIndex, setActiveRankIndex] = useState<number>(0);
  const [canLoadAvatar, setCanLoadAvatar] = useState<boolean>(true);
  const [rankInfo, setRankInfo] = useState<any>({});
  const [imageURI, setImageURI] = useState<any>("");
  const [showRadorGif, setShowRadorGif] = useState(false);
  const [openScoreDropdown, setOpenScoreDropdown] = useState(false);
  const [radarDetailScore, setRadarDetailScore] = useState<any>({});
  const [profileList,] = useRecoilState(profileListState);

  const router = useRouter();

  const { address, queryProfileId } = router.query;

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

  const getProfileByHandle = async (handle: string) => {
    console.log('h is', handle)
    const res = await lensApi.getProfileByHandle(handle);
    if (res && res.picture && res.picture.original && res.picture.original.url) {
      setImageURI(res.picture.original.url)
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

  useEffect(() => {
    const { profileId } = currentProfile;
    if (!profileId) {
      getUserInfo(defaultKnn3Profile.profileId);
    } else {
      getUserInfo(profileId);
    }
    if (currentProfile.handle) {
      getProfileByHandle(currentProfile.handle)
    } else {
      getProfileByHandle(defaultKnn3Profile.handle)
    }
  }, [currentProfile]);

  useEffect(() => {
    if (account) {
      if (profileList.length == 0) {
        message.info("You must have a Lens Protocol Profile");
      }
    }
  }, [profileList, account]);

  return (
    <div className="w-full h-full bg-[#000] flex">
      <Navbar />
      <div className='p-5 w-full text-[#fff]'>
        <ConnectBtn />
        <div className="toscore-main">
          <div>
            <div className="toscore-main-base-info">
              {imageURI && canLoadAvatar ? (
                <img
                  className="net-head-img"
                  onError={() => setCanLoadAvatar(false)}
                  src={formatIPFS(imageURI)}
                />
              ) : (
                <div className="net-head-img">K</div>
              )}
              <div>
                <div>
                  <span className="space">{(currentProfile.name || currentProfile.handle) ? (currentProfile.name || currentProfile.handle) : defaultKnn3Profile.name}</span>
                </div>
                <div>@{currentProfile.handle ? currentProfile.handle : defaultKnn3Profile.handle}</div>
              </div>
            </div>
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
            {!account && (
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
                    onClick={() => connectWallet()}
                    src={ImgHoverGenerate}
                    alt=""
                  />
                )}
              </div>
            )}
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
              placement="right"
              open={showList}
              closable={false}
              onClose={onClose}
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
                  <div onClick={onClose} className="ml-[auto] cursor-pointer text-[18px] bg-[#262626] text-[#fff] h-10 w-10 flex justify-center items-center rounded-[4px]">
                    <CloseOutlined />
                  </div>
                </div>
                <div className="bg-[#262626] mt-2 rounded-[4px] py-3 pl-5 text-[rgba(255,255,255,1)]">
                  <div className="text-[#D1D1D1]">Score</div>
                  <div className="text-[24px]">{new BN(getItemScore()).toFixed(2)}</div>
                  <div className="text-[#D1D1D1] text-[12px] mb-4">- 2  this week</div>
                  <div className="text-[#D1D1D1]">Rank</div>
                  <div className="text-[24px]">{getItemRank()}</div>
                  <div className="text-[#D1D1D1] text-[12px]">- 2  this week</div>
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
