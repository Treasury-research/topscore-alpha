import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import useWeb3Context from "../hooks/useWeb3Context";
import ConnectBtn from "../components/ConnectBtn";
import Create from "../components/Create";

const creation = () => {
  const { account } = useWeb3Context();

  return (
    <div className="w-full h-full bg-[#000] flex">
      <Navbar />
      <div className="p-5 w-full text-[#fff] relative overflow-hidden">
        <ConnectBtn type={2}/>
        <Create></Create>
      </div>
    </div>
  );
};

export default creation;
