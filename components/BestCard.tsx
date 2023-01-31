import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import Router, { useRouter } from "next/router";

const BestCard = () => {
    return (
        <div className='w-full bestCard flex'>
            <div className="relative">
                <div className="absolute top-2 left-4 text-[rgb(198,57,3)] font-[600]">Tuesday@16:00</div>
                <div className="absolute bottom-2 left-4 flex">
                    <div className="text-[rgb(198,57,3)] font-[600] mr-2 text-[24px]">4.1K</div>
                    <div className="text-[12px] text-[#000] font-[600]">
                        <div>Followers</div>
                        <div>online</div>
                    </div>
                </div>
                <div className="-rotate-90 absolute right-12 top-2 text-[12px] text-[#000] font-[600]">001</div>
                <div className="absolute right-[120px] bottom-2 text-[12px] text-[#000] font-[600]">001</div>
                <div className="absolute bottom-2 right-2 flex w-[80px] font-[600] text-[12px] text-[#000]">
                    Schedule for
                    Tue, Jul 19
                </div>
            </div>
            <div className="relative">
                <div className="absolute top-2 left-4 text-[rgb(198,57,3)] font-[600]">Tuesday@16:00</div>
                <div className="absolute bottom-2 left-4 flex">
                    <div className="text-[rgb(198,57,3)] font-[600] mr-2 text-[24px]">4.1K</div>
                    <div className="text-[12px] text-[#000] font-[600]">
                        <div>Followers</div>
                        <div>online</div>
                    </div>
                </div>
                <div className="-rotate-90 absolute right-12 top-2 text-[12px] text-[#000] font-[600]">001</div>
                <div className="absolute right-[120px] bottom-2 text-[12px] text-[#000] font-[600]">001</div>
                <div className="absolute bottom-2 right-2 flex w-[80px] font-[600] text-[12px] text-[#000]">
                    Schedule for
                    Tue, Jul 19
                </div>
            </div>
            <div className="relative">
                <div className="absolute top-2 left-4 text-[rgb(198,57,3)] font-[600]">Tuesday@16:00</div>
                <div className="absolute bottom-2 left-4 flex">
                    <div className="text-[rgb(198,57,3)] font-[600] mr-2 text-[24px]">4.1K</div>
                    <div className="text-[12px] text-[#000] font-[600]">
                        <div>Followers</div>
                        <div>online</div>
                    </div>
                </div>
                <div className="-rotate-90 absolute right-12 top-2 text-[12px] text-[#000] font-[600]">001</div>
                <div className="absolute right-[120px] bottom-2 text-[12px] text-[#000] font-[600]">001</div>
                <div className="absolute bottom-2 right-2 flex w-[80px] font-[600] text-[12px] text-[#000]">
                    Schedule for
                    Tue, Jul 19
                </div>
            </div>
        </div>
    )
}

export default BestCard
