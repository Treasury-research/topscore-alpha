import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image'
// import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Round1 from "../statics/img/home/round-1.svg";
import StartBtn from "../statics/img/home/start-btn.svg";
import ProfileText from "../statics/img/home/profile-text.svg";
import Titletext from "../statics/img/home/v2-title-text.gif";
import Round2 from "../statics/img/home/round-2.png";
import GoBtn from "../statics/img/home/goBtn.svg";
import Feedback from "../statics/img/home/feedback.svg";
import Slack1 from "../statics/img/home/slack1.webp";
import Slack2 from "../statics/img/home/slack2.webp";
import { Carousel } from "antd";
import WhatsText from "../statics/img/home/whatsText.svg";
import whatNewIcon from "../statics/img/home/whatNewIcon.png";
import Gallery from "../statics/img/home/gallery.svg";
import GalleryIcon from "../statics/img/home/galleryIcon.webp";
import { LeftOutlined, RightOutlined, LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Helmet } from "react-helmet";

// const inter = Inter({ subsets: ['latin'] })

export default function Index() {
    const router = useRouter();
    const carouselRef = useRef(null)
    return (
        <div className="w-full h-full text-[#fff] home-main">
            {/* <Helmet>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Your 2022 Wrapped on Lens" />
                <meta name="twitter:description" content="TopScore - a KNN3-powered scoring system based on Lens Protocol to evaluate this campaign." />
                <meta
                    property="twitter:image"
                    content="https://img1.baidu.com/it/u=1960110688,1786190632&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1686157200&t=e3a90d623390f1c2aa4fdecd8b875d68"/>
                <meta property="og:title" content="Your 2022 Wrapped on Lens" />
                <meta property="og:description" content="TopScore - a KNN3-powered scoring system based on Lens Protocol to evaluate this campaign." />
                <meta
                    property="og:image"
                    content="https://img1.baidu.com/it/u=1960110688,1786190632&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1686157200&t=e3a90d623390f1c2aa4fdecd8b875d68"
                // content={`https://lens-api.knn3.xyz/api/lens/generate/shareImg/${currentProfile.profileId}`}
                />
                <meta property="og:locale'" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://topscore.staging.knn3.xyz/home" />
                <meta property="og:site_name" content="Topscore" />
            </Helmet> */}
            <Helmet>
                <meta property="og:title" content="Your 2022 Wrapped on Lens" />
                <meta property="og:description" content="TopScore - a KNN3-powered scoring system based on Lens Protocol to evaluate this campaign." />
                <meta
                    property="og:image"
                    content={`https://img1.baidu.com/it/u=1960110688,1786190632&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1686157200&t=e3a90d623390f1c2aa4fdecd8b875d68"`}
                />
                <meta property="og:locale'" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://topscore.staging.knn3.xyz/home" />
                <meta property="og:site_name" content="Topscore" />
            </Helmet>

            <div className='h-[calc(100%-100px)] float-left mt-[100px] overflow-auto hidden-scrollbar'>
                <div className='h-[100vh] w-[100vw] flex items-center justify-center mt-[-100px] relative'>
                    <div className='flex w-[80%]'>
                        <div className='flex items-center justify-center w-[calc(100%-70px)] mr-5 relative'>
                            <Image
                                className='w-[full] h-[full]'
                                src={Round1}
                                alt="" />
                            <Image
                                className='w-[80%] absolute left-[45%] top-[50%] translate-x-[-50%] translate-y-[-50%]'
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

                </div>
                <div className='text-[50px] bold w-[80%] mx-[auto] mb-8'>
                    <Image
                        className='w-[300px]'
                        src={ProfileText}
                        alt="" />
                </div>
                <div className='w-[100vw] flex justify-center mb-[200px]'>
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
                <div className='text-[50px] bold flex justify-end w-[80%] mx-[auto] mb-8'>
                    <Image
                        className='w-[300px]'
                        src={Feedback}
                        alt="" />
                </div>
                <div className='w-[100vw] flex justify-center relative mb-[200px]'>
                    <div className='flex w-[80%] '>
                        <div className='flex items-end justify-center w-[50px] mr-5'>
                            <Image
                                className='hover:opacity-70 cursor-pointer'
                                onClick={() => router.push('/creation')}
                                src={GoBtn}
                                alt="" />
                        </div>
                        <div className='w-[calc(100%-70px)] relative bg-[rgba(26,26,26,1)] rounded-[20px] flex items-center justify-center'>
                            <div className='w-[800px]'>
                                <Carousel className='w-full' ref={carouselRef}>
                                    <div className='w-[800px] flex items-center justify-center mx-[auto]'>
                                        <Image
                                            className="h-[534px]"
                                            src={Slack1}
                                            alt="" />
                                    </div>
                                    <div className='w-[800px] flex items-center justify-center mx-[auto]'>
                                        <Image
                                            className="h-[534px]"
                                            src={Slack2}
                                            alt="" />
                                    </div>
                                </Carousel>
                            </div>
                            <button className="h-12 w-12 radius-btn-shadow opacity-70 rounded-[50%] bg-[#1C1C1E] flex items-center justify-center cursor-pointer absolute top-[50%] left-[5%] translate-x-[-24px] translate-y-[-50%]"
                                onClick={() => { carouselRef.current?.prev(); }}>
                                <LeftOutlined className="text-[18px] text-[700]" />
                            </button>
                            <button className="h-12 w-12 radius-btn-shadow opacity-70 rounded-[50%] bg-[#1C1C1E] flex items-center justify-center cursor-pointer absolute top-[50%] right-[5%] translate-x-[24px] translate-y-[-50%]"
                                onClick={() => { carouselRef.current?.next(); }}>
                                <RightOutlined className="text-[18px] text-[700]" />
                            </button>
                        </div>


                    </div>

                </div>

                <div className='text-[50px] bold w-[80%] mx-[auto] mb-8'>
                    <Image
                        className='w-[300px]'
                        src={Gallery}
                        alt="" />
                </div>

                <div className='w-[100vw] flex justify-center relative mb-[200px]'>
                    <div className='flex w-[80%]'>
                        <div className='w-[calc(100%-70px)] mr-5 relative bg-[rgba(26,26,26,1)] rounded-[20px] flex items-center justify-center'>
                            <Image
                                src={GalleryIcon}
                                className='h-[534px] object-contain'
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
