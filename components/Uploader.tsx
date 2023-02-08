import React from "react";
import { Upload } from "antd";
import type { UploadProps } from "antd";
import { INFURA_PROJECT_ID, INFURA_SECRET } from "../config";

const projectId = INFURA_PROJECT_ID;
const secret = INFURA_SECRET;

// uploader for ipfs
export default function Uploader({ children, onUploaded }) {
  const props: UploadProps = {
    name: "file",
    className: "flex items-center",
    action: "https://ipfs.infura.io:5001/api/v0/add",
    headers: {
      authorization: `Basic ${Buffer.from(
        `${projectId}:${secret}`,
        "utf-8"
      ).toString("base64")}`,
    },
    showUploadList: false,
    onChange: (info) => {
      console.log("info", info);
      if(info.file.status === 'done'){
        onUploaded(info.file.response.Hash)
      }
    },
  };
  return <Upload {...props}>{children}</Upload>;
}
