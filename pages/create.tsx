import React, { useState, useEffect, useCallback } from "react";
import log from "../lib/log";
import Navbar from "../components/Navbar";
import useWeb3Context from "../hooks/useWeb3Context";
import ConnectBtn from "../components/ConnectBtn";
import Create from "../components/Create";

const Post = () => {
  const { account } = useWeb3Context();

  useEffect(() => {
    log("visit_create", account);
  }, []);

  return (
    <div className="w-full h-full bg-[#000] flex">
      <Navbar />
      <div className="p-5 w-full text-[#fff] relative">
        <ConnectBtn />
        <Create></Create>
      </div>
    </div>
  );
};

export default Post;
