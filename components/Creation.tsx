import React, { useState, useEffect } from "react";
import Rmodynamics from './Rmodynamics'
import BestCard from './BestCard'
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import moment from 'moment'


const Creation = () => {
    return (
        <div className="text-[#fff]">
            <Rmodynamics></Rmodynamics>
            <div className="mt-10 text-[18px] mb-4">Best days and times to publish</div>
            <div className="text-[14px] text-[rgba(255,255,255,0.5)] mb-10">Base on your number of followers online in the last 30 days, we suggest publish on:</div>
            <BestCard></BestCard>
        </div>
    )
}

export default Creation
