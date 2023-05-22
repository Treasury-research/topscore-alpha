import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import ConnectBtn from '../components/ConnectBtn'
import PassSuccess from '../components/passSuccess'
import PassLoading from '../components/passSuccess/loading'
import Image from "next/image";

import Img1 from "../statics/img/pass/dark/1.png";
import Img2 from "../statics/img/pass/dark/2.png";
import Img3 from "../statics/img/pass/dark/3.png";
import Img4 from "../statics/img/pass/dark/4.png";
import Img5 from "../statics/img/pass/dark/5.png";
import Img6 from "../statics/img/pass/dark/6.png";
import Img7 from "../statics/img/pass/dark/7.png";
import Img8 from "../statics/img/pass/dark/8.png";
import Img9 from "../statics/img/pass/dark/9.png";
import Img10 from "../statics/img/pass/dark/10.png";
import Img11 from "../statics/img/pass/dark/11.png";
import Img12 from "../statics/img/pass/dark/12.png";
import Img13 from "../statics/img/pass/dark/13.png";
import Img14 from "../statics/img/pass/dark/14.png";
import Img15 from "../statics/img/pass/dark/15.png";
import Img16 from "../statics/img/pass/dark/16.png";
import Img17 from "../statics/img/pass/dark/17.png";
import Img18 from "../statics/img/pass/dark/18.png";
import Img19 from "../statics/img/pass/dark/19.png";

import ImgLight1 from "../statics/img/pass/light/1.png";
import ImgLight2 from "../statics/img/pass/light/2.png";
import ImgLight3 from "../statics/img/pass/light/3.png";
import ImgLight4 from "../statics/img/pass/light/4.png";
import ImgLight5 from "../statics/img/pass/light/5.png";
import ImgLight6 from "../statics/img/pass/light/6.png";
import ImgLight7 from "../statics/img/pass/light/7.png";
import ImgLight8 from "../statics/img/pass/light/8.png";
import ImgLight9 from "../statics/img/pass/light/9.png";
import ImgLight10 from "../statics/img/pass/light/10.png";
import ImgLight11 from "../statics/img/pass/light/11.png";
import ImgLight12 from "../statics/img/pass/light/12.png";
import ImgLight13 from "../statics/img/pass/light/13.png";
import ImgLight14 from "../statics/img/pass/light/14.png";
import ImgLight15 from "../statics/img/pass/light/15.png";
import ImgLight16 from "../statics/img/pass/light/16.png";
import ImgLight17 from "../statics/img/pass/light/17.png";
import ImgLight18 from "../statics/img/pass/light/18.png";
import ImgLight19 from "../statics/img/pass/light/19.png";

import ImgHaveDark1 from "../statics/img/pass/have/dark/1.png";
import ImgHaveDark2 from "../statics/img/pass/have/dark/2.png";
import ImgHaveDark3 from "../statics/img/pass/have/dark/3.png";
import ImgHaveDark4 from "../statics/img/pass/have/dark/4.png";
import ImgHaveDark5 from "../statics/img/pass/have/dark/5.png";
import ImgHaveDark6 from "../statics/img/pass/have/dark/6.png";
import ImgHaveDark7 from "../statics/img/pass/have/dark/7.png";
import ImgHaveDark8 from "../statics/img/pass/have/dark/8.png";
import ImgHaveDark9 from "../statics/img/pass/have/dark/9.png";
import ImgHaveDark10 from "../statics/img/pass/have/dark/10.png";
import ImgHaveDark11 from "../statics/img/pass/have/dark/11.png";
import ImgHaveDark12 from "../statics/img/pass/have/dark/12.png";
import ImgHaveDark13 from "../statics/img/pass/have/dark/13.png";
import ImgHaveDark14 from "../statics/img/pass/have/dark/14.png";
import ImgHaveDark15 from "../statics/img/pass/have/dark/15.png";
import ImgHaveDark16 from "../statics/img/pass/have/dark/16.png";
import ImgHaveDark17 from "../statics/img/pass/have/dark/17.png";
import ImgHaveDark18 from "../statics/img/pass/have/dark/18.png";
import ImgHaveDark19 from "../statics/img/pass/have/dark/19.png";

