import React, { useState, useEffect, useCallback } from "react";
import Navbar from '../components/Navbar'
import Rmodynamics from '../components/Rmodynamics'
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import Creation from '../components/Creation'
import Dashboard from '../components/Dashboard'

const tabs = ['Creation', 'DashBoard']

const Post = () => {

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full h-full bg-[#000] flex">
      <Navbar />
      <div className='p-5 w-full text-[#fff]'>
        <div className='flex mt-4 mb-10'>
          <div className='flex'>
            {
              tabs.map((t: any, i: number) => (
                <div key={i} className={`mr-8 cursor-pointer ${activeTab === i ? 'border-b-[2px] border-[#fff] text-[#fff]' : 'text-[rgba(255,255,255,0.5)]'}`} onClick={() => setActiveTab(i)}>{t}</div>
              ))
            }
          </div>
          <div className='ml-[auto] flex'>
            <div><BellOutlined className="text-[24px] mr-10" /></div>
            <div>
              <UserOutlined className="text-[24px]" />
            </div>
          </div>
        </div>
        {
          activeTab === 0 &&
          <Creation></Creation>
        }
        {
          activeTab === 1 &&
          <Dashboard></Dashboard>
        }
      </div>
    </div>
  )
}

export default Post
