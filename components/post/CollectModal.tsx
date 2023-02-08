import React, { useState } from "react";
import { Modal, Switch, Input, Select, InputNumber } from 'antd';
import Image from 'next/image'
import P4 from '../../statics/img/p4.png'
import { CloseOutlined, ClusterOutlined, SwapOutlined, DeploymentUnitOutlined, FieldTimeOutlined, UsergroupAddOutlined } from "@ant-design/icons";

const CollectModal = (props: any) => {

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
        <Modal title="Basic Modal" open={true} onOk={handleOk} onCancel={handleCancel}>
            <div className='flex items-center pb-5 border-b-[1px] border-[#4A4A4A] mb-5'>
                <div className='flex items-center'>
                    <Image
                        src={P4}
                        alt=""
                    />
                    <span className='font-[600] text-[20px]'>Collect settings</span>

                </div>
                <div className='ml-[auto] cursor-pointer' onClick={() => handleCancel()}>
                    <CloseOutlined className='text-[20px]' />
                </div>
            </div>
            <div className="text-[16px] text-[rgba(255,255,255,0.8)]">
                <div>
                    <div className='flex items-center'>
                        <Switch className='mr-2' checked={isSwitch[0]} onChange={(e: any) => changeSwitch(e, 0)} size="small" />
                        <span className="text-[#6C747D]">This post can be collected</span>
                    </div>
                </div>

                <div className="ml-5">
                    {
                        isSwitch[0] &&
                        <div className="my-3">
                            <div className='flex items-center'>
                                <div className='flex items-center'>
                                    <ClusterOutlined className="text-[18px] mr-2" />
                                </div>
                                <div className="text-[18px]">
                                    Charge for collecting
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <Switch className='mr-2' checked={isSwitch[1]} onChange={(e: any) => changeSwitch(e, 1)} size="small" />
                                <span className="text-[#6C747D]">Get paid whenever someone collects your post</span>
                            </div>
                        </div>
                    }
                    {
                        isSwitch[1] && isSwitch[0] &&
                        <>
                        <div className="mb-2">
                        <div className="flex items-center">
                            <div className="flex-[2] mr-4">
                                <div className="mb-1 text-[16px]">Price</div>
                                <div><Input className="default-input" /></div>
                            </div>
                            <div className="flex-[1]">
                                <div className="mb-1 text-[16px]">Select Currency</div>
                                <div>
                                    <Select
                                        defaultValue="Wrapped Matic"
                                        options={[
                                            { value: 'Wrapped Matic', label: 'Wrapped Matic' },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center mt-3 mb-2'>
                        <div className='flex items-center'>
                            <SwapOutlined className="text-[18px] mr-2" />
                        </div>
                        <div className="text-[18px]">
                            Mirror referral reward
                        </div>
                    </div>
                    <div className="text-[#6C747D] mb-2">Share your collect fee with people who amplify your content</div>
                    <div>
                        <div className="mb-1">Referral fee</div>
                        <div><InputNumber addonAfter="%" defaultValue={0} /></div>

                    </div>
                    <div className="my-3">
                        <div className='flex items-center'>
                            <div className='flex items-center'>
                                <DeploymentUnitOutlined className="text-[18px] mr-2" />
                            </div>
                            <div className="text-[18px]">
                                Limited edition
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <Switch className='mr-2' checked={isSwitch[2]} onChange={(e: any) => changeSwitch(e, 2)} size="small" />
                            <span className="text-[#6C747D]">Make the collects exclusive</span>
                        </div>
                    </div>
                    <div className="my-3">
                        <div className='flex items-center'>
                            <div className='flex items-center'>
                                <FieldTimeOutlined className="text-[18px] mr-2" />
                            </div>
                            <div className="text-[18px]">
                                Time limit
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <Switch className='mr-2' checked={isSwitch[3]} onChange={(e: any) => changeSwitch(e, 3)} size="small" />
                            <span className="text-[#6C747D]">Limit collecting to the first 24h</span>
                        </div>
                    </div>
                        </>
                    }
                    
                    {
                        isSwitch[0] &&
                        <div className="my-3">
                            <div className='flex items-center'>
                                <div className='flex items-center'>
                                    <UsergroupAddOutlined className="text-[18px] mr-2" />
                                </div>
                                <div className="text-[18px]">
                                    Who can collect
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <Switch className='mr-2' checked={isSwitch[4]} onChange={(e: any) => changeSwitch(e, 4)} size="small" />
                                <span className="text-[#6C747D]">Only followers can collect</span>
                            </div>
                        </div>
                    }

                    {/* <div>
                        <div className='flex items-center'>
                            <Switch className='mr-5' checked={isSwitch[0]} onChange={(e: any) => changeSwitch(e, 0)} size="small" />
                            <span className="text-[#6C747D]">This post can be collected</span>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="flex w-[fit-content] ml-[auto]">
                <button onClick={handleCancel} className="w-[100px] text-[18px] font-[600] flex justify-center border-[2px] border-[#4A4A4A] mr-2 rounded-[4px]">Cancel</button>
                <button className="w-[100px] text-[18px] font-[600] flex justify-center bg-[#CE3900] hover:opacity-[0.9] rounded-[4px]">Save</button>
            </div>
        </Modal>
    )
}


export default CollectModal