import ImgHaveLight1 from "../statics/img/pass/have/light/1.png";
import ImgHaveLight2 from "../statics/img/pass/have/light/2.png";
import ImgHaveLight3 from "../statics/img/pass/have/light/3.png";
import ImgHaveLight4 from "../statics/img/pass/have/light/4.png";
import ImgHaveLight5 from "../statics/img/pass/have/light/5.png";
import ImgHaveLight6 from "../statics/img/pass/have/light/6.png";
import ImgHaveLight7 from "../statics/img/pass/have/light/7.png";
import ImgHaveLight8 from "../statics/img/pass/have/light/8.png";
import ImgHaveLight9 from "../statics/img/pass/have/light/9.png";
import ImgHaveLight10 from "../statics/img/pass/have/light/10.png";
import ImgHaveLight11 from "../statics/img/pass/have/light/11.png";
import ImgHaveLight12 from "../statics/img/pass/have/light/12.png";
import ImgHaveLight13 from "../statics/img/pass/have/light/13.png";
import ImgHaveLight14 from "../statics/img/pass/have/light/14.png";
import ImgHaveLight15 from "../statics/img/pass/have/light/15.png";
import ImgHaveLight16 from "../statics/img/pass/have/light/16.png";
import ImgHaveLight17 from "../statics/img/pass/have/light/17.png";
import ImgHaveLight18 from "../statics/img/pass/have/light/18.png";
import ImgHaveLight19 from "../statics/img/pass/have/light/19.png";


import Mask1 from "../statics/img/pass/mask1.png";
import Mask2 from "../statics/img/pass/mask2.png";
import Mask3 from "../statics/img/pass/mask3.png";
import Mask4 from "../statics/img/pass/mask4.png";

import MaskLight1 from "../statics/img/pass/mask1-light.png";
import MaskLight2 from "../statics/img/pass/mask2-light.png";
import MaskLight3 from "../statics/img/pass/mask3-light.png";
import MaskLight4 from "../statics/img/pass/mask4-light.png";

import VerifileLight from "../statics/img/pass/verifile-light.png";
import VerifileDark from "../statics/img/pass/verifile-dark.png";

import NoProfileDark from "../statics/img/pass/noProfile-dark.png";
import NoProfileLight from "../statics/img/pass/noProfile-light.png";


import VectorDark from "../statics/img/pass/vector-dark.png";
import VectorLight from "../statics/img/pass/vector-light.png";

import lensApi from "../api/lensApi";
import ImgLensterHead from "../statics/img/lest-head.svg";
import { formatIPFS } from "../lib/tool";
import api from "../api";
import bindApi from "../api/userBind";
import useProofContract from "../contract/useProofContract";
import { switchChain } from "../lib/tool";
import useWeb3Context from "../hooks/useWeb3Context";
import config from "../config";
import { Popover } from 'antd';
import {
  themeState,
  currentLoginProfileState
} from "../store/state";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const darkNotHaveImg = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10]

const lightNotHaveImg = [ImgLight1, ImgLight2, ImgLight3, ImgLight4, ImgLight5, ImgLight6, ImgLight7, ImgLight8, ImgLight9, ImgLight10]

const haveDarkImg = [ImgHaveDark1, ImgHaveDark2, ImgHaveDark3, ImgHaveDark4, ImgHaveDark5, ImgHaveDark6, ImgHaveDark7, ImgHaveDark8, ImgHaveDark9, ImgHaveDark10]

const haveLightImg = [ImgHaveLight1, ImgHaveLight2, ImgHaveLight3, ImgHaveLight4, ImgHaveLight5, ImgHaveLight6, ImgHaveLight7, ImgHaveLight8, ImgHaveLight9, ImgHaveLight10]

