import React, { useState, useEffect } from "react";
import DashRmodynamics from './DashRmodynamics'
import DashLinemics from './DashLinemics'
import api from "../api";

import { LeftOutlined, RightOutlined, LoadingOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import moment from 'moment'

const Dashboard = () => {
    const [scores, setScores] = useState<any>({});
    const [loadingScores, setLoadingScores] = useState<boolean>(false);

    // get this from global store
    const testProfileId = 1

    const getScores = async () => {
        setLoadingScores(true)
        const res = await api.get(`/publication/score/${testProfileId}`,{
            params:{
                profileId: testProfileId
            }
        })
        setScores(res.data);
        setLoadingScores(false)
    }

    useEffect(()=>{
        getScores();
    }, [])
  
    return (
        <div className="text-[#fff] w-full h-[calc(100vh-110px)] overflow-y-auto">
            <div className="flex mb-10">
                {(loadingScores || !scores.now)? <LoadingOutlined className="text-2xl block mx-auto my-4" /> : <>
                    <div className="w-[300px] p-4 bg-[#1A1A1A] text-[rgba(255,255,255,0.5)] mr-10">
                        <div className="mb-2">Creator</div>
                        <div className="mb-1 text-[24px] text-[rgba(255,255,255,0.9)]">#{scores.now.pr_rank_creator}</div>
                        <div>{scores.lastWeek.pr_rank_creator - scores.now.pr_rank_creator} period of change</div>
                    </div>
                    <div className="w-[300px] p-4 bg-[#1A1A1A] text-[rgba(255,255,255,0.5)] mr-10">
                        <div className="mb-2">Engager</div>
                        <div className="mb-1 text-[24px] text-[rgba(255,255,255,0.9)]">#{scores.now.pr_rank_engager}</div>
                        <div>{scores.lastWeek.pr_rank_engager - scores.now.pr_rank_engager} period of change</div>
                    </div>
                    <div className="w-[300px] p-4 bg-[#1A1A1A] text-[rgba(255,255,255,0.5)] mr-10">
                        <div className="mb-2">Campaign</div>
                        <div className="mb-1 text-[24px] text-[rgba(255,255,255,0.9)]">#{scores.now.pr_rank_compaign}</div>
                        <div>{scores.lastWeek.pr_rank_compaign - scores.now.pr_rank_compaign} period of change</div>
                    </div>
                </>}
            </div>
            <DashRmodynamics></DashRmodynamics>
            <DashLinemics></DashLinemics>
        </div>
    )
}

export default Dashboard
