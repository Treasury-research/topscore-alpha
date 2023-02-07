import React, { useState, useEffect } from "react";
import config from "../config";
import { shortenAddr, switchChain } from "../lib/tool";
import useWeb3Context from "../hooks/useWeb3Context";
import { message } from 'antd'
import { useRouter } from "next/router";
import api from "../api";

const ConnectBtn = () => {
    const router = useRouter()
    const { account, connectWallet, chainId } = useWeb3Context();

    const [handlesList, setHandlesList] = useState<any>([]);

    useEffect(() => {
        if (!account) {
            return;
        }
        getLensHandle();
    }, [account]);

    useEffect(() => {
        if(router.pathname === '/profile/[address]'){
            goProfile()
        }
    }, [handlesList]);

    const getLensHandle = async () => {
        const res: any = await api.get(`/lens/handles/${account}`);
        setHandlesList(res.data);
    };

    const goProfile = () => {
        if (handlesList.length > 0) {
            router.push(`/profile/${account}`);
        } else {
            message.info("You must have a Lens Protocol Profile");
            router.push(`/profile/0x09c85610154a276a71eb8a887e73c16072029b20`);
        }
    };

    return (
        <div className='w-full h-10'>
            {account ? (
                <>
                    {account && chainId && config.chainId !== chainId ? (
                        <button onClick={() => switchChain(config.chainId)} className="h-full px-4 float-right flex justify-center items-center bg-[#4D0F00] text-[rgba(255,255,255,0.8)]">Switch to polygon</button>
                    ) :
                        <button className="h-full px-4 float-right flex justify-center items-center bg-[#4D0F00] text-[rgba(255,255,255,0.8)]">{shortenAddr(account)}</button>
                    }
                </>
            ) : (
                <button onClick={() => connectWallet()} className="h-full px-4 float-right flex justify-center items-center bg-[#4D0F00] text-[rgba(255,255,255,0.8)]">Connect Wallet</button>
            )}

        </div>
    )
}

export default ConnectBtn
