import React, { useState, useEffect, useRef } from "react";
import Img1 from "../statics/img/gallery/img1.png";
import Img2 from "../statics/img/gallery/img2.png";
import Img3 from "../statics/img/gallery/img3.png";
import Text1 from "../statics/img/gallery/text1.svg";
import Text2 from "../statics/img/gallery/text2.svg";
import Text3 from "../statics/img/gallery/text3.svg";
import TextLight1 from "../statics/img/gallery/text-light1.svg";
import TextLight2 from "../statics/img/gallery/text-light2.svg";
import TextLight3 from "../statics/img/gallery/text-light3.svg";
import Coming from "../statics/img/coming.svg";
import ComingLight from "../statics/img/coming-light.svg";
import Image from 'next/image'
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined, LoadingOutlined } from "@ant-design/icons";
import Navbar from '../components/Navbar'
import ConnectBtn from '../components/ConnectBtn'
import {
  themeState
} from "../store/state";
import { useRecoilState } from "recoil";

const gallery = () => {

  const [theme, setTheme] = useRecoilState(themeState);
  
  const carouselRef = useRef(null)

  const [activeIndex, setActiveIndex] = useState(0)

  const carouChange = (e) => {
    setActiveIndex(e)
  }

  return (
    <div className="w-full h-full bg-[#fff] dark:bg-[#16171B] flex">
      <Navbar />
      <div className="py-5 w-full text-[#000] dark:text-[#fff] relative overflow-hidden pr-5">
        <ConnectBtn type={2} />
        <div className="w-full h-full profile-main-bg mt-5">
          <div className="w-full h-full relative">
            <div className="w-[820px] h-[500px] rounded-[20px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
              <div className="w-full flex items-center justify-center text-[30px] h-[80px]">
                <Image
                  src={activeIndex === 0 ? theme ==='light' ? 
                  TextLight1 : Text1 : activeIndex === 1 ? 
                  theme ==='light' ? TextLight2 : Text2 : theme ==='light' ? 
                  TextLight3 : Text3}
                  alt="" />
              </div>
              <div className='w-full relative rounded-[20px] flex items-center justify-center'>
                <div className='w-[688px]'>
                  <Carousel className='w-full' ref={carouselRef} afterChange={(e) => carouChange(e)}>
                    <div className='w-full flex items-center justify-center'>
                      <Image
                        src={Img1}
                        alt="" />
                    </div>
                    <div>
                      <Image
                        src={Img2}
                        alt="" />
                    </div>
                    <div>
                      <Image
                        src={Img3}
                        alt="" />
                    </div>
                  </Carousel>
                </div>
                <button className="hover:opacity-70 h-12 w-12 radius-btn-shadow rounded-[50%] bg-[#fff] dark:bg-[#1C1C1E] flex items-center justify-center cursor-pointer absolute top-[50%] left-[48px] translate-x-[-24px] translate-y-[-50%]"
                  onClick={() => { carouselRef.current?.prev(); }}>
                  <LeftOutlined className="text-[18px] text-[700]" />
                </button>
                <button className="hover:opacity-70 h-12 w-12 radius-btn-shadow rounded-[50%] bg-[#fff] dark:bg-[#1C1C1E] flex items-center justify-center cursor-pointer absolute top-[50%] right-[48px] translate-x-[24px] translate-y-[-50%]"
                  onClick={() => { carouselRef.current?.next(); }}>
                  <RightOutlined className="text-[18px] text-[700]" />
                </button>
              </div>
              <div className="flex justify-center mt-5">
                <Image
                  src={theme === 'light' ? ComingLight : Coming}
                  alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default gallery;
