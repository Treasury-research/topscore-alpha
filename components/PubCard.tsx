
import { useEffect, useState } from 'react';
import api from "../api";
import Image from 'next/image'
import { postSwitchState } from "../store/state";
import { LoadingOutlined } from '@ant-design/icons';
import { ethers } from 'ethers'
import { currentProfileState, topRecentState } from "../store/state";
import { useRecoilState } from "recoil";
import dayjs from 'dayjs';
import trace from "../api/trace";
import { Spin } from 'antd';

const tab = [
  ['Top Engaged', 'Top Collected'],
  ['Top Engaged', 'Recent'],
  ['Top Collected', 'Recent']
]
const PubCard = (props: any) => {
  const [pubData, setPubData] = useState<any>([]);
  const { lineData, activeLineTab, activeTab1 } = props;
  const [loading, setLoading] = useState(false);
  const [currentProfile] = useRecoilState<any>(currentProfileState);
  const [tabs, setTabs] = useState<any>(tab[0]);
  const [postSwitch, setPostSwitch] = useRecoilState<any>(postSwitchState);
  // const [activeTab, setActiveTab] = useState<any>(0);
  const [topRecentSwitch, setTopRecentSwitch] = useRecoilState<any>(topRecentState);

  useEffect(() => {
    if (currentProfile.profileId) {
      setLoading(true)
      getBaseLineData()
    }
  }, [activeLineTab, topRecentSwitch, currentProfile, postSwitch, activeTab1])

  useEffect(() => {
    setTabs(tab[activeLineTab])
  }, [activeLineTab])

  const getUTCTime = () => {
    let d1 = new Date();
    let d2: any = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds());
    return Date.parse(d2);
  }

  const getBaseLineData = async () => {
    let resData = []
    const mdyLocal = dayjs(getUTCTime() - ((activeTab1 + 1) * 7) * 24 * 60 * 60 * 1000).format('YYYYMMDD')
    const ndyLocal = dayjs(getUTCTime()).format('YYYYMMDD') // 当前日期
    const queryLocal = dayjs(getUTCTime() + 24 * 60 * 60 * 1000).format('YYYYMMDD') // 查询日期+1
    const mdy = mdyLocal
    const ndy = ndyLocal
    if (activeLineTab == 0) {
      if (!topRecentSwitch) {
        const res: any = await api.get(`/lens/publicationStsByDay?start=${mdy}&end=${queryLocal}&profileId=${currentProfile.profileId}&category=4&type=${postSwitch ? 'Post' : 'Post,Comment'}`);
        if (!res || !res.data) {
          resData = []
          setPubData([])
          return false;
        }
        resData = res.data;
      } else {
        const res: any = await api.get(`/lens/collectStsByDay?start=${mdy}&end=${queryLocal}&profileId=${currentProfile.profileId}&category=2&type=${postSwitch ? 'Post' : 'Post,Comment'}&isFee=${''}`);
        if (!res || !res.data) {
          resData = []
          setPubData([])
          return false;
        }
        resData = res.data;
      }
    }
    if (activeLineTab == 1) {
      const res: any = await api.get(`/lens/publicationStsByDay?start=${mdy}&end=${queryLocal}&profileId=${currentProfile.profileId}&category=${!topRecentSwitch ? 4 : 1}&type=${postSwitch ? 'Post' : 'Post,Comment'}`);
      if (!res || !res.data) {
        resData = []
        setPubData([])
        return false;
      }
      resData = res.data;
    }
    if (activeLineTab == 2) {
      const res: any = await api.get(`/lens/collectStsByDay?start=${mdy}&end=${queryLocal}&profileId=${currentProfile.profileId}&category=${!topRecentSwitch ? 2 : 1}&type=${'Post,Comment'}&isFee=${''}`);
      if (!res || !res.data) {
        resData = []
        setPubData([])
        return false;
      }
      resData = res.data;
    }
    let pubAllData: any = []
    if (resData.length !== 0) {
      resData.map((t: any) => {
        if (!pubAllData.includes(t.pubId) && t.pubId !== 0) {
          pubAllData.push(t.pubId)
        }
      })
    } else {
      setPubData([])
      setLoading(false)
    }
    if (pubAllData.length > 0) {
      getPubs(pubAllData)
    }
  }

  const getPubs = async (ids: any) => {
    const res = await api.get(`/lens/pubByLatest?profileId=${currentProfile.profileId}&pubIds=${ids.join(',')}`);
    setLoading(false)
    if (res && res.data && res.data.length > 0) {
      let pub = []
      ids.forEach(t => {
        res.data.forEach(tem => {
          if (t == tem.pubId) {
            pub.push(tem)
          }
        });
      });
      setPubData(pub)
    } else {
      setPubData([])
    }
  };

  const toLesnter = (t: any) => {
    const proId = ethers.utils.hexlify(t.profileId)
    const pubId = ethers.utils.hexlify(t.pubId)
    window.open(`https://lenster.xyz/posts/${proId}-${pubId}`)
    trace('List-Jump')
  }

  const topRecentChange = (i) => {
    setTopRecentSwitch(i == 0 ? false : true)
    if (i == 0) {
      if (activeLineTab == 0) {
        trace('List-OV-TopE')
      }
      if (activeLineTab == 1) {
        trace('List-EG-Top')
      }
      if (activeLineTab == 2) {
        trace('List-CL-Top')
      }
    } else {
      if (activeLineTab == 0) {
        trace('List-OV-TopC')
      }
      if (activeLineTab == 1) {
        trace('List-EG-Rec')
      }
      if (activeLineTab == 2) {
        trace('List-CL-Rec')
      }
    }
  }

  return (
    <div className="w-full text-[#292A2E] dark:text-[#fff] my-10">
      <div>
        <div className='dash-bg-style rounded-[10px] mb-[10px] h-[60px] flex mb-4'>
          {/* <div className="flex w-[60%] ml-6">
            {
              tabs.map((t: any, i: number) => (
                <div key={i} onClick={() => topRecentChange(i)} className={`cursor-pointer w-[140px] flex items-center justify-center px-2 py-1 ${((!topRecentSwitch && i == 0) || (topRecentSwitch && i == 1)) ? 'text-[#292A2E] dark:text-[#fff] border-b-[2px] border-[#fff] text-[18px]' : 'text-[rgba(0,0,0,0.4)] dark:text-[rgba(255,255,255,0.4)] text-[16px]'}`}>{t}</div>
              ))
            }
          </div> */}
          <div className="flex ml-6 h-full w-[60%]">
            {
              tabs.map((t: any, i: number) => (
                <div className="h-full relative mr-6" key={i}>
                  <div key={i} onClick={() => topRecentChange(i)} className={`cursor-pointer ${((!topRecentSwitch && i == 0) || (topRecentSwitch && i == 1)) ? 'dark:text-[#fff]' : 'text-[rgba(0,0,0,0.4)] dark:text-[rgba(255,255,255,0.4)]'} h-full text-[18px] font-[600] flex justify-center items-center`}>
                    {t}
                  </div>
                  {
                    ((!topRecentSwitch && i == 0) || (topRecentSwitch && i == 1)) &&
                    <div className="h-2 w-full flex justify-center absolute bottom-0 tabs-radius">
                      <div className="h-1 w-[80%] bg-[#73ABFF] dark:bg-[#FF3300] rounded-[4px] mt-[6px]"></div>
                    </div>
                  }
                </div>
              ))
            }
          </div>

          <div className='flex items-center text-[rgba(0,0,0,0.4)] dark:text-[rgba(255,255,255,0.4)] text-[18px] w-[30%] ml-[auto]'>
            <div className='w-[160px] flex justify-center'>Comments</div>
            <div className='w-[160px] flex justify-center'>Mirrors</div>
            <div className='w-[160px] flex justify-center'>Collects</div>
          </div>
        </div>
        {
          loading ?
            <div className='h-[200px] w-full flex items-center justify-center'>
              <Spin size="large" className="mx-auto my-5" />
            </div>
            : (
              <div className={`min-h-[200px] ${pubData.length == 0 ? 'dash-bg-style' : ''}`}>
                {
                  pubData.length == 0 &&
                  <div className='h-[200px] w-full flex items-center justify-center text-[24px] text-[rgba(0,0,0,0.4)] dark:text-[rgba(255,255,255,0.4)]'>No Data found</div>
                }
                {
                  pubData.map((t: any, i: number) => (
                    <div className='dash-bg-style rounded-[10px] mb-[10px] py-3 flex mb-4' key={i}>
                      <div className="flex w-[60%] items-center">
                        <div className='w-[80px] h-[30px] mx-[20px] rounded-[20px] flex items-center justify-center cursor-pointer radius-btn-shadow hover:opacity-70' onClick={() => toLesnter(t)}>#{t.pubId}</div>
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
      </div>
    </div>
  )
}

export default PubCard
