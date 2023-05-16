import React, { useState, useEffect } from "react";
import { Modal } from 'antd';
import { Spin } from 'antd'

import {
    themeState
  } from "../../store/state";
  import { useRecoilState } from "recoil";

const Loading = (props: any) => {

    const [theme, setTheme] = useRecoilState(themeState);

    return (
        <Modal open={true} width={300} centered>
            <div className="h-[200px] w-full flex items-center justify-center">
                <Spin size="large" className="large-loading"/>
              </div>
        </Modal>
    )
}


export default Loading
