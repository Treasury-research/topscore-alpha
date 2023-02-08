import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined, LoadingOutlined } from '@ant-design/icons';
import api from "../api";
import { Checkbox, Popover } from 'antd';
import moment from 'moment'
import BN from "bignumber.js";

const dys = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

let maxRemoData: any = [0, 0, 0, 0, 0]

let weekCount = 0;

const tabs = ['Global', 'Personal'];

const rmodynamics = () => {

    const [remodyBaseData, setRemodyBaseData] = useState<any>([]);

    const [checked, setChecked] = useState([false, false, false, false, false]);

    const [week, setWeek] = useState<any>([]);

    const [activeItems, setActiveItems] = useState<any>([]);

    const [activeTab, setActiveTab] = useState<any>(0);

    const [currentDate, setCurrentDate] = useState<any>([]);

    const [totalAmount, setTotalAmount] = useState<any>({});

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getCurrentWeek()
    }, [])

    useEffect(() => {
        if (currentDate.length !== 0) {
            getGlobalHeatmapData();
        }
    }, [currentDate, activeTab])

    useEffect(() => {
        setChecked([false, false, false, false, false])
    }, [activeTab])

    useEffect(() => {
        if (checked.length !== 0) {
            let checkedIndex = [];
            checked.forEach((t: any, i: number) => {
                if (t) checkedIndex.push(i)
            })
        }
    }, [checked])

    const getGlobalHeatmapData = async () => {
        setLoading(true);
        let res: any;
        if (activeTab === 0) {
            res = await api.get(`/thermal-map/global`, {
                params: {
                    from: `${currentDate[0]}00`,
                    to: `${currentDate[1]}23`,
                }
            })
        } else {
            let testProfileId = 1;
            res = await api.get(`/thermal-map/personal/${testProfileId}`, {
                params: {
                    from: `${currentDate[0]}00`,
                    to: `${currentDate[1]}23`,
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
        let rem: any = [[], [], [], [], [], [], []]
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 24; j++) {
                rem[i].push(null)
            }
        }
        maxRemoData = [0, 0, 0, 0, 0]
        res.data.forEach((t: any) => {
            let week = moment(t.timePeriod.toString().slice(0, 8)).weekday()
            if(activeTab === 0){
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
                rem[6][Number(t.timePeriod.toString().slice(8, 10))] = [t.postCount || 0, t.commentCount, t.mirrorCount, t.collectCount, Number(t.collectFee), t.timePeriod];
            } else {
                rem[week - 1][Number(t.timePeriod.toString().slice(8, 10))] = [t.postCount || 0, t.commentCount, t.mirrorCount, t.collectCount, Number(t.collectFee), t.timePeriod];
            }
        })
        console.log(rem)
        console.log(maxRemoData)
        setRemodyBaseData(rem)
        setTotalAmount(totalAmount)
        setLoading(false);
    }

    const getCurrentWeek = () => {
        let weekOfDay = parseInt(moment().format('E'));//计算今天是这周第几天
        let last_monday = moment().startOf('day').subtract(weekOfDay + 7 * weekCount - 1, 'days').toDate();//周一日期
        let last_sunday = moment().startOf('day').subtract(weekOfDay + 7 * (weekCount - 1), 'days').toDate();//周日日期
        // console.log([moment(last_monday).format('MM/DD'), moment(last_sunday).format('MM/DD')])
        setWeek([moment(last_monday).format('MM/DD'), moment(last_sunday).format('MM/DD')])
        setCurrentDate([`20${moment(last_monday).format('YYMMDD')}`, `20${moment(last_sunday).format('YYMMDD')}`])
        console.log([`20${moment(last_monday).format('YYMMDD')}`, `20${moment(last_sunday).format('YYMMDD')}`])
        setActiveItems([]);
    }

    const onChange = (e: any, i: number) => {
        // console.log('checked = ', e.target.checked);
        // setChecked(e.target.checked);
        setChecked((prev: any) => {
            prev[i] = e.target.checked;
            return [...prev];
        });
    };

    const putActiveItems = (e: any) => {
        setActiveItems((prev: any) => {
            return [...prev, e];
        });
    }

    const getNextWeek = () => {
        weekCount--;
        getCurrentWeek();
    }

    const getLastWeek = () => {
        weekCount++;
        getCurrentWeek();
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
        
        if (!e || !checked.includes(true)) return 'bg-[#4F4F4F]'
        let maxMount = 0;
        let totalMount = 0;
        checked.forEach((t: any, i: number) => {
            if (t) {
                maxMount += maxRemoData[i]
                totalMount += e[i]
            }
        })
        debugger
        console.log(maxMount)
        let lv = maxMount / 5;
        if (totalMount < lv) {
            return 'bg-[#4F2D2E]'
        }else if (lv <= totalMount && totalMount < lv * 2) {
            return 'bg-[#76312B]'
        }else if (lv * 2 <= totalMount && totalMount < lv * 3) {
            return 'bg-[#AF342F]'
        }else if (lv * 3 <= totalMount && totalMount < lv * 4) {
            return 'bg-[#CA3B32]'
        }else if (lv * 3 <= totalMount && totalMount < lv * 4) {
            return 'bg-[#CA3B32]'
        }else if (lv * 4 <= totalMount) {
            return 'bg-[#F33C17]'
        }
        
        
        
        
    }

    const getContent = (e: any) => {
        if (!e || !checked.includes(true)) return ''
        let totalMount = 0;
        let strDate = e[5].toString();
        checked.forEach((t: any, i: number) => {
            if (t) {
                totalMount += e[i]
            }
        })
        return (
            <div>
                <p className="text-[18px] font-[600]">{e[5] ? strDate.slice(0, 4) + '/' + strDate.slice(4, 6) + '/' + strDate.slice(6, 8) : ''}</p>
                <p>Amount：{totalMount}</p>
            </div>
        )
    };

    return (
        <div className="text-[#fff]">
            <div className="flex">
                {
                    tabs.map((t: any, i: number) => (
                        <div onClick={() => setActiveTab(i)} key={i} className={`px-[30px] pb-[6px] cursor-pointer ${activeTab === i ? 'pt-[14px] bg-[#1A1A1A] rounded-tl-[4px] rounded-tr-[4px]' : 'pt-[6px] bg-[rgb(63,63,63)] h-[fit-content] mt-[10px]'}`}>{t}</div>
                    ))
                }
                {/* <div className="px-[30px] pb-[6px] pt-[14px] bg-[#1A1A1A] rounded-tl-[4px] rounded-tr-[4px] cursor-pointer">Global</div>
                <div className="px-[30px] pb-[6px] pt-[6px] bg-[rgb(63,63,63)] h-[fit-content] mt-[10px] cursor-pointer">Personal</div> */}
            </div>

            <div className="flex bg-[#1A1A1A] p-5 w-full">
                {
                    loading ?
                        <LoadingOutlined className="text-2xl block mx-auto my-[130px]" />
                        : <>
                            <div className="w-[780px]">
                                <div className="text-[18px] mb-[20px]">Optima Post Time</div>
                                <div>
                                    {
                                        remodyBaseData.map((t: any, i: number) => (
                                            <div className="flex mb-[1px]" key={i}>
                                                <div className="text-[12px] w-[40px] h-[30px] flex items-center">{dys[i]}</div>
                                                {
                                                    t.map((item: any, index: number) => (

                                                        (!item || !checked.includes(true)) ?
                                                            (
                                                                <div key={index} onClick={() => putActiveItems([i, index])} className={`${getBorderStyle([i, index])} box-border h-[28px] w-[28px] mr-[2px] cursor-pointer ${getItemStyle(item)}`}></div>
                                                            ) : (<Popover placement="bottom" content={() => getContent(item)}>
                                                                <div key={index} onClick={() => putActiveItems([i, index])} className={`${getBorderStyle([i, index])} box-border h-[28px] w-[28px] mr-[2px] cursor-pointer ${getItemStyle(item)}`}></div>
                                                            </Popover>)

                                                    ))
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="text-[12px] w-[calc(100%-40px)] ml-[40px] mt-[10px]">
                                    <div className="w-[180px] float-left">0AM</div>
                                    <div className="w-[175px] float-left">6AM</div>
                                    <div className="w-[180px] float-left">12PM</div>
                                    <div className="float-left">18PM</div>
                                    <div className="float-right mr-0">24PM</div>
                                </div>
                            </div>
                            <div className="ml-5 mr-5">
                                <div className="text-[12px] mt-[20px] ml-[-4px]">High</div>
                                <div className="h-[45px] w-[16px] bg-[#F33C17] mt-[4px]">

                                </div>
                                <div className="h-[45px] w-[16px] bg-[#CA3B32]">

                                </div>
                                <div className="h-[45px] w-[16px] bg-[#AF342F]">

                                </div>
                                <div className="h-[45px] w-[16px] bg-[#76312B]">

                                </div>
                                <div className="h-[45px] w-[16px] bg-[#4F2D2E]">

                                </div>
                                <div className="text-[12px] mt-[4px] ml-[-4px]">Low</div>
                            </div>
                            <div className="w-[calc(100%-800px)]">
                                <div className="flex min-w-50 max-w-100">
                                    <div className="h-10 w-10 bg-[rgb(41,41,41)] flex items-center justify-center text-[24px] cursor-pointer" onClick={getLastWeek}><LeftOutlined /></div>
                                    <div className="w-[calc(100%-100px)] mx-5 h-10 bg-[rgb(41,41,41)] flex items-center justify-center">
                                        {
                                            week.length !== 0 &&
                                            <span>{week[0]}-{week[1]}</span>
                                        }
                                    </div>
                                    <div className="h-10 w-10 bg-[rgb(41,41,41)] flex items-center justify-center text-[24px] cursor-pointer" onClick={getNextWeek}><RightOutlined /></div>
                                </div>
                                <div className="px-6 py-4 bg-[rgb(41,41,41)] mt-10">
                                    {
                                        activeTab == 0 &&
                                        <div className="flex mb-2">
                                            <div>
                                                <Checkbox onChange={(e: any) => onChange(e, 0)} checked={checked[0]}>
                                                    <span className="text-[#fff] text-[16px]">Post</span>
                                                </Checkbox>
                                            </div>
                                            <div className="ml-[auto]">{new BN(totalAmount.postCount).toFormat()}</div>
                                        </div>
                                    }
                                    <div className="flex mb-2">
                                        <div>
                                            <Checkbox onChange={(e: any) => onChange(e, 1)} checked={checked[1]}>
                                                <span className="text-[#fff] text-[16px]">Comment</span>
                                            </Checkbox>
                                        </div>
                                        <div className="ml-[auto]">{new BN(totalAmount.commentCount).toFormat()}</div>
                                    </div>
                                    <div className="flex mb-2">
                                        <div>
                                            <Checkbox onChange={(e: any) => onChange(e, 2)} checked={checked[2]}>
                                                <span className="text-[#fff] text-[16px]">Mirror</span>
                                            </Checkbox>
                                        </div>
                                        <div className="ml-[auto]">{new BN(totalAmount.mirrorCount).toFormat()}</div>
                                    </div>
                                    <div className="flex mb-2">
                                        <div>
                                            <Checkbox onChange={(e: any) => onChange(e, 3)} checked={checked[3]}>
                                                <span className="text-[#fff] text-[16px]">Collect</span>
                                            </Checkbox>
                                        </div>
                                        <div className="ml-[auto]">{new BN(totalAmount.collectCount).toFormat()}</div>
                                    </div>
                                    <div className="flex">
                                        <div>
                                            <Checkbox onChange={(e: any) => onChange(e, 4)} checked={checked[4]}>
                                                <span className="text-[#fff] text-[16px]">Volume</span>
                                            </Checkbox>
                                        </div>
                                        <div className="ml-[auto]">{Number(totalAmount.collectFee).toFixed()}</div>
                                    </div>
                                </div>
                            </div>
                        </>
                }

            </div>
        </div>
    )
}

export default rmodynamics