const initWebInfo = [
  {
    key: 'bab',
    imgIdx: 0,
    status: 'Ineligible'
  },
  {
    key: 'lens',
    imgIdx: 2,
    status: 'Ineligible'
  },
  {
    key: 'ens',
    imgIdx: 3,
    status: 'Ineligible'
  },
  {
    key: 'spaceId',
    imgIdx: 4,
    status: 'Ineligible'
  },
  {
    key: 'snapshot',
    imgIdx: 6,
    status: 'Ineligible'
  },
  {
    key: 'nft',
    imgIdx: 7,
    status: 'Ineligible'
  },
  {
    key: 'poap',
    imgIdx: 8,
    status: 'Ineligible'
  },

  {
    key: 'prof',
    imgIdx: 1,
    status: 'Soon'
  },
  {
    key: 'degenScore',
    imgIdx: 5,
    status: 'Soon'
  },
  {
    key: 'gitpoap',
    imgIdx: 9,
    status: 'Soon'
  },
]

const scoreToolConfig = [
  {
    key: 'bab',
    name: 'BABT',
    score: 30,
  },
  {
    key: 'lens',
    name: 'LENS',
    score: 15,
  },
  {
    key: 'ens',
    name: 'ENS',
    score: 5,
  },
  {
    key: 'spaceId',
    name: 'Space ID',
    score: 5,
  },
  {
    key: 'snapshot',
    name: 'Snapshot',
    score: 5,
  },
  {
    key: 'nft',
    name: 'NFT',
    score: 5,
  },
  {
    key: 'poap',
    name: 'POAP',
    score: 5,
  },
  {
    key: 'discord',
    name: 'Discord',
    score: 10,
  },
  {
    key: 'github',
    name: 'Github',
    score: 10,
  },
  {
    key: 'exchange',
    name: 'Stack Overflow',
    score: 10,
  }
]

const getToolTipContent = (data: any) => {

  const [theme, setTheme] = useRecoilState(themeState);

  const [resData, setResData] = useState([]);

  useEffect(() => {
    let res = []
    scoreToolConfig.map((t) => {
      if (t.key && data[t.key]) {
        res.push(t)
      }
    })
    setResData(res)
  }, [data])

  return (
    <div>
      {
        resData.map((t, i) => (
          <div className='flex items-center' key={i}>
            <div className='flex items-center'>
              <Image
                src={theme === 'light' ? VerifileLight : VerifileDark}
                className='mr-2 h-[10px] w-[10px]'
                alt="" />
            </div>
            <span className='mr-1 text-[#656565] dark:text-[#D1D1D1] flex items-center text-[18px] font-[600]'>
              {t.name}:
            </span>
            <span className='mr-1 text-[18px] font-[600] flex items-center'>+{t.score}</span>
            <span>(Verified)</span>
          </div>
        ))
      }
    </div>
  )
}

const getSocialTooltip = (name) => {

  const [theme, setTheme] = useRecoilState(themeState);

  return (
    <div>
      <div className='flex items-center'>
        <div className='flex items-center'>
          <Image
            src={theme === 'light' ? VerifileLight : VerifileDark}
            className='mr-2 h-[10px] w-[10px]'
            alt="" />
        </div>
        <span className='mr-1 text-[#656565] dark:text-[#D1D1D1] flex items-center text-[18px] font-[600]'>
          {name}
        </span>
      </div>
    </div>
  )
}

