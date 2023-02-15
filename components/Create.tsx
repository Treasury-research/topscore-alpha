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

const Create = () => {
    const [scores, setScores] = useState<any>({});
    const [loadingScores, setLoadingScores] = useState<boolean>(false);
    const [currentProfile] = useRecoilState<any>(currentProfileState);
    const [loadingProfileList] = useRecoilState<any>(loadingProfileListState)
    const [profileList,] = useRecoilState(profileListState);
    const { account, connectWallet } = useWeb3Context();
    const [loadingNftBalance, setLoadingNftBalance] = useState(true)
    const [nftList, setNftList] = useState<any>([]);
    const erc721Contract = useErc721Contract();
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

    const getAllNfts = async () => {
        setLoadingNftBalance(true)
        const res = await erc721Contract.getAll(config.contracts.nft);
        // check if claimed
        const res2: any = await api.get("/v1/nft/query_ids", {
            params: {
                ids: res.join(','),
            },
        })
        if (res2 && res2.data && res2.data.length > 0) {
            setNftList(res2);
        }
        setLoadingNftBalance(false);
    }

    useEffect(() => {
        if (!account) {
            return;
        }
        getAllNfts();
    }, [account]);

    useEffect(() => {
        if (currentProfile && currentProfile.profileId) {
            getScores();
        }
    }, [currentProfile]);

    return (
        <>
            <div className="absolute top-[20px] text-[24px]">Create</div>
            {
                !loadingProfileList && !loadingNftBalance && (profileList.length === 0 || nftList.length == 0) && account &&
                <div className="permission-modal">
                    <div className="permission-modal-content py-[16px] pl-[12px] pr-[20px] rounded-[10px]">
                        <div className="flex">
                            <Image
                                className="h-[fit-content] mr-[10px]"
                                src={IconError}
                                alt=""
                            />
                            <div className="text-[rgba(255,255,255,0.8)]">
                                {
                                    profileList.length > 0 && nftList.length === 0 &&
                                    <p>You must have a "Your 2022 Wrapped on Lens" NFT</p>
                                }
                                {
                                    profileList.length === 0 && nftList.length > 0 &&
                                    <p>You must have a Lens Protocol Profile NFT</p>
                                }
                                {
                                    profileList.length === 0 && nftList.length === 0 &&
                                    <>
                                        <p>You need a Lens Profile NFT to access,</p>
                                        <p>and a "Your 2022 Wrapped on Lens" NFT for our full functionality</p>
                                    </>
                                }
                            </div>
                        </div>
                        {
                            nftList.length === 0 &&
                            <div className="flex justify-end my-[10px]">
                                <Image
                                    className="h-[fit-content] mr-[10px] cursor-pointer"
                                    src={IconOpensea}
                                    onClick={() => window.open(`https://opensea.io/collection/your-2022-wrapped-on-lens`)}
                                    alt=""
                                />
                            </div>
                        }

                    </div>
                </div>
            }
            <div className="h-[calc(100vh-60px)] overflow-y-auto">
                {/* <PostEdit></PostEdit> */}
                <div className="flex mb-10 mt-[60px]">
                    {loadingScores ? <LoadingOutlined className="text-2xl block mx-auto my-4" /> : <>
                        <div className="w-[300px] p-4 bg-[#1A1A1A] text-[rgba(255,255,255,0.5)] mr-10 rounded-[10px]">
                            <div className="mb-2">Creator</div>
                            <div className="mb-1 text-[24px] text-[rgba(255,255,255,0.9)]">#{JSON.stringify(scores) !== '{}' ? scores.now.pr_rank_creator : '-'}</div>
                            <div className="flex items-center">
                                {
                                    JSON.stringify(scores) !== '{}' && scores.lastWeek.pr_rank_creator - scores.now.pr_rank_creator < 0 &&
                                    <CaretDownOutlined className="creat-down-icon"/>
                                }
                                {
                                    JSON.stringify(scores) !== '{}' && scores.lastWeek.pr_rank_creator - scores.now.pr_rank_creator > 0 &&
                                    <CaretUpOutlined className="creat-up-icon" />
                                }
                                <span>{JSON.stringify(scores) !== '{}' ? Math.abs(scores.lastWeek.pr_rank_creator - scores.now.pr_rank_creator) : '-'} this week</span>
                            </div>
                        </div>
                        <div className="w-[300px] p-4 bg-[#1A1A1A] text-[rgba(255,255,255,0.5)] mr-10 rounded-[10px]">
                            <div className="mb-2">Engager</div>
                            <div className="mb-1 text-[24px] text-[rgba(255,255,255,0.9)]">#{JSON.stringify(scores) !== '{}' ? scores.now.pr_rank_engager : '-'}</div>
                            <div className="flex items-center">
                                {
                                    JSON.stringify(scores) !== '{}' && scores.lastWeek.pr_rank_engager - scores.now.pr_rank_engager < 0 &&
                                    <CaretDownOutlined className="creat-down-icon" />
                                }
                                {
                                    JSON.stringify(scores) !== '{}' && scores.lastWeek.pr_rank_engager - scores.now.pr_rank_engager > 0 &&
                                    <CaretUpOutlined className="creat-up-icon" />
                                }
                                <span>{JSON.stringify(scores) !== '{}' ? Math.abs(scores.lastWeek.pr_rank_engager - scores.now.pr_rank_engager) : '-'} this week</span>
                            </div>
                        </div>
                        <div className="w-[300px] p-4 bg-[#1A1A1A] text-[rgba(255,255,255,0.5)] mr-10 rounded-[10px]">
                            <div className="mb-2">Campaign</div>
                            <div className="mb-1 text-[24px] text-[rgba(255,255,255,0.9)]">#{JSON.stringify(scores) !== '{}' ? scores.now.pr_rank_compaign : '-'}</div>
                            <div className="flex items-center">
                                {
                                    JSON.stringify(scores) !== '{}' && scores.lastWeek.pr_rank_compaign - scores.now.pr_rank_compaign < 0 &&
                                    <CaretDownOutlined className="creat-down-icon" />
                                }
                                {
                                    JSON.stringify(scores) !== '{}' && scores.lastWeek.pr_rank_compaign - scores.now.pr_rank_compaign > 0 &&
                                    <CaretUpOutlined className="creat-up-icon" />
                                }
                                <span>{JSON.stringify(scores) !== '{}' ? Math.abs(scores.lastWeek.pr_rank_compaign - scores.now.pr_rank_compaign) : '-'} this week</span>
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
