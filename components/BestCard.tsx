import React, { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'
import Router, { useRouter } from "next/router";

const BestCard = (props:any) => {
    
    useEffect(() => {
        console.log('3434',props)
    },[])
    return (
        <div className='w-full bestCard flex'>
            sdf
        </div>
    )
}

export default BestCard
