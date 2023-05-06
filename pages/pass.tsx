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
import lensApi from "../api/lensApi";
import ImgLensterHead from "../statics/img/lest-head.svg";
import { formatIPFS } from "../lib/tool";

import {
  themeState,
  currentProfileState
} from "../store/state";
import { useRecoilState } from "recoil";

const imgArray = [
  [{
    text: 'Ens'
  }, {
    text: 'BABT'
  }, {
    text: 'Snapshot'
  }, {
    text: 'NFT'
  },
  {
    text: 'POAP'
  }],
  [{
    text: 'LENS'
  }, {
    text: 'Github'
  }, {
    text: 'Twitter'
  },
  {
    text: 'Google'
  }, {
    text: 'Discord'
  }],
  [{
    text: 'Linkedin'
  }, {
    text: 'Gitcoin'
  }],
]

const darkImg = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10, Img11, Img12]

const lightImg = [ImgLight1, ImgLight2, ImgLight3, ImgLight4, ImgLight5, ImgLight6, ImgLight7, ImgLight8, ImgLight9, ImgLight10, ImgLight11, ImgLight12]

const tabs = ['Claimed Badges', 'Unclaimed Badges']

const pass = () => {

  const [activeTab, setActiveTab] = useState(0)

  const [theme, setTheme] = useRecoilState(themeState);

  const [introduce, setIntroduce] = useState<any>('')

  const [currentProfile, setCurrentProfile] =
    useRecoilState<any>(currentProfileState);

  const getIntroduce = async () => {
    const res = await lensApi.getProfileByHandle(currentProfile.handle);
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

  useEffect(() => {
    if (currentProfile.handle) {
      console.log(currentProfile)
      getIntroduce()
    }
  }, [currentProfile])

  return (
    <div className="w-full h-full bg-[#fff] dark:bg-[#16171B] flex">
      <Navbar />
      <div className='py-5 w-full text-[#292A2E] dark:text-[#fff]'>
        <ConnectBtn type={2} />
        <div className="w-full h-full profile-main-bg mt-5 overflow-y-auto">
          <div className="w-[70%] max-w-[1400px] min-w-[800px] mx-[auto] hidden-scrollbar">
            <div className='mt-10 px-3'>
              <div className='w-full h-[160px] dash-bg-style rounded-[20px] p-8 flex items-center'>
                <div className='w-[calc(100%-300px)] flex items-center'>
                  <div className='mr-4'>
                    {/* <Image
                      className="w-[100px] h-[100px] rounded-[50%]"
                      src={Knn3}
                      alt="" /> */}
                    {
                      currentProfile.imageURI ? (
                        <img src={getImgUrl(currentProfile.imageURI)} className="w-[100px] h-[100px] rounded-[50%]" />
                      ) : (
                        <Image
                          className="w-[100px] h-[100px] rounded-[50%]"
                          src={ImgLensterHead}
                          alt="" />
                      )
                    }
                  </div>
                  <div className='h-[fit-content] w-[calc(100%-100px)]'>
                    <p className='font-[600] text-[18px]'>{currentProfile.name ? currentProfile.name : currentProfile.handle ? currentProfile.handle.split('.')[0] : ''}<span className='text-[12px] ml-4 text-[rgba(0,0,0,0.5)] dark:text-[rgba(255,255,255,0.5)] font-[500]'>@{currentProfile.handle}</span></p>
                    <p className='text-[14px]'>{introduce}</p>
                  </div>
                </div>
                <div className='w-[200px] ml-[auto]'>
                  <div className='flex mb-3'>
                    <Image
                      className="w-[60px] h-[60px] mr-3 hover:opacity-70"
                      src={theme === 'light' ? ImgLight6 : Img6}
                      alt="" />
                    <Image
                      className="w-[60px] h-[60px] mr-3 hover:opacity-70"
                      src={theme === 'light' ? ImgLight9 : Img9}
                      alt="" />
                    <Image
                      className="w-[60px] h-[60px] hover:opacity-70"
                      src={theme === 'light' ? ImgLight10 : Img10}
                      alt="" />
                  </div>
                  <div className='flex'>
                    <Image
                      className="w-[60px] h-[60px] mr-3 hover:opacity-70"
                      src={theme === 'light' ? ImgLight8 : Img8}
                      alt="" />
                    <Image
                      className="w-[60px] h-[60px] mr-3 hover:opacity-70"
                      src={theme === 'light' ? ImgLight7 : Img7}
                      alt="" />
                    <Image
                      className="w-[60px] h-[60px] hover:opacity-70"
                      src={theme === 'light' ? ImgLight11 : Img11}
                      alt="" />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='flex mt-5 mb-8 dash-bg-style'>
              <div className='px-5 py-2 rounded-[6px] mr-5 cursor-pointer'>Claimed Badges</div>
              <div className='px-5 py-2 rounded-[6px] cursor-pointer'>Unclaimed Badges</div>
            </div> */}
            <div className='px-3 mt-6 mb-4'>
              <div className="flex pl-8 h-[60px] dash-bg-style">
                {
                  tabs.map((t: any, i: number) => (
                    <div className="h-full relative mr-6">
                      <div key={i} onClick={() => setActiveTab(i)} className={`cursor-pointer ${activeTab === i ? 'text-[#292A2E] dark:text-[#fff]' : 'text-[rgba(0,0,0,0.4)] dark:text-[rgba(255,255,255,0.4)]'} h-full text-[18px] font-[600] flex justify-center items-center`}>
                        {t}
                      </div>
                      {
                        activeTab === i &&
                        <div className="h-2 w-full flex justify-center absolute bottom-0 tabs-radius">
                          <div className="h-1 w-[80%] bg-[#73ABFF] dark:bg-[#FF3300] rounded-[4px] mt-[6px]"></div>
                        </div>
                      }
                    </div>
                  ))
                }
              </div>
            </div>
            <div className='px-3 mb-20'>
              <div className='dash-bg-style py-5 mb-10 pass-bet'>
                {
                  imgArray.map((t: any, i: number) => (
                    <div className='flex justify-between mb-5' key={i}>
                      {
                        t.map((tem: any, idx: number) => (
                          <div className={`w-[20%]`} key={idx}>
                            <Image
                              className='w-[70%] mx-[auto]'
                              src={theme === 'light' ? lightImg[i * 5 + idx] : darkImg[i * 5 + idx]}
                              alt="" />
                            <p className='text-center text-[18px] font-[600]'>{tem.text}</p>
                          </div>
                        ))
                      }
                      {
                        i === 2 &&
                        <>
                          <div className='w-[20%]'></div>
                          <div className='w-[20%]'></div>
                          <div className='w-[20%]'></div>
                        </>
                      }
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default pass
