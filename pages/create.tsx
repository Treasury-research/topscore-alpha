import React, { useState, useEffect, useCallback } from "react";
import Navbar from '../components/Navbar'
import Rmodynamics from '../components/Rmodynamics'
import lensApi from "../api/lensApi";
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import Creation from '../components/Creation'
import Dashboard from '../components/Dashboard'
import ConnectBtn from '../components/ConnectBtn'
import Create from '../components/Create'

const tabs = ['Creation', 'DashBoard']

const Post = () => {

  const [activeTab, setActiveTab] = useState(0);



  return (
    <div className="w-full h-full bg-[#000] flex">
      <Navbar />
      <div className='p-5 w-full text-[#fff]'>
        <ConnectBtn />
        {/* <div className='flex mt-4 mb-10'>
          <div className='flex'>
            {
              tabs.map((t: any, i: number) => (
                <div key={i} className={`mr-8 cursor-pointer ${activeTab === i ? 'border-b-[2px] border-[#fff] text-[#fff]' : 'text-[rgba(255,255,255,0.5)]'}`} onClick={() => setActiveTab(i)}>{t}</div>
              ))
            }
          </div>
        </div>
        {
          activeTab === 0 &&
          <Creation></Creation>
        }
        {
          activeTab === 1 &&
          <Dashboard></Dashboard>
        } */}
        <Create></Create>
      </div>
    </div>
  )
}

export default Post
