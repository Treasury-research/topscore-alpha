import React, { useState } from "react";
import { Modal, Switch, Input, Select, InputNumber } from 'antd';
import Image from 'next/image'
import useWeb3Context from "../../hooks/useWeb3Context";
import Plogin from '../../statics/img/login-head-icon.svg'
import PloginLight from '../../statics/img/login-head-icon-light.svg'
import P1 from '../../statics/img/Lens.svg'
import { CloseOutlined } from "@ant-design/icons";
import trace from "../../api/trace";
import {
    themeState
  } from "../../store/state";
  import { useRecoilState } from "recoil";

const SignLens = (props: any) => {
    const { account, connectWallet, chainId, doLogin, doLogout } = useWeb3Context();

    const [theme, setTheme] = useRecoilState(themeState);

    const handleOk = () => {
        props.onCancel();
    };

    const handleCancel = () => {
        props.onCancel();
    };

    const signin = async () => {
        trace('Login-Signin')
        await doLogin();
        handleCancel();
    }

    return (
        <Modal title="Basic Modal" open={true} onOk={handleOk} onCancel={handleCancel}>
            <div className='flex items-center pb-3 border-b-[1px] border-[#ccc] dark:border-[#4A4A4A] mb-2'>
                <div className='flex items-center ml-[-4px]'>
                    <Image
                        src={theme === 'light' ? PloginLight : Plogin}
                        alt=""
                    />
                    <span className='font-[600] text-[20px] ml-1 mt-[-6px]'>Login</span>

                </div>
                <div className='ml-[auto] cursor-pointer' onClick={() => handleCancel()}>
                    <CloseOutlined className='text-[20px]' />
                </div>
            </div>
            <div className="text-[16px] text-[#292A2E] dark:text-[rgba(255,255,255,0.8)]">
                <div className="text-[#73ABFF] dark:text-[#EEFBFF] text-[20px]">Connect your wallet.</div>
                <div className="text-[#6C747D] text-[14px]">Connect with one of available wallet providers or create a new one.</div>
                <div className="mt-4">
                    <button onClick={signin} className="bg-[#73ABFF] dark:bg-[#CE3900] py-2 rounded-[4px] font-[600] flex items-center px-4">
                        <Image
                            src={P1}
                            alt=""
                            className="mr-[10px]"
                        />
                        <span className="text-[#fff]">Sign-in with Lens</span>
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
