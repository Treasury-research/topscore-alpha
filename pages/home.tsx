import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image'
// import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Round1 from "../statics/img/home/round-1.svg";
import StartBtn from "../statics/img/home/start-btn.svg";
import ProfileText from "../statics/img/home/profile-text.svg";
import Titletext from "../statics/img/home/titletext.gif";
import Round2 from "../statics/img/home/round-2.png";
import GoBtn from "../statics/img/home/goBtn.svg";
import Feedback from "../statics/img/home/feedback.svg";
import Slack1 from "../statics/img/home/slack1.png";
import Slack2 from "../statics/img/home/slack2.png";
import { Carousel } from "antd";
import WhatsText from "../statics/img/home/whatsText.svg";
import whatNewIcon from "../statics/img/home/whatNewIcon.svg";
import Gallery from "../statics/img/home/gallery.svg";
import GalleryIcon from "../statics/img/home/galleryIcon.png";
import { LeftOutlined, RightOutlined, LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

// const inter = Inter({ subsets: ['latin'] })

export default function Index() {
    const router = useRouter();
    const carouselRef = useRef(null)
    return (
        <div className="w-full h-full text-[#fff] home-main">
            <div className='h-[calc(100%-100px)] float-left mt-[100px] overflow-auto hidden-scrollbar'>

                <div className='h-[100vh] w-[100vw] flex items-center justify-center mt-[-100px] relative'>
                    <div className='flex w-[80%]'>
                        <div className='flex items-center justify-center w-[calc(100%-70px)] mr-5 relative'>
                            <Image
                                className='w-[full] h-[full]'
                                src={Round1}
                                alt="" />
                            <Image
                                className='w-[80%] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'
                                src={Titletext}
                                alt="" />
                        </div>
                        <div className='flex items-end justify-center w-[50px]'>
                            <Image
                                onClick={() => router.push('/profile/stani')}
                                className='hover:opacity-70 cursor-pointer'
                                src={StartBtn}
                                alt="" />
                        </div>
                    </div>
                    <div className='text-[50px] bold absolute bottom-0 left-[100px] w-[300px]'>
                        <Image
                            src={ProfileText}
                            alt="" />
                    </div>
                </div>

                <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
                    <div className='flex w-[80%]'>
                        <div className='flex items-center justify-center w-[calc(100%-70px)] mr-5'>
                            <Image
                                src={Round2}
                                alt="" />
                        </div>
                        <div className='flex items-end justify-center w-[50px]'>
                            <Image
                                className='hover:opacity-70 cursor-pointer'
                                onClick={() => router.push('/circle')}
                                src={GoBtn}
                                alt="" />
                        </div>
                    </div>
                </div>
                <div className='text-[50px] bold flex justify-end w-[80%] mx-[auto]'>
                    <Image
                        className='w-[300px]'
                        src={Feedback}
                        alt="" />
                </div>
                <div className='h-[100vh] w-[100vw] flex items-center justify-center relative'>
                    <div className='flex w-[80%] '>
                        <div className='flex items-end justify-center w-[50px] mr-5'>
                            <Image
                                className='hover:opacity-70 cursor-pointer'
                                onClick={() => router.push('/creation')}
                                src={GoBtn}
                                alt="" />
                        </div>
                        <div className='w-[calc(100%-70px)] relative bg-[rgba(26,26,26,1)] rounded-[20px] flex items-center justify-center'>
                            <div className='w-[60%]'>
                                <Carousel className='w-full' ref={carouselRef}>
                                    <div className='w-full flex items-center justify-center'>
                                        <Image
                                            src={Slack1}
                                            alt="" />
                                    </div>
                                    <div>
                                        <Image
                                            src={Slack2}
                                            alt="" />
                                    </div>
                                </Carousel>
                            </div>
                            <button className="h-12 w-12 radius-btn-shadow rounded-[50%] bg-[#1C1C1E] flex items-center justify-center cursor-pointer absolute top-[50%] left-[10%] translate-x-[-24px] translate-y-[-50%]"
                                onClick={() => { carouselRef.current?.prev(); }}>
                                <LeftOutlined className="text-[18px] text-[700]" />
                            </button>
                            <button className="h-12 w-12 radius-btn-shadow rounded-[50%] bg-[#1C1C1E] flex items-center justify-center cursor-pointer absolute top-[50%] right-[10%] translate-x-[24px] translate-y-[-50%]"
                                onClick={() => { carouselRef.current?.next(); }}>
                                <RightOutlined className="text-[18px] text-[700]" />
                            </button>
                        </div>


                    </div>

                </div>

                <div className='text-[50px] bold flex w-[80%] mx-[auto]'>
                    <Image
                        className='w-[300px]'
                        src={Gallery}
                        alt="" />
                </div>

                <div className='h-[100vh] w-[100vw] flex items-center justify-center relative'>
                    <div className='flex w-[80%]'>
                        <div className='w-[calc(100%-70px)] mr-5 relative bg-[rgba(26,26,26,1)] rounded-[20px] flex items-center justify-center'>
                            <Image
                                src={GalleryIcon}
                                className='h-[100%]'
                                alt="" />
                        </div>
                        <div className='flex items-end justify-center w-[50px]'>
                            <Image
                                className='hover:opacity-70 cursor-pointer'
                                onClick={() => router.push('/gallery')}
                                src={GoBtn}
                                alt="" />
                        </div>
                    </div>
                </div>

                <div className='h-[100vh] w-[100vw] flex justify-center relative mb-[100px]'>
                    <div className='w-[80%]'>
                        <div className='w-full flex items-center justify-center'>
                            <Image
                                className='w-[400px]'
                                src={WhatsText}
                                alt="" />
                        </div>
                        <div className='w-[70%] mx-[auto] flex items-center justify-center mt-[100px]'>
                            <Image
                                src={whatNewIcon}
                                alt="" />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
