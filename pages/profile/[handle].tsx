import React, { useState, useEffect, useRef } from "react";
import Navbar from '../../components/Navbar'
import { LeftOutlined, RightOutlined, LoadingOutlined } from "@ant-design/icons";
import { Carousel } from "antd";
import { useRouter } from "next/router";
import { formatIPFS } from "../../lib/tool";
import useWeb3Context from "../../hooks/useWeb3Context";
import ConnectBtn from '../../components/ConnectBtn'
import DonutChart from '../../components/profile/DonutChart'
import Follow from '../../components/Follow'
import Image from "next/image";
import ImgPolygonpath from "../../statics/img/profileV2/polygon-path.svg";
import ImgLenster from "../../statics/img/profileV2/lenster.svg";
import ImgOpensea from "../../statics/img/profileV2/opensea.svg"
import ImgEdit from "../../statics/img/profileV2/edit.svg"
import ImgCopy from "../../statics/img/profileV2/copy.svg"
import ImgDownLoad from "../../statics/img/profileV2/downLoad.svg"
import ImgPerson from "../../statics/img/profileV2/person.svg"
import ImgFollowing from "../../statics/img/profileV2/following.svg"
import ImgPublitions from "../../statics/img/profileV2/publitions.svg"
import ImgPost from "../../statics/img/profileV2/post.svg"
import ImgComments from "../../statics/img/profileV2/comments.svg"
import ImgMirrors from "../../statics/img/profileV2/mirrors.svg"
import ImgCommentsby from "../../statics/img/profileV2/commentsby.svg"
import ImgMirrorsby from "../../statics/img/profileV2/mirrorsby.svg"
import ImgCollections from "../../statics/img/profileV2/collections.svg"
import ImgCollectedby from "../../statics/img/profileV2/collectedby.svg"
import ImgLensterHead from "../../statics/img/lest-head.svg";
import ImgPremium from '../../statics/img/premium.gif'
import SvgPremium from '../../statics/img/premium.svg'
import api from "../../api";
import lensApi from "../../api/lensApi";
import domtoimage from 'dom-to-image';
import trace from "../../api/trace";

import {
  currentProfileState,
  currentLoginProfileState,
  routerHandleState
} from "../../store/state";
import { useRecoilState } from "recoil";
import { shortenAddr, switchChain, copyToClipboard, downLoadImg } from "../../lib/tool";
const baseImgInfo = [{
  text: 'Followers',
  acount: 0,
  imgUrl: ImgPerson
},
{
  text: 'Following',
  acount: 0,
  imgUrl: ImgFollowing
},
{
  text: 'Publications',
  acount: 0,
  imgUrl: ImgPublitions
},
{
  text: 'Posts',
  acount: 0,
  imgUrl: ImgPost
},
{
  text: 'Comments',
  acount: 0,
  imgUrl: ImgComments
},
{
  text: 'Mirrors',
  acount: 0,
  imgUrl: ImgMirrors
},
{
  text: 'Comments (by)',
  acount: 0,
  imgUrl: ImgCommentsby
},
{
  text: 'Mirrors (by)',
  acount: 0,
  imgUrl: ImgMirrorsby
},
{
  text: 'Collections',
  acount: 0,
  imgUrl: ImgCollections
},
{
  text: 'Collected (by)',
  acount: 0,
  imgUrl: ImgCollectedby
}]

let grades = [{
  level: 0,
  text: 'Influence',
  score: 0,
  rank: 0,
},
{
  level: 0,
  text: 'Creation',
  score: 0,
  rank: 0,
},
{
  level: 0,
  text: 'Campaign',
  score: 0,
  rank: 0,
},
{
  level: 0,
  text: 'Collection',
  score: 0,
  rank: 0,
},
{
  level: 0,
  text: 'Engagement',
  score: 0,
  rank: 0,
},
{
  level: 0,
  text: 'Curation',
  score: 0,
  rank: 0,
}]

