
import { useEffect, useState } from 'react';
import api from "../api";
import Image from 'next/image'
import Icon1 from '../statics/img/pubIcon/commentBig.svg'
import IconNum1 from '../statics/img/pubIcon/commentSmall.svg'
import IconNum2 from '../statics/img/pubIcon/mirror.png'
import IconNum3 from '../statics/img/like.svg'
import IconNum4 from '../statics/img/Paid_collect.svg'
import IconNum5 from '../statics/img/Free_collect.svg'
import IconNum6 from '../statics/img/post_icon.svg'
import { LoadingOutlined } from '@ant-design/icons';
import { ethers } from 'ethers'
import moment from 'moment'
import { currentProfileState } from "../store/state";
import { useRecoilState } from "recoil";
import dayjs from 'dayjs';

// const tab1 = ['Top Engaged', 'Top Collect']
// const tab2 = ['Top Engaged', 'Recent']
// const tab3 = ['Top Collected', 'Recent']
const tab = [
  ['Top Engaged', 'Top Collect'],
  ['Top Engaged', 'Recent'],
  ['Top Collected', 'Recent']
]
const PubCard = (props: any) => {
  const [pubData, setPubData] = useState<any>([]);
  const { lineData, topRecentSwitch, activeLineTab } = props;
  const [loading, setLoading] = useState(false);
  const [currentProfile] = useRecoilState<any>(currentProfileState);
  const [tabs, setTabs] = useState<any>(tab[0]);
  const [activeTab, setActiveTab] = useState<any>(0);

  useEffect(() => {
    setLoading(true)

    if ((topRecentSwitch && activeTab === 1) || (!topRecentSwitch && activeTab === 0)) {
      if (lineData.length > 0) {
        let legendData = [];
        if (lineData.length == 0) return;
        const s = lineData[lineData.length - 1];
        for (let i = 0; i < s.length; i++) {
          if (s[i]['pubId'] !== 0) {
            legendData.push(`${s[i]['pubId']}`)
          }
        }
        if (legendData.length > 0) {
          getPubs([legendData])
        } else {
          setLoading(false)
          setPubData([])
        }
      } else {
        setLoading(false)
      }
    } else {
      getBaseLineData()
    }
  }, [lineData, activeTab])

  useEffect(() => {
    setTabs(tab[activeLineTab])
  }, [activeLineTab])

  useEffect(() => {
    setActiveTab(topRecentSwitch ? 1 : 0)
  }, [topRecentSwitch])

  const getBaseLineData = async () => {
    let resData = []
    const mdy = dayjs(new Date().getTime() - 28 * 24 * 60 * 60 * 1000).format('YYYYMMDD')
    const ndy = dayjs(new Date()).format('YYYYMMDD')
    if (activeLineTab == 1) {
      const res: any = await api.get(`/lens/publicationStsByDay?start=${20230101}&end=${20230301}&profileId=${currentProfile.profileId}&category=${activeTab === 0 ? 4 : 1}&type=${'Post,Comment'}`);
      resData = res.data;
    }
    if (activeLineTab == 2) {
      const res: any = await api.get(`/lens/collectStsByDay?start=${20230101}&end=${20230301}&profileId=${currentProfile.profileId}&category=${activeTab === 0 ? 1 : 2}&type=${'Post,Comment'}&isFee=${''}`);
      resData = res.data;
    }
    let pubAllData: any = []
    if (resData.length !== 0) {
      resData.map((t: any) => {
        if (!pubAllData.includes(t.pubId) && t.pubId !== 0) {
          pubAllData.push(t.pubId)
        }
      })
    }
    if(pubAllData.length > 0){
      getPubs(pubAllData)
    }
  }

  const getPubs = async (ids: any) => {
    const res = await api.get(`/lens/pubByLatest?profileId=${currentProfile.profileId}&pubIds=${ids.join(',')}`);
    setLoading(false)
    if (res && res.data) {
      setPubData(res.data)
    }
  };

  const toLesnter = (t: any) => {
    const proId = ethers.utils.hexlify(t.profileId)
    const pubId = ethers.utils.hexlify(t.pubId)
    window.open(`https://lenster.xyz/posts/${proId}-${pubId}`)
  }

  // const getHours = (t: any) => {
  //   let diff = new Date().getTime() - t.timestamp * 1000
  //   if (diff < 60 * 60 * 1000) { // 1小时内
  //     const h = Math.floor(diff / (1000 * 60));
  //     return `${h} m`
  //   } else if (diff > 60 * 60 * 1000 && diff < 24 * 60 * 60 * 1000) { // 1天内
  //     const h = Math.floor(diff / (1000 * 60 * 60));
  //     return `${h} h`
  //   } else if (diff > 24 * 60 * 60 * 1000 && diff < 365 * 24 * 60 * 60 * 1000) { // 1年内
  //     return `${moment(t.timestamp * 1000).format('MM/DD')}`
  //   } else {
  //     return `${moment(t.timestamp * 1000).format('YY/MM/DD')}` // 往年
  //   }
  // }

  return (
    <div className="w-full bg-[#000] text-[#fff] p-5 my-10">
      <div>
        <div className='bg-[#1A1A1A] rounded-[10px] mb-[10px] py-3 flex mb-4'>
          <div className="flex w-[60%] ml-6">
            {
              tabs.map((t: any, i: number) => (
                <div key={i} onClick={() => setActiveTab(i)} className={`cursor-pointer w-[140px] flex items-center justify-center px-2 py-1 ${activeTab === i ? 'text-[#fff] border-b-[2px] border-[#fff] text-[18px]' : 'text-[rgba(255,255,255,0.4)] text-[16px]'}`}>{t}</div>
              ))
            }
          </div>
          <div className='flex items-center text-[rgba(255,255,255,0.4)] text-[18px] w-[30%] ml-[auto]'>
            <div className='w-[160px] flex justify-center'>Comments</div>
            <div className='w-[160px] flex justify-center'>Mirrors</div>
            <div className='w-[160px] flex justify-center'>Collects</div>
          </div>
        </div>
        {
          loading ?
            <div className='h-[200px]'>
              <LoadingOutlined className="text-2xl block mx-auto my-[80px]" />
            </div>
            : (
              <div className='min-h-[200px]'>
                {
                  pubData.map((t: any, i: number) => (
                    <div className='bg-[#1A1A1A] rounded-[10px] mb-[10px] py-3 flex mb-4' key={i}>
                      <div className="flex w-[60%]">
                        <div className='w-[100px] flex items-center justify-center'>#{t.pubId}</div>
                        <div className='w-[calc(100%-100px)] text-[14px]'>
                          {t.content}
                        </div>
                      </div>
                      <div className='flex items-center text-[18px] w-[30%] flex ml-[auto]'>
                        <div className='w-[160px] flex justify-center'>{t.commentByCount}</div>
                        <div className='w-[160px] flex justify-center'>{t.mirrorByCount}</div>
                        <div className='w-[160px] flex justify-center'>{t.collectByCount}</div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )
        }

        {/* {
                pubData.map((t: any, i: number) => (
                  <div key={i} className={`flex flex-col ${i === 3 ? 'mr-[0px]' : 'mr-[20px]'} pub-items`}>
                    {
                      t.map((tem: any, index: number) => (
                        <div key={index} className='bg-[#1A1A1A] py-[20px] px-[20px] rounded-[4px] relative my-[10px]'>
                          <div className='flex'>
                            <div className='text-[rgba(255,255,255,0.9)]'>Pub #{tem.pubId}</div>
                            <div className={`cursor-pointer ml-[auto] rounded-[4px] h-[24px] w-[24px] ${tem.type === 'Post' ? 'bg-[#575BFF]' : 'bg-[#9D3611]'}`} onClick={() => toLesnter(tem)}>
                              {
                                tem.type === 'Post' &&
                                <Image
                                  className="mr-1"
                                  src={IconNum6}
                                  alt=""
                                />

                              }
                              {
                                tem.type === 'Comment' &&
                                <Image
                                  className="mr-1"
                                  src={Icon1}
                                  alt=""
                                />
                              }
                            </div>
                          </div>
                          <div className='text-[#6C747D] text-[14px] my-[10px]'>
                            {
                              getHours(tem)
                            }
                          </div>
                          <p className='text-[rgba(255,255,255,0.7)] text-[14px]'>
                            {tem.content}
                          </p>
                          <div className='flex items-center mt-[20px]'>
                            <div className='flex items-center mr-[20px]'>
                              <Image
                                className="mr-1"
                                src={IconNum1}
                                alt=""
                              />
                              <span className='text-[14px]'>{tem.commentByCount}</span>
                            </div>

                            <div className='flex items-center mr-[20px]'>
                              <Image
                                className="mr-1"
                                src={IconNum2}
                                alt=""
                              />
                              <span className='text-[14px]'>{tem.mirrorByCount}</span>
                            </div>

                            <div className='flex items-center mr-[20px]'>

                              {
                                tem.isFee === 0 &&
                                <Image
                                  className="mr-1"
                                  src={IconNum5}
                                  alt=""
                                />
                              }

                              {
                                tem.isFee === 1 &&
                                <Image
                                  className="mr-1"
                                  src={IconNum6}
                                  alt=""
                                />
                              }
                              <span className='text-[14px]'>{tem.collectByCount}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ))
              } */}
      </div>
    </div>
  )
}

export default PubCard
