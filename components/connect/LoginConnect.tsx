import React from "react";
import { Modal } from 'antd';
import Image from 'next/image'
import Plogin from '../../statics/img/login-head-icon.svg'
import PloginLight from '../../statics/img/login-head-icon-light.svg'
import P1 from '../../statics/img/browser.png'
import P2 from '../../statics/img/wallect1.png'
import useWeb3Context from "../../hooks/useWeb3Context";
import { CloseOutlined } from "@ant-design/icons";
import trace from "../../api/trace";
import {
    themeState
  } from "../../store/state";
  import { useRecoilState } from "recoil";

const LoginConnect = (props: any) => {
    const [theme, setTheme] = useRecoilState(themeState);

    const { onConnect } = props

    const {connectWallet} = useWeb3Context();

    const handleOk = () => {
        props.onCancel();
    };

    const handleCancel = () => {
        props.onCancel();
    };

    const connector = async (walletName: string) => {
        const res = await connectWallet(walletName);
        if(res){
            handleCancel();
            onConnect();
        }
        if(walletName === 'injected'){
            trace('Login-BrowserWallet')
        }
        if(walletName === 'walletconnect'){
            trace('Login-WalletConnect')
        }
    }

    return (
        <Modal title="Basic Modal" open={true} onOk={handleOk} onCancel={handleCancel} width={'500px'}>
            <div className='flex items-center pb-3 border-b-[1px] border-[#ccc] dark:border-[#4A4A4A] mb-2'>
                <div className='flex items-center ml-[-4px]'>
                    <Image
                        src={theme === 'light' ? PloginLight : Plogin}
                        alt=""
                    />
                    <div className='font-[600] text-[20px] flex items-center ml-1 mt-[-6px]'>Login</div>
                </div>
                <div className='ml-[auto] cursor-pointer' onClick={() => handleCancel()}>
                    <CloseOutlined className='text-[20px]' rev={''} />
                </div>
            </div>
            <div className="text-[16px] text-[#292A2E] dark:text-[rgba(255,255,255,0.8)]">
                <div className="text-[#73ABFF] dark:text-[#EEFBFF] text-[20px]">Connect your wallet.</div>
                <div className="text-[#6C747D] text-[14px]">Connect with one of available wallet providers or create a new one.</div>
                <div className="mt-4">
                    <div onClick={()=> connector('injected') } className="flex items-center border-[1px] border-[#ccc] dark:border-[#4A4A4A] px-[10px] py-[8px] font-[600] rounded-[4px] mb-[10px] cursor-pointer">
                        <span>Browser Wallet</span>
                        <Image
                            className="ml-[auto]"
                            src={P1}
                            alt=""
                        />
                    </div>
                    <div onClick={()=> connector('walletconnect') } className="flex items-center border-[1px] border-[#ccc] dark:border-[#4A4A4A] px-[10px] py-[8px] font-[600] rounded-[4px] cursor-pointer">
                        <span>WalletConnect</span>
                        <Image
                            className="ml-[auto]"
                            src={P2}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default LoginConnect
