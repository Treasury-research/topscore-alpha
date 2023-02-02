import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import Router, { useRouter } from "next/router";
import Icon1 from '../statics/img/icon1.svg'
import Icon2 from '../statics/img/icon2.svg'
import Icon3 from '../statics/img/icon3.svg'
import Icon4 from '../statics/img/Gallery.svg'
import Icon5 from '../statics/img/icon5.svg'
import Icon6 from '../statics/img/icon6.svg'
import IconTop from '../statics/img/topIcon.png'
import Soon from '../statics/img/Soon.svg'


const headerTabs = ['Post', 'Gallery', 'Circle']

const rightTabs = ['Lite', 'Pro']

const imgUrl = [Icon1, Icon4, Icon3]

const Navbar = () => {

    const router = useRouter();
    console.log(router);
    const [activeTab, setActiveTab] = useState(0);

    const [activeRightTab, setActiveRightTab] = useState(0);

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
                    <div key={i} className={`${router.pathname.includes(t.toLocaleLowerCase()) ? 'bg-[rgb(46,35,28)]' : ''} text-[#fff] h-14 flex items-center cursor-pointer hover:bg-[rgb(46,35,28) w-[160px]`} onClick={() => setActiveTab(i)}>
                        {
                            t === 'Post' ? (
                                <Link href={`/${t.toLocaleLowerCase()}`}>
                                    <div className="flex">
                                        <Image
                                            className="mr-1 ml-5"
                                            src={imgUrl[i]}
                                            alt=""
                                        />
                                        <div>{t}</div>
                                    </div>
                                </Link>) :
                                (
                                    <div className="flex">
                                        <Image
                                            className="mr-1 ml-5"
                                            src={imgUrl[i]}
                                            alt=""
                                        />
                                        <div>{t}</div>
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
