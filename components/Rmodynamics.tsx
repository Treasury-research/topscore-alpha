import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined, LoadingOutlined } from '@ant-design/icons';
import api from "../api";
import { Checkbox, Popover } from 'antd';
import { currentProfileState } from "../store/state";
import { useRecoilState } from "recoil";
import Image from 'next/image'
import IconVolume from '../statics/img/volume.svg'
import Mirror from '../statics/img/mirror_1.svg'
import Comment from '../statics/img/pubIcon/commentBig.svg'
import Post from '../statics/img/post_icon.svg'
import Collect from '../statics/img/collect-line.svg'
import Volume from '../statics/img/volume-head.svg'
import ImgPublitions from "../statics/img/profileV2/remo-publication.svg"
import Imgcommentsby from '../statics/img/commentsby.svg'

import moment from 'moment'

import BN from "bignumber.js";

const dys = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

let maxRemoData: any = [0, 0, 0, 0, 0]

let weekCount = 0;

const tabs = ['Global', 'Personal'];

const rmodynamics = () => {

    const [remodyBaseData, setRemodyBaseData] = useState<any>([]);

    const [checked, setChecked] = useState([true, true, true, true, false, false]);

    const [week, setWeek] = useState<any>([]);

    const [activeItems, setActiveItems] = useState<any>([]);

    const [activeTab, setActiveTab] = useState<any>(0);

    const [currentDate, setCurrentDate] = useState<any>([]);

    const [totalAmount, setTotalAmount] = useState<any>();

    const [loading, setLoading] = useState<boolean>(false);

    // const [isFirstRefresh, setIsFirstRefresh] = useState<boolean>(true);

    const [currentProfile] = useRecoilState<any>(currentProfileState);

    useEffect(() => {
        if (currentDate.length !== 0) {
            if (currentProfile && currentProfile.profileId) {
                if (weekCount === 0) {
                    getGlobalAvgHeatmapData()
                } else {
                    getGlobalHeatmapData()
                }
            }
        }
    }, [currentDate, currentProfile, activeTab])

    // useEffect(() => {
    //     // setIsFirstRefresh(true)
    //     getGlobalAvgHeatmapData()
    // }, [currentProfile,activeTab])

    useEffect(() => {
        getCurrentWeek()
    }, [])

    const togglTab = (idx) => {
        setActiveTab(idx)
        setChecked([true, true, true, true, false])
        setActiveItems([])
    }

    // const localToUtc = (date) => {
    //     const fmt = 'YYYYMMDDHH'
    //     return moment(date, fmt).utc().format(fmt)
    // }

    // const utcToLocal = (date) => {
    //     const fmt = 'YYYYMMDDHH'
    //     return moment.utc(date, fmt).local().format(fmt)
    // }

    const getGlobalAvgHeatmapData = async () => {
        setLoading(true);
        setTotalAmount({})
        let res: any;
        if (activeTab === 0) {
            res = await api.get(`/lens/queryGlobalAvgByWeek`)
        } else {
            res = await api.get(`/lens/queryProfileAvgByWeek/${currentProfile.profileId}`)
        }
        let totalAmount = {
            postCount: 0,
            commentCount: 0,
            mirrorCount: 0,
            collectCount: 0,
            collectFee: 0,
            pubCount: 0
        }
        let weekOfDay = parseInt(moment().format('E'));
        let rem: any = [[], [], [], [], [], [], []]
        // const dWeek = weekOfDay === 0 ? 6 : weekOfDay
        // const dHour = parseInt(moment().format('HH'))
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 24; j++) {
                rem[i].push('noData')
            }
        }
        maxRemoData = [0, 0, 0, 0, 0]
        setLoading(false);
        if (!res || !res.data) {
            setRemodyBaseData(rem)
            return false;
        }
        res.data.forEach((t: any) => {
            let week: any
            let avgPostCount, avgCommentCount, avgMirrorCount, avgCollectCount, avgPubCount
            if (activeTab === 0) {
                avgPostCount = Number(t.avgPostCount);
            }
            if (activeTab === 1) {
                avgPubCount = Number(t.avgPubCount);
            }
            avgCommentCount = Number(t.avgCommentCount);
            avgMirrorCount = Number(t.avgMirrorCount);
            avgCollectCount = Number(t.avgCollectCount);
            if (t.date.includes('Monday')) {
                week = 0
            }
            if (t.date.includes('Tuesday')) {
                week = 1
            }
            if (t.date.includes('Wednesday')) {
                week = 2
            }
            if (t.date.includes('Thursday')) {
                week = 3
            }
            if (t.date.includes('Friday')) {
                week = 4
            }
            if (t.date.includes('Saturday')) {
                week = 5
            }
            if (t.date.includes('Sunday')) {
                week = 6
            }
            if (activeTab === 0) {
                totalAmount.postCount += avgPostCount;
            }
            if (activeTab === 1) {
                totalAmount.pubCount += avgPubCount;
            }
            totalAmount.commentCount += avgCommentCount;
            totalAmount.mirrorCount += avgMirrorCount;
            totalAmount.collectCount += avgCollectCount;
            // totalAmount.collectFee += Number(t.collectFee);
            totalAmount.collectFee += 0;

            if ((activeTab === 0) && (avgPostCount > maxRemoData[0])) {
                maxRemoData[0] = avgPostCount
            }
            if ((activeTab === 1) && (avgPubCount > maxRemoData[4])) {
                maxRemoData[4] = avgPubCount
            }
            if (avgCommentCount > maxRemoData[1]) {
                maxRemoData[1] = avgCommentCount
            }
            if (avgMirrorCount > maxRemoData[2]) {
                maxRemoData[2] = avgMirrorCount
            }
            if (avgCollectCount > maxRemoData[3]) {
                maxRemoData[3] = avgCollectCount
            }
            // const toUtcHour = getHourUtcByNum(Number(t.date.split('_')[1]))
            rem[week][Number(t.date.split('_')[1])] = [avgPostCount || 0, avgCommentCount, avgMirrorCount, avgCollectCount, avgPubCount || 0, ''];
        })
        console.log('rem', rem)
        console.log('totalAmount', totalAmount)
        setRemodyBaseData(rem)
        console.log('maxRemoData',maxRemoData)
        setTotalAmount(totalAmount)
        setLoading(false);
    }

    const getGlobalHeatmapData = async () => {
        setLoading(true);
        setTotalAmount({})
        let res: any;
        if (activeTab === 0) {
            res = await api.get(`/thermal-map/global`, {
                params: {
                    // from: `${localToUtc(currentDate[0].toString() + '00')}`,
                    // to: `${localToUtc(currentDate[1].toString() + '23')}`,
                    from: `${currentDate[0].toString() + '00'}`,
                    to: `${currentDate[1].toString() + '23'}`,
                }
            })
        } else {
            res = await api.get(`/thermal-map/personal/${currentProfile.profileId}`, {
                params: {
                    // from: `${localToUtc(currentDate[0].toString() + '00')}`,
                    // to: `${localToUtc(currentDate[1].toString() + '23')}`,
                    from: `${currentDate[0].toString() + '00'}`,
                    to: `${currentDate[1].toString() + '23'}`,
                }
            })
        }
        let totalAmount = {
            postCount: 0,
            commentCount: 0,
            mirrorCount: 0,
            collectCount: 0,
            collectFee: 0,
            pubCount: 0
        }
        let weekOfDay = parseInt(moment().format('E'));//计算今天是这周第几天
        let rem: any = [[], [], [], [], [], [], []]
        const dWeek = weekOfDay === 0 ? 6 : weekOfDay
        const dHour = parseInt(moment().format('HH'))
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 24; j++) {
                if ((dWeek > i + 1 || (dWeek === i + 1 && dHour > j)) && weekCount === 0) {
                    rem[i].push('noData')
                } else if (weekCount !== 0) {
                    rem[i].push('noData')
                } else {
                    rem[i].push(null)
                }
            }
        }
        maxRemoData = [0, 0, 0, 0, 0]
        setLoading(false);
        if (!res || !res.data) {
            setRemodyBaseData(rem)
            return false;
        }
        res.data.forEach((t: any) => {
            // const timePeriod = utcToLocal(t.timePeriod)
            const timePeriod = t.timePeriod
            let week = moment(timePeriod.toString().slice(0, 8)).weekday()
            if (activeTab === 0) {
                totalAmount.postCount += t.postCount;
            }
            if (activeTab === 1) {
                totalAmount.pubCount += t.pubCount;
            }
            totalAmount.commentCount += t.commentCount;
            totalAmount.mirrorCount += t.mirrorCount;
            totalAmount.collectCount += t.collectCount;
            totalAmount.collectFee += Number(t.collectFee);

            if ((activeTab === 0) && (t.postCount > maxRemoData[0])) {
                maxRemoData[0] = t.postCount
            }
            if ((activeTab === 1) && (t.pubCount > maxRemoData[4])) {
                maxRemoData[4] = t.pubCount
            }
            if (t.commentCount > maxRemoData[1]) {
                maxRemoData[1] = t.commentCount
            }
            if (t.mirrorCount > maxRemoData[2]) {
                maxRemoData[2] = t.mirrorCount
            }
            if (t.collectCount > maxRemoData[3]) {
                maxRemoData[3] = t.collectCount
            }
            if (Number(t.collectFee) > maxRemoData[4]) {
                maxRemoData[4] = Number(t.collectFee)
            }
            if (week == 0) {
                rem[6][Number(timePeriod.toString().slice(8, 10))] = [t.postCount || 0, t.commentCount, t.mirrorCount, t.collectCount,  t.pubCount, timePeriod];
            } else {
                rem[week - 1][Number(timePeriod.toString().slice(8, 10))] = [t.postCount || 0, t.commentCount, t.mirrorCount, t.collectCount, t.pubCount, timePeriod];
            }
        })
        setRemodyBaseData(rem)
        setTotalAmount(totalAmount)
        setLoading(false);
    }

    const getCurrentWeek = () => {
        let weekOfDay = parseInt(moment().format('E'));//计算今天是这周第几天
        let last_monday = moment().startOf('day').subtract(weekOfDay + 7 * (weekCount === -1 ? 0 : weekCount) - 1, 'days').toDate();//周一日期
        let last_sunday = moment().startOf('day').subtract(weekOfDay + 7 * ((weekCount === -1 ? 0 : weekCount) - 1), 'days').toDate();//周日日期
        setWeek([moment(last_monday).format('MM/DD'), moment(last_sunday).format('MM/DD')])
        setCurrentDate([`20${moment(last_monday).format('YYMMDD')}`, `20${moment(last_sunday).format('YYMMDD')}`])
        setActiveItems([]);
        let rem: any = [[], [], [], [], [], [], []]
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 24; j++) {
                rem[i].push(null)
            }
        }
        setRemodyBaseData(rem)
    }

    const onCheckChange = (i: number) => {
        let target = !checked[i]
        if (i === 4 || i === 5) {
            let preChecked = [false, false, false, false, false, false]
            preChecked[i] = target
            setChecked(preChecked);
        } else {
            setChecked((prev: any) => {
                prev[i] = target;
                if (target) {
                    prev[4] = false;
                    // prev[5] = false;
                }
                return [...prev];
            });
        }
    };

    const putActiveItems = (e: any) => {
        let isHasItems = false;
        let items = [...activeItems]
        items.forEach((t: any, i: number) => {
            if (t[0] === e[0] && t[1] === e[1]) {
                items.splice(i, 1)
                isHasItems = true
            }
        })
        setActiveItems((prev: any) => {
            if (!isHasItems) {
                return [...prev, e]
            } else {
                return [...items]
            }
        });
    }

    const getNextWeek = () => {
        if (weekCount >= 0) {
            weekCount--;
            getCurrentWeek();
            // getGlobalHeatmapData()
        }
    }

    const getLastWeek = () => {
        if (weekCount !== 4) {
            weekCount++;
            getCurrentWeek();
            // getGlobalHeatmapData()
        }
    }

    const getBorderStyle = (e: any) => {
        let rs = activeItems.filter((t: any, i: number) => {
            return t[0] === e[0] && t[1] === e[1]
        })
        if (rs && rs.length !== 0) {
            return 'border-[1px] border-[#B4D2FF]'
        }
    }

    const getItemStyle = (e: any) => {
        if (!e || !checked.includes(true) || e === 'noData') return 'bg-[#232323]'
        let maxMount = 0;
        let totalMount = 0;
        checked.forEach((t: any, i: number) => {
            // if(activeTab === 1 && i === 5 && weekCount !== 0) return false
            if (t) {
                maxMount += maxRemoData[i]
                totalMount += e[i]
            }
        })
        console.log(maxMount)
        if (totalMount === 0) return 'bg-[#232323]'
        let lv = maxMount / 5;
        if (lv === 0) {
            return 'bg-[#232323]'
        }
        if (totalMount < lv) {
            return 'bg-[#311C17]'
        } else if (lv <= totalMount && totalMount < lv * 2) {
            return 'bg-[#471F14]'
        } else if (lv * 2 <= totalMount && totalMount < lv * 3) {
            return 'bg-[#75240F]'
        } else if (lv * 3 <= totalMount && totalMount < lv * 4) {
            return 'bg-[#A32A0A]'
        } else if (lv * 4 <= totalMount) {
            return 'bg-[#D13005]'
        }
    }

    const getContent = (e: any, i: number, idx) => {
        console.log(e)
        if (!e || !checked.includes(true)) return ''
        let strDate = '';
        // if(activeTab === 0){
        //     strDate = e[6].toString();
        // }
        let noStrDate = '';
        if (e === 'noData') {
            let current_hs = Number(moment(`2023/${week[0]}`).format("x"))
            noStrDate = moment(current_hs + i * 24 * 60 * 60 * 1000).format(`YYYY/MM/DD`)
        }else if(e && e[6]){
            strDate = e[6].toString();
        }
        let h = idx < 12 ? `${idx}AM` : `${idx}PM`
        return (
            <div>
                {
                    e !== 'noData' &&
                    <p className="text-[18px] font-[600]">
                        {e[6] ? `${strDate.slice(0, 4)}/${strDate.slice(4, 6)}/${strDate.slice(6, 8)} ${h}` : `${dys[i]}  ${h}`}
                    </p>
                }
                {
                    e === 'noData' &&
                    <p className="text-[18px] font-[600]">
                        {`${noStrDate} ${h}`}
                    </p>
                }
                {/* <p>Count：{totalMount.toFixed(2)}</p> */}
                <div>
                    {
                        e === 'noData' && checked[0] && activeTab === 0 && (
                            <div>Posts {activeTab == 1 ? '(by)' : ''} {weekCount === 0 ? '(Avg)' : ''}：0</div>
                        )
                    }
                    {
                        e === 'noData' && checked[4] && activeTab === 1 && (
                            <div>Publications ：0</div>
                        )
                    }
                    {
                        e === 'noData' && checked[1] && (
                            <div>Comments {activeTab == 1 ? '(by)' : ''} {weekCount === 0 ? '(Avg)' : ''}：0</div>
                        )
                    }
                    {
                        e === 'noData' && checked[2] && (
                            <div>Mirrors {activeTab == 1 ? '(by)' : ''} {weekCount === 0 ? '(Avg)' : ''}：0</div>
                        )
                    }
                    {
                        e === 'noData' && checked[3] && (
                            <div>Collections {activeTab == 1 ? '(by)' : ''} {weekCount === 0 ? '(Avg)' : ''}：0</div>
                        )
                    }
                    {/* {
                        e === 'noData' && checked[4] && (
                            <div>Volume {weekCount === 0 ? '(Avg)' : ''}：0.00</div>
                        )
                    } */}

                    {
                        checked[0] && activeTab === 0 && e !== 'noData' &&
                        <div>Posts {weekCount === 0 ? '(Avg)' : ''}：{e[0]}</div>
                    }
                    {
                        checked[4] && activeTab === 1 && e !== 'noData' &&
                        <div>Publications ：{e[4]}</div>
                    }
                    {
                        checked[1] && e !== 'noData' &&
                        <div>Comments {activeTab == 1 ? '(by)' : ''} {weekCount === 0 ? '(Avg)' : ''}：{e[1]}</div>
                    }
                    {
                        checked[2] && e !== 'noData' &&
                        <div>Mirrors {activeTab == 1 ? '(by)' : ''} {weekCount === 0 ? '(Avg)' : ''}：{e[2]}</div>
                    }
                    {
                        checked[3] && e !== 'noData' &&
                        <div>Collections {activeTab == 1 ? '(by)' : ''} {weekCount === 0 ? '(Avg)' : ''}：{e[3]}</div>
                    }
                    {/* {
                        checked[4] && e !== 'noData' &&
                        <div>Volume {weekCount === 0 ? '(Avg)' : ''}：{e[4].toFixed(2)}</div>
                    } */}
                </div>
            </div>
        )
    };

    const getMount = (mount: number) => {
        return new BN((mount).toFixed(2)).toFormat()
    }

    // const onCheckChange = (i: number) => {
    //     let target = !checked[i]
    //     setChecked((prev: any) => {
    //         prev[i] = target;
    //         return [...prev];
    //     });
    // };

    return (
        <div className="text-[#fff] mb-10">
            <div className="flex mb-20 overflow-y-hidden">
                <div className="w-[880px] mr-[10px]">
                    <div className="flex jusitify-between h-[54px] items-center bg-[#1A1A1A] rounded-[10px] mb-[10px]">
                        <div className="flex ml-8">
                            {
                                tabs.map((t: any, i: number) => (
                                    <div key={i} onClick={() => togglTab(i)} className={`cursor-pointer px-2 py-1 mr-4 text-[18px] ${activeTab === i ? 'text-[#fff] border-b-[2px] border-[#fff]' : 'text-[rgba(255,255,255,0.4)]'}`}>{t}</div>
                                ))
                            }
                        </div>
                        <div className="mr-8 flex ml-[auto] w-[fit-content] items-center">
                            <div className="text-[12px] ml-[-4px] mr-2">Low</div>
                            <div className="h-[16px] w-[45px] bg-[#311C17]">

                            </div>
                            <div className="h-[16px] w-[45px] bg-[#471F14]">

                            </div>
                            <div className="h-[16px] w-[45px] bg-[#75240F]">

                            </div>
                            <div className="h-[16px] w-[45px] bg-[#A32A0A]">

                            </div>
                            <div className="h-[16px] w-[45px] bg-[#D13005]">

                            </div>
                            <div className="text-[12px] ml-2 ml-2">High</div>
                        </div>
                    </div>
                    <div className="w-full overflow-hidden bg-[#1A1A1A] rounded-[10px] p-4 pt-6">
                        {
                            loading ?
                                <div className="h-[234px] flex items-center"><LoadingOutlined className="text-2xl block mx-auto" /></div>
                                : <>
                                    <div className="mt flex justify-center w-full">
                                        <div className="w-[fit-content]">
                                            {
                                                remodyBaseData.map((t: any, i: number) => (
                                                    <div className="flex mb-[1px]" key={i}>
                                                        <div className="text-[12px] w-[40px] h-[30px] flex items-center day-liber">{dys[i]}</div>
                                                        {
                                                            t.map((item: any, index: number) => (
                                                                (!item || !checked.includes(true)) ?
                                                                    (
                                                                        <div key={index} onClick={() => putActiveItems([i, index])} className={`${getBorderStyle([i, index])} box-border h-[28px] w-[28px] mr-[2px] cursor-pointer ${getItemStyle(item)}`}></div>
                                                                    ) : (<Popover key={index} placement="bottom" content={() => getContent(item, i, index)}>
                                                                        <div onClick={() => putActiveItems([i, index])} className={`${getBorderStyle([i, index])} box-border h-[28px] w-[28px] mr-[2px] cursor-pointer ${getItemStyle(item)}`}></div>
                                                                    </Popover>)

                                                            ))
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="text-[12px] w-full flex justify-center overflow-hidden">
                                        <div className="w-[718px] ml-[42px]">
                                            <div className="w-[180px] float-left">0AM</div>
                                            <div className="w-[175px] float-left">6AM</div>
                                            <div className="w-[180px] float-left">12PM</div>
                                            <div className="float-left">18PM</div>
                                            <div className="float-right mr-0">24PM</div>
                                        </div>

                                    </div>
                                </>
                        }

                    </div>
                </div>
                <div className="w-[calc(100%-890px)] min-w-[280px]">
                    <div className="flex min-w-[280px] max-w-100 mt-[26px]">
                        <div className={`rounded-[4px] h-10 w-10 bg-[#1A1A1A] flex items-center justify-center text-[24px] ${weekCount === 4 ? 'cursor-[not-allowed]' : 'cursor-pointer'}`} onClick={getLastWeek}><LeftOutlined /></div>
                        <div className="rounded-[10px] w-[calc(100%-100px)] mx-[10px] h-10 bg-[#1A1A1A] flex items-center justify-center">
                            {
                                week.length !== 0 &&
                                <>
                                    {
                                        weekCount === -1 &&
                                        <span className="mr-[10px] text-[14px]">This Week</span>
                                    }
                                    {
                                        weekCount === 1 &&
                                        <span className="mr-[10px] text-[14px]">Last Week</span>
                                    }
                                    {
                                        weekCount !== 0 ? (
                                            <span className="text-[14px]">{week[0]}-{week[1]}</span>
                                        ) : (
                                            <span className="text-[14px]">Average of Last 28 Days</span>
                                        )
                                    }
                                </>
                            }
                        </div>
                        <div className={`rounded-[4px] h-10 w-10 bg-[#1A1A1A] flex items-center justify-center text-[24px] ${weekCount == -1 ? 'cursor-[not-allowed]' : 'cursor-pointer'}`} onClick={getNextWeek}><RightOutlined /></div>
                    </div>
                    <div className="px-6 py-4 bg-[#1A1A1A] mt-[10px] rounded-[10px] h-[262px] flex items-center">
                        <div className="h-[fit-content] w-full">
                            {
                                activeTab == 0 &&
                                // <div className="flex mb-2">
                                //     <div>
                                //         <Checkbox onChange={(e: any) => onChange(e, 0)} checked={checked[0]}>
                                //             <span className="text-[#fff] text-[14px]">Posts {weekCount === 0 ? '(Avg)' : ''}</span>
                                //         </Checkbox>
                                //     </div>
                                //     <div className="ml-[auto]">{(totalAmount && (totalAmount.postCount || totalAmount.postCount === 0)) ? getMount(totalAmount.postCount) : '-'}</div>

                                // </div>

                                <div className="flex items-center cursor-pointer text-[14px] mb-4" onClick={() => onCheckChange(0)}>
                                    <div className={`${checked[0] ? 'bg-[#CE3900]' : 'bg-[#4F4F4F]'} mr-2 rounded-[4px]`}>
                                        <Image
                                            className="h-[fit-content] w-[16px] h-[16px]"
                                            src={Post}
                                            alt=""
                                        />
                                    </div>
                                    
                                    <div>Posts {weekCount === 0 ? '(Avg)' : ''}</div>
                                    <div className="ml-[auto]">{(totalAmount && (totalAmount.postCount || totalAmount.postCount === 0)) ? getMount(totalAmount.postCount) : '-'}</div>
                                </div>

                            }
                            {
                                activeTab == 1 &&
                                // <div className="flex mb-2">
                                //     <div>
                                //         <Checkbox onChange={(e: any) => onChange(e, 5)} checked={checked[5]}>
                                //             <span className="text-[#fff] text-[14px]">Publications</span>
                                //         </Checkbox>
                                //     </div>
                                //     <div className="ml-[auto]">{(totalAmount && (totalAmount.pubCount || totalAmount.pubCount === 0)) ? getMount(totalAmount.pubCount) : '-'}</div>
                                // </div>

                                <div className="flex items-center cursor-pointer text-[14px] mb-4" onClick={() => onCheckChange(4)}>
                                    <div className={`${checked[4] ? 'bg-[#CE3900]' : 'bg-[#4F4F4F]'} mr-2 rounded-[4px] w-[16px] h-[16px] flex items-center justify-center`}>
                                        <Image
                                            className="h-[fit-content] w-[14px] h-[14px]"
                                            src={ImgPublitions}
                                            alt=""
                                        />
                                    </div>
                                    
                                    <div>Publications</div>
                                    <div className="ml-[auto]">{(totalAmount && (totalAmount.pubCount || totalAmount.pubCount === 0)) ? getMount(totalAmount.pubCount) : '-'}</div>
                                </div>
                            }
                            {/* <div className="flex mb-2">
                                <div>
                                    <Checkbox onChange={(e: any) => onChange(e, 1)} checked={checked[1]}>
                                        <span className="text-[#fff] text-[14px]">Comments{activeTab == 1 ? '(by)' : ''} {weekCount === 0 ? '(Avg)' : ''}</span>
                                    </Checkbox>
                                </div>
                                <div className="ml-[auto]">{(totalAmount && (totalAmount.commentCount || totalAmount.commentCount === 0)) ? getMount(totalAmount.commentCount) : '-'}</div>
                            </div> */}
                            <div className="flex items-center cursor-pointer text-[14px] mb-4" onClick={() => onCheckChange(1)}>
                                <div className={`${checked[1] ? 'bg-[#CE3900]' : 'bg-[#4F4F4F]'} mr-2 rounded-[4px]`}>
                                    <Image
                                        className="h-[fit-content] w-[16px] h-[16px]"
                                        src={activeTab == 0 ? Comment : Imgcommentsby}
                                        alt=""
                                    />
                                </div>
                                
                                <div>Comments {activeTab == 1 ? '(by)' : ''} {weekCount === 0 ? '(Avg)' : ''}</div>
                                <div className="ml-[auto]">{(totalAmount && (totalAmount.commentCount || totalAmount.commentCount === 0)) ? getMount(totalAmount.commentCount) : '-'}</div>
                            </div>

                            {/* <div className="flex mb-2">
                                <div>
                                    <Checkbox onChange={(e: any) => onChange(e, 2)} checked={checked[2]}>
                                        <span className="text-[#fff] text-[14px]">Mirrors{activeTab == 1 ? '(by)' : ''} {weekCount === 0 ? '(Avg)' : ''}</span>
                                    </Checkbox>
                                </div>
                                <div className="ml-[auto]">{(totalAmount && (totalAmount.mirrorCount || totalAmount.mirrorCount === 0)) ? getMount(totalAmount.mirrorCount) : '-'}</div>
                            </div> */}

                            <div className="flex items-center cursor-pointer text-[14px] mb-4" onClick={() => onCheckChange(2)}>
                                <div className={`${checked[2] ? 'bg-[#CE3900]' : 'bg-[#4F4F4F]'} mr-2 rounded-[4px]`}>
                                    <Image
                                        className="h-[fit-content] w-[16px] h-[16px]"
                                        src={Mirror}
                                        alt=""
                                    />
                                </div>
                                <div>Mirrors {activeTab == 1 ? '(by)' : ''} {weekCount === 0 ? '(Avg)' : ''}</div>
                                <div className="ml-[auto]">{(totalAmount && (totalAmount.mirrorCount || totalAmount.mirrorCount === 0)) ? getMount(totalAmount.mirrorCount) : '-'}</div>
                            </div>

                            {/* <div className="flex mb-2">
                                <div>
                                    <Checkbox onChange={(e: any) => onChange(e, 3)} checked={checked[3]}>
                                        <span className="text-[#fff] text-[14px]">Collections{activeTab == 1 ? '(by)' : ''} {weekCount === 0 ? '(Avg)' : ''}</span>
                                    </Checkbox>
                                </div>
                                <div className="ml-[auto]">{(totalAmount && (totalAmount.collectCount || totalAmount.collectCount === 0)) ? getMount(totalAmount.collectCount) : '-'}</div>
                            </div> */}

                            <div className="flex items-center cursor-pointer text-[14px] mb-4" onClick={() => onCheckChange(3)}>
                                <div className={`${checked[3] ? 'bg-[#CE3900]' : 'bg-[#4F4F4F]'} mr-2 rounded-[4px]`}>
                                    <Image
                                        className="h-[fit-content] w-[16px] h-[16px]"
                                        src={Collect}
                                        alt=""
                                    />
                                </div>
                                
                                <div>Collections {activeTab == 1 ? '(by)' : ''} {weekCount === 0 ? '(Avg)' : ''}</div>
                                <div className="ml-[auto]">{(totalAmount && (totalAmount.collectCount || totalAmount.collectCount === 0)) ? getMount(totalAmount.collectCount) : '-'}</div>
                            </div>

                            {/* <div className="flex">
                                <div>
                                    <Checkbox onChange={(e: any) => onChange(e, 4)} checked={checked[4]}>
                                        <span className="text-[#fff] text-[14px]">Volume{weekCount === 0 ? '(Avg)' : ''}</span>
                                    </Checkbox>
                                </div>
                                <div className="ml-[auto] flex items-center">
                                    <Image
                                        className="mr-1 h-5 w-5 mr-2"
                                        src={IconVolume}
                                        alt=""
                                    /><span>{(totalAmount && (totalAmount.collectFee || totalAmount.collectFee === 0)) ? Number(totalAmount.collectFee).toFixed(2) : '-'}
                                    </span>
                                </div>
                            </div> */}

                            {/* <div className="flex items-center cursor-pointer text-[14px]" onClick={() => onCheckChange(4)}>
                                <div className={`${checked[4] ? 'bg-[#CE3900]' : 'bg-[#4F4F4F]'} mr-2 rounded-[4px]`}>
                                    <Image
                                        className="h-[fit-content] w-[16px] h-[16px]"
                                        src={Volume}
                                        alt=""
                                    />
                                </div>
                                <div>Volume {weekCount === 0 ? '(Avg)' : ''}</div>
                                <div className="ml-[auto] flex items-centeer">
                                    <Image
                                        className="mr-1 h-5 w-5 mr-2"
                                        src={IconVolume}
                                        alt=""
                                    /><span>{(totalAmount && (totalAmount.collectFee || totalAmount.collectFee === 0)) ? Number(totalAmount.collectFee).toFixed(2) : '-'}
                                    </span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default rmodynamics
