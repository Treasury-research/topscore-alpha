import React, {useState} from "react";
import { Input } from 'antd';
import lensApi from "../api/lensApi";
import { uploadIpfs } from "../api/ipfs";
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
import { toast } from "react-toastify";

const PostEdit = () => {
    const lenshubContract = useLenshubContract();

    const {account, connectWallet, signMessage, web3, sendTx} = useWeb3Context()

    // const { create, error, isPending } = useCreatePost({ profile, upload });

    const [postContent, setPostContent] = useState<string>('')

    // const doLogin = async () => {
    //     const challenge = (await getChallenge(account || '')).challenge.text;
    //     console.log('aaa', challenge)
    //     const signature = await signMessage(challenge)
    //     console.log('sig', signature)
    // }

    // const getChallenge = async (address: string) => {
    //     return lensApi.getChallenge(address)
    // }

    const doPost = async () => {
        if(!postContent){
            toast.error('No content to post yet')
            return
        }

        const contentURI = uploadIpfs(postContent);

        console.log('aaaa', contentURI)

        const func = await lenshubContract.post({
            profileId: 47107,
            contentURI: "https://hkxkrnbxl4zyr72hcihyp22zz3rzeuy2zsm6kfv6omhak4sskowq.arweave.net/Oq6otDdfM4j_RxIPh-tZzuOSUxrMmeUWvnMOBXJSU60",
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

    return (
        <div className="bg-[#1A1A1A] p-5 mt-10 mb-10">
            {!account && <button onClick={() => connectWallet()} className="flex items-center justify-center mb-4 bg-[#CE3900] px-4 py-1 cursor-pointer rounded-[4px]">
                Connect Wallet
            </button> }

            {/* <LoginButton /> */}
           
            <TextArea value={postContent} onChange={e => setPostContent(e.target.value)} rows={4} placeholder="What’s happening?" />
            <div className="flex mt-4">
                <div className="flex items-center justify-center">
                    <Image
                        className="mr-1 cursor-pointer"
                        src={P1}
                        alt=""
                    />
                    <Image
                        className="mr-1 cursor-pointer"
                        src={P2}
                        alt=""
                    />
                    <Image
                        className="mr-1 cursor-pointer"
                        src={P3}
                        alt=""
                    />
                    <Image
                        className="mr-1 cursor-pointer"
                        src={P4}
                        alt=""
                    />
                    <Image
                        className="mr-1 cursor-pointer"
                        src={P5}
                        alt=""
                    />
                    <Image
                        className="mr-1 cursor-pointer"
                        src={P6}
                        alt=""
                    />
                    <Image
                        className="mr-1 cursor-pointer"
                        src={P7}
                        alt=""
                    />
                </div>
                <div onClick={() => doPost()} className="flex items-center justify-center ml-[auto] bg-[#CE3900] px-4 py-1 cursor-pointer rounded-[4px]">
                    <span>Post</span>
                </div>
            </div>
        </div>
    )
}

export default PostEdit
