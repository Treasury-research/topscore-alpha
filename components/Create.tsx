import React, { useState, useEffect } from "react";
import Rmodynamics from './Rmodynamics'
import DashRmodynamics from './DashRmodynamics'
import DashLinemics from './DashLinemics'
import api from "../api";
import Image from 'next/image'
import IconUp from '../statics/img/up.svg'
import IconDown from '../statics/img/down.svg'
import log from "../lib/log";
import IconError from '../statics/img/error.png'
import IconOpensea from '../statics/img/opensea.png'
import { useRecoilState } from "recoil";
import useErc721Contract from "../contract/useErc721Contract";
import config from "../config";
import { LoadingOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import useWeb3Context from "../hooks/useWeb3Context";
import { currentProfileState, profileListState, loadingProfileListState } from "../store/state";
import DonutChart from '../components/profile/DonutChart'
import trace from "../api/trace";

const Create = () => {
    const [scores, setScores] = useState<any>({});
    const [loadingScores, setLoadingScores] = useState<boolean>(false);
    const [currentProfile] = useRecoilState<any>(currentProfileState);
    const [profileList,] = useRecoilState(profileListState);
    const { account, connectWallet } = useWeb3Context();
    const [rate, setRate] = useState<any>({})
    const [nftList, setNftList] = useState<any>([]);
    const erc721Contract = useErc721Contract();
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
        console.log('评级', res)
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

    if(loadingProfileList){
        return (<></>)
    }
    return (
        <>
            <div className="absolute top-[20px] text-[24px]"></div>
            <div className="h-[calc(100vh-60px)] overflow-x-hidden hidden-scrollbar">
                <div className="flex mb-10 mt-[60px]">
                    {loadingScores ? <LoadingOutlined className="text-2xl block mx-auto my-4" /> : <>
                        <div className="w-[360px] h-[164px] px-4 creation-bg text-[#fff] mr-10 rounded-[10px]"
                        onMouseEnter={() => trace('Rank-Creation')}>
                            <div className="mb-2 text-[19px]">Creation</div>
                            <div className="flex justify-between gap-5 h-[120px]">
                                <div className="w-[60%]">
                                    <div className="text-[24px] mt-2"><span className="text-[14px] text-[rgba(255,255,255,0.4)]">Rank</span> #{JSON.stringify(scores) !== '{}' && scores.now ? scores.now.pr_rank_creator : '-'}</div>
                                    <div className="flex items-center text-[12px] text-[rgba(255,255,255,0.4)]">
                                        {
                                            JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_rank_creator - scores.now.pr_rank_creator < 0 &&
                                            <CaretDownOutlined className="creat-down-icon" />
                                        }
                                        {
                                            JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_rank_creator - scores.now.pr_rank_creator > 0 &&
                                            <CaretUpOutlined className="creat-up-icon" />
                                        }
                                        <span>{JSON.stringify(scores) !== '{}' && scores.lastWeek ? Math.abs(scores.lastWeek.pr_rank_creator - scores.now.pr_rank_creator) : '-'} this week</span>
                                    </div>
                                    <div className="text-[24px]"><span className="text-[14px] text-[rgba(255,255,255,0.4)]">Score</span> {JSON.stringify(scores) !== '{}' && scores.now ? scores.now.pr_score_creator.toFixed(2) : '-'}</div>
                                    <div className="flex items-center text-[12px] text-[rgba(255,255,255,0.4)]">
                                        {
                                            JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_score_creator - scores.now.pr_score_creator < 0 &&
                                            <CaretUpOutlined className="creat-up-icon" />
                                        }
                                        {
                                            JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_score_creator - scores.now.pr_score_creator > 0 &&
                                            <CaretDownOutlined className="creat-down-icon" />
                                        }
                                        <span>{JSON.stringify(scores) !== '{}' && scores.lastWeek ? Math.abs(scores.lastWeek.pr_score_creator - scores.now.pr_score_creator).toFixed(2) : '-'} this week</span>
                                    </div>
                                </div>
                                <div className="w-[40%]">
                                    <div className="h-[120px] w-[120px]">
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
                        <div className="w-[360px] h-[164px] px-4 creation-bg text-[#fff] mr-10 rounded-[10px]"
                         onMouseEnter={() => trace('Rank-Engagement')}>
                            <div className="mb-2 text-[19px]">Engagement</div>
                            <div className="flex justify-between gap-5 h-[120px]">
                                <div className="w-[60%]">
                                    <div className="text-[24px] mt-2"><span className="text-[14px] text-[rgba(255,255,255,0.4)]">Rank</span> #{JSON.stringify(scores) !== '{}' && scores.now ? scores.now.pr_rank_engager : '-'}</div>
                                    <div className="flex items-center text-[12px] text-[rgba(255,255,255,0.4)]">
                                        {
                                            JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_rank_engager - scores.now.pr_rank_engager < 0 &&
                                            <CaretDownOutlined className="creat-down-icon" />
                                        }
                                        {
                                            JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_rank_engager - scores.now.pr_rank_engager > 0 &&
                                            <CaretUpOutlined className="creat-up-icon" />
                                        }
                                        <span>{JSON.stringify(scores) !== '{}' && scores.lastWeek ? Math.abs(scores.lastWeek.pr_rank_engager - scores.now.pr_rank_engager) : '-'} this week</span>
                                    </div>
                                    <div className="text-[24px]"><span className="text-[14px] text-[rgba(255,255,255,0.4)]">Score</span> {JSON.stringify(scores) !== '{}' && scores.now ? scores.now.pr_score_engager.toFixed(2) : '-'}</div>
                                    <div className="flex items-center text-[12px] text-[rgba(255,255,255,0.4)]">
                                        {
                                            JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_score_engager - scores.now.pr_score_engager < 0 &&
                                            <CaretUpOutlined className="creat-up-icon" />
                                        }
                                        {
                                            JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_score_engager - scores.now.pr_score_engager > 0 &&
                                            <CaretDownOutlined className="creat-down-icon" />
                                        }
                                        <span>{JSON.stringify(scores) !== '{}' && scores.lastWeek ? Math.abs(scores.lastWeek.pr_score_engager - scores.now.pr_score_engager).toFixed(2) : '-'} this week</span>
                                    </div>
                                </div>
                                <div className="w-[40%]">
                                    <div className="h-[120px] w-[120px]">
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

                        <div className="w-[360px] h-[164px] px-4 creation-bg text-[#fff] mr-10 rounded-[10px]"
                        onMouseEnter={() => trace('Rank-Campaign')}>
                            <div className="mb-2 text-[19px]">Campaign</div>
                            <div className="flex justify-between gap-5 h-[120px]">
                                <div className="w-[60%]">
                                    <div className="text-[24px] mt-2"><span className="text-[14px] text-[rgba(255,255,255,0.4)]">Rank</span> #{JSON.stringify(scores) !== '{}' && scores.now ? scores.now.pr_rank_compaign : '-'}</div>
                                    <div className="flex items-center text-[12px] text-[rgba(255,255,255,0.4)]">
                                        {
                                            JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_rank_compaign - scores.now.pr_rank_compaign < 0 &&
                                            <CaretDownOutlined className="creat-down-icon" />
                                        }
                                        {
                                            JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_rank_compaign - scores.now.pr_rank_compaign > 0 &&
                                            <CaretUpOutlined className="creat-up-icon" />
                                        }
                                        <span>{JSON.stringify(scores) !== '{}' && scores.lastWeek ? Math.abs(scores.lastWeek.pr_rank_compaign - scores.now.pr_rank_compaign) : '-'} this week</span>
                                    </div>
                                    <div className="text-[24px]"><span className="text-[14px] text-[rgba(255,255,255,0.4)]">Score</span> {JSON.stringify(scores) !== '{}' && scores.now ? scores.now.pr_score_compaign.toFixed(2) : '-'}</div>
                                    <div className="flex items-center text-[12px] text-[rgba(255,255,255,0.4)]">
                                        {
                                            JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_score_compaign - scores.now.pr_score_compaign < 0 &&
                                            <CaretUpOutlined className="creat-up-icon" />
                                        }
                                        {
                                            JSON.stringify(scores) !== '{}' && scores.lastWeek && scores.lastWeek.pr_score_compaign - scores.now.pr_score_compaign > 0 &&
                                            <CaretDownOutlined className="creat-down-icon" />
                                        }
                                        <span>{JSON.stringify(scores) !== '{}' && scores.lastWeek ? Math.abs(scores.lastWeek.pr_score_compaign - scores.now.pr_score_compaign).toFixed(2) : '-'} this week</span>
                                    </div>
                                </div>
                                <div className="w-[40%]">
                                    <div className="h-[120px] w-[120px]">
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
