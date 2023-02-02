import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Checkbox, Switch } from 'antd';
import moment from 'moment'
import Kline from './Kline'

const tabs = ['Follwers $ Engagement', 'Fee & Collection']

const tabs1 = ['7D', '14D', '21D', '28D']

const rmodynamics = () => {
    const [activeTab, setActiveTab] = useState(0)

    const [activeTab1, setActiveTab1] = useState(0)

    const onChange = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

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
                        <Switch defaultChecked onChange={onChange} />
                    </div>
                    <div className="flex items-center justify-center">
                        <span className="mr-2">Mirrors (by)</span>
                        <Switch defaultChecked onChange={onChange} />
                    </div>
                </div>
                
            </div>
            <div className="h-[500px]">
                <Kline/>
            </div>
        </div>
    )
}

export default rmodynamics