const profile = () => {

  const { account, chainId, doLogout } = useWeb3Context();

  const carouselRef = useRef(null)

  const [showNftBtn, setShowNftBtn] = useState<boolean>(false)

  const [activeHoverIndex, setActiveHoverIndex] = useState<any>('')

  const [nftList, setNftList] = useState<any>([])

  const [currentIndicators, setCurrentIndicators] = useState<any>(baseImgInfo)

  const [rate, setRate] = useState<any>(grades)

  const [indicatorLoading, setIndicatorLoading] = useState<boolean>(true)

  const [ratingLoading, setRatingLoading] = useState<boolean>(true)

  const [scoreLoading, setScoreLoading] = useState<boolean>(true)

  const [creatorLevel, setCreatorLevel] = useState<any>(0)

  const [rateHoveActive, setRateHoveActive] = useState<any>('')

  const [introduce, setIntroduce] = useState<any>('')

  const [nftTotal, setNftTotal] = useState<any>(0)

  const [showPremiumGif, setShowPremiumGif] = useState<boolean>(true)

  const router = useRouter();

  const [currentProfile, setCurrentProfile] =
    useRecoilState<any>(currentProfileState);

  const [currentLoginProfile, setCurrentLoginProfile] =
    useRecoilState<any>(currentLoginProfileState);
  const [loadingRouterHandle, setLoadingRouterHandle] = useRecoilState(
    routerHandleState
  );

  const getAllNfts = async () => {
    const res = (await api.get(`/lens/tokenIds/${currentProfile.address}`));
    if (res && res.data && res.data.length > 0) {
      const res2: any = await api.get("/v1/nft/query_ids", {
        params: {
          ids: res.data.join(','),
        },
      });
      if (res2 && res2.data && res2.data.length > 0) {
        // setTotal(res2.data.length);
        let newList: any = [];
        for (var i = 0; i < res2.data.length; i += 4) {
          newList.push(res2.data.slice(i, i + 4));
        }
        setNftList(newList);
        setNftTotal(res2.data.length)
      } else {
        setNftList([]);
        setNftTotal(0)
      }
    } else {
      setNftTotal(0)
      setNftList([]);
    }
  }

  const getIndicators = async () => {
    setIndicatorLoading(true)
    const res: any = await api.get(`/lens/indicators/${currentProfile.profileId}`);
    setIndicatorLoading(false)
    if (res && res.data) {
      const data = res.data;
      setCurrentIndicators((prev: any) => {
        prev[0]['acount'] = data.follower
        prev[1]['acount'] = data.following
        prev[2]['acount'] = data.publication
        prev[3]['acount'] = data.post
        prev[4]['acount'] = data.comment
        prev[5]['acount'] = data.mirror
        prev[6]['acount'] = data.commentBy
        prev[7]['acount'] = data.mirrorBy
        prev[8]['acount'] = data.collect
        prev[9]['acount'] = data.collectBy
        return [...prev];
      });
    }
  };

  const getRating = async () => {
    setRatingLoading(true)
    const res = await api.get(`/lens/queryRating/?profileId=${currentProfile.profileId}`)
    setRatingLoading(false)
    if (res && res.data) {
      const data = res.data
      setCreatorLevel(res.data.creator_level)
      setRate((prev: any) => {
        prev[0]['level'] = data.influ_level
        prev[1]['level'] = data.creator_level
        prev[2]['level'] = data.compaign_level
        prev[3]['level'] = data.collector_level
        prev[4]['level'] = data.engager_level
        prev[5]['level'] = data.curator_level
        return [...prev];
      });
    }
  }

  const getScore = async () => {
    setScoreLoading(true)
    const res = await api.get(`/lens/scores/${currentProfile.profileId}`)
    setScoreLoading(false)
    if (res && res.data) {
      const data = res.data
      setRate((prev: any) => {
        prev[0]['score'] = data.influScore
        prev[0]['rank'] = data.influRank
        prev[1]['score'] = data.creationScore
        prev[1]['rank'] = data.creationRank
        prev[2]['score'] = data.campaignScore
        prev[2]['rank'] = data.campaignRank
        prev[3]['score'] = data.collectionScore
        prev[3]['rank'] = data.collectionRank
        prev[4]['score'] = data.engagementScore
        prev[4]['rank'] = data.engagementRank
        prev[5]['score'] = data.curationScore
        prev[5]['rank'] = data.curationRank
        return [...prev];
      });
    }
  }

  const getIntroduce = async () => {
    const res = await lensApi.getProfileByHandle(currentProfile.handle);
    if (res && res.bio) {
      setIntroduce(res.bio)
    } else {
      setIntroduce('')
    }
  }

  const getCurrentProfileByRouter = async (str: any) => {
    setLoadingRouterHandle(true)
    const res = await api.get(`/lens/handles/byHandles/${str}.lens`)
    setTimeout(() => {
      setLoadingRouterHandle(false)
    }, 500)
    if (res && res.data && res.data.length > 0) {
      let list = res.data.filter((t) => {
        return t.handle === `${str}.lens`
      })
      if (list.length > 0) {
        setCurrentProfile(list[0])
      }
    }
  }

  const getImgUrl = (str: string) => {
    const imgUrl = str.replace(
      "https://ipfs.infura.io",
      "https://lens.infura-ipfs.io"
    );
    return formatIPFS(imgUrl);
  };

  const getBgStyle = (i: number) => {
    if ((rateHoveActive === 0 && (i === 0 || i === 1)) ||
      (rateHoveActive === 1 && (i === 9)) ||
      (rateHoveActive === 2 && (i === 6 || i === 7)) ||
      (rateHoveActive === 3 && (i === 8)) ||
      (rateHoveActive === 4 && (i === 4 || i === 5)) ||
      (rateHoveActive === 5 && (i === 5))
    ) {
      return 'bg-[#303030]'
    }
  }

  const downLoadHtml2Img = () => {
    setShowPremiumGif(false)
    setTimeout(() => {
      domtoimage.toJpeg(document.getElementById('aphoto'), { quality: 0.95 })
        .then(function (dataUrl) {
          setShowPremiumGif(true)
          var link = document.createElement('a');
          link.download = `TopScore_${currentProfile.handle}.jpg`;
          link.href = dataUrl;
          link.click();
        });
    },500)
  }

  useEffect(() => {
    if (currentProfile && currentProfile.profileId) {
      getAllNfts()
      getIndicators()
      getRating()
      getScore()
      getIntroduce()
    }
  }, [currentProfile.profileId])

  useEffect(() => {
    if (router && router.query && router.query.handle) {
      setCurrentProfile({
        ...currentProfile,
        handle: router.query.handle + '.lens'
      })
      getCurrentProfileByRouter(router.query.handle)
    }
  }, [router])

  useEffect(() => {
    if(rateHoveActive !== ''){
      trace(`Card-${grades[rateHoveActive]['text']}`)
    }
  }, [rateHoveActive])
  
  return (
    <div className="w-full h-full bg-[#000] flex profile-v2">
      <Navbar />
      <div className='p-5 w-full text-[#fff]'>
        <ConnectBtn type={1} />
        <div className="w-full overflow-y-auto h-[calc(100%-40px)] hidden-scrollbar">
          {
            !indicatorLoading && !ratingLoading && !scoreLoading && !loadingRouterHandle ? (
              <div className="mx-auto mt-16 w-[800px]">
                <div className="rounded-[20px] bg-[#000] h-[600px] w-[800px] flex items-center justify-center" id="aphoto">
                  <div className="h-[512px] w-[722px] mb-4 profile-bg1 flex">
                    <div className="w-1/2 h-full">
                      <div className="flex gap-8">
                        <div className="relative">
                          {
                            currentProfile.imageURI ? (
                              <img src={getImgUrl(currentProfile.imageURI)} className="w-[140px] h-[140px] rounded-[10px]" />
                            ) : (
                              <Image
                                className="w-[140px] h-[140px] rounded-[10px]"
                                src={ImgLensterHead}
                                alt="" />
                            )
                          }
                          <div className="h-12 w-12 absolute right-[-8px] bottom-[-8px]"><DonutChart info={{ level: creatorLevel }} showToolTip={false} background={'#1A1A1A'} /></div>

                        </div>
                        <div className="pt-5">
                          <div className="flex gap-2">
                            <div className="text-[16px] font-bold">{currentProfile.name ? currentProfile.name : currentProfile.handle ? currentProfile.handle.split('.')[0] : ''}</div>
                            {/* <Image
                      className="rounded-[10px]"
                      src={ImgNamexp}
                      alt=""
                    /> */}
                            {
                              nftList.length > 0 && showPremiumGif &&
                              <Image
                                className="h-[20px] w-[20px] object-cover"
                                alt=''
                                src={ImgPremium}
                              />
                            }
                            {
                              nftList.length > 0 && !showPremiumGif &&
                              <Image
                                className="h-[20px] w-[20px] object-cover"
                                alt=''
                                src={SvgPremium}
                              />
                            }
                          </div>
                          <p className="text-sm text-gray mb-[10px]">@{currentProfile.handle}</p>
                          <div className="flex gap-3 mb-[10px]">
                            <button className="flex py-1 px-2 items-center justify-center gap-2 radius-btn-shadow rounded-[12px]" 
                            onClick={() => {window.open(`https://polygonscan.com/address/${currentProfile.address}`, '_blank');trace('Card-PolygonScan')}}>
                              <div className="text-gray text-[12px]">{shortenAddr(currentProfile.address)}</div>
                              <div className="h-[14px] w-[14px] rounded-[50%] bg-[#8247E5] flex items-center justify-center hover:opacity-70">
                                <Image
                                  src={ImgPolygonpath}
                                  alt=""
                                />
                              </div>
                            </button>
                            <button className="flex items-center justify-center radius-btn-shadow hover:opacity-70 h-[28px] w-[28px] rounded-[50%]">
                              <div className="h-[22px] w-[22px] rounded-[50%] bg-[#8247E5] flex items-center justify-center" 
                              onClick={() => {window.open(`https://lenster.xyz/u/${currentProfile.handle}`, '_blank');trace('Card-Lenster')}}>
                                <Image
                                  src={ImgLenster}
                                  className="h-[14px] w-[14px] object-cover"
                                  alt=""
                                />
                              </div>
                            </button>
                            <button className="flex items-center justify-center radius-btn-shadow hover:opacity-70 h-[28px] w-[28px] rounded-[50%]">
                              <div className="h-[22px] w-[22px] rounded-[50%] bg-[#2081E2] flex items-center justify-center" 
                              onClick={() => {window.open(`https://opensea.io/assets/matic/0xdb46d1dc155634fbc732f92e853b10b288ad5a1d/${currentProfile.profileId}`, '_blank');trace('Card-Opensea')}}>
                                <Image
                                  src={ImgOpensea}
                                  className="h-[14px] w-[14px] object-cover ml-[1px]"
                                  alt=""
                                />
                              </div>
                            </button>
                          </div>
                          <div className="flex gap-3">
                            {
                              account && currentProfile.address !== currentLoginProfile.address &&
                              <button className="flex items-center justify-center radius-btn-shadow hover:opacity-70 h-[32px] w-[32px] rounded-[50%]">
                                <Follow
                                  profileId={currentProfile.profileId}
                                  handle={currentProfile.handle}
                                />
                              </button>
                            }
                            {
                              currentProfile.address === currentLoginProfile.address &&
                              <button className="flex items-center justify-center radius-btn-shadow hover:opacity-70 h-[32px] w-[32px] rounded-[50%]" 
                              onClick={() => {window.open(`https://www.lensfrens.xyz/${currentProfile.handle}`, '_blank');trace('Card-Edit')}}>
                                <Image
                                  src={ImgEdit}
                                  alt=""
                                />
                              </button>
                            }
                            <button className="flex items-center justify-center radius-btn-shadow hover:opacity-70 h-[32px] w-[32px] rounded-[50%]"
                              onClick={() =>
                                {copyToClipboard(`${window.location.origin}/profile/${currentProfile.handle ? currentProfile.handle.split('.')[0] : 'stani'}`);trace('Card-Copy')}
                              }>
                              <Image
                                src={ImgCopy}
                                alt=""
                              />
                            </button>
                            <button className="flex items-center justify-center visited:opacity-100 hover:opacity-70 radius-btn-shadow h-[32px] w-[32px] rounded-[50%]" 
                            onClick={() => {downLoadHtml2Img();trace('Card-Download')}}>
                              <Image
                                src={ImgDownLoad}
                                alt=""
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-[14px] text-gray pl-8 mt-3 mb-3 h-[80px] overflow-y-auto">
                        <p className="mt-3">{introduce}</p>
                      </div>
                      <div className="flex items-center w-full flex-wrap justify-between pl-8">
                        {
                          currentIndicators.map((t: any, i: number) => (
                            <div key={i} className={`w-[calc(50%-10px)] mr-[10px] mb-[10px] pl-[8px] h-[40px] flex items-center gap-2 ${getBgStyle(i)} rounded-[10px]`}>
                              <Image
                                src={t.imgUrl}
                                className="w-[24px] h-[24px]"
                                alt=""
                              />
                              <div>
                                <div className="text-[18px] block h-[20px]">{t.acount}</div>
                                <div className="text-[14px] text-gray block">{t.text}</div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <div className="w-1/2 h-full px-8 py-4">
                      {
                        rate.map((t: any, i: number) => (
                          <div key={i} className="w-1/2 h-[148px] float-left flex items-center justify-center"
                            onMouseEnter={() => setRateHoveActive(i)}
                            onMouseLeave={() => setRateHoveActive('')}>
                            <div className="h-[90%] w-[90%]">
                              <DonutChart info={t} showToolTip={true} />
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
                {
                  nftList.length > 0 &&
                  <div className="w-[fit-content] h-[fit-content] px-4 py-2 nft-bg text-[18px] font-[600] ml-10">NFT</div>
                }
                <div className=" w-[800px] flex items-center justify-center">
                  <div className="h-[260px] w-[760px] mx-[auto] relative profile-nft mb-16" onMouseEnter={() => setShowNftBtn(true)} onMouseLeave={() => setShowNftBtn(false)}>
                    <Carousel dotPosition={'bottom'} ref={carouselRef}>
                      {
                        nftList.map((t: any, i: number) => (
                          <div key={i}>
                            <div className="flex items-center justify-left gap-10">
                              {t.map((item: any, index: number) =>
                                <div className={`hover:scale-110 transition-all relative ${index === 0 ? 'ml-[20px]' : index === 3 ? 'mr-[20px]' : ''}`} key={index}>
                                  <img src={`https://d3d8vnmck8tpd.cloudfront.net/app/img/${item.id}.png`} className="cursor-pointer w-[150px] h-[160px] rounded-tl-[12px] rounded-tr-[12px]"
                                    onMouseEnter={() => {setActiveHoverIndex(`${i}${index}`);trace('NFT-Scale')}}
                                  />
                                  {/* {
                                activeHoverIndex === `${i}${index}` &&
                                <div className="absolute left-0 top-0 w-[150px] h-[160px] bg-[rgba(0,0,0,0.4)] flex items-center justify-center" onMouseLeave={() => setActiveHoverIndex('')}>
                                  <div className="cursor-pointer">
                                    <div className="flex items-center justify-center">
                                      <Image
                                        src={ImgHuman}
                                        className="w-[40px] h-[40px]"
                                        alt=""
                                      />
                                    </div>
                                    <p className="text-[18px] text-[#fff]">Set as avatar</p>
                                  </div>
                                </div>
                              } */}
                                  <div className="flex justify-between items-center bg-[#1A1A1A] h-[40px] px-3 rounded-bl-[12px] rounded-br-[12px]">
                                    <div className="text-[#fff]">No.{item.id}</div>
                                    <button className="flex items-center justify-center radius-btn-shadow hover:opacity-70 h-[26px] w-[26px] rounded-[50%]">
                                      <div className="h-[18px] w-[18px] rounded-[50%] bg-[#2081E2] flex items-center justify-center" 
                                      onClick={() => {window.open(`https://opensea.io/assets/matic/0xa803aabd68dd0fcf9eabc25f71f155222805e9e0/${item.id}`, '_blank');trace('NFT-Opensea')}}>
                                        <Image
                                          src={ImgOpensea}
                                          className="h-[12px] w-[12px] object-cover"
                                          alt=""
                                        />
                                      </div>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      }
                    </Carousel>
                    {
                      showNftBtn && nftTotal > 4 &&
                      <>
                        <button className="h-12 w-12 radius-btn-shadow rounded-[50%] bg-[#1C1C1E] flex items-center justify-center cursor-pointer absolute top-[50%] left-[20px] translate-x-[-24px] translate-y-[-50%]" 
                        onClick={() => {carouselRef.current?.prev();trace('NFT-Left')}}>
                          <LeftOutlined className="text-[18px] text-[700]" />
                        </button>
                        <button className="h-12 w-12 radius-btn-shadow rounded-[50%] bg-[#1C1C1E] flex items-center justify-center cursor-pointer absolute top-[50%] right-[20px] translate-x-[24px] translate-y-[-50%]"
                         onClick={() => {carouselRef.current?.next();;trace('NFT-Right')}}>
                          <RightOutlined className="text-[18px] text-[700]" />
                        </button>
                      </>
                    }
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <LoadingOutlined className="text-2xl block mx-auto my-4" />
              </div>
            )
          }
        </div>
      </div>
    </div >
  )
}

export default profile
