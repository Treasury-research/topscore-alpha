import React, { useState } from "react";
import { Modal, Switch, Input, Select, InputNumber } from 'antd';
import Image from 'next/image'
import Plogin from '../../statics/img/login-head-icon.png'
import P1 from '../../statics/img/Lens.svg'
import P2 from '../../statics/img/change_wallet.svg'
import { CloseOutlined,CheckOutlined } from "@ant-design/icons";

const Profiles = [
    "Profile1",
    "Profile1",
    "Profile1",
    "Profile1",
];

const ChangeProfile = (props: any) => {

    const [actTag, setActTag] = useState<any>();


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
                    {Profiles.map((t: any, i: number) => (
                        <div
                            key={i}
                            onClick={() => setActTag(i)}
                            className="cursor-pointer flex items-center px-1 rounded-[4px] hover:bg-[#555555]"
                        >
                            {t}
                            {actTag === i && <CheckOutlined className="ml-[auto]" />}
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    )
}


export default ChangeProfile
