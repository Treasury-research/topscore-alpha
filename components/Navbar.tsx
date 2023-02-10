import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import Router, { useRouter } from "next/router";
import IconSelect1 from '../statics/img/select/icon1.svg'
import IconSelect2 from '../statics/img/select/icon2.svg'
import IconSelect3 from '../statics/img/select/icon3.svg'
import IconSelect4 from '../statics/img/select/Icon4.svg'
import IconSelect5 from '../statics/img/select/Icon6.svg'

import IconNoSelect1 from '../statics/img/noselect/icon1.svg'
import IconNoSelect2 from '../statics/img/noselect/icon2.svg'
import IconNoSelect3 from '../statics/img/noselect/icon3.svg'
import IconNoSelect4 from '../statics/img/noselect/Icon4.svg'
import IconNoSelect5 from '../statics/img/noselect/Icon5.svg'

import IconTop from '../statics/img/topIcon.png'
import Soon from '../statics/img/Soon.svg'
import { currentProfileState } from "../store/state";
import { useRecoilState } from "recoil";

const headerTabs = ['Profile', 'Create', 'Gallery', 'Circle', 'NFT']

const imgSelectUrl = [IconSelect1, IconSelect2, IconSelect3, IconSelect4, IconSelect5]

const imgNoSelectUrl = [IconNoSelect1, IconNoSelect2, IconNoSelect3, IconNoSelect4, IconNoSelect5]

const Navbar = () => {

    const router = useRouter();

    const [activeTab, setActiveTab] = useState(0);

    const [currentProfile] = useRecoilState<any>(currentProfileState);

    const getAddress = (item:any) => {
        if(item === 'Profile'){
            return `/${item.toLocaleLowerCase()}/${currentProfile.address ? currentProfile.address : '0x09c85610154a276a71eb8a887e73c16072029b20'}`
        }else{
            return `/${item.toLocaleLowerCase()}`
        }    
    }
    
    return (
        <div className='h-full leading-20 pl-6 pr-6 pt-10 bg-[#1A1A1A]'>
            <div className="flex items-center mb-10 ml-[-10px]">
                <Image
                    className="mr-1"
                    src={IconTop}
                    alt=""
                />
                <div className="text-[rgba(255,255,255,0.8)]">TOPSCORE<span className="text-[12px] text-[#CE3900]">ALPHA</span></div>
            </div>
            {
                headerTabs.map((t: string, i: number) => (
                    <div key={i} className={`${router.pathname.includes(t.toLocaleLowerCase()) ? 'bg-[rgb(46,35,28)] text-[rgba(255,255,255,0.9)]' : 'text-[rgba(255,255,255,0.5)]'} text-[#fff] h-14 flex items-center cursor-pointer hover:bg-[rgb(46,35,28)] w-[160px]`} onClick={() => setActiveTab(i)}>
                        {
                            t === 'Create' || t === 'Profile' || t === 'NFT' ? (
                                <Link className="w-full h-full flex items-center" href={getAddress(t)}>
                                    <div className="flex">
                                        <Image
                                            className="mr-1 ml-5"
                                            src={router.pathname.includes(t.toLocaleLowerCase()) ? imgSelectUrl[i] : imgNoSelectUrl[i]}
                                            alt=""
                                        />
                                        <div>{t}</div>
                                    </div>
                                </Link>) :
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
    )
}

export default Navbar
