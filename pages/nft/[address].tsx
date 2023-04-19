import React, { useState, useEffect, useRef } from "react";
import api from "../../api";
import { useRouter } from "next/router";
import { Spin } from 'antd'
import { LoadingOutlined } from "@ant-design/icons";

const nft = () => {

    const router = useRouter()
    
    const [activeProfile, setActiveProfile] = useState<any>({});

    const getActiveProfile = async (address: any, profileId: any) => {
        const res: any = await api.get(`/lens/handles/${address}`);
        console.log('res', res)
        const filtered = res.data.filter((item: any) => item.profileId == profileId)[0]
        if (filtered && filtered.handle) {
            router.push(`/profile/${filtered.handle.split('.lens')[0]}`)
        } else {
            router.push(`/profile/stani`)
        }
    }

    useEffect(() => {
        console.log(router)
        if (router.query.address && router.query.profileId) {

            getActiveProfile(router.query.address, router.query.profileId)
        }
    }, [router])

    return (
        <div className="w-full h-full bg-[#000] flex">
            <div className="h-full w-full flex items-center justify-center">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
              </div>
        </div>
    )
}

export default nft
