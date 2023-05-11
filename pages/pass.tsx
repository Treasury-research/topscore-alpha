import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import ConnectBtn from '../components/ConnectBtn'
import Image from "next/image";
import Knn3 from "../statics/img/pass/knn3.svg";

import Img1 from "../statics/img/pass/dark/1.png";
import Img2 from "../statics/img/pass/dark/2.png";
import Img3 from "../statics/img/pass/dark/3.png";
import Img4 from "../statics/img/pass/dark/4.png";
import Img5 from "../statics/img/pass/dark/5.png";
import Img6 from "../statics/img/pass/dark/6.png";
import Img7 from "../statics/img/pass/dark/7.png";
import Img8 from "../statics/img/pass/dark/8.png";
import Img9 from "../statics/img/pass/dark/9.png";
import Img10 from "../statics/img/pass/dark/10.png";
import Img11 from "../statics/img/pass/dark/11.png";
import Img12 from "../statics/img/pass/dark/12.png";
import Img13 from "../statics/img/pass/dark/13.png";
import Img14 from "../statics/img/pass/dark/14.png";
import Img15 from "../statics/img/pass/dark/15.png";
import Img16 from "../statics/img/pass/dark/16.png";
import Img17 from "../statics/img/pass/dark/17.png";
import Img18 from "../statics/img/pass/dark/18.png";
import Img19 from "../statics/img/pass/dark/19.png";

import ImgLight1 from "../statics/img/pass/light/1.png";
import ImgLight2 from "../statics/img/pass/light/2.png";
import ImgLight3 from "../statics/img/pass/light/3.png";
import ImgLight4 from "../statics/img/pass/light/4.png";
import ImgLight5 from "../statics/img/pass/light/5.png";
import ImgLight6 from "../statics/img/pass/light/6.png";
import ImgLight7 from "../statics/img/pass/light/7.png";
import ImgLight8 from "../statics/img/pass/light/8.png";
import ImgLight9 from "../statics/img/pass/light/9.png";
import ImgLight10 from "../statics/img/pass/light/10.png";
import ImgLight11 from "../statics/img/pass/light/11.png";
import ImgLight12 from "../statics/img/pass/light/12.png";
import ImgLight13 from "../statics/img/pass/light/13.png";
import ImgLight14 from "../statics/img/pass/light/14.png";
import ImgLight15 from "../statics/img/pass/light/15.png";
import ImgLight16 from "../statics/img/pass/light/16.png";
import ImgLight17 from "../statics/img/pass/light/17.png";
import ImgLight18 from "../statics/img/pass/light/18.png";
import ImgLight19 from "../statics/img/pass/light/19.png";

import ImgHave1 from "../statics/img/pass/have/1.png";
import ImgHave2 from "../statics/img/pass/have/2.png";
import ImgHave3 from "../statics/img/pass/have/3.png";
import ImgHave4 from "../statics/img/pass/have/4.png";
import ImgHave5 from "../statics/img/pass/have/5.png";
import ImgHave6 from "../statics/img/pass/have/6.png";
import ImgHave7 from "../statics/img/pass/have/7.png";
import ImgHave8 from "../statics/img/pass/have/8.png";
import ImgHave9 from "../statics/img/pass/have/9.png";
import ImgHave10 from "../statics/img/pass/have/10.png";
import ImgHave11 from "../statics/img/pass/have/11.png";
import ImgHave12 from "../statics/img/pass/have/12.png";
import ImgHave13 from "../statics/img/pass/have/13.png";
import ImgHave14 from "../statics/img/pass/have/14.png";
import ImgHave15 from "../statics/img/pass/have/15.png";
import ImgHave16 from "../statics/img/pass/have/16.png";
import ImgHave17 from "../statics/img/pass/have/17.png";
import ImgHave18 from "../statics/img/pass/have/18.png";
import ImgHave19 from "../statics/img/pass/have/19.png";

import Mask1 from "../statics/img/pass/mask1.png";
import Mask2 from "../statics/img/pass/mask2.png";
import Mask3 from "../statics/img/pass/mask3.png";

