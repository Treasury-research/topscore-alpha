import React, { useState, useEffect } from "react";
import { Input } from 'antd';
const { TextArea } = Input;
import Image from 'next/image'
import P1 from '../statics/img/p1.png'
import P2 from '../statics/img/p2.png'
import P3 from '../statics/img/p3.png'
import P4 from '../statics/img/p4.png'
import P5 from '../statics/img/p5.png'
import P6 from '../statics/img/p6.png'
import P7 from '../statics/img/p7.png'

const PostEdit = () => {
    return (
        <div className="bg-[#1A1A1A] p-5 mt-10 mb-10">
            <TextArea rows={4} placeholder="What’s happening?" />
            <div className="flex mt-4">
                <div className="flex items-center justify-center">
                    <Image
                        className="mr-1 cursor-pointer"
                        src={P1}
                        alt=""
                    />
                    <Image
                        className="mr-1 cursor-pointer"
                        src={P2}
                        alt=""
                    />
                    <Image
                        className="mr-1 cursor-pointer"
                        src={P3}
                        alt=""
                    />
                    <Image
                        className="mr-1 cursor-pointer"
                        src={P4}
                        alt=""
                    />
                    <Image
                        className="mr-1 cursor-pointer"
                        src={P5}
                        alt=""
                    />
                    <Image
                        className="mr-1 cursor-pointer"
                        src={P6}
                        alt=""
                    />
                    <Image
                        className="mr-1 cursor-pointer"
                        src={P7}
                        alt=""
                    />
                </div>
                <div className="flex items-center justify-center ml-[auto] bg-[#CE3900] px-4 py-1 cursor-pointer rounded-[4px]">
                    <span>Post</span>
                </div>
            </div>
        </div>
    )
}

export default PostEdit
