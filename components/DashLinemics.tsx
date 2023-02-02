import React, { useState, useEffect, useCallback } from "react";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Checkbox, Switch,Spin } from 'antd';
import dayjs from 'dayjs';
import api from "../api";
import Kline from './Kline'

const tabs = ['Follwers $ Engagement', 'Fee & Collection']

const tabs1 = ['7D', '14D', '21D', '28D']

let resData: any = [];

const rmodynamics = () => {
    const [activeTab, setActiveTab] = useState(0)

    const [activeTab1, setActiveTab1] = useState(0)

    const [dates, setDates] = useState<any>([])

    const [lindData, setLindData] = useState([])

    const [commentSwitch, setCommentSwitch] = useState(true)

    const [mirrorSwitch, setMirrorSwitch] = useState(true)

    const [postSwitch, setPostSwitch] = useState(true)

    const [isShowEchart, setIsShowEchart] = useState(false)

    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    const getLineData = async () => {
        setIsShowEchart(true)
        const mdy = dayjs(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).format('YYYYMMDD') // 30天前的日期
        const ndy = dayjs(new Date()).format('YYYYMMDD') // 当前日期
        const res: any = await api.get(`/lens/publicationStsByDay?start=${mdy}&end=${ndy}&profileId=10`);
        resData = res.data;
        let newDates: any = []
        res.data.map((t: any) => {
            newDates.push(t.day)
        })
        setDates([...new Set(newDates)])
    }

    useEffect(() => {
        setIsShowEchart(false)
        if (dates.length > 0) {
            let s: any = []; // data
            let l = []; // legend
            for (let i = 0; i < dates.length; i++) {
                let b = [];
                for (let j = 0; j < resData.length; j++) {
                    if (resData[j]['day'] === dates[i]) {
                        b.push(resData[j])
                    }
                }
                s.push(b)
            }
            setLindData(s)
            setTimeout(() => {
                setIsShowEchart(true)
            }, 1000)

        }
    }, [dates, postSwitch])

    useEffect(() => {

        getLineData()

    }, [])

    return (
        <div className="text-[#fff] bg-[#1A1A1A] p-5 mt-10">
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
                <div>PlaceHolder</div>
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
            </div>
            <div className="h-[500px] relative">
                {
                    isShowEchart ?(
                    <Kline
                        id={'line_1'}
                        dates={dates}
                        lineData={lindData}
                        commentSwitch={commentSwitch}
                        mirrorSwitch={mirrorSwitch}
                        postSwitch={postSwitch}
                        dayType={activeTab1}
                    />) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Spin size="large"/>
                        </div>
                    )
                }
                <div className="absolute flex items-center justify-center mr-4 right-0 bottom-0">
                    <span className="mr-2">Post Only</span>
                    <Switch defaultChecked onChange={setPostSwitch} checked={postSwitch} size="small" />
                </div>
            </div>
        </div>
    )
}

export default rmodynamics
