import React, { useState, useEffect, useCallback } from "react";
import Navbar from '../components/Navbar'
import ConnectBtn from '../components/ConnectBtn'
import Create from '../components/Create'

const Post = () => {

  return (
    <div className="w-full h-full bg-[#000] flex">
      <Navbar />
      <div className='p-5 w-full text-[#fff] relative'>
        <ConnectBtn />
        <Create></Create>
      </div>
    </div>
  )
}

export default Post
