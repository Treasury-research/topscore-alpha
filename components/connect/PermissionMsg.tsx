import React, { useState } from "react";
import { Modal, Switch, Input, Select, InputNumber } from 'antd';
import Image from 'next/image'
import Plogin from '../../statics/img/login-head-icon.png'
import P1 from '../../statics/img/Lens.svg'
import P2 from '../../statics/img/change_wallet.svg'
import { CloseOutlined } from "@ant-design/icons";
import IconError from '../../statics/img/error.png'
import IconOpensea from '../../statics/img/opensea.png'

const PermissionMsg = (props: any) => {

    const {msg,link} = props.info

    const handleOk = () => {
        props.onCancel();
    };

    const handleCancel = () => {
        props.onCancel();
    };

    return (
        <Modal title="Basic Modal" open={true} onOk={handleOk} onCancel={handleCancel} className='permission-msg'>
            <div className='flex items-center pb-5'>
                <div className='ml-[auto] cursor-pointer' onClick={() => handleCancel()}>
                    <CloseOutlined className='text-[20px]' />
                </div>
            </div>
            <div className="flex">
                <Image
                    className="h-[fit-content] mr-[10px]"
                    src={IconError}
                    alt=""
                />
                <div className="text-[rgba(255,255,255,0.8)]">
                    <p className="mt-1">{msg}</p>
                </div>
            </div>
            <div className="flex py-1 px-3 rounded-[20px] radius-btn-shadow w-[fit-content] items-center justify-center cursor-pointer ml-[auto] mt-5 bg-[rgba(0,0,0,0.4)]"
             onClick={() => window.open(`${link}`, '_blank')}>
                <Image
                    className="h-[fit-content] mr-[10px] cursor-pointer h-[20px] w-[20px]"
                    src={IconOpensea}
                    onClick={() => window.open(`${link}`)}
                    alt=""
                />
                <span>Opensea</span>
            </div>

        </Modal>
    )
}


export default PermissionMsg
