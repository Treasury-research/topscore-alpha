import React, { useState, useEffect, useCallback } from "react";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Checkbox, Switch, Spin } from 'antd';
import dayjs from 'dayjs';
import api from "../api";
import EngageLine from './EngageLine'
import PubCard from './PubCard'

const tabs = ['Engagement', 'Top Engaged', 'Collections & Fee', 'Top Collected']

const tabs1 = ['7D', '14D', '21D', '28D']

const lineDes = [
    'Daily cumulative engagements of your latest pubs',
    'Daily cumulative engagements of your top engaged pubs in 28D',
    'Daily cumulative collections of your latest pubs',
    'Daily cumulative collections of your top collected pubs in 28D'
]
let resData: any = [];

let resAmountData: any = [];

const rmodynamics = () => {
    const [activeTab, setActiveTab] = useState(0)

    const [activeTab1, setActiveTab1] = useState(0)

    const [dates, setDates] = useState<any>([])

    const [lindData, setLindData] = useState([])

    const [sigleData, setSigleData] = useState([])

    const [commentSwitch, setCommentSwitch] = useState(true)

    const [mirrorSwitch, setMirrorSwitch] = useState(true)

    const [postSwitch, setPostSwitch] = useState(false)

    const [chargeSwitch, setChargeSwitch] = useState(false)

    const [isShowEchart, setIsShowEchart] = useState(false)

    const getEngageLineData = async () => {
        setIsShowEchart(true)
        const mdy = dayjs(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).format('YYYYMMDD') // 30天前的日期
        const ndy = dayjs(new Date()).format('YYYYMMDD') // 当前日期
        if (activeTab === 0 || activeTab === 1) {
            const res: any = await api.get(`/lens/publicationStsByDay?start=${mdy}&end=${ndy}&profileId=12&category=${activeTab + 1}&type=Post,Comment`);
            const res1: any = await api.get(`/lens/followStsByDay?start=${mdy}&end=${ndy}&profileId=12`);
            resData = res.data;
            resAmountData = res1.data;
        } else {
            const res: any = await api.get(`/lens/collectStsByDay?start=${mdy}&end=${ndy}&profileId=12&category=${activeTab - 1}&type=Post,Comment&isFee=${chargeSwitch ? 1 : ''}`);
            const res1: any = await api.get(`/lens/collectFeeStsByDay?start=${mdy}&end=${ndy}&profileId=12`);
            resAmountData = res1.data;
            resData = res.data;
        }
        let newDates: any = []
        if (resData.length !== 0) {
            resData.map((t: any) => {
                newDates.push(t.day)
            })
        } else if (resAmountData.length !== 0) {
            resAmountData.map((t: any) => {
                newDates.push(t.day)
            })
        }
        setDates([...new Set(newDates)])
    }

    useEffect(() => {
        setIsShowEchart(false)
        if (dates.length > 0) {
            let s: any = []; // 区域数据
            let h: any = []; // 单独线数据
            for (let i = 0; i < dates.length; i++) {
                let b = [];
                for (let j = 0; j < resData.length; j++) {
                    if (resData[j]['day'] === dates[i]) {
                        b.push(resData[j])
                    }
                }
                for (let j = 0; j < resAmountData.length; j++) {
                    if (resAmountData[j]['day'] === dates[i]) {
                        if (activeTab === 0 || activeTab === 1) {
                            h.push(resAmountData[j]['followCount'])
                        } else {
                            h.push(Number(resAmountData[j]['amount']).toFixed(2))
                        }
                    }
                }
                s.push(b)
            }
            setLindData(s)
            console.log(s)
            setSigleData(h)
        }
        setTimeout(() => {
            setIsShowEchart(true)
        }, 1000)
    }, [dates, postSwitch])

    useEffect(() => {
        getEngageLineData()
    }, [activeTab, chargeSwitch])

    return (
        <>
            <div className="text-[#fff] bg-[#1A1A1A] p-5 my-10">
                <div className="flex">
                    <div className="flex">
                        {
                            tabs.map((t: any, i: number) =>
                                <div key={i} onClick={() => setActiveTab(i)} className={`mr-4 box-border rounded-[20px] border-[1px] border-[#fff] w-[190px] h-[40px] flex items-center justify-center text-[14px] cursor-pointer ${activeTab == i ? 'bg-[rgb(206,57,0)] border-[0px]' : 'bg-[#000]'}`}>
                                    {t}
                                </div>
                            )
                        }
                    </div>
                    <div className="ml-[auto] h-12 bg-[rgb(41,41,41)] flex items-center justify-center pl-2">
                        {
                            tabs1.map((t: any, i: number) =>
                                <div key={i} onClick={() => setActiveTab1(i)} className={`h-8 mr-2 flex items-center justify-center w-[60px] rounded-[4px] cursor-pointer ${activeTab1 == i ? 'bg-[rgb(206,57,0)]' : ''}`}>{t}</div>
                            )
                        }
                    </div>
                </div>
                <div className="flex mt-4">
                    <div className="text-[20px]">{lineDes[activeTab]}</div>
                    {
                        (activeTab === 0 || activeTab === 1) &&
                        <div className="ml-[auto] flex">
                            <div className="flex items-center justify-center mr-4">
                                <span className="mr-2">Comments (by)</span>
                                <Switch defaultChecked onChange={setCommentSwitch} checked={commentSwitch} size="small" />
                            </div>
                            <div className="flex items-center justify-center">
                                <span className="mr-2">Mirrors (by)</span>
                                <Switch defaultChecked onChange={setMirrorSwitch} checked={mirrorSwitch} size="small" />
                            </div>
                        </div>
                    }
                </div>
                <div className="h-[500px] relative">
                    {
                        isShowEchart ? (
                            <EngageLine
                                id={'line_1'}
                                dates={dates}
                                lineData={lindData}
                                commentSwitch={commentSwitch}
                                mirrorSwitch={mirrorSwitch}
                                postSwitch={postSwitch}
                                dayType={activeTab1}
                                type={activeTab}
                                sigleData={sigleData}
                            />) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Spin size="large" />
                            </div>
                        )
                    }
                    <div className="absolute flex items-center justify-center mr-4 right-0 bottom-0">
                        <span className="mr-2">Post Only</span>
                        <Switch defaultChecked onChange={setPostSwitch} checked={postSwitch} size="small" />
                    </div>
                    {
                        (activeTab == 2 || activeTab == 3) &&
                        <div className="absolute flex items-center justify-center mr-4 right-[120px] bottom-0">
                            <span className="mr-2">Charged Only</span>
                            <Switch defaultChecked onChange={setChargeSwitch} checked={chargeSwitch} size="small" />
                        </div>
                    }

                </div>
            </div>
            <PubCard lineData={lindData}></PubCard>
        </>
    )
}

export default rmodynamics
