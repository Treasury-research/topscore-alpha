import React, { useState, useEffect, useRef } from "react";
import api from "../../api";
import { useRouter } from "next/router";
import { Spin } from 'antd'
import { LoadingOutlined } from "@ant-design/icons";
import useLenshubContract from "../../contract/useLenshubContract";

const nft = () => {

    const router = useRouter()

    const [activeProfile, setActiveProfile] = useState<any>({});

    const lenshubContract = useLenshubContract();

    const getActiveProfile = async (address: any, profileId: any) => {
        const res: any = await lenshubContract.getHandle(router.query.profileId);
        console.log(res)
        if (res) {
            router.push(`/profile/${res.split('.lens')[0]}`)
        } else {
            router.push(`/profile/stani`)
        }
    }

    useEffect(() => {
        if (router.query.address && router.query.profileId) {
            getActiveProfile(router.query.address, router.query.profileId)
        }
    }, [router])

    return (
        <div className="w-full h-full bg-[#000] flex text-[#fff]">
            <div className="h-full w-full flex items-center justify-center">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
              </div>
        </div>
    )
}

export default nft
