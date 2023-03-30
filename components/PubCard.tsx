
import { useEffect, useState } from 'react';
import api from "../api";
import Image from 'next/image'
import { postSwitchState } from "../store/state";
import { LoadingOutlined } from '@ant-design/icons';
import { ethers } from 'ethers'
import { currentProfileState,topRecentState } from "../store/state";
import { useRecoilState } from "recoil";
import dayjs from 'dayjs';

const tab = [
  ['Top Engaged', 'Top Collected'],
  ['Top Engaged', 'Recent'],
  ['Top Collected', 'Recent']
]
const PubCard = (props: any) => {
  const [pubData, setPubData] = useState<any>([]);
  const { lineData, activeLineTab } = props;
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
  }, [activeLineTab, topRecentSwitch, currentProfile,postSwitch])

  useEffect(() => {
    setTabs(tab[activeLineTab])
  }, [activeLineTab])

  const getBaseLineData = async () => {
    let resData = []
    const mdy = dayjs(new Date().getTime() - 28 * 24 * 60 * 60 * 1000).format('YYYYMMDD')
    const ndy = dayjs(new Date()).format('YYYYMMDD')
    if (activeLineTab == 0) {
      if (!topRecentSwitch) {
        const res: any = await api.get(`/lens/publicationStsByDay?start=${mdy}&end=${ndy}&profileId=${currentProfile.profileId}&category=4&type=${postSwitch ? 'Post' : 'Post,Comment'}`);
        if (!res || !res.data) {
          resData = []
          setPubData([])
          return false;
        }
        resData = res.data;
      } else {
        const res: any = await api.get(`/lens/collectStsByDay?start=${mdy}&end=${ndy}&profileId=${currentProfile.profileId}&category=2&type=${postSwitch ? 'Post' : 'Post,Comment'}&isFee=${''}`);
        if (!res || !res.data) {
          resData = []
          setPubData([])
          return false;
        }
        resData = res.data;
      }
    }
    if (activeLineTab == 1) {
      const res: any = await api.get(`/lens/publicationStsByDay?start=${mdy}&end=${ndy}&profileId=${currentProfile.profileId}&category=${!topRecentSwitch ? 4 : 1}&type=${postSwitch ? 'Post' : 'Post,Comment'}`);
      if (!res || !res.data) {
        resData = []
        setPubData([])
        return false;
      }
      resData = res.data;
    }
    if (activeLineTab == 2) {
      const res: any = await api.get(`/lens/collectStsByDay?start=${mdy}&end=${ndy}&profileId=${currentProfile.profileId}&category=${!topRecentSwitch ? 2 : 1}&type=${'Post,Comment'}&isFee=${''}`);
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
          if(t == tem.pubId){
            pub.push(tem)
          }
        });
      });
      setPubData(pub)
    }else{
      setPubData([])
    }
  };

  const toLesnter = (t: any) => {
    const proId = ethers.utils.hexlify(t.profileId)
    const pubId = ethers.utils.hexlify(t.pubId)
    window.open(`https://lenster.xyz/posts/${proId}-${pubId}`)
  }

  return (
    <div className="w-full bg-[#000] text-[#fff] p-5 my-10">
      <div>
        <div className='bg-[#1A1A1A] rounded-[10px] mb-[10px] py-3 flex mb-4'>
          <div className="flex w-[60%] ml-6">
            {
              tabs.map((t: any, i: number) => (
                <div key={i} onClick={() => setTopRecentSwitch(i == 0 ? false : true)} className={`cursor-pointer w-[140px] flex items-center justify-center px-2 py-1 ${((!topRecentSwitch && i == 0) || (topRecentSwitch && i == 1)) ? 'text-[#fff] border-b-[2px] border-[#fff] text-[18px]' : 'text-[rgba(255,255,255,0.4)] text-[16px]'}`}>{t}</div>
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
                        <div className='w-[100px] flex items-center justify-center cursor-pointer' onClick={() => toLesnter(t)}>#{t.pubId}</div>
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