import MaskLight1 from "../statics/img/pass/mask1-light.png";
import MaskLight2 from "../statics/img/pass/mask2-light.png";
import MaskLight3 from "../statics/img/pass/mask3-light.png";

import lensApi from "../api/lensApi";
import ImgLensterHead from "../statics/img/lest-head.svg";
import { formatIPFS } from "../lib/tool";
import api from "../api";

import {
  themeState,
  currentLoginProfileState
} from "../store/state";
import { useRecoilState } from "recoil";

const darkNotHaveImg = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10]

const lightNotHaveImg = [ImgLight1, ImgLight2, ImgLight3, ImgLight4, ImgLight5, ImgLight6, ImgLight7, ImgLight8, ImgLight9, ImgLight10]

const haveImg = [ImgHave1, ImgHave2, ImgHave3, ImgHave4, ImgHave5, ImgHave6, ImgHave7, ImgHave8, ImgHave9, ImgHave10]

const initWebInfo = [
  {
    key: 'bab',
    score: 30
  },
  {
    key: 'prof',
    score: 30
  },
  {
    key: 'lens',
    score: 15
  },
  {
    key: 'ens',
    score: 5
  },
  {
    key: 'spaceid',
    score: 5
  },
  {
    key: 'discord',
    score: 10
  },
  {
    key: 'snapshot',
    score: 5
  },
  {
    key: 'nft',
    score: 5
  },
  {
    key: 'poap',
    score: 5
  },
  {
    key: 'gitpoap',
    score: 0
  }
]

