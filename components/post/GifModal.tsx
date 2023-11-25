import React, { useState } from "react";
import { Modal, Switch, Input, Select, InputNumber } from 'antd';
import Image from 'next/image'
import P1 from '../../statics/img/p1.png'
import { CloseOutlined, ClusterOutlined, SwapOutlined, DeploymentUnitOutlined, FieldTimeOutlined, UsergroupAddOutlined } from "@ant-design/icons";

const GifModal = (props: any) => {

    const [isSwitch, setIsSwitch] = useState([false, false, false, false])

    const handleOk = () => {
        props.onCancel();
    };

    const handleCancel = () => {
        props.onCancel();
    };

    const changeSwitch = (e: any, i: number) => {
        setIsSwitch((prev: any) => {
            prev[i] = e;
            return [...prev];
        });
    };

    return (
        <Modal className="default-modal" open={true} onOk={handleOk} onCancel={handleCancel}>
            <div className='flex items-center pb-5 border-b-[1px] border-[#ccc] dark:border-[#4A4A4A] mb-5'>
                <div className='flex items-center'>
                    <Image
                        src={P1}
                        alt=""
                    />
                    <span className='font-[600] text-[20px]'>Select GIF</span>

                </div>
                <div className='ml-[auto] cursor-pointer' onClick={() => handleCancel()}>
                    <CloseOutlined className='text-[20px]' rev={''} />
                </div>
            </div>
            <div className="text-[16px] text-[#292A2E] dark:text-[rgba(255,255,255,0.8)]">
                <Input className="default-input" placeholder="Search for gifs"/>
                <div className="h-[200px]"></div>
            </div>
            <div className="flex w-[fit-content] ml-[auto] mt-5">
                <button onClick={handleCancel} className="w-[100px] text-[18px] font-[600] flex justify-center border-[2px] border-[#ccc] dark:border-[#4A4A4A] mr-2 rounded-[4px]">Cancel</button>
                <button className="w-[100px] text-[18px] font-[600] flex justify-center bg-[#CE3900] hover:opacity-[0.9] rounded-[4px]">Save</button>
            </div>
        </Modal>
    )
}


export default GifModal
