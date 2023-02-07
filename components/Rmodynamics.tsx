import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import api from "../api";
import { Checkbox } from 'antd';
import moment from 'moment'

const dys = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const rlData = [[
    0, 1, 5
],
[
    0, 2, 10
],
[
    0, 3, 5
],
[
    1, 1, 5
],
[
    1, 3, 10
],
[
    4, 18, 20
]];
let weekCount = 0;

const rmodynamics = () => {

    const [remodyBaseData, setRemodyBaseData] = useState<any>([]);

    const [checked, setChecked] = useState([false, false, false, false, false]);

    const [week, setWeek] = useState<any>([]);

    const [activeItems,setActiveItems] = useState<any>([]);

    useEffect(() => {
        getCurrentWeek()
    }, [])

    const getStaticData = () => {
        let rem = [[], [], [], [], [], [], []]
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 24; j++) {
                rem[i].push(Math.round(Math.random()*10))
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

    const putActiveItems = (e:any) => {
        // let rs = activeItems.filter((t:any,i:number) => {
        //     return t[0] === e[0] && t[1] === e[1]
        // })
        // if(rs && rs.length ===0){
            
        // }
        setActiveItems((prev: any) => {
            return [...prev,e];
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

    const getBorderStyle = (e:any) => {
        let rs = activeItems.filter((t:any,i:number) => {
            return t[0] === e[0] && t[1] === e[1]
        })
        if(rs && rs.length !==0){
            return 'border-[1px] border-[#B4D2FF]'
        }
    }

    const getGlobalHeatmapData = async () =>{
        const defaultYear = '2023'
        const defaultHours = '00'
        const res = await api.get(`/thermal-map/global`, {
            params:{
                from: `${defaultYear}0101${defaultHours}`,
                to: `${defaultYear}0101${defaultHours}`,
            }
        })
        console.log('global heatmap data', res)
    }

    const getHeatmapData = async () =>{
        const testProfileId = 1
        const defaultYear = '2023'
        const defaultHours = '00'

        const res = await api.get(`/thermal-map/personal/${testProfileId}`, {
            params:{
                profileId: testProfileId,
                from: `${defaultYear}0101${defaultHours}`,
                to: `${defaultYear}0101${defaultHours}`,
            }
        })
        console.log('heatmap data', res)
    }

    useEffect(()=>{
        getHeatmapData();
        getGlobalHeatmapData()
    }, [])

    return (
        <div className="text-[#fff]">
            <div className="flex">
                <div className="px-[30px] pb-[6px] pt-[14px] bg-[#1A1A1A] rounded-tl-[4px] rounded-tr-[4px] cursor-pointer">Global</div>
                <div className="px-[30px] pb-[6px] pt-[6px] bg-[rgb(63,63,63)] h-[fit-content] mt-[10px] cursor-pointer">Personal</div>
            </div>
            <div className="flex bg-[#1A1A1A] p-5 w-full">
                <div className="w-[780px]">
                    <div className="text-[18px] mb-[20px]">Optima Post Time</div>
                    <div>
                        {
                            remodyBaseData.map((t: any, i: number) => (
                                <div className="flex mb-[1px]" key={i}>
                                    <div className="text-[12px] w-[40px] h-[30px] flex items-center">{dys[i]}</div>
                                    {
                                        t.map((item: any, index: number) => (
                                            <div key={index} onClick={() => putActiveItems([i,index])} className={`${getBorderStyle([i,index])} box-border h-[28px] w-[28px] bg-[#4F4F4F] mr-[2px] cursor-pointer ${item< 3 ? 'bg-[#4F4F4F]' : item >= 3 && item <=5 ? 'bg-[#4F2D2E]' : item > 5 && item <= 7 ? 'bg-[#76312B]' : item > 7 && item <= 8 ? 'bg-[#AF342F]' : item > 8 && item < 10 ? 'bg-[#CA3B32]' : 'bg-[#F33C17]'}`}></div>
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
                        <div className="float-right mr-4">24PM</div>
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
                        <div className="flex mb-2">
                            <div>
                                <Checkbox onChange={(e: any) => onChange(e, 0)} checked={checked[0]}>
                                    <span className="text-[#fff] text-[16px]">Post</span>
                                </Checkbox>
                            </div>
                            <div className="ml-[auto]">126</div>
                        </div>
                        <div className="flex mb-2">
                            <div>
                                <Checkbox onChange={(e: any) => onChange(e, 1)} checked={checked[1]}>
                                    <span className="text-[#fff] text-[16px]">Comment</span>
                                </Checkbox>
                            </div>
                            <div className="ml-[auto]">126</div>
                        </div>
                        <div className="flex mb-2">
                            <div>
                                <Checkbox onChange={(e: any) => onChange(e, 2)} checked={checked[2]}>
                                    <span className="text-[#fff] text-[16px]">Mirror</span>
                                </Checkbox>
                            </div>
                            <div className="ml-[auto]">126</div>
                        </div>
                        <div className="flex mb-2">
                            <div>
                                <Checkbox onChange={(e: any) => onChange(e, 3)} checked={checked[3]}>
                                    <span className="text-[#fff] text-[16px]">Collect</span>
                                </Checkbox>
                            </div>
                            <div className="ml-[auto]">126</div>
                        </div>
                        <div className="flex">
                            <div>
                                <Checkbox onChange={(e: any) => onChange(e, 4)} checked={checked[4]}>
                                    <span className="text-[#fff] text-[16px]">Volume</span>
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
