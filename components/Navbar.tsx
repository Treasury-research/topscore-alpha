import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import useWeb3Context from "../hooks/useWeb3Context";
import Router, { useRouter } from "next/router";
import Socials from "./Socials";

import IconDark1 from '../statics/img/nav/dark-select/1.png'
import IconDark2 from '../statics/img/nav/dark-select/2.png'
import IconDark3 from '../statics/img/nav/dark-select/3.png'
import IconDark4 from '../statics/img/nav/dark-select/4.png'
import IconDark5 from '../statics/img/nav/dark-select/5.png'

import IconLight1 from '../statics/img/nav/light-select/1.png'
import IconLight2 from '../statics/img/nav/light-select/2.png'
import IconLight3 from '../statics/img/nav/light-select/3.png'
import IconLight4 from '../statics/img/nav/light-select/4.png'
import IconLight5 from '../statics/img/nav/light-select/5.png'

import IconNoSelect1 from '../statics/img/nav/no-select/1.png'
import IconNoSelect2 from '../statics/img/nav/no-select/2.png'
import IconNoSelect3 from '../statics/img/nav/no-select/3.png'
import IconNoSelect4 from '../statics/img/nav/no-select/4.png'
import IconNoSelect5 from '../statics/img/nav/no-select/5.png'

import IconTop from '../statics/img/topIcon.png'
import Soon from '../statics/img/Soon.svg'
import SoonLight from '../statics/img/Soon-light.svg'
import { themeState } from "../store/state";
import { useRecoilState } from "recoil";
import trace from "../api/trace";

const headerTabs = ['Profile', 'Creation', 'Gallery', 'Circle', 'Pass']

const activeLightIcon = [IconLight1, IconLight2, IconLight3, IconLight4, IconLight5]

const activeDarkIcon = [IconDark1, IconDark2, IconDark3, IconDark4, IconDark5]

const activeNoSelectIcon = [IconNoSelect1, IconNoSelect2, IconNoSelect3, IconNoSelect4, IconNoSelect5]

const Navbar = () => {

    const { account } = useWeb3Context();

    const router = useRouter();

    const [theme] = useRecoilState<any>(themeState);

    const getAddress = (item: any, idx: number) => {
        trace(item)
        if (item === 'Profile') {
            router.push(`/profile/stani`)
        }else {
            router.push(`/${item.toLocaleLowerCase()}`)
        }
    }

    return (
        <div className='h-full leading-20 pl-6 pr-6 pt-5 dark:bg-[#16171B] flex flex-col justify-between'>
            <div>
                <div className="flex items-center mb-10 ml-[-10px]">
                    <Image
                        className="mr-1 h-8 w-8"
                        src={IconTop}
                        alt=""
                    />
                    <div className="text-[#292A2E] dark:text-[rgba(255,255,255,0.8)] flex items-baseline">TOPSCORE<span className="text-[12px] text-[#73ABFF] dark:text-[#CE3900] ml-2">ALPHA</span></div>
                </div>
                {
                    headerTabs.map((t: string, i: number) => (
                        <div key={i} className={`${router.pathname.includes(t.toLocaleLowerCase()) ? 'text-[#292A2E] dark:text-[rgba(255,255,255,0.9)] selectNav' : 'text-[rgba(0,0,0,0.5)] dark:text-[rgba(255,255,255,0.5)]'} h-12 flex items-center cursor-pointer w-[160px] rounded-[6px] mb-4 hoverNav`}>
                            <div className="w-full h-full flex items-center" onClick={() => getAddress(t, i)}>
                                <div className="flex">
                                    <div className=" ml-3 mr-2 flex items-center">
                                        <Image
                                            className="mr-1 h-6 w-6"
                                            src={theme === 'light' ? router.pathname.includes(t.toLocaleLowerCase()) ? activeLightIcon[i] : activeNoSelectIcon[i] : theme === 'dark' ? router.pathname.includes(t.toLocaleLowerCase()) ? activeDarkIcon[i] : activeNoSelectIcon[i] : activeNoSelectIcon[i]}
                                            alt=""
                                        />
                                    </div>
                                    <div>{t}</div>
                                    {
                                        t !== 'Creation' && t !== 'Profile' &&
                                        <Image
                                            className="ml-1 mt-[-20px]"
                                            src={theme === 'light' ? SoonLight : Soon}
                                            alt=""
                                        />
                                    }

                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
            <Socials />
        </div>
    )
}

export default Navbar
