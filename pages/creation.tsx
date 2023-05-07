import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import useWeb3Context from "../hooks/useWeb3Context";
import ConnectBtn from "../components/ConnectBtn";
import Create from "../components/Create";

const creation = () => {
  const { account } = useWeb3Context();

  return (
    <div className="w-full h-full bg-[#fff] dark:bg-[#16171B] flex">
      <Navbar />
      <div className="py-5 w-full text-[#292A2E] dark:text-[#fff] relative overflow-hidden pr-5">
        <ConnectBtn type={2}/>
        <Create></Create>
      </div>
    </div>
  );
};

export default creation;
