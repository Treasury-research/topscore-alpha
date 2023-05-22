import React, { useState, useEffect } from "react";
import { Modal, Switch, Input, Select, InputNumber } from 'antd';
import ImgSuccessLeft from "../../statics/img/pass/config-success-left.png";
import ImgSuccessRight from "../../statics/img/pass/config-success-right.png";
import ImgDarkDescord from "../../statics/img/pass/have/dark/12.png";
import ImgDarkGithub from "../../statics/img/pass/have/dark/14.png";
import ImgDarkExchange from "../../statics/img/pass/have/dark/15.png";
import ImgDarkGmail from "../../statics/img/pass/have/dark/17.png";

import ImgLightDescord from "../../statics/img/pass/have/light/12.png";
import ImgLightGithub from "../../statics/img/pass/have/light/14.png";
import ImgLightExchange from "../../statics/img/pass/have/light/15.png";
import ImgLightGmail from "../../statics/img/pass/have/light/17.png";

import Image from "next/image";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import {
    themeState
  } from "../../store/state";
  import { useRecoilState } from "recoil";

const imgsDark = [ImgDarkDescord,ImgDarkGithub,ImgDarkExchange,ImgDarkGmail]
const imgsLight = [ImgLightDescord,ImgLightGithub,ImgLightExchange,ImgLightGmail]

const PassSuccess = (props: any) => {

    const [theme, setTheme] = useRecoilState(themeState);

    const handleOk = () => {
        props.onCancel();
    };

    const handleCancel = () => {
        props.onCancel();
    };

    const getImgSrc = () => {
        if(props.type === 'github'){
            return theme === 'light' ? imgsLight[1] : imgsDark[1]
        }else if(props.type === 'discord'){
            return theme === 'light' ? imgsLight[0] : imgsDark[0]
        }else if(props.type === 'stackexchange'){
            return theme === 'light' ? imgsLight[2] : imgsDark[2]
        }else if(props.type === 'gmail'){
            return theme === 'light' ? imgsLight[3] : imgsDark[3]
        }
    }

    return (
        <Modal open={true} onOk={handleOk} onCancel={handleCancel} className='w-[400px]' width={400} centered>
            <div className='flex items-center'>
                <div className='ml-[auto] cursor-pointer' onClick={() => handleCancel()}>
                    <CloseOutlined className='text-[20px] hover:scale-110 transition-all' />
                </div>
            </div>
            <div className="flex items-center justify-center">
                <Image src={ImgSuccessLeft} alt='' />
                <div className="mx-4 text-[24px] font-[600]">Congratulations</div>
                <Image src={ImgSuccessRight} alt='' />
            </div>
            <div className="flex items-center justify-center my-8">
                <Image src={getImgSrc()} alt='' />
            </div>
            <div className="dash-bg-style w-[140px] mx-[auto] flex items-center justify-center text-[18px] font-[600] h-[40px] cursor-pointer" onClick={() => handleCancel()}>Done</div>
        </Modal>
    )
}

export default PassSuccess
