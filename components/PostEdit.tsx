import React, { useState } from "react";
import { Input, Popover, Modal } from 'antd';
import lensApi from "../api/lensApi";
import { uploadIpfs, formatToIpfs } from "../api/ipfs";
import { createPostMetadata } from "../api/post";
import config from "../config";
const { TextArea } = Input;
import useWeb3Context from '../hooks/useWeb3Context'
import useLenshubContract from '../contract/useLenshubContract';
import Image from 'next/image'
import P1 from '../statics/img/p1.png'
import P2 from '../statics/img/p2.png'
import P3 from '../statics/img/p3.png'
import P4 from '../statics/img/p4.png'
import P5 from '../statics/img/p5.png'
import P6 from '../statics/img/p6.png'
import P7 from '../statics/img/p7.png'
import { FileImageOutlined, VideoCameraOutlined, CustomerServiceOutlined, CheckOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import CollectModal from "./post/CollectModal"
import GifModal from "./post/GifModal"

const UpLoadPopover = () => {
    return (
        <div className="text-[rgba(255,255,255,0.8)]">
            <div className="cursor-pointer flex items-center"><FileImageOutlined className="mr-1" />Upload image(s)</div>
            <div className="cursor-pointer flex items-center"><VideoCameraOutlined className="mr-1" />Upload video</div>
            <div className="cursor-pointer flex items-center"><CustomerServiceOutlined className="mr-1" />Upload audio</div>
        </div>
    )
}

const PermitPopover = () => {

    const popTags = ['Everyone', 'My followers', 'My follows', 'Friends of friends']

    const [actTag, setActTag] = useState<any>()

    return (
        <div className="text-[rgba(255,255,255,0.8)] w-[160px]">
            {
                popTags.map((t: any, i: number) => (
                    <div key={i} onClick={() => setActTag(i)} className="cursor-pointer flex items-center px-1 rounded-[4px] hover:bg-[#555555]">{t}
                        {
                            actTag === i &&
                            <CheckOutlined className="ml-[auto]" />
                        }
                    </div>
                ))
            }
        </div>
    )
}

const PostEdit = () => {
    const lenshubContract = useLenshubContract();

    const { account, connectWallet, signMessage, web3, sendTx } = useWeb3Context()

    const [postContent, setPostContent] = useState<string>('')

    const [showModal, setShowModal] = useState([false, false])

    const doLogin = async () => {
        const challenge = (await lensApi.getChallenge(account || '')).challenge.text;
        const signature = await signMessage(challenge)
        console.log('sig', signature)
        const token = (await lensApi.getAccessToken(account, signature)).authenticate;
        console.log('token', token)
        sessionStorage.setItem('accessToken', token.accessToken);
        lensApi.setToken(token.accessToken);
    }

    const doApiPost = async () => {
        if(!postContent){
            toast.error('No content to post yet')
            return
        }
        
        const metadataContent = createPostMetadata(postContent, 'attend.lens')

        const ipfsRaw = await uploadIpfs(metadataContent);

        const contentURI = formatToIpfs(ipfsRaw.path)


        const res = (await lensApi.post(47107, contentURI, {
            revertCollectModule: true
        }, {
            followerOnlyReferenceModule: false
          })).createPostTypedData

          console.log('typedData', account, JSON.stringify(res.typedData))
   
          const msgParams = JSON.stringify({
            "types": {
                "PostWithSig": [
                    {
                        "name": "profileId",
                        "type": "uint256",
                        "__typename": "EIP712TypedDataField"
                    },
                    {
                        "name": "contentURI",
                        "type": "string",
                        "__typename": "EIP712TypedDataField"
                    },
                    {
                        "name": "collectModule",
                        "type": "address",
                        "__typename": "EIP712TypedDataField"
                    },
                    {
                        "name": "collectModuleInitData",
                        "type": "bytes",
                        "__typename": "EIP712TypedDataField"
                    },
                    {
                        "name": "referenceModule",
                        "type": "address",
                        "__typename": "EIP712TypedDataField"
                    },
                    {
                        "name": "referenceModuleInitData",
                        "type": "bytes",
                        "__typename": "EIP712TypedDataField"
                    },
                    {
                        "name": "nonce",
                        "type": "uint256",
                        "__typename": "EIP712TypedDataField"
                    },
                    {
                        "name": "deadline",
                        "type": "uint256",
                        "__typename": "EIP712TypedDataField"
                    }
                ],
                "__typename": "CreatePostEIP712TypedDataTypes"
            },
            "domain": {
                "name": "Lens Protocol Profiles",
                "chainId": 137,
                "version": "1",
                "verifyingContract": "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d",
                "__typename": "EIP712TypedDataDomain"
            },
            "value": {
                "nonce": 0,
                "deadline": 1675769982,
                "profileId": "0xb803",
                "contentURI": "https://arweave.net/zL4krdqP7IrPBmfK-owUN566zmTp5UF78pHsx9mXPwg",
                "collectModule": "0xa31FF85E840ED117E172BC9Ad89E55128A999205",
                "collectModuleInitData": "0x",
                "referenceModule": "0x0000000000000000000000000000000000000000",
                "referenceModuleInitData": "0x",
                "__typename": "CreatePostEIP712TypedDataValue"
            },
            "__typename": "CreatePostEIP712TypedData"
        })
  
          const signRes = await web3.currentProvider.sendAsync({
            method: "eth_signTypedData_v4",
            params: [account, JSON.stringify(msgParams)],
            from: account,
          })

        console.log('aaaa', res, signRes)
    }

    const doPost = async () => {
        if (!postContent) {
            toast.error('No content to post yet')
            return
        }

        const metadataContent = createPostMetadata(postContent, 'attend.lens')

        const ipfsRaw = await uploadIpfs(metadataContent);

        const contentURI = formatToIpfs(ipfsRaw.path)

        const func = await lenshubContract.post({
            profileId: 47107,
            contentURI,
            collectModule: config.contracts.FreeCollectModule,
            collectModuleInitData: web3.eth.abi.encodeParameters(["bool"], [true]),
            referenceModule: config.zeroAddress,
            referenceModuleInitData: web3.eth.abi.encodeParameters([], [])
        })

        console.log('fff', func)
        // await create({
        //   profileId: '1',
        //   content,
        //   contentFocus: ContentFocus.TEXT,
        //   locale: 'en',
        //   collect: {
        //     type: CollectPolicyType.NO_COLLECT
        //   },
        //   reference: ReferencePolicy.ANYBODY
        // });
    };

    const handleShowModal = (show: boolean, i: number) => {
        setShowModal((pre) => {
            pre[i] = show
            return [...pre]
        })
    }

    return (
        <div className="bg-[#1A1A1A] p-5 mt-10 mb-10">
            {account ? <button onClick={() => doLogin()} className="flex items-center justify-center mb-4 bg-[#CE3900] px-4 py-1 cursor-pointer rounded-[4px]">
                Login
            </button> : <button onClick={() => connectWallet()} className="flex items-center justify-center mb-4 bg-[#CE3900] px-4 py-1 cursor-pointer rounded-[4px]">
                Connect Wallet
            </button>}

            <TextArea value={postContent} onChange={e => setPostContent(e.target.value)} rows={4} placeholder="What’s happening?" />
            <div className="flex mt-4">
                <div className="flex items-center justify-center">
                    <Popover content={UpLoadPopover} placement="bottom">
                        <Image
                            className="mr-1 cursor-pointer"
                            src={P1}
                            alt=""
                        />
                    </Popover>

                    <Image
                        className="mr-1 cursor-pointer"
                        src={P2}
                        onClick={() => handleShowModal(true, 1)}
                        alt=""
                    />
                    {/* <Image
                        className="mr-1 cursor-pointer"
                        src={P3}
                        alt=""
                    /> */}
                    <Image
                        className="mr-1 cursor-pointer"
                        onClick={() => handleShowModal(true, 0)}
                        src={P4}
                        alt=""
                    />
                    {/* <Image
                        className="mr-1 cursor-pointer"
                        src={P5}
                        alt=""
                    /> */}
                    <Popover content={PermitPopover} placement="bottom">
                        <Image
                            className="mr-1 cursor-pointer"
                            src={P6}
                            alt=""
                        />
                    </Popover>
                    {/* <Image
                        className="mr-1 cursor-pointer"
                        src={P7}
                        alt=""
                    /> */}
                </div>
                {/* <div onClick={() => doApiPost()} className="flex items-center justify-center ml-[auto] bg-[#CE3900] px-4 py-1 cursor-pointer rounded-[4px]">
                    <span>Post</span>
                </div> */}
                <button onClick={() => doApiPost()} className="w-[100px] text-[18px] py-1 flex ml-[auto] justify-center bg-[#CE3900] hover:opacity-[0.8] rounded-[4px]"><span>Post</span></button>
            </div>
            {
                showModal[0] &&
                <CollectModal onCancel={() => handleShowModal(false, 0)} />
            }

            {
                showModal[1] &&
                <GifModal onCancel={() => handleShowModal(false, 1)} />
            }
        </div>
    )
}

export default PostEdit
