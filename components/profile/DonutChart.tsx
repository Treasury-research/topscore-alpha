import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import Router, { useRouter } from "next/router";
import { Popover } from 'antd';
import Img1 from "../../statics/img/profileV2/donut/1.svg"
import Img2 from "../../statics/img/profileV2/donut/2.svg"
import Img3 from "../../statics/img/profileV2/donut/3.svg"
import Img4 from "../../statics/img/profileV2/donut/4.svg"
import Img5 from "../../statics/img/profileV2/donut/5.svg"
import Img6 from "../../statics/img/profileV2/donut/6.svg"
import Img7 from "../../statics/img/profileV2/donut/7.svg"
import Img8 from "../../statics/img/profileV2/donut/8.svg"
import Img9 from "../../statics/img/profileV2/donut/9.svg"
import Img10 from "../../statics/img/profileV2/donut/10.svg"
import Img11 from "../../statics/img/profileV2/donut/11.svg"

import Text0 from "../../statics/img/profileV2/text/0.svg"
import Text1 from "../../statics/img/profileV2/text/1.svg"
import Text2 from "../../statics/img/profileV2/text/2.svg"
import Text3 from "../../statics/img/profileV2/text/3.svg"
import Text4 from "../../statics/img/profileV2/text/4.svg"
import Text5 from "../../statics/img/profileV2/text/5.svg"
import Text6 from "../../statics/img/profileV2/text/6.svg"
import Text7 from "../../statics/img/profileV2/text/7.svg"
import Text8 from "../../statics/img/profileV2/text/8.svg"
import Text9 from "../../statics/img/profileV2/text/9.svg"
import Text10 from "../../statics/img/profileV2/text/10.svg"
import Text11 from "../../statics/img/profileV2/text/11.svg"


const donutConfig = [
    {
        level: 0,
        chartImgUrl: '',
        textImgUrl: Text0
    },
    {
        level: 1,
        chartImgUrl: Img1,
        textImgUrl: Text1
    },
    {
        level: 2,
        chartImgUrl: Img2,
        textImgUrl: Text2
    },
    {
        level: 3,
        chartImgUrl: Img3,
        textImgUrl: Text3
    },
    {
        level: 4,
        chartImgUrl: Img4,
        textImgUrl: Text4
    },
    {
        level: 5,
        chartImgUrl: Img5,
        textImgUrl: Text5
    },
    {
        level: 6,
        chartImgUrl: Img6,
        textImgUrl: Text6
    },
    {
        level: 7,
        chartImgUrl: Img7,
        textImgUrl: Text7
    },
    {
        level: 8,
        chartImgUrl: Img8,
        textImgUrl: Text8
    },
    {
        level: 9,
        chartImgUrl: Img9,
        textImgUrl: Text9
    },
    {
        level: 10,
        chartImgUrl: Img10,
        textImgUrl: Text10
    },
    {
        level: 11,
        chartImgUrl: Img11,
        textImgUrl: Text11
    }]

const getToolTipContent = (score: any, rank: any) => {
    return (
        <div>
            <p className="text-[12px] text-[rgba(255,255,255,0.8)]">Score</p>
            <p className="text-[16px] font-bold mb-3">{score.toFixed(2)}</p>
            <p className="text-[12px] text-[rgba(255,255,255,0.8)]">Rank</p>
            <p className="text-[16px] font-bold">#{rank}</p>
        </div>
    )
}

const getContent = (props: any) => {
    const { level, text, score, rank } = props.info
    const { showToolTip,background } = props
    const bg = `bg-[${background}]`
    return (
        <div className={`w-full h-full rounded-[50%] radius-btn-shadow relative flex items-center justify-center ${background ? bg : ''}`}
        >
            {
                level !== 0 &&
                <Image
                    className="w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-[10px] chart-rotate-animation"
                    src={level ? donutConfig[level]['chartImgUrl'] : ''}
                    alt=""
                />
            }
            <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="flex items-center justify-center">
                    <Image
                        className={`chartText-scale-animation ${level == 1 ? 'ml-[4px]' : ''}`}
                        src={level || level === 0 ? donutConfig[level]['textImgUrl'] : ''}
                        alt=""
                    />
                </div>
                {
                    text &&
                    <div className=" mt-5 h-[24px] leading-[20px] px-2 text-[12px] radius-btn-shadow rounded-[20px] cursor-pointer hover:opacity-70">{text}</div>
                }
            </div>
        </div>
    )
}

const DonutChart = (props: any) => {
    const { score, rank } = props.info
    const { showToolTip } = props
    return (
        <>
            {
                showToolTip ? (
                    <Popover placement="bottom" title={''} content={getToolTipContent(score, rank)} trigger="hover">
                        {getContent(props)}
                    </Popover>
                ) : (
                    <>{getContent(props)}</>
                )
            }
        </>

    )
}

export default DonutChart
