import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined, LoadingOutlined } from '@ant-design/icons';
import { Checkbox, Popover } from 'antd';
import api from "../api";
import moment from 'moment';
import { currentProfileState } from "../store/state";
import { useRecoilState } from "recoil";

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

let weekCount = 0;

let maxRemoData: any = [0, 0, 0, 0, 0]

const tabs = ['2023', '2022'];

const testProfileId = '5'

const rmodynamics = () => {

    const [remodyBaseData, setRemodyBaseData] = useState<any>([]);

    const [checkedPub, setcheckedPub] = useState(true);

    const [checked, setChecked] = useState([true, true, true]);

    const [week, setWeek] = useState<any>([]);

    const [activeTab, setActiveTab] = useState<any>(0);

    const [loading, setLoading] = useState<boolean>(false);

    const [activeItems, setActiveItems] = useState<any>([]);

    const [postTotal, setPostTotal] = useState(0);

    const [commentTotal, setCommentTotal] = useState(0);

    const [mirrorTotal, setMirrorTotal] = useState(0);

    const [currentProfile] = useRecoilState<any>(currentProfileState);

    useEffect(() => {
        getCurrentWeek()
    }, [])

    useEffect(() => {
        if (currentProfile && currentProfile.profileId) {
            getGlobalHeatmapData();
            getTotalPostData()
            getTotalCommentData()
            getTotalMirrorData()
        }
    }, [activeTab, currentProfile])

    useEffect(() => {
        if (checked[0] && checked[1] && checked[2]) {
            setcheckedPub(true)
        } else if (!checked[0] && !checked[1] && !checked[2]) {
            setcheckedPub(false)
        }
        if (currentProfile && currentProfile.profileId) {
            getGlobalHeatmapData();
        }
    }, [checked,currentProfile])

    useEffect(() => {
        if (checkedPub) {
            setChecked([true, true, true])
        } else {
            setChecked([false, false, false])
        }
    }, [checkedPub])

    const getYearWeek = (a: any, b: any, c: any) => {
        var date1 = new Date(a, parseInt(b) - 1, c),
            date2 = new Date(a, 0, 1),
            d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
        return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
    };

    const getTotalPostData = async () => {
        let total = 0;
        const res = await api.get(`/publication/${currentProfile.profileId}`, {
            params: {
                profileId: currentProfile.profileId,
                year: activeTab === 0 ? '2023' : '2022',
                type: 'Post',
            }
        })
        res.data.forEach((t: any) => {
            total += t.count
        })
        setPostTotal(total)
    }

    const getTotalCommentData = async () => {
        let total = 0;
        const res = await api.get(`/publication/${currentProfile.profileId}`, {
            params: {
                profileId: currentProfile.profileId,
                year: activeTab === 0 ? '2023' : '2022',
                type: 'Comment',
            }
        })
        res.data.forEach((t: any) => {
            total += t.count
        })
        setCommentTotal(total)
    }

    const getTotalMirrorData = async () => {
        let total = 0;
        const res = await api.get(`/publication/${currentProfile.profileId}`, {
            params: {
                profileId: currentProfile.profileId,
                year: activeTab === 0 ? '2023' : '2022',
                type: 'Mirror',
            }
        })
        res.data.forEach((t: any) => {
            total += t.count
        })
        setMirrorTotal(total)
    }

    const getGlobalHeatmapData = async () => {
        setLoading(true);
        let types = ['Post', 'Mirror', 'Comment'];
        let str = "";
        checked.forEach((t: any, i: number) => {
            if (t) {
                if (str) {
                    str += `,${types[i]}`
                } else {
                    str += types[i]
                }
            }
        })
        const res = await api.get(`/publication/${currentProfile.profileId}`, {
            params: {
                profileId: currentProfile.profileId,
                year: activeTab === 0 ? '2023' : '2022',
                type: str,
            }
        })

        let rem: any = [[], [], [], [], [], [], []]
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 52; j++) {
                rem[i].push(null)
            }
        }
        if (activeTab === 1) {
            rem[0].push(null)
            rem[1].push(null)
            rem[2].push(null)
            rem[3].push(null)
            rem[4].push(null)
            rem[5].push(null)
            rem[0][0] = 'hidden'
            rem[1][0] = 'hidden'
            rem[2][0] = 'hidden'
            rem[3][0] = 'hidden'
            rem[4][0] = 'hidden'
        }
        if (activeTab === 0) {
            rem[0].push(null)
            rem[1].push(null)
            rem[2].push(null)
            rem[3].push(null)
            rem[4].push(null)
            rem[5].push(null)
            rem[6].push(null)
            rem[0][0] = 'hidden'
            rem[1][0] = 'hidden'
            rem[2][0] = 'hidden'
            rem[3][0] = 'hidden'
            rem[4][0] = 'hidden'
            rem[5][0] = 'hidden'
        }
        maxRemoData = 0

        res.data.forEach((t: any) => {
            let week = moment(t.date).weekday()
            let month = Number(t.date.slice(6, 8))
            console.log('date', getYearWeek(t.date.split('-')[0], t.date.split('-')[1], t.date.split('-')[2]))
            const numMonth = getYearWeek(t.date.split('-')[0], t.date.split('-')[1], t.date.split('-')[2]) // 本年第几周
            if (t.count > maxRemoData) {
                maxRemoData = t.count
            }
            if (activeTab === 0) {
                if (week == 0) {
                    rem[6][numMonth] = [t.count, t.date];
                } else {
                    rem[week - 1][numMonth] = [t.count, t.date];
                }
            } else {
                if (week == 0) {
                    rem[6][numMonth - 1] = [t.count, t.date];
                } else {
                    rem[week - 1][numMonth - 1] = [t.count, t.date];
                }
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

    const getCurrentWeek = () => {
        let weekOfDay = parseInt(moment().format('E'));//计算今天是这周第几天
        let last_monday = moment().startOf('day').subtract(weekOfDay + 7 * weekCount - 1, 'days').toDate();//周一日期
        let last_sunday = moment().startOf('day').subtract(weekOfDay + 7 * (weekCount - 1), 'days').toDate();//周日日期
        console.log([moment(last_monday).format('MM/DD'), moment(last_sunday).format('MM/DD')])
        setWeek([moment(last_monday).format('MM/DD'), moment(last_sunday).format('MM/DD')])
        setActiveItems([]);
        let rem: any = [[], [], [], [], [], [], []]
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 52; j++) {
                rem[i].push(null)
            }
        }
        setRemodyBaseData(rem)
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

    const getContent = (e: any) => {
        if (!e || (!e[0] && e[0] !== 0)) return ''
        return (
            <div>
                <p className="text-[18px] font-[600]">{e[1] || '--'}</p>
                <p>Count：{e[0]}</p>
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
                                                                <div key={index} className={`${getBorderStyle([i, index])} box-border h-[14px] w-[14px] mr-[2px] cursor-pointer ${getItemStyle(item)}`}></div>
                                                            ) : (<Popover placement="bottom" content={() => getContent(item)}>
                                                                <div key={index} className={`${getBorderStyle([i, index])} box-border h-[14px] w-[14px] mr-[2px] cursor-pointer ${getItemStyle(item)}`}></div>
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
                            </div>
                            <div className="w-[calc(100%-860px)]">
                                <div className="px-6 py-2 bg-[rgb(41,41,41)] mt-11">
                                    <div className="flex mb-2">
                                        <div>
                                            <Checkbox onChange={(e: any) => setcheckedPub(e.target.checked)} checked={checkedPub}>
                                                <span className="text-[#fff] text-[16px]">Publication</span>
                                            </Checkbox>
                                        </div>
                                        <div className="ml-[auto]">{postTotal + commentTotal + mirrorTotal}</div>
                                    </div>
                                    <div className="flex mb-2 ml-[20px]">
                                        <div>
                                            <Checkbox onChange={(e: any) => onChange(e, 0)} checked={checked[0]}>
                                                <span className="text-[#fff] text-[16px]">Post</span>
                                            </Checkbox>
                                        </div>
                                        <div className="ml-[auto]">{postTotal}</div>
                                    </div>
                                    <div className="flex mb-2 ml-[20px]">
                                        <div>
                                            <Checkbox onChange={(e: any) => onChange(e, 1)} checked={checked[1]}>
                                                <span className="text-[#fff] text-[16px]">Comment</span>
                                            </Checkbox>
                                        </div>
                                        <div className="ml-[auto]">{commentTotal}</div>
                                    </div>
                                    <div className="flex mb-2 ml-[20px]">
                                        <div>
                                            <Checkbox onChange={(e: any) => onChange(e, 2)} checked={checked[2]}>
                                                <span className="text-[#fff] text-[16px]">Mirror</span>
                                            </Checkbox>
                                        </div>
                                        <div className="ml-[auto]">{mirrorTotal}</div>
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
