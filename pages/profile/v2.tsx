import React, { useState, useEffect, useRef } from "react";
import Navbar from '../../components/Navbar'
import { DownOutlined, CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Dropdown, Space, Menu, Drawer, message, Popover, Carousel } from "antd";
import BN from "bignumber.js";
import { useRouter } from "next/router";
import { formatIPFS } from "../../lib/tool";
import useWeb3Context from "../../hooks/useWeb3Context";
import ConnectBtn from '../../components/ConnectBtn'
import DonutChart from '../../components/profile/DonutChart'
import Image from "next/image";
import ImgCardHead from "../../statics/img/profileV2/card-head.svg";
import ImgNamexp from "../../statics/img/profileV2/name-xp.svg";
import ImgPolygonpath from "../../statics/img/profileV2/polygon-path.svg";
import ImgLenster from "../../statics/img/profileV2/lenster.png";
import ImgOpensea from "../../statics/img/profileV2/opensea.png"
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
import ImgPremium from '../../statics/img/premium.gif'

const operateBtns = [
  {
    src: ImgEdit,
    link: ''
  },
  {
    src: ImgCopy,
    link: ''
  },
  {
    src: ImgDownLoad,
    link: ''
  }
]

const des = 'KNN3 is one-stop Web3 User-centric #DataFi solution for d/Apps and smart contracts.  💬 DC: http://discord.gg/UKzFVpHk4J 🔗 Link3: http://link3.to/knn3network'

const baseImgInfo = [{
  text: 'Followers',
  acount: 6816,
  imgUrl: ImgPerson
},
{
  text: 'Following',
  acount: 6816,
  imgUrl: ImgFollowing
},
{
  text: 'Publications',
  acount: 6816,
  imgUrl: ImgPublitions
},
{
  text: 'Posts',
  acount: 6816,
  imgUrl: ImgPost
},
{
  text: 'Comments',
  acount: 6816,
  imgUrl: ImgComments
},
{
  text: 'Mirrors',
  acount: 6816,
  imgUrl: ImgMirrors
},
{
  text: 'Comments(by)',
  acount: 6816,
  imgUrl: ImgCommentsby
},
{
  text: 'Mirrors(by)',
  acount: 6816,
  imgUrl: ImgMirrorsby
},
{
  text: 'Collections',
  acount: 6816,
  imgUrl: ImgCollections
},
{
  text: 'Collected(by)',
  acount: 6816,
  imgUrl: ImgCollectedby
}]

const grades = [{
  level: 11,
  text: 'Influence'
},
{
  level: 10,
  text: 'Creation'
},
{
  level: 9,
  text: 'Campaign'
},
{
  level: 8,
  text: 'Collection'
},
{
  level: 7,
  text: 'Engagement'
},
{
  level: 6,
  text: 'Curation'
}]

const nftList = [
  [
    {
      id: '234'
    },
    {
      id: '235'
    },
    {
      id: '236'
    },
    {
      id: '237'
    }
  ],
  [
    {
      id: '238'
    },
    {
      id: '239'
    },
    {
      id: '240'
    },
    {
      id: '241'
    }
  ],
  [
    {
      id: '242'
    },
    {
      id: '243'
    }
  ]
]

