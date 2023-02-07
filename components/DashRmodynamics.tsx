import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import api from "../api";
import moment from 'moment'

const dys = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

let weekCount = 0;

const rmodynamics = () => {

    const [remodyBaseData, setRemodyBaseData] = useState<any>([]);

    const [checked, setChecked] = useState([false, false, false, false, false]);

    const [activeYear, setActiveYear] = useState('2022')

    const [week, setWeek] = useState<any>([]);

    const [activeItems, setActiveItems] = useState<any>([]);

    useEffect(() => {
        getCurrentWeek()
    }, [])

    const getStaticData = () => {
        let rem = [[], [], [], [], [], [], []]
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 52; j++) {
                rem[i].push(Math.round(Math.random() * 10))
            }
        }
        setRemodyBaseData(rem);
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
        getStaticData();
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

    const getHeatmapData = async () =>{
        // profile id 稍晚点会放到 store 里
        const testProfileId = 1
        const res = await api.get(`/publication/${testProfileId}`, {
            params:{
                profileId: testProfileId,
                year: activeYear,
                type: "All",
            }
        })
        console.log('heatmap data', res)
    }

    useEffect(()=>{
        getHeatmapData();
    }, [])

    return (
        <div className="text-[#fff]">
            <div className="flex">
                <div className="px-[30px] pb-[6px] pt-[14px] bg-[#1A1A1A] rounded-tl-[4px] rounded-tr-[4px] cursor-pointer">2022</div>
                <div className="px-[30px] pb-[6px] pt-[6px] bg-[rgb(63,63,63)] h-[fit-content] mt-[10px] cursor-pointer">2023</div>
            </div>
            <div className="flex bg-[#1A1A1A] p-5 w-full">
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
                                            <div key={index} onClick={() => putActiveItems([i, index])} className={`${getBorderStyle([i, index])} box-border h-[14px] w-[14px] bg-[#4F4F4F] mr-[2px] cursor-pointer ${item < 3 ? 'bg-[#4F4F4F]' : item >= 3 && item <= 5 ? 'bg-[#4F2D2E]' : item > 5 && item <= 7 ? 'bg-[#76312B]' : item > 7 && item <= 8 ? 'bg-[#AF342F]' : item > 8 && item < 10 ? 'bg-[#CA3B32]' : 'bg-[#F33C17]'}`}></div>
                                        ))
                                    }
                                </div>
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
            </div>
        </div>
    )
}

export default rmodynamics
