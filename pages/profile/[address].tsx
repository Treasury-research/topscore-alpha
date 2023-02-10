import React, { useState, useEffect, useCallback } from "react";
import Navbar from '../../components/Navbar'
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import { Dropdown, Space, Menu, Drawer } from "antd";
import BN from "bignumber.js";
import { formatIPFS } from "../../lib/tool";
import useWeb3Context from "../../hooks/useWeb3Context";
import ConnectBtn from '../../components/ConnectBtn'
import Radar from '../../components/profile/Radar'
import Router, { useRouter } from "next/router";
import api from "../../api";
import ImgGenerate from "../../statics/img/generate-button.gif";
import ImgHoverGenerate from "../../statics/img/hover-generate-button.gif";
import Image from 'next/image'
import { useRecoilState } from 'recoil';
import { currentProfileState } from '../../store/state'

const defaultPageLimit = 6;

const typeList = [
  "Influence",
  "Campaign",
  "Engagement",
  "Creation",
  "Collection",
  "Curation",
];

export async function getServerSideProps(context: any) {
  return {
    props: {
      pId: context.query.queryProfileId || null
    }
  }
}


const Post = () => {

  const { account, connectWallet } = useWeb3Context();
  const [showList, setShowList] = useState(false);
  const [handlesList, setHandlesList] = useState<any>([]);
  const [loadingHandlesList, setLoadingHandlesList] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [currentProfile, setCurrentProfile] = useState<any>({});
  const [activeHandleIndex, setActiveHandleIndex] = useState<number>(0);
  const [activeRankIndex, setActiveRankIndex] = useState<number>(0);
  const [pub, setPub] = useState<any>({});
  const [canLoadAvatar, setCanLoadAvatar] = useState<boolean>(true);
  const [rankInfo, setRankInfo] = useState<any>({});
  const [isSelf, setIsSelf] = useState<boolean>(false);
  const [showRadorGif, setShowRadorGif] = useState(false);
  const [openScoreDropdown, setOpenScoreDropdown] = useState(false);
  const [openLensDropdown, setOpenLensDropdown] = useState(false);
  const [radarDetailScore, setRadarDetailScore] = useState<any>({});
  const [currentProfileBase, setCurrenProfileBase] = useRecoilState<any>(currentProfileState);

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

  const getLensHandle = async () => {
    setLoadingHandlesList(true);
    try {
      const res: any = await api.get(`/lens/handles/${address}`);
      setHandlesList(res.data);
      if (res.data.length === 0) {
        setCurrentProfile({});
      }
    } finally {
      setLoadingHandlesList(false);
    }
  };

  const getIndicators = async (profileId: string) => {
    const res: any = await api.get(`/lens/indicators/${profileId}`);
    setUserInfo((prev: any) => ({
      ...prev,
      ...res.data,
    }));
  };

  const getPublication = async (profileId: string) => {
    const res: any = await api.get(`/lens/publication/${profileId}`);
    setUserInfo((prev: any) => ({
      ...prev,
      ...res.data,
    }));
  };

  const getDetailScores = async (profileId: string) => {
    const res: any = await api.get(`/lens/scores/${profileId}`);
    setRadarDetailScore(res.data);
  };

  const getItemScore = () => {
    if(radarDetailScore && JSON.stringify(radarDetailScore) !== '{}'){
      if(activeRankIndex == 0){
        return radarDetailScore.influScore
      }
      if(activeRankIndex == 1){
        return radarDetailScore.campaignScore
      }
      if(activeRankIndex == 2){
        return radarDetailScore.engagementScore
      }
      if(activeRankIndex == 3){
        return radarDetailScore.creationScore
      }
      if(activeRankIndex == 4){
        return radarDetailScore.collectionScore
      }
      if(activeRankIndex == 5){
        return radarDetailScore.curationScore
      }
    }
  };

  const getItemRank = () => {
    if(radarDetailScore && JSON.stringify(radarDetailScore) !== '{}'){
      if(activeRankIndex == 0){
        return radarDetailScore.influRank
      }
      if(activeRankIndex == 1){
        return radarDetailScore.campaignRank
      }
      if(activeRankIndex == 2){
        return radarDetailScore.engagementRank
      }
      if(activeRankIndex == 3){
        return radarDetailScore.creationRank
      }
      if(activeRankIndex == 4){
        return radarDetailScore.collectionRank
      }
      if(activeRankIndex == 5){
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
    setRankInfo((prev: any) => ({
      ...prev,
      ...res.data,
    }));
  };

  const getPub = async (profileId: string) => {
    const res: any = await api.get(`/lens/topPub/${profileId}`);
    setPub(res.data);
  };

  const getUserInfo = async (profileId: string) => {
    getRankInfo(profileId);
    getIndicators(profileId);
    getPub(profileId);
    getPublication(profileId);
    getDetailScores(profileId);
  };

  const showRank = (name: string) => {
    setActiveRankIndex(typeList.indexOf(name));
    setShowList(true);
  };

  useEffect(() => {
    console.log("addr change", address);
    if (!address) {
      return;
    }
    getLensHandle();
  }, [address]);

  useEffect(() => {
    if (!address || !account) {
      return;
    }

    setIsSelf(address === account);
  }, [address, account]);

  const changeProfile = (profileId: number) => {
    router.push(`/profile/${address}?queryProfileId=${profileId}`);
    // location.href = `/user/${address}?queryProfileId=${profileId}`
  };

  useEffect(() => {
    if (!handlesList || handlesList.length === 0) {
      return;
    }

    if (
      queryProfileId &&
      handlesList[activeHandleIndex].profileId !== Number(queryProfileId)
    ) {
      // setActiveHandleIndex(
      //   handlesList.findIndex(
      //     (item: any) => item.profileId === Number(queryProfileId)
      //   )
      // );
    } else {
      console.log("trig 2");

      // router.push(
      //   `/user/${address}?queryProfileId=${handlesList[activeHandleIndex].profileId}`
      // );
    }

    const profile = handlesList[activeHandleIndex];

    router.push(`/profile/${address}?queryProfileId=${profile.profileId}`);

    setCurrentProfile(profile);
    // setCurrenProfileBase(profile);
  }, [activeHandleIndex, handlesList]);

  useEffect(() => {
    const { profileId } = currentProfile;
    if (!profileId) {
      return;
    }

    getUserInfo(profileId);
  }, [currentProfile]);

  return (
    <div className="w-full h-full bg-[#000] flex">
      <Navbar />
      <div className='p-5 w-full text-[#fff]'>
        <ConnectBtn />
        <div className="toscore-main">
          <div>
            {handlesList && handlesList.length > 0 ? (
              <div className="toscore-main-base-info">
                {currentProfileBase.imageURI && canLoadAvatar ? (
                  <img
                    className="net-head-img"
                    onError={() => setCanLoadAvatar(false)}
                    src={formatIPFS(currentProfileBase.imageURI)}
                  />
                ) : (
                  <div className="net-head-img">K</div>
                )}
                <div>
                  <div>
                    <span className="space">{currentProfileBase.name || currentProfileBase.handle}</span>
                    {/* <Dropdown
                      open={openLensDropdown}
                      onOpenChange={(e: any) => setOpenLensDropdown(e)}
                      overlay={
                        <Menu>
                          {handlesList.map((t: any, i: number) => (
                            <div
                              className="drop-menu"
                              key={i}
                              onClick={() => {
                                setActiveHandleIndex(i);
                                changeProfile(t.profileId);
                                setOpenLensDropdown(false);
                              }}
                            >
                              {t.handle}
                            </div>
                          ))}
                        </Menu>
                      }
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space className="space">
                          {currentProfile.name || currentProfile.handle}
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown> */}
                  </div>
                  <div>@{currentProfileBase.handle}</div>
                </div>
              </div>
            ) : loadingHandlesList ? (
              <div className="empty-hint"> Loading...</div>
            ) : (
              <div className="empty-hint"> You don't have any profile yet.</div>
            )}
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
                      <p>{new BN(userInfo.following).toFormat()}</p>
                      <p>Following</p>
                    </div>
                    <div>
                      <p>{new BN(userInfo.collect).toFormat()}</p>
                      <p>Collections</p>
                    </div>
                  </div>
                  <div>
                  <div>
                      <p>{new BN(userInfo.follower).toFormat()}</p>
                      <p>Followers</p>
                    </div>
                    <div>
                      <p>{new BN(userInfo.collectBy).toFormat()}</p>
                      <p>Collected</p>
                    </div>
                  </div>
                </div>
                <div className="right-del-info">
                  <div>
                    <div>
                      <p>{new BN(userInfo.publication).toFormat()}</p>
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
                        <span>{new BN(userInfo.post).toFormat()}</span>
                        <span>Posts</span>
                      </p>
                      <p>
                        <span>{new BN(userInfo.comment).toFormat()}</span>
                        <span>Comments</span>
                      </p>
                      <p>
                        <span>{new BN(userInfo.mirror).toFormat()}</span>
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