const pass = () => {

  const [activeTab, setActiveTab] = useState(0)

  const [theme, setTheme] = useRecoilState(themeState);

  const [introduce, setIntroduce] = useState<any>('')

  const [loginRes, setLoginRes] = useState<any>({})

  const [totalScroe, setTotalScroe] = useState<any>(0)

  const [currentLoginProfile,] =
    useRecoilState<any>(currentLoginProfileState);

  const getIntroduce = async () => {
    const res = await lensApi.getProfileByHandle(currentLoginProfile.handle);
    if (res && res.bio) {
      setIntroduce(res.bio)
    } else {
      setIntroduce('')
    }
  }

  const getImgUrl = (str: string) => {
    const imgUrl = str.replace(
      "https://ipfs.infura.io",
      "https://lens.infura-ipfs.io"
    );
    return formatIPFS(imgUrl);
  };

  const getUserLogin = async () => {
    const res = await api.get(`/address/authentication`)
    if (res && res.data) {
      let score = 0;
      for (let key in res.data) {
        if(res.data[key]){
          score += initWebInfo.filter((t) => {return t.key === key})[0]['score']
        }
      }
      setTotalScroe(score)
      setLoginRes(res.data)
    }
  }

  useEffect(() => {
    if (currentLoginProfile.handle) {
      console.log(currentLoginProfile)
      getIntroduce()
      getUserLogin()
    }
  }, [currentLoginProfile])

  return (
    <div className="w-full h-full bg-[#fff] dark:bg-[#16171B] flex">
      <Navbar />
      <div className='py-5 w-full text-[#292A2E] dark:text-[#fff]'>
        <ConnectBtn type={3} />
        <div className="w-full h-full profile-main-bg mt-5 overflow-y-auto">
          <div className="w-[70%] max-w-[1400px] min-w-[800px] mx-[auto] hidden-scrollbar">
            <div className='mt-10 px-3'>
              <div className='w-full h-[160px] dash-bg-style rounded-[20px] p-8 flex items-center'>
                <div className='w-full flex items-center'>
                  <div className='mr-4'>
                    {
                      currentLoginProfile.imageURI ? (
                        <img src={getImgUrl(currentLoginProfile.imageURI)} className="w-[100px] h-[100px] rounded-[50%]" />
                      ) : (
                        <Image
                          className="w-[100px] h-[100px] rounded-[50%]"
                          src={ImgLensterHead}
                          alt="" />
                      )
                    }
                  </div>
                  <div className='h-[fit-content]'>
                    <p className='font-[600] text-[18px]'>{currentLoginProfile.name ? currentLoginProfile.name : currentLoginProfile.handle ? currentLoginProfile.handle.split('.')[0] : ''}<span className='text-[12px] ml-4 text-[rgba(0,0,0,0.5)] dark:text-[rgba(255,255,255,0.5)] font-[500]'>@{currentLoginProfile.handle}</span></p>
                    <p className='text-[14px]'>{introduce}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-5 mx-3 my-4'>
              <div className='flex justify-between pt-5 pb-3 px-3 dash-bg-style w-[50%] flex-wrap'>
                {
                  initWebInfo.map((tem: any, idx: number) => (
                    <div className={`w-[20%] flex items-center mb-2`} key={idx}>
                      <Image
                        className='w-[90%] mx-[auto]'
                        src={loginRes[tem.key] ? haveImg[idx] : theme === 'light' ? lightNotHaveImg[idx] : darkNotHaveImg[idx]}
                        alt="" />
                    </div>
                  ))
                }
              </div>
              <div className='w-[50%] pass-bg relative'>
                <p className='text-[600] text-[20px] mt-[2%] ml-[2%]'>Uniqueness</p>
                <div className='absolute bottom-5 left-8 flex items-baseline'>Score<span className='text-[24px] text-[600] ml-1'> {totalScroe}</span></div>

              </div>
            </div>
            <div className='px-3 mb-20 flex justify-between gap-3'>
              <div className='dash-bg-style flex-1'>
                <div className='h-[72px] dash-bg-style w-full flex items-center px-3'>
                  <div className='h-[60px] dash-bg-style w-[60px] flex items-center justify-center mr-5'>
                    <Image
                      src={theme === 'light' ? MaskLight1 : Mask1}
                      alt="" />
                  </div>
                  <div>Social</div>
                </div>
                <div className='flex justify-between py-4 px-4'>
                  <div className={`flex-1 flex items-center`}>
                    <Image
                      className='w-[90%] mx-[auto]'
                      src={Img11}
                      alt="" />
                  </div>
                  <div className={`flex-1 flex items-center`}>
                    <Image
                      className='w-[90%] mx-[auto]'
                      src={Img12}
                      alt="" />
                  </div>
                  <div className={`flex-1 flex items-center`}>
                    <Image
                      className='w-[90%] mx-[auto]'
                      src={Img13}
                      alt="" />
                  </div>
                </div>
              </div>
              <div className='dash-bg-style flex-1'>
                <div className='h-[72px] dash-bg-style w-full flex items-center px-3'>
                  <div className='h-[60px] dash-bg-style w-[60px] flex items-center justify-center mr-5'>
                    <Image
                      src={theme === 'light' ? MaskLight2 : Mask2}
                      alt="" />
                  </div>
                  <div>Social</div>
                </div>
                <div className='flex justify-between py-4 px-4'>
                  <div className={`flex-1 flex items-center`}>
                    <Image
                      className='w-[90%] mx-[auto]'
                      src={Img14}
                      alt="" />
                  </div>
                  <div className={`flex-1 flex items-center`}>
                    <Image
                      className='w-[90%] mx-[auto]'
                      src={Img15}
                      alt="" />
                  </div>
                  <div className={`flex-1 flex items-center`}>
                    <Image
                      className='w-[90%] mx-[auto]'
                      src={Img16}
                      alt="" />
                  </div>
                </div>
              </div>
              <div className='dash-bg-style flex-1'>
                <div className='h-[72px] dash-bg-style w-full flex items-center px-3'>
                  <div className='h-[60px] dash-bg-style w-[60px] flex items-center justify-center mr-5'>
                    <Image
                      src={theme === 'light' ? MaskLight1 : Mask1}
                      alt="" />
                  </div>
                  <div>Social</div>
                </div>
                <div className='flex justify-between py-4 px-4'>
                  <div className={`flex-1 flex items-center`}>
                    <Image
                      className='w-[90%] mx-[auto]'
                      src={Img17}
                      alt="" />
                  </div>
                  <div className={`flex-1 flex items-center`}>
                    <Image
                      className='w-[90%] mx-[auto]'
                      src={Img18}
                      alt="" />
                  </div>
                  <div className={`flex-1 flex items-center`}>
                    <Image
                      className='w-[90%] mx-[auto]'
                      src={Img19}
                      alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default pass