const profile = () => {

  const carouselRef = useRef(null)

  const [showNftBtn, setShowNftBtn] = useState<boolean>(false)

  return (
    <div className="w-full h-full bg-[#000] flex profile-v2">
      <Navbar />
      <div className='p-5 w-full text-[#fff]'>
        <ConnectBtn />
        <div className="w-full overflow-y-auto h-[calc(100%-40px)]">
          <div className="mx-auto mt-16 w-[722px]">
            <div className="h-[512px] mb-10 profile-bg1 flex">
              <div className="w-1/2 h-full">
                <div className="flex gap-8">
                  <div>
                    <img src={`https://d3d8vnmck8tpd.cloudfront.net/app/img/111.png`} className="w-[140px] h-[140px] rounded-[10px]" />
                  </div>
                  <div className="pt-5">
                    <div className="flex gap-2">
                      <div className="text-[16px] font-bold">KNN3 Network</div>
                      {/* <Image
                        className="rounded-[10px]"
                        src={ImgNamexp}
                        alt=""
                      /> */}
                      <Image
                        className="h-[20px] w-[20px] object-cover"
                        alt=''
                        src={ImgPremium}
                      />
                    </div>
                    <p className="text-sm text-gray mb-[10px]">@knn3_network.lens</p>
                    <div className="flex gap-3 mb-[10px]">
                      <button className="flex py-1 px-2 items-center justify-center gap-2 radius-btn-shadow rounded-[12px]">
                        <div className="text-gray text-[12px]">0x09C...B20</div>
                        <div className="h-[14px] w-[14px] rounded-[50%] bg-[#8247E5] flex items-center justify-center hover:opacity-70">
                          <Image
                            src={ImgPolygonpath}
                            alt=""
                          />
                        </div>
                      </button>
                      <button className="flex items-center justify-center radius-btn-shadow hover:opacity-70 h-[26px] w-[26px] rounded-[50%]">
                        <div className="h-[18px] w-[18px] rounded-[50%] bg-[#8247E5] flex items-center justify-center">
                          <Image
                            src={ImgLenster}
                            className="h-[12px] w-[12px] object-cover"
                            alt=""
                          />
                        </div>
                      </button>
                      <button className="flex items-center justify-center radius-btn-shadow hover:opacity-70 h-[26px] w-[26px] rounded-[50%]">
                        <div className="h-[18px] w-[18px] rounded-[50%] bg-[#2081E2] flex items-center justify-center">
                          <Image
                            src={ImgOpensea}
                            className="h-[12px] w-[12px] object-cover"
                            alt=""
                          />
                        </div>
                      </button>
                    </div>
                    <div className="flex gap-3">
                      {
                        operateBtns.map((t: any, i: number) => (
                          <button className="flex items-center justify-center radius-btn-shadow hover:opacity-70 h-[32px] w-[32px] rounded-[50%]" key={i}>
                            <Image
                              src={t.src}
                              alt=""
                            />
                          </button>
                        ))
                      }

                    </div>
                  </div>
                </div>
                <div className="text-[14px] text-gray pl-8 mt-3 mb-3">{des}</div>
                <div className="flex items-center w-full flex-wrap justify-between pl-8">
                  {
                    baseImgInfo.map((t: any, i: number) => (
                      <div key={i} className="w-1/2 mb-[10px] h-[40px] flex items-center gap-2">
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
                  grades.map((t: any, i: number) => (
                    <div key={i} className="w-1/2 h-[148px] float-left flex items-center justify-center">
                      <div className="h-[90%] w-[90%]">
                        <DonutChart info={t}/>
                      </div>

                    </div>
                  ))
                }
              </div>
            </div>
            <div className="h-[200px] relative profile-nft" onMouseEnter={() => setShowNftBtn(true)} onMouseLeave={() => setShowNftBtn(false)}>
              <Carousel dotPosition={'bottom'} ref={carouselRef}>
                {
                  nftList.map((t: any, i: number) => (
                    <div>
                      <div className="flex items-center justify-left gap-10">
                        {t.map((item: any) =>
                          <div className="hover:-translate-y-1 transition-all">
                            <img src={`https://d3d8vnmck8tpd.cloudfront.net/app/img/${item.id}.png`} className="cursor-pointer w-[150px] h-[160px] rounded-tl-[12px] rounded-tr-[12px]" />
                            <div className="flex justify-between items-center bg-[#1A1A1A] h-[40px] px-3 rounded-bl-[12px] rounded-br-[12px]">
                              <div className="text-[#fff]">No.{item.id}</div>
                              <button className="flex items-center justify-center radius-btn-shadow hover:opacity-70 h-[26px] w-[26px] rounded-[50%]">
                                <div className="h-[18px] w-[18px] rounded-[50%] bg-[#2081E2] flex items-center justify-center">
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
                showNftBtn &&
                <>
                  <button className="h-12 w-12 rounded-[50%] bg-[#1C1C1E] flex items-center justify-center cursor-pointer absolute top-[50%] left-0 translate-x-[-24px] translate-y-[-50%] hover:opacity-80" onClick={() => carouselRef.current?.prev()}>
                    <LeftOutlined className="text-[18px] text-[700]" />
                  </button>
                  <button className="h-12 w-12 rounded-[50%] bg-[#1C1C1E] flex items-center justify-center cursor-pointer absolute top-[50%] right-0 translate-x-[24px] translate-y-[-50%] hover:opacity-80" onClick={() => carouselRef.current?.next()}>
                    <RightOutlined className="text-[18px] text-[700]" />
                  </button>
                </>

              }
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default profile
