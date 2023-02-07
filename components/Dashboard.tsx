import React, { useState, useEffect } from "react";
import DashRmodynamics from './DashRmodynamics'
import DashLinemics from './DashLinemics'
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import moment from 'moment'

const Dashboard = () => {
  
    return (
        <div className="text-[#fff] w-full h-[calc(100vh-110px)] overflow-y-auto">
            <div className="flex mb-10">
                <div className="w-[300px] p-4 bg-[#1A1A1A] text-[rgba(255,255,255,0.5)] mr-10">
                    <div className="mb-2">Creator</div>
                    <div className="mb-1 text-[24px] text-[rgba(255,255,255,0.9)]">#2,451</div>
                    <div>- 5 period of change</div>
                </div>
                <div className="w-[300px] p-4 bg-[#1A1A1A] text-[rgba(255,255,255,0.5)] mr-10">
                    <div className="mb-2">Creator</div>
                    <div className="mb-1 text-[24px] text-[rgba(255,255,255,0.9)]">#2,451</div>
                    <div>- 5 period of change</div>
                </div>
                <div className="w-[300px] p-4 bg-[#1A1A1A] text-[rgba(255,255,255,0.5)] mr-10">
                    <div className="mb-2">Creator</div>
                    <div className="mb-1 text-[24px] text-[rgba(255,255,255,0.9)]">#2,451</div>
                    <div>- 5 period of change</div>
                </div>
            </div>
            <DashRmodynamics></DashRmodynamics>
            <DashLinemics></DashLinemics>
        </div>
    )
}

export default Dashboard
