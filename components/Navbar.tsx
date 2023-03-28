import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import useWeb3Context from "../hooks/useWeb3Context";
import Router, { useRouter } from "next/router";
import Socials from "./Socials";
import IconSelect1 from '../statics/img/select/icon1.svg'
import IconSelect2 from '../statics/img/select/icon2.svg'
import IconSelect3 from '../statics/img/select/icon3.svg'
import IconSelect4 from '../statics/img/select/icon4.svg'
import IconSelect5 from '../statics/img/select/icon6.svg'

import IconNoSelect1 from '../statics/img/noselect/icon1.svg'
import IconNoSelect2 from '../statics/img/noselect/icon2.svg'
import IconNoSelect3 from '../statics/img/noselect/icon3.svg'
import IconNoSelect4 from '../statics/img/noselect/icon4.svg'
import IconNoSelect5 from '../statics/img/noselect/icon5.svg'

import IconTop from '../statics/img/topIcon.png'
import Soon from '../statics/img/Soon.svg'
import { currentProfileState } from "../store/state";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";

const headerTabs = ['Profile', 'Creation', 'Gallery', 'Circle']

const imgSelectUrl = [IconSelect1, IconSelect2, IconSelect3, IconSelect4, IconSelect5]

const imgNoSelectUrl = [IconNoSelect1, IconNoSelect2, IconNoSelect3, IconNoSelect4, IconNoSelect5]

const Navbar = () => {

    const { account } = useWeb3Context();

    const router = useRouter();

    const [activeTab, setActiveTab] = useState(0);

    const [currentProfile] = useRecoilState<any>(currentProfileState);

    const getAddress = (item: any) => {
        console.log('address', item)
        if (item === 'Profile') {
            // router.push(`/${item.toLocaleLowerCase()}/${currentProfile.address ? currentProfile.address : knn3Address}`)
            router.push(`/${item.toLocaleLowerCase()}/${currentProfile.handle ? currentProfile.handle.split('.')[0] : 'stani'}`)
        }else {
            router.push(`/${item.toLocaleLowerCase()}`)
        }
    }

    return (
        <div className='h-full leading-20 pl-6 pr-6 pt-10 bg-[#1A1A1A] flex flex-col justify-between'>
            <div>
            <div className="flex items-center mb-10 ml-[-10px]">
                <Image
                    className="mr-1 h-8 w-8"
                    src={IconTop}
                    alt=""
                />
                <div className="text-[rgba(255,255,255,0.8)] flex items-center">TOPSCORE<span className="text-[12px] text-[#CE3900] ml-2">ALPHA</span></div>
            </div>
            {
                headerTabs.map((t: string, i: number) => (
                    <div key={i} className={`${router.pathname.includes(t.toLocaleLowerCase()) ? 'bg-[#272727] text-[rgba(255,255,255,0.9)]' : 'text-[rgba(255,255,255,0.5)]'} text-[#fff] h-12 flex items-center cursor-pointer hover:bg-[#272727] w-[160px] rounded-[6px] mb-4`} onClick={() => setActiveTab(i)}>
                        {
                            t === 'Creation' || t === 'Profile' || t === 'NFT' ? (
                                <div className="w-full h-full flex items-center" onClick={() => getAddress(t)}>
                                    <div className="flex">
                                        <div className="w-[40px] flex mr-1">
                                            <Image
                                                className="ml-[auto]"
                                                src={router.pathname.includes(t.toLocaleLowerCase()) ? imgSelectUrl[i] : imgNoSelectUrl[i]}
                                                alt=""
                                            />
                                        </div>
                                        <div>{t}</div>
                                    </div>
                                </div>) :
                                (
                                    <div className="flex">
                                        <Image
                                            className="mr-1 ml-5"
                                            src={imgNoSelectUrl[i]}
                                            alt=""
                                        />
                                        <div className="text-[rgba(255,255,255,0.5)]">{t}</div>
                                        <Image
                                            className="ml-1 mt-[-20px]"
                                            src={Soon}
                                            alt=""
                                        />
                                    </div>
                                )
                        }

                    </div>
                ))
            }
            </div>

            <Socials />
        </div>
    )
}

export default Navbar
