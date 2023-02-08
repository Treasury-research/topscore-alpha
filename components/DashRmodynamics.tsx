import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined, LoadingOutlined } from '@ant-design/icons';
import { Checkbox, Popover } from 'antd';
import api from "../api";
import moment from 'moment'

const dys = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

let weekCount = 0;

let maxRemoData: any = [0, 0, 0, 0, 0]

const tabs = ['2023', '2022'];

const rmodynamics = () => {

    const [remodyBaseData, setRemodyBaseData] = useState<any>([]);

    const [checked, setChecked] = useState([false, false, false, false, false]);

    const [activeYear, setActiveYear] = useState('2022')

    const [week, setWeek] = useState<any>([]);

    const [activeTab, setActiveTab] = useState<any>(0);

    const [currentDate, setCurrentDate] = useState<any>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const [activeItems, setActiveItems] = useState<any>([]);

    useEffect(() => {
        getCurrentWeek()
    }, [])

    useEffect(() => {
        getGlobalHeatmapData();
    }, [activeTab])

    const getYearWeek = (a: any, b: any, c: any) => {
        /*  
        date1是当前日期  
        date2是当年第一天  
        d是当前日期是今年第多少天  
        用d + 当前年的第一天的周差距的和在除以7就是本年第几周  
        */
        var date1 = new Date(a, parseInt(b) - 1, c),
            date2 = new Date(a, 0, 1),
            d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
        return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
    };

    const getGlobalHeatmapData = async () => {
        setLoading(true);
        const testProfileId = 1
        const res = await api.get(`/publication/${testProfileId}`, {
            params: {
                profileId: testProfileId,
                year: activeTab === 0 ? '2023' : '2022',
                type: "Post,Mirror,Comment",
            }
        })
        console.log(getYearWeek('2023', '01', '01'))

        let rem: any = [[], [], [], [], [], [], []]
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 52; j++) {
                rem[i].push(null)
            }
        }

        maxRemoData = 0

        res.data.forEach((t: any) => {
            let week = moment(t.date).weekday()
            let month = Number(t.date.slice(6, 8))
            // console.log(t.date, t.date.slice(5, 7))
            console.log('date', getYearWeek(t.date.split('-')[0], t.date.split('-')[1], t.date.split('-')[2]))
            const numMonth = getYearWeek(t.date.split('-')[0], t.date.split('-')[1], t.date.split('-')[2]) // 本年第几周
            if (numMonth > 52 || numMonth < 1) return false;
            if (t.count > maxRemoData) {
                maxRemoData = t.count
            }
            if (week == 0) {
                rem[6][numMonth - 1] = [t.count, t.date];
            } else {
                rem[week - 1][numMonth - 1] = [t.count, t.date];
            }
        })
        console.log(rem)
        setRemodyBaseData(rem)
        setLoading(false);
    }

    const onChange = (e: any, i: number) => {
        setChecked((prev: any) => {
            prev[i] = e.target.checked;
            return [...prev];
        });
    };

    const putActiveItems = (e: any) => {
        // let rs = activeItems.filter((t:any,i:number) => {
        //     return t[0] === e[0] && t[1] === e[1]
        // })
        // if(rs && rs.length ===0){

        // }
        setActiveItems((prev: any) => {
            return [...prev, e];
        });
    }

    const getCurrentWeek = () => {
        let weekOfDay = parseInt(moment().format('E'));//计算今天是这周第几天
        let last_monday = moment().startOf('day').subtract(weekOfDay + 7 * weekCount - 1, 'days').toDate();//周一日期
        let last_sunday = moment().startOf('day').subtract(weekOfDay + 7 * (weekCount - 1), 'days').toDate();//周日日期
        console.log([moment(last_monday).format('MM/DD'), moment(last_sunday).format('MM/DD')])
        setWeek([moment(last_monday).format('MM/DD'), moment(last_sunday).format('MM/DD')])
        setActiveItems([]);
        // getStaticData();
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
        console.log(e)
        console.log('max', maxRemoData)
        if (!e || (!e[0] && e[0] !== 0)) return 'bg-[#4F4F4F]'
        let lv = maxRemoData / 5;
        if (e[0] < lv) {
            return 'bg-[#4F2D2E]'
        } else if (lv <= e[0] && e[0] < lv * 2) {
            return 'bg-[#76312B]'
        } else if (lv * 2 <= e[0] && e[0] < lv * 3) {
            return 'bg-[#AF342F]'
        } else if (lv * 3 <= e[0] && e[0] < lv * 4) {
            return 'bg-[#CA3B32]'
        } else if (lv * 3 <= e[0] && e[0] < lv * 4) {
            return 'bg-[#CA3B32]'
        } else if (lv * 4 <= e[0]) {
            return 'bg-[#F33C17]'
        }
    }

    const getHeatmapData = async () => {
        // profile id 稍晚点会放到 store 里
        const testProfileId = 1
        const res = await api.get(`/publication/${testProfileId}`, {
            params: {
                profileId: testProfileId,
                year: activeYear,
                type: "Post,Mirror,Comment",
            }
        })
        console.log('heatmap data', res)
    }

    // useEffect(() => {
    //     getHeatmapData();
    // }, [])

    const getContent = (e: any) => {
        if (!e || (!e[0] && e[0] !== 0)) return ''
        return (
            <div>
                <p className="text-[18px] font-[600]">{e[1] || '--'}</p>
                <p>Mount：{e[0]}</p>
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
                {/* <div className="px-[30px] pb-[6px] pt-[14px] bg-[#1A1A1A] rounded-tl-[4px] rounded-tr-[4px] cursor-pointer">2022</div>
                <div className="px-[30px] pb-[6px] pt-[6px] bg-[rgb(63,63,63)] h-[fit-content] mt-[10px] cursor-pointer">2023</div> */}
            </div>
            <div className="flex bg-[#1A1A1A] p-5 w-full">
                {
                    loading ?
                        <LoadingOutlined className="text-2xl block mx-auto my-[80px]" />
                        : <>
                            <div className="w-[860px] overflow-hidden mr-4">
                                <div className="text-[18px] mb-[20px]">Overview</div>
                                <div className="mb-4 mr-2 flex ml-[auto] w-[fit-content] items-center">
                                    <div className="text-[12px] ml-[-4px] mr-2">High</div>
                                    <div className="h-[16px] w-[45px] bg-[#F33C17]">

                                    </div>
                                    <div className="h-[16px] w-[45px] bg-[#CA3B32]">

                                    </div>
                                    <div className="h-[16px] w-[45px] bg-[#AF342F]">

                                    </div>
                                    <div className="h-[16px] w-[45px] bg-[#76312B]">

                                    </div>
                                    <div className="h-[16px] w-[45px] bg-[#4F2D2E]">

                                    </div>
                                    <div className="text-[12px] ml-[-4px] ml-2">Low</div>
                                </div>
                                <div>
                                    {
                                        remodyBaseData.map((t: any, i: number) => (
                                            <div className="flex mb-[2px]" key={i}>
                                                {
                                                    t.map((item: any, index: number) => (
                                                        (!item || (!item[0] && item[0] !== 0)) ?
                                                            (
                                                                <div key={index} onClick={() => putActiveItems([i, index])} className={`${getBorderStyle([i, index])} box-border h-[14px] w-[14px] mr-[2px] cursor-pointer ${getItemStyle(item)}`}></div>
                                                            ) : (<Popover placement="bottom" content={() => getContent(item)}>
                                                                <div key={index} onClick={() => putActiveItems([i, index])} className={`${getBorderStyle([i, index])} box-border h-[14px] w-[14px] mr-[2px] cursor-pointer ${getItemStyle(item)}`}></div>
                                                            </Popover>)
                                                        // <div key={index} onClick={() => putActiveItems([i, index])} className={`${getBorderStyle([i, index])} box-border h-[14px] w-[14px] mr-[2px] cursor-pointer ${getItemStyle(item)}`}></div>
                                                    ))
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="flex">
                                    {
                                        month.map((t: any, i: number) => (
                                            <div key={i} className="flex-1 text-[12px] flex justify-center">{t}</div>
                                        ))
                                    }
                                </div>
                                {/* <div className="text-[12px] w-[calc(100%-40px)] ml-[40px] mt-[10px]">
                        <div className="w-[185px] float-left">0AM</div>
                        <div className="w-[180px] float-left">6AM</div>
                        <div className="w-[190px] float-left">12PM</div>
                        <div className="float-left">18PM</div>
                        <div className="float-right">24PM</div>
                    </div> */}
                            </div>
                            <div className="w-[calc(100%-860px)]">
                                {/* <div className="flex">
                        <div className="h-10 w-10 bg-[rgb(41,41,41)] flex items-center justify-center text-[24px] cursor-pointer" onClick={getLastWeek}><LeftOutlined /></div>
                        <div className="w-[200px] mx-5 h-10 bg-[rgb(41,41,41)] flex items-center justify-center">
                            {
                                week.length !== 0 &&
                                <span>{week[0]}-{week[1]}</span>
                            }
                        </div>
                        <div className="h-10 w-10 bg-[rgb(41,41,41)] flex items-center justify-center text-[24px] cursor-pointer" onClick={getNextWeek}><RightOutlined /></div>
                    </div> */}
                                <div className="px-6 py-2 bg-[rgb(41,41,41)] mt-11">
                                    <div className="flex mb-2">
                                        <div>
                                            <Checkbox onChange={(e: any) => onChange(e, 0)} checked={checked[0]}>
                                                <span className="text-[#fff] text-[16px]">Publication</span>
                                            </Checkbox>
                                        </div>
                                        <div className="ml-[auto]">126</div>
                                    </div>
                                    <div className="flex mb-2">
                                        <div>
                                            <Checkbox onChange={(e: any) => onChange(e, 1)} checked={checked[1]}>
                                                <span className="text-[#fff] text-[16px]">Post</span>
                                            </Checkbox>
                                        </div>
                                        <div className="ml-[auto]">126</div>
                                    </div>
                                    <div className="flex mb-2">
                                        <div>
                                            <Checkbox onChange={(e: any) => onChange(e, 2)} checked={checked[2]}>
                                                <span className="text-[#fff] text-[16px]">Comment</span>
                                            </Checkbox>
                                        </div>
                                        <div className="ml-[auto]">126</div>
                                    </div>
                                    <div className="flex mb-2">
                                        <div>
                                            <Checkbox onChange={(e: any) => onChange(e, 3)} checked={checked[3]}>
                                                <span className="text-[#fff] text-[16px]">Mirror</span>
                                            </Checkbox>
                                        </div>
                                        <div className="ml-[auto]">126</div>
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