const pass = () => {
  const router = useRouter();

  const { chainId } = useWeb3Context();

  const proofContract = useProofContract();

  const [theme,] = useRecoilState(themeState);

  const [introduce, setIntroduce] = useState<any>('')

  const [loginRes, setLoginRes] = useState<any>({})

  const [totalScroe, setTotalScroe] = useState<any>(0)

  const [onChains, setOnChains] = useState<any>(initWebInfo)

  const [showSuccess, setShowSuccess] = useState<any>(false)

  const [loginType, setLoginType] = useState<any>('')

  const [loginLoading, setLoginLoading] = useState<any>(false)

  const [currentLoginProfile,] =
    useRecoilState<any>(currentLoginProfileState);

  const getIntroduce = async () => {
    const res = await lensApi.getProfileByHandle(currentLoginProfile.handle);
    if (res && res.bio) {
      setIntroduce(res.bio)
    } else {
      setIntroduce('')
    }
  }

  const getImgUrl = (str: string) => {
    const imgUrl = str.replace(
      "https://ipfs.infura.io",
      "https://lens.infura-ipfs.io"
    );
    return formatIPFS(imgUrl);
  };

  const getUserLogin = async () => {
    let res: any = await api.get(`/address/authentication`)
    if (res && res.data) {
      let score = 0;
      for (let key in res.data) {
        if (res.data[key]) {
          initWebInfo.map((t) => {
            if (t.key === key) {
              t.status = 'Verified'
            }
          })
          const b: any = scoreToolConfig.filter((t) => { return t.key === key })
          if (b.length > 0) {
            score += b[0]['score']
          }
        }
      }
      setOnChains([
        ...initWebInfo.filter((t) => { return t.status == 'Verified' }),
        ...initWebInfo.filter((t) => { return t.status !== 'Verified' }),
      ])
      setTotalScroe(score)
      setLoginRes(res.data)
    }
  }

  const verifileProof = (str: any) => {
    if (str !== 'Verifile') return false
    switchChain(config.EthChainId)
  }

  const getValidator = async () => {
    let validatorData: any = await proofContract.getValidator();
    const valiData: any = [...onChains]
    valiData.map((t, index) => {
      if (t.key === 'prof') {
        t.status = validatorData ? 'Verified' : 'Ineligible'
        if (validatorData) {
          valiData.unshift(valiData.splice(index, 1)[0]);
        }
      }
    })
    console.log(valiData)
    setOnChains(valiData)
  };

  const postGithubCode = async () => {
    const knn3RefreshToken = localStorage.getItem("knn3Token");
    setLoginLoading(true)
    let res: any = await bindApi.post("", {
      code: router.query.code,
      type: router.query.type,
      jwt: knn3RefreshToken,
    });
    setLoginLoading(false)
    if (res && res.data && res.data.data == 'success') {
      setShowSuccess(true)
      setLoginType(router.query.type)
      getUserLogin()
    } else if (res && res.data.data) {
      toast.info('Already bound')
    }
  }

  const connectSocial = (type: string) => {
    if(!currentLoginProfile.handle) return
    if (type === 'discord') {
      if (loginRes.discord) { return }; window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1065158934312263780&redirect_uri=https%3A%2F%2Fknn3-gateway.knn3.xyz%2Foauth%2Fdiscord&response_type=code&scope=identify'
    }
    if (type === 'github') {
      if (loginRes.github) { return }; window.location.href = 'https://github.com/login/oauth/authorize?client_id=b59e578134a199905f5e&redirect_uri=https://knn3-gateway.knn3.xyz/oauth/github'
    }
    if (type === 'exchange') {
      if (loginRes.exchange) { return }; window.location.href = 'https://stackoverflow.com/oauth?client_id=25948&redirect_uri=https%3A%2F%2Fknn3-gateway.knn3.xyz%2Foauth%2Fstackoverflow&response_type=code&state=state'
    }
    if (type === 'gmail') {
      if (loginRes.gmail) { return }; window.location.href = 'https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=837015741227-1hp92p0sajpm2r1esbdf0lq07gmihuru.apps.googleusercontent.com&redirect_uri=https://knn3-gateway.knn3.xyz/oauth/gmail&scope=https://www.googleapis.com/auth/gmail.readonly&state=topscore'
    }
  }

  useEffect(() => {
    if (chainId == config.EthChainId) {
      getValidator()
    }
  }, [chainId])

  useEffect(() => {
    console.log('currentLoginProfile',currentLoginProfile)
    if (currentLoginProfile.handle) {
      getIntroduce()
      getUserLogin()
    } else {
      setLoginRes({})
      initWebInfo.map((t) => {
        if (t.status === 'Verified') {
          t.status = 'Ineligible'
        }
      })
      setOnChains([...initWebInfo])
    }
  }, [currentLoginProfile])

  useEffect(() => {
    if (router.query && router.query.code && router.query.type) {
      router.push('/pass')
      postGithubCode()
    }
  }, [router])

  return (
    <div className="w-full h-full bg-[#fff] dark:bg-[#16171B] flex">
      <Navbar />
      <div className='py-5 w-full text-[#292A2E] dark:text-[#fff]'>
        <ConnectBtn type={3} />
        <div className="w-full h-full profile-main-bg mt-5 overflow-y-auto relative">
          <div className="w-[70%] max-w-[1400px] min-w-[800px] mx-[auto] hidden-scrollbar">
            <div className='mt-10 px-3'>
              <div className='w-full h-[160px] dash-bg-style rounded-[20px] p-8 flex items-center'>
                <div className='flex items-center'>
                  <div className='mr-4'>
                    {
                      currentLoginProfile.imageURI && currentLoginProfile.profileId ? (
                        <img src={getImgUrl(currentLoginProfile.imageURI)} className="w-[100px] h-[100px] rounded-[50%]" />
                      ) : (
                        <Image
                          className="w-[100px] h-[100px] rounded-[50%]"
                          src={theme === 'light' ? NoProfileDark : NoProfileDark}
                          alt="" />
                      )
                    }
                  </div>
                  <div className='h-[fit-content]'>
                    <p className='font-[600] text-[18px]'>{currentLoginProfile.name ? currentLoginProfile.name : currentLoginProfile.handle ? currentLoginProfile.handle.split('.')[0] : ''}
                      <span className='text-[12px] ml-2 text-[rgba(0,0,0,0.5)] dark:text-[rgba(255,255,255,0.5)] font-[500]'>
                        {currentLoginProfile.profileId ? `@${currentLoginProfile.handle}` : 'NAN'}
                      </span>
                    </p>
                    <p className='text-[14px]'>{introduce}</p>
                  </div>
                </div>
                <div className='ml-auto w-[200px] h-full text-center flex items-center justify-center'>
                  <div>
                    <div className='text-[36px] text-[600]'>{currentLoginProfile.profileId ? totalScroe : 'NAN'}</div>
                    <div className='flex jusitify-center items-center'>
                      <Popover placement="bottom" title={''} content={getToolTipContent(loginRes)} trigger="hover">
                        <div className='flex jusitify-center items-center cursor-pointer'>
                          <div>Uniqueness Score</div>
                          <Image
                            src={theme === 'light' ? VectorLight : VectorDark}
                            className='mt-[2px] ml-1'
                            alt="" />
                        </div>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='px-3 my-4 flex w-full'>
              <div className='dash-bg-style w-full'>
                <div className='h-[72px] dash-bg-style w-full flex items-center px-3'>
                  <div className='h-[60px] dash-bg-style w-[60px] flex items-center justify-center mr-5'>
                    <Image
                      src={theme === 'light' ? MaskLight4 : Mask4}
                      alt="" />
                  </div>
                  <div>On-Chain Achievements </div>
                </div>
                <div className='w-full pt-4 pb-2 flex justify-between flex-wrap'>
                  {
                    onChains.map((tem: any, idx: number) => (
                      <div className={`w-[14%] items-center mb-4`} key={idx}>
                        <Image
                          className='w-[80%] mx-[auto] mb-3'
                          src={tem.status === 'Verified' ? theme === 'light' ? haveLightImg[tem.imgIdx] : haveDarkImg[tem.imgIdx] : theme === 'light' ? lightNotHaveImg[tem.imgIdx] : darkNotHaveImg[tem.imgIdx]}
                          alt="" />
                        <div className='w-[60%] text-center py-1 mx-[auto] dash-bg-style cursor-pointer flex items-center justify-center hover:opacity-70' onClick={() => verifileProof(tem.status)}>
                          {
                            tem.status === 'Verified' &&
                            <Image
                              src={theme === 'light' ? VerifileLight : VerifileDark}
                              className='mr-1 h-[12px] w-[12px]'
                              alt="" />
                          }
                          <span className='text-[12px]'>{tem.status}</span>
                        </div>
                      </div>
                    ))
                  }
                  <div className='w-[14%]'></div>
                  <div className='w-[14%]'></div>
                  <div className='w-[14%]'></div>
                  <div className='w-[14%]'></div>
                </div>
              </div>
              {/* <div className='w-[50%] pass-bg relative'>
                <p className='text-[600] text-[20px] mt-[2%] ml-[2%]'>Uniqueness</p>
                <div className='absolute bottom-5 left-8 flex items-baseline'>Score<span className='text-[24px] text-[600] ml-1'> {totalScroe}</span></div>
              </div> */}
            </div>
            <div className='px-3 mb-20 flex justify-between gap-3'>
              <div className='dash-bg-style flex-1'>
                <div className='h-[72px] dash-bg-style w-full flex items-center px-3'>
                  <div className='h-[60px] dash-bg-style w-[60px] flex items-center justify-center mr-5'>
                    <Image
                      src={theme === 'light' ? MaskLight1 : Mask1}
                      alt="" />
                  </div>
                  <div>Social</div>
                </div>
                <div className='flex justify-between py-4 px-4'>
                  <div className={`flex-1`}>
                    <div className='flex items-center'>
                      <Image
                        className='w-[90%] mx-[auto] cursor-pointer hover:scale-110 transition-all'
                        src={theme === 'light' ? ImgLight11 : Img11}
                        alt="" />
                    </div>
                    <div className='w-[80%] text-center py-1 mx-[auto] dash-bg-style cursor-pointer flex items-center justify-center hover:opacity-70 mt-3'>
                      <span className='text-[12px]'>Soon</span>
                    </div>
                  </div>

                  <div className={`flex-1`}>
                    <div className='flex items-center'>
                      <Popover placement="bottom" title={''} content={getSocialTooltip(loginRes.discordName)} trigger="hover" overlayStyle={{ 'display': !loginRes.discord ? 'none' : '' }}>
                        <Image
                          className='w-[90%] mx-[auto] cursor-pointer hover:scale-110 transition-all'
                          src={loginRes.discord ? theme === 'light' ? ImgHaveLight12 : ImgHaveDark12 : theme === 'light' ? ImgLight12 : Img12}
                          alt="" />
                      </Popover>

                    </div>
                    <div className='w-[80%] text-center py-1 mx-[auto] dash-bg-style cursor-pointer flex items-center justify-center hover:opacity-70 mt-3'>
                      {
                        loginRes.discord &&
                        <Image
                          src={theme === 'light' ? VerifileLight : VerifileDark}
                          className='mr-1 h-[12px] w-[12px]'
                          alt="" />
                      }
                      <span className='text-[12px]' onClick={() => connectSocial('discord')}>{loginRes.discord ? 'Verifiled' : 'Connect'}</span>
                    </div>
                  </div>

                  {/* <div className={`flex-1 flex items-center`}>
                    <Image
                      className='w-[90%] mx-[auto] cursor-pointer hover:scale-110 transition-all'
                      src={loginRes.discord ? theme === 'light' ? ImgHaveLight12 : ImgHaveDark12 : theme === 'light' ? ImgLight12 : Img12}
                      onClick={() => { if (loginRes.discord) { return }; window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=1065158934312263780&redirect_uri=https%3A%2F%2Fknn3-gateway.knn3.xyz%2Foauth%2Fdiscord&response_type=code&scope=identify' }}
                      alt="" />
                  </div> */}
                  <div className={`flex-1`}>
                    <div className='flex items-center'>
                      <Image
                        className='w-[90%] mx-[auto] cursor-pointer scale-90 hover:scale-100 transition-all'
                        src={theme === 'light' ? ImgLight13 : Img13}
                        alt="" />
                    </div>
                    <div className='w-[80%] text-center py-1 mx-[auto] dash-bg-style cursor-pointer flex items-center justify-center hover:opacity-70 mt-3'>
                      <span className='text-[12px]'>Soon</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='dash-bg-style flex-1'>
                <div className='h-[72px] dash-bg-style w-full flex items-center px-3'>
                  <div className='h-[60px] dash-bg-style w-[60px] flex items-center justify-center mr-5'>
                    <Image
                      src={theme === 'light' ? MaskLight2 : Mask2}
                      alt="" />
                  </div>
                  <div>Skill</div>
                </div>
                <div className='flex justify-between py-4 px-4'>

                  <div className={`flex-1`}>
                    <div className='flex items-center'>
                      <Popover placement="bottom" title={''} content={getSocialTooltip(loginRes.githubName)} trigger="hover" overlayStyle={{ 'display': !loginRes.github ? 'none' : '' }}>
                        <Image
                          className='w-[90%] mx-[auto] cursor-pointer hover:scale-110 transition-all'
                          src={loginRes.github ? theme === 'light' ? ImgHaveLight14 : ImgHaveDark14 : theme === 'light' ? ImgLight14 : Img14}
                          alt="" />
                      </Popover>
                    </div>
                    <div className='w-[80%] text-center py-1 mx-[auto] dash-bg-style cursor-pointer flex items-center justify-center hover:opacity-70 mt-3'>
                      {
                        loginRes.github &&
                        <Image
                          src={theme === 'light' ? VerifileLight : VerifileDark}
                          className='mr-1 h-[12px] w-[12px]'
                          alt="" />
                      }
                      <span className='text-[12px]' onClick={() => connectSocial('github')}>{loginRes.github ? 'Verifiled' : 'Connect'}</span>
                    </div>
                  </div>

                  {/* <div className={`flex-1 flex items-center`}>
                    <Image
                      className='w-[90%] mx-[auto] cursor-pointer hover:scale-110 transition-all'
                      src={loginRes.github ? theme === 'light' ? ImgHaveLight14 : ImgHaveDark14 : theme === 'light' ? ImgLight14 : Img14}
                      onClick={() => { if (loginRes.github) { return }; window.location.href = 'https://github.com/login/oauth/authorize?client_id=b59e578134a199905f5e&redirect_uri=https://knn3-gateway.knn3.xyz/oauth/github' }}
                      alt="" />
                  </div> */}

                  <div className={`flex-1`}>
                    <div className='flex items-center'>
                      <Popover placement="bottom" title={''} content={getSocialTooltip(loginRes.exchangeName)} trigger="hover" overlayStyle={{ 'display': !loginRes.exchange ? 'none' : '' }}>
                        <Image
                          className='w-[90%] mx-[auto] cursor-pointer hover:scale-110 transition-all'
                          src={loginRes.exchange ? theme === 'light' ? ImgHaveLight15 : ImgHaveDark15 : theme === 'light' ? ImgLight15 : Img15}
                          alt="" />
                      </Popover>
                    </div>
                    <div className='w-[80%] text-center py-1 mx-[auto] dash-bg-style cursor-pointer flex items-center justify-center hover:opacity-70 mt-3'>
                      {
                        loginRes.exchange &&
                        <Image
                          src={theme === 'light' ? VerifileLight : VerifileDark}
                          className='mr-1 h-[12px] w-[12px]'
                          alt="" />
                      }
                      <span className='text-[12px]' onClick={() => connectSocial('exchange')}>{loginRes.exchange ? 'Verifiled' : 'Connect'}</span>
                    </div>
                  </div>

                  {/* <div className={`flex-1 flex items-center`}>
                    <Image
                      className='w-[90%] mx-[auto] cursor-pointer hover:scale-110 transition-all'
                      src={loginRes.exchange ? theme === 'light' ? ImgHaveLight15 : ImgHaveDark15 : theme === 'light' ? ImgLight15 : Img15}
                      onClick={() => { window.location.href = 'https://stackoverflow.com/oauth?client_id=25948&redirect_uri=https%3A%2F%2Fknn3-gateway.knn3.xyz%2Foauth%2Fstackoverflow&response_type=code&state=state' }}
                      alt="" />
                  </div> */}
                  <div className={`flex-1`}>
                    <div className='flex items-center'>
                      <Image
                        className='w-[90%] mx-[auto] cursor-pointer hover:scale-110 transition-all'
                        src={theme === 'light' ? ImgLight16 : Img16}
                        alt="" />
                    </div>
                    <div className='w-[80%] text-center py-1 mx-[auto] dash-bg-style cursor-pointer flex items-center justify-center hover:opacity-70 mt-3'>
                      <span className='text-[12px]'>Soon</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='dash-bg-style flex-1'>
                <div className='h-[72px] dash-bg-style w-full flex items-center px-3'>
                  <div className='h-[60px] dash-bg-style w-[60px] flex items-center justify-center mr-5'>
                    <Image
                      src={theme === 'light' ? MaskLight3 : Mask3}
                      alt="" />
                  </div>
                  <div>OAuth</div>
                </div>
                <div className='flex justify-between py-4 px-4'>
                  {/* <div className={`flex-1`}>
                    <div className='flex items-center'>
                      <Image
                        className='w-[90%] mx-[auto] cursor-pointer hover:scale-110 transition-all'
                        src={theme === 'light' ? ImgLight17 : Img17}
                        alt="" />
                    </div>
                    <div className='w-[80%] text-center py-1 mx-[auto] dash-bg-style cursor-pointer flex items-center justify-center hover:opacity-70 mt-3'>
                      <span className='text-[12px]'>Soon</span>
                    </div>
                  </div> */}

                  <div className={`flex-1`}>
                    <div className='flex items-center'>
                      <Popover placement="bottom" title={''} content={getSocialTooltip(loginRes.gmailName)} trigger="hover" overlayStyle={{ 'display': !loginRes.gmail ? 'none' : '' }}>
                        <Image
                          className='w-[90%] mx-[auto] cursor-pointer hover:scale-110 transition-all'
                          src={loginRes.gmail ? theme === 'light' ? ImgHaveLight17 : ImgHaveDark17 : theme === 'light' ? ImgLight17 : Img17}
                          alt="" />
                      </Popover>
                    </div>
                    <div className='w-[80%] text-center py-1 mx-[auto] dash-bg-style cursor-pointer flex items-center justify-center hover:opacity-70 mt-3'>
                      {
                        loginRes.gmail &&
                        <Image
                          src={theme === 'light' ? VerifileLight : VerifileDark}
                          className='mr-1 h-[12px] w-[12px]'
                          alt="" />
                      }
                      <span className='text-[12px]' onClick={() => connectSocial('gmail')}>{loginRes.gmail ? 'Verifiled' : 'Connect'}</span>
                    </div>
                  </div>

                  <div className={`flex-1`}>
                    <div className='flex items-center'>
                      <Image
                        className='w-[90%] mx-[auto] cursor-pointer hover:scale-110 transition-all'
                        src={theme === 'light' ? ImgLight18 : Img18}
                        alt="" />
                    </div>
                    <div className='w-[80%] text-center py-1 mx-[auto] dash-bg-style cursor-pointer flex items-center justify-center hover:opacity-70 mt-3'>
                      <span className='text-[12px]'>Soon</span>
                    </div>
                  </div>
                  <div className={`flex-1`}>
                    <div className='flex items-center'>
                      <Image
                        className='w-[90%] mx-[auto] cursor-pointer hover:scale-110 transition-all'
                        src={theme === 'light' ? ImgLight19 : Img19}
                        alt="" />
                    </div>
                    <div className='w-[80%] text-center py-1 mx-[auto] dash-bg-style cursor-pointer flex items-center justify-center hover:opacity-70 mt-3'>
                      <span className='text-[12px]'>Soon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            showSuccess &&
            <PassSuccess onCancel={() => setShowSuccess(false)} type={loginType} />
          }
          {
            loginLoading &&
            <PassLoading />
          }
        </div>
      </div>
    </div >
  )
}

export default pass
