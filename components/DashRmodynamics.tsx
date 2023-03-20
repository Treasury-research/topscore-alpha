import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined, LoadingOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Checkbox, Popover, message } from 'antd';
import api from "../api";
import moment from 'moment';
import { currentProfileState } from "../store/state";
import { useRecoilState } from "recoil";
import Mirror from '../statics/img/mirror_1.svg'
import Comment from '../statics/img/pubIcon/commentBig.svg'
import Post from '../statics/img/post_icon.svg'
import Image from 'next/image'

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const dys = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

let weekCount = 0;

let maxRemoData: any = [0, 0, 0, 0, 0]

const tabs = ['2023', '2022'];

const testProfileId = '5'

let resPost = []

let resComment = []

let resMirror = []

let lastYearPost = 0

let lastYearComment = 0

let lastYearMirror = 0

const DashRmodynamics = () => {

    const [remodyBaseData, setRemodyBaseData] = useState<any>([]);

    const [checkedPub, setcheckedPub] = useState(true);

    const [checked, setChecked] = useState([true, true, true]);

    const [week, setWeek] = useState<any>([]);

    const [activeTab, setActiveTab] = useState<any>(0);

    const [loading, setLoading] = useState<boolean>(false);

    const [activeItems, setActiveItems] = useState<any>([]);

    const [postTotal, setPostTotal] = useState<any>();

    const [commentTotal, setCommentTotal] = useState<any>();

    const [mirrorTotal, setMirrorTotal] = useState<any>();

    const [weekCountChange, setWeekCountChange] = useState<any>({
        current: {
            postTotal: 0,
            commentTotal: 0,
            mirrorTotal: 0
        },
        last: {
            postTotal: 0,
            commentTotal: 0,
            mirrorTotal: 0
        }
    });

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
    }, [checked, currentProfile])

    useEffect(() => {
        if (checkedPub) {
            setChecked([true, true, true])
        }
    }, [checkedPub])

    // 判断日期属于这一周or上一周
    const judgeDatetoWeek = (dateStr: any) => {
        let weekOfDay = parseInt(moment().format('E'));//计算今天是这周第几天
        let current_monday = new Date(moment().startOf('day').subtract(weekOfDay - 1, 'days').toDate()).getTime();//本周周一日期毫秒
        let current_sunday = new Date(moment().startOf('day').subtract(weekOfDay - 7, 'days').toDate()).getTime();//本周周日日期毫秒
        let last_monday = new Date(moment().startOf('day').subtract(weekOfDay + 6, 'days').toDate()).getTime();//上周周一日期毫秒
        let last_sunday = new Date(moment().startOf('day').subtract(weekOfDay, 'days').toDate()).getTime();//上周周日日期毫秒
        let dateStrHs = new Date(dateStr).getTime()

        if (current_monday < dateStrHs && dateStrHs < current_sunday) {
            return 1 // 日期属于当前周
        } else if (last_monday < dateStrHs && dateStrHs < last_sunday) {
            return 2 // 日期属于上一周
        } else {
            return 3
        }
    }

    const getYearWeek = (a: any, b: any, c: any) => {
        var date1 = new Date(a, parseInt(b) - 1, c),
            date2 = new Date(a, 0, 1),
            d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
        return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
    };

    const getTotalPostData = async () => {
        let total = 0;
        let thisWeekTotal = 0;
        let lastWeekTotal = 0;
        const res = await api.get(`/publication/${currentProfile.profileId}`, {
            params: {
                profileId: currentProfile.profileId,
                year: activeTab === 0 ? '2023' : '2022',
                type: 'Post',
            }
        })
        if (!res || !res.data) return false;
        res.data.forEach((t: any) => {
            total += t.count
            if (judgeDatetoWeek(t.date) === 1) {
                thisWeekTotal += t.count
            }
            if (judgeDatetoWeek(t.date) === 2) {
                lastWeekTotal += t.count
            }
        })
        setWeekCountChange((prev) => {
            prev.current.postTotal = thisWeekTotal
            prev.last.postTotal = lastWeekTotal
            return { ...prev }
        })
        if (activeTab === 0) {
            lastYearPost = total
        }
        resPost = res.data;
        setPostTotal(total)
    }

    const getTotalCommentData = async () => {
        let total = 0;
        let thisWeekTotal = 0;
        let lastWeekTotal = 0;
        const res = await api.get(`/publication/${currentProfile.profileId}`, {
            params: {
                profileId: currentProfile.profileId,
                year: activeTab === 0 ? '2023' : '2022',
                type: 'Comment',
            }
        })
        if (!res || !res.data) return false;
        res.data.forEach((t: any) => {
            total += t.count
            if (judgeDatetoWeek(t.date) === 1) {
                thisWeekTotal += t.count
            }
            if (judgeDatetoWeek(t.date) === 2) {
                lastWeekTotal += t.count
            }
        })
        setWeekCountChange((prev) => {
            prev.current.commentTotal = thisWeekTotal
            prev.last.commentTotal = lastWeekTotal
            return { ...prev }
        })
        if (activeTab === 0) {
            lastYearComment = total
        }
        resComment = res.data;
        setCommentTotal(total)
    }

    const getTotalMirrorData = async () => {
        let total = 0;
        let thisWeekTotal = 0;
        let lastWeekTotal = 0;
        const res = await api.get(`/publication/${currentProfile.profileId}`, {
            params: {
                profileId: currentProfile.profileId,
                year: activeTab === 0 ? '2023' : '2022',
                type: 'Mirror',
            }
        })
        if (!res || !res.data) return false;
        res.data.forEach((t: any) => {
            total += t.count
            if (judgeDatetoWeek(t.date) === 1) {
                thisWeekTotal += t.count
            }
            if (judgeDatetoWeek(t.date) === 2) {
                lastWeekTotal += t.count
            }
        })
        setWeekCountChange((prev) => {
            prev.current.mirrorTotal = thisWeekTotal
            prev.last.mirrorTotal = lastWeekTotal
            return { ...prev }
        })
        if (activeTab === 0) {
            lastYearMirror = total
        }
        resMirror = res.data;
        setMirrorTotal(total)
    }

    const getWeekNum = () => {
        var year = new Date().getFullYear();
        var week = moment(new Date()).format("E");
        var startweek = moment(new Date(year + "-01-01")).format("E");
        var millisDiff =
            new Date(moment().format("yyyy-MM-DD")).getTime() -
            new Date(year + "-01-01").getTime();
        var days =
            (millisDiff -
                Number(week) * (24 * 60 * 60 * 1000) -
                (7 - Number(startweek)) * (24 * 60 * 60 * 1000)) /
            86400000;
        return days / 7 + 2;
    }

    const getGlobalHeatmapData = async () => {
        setLoading(true);
        let types = ['Post', 'Comment', 'Mirror'];
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
            rem[5][0] = 'noData'
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
            rem[6][0] = 'noData'
        }
        let weekNum = getWeekNum();
        let weekOfDay = parseInt(moment().format('E'))
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 52; j++) {
                if (activeTab === 1) {
                    rem[i].push('noData')
                } else {
                    if (j > weekNum - 2) {
                        rem[i].push(null)
                    } else if (j < weekNum - 2) {
                        rem[i].push('noData')
                    } else if (j == weekNum - 2 && weekOfDay < i + 1) {
                        rem[i].push(null)
                    } else if (j == weekNum - 2 && weekOfDay >= i + 1) {
                        rem[i].push('noData')
                    }
                }
            }
        }
        maxRemoData = 0
        if (!res || !res.data) {
            setRemodyBaseData(rem)
            setLoading(false);
            return false;
        }
        res.data.forEach((t: any) => {
            let week = moment(t.date).weekday()
            let month = Number(t.date.slice(6, 8))
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
        setRemodyBaseData(rem)
        setLoading(false);
    }

    const onChange = (i: number) => {
        let target = !checked[i]
        if (!target) {
            if (i === 0 && !checked[1] && !checked[2]) {
                return false
            }
            if (i === 1 && !checked[0] && !checked[2]) {
                return false
            }
            if (i === 2 && !checked[0] && !checked[1]) {
                return false
            }
        }
        setChecked((prev: any) => {
            prev[i] = target;
            return [...prev];
        });
    };

    const onChangePub = (e: any) => {
        if (!e.target.checked) {
            return false
        }
        setcheckedPub(e.target.checked)
    };

    const getCurrentWeek = () => {
        let weekOfDay = parseInt(moment().format('E'));//计算今天是这周第几天
        let last_monday = moment().startOf('day').subtract(weekOfDay + 7 * weekCount - 1, 'days').toDate();//周一日期
        let last_sunday = moment().startOf('day').subtract(weekOfDay + 7 * (weekCount - 1), 'days').toDate();//周日日期
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
        if (e === 'hidden') return ''
        if (!e || (!e[0] && e[0] !== 0) || e === 'noData' || e[0] === 0) return 'bg-[#232323]'
        let lv = maxRemoData / 5;
        if (lv === 0) {
            return 'bg-[#232323]'
        }
        if (e[0] < lv) {
            return 'bg-[#311C17]'
        } else if (lv <= e[0] && e[0] < lv * 2) {
            return 'bg-[#471F14]'
        } else if (lv * 2 <= e[0] && e[0] < lv * 3) {
            return 'bg-[#75240F]'
        } else if (lv * 3 <= e[0] && e[0] < lv * 4) {
            return 'bg-[#A32A0A]'
        } else if (lv * 4 <= e[0]) {
            return 'bg-[#D13005]'
        }
    }

    const getContent = (e: any, i: number, j: number) => {
        if (!e || (!e[0] && e[0] !== 0)) return ''
        let noDateStr = ''
        if (e === 'noData') {
            // console.log(moment('2023-01-01').startOf('day') .valueOf())
            // moment(t.timestamp * 1000).format('MM/DD')
            // moment() .startOf('day') .valueOf()
            let startHs = 0;
            let endHs = 0;
            if (activeTab == 0) {
                startHs = moment('2023-01-01').startOf('day').valueOf()
                endHs = startHs + (j - 1) * 7 * 24 * 60 * 60 * 1000 + (i + 1) * 24 * 60 * 60 * 1000
            } else {
                startHs = moment('2022-01-01').startOf('day').valueOf()
                endHs = startHs + (j - 1) * 7 * 24 * 60 * 60 * 1000 + (i + 2) * 24 * 60 * 60 * 1000
            }
            noDateStr = moment(endHs).format('YYYY/MM/DD')
        }
        let filterResPost = resPost.filter((t: any) => {
            return t.date === e[1]
        })
        let filterResComment = resComment.filter((t: any) => {
            return t.date === e[1]
        })
        let filterResMirror = resMirror.filter((t: any) => {
            return t.date === e[1]
        })
        return (
            <div>
                {
                    e !== 'noData' &&
                    <p className="text-[18px] font-[600]">{e[1] || '--'}</p>
                }

                {
                    e == 'noData' &&
                    <p className="text-[18px] font-[600]">{noDateStr}</p>
                }

                <div>
                    {
                        checked[0] && e == 'noData' &&
                        <div>Posts：0</div>
                    }
                    {
                        checked[1] && e == 'noData' &&
                        <div>Comments：0</div>
                    }
                    {
                        checked[2] && e == 'noData' &&
                        <div>Mirrors：0</div>
                    }

                    {
                        checked[0] && filterResPost.length > 0 && e !== 'noData' &&
                        <div>Posts：{filterResPost[0]['count']}</div>
                    }
                    {
                        checked[1] && filterResComment.length > 0 && e !== 'noData' &&
                        <div>Comments：{filterResComment[0]['count']}</div>
                    }
                    {
                        checked[2] && filterResMirror.length > 0 && e !== 'noData' &&
                        <div>Mirrors：{filterResMirror[0]['count']}</div>
                    }
                </div>
            </div>
        )
    };

    return (
        <div className="text-[#fff] mb-10">


            <div className="flex mb-20">
                <div className="w-[880px] mr-[10px]">
                    <div className="flex jusitify-between h-[54px] items-center bg-[#1A1A1A] rounded-[10px] mb-[10px]">
                        <div className="flex ml-8">
                            {
                                tabs.map((t: any, i: number) => (
                                    <div key={i} onClick={() => setActiveTab(i)} className={`cursor-pointer px-2 py-1 mr-4 text-[18px] ${activeTab === i ? 'text-[#fff] border-b-[2px] border-[#fff]' : 'text-[rgba(255,255,255,0.4)]'}`}>{t}</div>
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
                                <div className="h-[122px] flex items-center"><LoadingOutlined className="text-2xl block mx-auto" /></div>
                                : <>
                                    <div>
                                        {
                                            remodyBaseData.map((t: any, i: number) => (
                                                <div className="flex mb-[1px]" key={i}>
                                                    <div className="text-[10px] w-[40px] h-[14px] flex items-center day-liber">{dys[i]}</div>
                                                    {
                                                        t.map((item: any, index: number) => (
                                                            (!item || (!item[0] && item[0] !== 0) || item === 'hidden') ?
                                                                (
                                                                    <div key={index} className={`${getBorderStyle([i, index])} box-border h-[13px] w-[13px] mr-[2px] cursor-pointer ${getItemStyle(item)}`}></div>
                                                                ) : (<Popover key={index} placement="bottom" content={() => getContent(item, i, index)}>
                                                                    <div className={`${getBorderStyle([i, index])} box-border h-[13px] w-[13px] mr-[2px] cursor-pointer ${getItemStyle(item)}`}></div>
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

                                </>
                        }
                    </div>
                </div>
                <div className="w-[calc(100%-890px)]">
                    <div className="h-full px-6 pt-7 pb-2 rounded-[10px] bg-[#1A1A1A]">
                        <div className="flex mb-2">
                            <div>
                                {
                                    (!checked[0] || !checked[1] || !checked[2]) &&
                                    <div className="flex items-center h-[25px]">
                                        <div onClick={() => setChecked([true, true, true])} className="h-4 w-4 bg-[#CE3900] flex items-center justify-center rounded-[4px] mr-2 text-[18px] cursor-pointer text-[600]">-</div>
                                        <div className="text-[#fff] text-[13px]">Publications</div>
                                    </div>
                                }
                                {
                                    checked[0] && checked[1] && checked[2] &&
                                    <div className="flex items-center h-[25px]">
                                        <Checkbox onChange={(e: any) => onChangePub(e)} checked={checkedPub}>
                                            <span className="text-[#fff] text-[14px]">Publications</span>
                                        </Checkbox>
                                    </div>
                                }
                            </div>
                            {/* <div className="ml-[auto]">{!isNaN(postTotal + commentTotal + mirrorTotal) ? postTotal + commentTotal + mirrorTotal : '-'}</div> */}
                        </div>
                        <div className="flex mb-[10px]">
                            <div className="flex items-center text-[26px] ml-[22px]">{!isNaN(postTotal + commentTotal + mirrorTotal) ? postTotal + commentTotal + mirrorTotal : '-'}</div>
                            <div className="ml-[auto] text-[14px]">
                                <div className='flex items-center ml-[auto] w-[fit-content]'>
                                    {
                                        activeTab === 0 ?
                                            <>
                                                {
                                                    (weekCountChange.current.postTotal + weekCountChange.current.commentTotal + weekCountChange.current.mirrorTotal) -
                                                    (weekCountChange.last.postTotal + weekCountChange.last.commentTotal + weekCountChange.last.mirrorTotal) > 0 &&
                                                    <CaretUpOutlined className="creat-up-icon ml-[auto]" />
                                                }
                                                {
                                                    (weekCountChange.current.postTotal + weekCountChange.current.commentTotal + weekCountChange.current.mirrorTotal) -
                                                    (weekCountChange.last.postTotal + weekCountChange.last.commentTotal + weekCountChange.last.mirrorTotal) < 0 &&
                                                    <CaretDownOutlined className="creat-down-icon ml-[auto]" />
                                                }
                                                {
                                                    (weekCountChange.current.postTotal + weekCountChange.current.commentTotal + weekCountChange.current.mirrorTotal) -
                                                    (weekCountChange.last.postTotal + weekCountChange.last.commentTotal + weekCountChange.last.mirrorTotal) === 0 &&
                                                    <div className="mr-1 bg-[rgba(255,255,255,0.4)] h-[2px] w-[8px]"></div>
                                                }
                                                <span>{Math.abs((weekCountChange.current.postTotal + weekCountChange.current.commentTotal + weekCountChange.current.mirrorTotal) -
                                                    (weekCountChange.last.postTotal + weekCountChange.last.commentTotal + weekCountChange.last.mirrorTotal))
                                                }</span>
                                            </> :
                                            <span>{lastYearPost + lastYearComment + lastYearMirror}</span>
                                    }
                                </div>
                                <div className="text-[rgba(255,255,255,0.6)]">{activeTab === 0 ? 'this week' : 'in 2023'}</div>
                            </div>
                        </div>
                        <div className="flex mb-2 ml-[20px]">
                            <div>
                                <div className="flex items-center cursor-pointer text-[14px]" onClick={() => onChange(0)}>
                                    <div className={`${checked[0] ? 'bg-[#CE3900]' : 'bg-[#4F4F4F]'} mr-2 rounded-[4px]`}>
                                        <Image
                                            className="h-[fit-content] w-[16px] h-[16px]"
                                            src={Post}
                                            alt=""
                                        />
                                    </div>
                                    <div className="mr-2">{postTotal || postTotal === 0 ? postTotal : '-'}</div>
                                    <div>Posts</div>
                                </div>
                            </div>
                            <div className="ml-[auto]">
                                <div className='flex items-center'>
                                    {
                                        activeTab === 0 ?
                                            <>
                                                {
                                                    weekCountChange.current.postTotal - weekCountChange.last.postTotal > 0 &&
                                                    <CaretUpOutlined className="creat-up-icon ml-[auto]" />
                                                }
                                                {
                                                    weekCountChange.current.postTotal - weekCountChange.last.postTotal < 0 &&
                                                    <CaretDownOutlined className="creat-down-icon ml-[auto]" />
                                                }
                                                {
                                                    weekCountChange.current.postTotal - weekCountChange.last.postTotal === 0 &&
                                                    <div className="mr-1 bg-[rgba(255,255,255,0.4)] h-[2px] w-[8px]"></div>
                                                }
                                                <span>{Math.abs(weekCountChange.current.postTotal - weekCountChange.last.postTotal)}</span>
                                            </> :
                                            <span>{lastYearPost}</span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex mb-2 ml-[20px]">
                            <div>
                                <div className="flex items-center cursor-pointer text-[14px]" onClick={() => onChange(1)}>
                                    <div className={`${checked[1] ? 'bg-[#CE3900]' : 'bg-[#4F4F4F]'} mr-2 rounded-[4px]`}>
                                        <Image
                                            className="h-[fit-content] w-[16px] h-[16px]"
                                            src={Comment}
                                            alt=""
                                        />
                                    </div>
                                    <div className="mr-2">{commentTotal || commentTotal === 0 ? commentTotal : '-'}</div>
                                    <div>Comments</div>
                                </div>
                            </div>
                            <div className="ml-[auto]">
                                <div className='flex items-center'>
                                    {
                                        activeTab === 0 ?
                                            <>
                                                {
                                                    weekCountChange.current.commentTotal - weekCountChange.last.commentTotal > 0 &&
                                                    <CaretUpOutlined className="creat-up-icon ml-[auto]" />
                                                }
                                                {
                                                    weekCountChange.current.commentTotal - weekCountChange.last.commentTotal < 0 &&
                                                    <CaretDownOutlined className="creat-down-icon ml-[auto]" />
                                                }
                                                {
                                                    weekCountChange.current.commentTotal - weekCountChange.last.commentTotal === 0 &&
                                                    <div className="mr-1 bg-[rgba(255,255,255,0.4)] h-[2px] w-[8px]"></div>
                                                }
                                                <span>{Math.abs(weekCountChange.current.commentTotal - weekCountChange.last.commentTotal)}</span>
                                            </> :
                                            <span>{lastYearComment}</span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex mb-2 ml-[20px]">
                            <div>
                                <div className="flex items-center cursor-pointer text-[14px]" onClick={() => onChange(2)}>
                                    <div className={`${checked[2] ? 'bg-[#CE3900]' : 'bg-[#4F4F4F]'} mr-2 rounded-[4px]`}>
                                        <Image
                                            className="h-[fit-content] w-[16px] h-[16px]"
                                            src={Mirror}
                                            alt=""
                                        />
                                    </div>
                                    <div className="mr-2">{mirrorTotal || mirrorTotal === 0 ? mirrorTotal : '-'}</div>
                                    <div>Mirrors</div>
                                </div>
                            </div>
                            <div className="ml-[auto]">
                                <div className='flex items-center'>
                                    {
                                        activeTab === 0 ?
                                            <>
                                                {
                                                    weekCountChange.current.mirrorTotal - weekCountChange.last.mirrorTotal > 0 &&
                                                    <CaretUpOutlined className="creat-up-icon ml-[auto]" />
                                                }
                                                {
                                                    weekCountChange.current.mirrorTotal - weekCountChange.last.mirrorTotal < 0 &&
                                                    <CaretDownOutlined className="creat-down-icon ml-[auto]" />
                                                }
                                                {
                                                    weekCountChange.current.mirrorTotal - weekCountChange.last.mirrorTotal === 0 &&
                                                    <div className="mr-1 bg-[rgba(255,255,255,0.4)] h-[2px] w-[8px]"></div>
                                                }
                                                <span>{Math.abs(weekCountChange.current.mirrorTotal - weekCountChange.last.mirrorTotal)}</span>
                                            </> :
                                            <span>{lastYearMirror}</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashRmodynamics
