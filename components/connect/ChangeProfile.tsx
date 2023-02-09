import React, { useState } from "react";
import { Modal, Switch, Input, Select, InputNumber } from 'antd';
import Image from 'next/image'
import Plogin from '../../statics/img/login-head-icon.png'
import P1 from '../../statics/img/Lens.svg'
import P2 from '../../statics/img/change_wallet.svg'
import { profileListState, currentProfileState } from "../../store/state";
import { useRouter } from "next/router";
import useWeb3Context from "../../hooks/useWeb3Context";
import { useRecoilValue, useRecoilState } from "recoil";
import { CloseOutlined,CheckOutlined } from "@ant-design/icons";

const ChangeProfile = (props: any) => {
    const profileList = useRecoilValue(profileListState);
    const { account } = useWeb3Context();
    const [currentProfile, setCurrentProfile] = useRecoilState(currentProfileState);
    const [actTag, setActTag] = useState<any>();
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

                            onClick={() =>{ setCurrentProfile(t); afterChangeProfile(t.profileId); handleOk()}}
                            className="cursor-pointer flex items-center px-1 rounded-[4px] hover:bg-[#555555]"
                        >
                            {t.handle}
                            {currentProfile.profileId === t.profileId && <CheckOutlined className="ml-[auto]" />}
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    )
}


export default ChangeProfile
