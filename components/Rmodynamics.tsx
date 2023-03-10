import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined, LoadingOutlined } from '@ant-design/icons';
import api from "../api";
import { Checkbox, Popover } from 'antd';
import { currentProfileState } from "../store/state";
import { useRecoilState } from "recoil";
import Image from 'next/image'
import IconVolume from '../statics/img/volume.svg'

import moment from 'moment'

import BN from "bignumber.js";

const dys = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

let maxRemoData: any = [0, 0, 0, 0, 0]

let weekCount = 0;

const tabs = ['Global', 'Personal'];

const rmodynamics = () => {

    const [remodyBaseData, setRemodyBaseData] = useState<any>([]);

    const [checked, setChecked] = useState([true, true, true, true, false]);

    const [week, setWeek] = useState<any>([]);

    const [activeItems, setActiveItems] = useState<any>([]);

    const [activeTab, setActiveTab] = useState<any>(0);

    const [currentDate, setCurrentDate] = useState<any>([]);

    const [totalAmount, setTotalAmount] = useState<any>();

    const [loading, setLoading] = useState<boolean>(false);

    const [currentProfile] = useRecoilState<any>(currentProfileState);

    useEffect(() => {
        if (currentDate.length !== 0) {
            if (currentProfile && currentProfile.profileId) {
                getGlobalHeatmapData();
            }
        }
    }, [currentDate, activeTab, currentProfile])

    useEffect(() => {
        getCurrentWeek()
    }, [])

    useEffect(() => {
        setChecked([true, true, true, true, false])
        setActiveItems([])
    }, [activeTab])

    // useEffect(() => {
    //     if (checked.length !== 0) {
    //         let checkedIndex = [];
    //         checked.forEach((t: any, i: number) => {
    //             if (t) checkedIndex.push(i)
    //         })
    //     }
    // }, [checked])

    const localToUtc = (date) => {
        const fmt = 'YYYYMMDDHH'
        return moment(date, fmt).utc().format(fmt)
    }

    const utcToLocal = (date) => {
        const fmt = 'YYYYMMDDHH'
        return moment.utc(date, fmt).local().format(fmt)
    }
    
    const getGlobalHeatmapData = async () => {
        setLoading(true);
        let res: any;
        if (activeTab === 0) {
            res = await api.get(`/thermal-map/global`, {
                params: {
                    from: `${localToUtc(currentDate[0].toString() + '00')}`,
                    to: `${localToUtc(currentDate[1].toString() + '23')}`,
                }
            })
        } else {
            res = await api.get(`/thermal-map/personal/${currentProfile.profileId}`, {
                params: {
                    from: `${localToUtc(currentDate[0].toString() + '00')}`,
                    to: `${localToUtc(currentDate[0].toString() + '23')}`,
                }
            })
        }
        let totalAmount = {
            postCount: 0,
            commentCount: 0,
            mirrorCount: 0,
            collectCount: 0,
            collectFee: 0
        }
        let weekOfDay = parseInt(moment().format('E'));//??????????????????????????????
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
            const timePeriod = utcToLocal(t.timePeriod)
            let week = moment(timePeriod.toString().slice(0, 8)).weekday()
            if (activeTab === 0) {
                totalAmount.postCount += t.postCount;
            }
            totalAmount.commentCount += t.commentCount;
            totalAmount.mirrorCount += t.mirrorCount;
            totalAmount.collectCount += t.collectCount;
            totalAmount.collectFee += Number(t.collectFee);

            if ((activeTab === 0) && (t.postCount > maxRemoData[0])) {
                maxRemoData[0] = t.postCount
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
                rem[6][Number(timePeriod.toString().slice(8, 10))] = [t.postCount || 0, t.commentCount, t.mirrorCount, t.collectCount, Number(t.collectFee), timePeriod];
            } else {
                rem[week - 1][Number(timePeriod.toString().slice(8, 10))] = [t.postCount || 0, t.commentCount, t.mirrorCount, t.collectCount, Number(t.collectFee), timePeriod];
            }
        })
        setRemodyBaseData(rem)
        setTotalAmount(totalAmount)
        setLoading(false);
    }

    const getCurrentWeek = () => {
        let weekOfDay = parseInt(moment().format('E'));//??????????????????????????????
        let last_monday = moment().startOf('day').subtract(weekOfDay + 7 * weekCount - 1, 'days').toDate();//????????????
        let last_sunday = moment().startOf('day').subtract(weekOfDay + 7 * (weekCount - 1), 'days').toDate();//????????????
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

    const onChange = (e: any, i: number) => {
        if (i === 4) {
            setChecked([false, false, false, false, e.target.checked]);
        }
        if (i !== 4) {
            setChecked((prev: any) => {
                prev[i] = e.target.checked;
                if (e.target.checked) {
                    prev[4] = false;
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
        if (weekCount >= 1) {
            weekCount--;
            getCurrentWeek();
        }
    }

    const getLastWeek = () => {
        if (week[0] !== '01/30') {
            weekCount++;
            getCurrentWeek();
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
            if (t) {
                maxMount += maxRemoData[i]
                totalMount += e[i]
            }
        })
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
        if (!e || !checked.includes(true)) return ''
        let strDate = e[5].toString();
        let noStrDate = '';
        if (e === 'noData') {
            let current_hs = Number(moment(`2023/${week[0]}`).format("x"))
            noStrDate = moment(current_hs + i * 24 * 60 * 60 * 1000).format(`YYYY/MM/DD`)
        }
        let h = idx < 12 ? `${idx}AM` : `${idx}PM`
        return (
            <div>
                {
                    e !== 'noData' &&
                    <p className="text-[18px] font-[600]">
                        {e[5] ? `${strDate.slice(0, 4)}/${strDate.slice(4, 6)}/${strDate.slice(6, 8)} ${h}` : ''}
                    </p>
                }
                {
                    e === 'noData' &&
                    <p className="text-[18px] font-[600]">
                        {`${noStrDate} ${h}`}
                    </p>
                }
                {/* <p>Count???{totalMount.toFixed(2)}</p> */}
                <div>
                    {
                        e === 'noData' && checked[0] && (
                            <div>Posts {activeTab == 1 ? '(by)' : ''}???0</div>
                        )
                    }
                    {
                        e === 'noData' && checked[1] && (
                            <div>Comments {activeTab == 1 ? '(by)' : ''}???0</div>
                        )
                    }
                    {
                        e === 'noData' && checked[2] && (
                            <div>Mirrors {activeTab == 1 ? '(by)' : ''}???0</div>
                        )
                    }
                    {
                        e === 'noData' && checked[3] && (
                            <div>Collections {activeTab == 1 ? '(by)' : ''}???0</div>
                        )
                    }
                    {
                        e === 'noData' && checked[4] && (
                            <div>Volume???0.00</div>
                        )
                    }
                    {
                        checked[0] && activeTab === 0 && e !== 'noData' &&
                        <div>Posts???{e[0]}</div>
                    }
                    {
                        checked[1] && e !== 'noData' &&
                        <div>Comments {activeTab == 1 ? '(by)' : ''}???{e[1]}</div>
                    }
                    {
                        checked[2] && e !== 'noData' &&
                        <div>Mirrors {activeTab == 1 ? '(by)' : ''}???{e[2]}</div>
                    }
                    {
                        checked[3] && e !== 'noData' &&
                        <div>Collections {activeTab == 1 ? '(by)' : ''}???{e[3]}</div>
                    }
                    {
                        checked[4] && e !== 'noData' &&
                        <div>Volume???{e[4].toFixed(2)}</div>
                    }
                </div>
            </div>
        )
    };

    return (
        <div className="text-[#fff] mb-10">
            <div className="flex">
                {
                    tabs.map((t: any, i: number) => (
                        <div onClick={() => setActiveTab(i)} key={i} className={`px-[30px] pb-[6px] cursor-pointer ${activeTab === i ? 'pt-[14px] bg-[#1A1A1A] rounded-tl-[4px] rounded-tr-[4px]' : 'pt-[6px] bg-[rgb(63,63,63)] h-[fit-content] mt-[10px] text-[rgba(255,255,255,0.4)]'}`}>{t}</div>
                    ))
                }
            </div>
            <div className="flex bg-[#1A1A1A] p-5 w-full">
                <div className="w-[780px] flex-shrink-0 mt-[44px]">
                    {
                        loading ?
                            <div className="h-[234px] flex items-center"><LoadingOutlined className="text-2xl block mx-auto" /></div>
                            : <>
                                {/* <div className="text-[18px] mb-[30px] mt-[10px]">Weekly Heat Map</div> */}
                                <div className="mt">
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
                                <div className="text-[12px] w-[calc(100%-40px)] ml-[40px] overflow-hidden">
                                    <div className="w-[180px] float-left">0AM</div>
                                    <div className="w-[175px] float-left">6AM</div>
                                    <div className="w-[180px] float-left">12PM</div>
                                    <div className="float-left">18PM</div>
                                    <div className="float-right mr-0">24PM</div>
                                </div>
                            </>
                    }

                </div>
                <div className="ml-5 mr-5 mt-[10px]">
                    <div className="text-[12px] mt-[13px] ml-[-4px]">High</div>
                    <div className="h-[43px] w-[16px] bg-[#D13005] mt-[4px]">

                    </div>
                    <div className="h-[43px] w-[16px] bg-[#A32A0A]">

                    </div>
                    <div className="h-[43px] w-[16px] bg-[#75240F]">

                    </div>
                    <div className="h-[43px] w-[16px] bg-[#471F14]">

                    </div>
                    <div className="h-[43px] w-[16px] bg-[#311C17]">

                    </div>
                    <div className="text-[12px] mt-[4px] ml-[-4px]">Low</div>
                </div>
                <div className="w-[calc(100%-800px)] mt-[10px]">
                    <div className="flex min-w-[280px] max-w-100">
                        <div className={`h-10 w-10 bg-[rgb(41,41,41)] flex items-center justify-center text-[24px] ${week[0] === '01/30' ? 'cursor-[not-allowed]' : 'cursor-pointer'}`} onClick={getLastWeek}><LeftOutlined /></div>
                        <div className="w-[calc(100%-100px)] mx-5 h-10 bg-[rgb(41,41,41)] flex items-center justify-center">
                            {
                                week.length !== 0 &&
                                <>
                                    {
                                        weekCount === 0 &&
                                        <span className="mr-[10px] text-[14px]">This Week</span>
                                    }
                                    {
                                        weekCount === 1 &&
                                        <span className="mr-[10px] text-[14px]">Last Week</span>
                                    }
                                    <span className="text-[14px]">{week[0]}-{week[1]}</span>
                                </>
                            }
                        </div>
                        <div className={`h-10 w-10 bg-[rgb(41,41,41)] flex items-center justify-center text-[24px] ${weekCount == 0 ? 'cursor-[not-allowed]' : 'cursor-pointer'}`} onClick={getNextWeek}><RightOutlined /></div>
                    </div>
                    <div className="px-6 py-4 bg-[rgb(41,41,41)] mt-[20px] rounded-[10px] h-[190px]">
                        {
                            activeTab == 0 &&
                            <div className="flex mb-2">
                                <div>
                                    <Checkbox onChange={(e: any) => onChange(e, 0)} checked={checked[0]}>
                                        <span className="text-[#fff] text-[16px]">Posts</span>
                                    </Checkbox>
                                </div>
                                <div className="ml-[auto]">{(totalAmount && (totalAmount.postCount || totalAmount.postCount === 0)) ? new BN(totalAmount.postCount).toFormat() : '-'}</div>
                            </div>
                        }
                        <div className="flex mb-2">
                            <div>
                                <Checkbox onChange={(e: any) => onChange(e, 1)} checked={checked[1]}>
                                    <span className="text-[#fff] text-[16px]">Comments {activeTab == 1 ? '(by)' : ''}</span>
                                </Checkbox>
                            </div>
                            <div className="ml-[auto]">{(totalAmount && (totalAmount.commentCount || totalAmount.commentCount === 0)) ? new BN(totalAmount.commentCount).toFormat() : '-'}</div>
                        </div>
                        <div className="flex mb-2">
                            <div>
                                <Checkbox onChange={(e: any) => onChange(e, 2)} checked={checked[2]}>
                                    <span className="text-[#fff] text-[16px]">Mirrors {activeTab == 1 ? '(by)' : ''}</span>
                                </Checkbox>
                            </div>
                            <div className="ml-[auto]">{(totalAmount && (totalAmount.mirrorCount || totalAmount.mirrorCount === 0)) ? new BN(totalAmount.mirrorCount).toFormat() : '-'}</div>
                        </div>
                        <div className="flex mb-2">
                            <div>
                                <Checkbox onChange={(e: any) => onChange(e, 3)} checked={checked[3]}>
                                    <span className="text-[#fff] text-[16px]">Collections {activeTab == 1 ? '(by)' : ''}</span>
                                </Checkbox>
                            </div>
                            <div className="ml-[auto]">{(totalAmount && (totalAmount.collectCount || totalAmount.collectCount === 0)) ? new BN(totalAmount.collectCount).toFormat() : '-'}</div>
                        </div>
                        <div className="flex">
                            <div>
                                <Checkbox onChange={(e: any) => onChange(e, 4)} checked={checked[4]}>
                                    <span className="text-[#fff] text-[16px]">Volume</span>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default rmodynamics
