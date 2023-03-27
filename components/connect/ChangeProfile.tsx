import React, { useState, useEffect } from "react";
import { Modal, Switch, Input, Select, InputNumber } from 'antd';
import { formatIPFS } from "../../lib/tool";
import lensApi from "../../api/lensApi";
import Image from 'next/image'
import Plogin from '../../statics/img/login-head-icon.png'
import P1 from '../../statics/img/Lens.svg'
import P2 from '../../statics/img/change_wallet.svg'
import { profileListState, currentProfileState ,currentLoginProfileState} from "../../store/state";
import { useRouter } from "next/router";
import useWeb3Context from "../../hooks/useWeb3Context";
import { useRecoilValue, useRecoilState } from "recoil";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import ImgLenster from '../../statics/img/lest-head.png'

const ChangeProfile = (props: any) => {
    const profileList = useRecoilValue(profileListState);
    const { account } = useWeb3Context();
    // const [currentProfile, setCurrentProfile] = useRecoilState(currentProfileState);
    const [currentLoginProfile, setCurrentLoginProfile] =
    useRecoilState<any>(currentLoginProfileState);
    const [canLoadAvatar, setCanLoadAvatar] = useState(true);
    const router = useRouter();

    const afterChangeProfile = (profileId: number) => {
        // 如果在 profile 页面，把 profile 也切换掉。
        if (router.pathname === "/profile/[address]") {
            router.push(`/profile/${account}?queryProfileId=${profileId}`);
        }
    };

    const handleOk = () => {
        props.onCancel();
    };

    const handleCancel = () => {
        props.onCancel();
    };

    const getImgUrl = (str: string) => {
        const imgUrl = str.replace("https://ipfs.infura.io", "https://lens.infura-ipfs.io")
        return formatIPFS(imgUrl);
    }

    return (
        <Modal title="Basic Modal" open={true} onOk={handleOk} onCancel={handleCancel}>
            <div className='flex items-center pb-5 border-b-[1px] border-[#4A4A4A] mb-5'>
                <div className='flex items-center'>
                    <span className='font-[600] text-[20px]'>Change Profile</span>
                </div>
                <div className='ml-[auto] cursor-pointer' onClick={() => handleCancel()}>
                    <CloseOutlined className='text-[20px]' />
                </div>
            </div>
            <div className="text-[16px] text-[rgba(255,255,255,0.8)]">
                <div className="text-[rgba(255,255,255,0.8)]">
                    {profileList.map((t: any, i: number) => (
                        <div
                            key={i}
                            onClick={() => { setCurrentLoginProfile(t);handleOk() }}
                            className="cursor-pointer flex py-1 items-center px-1 rounded-[4px] hover:bg-[#555555]"
                        >
                            {
                                t.imageURI &&
                                <img
                                    className="w-[30px] h-[30px] rounded-[15px] mr-2"
                                    src={getImgUrl(t.imageURI)}
                                    alt="" />
                            }
                            {
                                !t.imageURI &&
                                <Image
                                    className="w-[30px] h-[30px] rounded-[15px] mr-2"
                                    src={ImgLenster}
                                    alt="" />
                            }
                            <span>{t.handle}</span>
                            {currentLoginProfile.profileId === t.profileId && <CheckOutlined className="ml-[auto]" />}
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    )
}


export default ChangeProfile
