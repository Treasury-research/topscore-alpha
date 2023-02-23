import React, { useState } from "react";
import { Modal, Switch, Input, Select, InputNumber } from 'antd';
import Image from 'next/image'
import useWeb3Context from "../../hooks/useWeb3Context";
import Plogin from '../../statics/img/login-head-icon.png'
import P1 from '../../statics/img/Lens.svg'
import P2 from '../../statics/img/change_wallet.svg'
import { CloseOutlined } from "@ant-design/icons";

const SignLens = (props: any) => {
    const { account, connectWallet, chainId, doLogin, doLogout } = useWeb3Context();
    const handleOk = () => {
        props.onCancel();
    };

    const handleCancel = () => {
        props.onCancel();
    };

    const signin = async () => {
        await doLogin();
        handleCancel();
    }

    return (
        <Modal title="Basic Modal" open={true} onOk={handleOk} onCancel={handleCancel}>
            <div className='flex items-center pb-5 border-b-[1px] border-[#4A4A4A] mb-5'>
                <div className='flex items-center'>
                    <Image
                        src={Plogin}
                        alt=""
                    />
                    <span className='font-[600] text-[20px]'>Login</span>

                </div>
                <div className='ml-[auto] cursor-pointer' onClick={() => handleCancel()}>
                    <CloseOutlined className='text-[20px]' />
                </div>
            </div>
            <div className="text-[16px] text-[rgba(255,255,255,0.8)]">
                <div className="text-[#EEFBFF] text-[20px]">Connect your wallet.</div>
                <div className="text-[#6C747D] text-[14px]">Connect with one of our available wallet providers or create a new one.</div>
                <div className="mt-5">
                    <button onClick={signin} className="bg-[#CE3900] px-[8px] py-2 rounded-[4px] font-[600] flex items-center">
                        <Image
                            src={P1}
                            alt=""
                            className="mr-[10px]"
                        />
                        <span>Sign-in with Lens</span>
                    </button>
                    {/* <div className="underline pb-[10px] cursor-pointer flex items-center mt-[10px]">
                        <Image
                            src={P2}
                            alt=""
                            className="mr-[4px]"
                        />
                        <span>Change wallet</span>
                    </div> */}
                </div>
            </div>
        </Modal>
    )
}


export default SignLens
