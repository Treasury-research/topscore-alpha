import React, { useState, useEffect, useCallback } from "react";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Checkbox, Switch, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import api from "../api";
import EngageLine from './EngageLine'
import PubCard from './PubCard'
import { currentProfileState, topRecentState, postSwitchState } from "../store/state";
import { useRecoilState } from "recoil";
import moment from 'moment'
import trace from "../api/trace";
import { getNextDate } from "../lib/tool";

const tabs = ['Overview', 'Engagements', 'Collections']

const tabs1 = ['7D', '14D', '21D', '28D']

const lineDes = [
    'Daily engagements of your latest pubs',
    'Daily engagements of your top engaged pubs in 28D',
    'Daily collections of your latest pubs',
    'Daily collections of your top collected pubs in 28D'
]

let resData: any = [];

let resAmountData: any = [];

let resPc: any = [];

const rmodynamics = () => {
    const [activeTab, setActiveTab] = useState(0)

    const [activeTab1, setActiveTab1] = useState(3)

    const [dates, setDates] = useState<any>([])

    const [lindData, setLindData] = useState([])

    const [sigleData, setSigleData] = useState([])

    const [overviewPostData, setOverviewPostData] = useState([])

    const [pubAll, setPubAll] = useState([])

    const [commentSwitch, setCommentSwitch] = useState(true)

    const [mirrorSwitch, setMirrorSwitch] = useState(true)

    const [postSwitch, setPostSwitch] = useRecoilState<any>(postSwitchState);

    const [chargeSwitch, setChargeSwitch] = useState(false)

    const [isShowEchart, setIsShowEchart] = useState(false)

    const [loading, setLoading] = useState(false);

    const [topRecentSwitch, setTopRecentSwitch] = useRecoilState<any>(topRecentState);

    const [currentProfile] = useRecoilState<any>(currentProfileState);

    useEffect(() => {
        trace(`Stack-${tabs1[activeTab1]}`)
    }, [activeTab1])

    useEffect(() => {
        trace(`Stack-${tabs[activeTab]}`)
    }, [activeTab])

    useEffect(() => {
        if (commentSwitch) {
            trace('Stack-EG-Cmt-On')
        } else {
            trace('Stack-EG-Cmt-Off')
        }
    }, [commentSwitch])

    useEffect(() => {
        if (mirrorSwitch) {
            trace('Stack-Mir-Cmt-On')
        } else {
            trace('Stack-Mir-Cmt-Off')
        }
    }, [mirrorSwitch])

    useEffect(() => {
        if (chargeSwitch) {
            trace('Stack-CL-COnly-On')
        } else {
            trace('Stack-CL-COnly-Off')
        }
    }, [chargeSwitch])

    useEffect(() => {
        if (!topRecentSwitch) {
            if (activeTab == 1) {
                trace('Stack-EG-Top')
            } else {
                trace('Stack-CL-Top')
            }
        } else {
            if (activeTab == 1) {
                trace('Stack-EG-Recent')
            } else {
                trace('Stack-CL-Recent')
            }
        }
    }, [topRecentSwitch])

    useEffect(() => {
        if (postSwitch) {
            if (activeTab == 0) {
                trace('Stack-OV-POnly-On')
            }
            if (activeTab == 1) {
                trace('Stack-EG-POnly-On')
            }
            if (activeTab == 2) {
                trace('Stack-CL-POnly-On')
            }
        } else {
            if (activeTab == 0) {
                trace('Stack-OV-POnly-Off')
            }
            if (activeTab == 1) {
                trace('Stack-EG-POnly-Off')
            }
            if (activeTab == 2) {
                trace('Stack-CL-POnly-Off')
            }
        }
    }, [postSwitch])

    const getUTCTime = () => {
        let d1 = new Date();
        let d2: any = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds());
        return Date.parse(d2);
    }

    const enumerateDaysBetweenDates = (startDate, endDate) => {
        let daysList = [];
        const start = moment(startDate);
        const end = moment(endDate);
        const day = end.diff(start, "days");
        daysList.push(Number(start.format("YYYYMMDD")));
        for (let i = 1; i < day; i++) {
            daysList.push(Number(start.add(1, "days").format("YYYYMMDD")));
        }
        const a = localToUtcmm(dayjs(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'))
        const b = `${a.split(' ')[0]} 04:30:00`
        console.log(a)
        console.log(b)
        console.log(daysList)
        if (a < b) {
            daysList.pop()
        }
        // console.log(daysList)
        return daysList;
    }

    const getEngageLineData = async () => {
        setLoading(true)
        setPubAll([])
        resData = []
        resAmountData = []
        resPc = []
        const mdyLocal = dayjs(getUTCTime() - ((activeTab1 + 1) * 7) * 24 * 60 * 60 * 1000).format('YYYYMMDD')
        const ndyLocal = dayjs(getUTCTime()).format('YYYYMMDD') // 当前日期
        const queryLocal = dayjs(getUTCTime() + 24 * 60 * 60 * 1000).format('YYYYMMDD') // 查询日期+1
        //const pcLocal = dayjs(getUTCTime()).format('YYYYMMDD') // 当前日期
        const mdy = mdyLocal
        const ndy = ndyLocal
        // const pcdy = localToUtc(pcLocal)
        console.log('mdy', mdy)
        console.log('ndy', ndy)
        // console.log('pcdy',pcdy)
        if (activeTab === 0) {
            const res: any = await api.get(`/lens/publicationStsByDay?start=${mdy}&end=${queryLocal}&profileId=${currentProfile.profileId}&category=5&type=${postSwitch ? 'Post' : 'Post,Comment'}`);
            const res1: any = await api.get(`/lens/followStsByDay?start=${mdy}&end=${queryLocal}&profileId=${currentProfile.profileId}`);
            const res2: any = await api.get(`/lens/publicationStsByDay?start=${mdy}&end=${queryLocal}&profileId=${currentProfile.profileId}&category=6&type=Post,Comment`);
            if (!res || !res.data || !res1 || !res1.data || !res2 || !res2.data) {
                setLoading(false);
                return false;
            }
            resData = res.data;
            resAmountData = res1.data;
            resPc = res2.data;
        } else if (activeTab === 1) {
            // const res: any = await api.get(`/lens/publicationStsByDay?start=${mdy}&end=${ndy}&profileId=${currentProfile.profileId}&category=${!topRecentSwitch ? 4 : 1}&type=${postSwitch ? 'Post' : 'Post,Comment'}`);
            // const res1: any = await api.get(`/lens/followStsByDay?start=${mdy}&end=${ndy}&profileId=${currentProfile.profileId}`);
            const res: any = await api.get(`/lens/publicationStsByDay?start=${mdy}&end=${queryLocal}&profileId=${currentProfile.profileId}&category=${!topRecentSwitch ? 4 : 1}&type=${postSwitch ? 'Post' : 'Post,Comment'}`);
            const res1: any = await api.get(`/lens/followStsByDay?start=${mdy}&end=${queryLocal}&profileId=${currentProfile.profileId}`);
            if (!res || !res.data || !res1 || !res1.data) {
                setLoading(false);
                return false;
            }
            resData = res.data;
            resAmountData = res1.data;
        } else if (activeTab === 2) {
            // const res: any = await api.get(`/lens/collectStsByDay?start=${mdy}&end=${ndy}&profileId=${currentProfile.profileId}&category=${!topRecentSwitch ? 1 : 2}&type=${postSwitch ? 'Post' : 'Post,Comment'}&isFee=${chargeSwitch ? 1 : ''}`);
            // const res1: any = await api.get(`/lens/collectFeeStsByDay?start=${mdy}&end=${ndy}&profileId=${currentProfile.profileId}`);
            const res: any = await api.get(`/lens/collectStsByDay?start=${mdy}&end=${queryLocal}&profileId=${currentProfile.profileId}&category=${!topRecentSwitch ? 2 : 1}&type=${postSwitch ? 'Post' : 'Post,Comment'}&isFee=${chargeSwitch ? 1 : ''}`);
            // const res1: any = await api.get(`/lens/collectFeeStsByDay?start=${mdy}&end=${ndy}&profileId=${currentProfile.profileId}`);
            if (!res || !res.data) {
                setLoading(false);
                return false;
            }
            resData = res.data;
            // resAmountData = res1.data;
        }
        if (activeTab === 1 || activeTab === 2) {
            let pubAllData: any = []
            if (resData.length !== 0) {
                resData.map((t: any) => {
                    if (!pubAllData.includes(t.pubId)) {
                        pubAllData.push(t.pubId)
                    }
                })
            }
            let newPubAllData = pubAllData.sort((a, b) => { return a - b })
            let idx = newPubAllData.indexOf(0)
            if (idx > -1) {
                newPubAllData.splice(idx, 1)
                newPubAllData.unshift(0)
            }
            setPubAll(newPubAllData);
        }
        setLoading(false);
        // console.log()
        setDates(enumerateDaysBetweenDates(mdy, ndy))
        // console.log(enumerateDaysBetweenDates(mdy, ndy))
        //setDates(enumerateDaysBetweenDates(mdyLocal, ndyLocal))
    }

    const commentChange = (e) => {
        if (e || (!e && mirrorSwitch)) {
            setCommentSwitch(e)
        }
    }

    const mirrorChange = (e) => {
        if (e || (!e && commentSwitch)) {
            setMirrorSwitch(e)
        }
    }


    const localToUtcmm = (date) => {
        const fmt = 'YYYY-MM-DD HH:mm:ss'
        return moment(date, fmt).utc().format(fmt)
    }

    useEffect(() => {
        if (dates.length > 0) {
            let s: any = []; // area data
            let h: any = []; // single line
            let j: any = []; // overview posts & comments
            for (let i = 0; i < dates.length; i++) {
                if (activeTab === 1 || activeTab === 2) {
                    let b = [];
                    for (let j = 0; j < pubAll.length; j++) {
                        let filterPub = resData.filter((t: any) => {
                            return (pubAll[j] === t.pubId && t.day == dates[i])
                        })
                        // && filterPub[0]['day'] === dates[i]
                        if (filterPub && filterPub.length > 0) {
                            b.push({
                                ...filterPub[0],
                                day: filterPub[0]['day']
                            })
                        } else {
                            let filterByID = resData.filter((t: any) => {
                                return pubAll[j] === t.pubId
                            })
                            console.log('filterByID', filterByID)
                            if (activeTab === 1) {
                                if (filterByID && filterByID.length && filterByID[0]['day']) {
                                    const dString = filterByID[0]['day'].toString()
                                    const fitD = dString.slice(0, 4) + '-' + dString.slice(4, 6) + '-' + dString.slice(6, 8)
                                    if (getNextDate(fitD,-1) == dates[i].toString() || dates[i] > filterByID[0]['day']) {
                                        let obj = { ...filterByID[0] }
                                        obj.commentByCount = '0'
                                        obj.day = dates[i]
                                        obj.isFee = '0'
                                        obj.mirrorByCount = '0'
                                        obj.totalByCount = '0'
                                        b.push({
                                            ...obj
                                        })
                                    }
                                }
                            } else {
                                if (filterByID && filterByID.length && filterByID[0]['day']) {
                                    const dString = filterByID[0]['day'].toString()
                                    const fitD = dString.slice(0, 4) + '-' + dString.slice(4, 6) + '-' + dString.slice(6, 8)
                                    if (getNextDate(fitD,-1) == dates[i].toString() || dates[i] > filterByID[0]['day']) {
                                        let obj = { ...filterByID[0] }
                                        obj.collectByCount = '0'
                                        obj.day = dates[i]
                                        b.push({
                                            ...obj
                                        })
                                    }
                                }
                            }
                        }
                    }
                    s.push(b)
                } else {
                    // line data
                    let selData = resData.filter((t) => {
                        return t.day == dates[i]
                    })
                    if (selData.length > 0) {
                        s.push({
                            ...selData[0],
                            day: selData[0]['day']
                        })
                    } else {
                        s.push({
                            collectByCount: "0",
                            commentByCount: "0",
                            day: dates[i],
                            mirrorByCount: "0",
                            totalByCount: "0"
                        })
                    }

                    // overview
                    let postData = resPc.filter((t) => {
                        return t.day == dates[i]
                    })
                    if (postData.length > 0) {
                        j.push({
                            ...postData[0],
                            day: postData[0]['day']
                        })
                    } else {
                        j.push({
                            day: dates[i],
                            postCount: 0,
                            commentCount: 0
                        })
                    }
                }
                for (let j = 0; j < resAmountData.length; j++) {
                    if (resAmountData[j]['day'] == dates[i]) {
                        if (activeTab === 0 || activeTab === 1) {
                            h.push(resAmountData[j]['followCount'])
                        } else {
                            h.push(Number(resAmountData[j]['amount']).toFixed(2))
                        }
                    }
                }
            }
            console.log(s)
            setLindData(s)
            setSigleData(h)
            setOverviewPostData(j)
        }
    }, [dates, pubAll])

    useEffect(() => {
        if (currentProfile && currentProfile.profileId) {
            getEngageLineData()
        }
    }, [activeTab, chargeSwitch, activeTab1, currentProfile, postSwitch])

    useEffect(() => {
        if (currentProfile && currentProfile.profileId && activeTab !== 0) {
            getEngageLineData()
        }
    }, [topRecentSwitch])

    useEffect(() => {
        setTopRecentSwitch(false)
    }, [activeTab])

    return (
        <>
            <div className="text-[#fff] bg-[#1A1A1A] p-5 my-10 rounded-[10px]">
                <div className="flex">
                    <div className="flex">
                        {
                            tabs.map((t: any, i: number) =>
                                <div key={i} onClick={() => setActiveTab(i)} className={`mr-4 box-border rounded-[20px] w-[120px] h-[40px] flex items-center justify-center text-[14px] cursor-pointer hover:opacity-70 ${activeTab == i ? 'bg-[#fff] text-[#000]' : 'radius-btn-shadow text-[#fff]'}`}>
                                    {t}
                                </div>
                            )
                        }
                    </div>
                    <div className="ml-[auto] h-12 bg-[rgb(41,41,41)] flex items-center justify-center pl-2 rounded-[4px]">
                        {
                            tabs1.map((t: any, i: number) =>
                                <div key={i} onClick={() => setActiveTab1(i)} className={`h-8 mr-2 flex items-center justify-center w-[60px] rounded-[4px] cursor-pointer ${activeTab1 ==

                                    i ? 'bg-[#fff] text-[#000]' : ''}`}>{t}</div>
                            )
                        }
                    </div>
                </div>
                <div className="flex mt-4">
                    <div>
                        {
                            (activeTab == 1 || activeTab == 2) &&
                            <div className="flex items-center justify-center mr-4">
                                <span className="mr-2">Top</span>
                                <Switch defaultChecked onChange={setTopRecentSwitch} checked={topRecentSwitch} size="small" className="mr-2" />
                                <span className="mr-2">Recent</span>
                            </div>
                        }
                    </div>
                    {
                        activeTab === 1 &&
                        <div className="ml-[auto] flex">
                            <div className="flex items-center justify-center mr-4">
                                <span className="mr-2">Comments (by)</span>
                                <Switch defaultChecked onChange={(e) => commentChange(e)} checked={commentSwitch} size="small" />
                            </div>
                            <div className="flex items-center justify-center">
                                <span className="mr-2">Mirrors (by)</span>
                                <Switch defaultChecked onChange={(e) => mirrorChange(e)} checked={mirrorSwitch} size="small" />
                            </div>
                        </div>
                    }
                </div>
                <div className="h-[500px] relative">
                    {
                        loading ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <LoadingOutlined className="text-2xl block mx-auto my-[80px]" />
                            </div>
                        ) : (
                            <>
                                {
                                    (pubAll.length > 0 || sigleData.length > 0) &&
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
                                        overviewPostData={overviewPostData}
                                    />
                                }
                                {
                                    pubAll.length === 0 && sigleData.length === 0 &&
                                    <div className="h-full w-full flex items-center justify-center text-[rgba(255,255,255,0.6)] text-[20px]">No recent change</div>
                                }
                            </>
                        )
                    }
                    <>
                        <div className="absolute flex items-center justify-center mr-4 right-0 bottom-0">
                            <span className="mr-2">Posts Only</span>
                            <Switch defaultChecked onChange={setPostSwitch} checked={postSwitch} size="small" />
                        </div>
                        {
                            activeTab == 2 &&
                            <div className="absolute flex items-center justify-center mr-4 right-[120px] bottom-0">
                                <span className="mr-2">Charged Only</span>
                                <Switch defaultChecked onChange={setChargeSwitch} checked={chargeSwitch} size="small" />
                            </div>
                        }
                    </>
                </div>
            </div>
            <PubCard lineData={lindData} topRecentSwitch={topRecentSwitch} activeLineTab={activeTab}></PubCard>
        </>
    )
}

export default rmodynamics
