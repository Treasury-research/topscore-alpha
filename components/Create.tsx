import React, { useState, useEffect } from "react";
import Rmodynamics from './Rmodynamics'
import DashRmodynamics from './DashRmodynamics'
import DashLinemics from './DashLinemics'
import api from "../api";
import Image from 'next/image'
import { useRecoilState } from "recoil";
import { LoadingOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { currentProfileState, loadingProfileListState } from "../store/state";
import DonutChart from '../components/profile/DonutChart'
import trace from "../api/trace";

const Create = () => {
    const [scores, setScores] = useState<any>({});
    const [loadingScores, setLoadingScores] = useState<boolean>(false);
    const [currentProfile] = useRecoilState<any>(currentProfileState);
    const [rate, setRate] = useState<any>({})
    const [loadingProfileList, setLoadingProfileList] = useRecoilState(
        loadingProfileListState
    );
    // get this from global store

    const getScores = async () => {
        setLoadingScores(true)
        const res = await api.get(`/publication/score/${currentProfile.profileId}`, {
            params: {
                profileId: currentProfile.profileId
            }
        })
        if (res && res.data) {
            setScores(res.data);
        }
        setLoadingScores(false)
    }

    const getRating = async () => {
        const res = await api.get(`/lens/queryRating/?profileId=${currentProfile.profileId}`)
        if (res && res.data) {
            setRate({
                creator_level: res.data.creator_level,
                engager_level: res.data.engager_level,
                compaign_level: res.data.compaign_level
            })
        }
    }

    useEffect(() => {
        if (currentProfile && currentProfile.profileId && !loadingProfileList) {
            getScores();
            getRating();
        }
    }, [currentProfile]);

    if (loadingProfileList) {
        return (<></>)
    }
    return (
        <>
            <div className="absolute top-[20px] text-[24px]"></div>
            <div className="h-[calc(100vh-60px)] overflow-x-hidden hidden-scrollbar profile-main-bg px-5 mt-5">
                <div className="flex mb-10 mt-[60px]">
                    {loadingScores ? <LoadingOutlined className="text-2xl block mx-auto my-4" /> : <>
                        <div className="w-[360px] h-[164px] px-4 creation-bg text-[#000] dark:text-[#fff] mr-10 rounded-[10px]"
                            onMouseEnter={() => trace('Rank-Creation')}>
                            <div className="mb-1 text-[19px]">Creation</div>
                            <div className="flex justify-between gap-5 h-[120px]">
                                <div className="w-[60%]">
                                    <div className="text-[24px] mt-[28px] flex items-baseline h-[40px]">
                                        <span className="text-[14px] text-[rgba(0,0,0,0.7) dark:text-[rgba(255,255,255,0.4)] mr-2">Rank</span>
                                        <span className="mr-1">#{JSON.stringify(scores) !== '{}' && scores.now ? scores.now.pr_rank_creator : '-'}</span>
                                        <div className="flex items-center text-[12px] text-[rgba(0,0,0,0.7) dark:text-[rgba(255,255,255,0.4)]">
                                            {
                                                JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_rank_creator - scores.now.pr_rank_creator < 0 &&
                                                <CaretDownOutlined className="creat-down-icon" />
                                            }
                                            {
                                                JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_rank_creator - scores.now.pr_rank_creator > 0 &&
                                                <CaretUpOutlined className="creat-up-icon" />
                                            }
                                            <span>{JSON.stringify(scores) !== '{}' && scores.lastWeek ? Math.abs(scores.lastWeek.pr_rank_creator - scores.now.pr_rank_creator) : '-'}</span>
                                        </div>
                                    </div>
                                    <div className="text-[24px] flex items-baseline h-[40px]">
                                        <span className="text-[14px] text-[rgba(0,0,0,0.7) dark:text-[rgba(255,255,255,0.4)] mr-2">Score</span>
                                        <span className="mr-1">{JSON.stringify(scores) !== '{}' && scores.now ? scores.now.pr_score_creator.toFixed(2) : '-'}</span>
                                        <div className="flex items-center text-[12px] text-[rgba(0,0,0,0.7) dark:text-[rgba(255,255,255,0.4)]">
                                            {
                                                JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_score_creator - scores.now.pr_score_creator < 0 &&
                                                <CaretUpOutlined className="creat-up-icon" />
                                            }
                                            {
                                                JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_score_creator - scores.now.pr_score_creator > 0 &&
                                                <CaretDownOutlined className="creat-down-icon" />
                                            }
                                            <span>{JSON.stringify(scores) !== '{}' && scores.lastWeek ? Math.abs(scores.lastWeek.pr_score_creator - scores.now.pr_score_creator).toFixed(2) : '-'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[100px] flex items-center">
                                    <div className="h-[100px] w-[100px]">
                                        {
                                            (rate.creator_level || rate.creator_level === 0) &&
                                            <DonutChart info={{
                                                level: rate.creator_level
                                            }} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[360px] h-[164px] px-4 creation-bg text-[#000] dark:text-[#fff] mr-10 rounded-[10px]"
                            onMouseEnter={() => trace('Rank-Engagement')}>
                            <div className="mb-1 text-[19px] ml-[-6px]">Engagement</div>
                            <div className="flex justify-between gap-5 h-[120px]">
                                <div className="w-[60%]">
                                    <div className="text-[24px] mt-[28px] flex items-baseline h-[40px]">
                                        <span className="text-[14px] text-[rgba(0,0,0,0.7) dark:text-[rgba(255,255,255,0.4)] mr-2">Rank</span>
                                        <span className="mr-1">#{JSON.stringify(scores) !== '{}' && scores.now ? scores.now.pr_rank_engager : '-'}</span>
                                        <div className="flex items-center text-[12px] text-[rgba(0,0,0,0.7) dark:text-[rgba(255,255,255,0.4)]">
                                            {
                                                JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_rank_engager - scores.now.pr_rank_engager < 0 &&
                                                <CaretDownOutlined className="creat-down-icon" />
                                            }
                                            {
                                                JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_rank_engager - scores.now.pr_rank_engager > 0 &&
                                                <CaretUpOutlined className="creat-up-icon" />
                                            }
                                            <span>{JSON.stringify(scores) !== '{}' && scores.lastWeek ? Math.abs(scores.lastWeek.pr_rank_engager - scores.now.pr_rank_engager) : '-'}</span>
                                        </div>
                                    </div>
                                    <div className="text-[24px] flex items-baseline h-[40px]">
                                        <span className="text-[14px] text-[rgba(0,0,0,0.7) dark:text-[rgba(255,255,255,0.4)] mr-2">Score</span>
                                        <span className="mr-1">{JSON.stringify(scores) !== '{}' && scores.now ? scores.now.pr_score_engager.toFixed(2) : '-'}</span>
                                        <div className="flex items-center text-[12px] text-[rgba(0,0,0,0.7) dark:text-[rgba(255,255,255,0.4)]">
                                            {
                                                JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_score_engager - scores.now.pr_score_engager < 0 &&
                                                <CaretUpOutlined className="creat-up-icon" />
                                            }
                                            {
                                                JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_score_engager - scores.now.pr_score_engager > 0 &&
                                                <CaretDownOutlined className="creat-down-icon" />
                                            }
                                            <span>{JSON.stringify(scores) !== '{}' && scores.lastWeek ? Math.abs(scores.lastWeek.pr_score_engager - scores.now.pr_score_engager).toFixed(2) : '-'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[100px] flex items-center">
                                    <div className="h-[100px] w-[100px]">
                                        {
                                            (rate.engager_level || rate.engager_level === 0) &&
                                            <DonutChart info={{
                                                level: rate.engager_level
                                            }} />
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-[360px] h-[164px] px-4 creation-bg text-[#000] dark:text-[#fff] mr-10 rounded-[10px]"
                            onMouseEnter={() => trace('Rank-Campaign')}>
                            <div className="mb-1 text-[19px]">Campaign</div>
                            <div className="flex justify-between gap-5 h-[120px]">
                                <div className="w-[calc(100%-120px)]">

                                    <div className="text-[24px] mt-[28px] flex items-baseline h-[40px]">
                                        <span className="text-[14px] text-[rgba(0,0,0,0.7) dark:text-[rgba(255,255,255,0.4)] mr-2">Rank</span>
                                        <span className="mr-1">#{JSON.stringify(scores) !== '{}' && scores.now ? scores.now.pr_rank_compaign : '-'}</span>
                                        <div className="flex items-center text-[12px] text-[rgba(0,0,0,0.7) dark:text-[rgba(255,255,255,0.4)]">
                                            {
                                                JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_rank_compaign - scores.now.pr_rank_compaign < 0 &&
                                                <CaretDownOutlined className="creat-down-icon" />
                                            }
                                            {
                                                JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_rank_compaign - scores.now.pr_rank_compaign > 0 &&
                                                <CaretUpOutlined className="creat-up-icon" />
                                            }
                                            <span>{JSON.stringify(scores) !== '{}' && scores.lastWeek ? Math.abs(scores.lastWeek.pr_rank_compaign - scores.now.pr_rank_compaign) : '-'}</span>
                                        </div>
                                    </div>
                                    <div className="text-[24px] flex items-baseline h-[40px]">
                                        <span className="text-[14px] text-[rgba(0,0,0,0.7) dark:text-[rgba(255,255,255,0.4)] mr-2">Score</span>
                                        <span className="mr-1">{JSON.stringify(scores) !== '{}' && scores.now ? scores.now.pr_score_compaign.toFixed(2) : '-'}</span>
                                        <div className="flex items-center text-[12px] text-[rgba(0,0,0,0.7) dark:text-[rgba(255,255,255,0.4)]">
                                            {
                                                JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_score_compaign - scores.now.pr_score_compaign < 0 &&
                                                <CaretUpOutlined className="creat-up-icon" />
                                            }
                                            {
                                                JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_score_compaign - scores.now.pr_score_compaign > 0 &&
                                                <CaretDownOutlined className="creat-down-icon" />
                                            }
                                            <span>{JSON.stringify(scores) !== '{}' && scores.lastWeek ? Math.abs(scores.lastWeek.pr_score_compaign - scores.now.pr_score_compaign).toFixed(2) : '-'}</span>

                                        </div>
                                    </div>
                                </div>
                                <div className="w-[100px] flex items-center">
                                    <div className="h-[100px] w-[100px]">
                                        {
                                            (rate.compaign_level || rate.compaign_level === 0) &&
                                            <DonutChart info={{
                                                level: rate.compaign_level
                                            }} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}
                </div>
                <DashRmodynamics></DashRmodynamics>
                <Rmodynamics></Rmodynamics>
                <DashLinemics></DashLinemics>
            </div>
        </>
    )
}

export default Create
