import React, { useState, useEffect } from "react";
import Rmodynamics from './Rmodynamics'
import DashRmodynamics from './DashRmodynamics'
import DashLinemics from './DashLinemics'
import api from "../api";
import Image from 'next/image'
import IconUp from '../statics/img/up.svg'
import IconDown from '../statics/img/down.svg'

import { LeftOutlined, RightOutlined, LoadingOutlined } from '@ant-design/icons';

const Create = () => {
    const [scores, setScores] = useState<any>({});
    const [loadingScores, setLoadingScores] = useState<boolean>(false);

    // get this from global store
    const testProfileId = '47107'

    const getScores = async () => {
        setLoadingScores(true)
        const res = await api.get(`/publication/score/${testProfileId}`, {
            params: {
                profileId: testProfileId
            }
        })
        setScores(res.data);
        setLoadingScores(false)
    }

    useEffect(() => {
        getScores();
    }, [])
    return (
        <>
            <div className="absolute top-[20px] text-[24px]">Create</div>
            <div className="h-[calc(100vh-60px)] overflow-y-auto">
                {/* <PostEdit></PostEdit> */}
                <div className="flex mb-10 mt-[60px]">
                    {(loadingScores || !scores.now) ? <LoadingOutlined className="text-2xl block mx-auto my-4" /> : <>
                        <div className="w-[300px] p-4 bg-[#1A1A1A] text-[rgba(255,255,255,0.5)] mr-10">
                            <div className="mb-2">Creator</div>
                            <div className="mb-1 text-[24px] text-[rgba(255,255,255,0.9)]">#{scores.now.pr_rank_creator}</div>
                            <div className="flex items-center">
                                {
                                    scores.lastWeek.pr_rank_creator - scores.now.pr_rank_creator < 0 &&
                                    <Image
                                        className="mr-1"
                                        src={IconDown}
                                        alt=""
                                    />
                                }
                                {
                                    scores.lastWeek.pr_rank_creator - scores.now.pr_rank_creator > 0 &&
                                    <Image
                                        className="mr-1"
                                        src={IconUp}
                                        alt=""
                                    />
                                }
                                <span>{scores.lastWeek.pr_rank_creator - scores.now.pr_rank_creator} this week</span>
                            </div>
                        </div>
                        <div className="w-[300px] p-4 bg-[#1A1A1A] text-[rgba(255,255,255,0.5)] mr-10">
                            <div className="mb-2">Engager</div>
                            <div className="mb-1 text-[24px] text-[rgba(255,255,255,0.9)]">#{scores.now.pr_rank_engager}</div>
                            <div className="flex items-center">
                                {
                                    scores.lastWeek.pr_rank_engager - scores.now.pr_rank_engager < 0 &&
                                    <Image
                                        className="mr-1"
                                        src={IconDown}
                                        alt=""
                                    />
                                }
                                {
                                    scores.lastWeek.pr_rank_engager - scores.now.pr_rank_engager > 0 &&
                                    <Image
                                        className="mr-1"
                                        src={IconUp}
                                        alt=""
                                    />
                                }
                                <span>{scores.lastWeek.pr_rank_engager - scores.now.pr_rank_engager} this week</span>
                            </div>
                        </div>
                        <div className="w-[300px] p-4 bg-[#1A1A1A] text-[rgba(255,255,255,0.5)] mr-10">
                            <div className="mb-2">Campaign</div>
                            <div className="mb-1 text-[24px] text-[rgba(255,255,255,0.9)]">#{scores.now.pr_rank_compaign}</div>
                            <div className="flex items-center">
                                {
                                    scores.lastWeek.pr_rank_compaign - scores.now.pr_rank_compaign < 0 &&
                                    <Image
                                        className="mr-1"
                                        src={IconDown}
                                        alt=""
                                    />
                                }
                                {
                                    scores.lastWeek.pr_rank_compaign - scores.now.pr_rank_compaign > 0 &&
                                    <Image
                                        className="mr-1"
                                        src={IconUp}
                                        alt=""
                                    />
                                }
                                <span>{scores.lastWeek.pr_rank_compaign - scores.now.pr_rank_compaign} this week</span>
                            </div>
                        </div>
                    </>}
                </div>
                <Rmodynamics></Rmodynamics>
                <DashRmodynamics></DashRmodynamics>
                <DashLinemics></DashLinemics>
            </div>
        </>
    )
}

export default Create
