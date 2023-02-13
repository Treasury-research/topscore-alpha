import React, { useState, useEffect, useRef } from "react";
import Navbar from '../components/Navbar'
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import api from "../api";
import Image from 'next/image'
import ConnectBtn from '../components/ConnectBtn'
import { useRecoilState } from "recoil";
import Character from '../components/nft/Character'
import log from "../lib/log";
import Bg1 from '../statics/img/bg_text1.gif'
import Bg2 from '../statics/img/bg_2text.gif'
import ImgToRight from "../statics/img/toRight.png";
import ImgToLeft from "../statics/img/toLeft.png";
import ImgWhole from "../statics/img/whole-top.png";
import { Modal, Carousel } from "antd";
import { knn3TokenValidState } from '../store/state'
import useWeb3Context from "../hooks/useWeb3Context";
import config from "../config";
import useErc721Contract from "../contract/useErc721Contract";
import { toast } from "react-toastify";
// import VideoSource from "/public/vedio_rainbow.mp4"

const nft = () => {

  const { account, connectWallet, doLogin, } = useWeb3Context();

  const [knn3TokenValid, setKnn3TokenValid] = useRecoilState(knn3TokenValidState);

  const [nftList, setNftList] = useState([]);

  const [isShowPic, setIsShowPic] = useState(false);

  const [isShow, setIsShow] = useState(false);

  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const [activeNftDetail, setActiveNftDetail] = useState<any>({});

  const [videoUrl, setVideoUrl] = useState<any>('');

  const erc721Contract = useErc721Contract();

  const handleOk = () => {
    setIsShowPic(false);
  };

  const handleCancel = () => {
    setIsShowPic(false);
    setActiveNftDetail({})
  };

  const getAllNfts = async () => {
    setLoading(true)
    const res = await erc721Contract.getAll(config.contracts.nft);
    // check if claimed
    const res2: any = await api.get("/v1/nft/query_ids", {
      params: {
        ids: res.join(','),
      },
    });
    setLoading(false)
    if (res2.data.length > 0) {
      setTotal(res2.data.length);
      let newList: any = [];
      for (var i = 0; i < res2.data.length; i += 4) {
        newList.push(res2.data.slice(i, i + 4));
      }
      setNftList(newList);
    }
  };

  const doOpenBox = async (id: number) => {
    if (!knn3TokenValid) {
      toast.error('Please login to reveal');
      return
    }
    const res = await api.post(`/v1/nft/open/${id}`);
    if (res.data) {
      console.log("open success");
      setActiveNftDetail(res.data)
      setIsShowPic(true)
      log('open_box', account)
    }
  };

  useEffect(() => {
    if (!account) {
      return;
    }
    getAllNfts();
    setIsShow(true)
  }, [account]);

  useEffect(() => {
    setTimeout(() => {
      setVideoUrl('/vedio_rainbow.mp4')
    }, 1500)
  }, []);


  return (
    <div className="w-full h-full bg-[#000] flex">
      <Navbar />
      <div className='p-5 w-full text-[#fff] relative'>
        <div className="absolute w-full left-0 top-0 z-30 p-5">
          <ConnectBtn />
        </div>
        {
          loading ?
            <div className="nft-loading"><LoadingOutlined className="text-2xl block mx-auto" /></div>
            : <>
              <div className='h-[calc(100vh-70px)] overflow-y-auto relative'>
                <div className="absolute top-0 w-full left-0 h-full z-20">
                  <div className="nft-left-des mb-[60px] mt-[120px]">
                    <p>At dawn, the warm, amber light shines and all things come to life.</p>
                    <p>A crystal prism sits on the windowsill, refracting the light into a spectrum of colors.</p>
                    <p>Rainbows dance across the wall, a seven-hued display of light and shadow.</p>
                    {/* <Image
                className='mx-[auto]'
                src={Bg1}
                alt=""
              /> */}
                  </div>
                  <div className="nft-right-des">
                    <p>But one strange, golden ray slices through the prism, creating a crevice in its facade.</p>
                    <p>A joyful breeze rushes into the room, and K, a mysterious new life form, is born in silence.</p>
                    <p>Droplets of water playfully roll around K, as it explores its new surroundings.</p>
                  </div>
                  <div className="open-pic mb-[100px]">
                    {
                      total !== 0 &&
                      <div className="my-[20px] text-center w-[fit-content] mb-[-50px]">Total:{total}</div>
                    }
                    {
                      nftList.length > 0 &&
                      <>
                        <div className="carou-con">
                          <Carousel dotPosition={'right'} className="rainbow-carou" autoplay>
                            {
                              nftList.map((t: any, i: number) => (
                                <div>
                                  <div className="pic-con">
                                    {t.map((item: any) =>
                                      item.is_open === 1 ? (
                                        <div className="pic-item">
                                          <img src={item.token_uri} />
                                          <div className="pic-open-btn">
                                            <div className="reveal">#{item.id}</div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="pic-item">
                                          <div className="pic-open-item">
                                            <div className="text-top">YOUR 2022 WRAPPED ON LENS</div>
                                            <div className="text-bot">MYSTERY BOH</div>
                                          </div>
                                          <div className="pic-open-btn">
                                            <div className="arrow">
                                              <Image src={ImgToRight} alt="" />
                                            </div>
                                            {knn3TokenValid ? <div
                                              className="reveal"
                                              onClick={() => doOpenBox(item.id)}
                                            >
                                              REVEAL
                                            </div> : <div
                                              className="reveal"
                                              onClick={() => doLogin()}
                                            >
                                              Login
                                            </div>}
                                            <div className="arrow">
                                              <Image src={ImgToLeft} alt="" />
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              ))
                            }
                          </Carousel>

                        </div>
                      </>
                    }
                    <Modal
                      className="openPicModal"
                      open={isShowPic}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      <div>
                        <div onClick={() => handleCancel()} className='absolute right-[23px] bg-[#1F1F1F] h-[40px] w-[40px] flex justify-center items-center border-[1px] border-[#4A4A4A] top-[0px] cursor-pointer'>
                          <CloseOutlined className='text-[20px]' />
                        </div>
                        <div className="open-imgTitle">
                          <Image src={ImgWhole} alt="" />
                        </div>
                        <div className="open-imgResult">
                          <img src={activeNftDetail.token_uri} alt="" />
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div className="nft-right-des mb-[60px]">
                    <p>Glimmering faintly in the air, a spark of light</p>
                    <p>Digital entanglements beneath K's skin reflecting different shades</p>
                    <p>These fragments of words come from the Lens</p>
                    <p>Entwined, braided and combined with one another</p>
                    <p>Forming six distinct entities</p>
                    <p>And evolving into twenty-one personalities in the first century of a new era</p>
                  </div>
                  <div className="nft-left-des mb-[60px]">
                    <p>The combination of these six entities determines the construction of K</p>
                    <p>Storing all the information of life's personality, color, gestation, growth and decline</p>
                    <p>Enunciating the colorful hue of K</p>
                  </div>
                  <div className="nft-right-des mb-[60px]">
                    <p>K opened his sleepy eyes and furrowed his brow</p>
                    <p>Staring in confusion at the faint shimmer in his hands</p>
                  </div>
                  <div className="nft-left-des">
                    <p>Slowly, it unfurled, ushering in a new era of Web3...</p>
                  </div>
                  <div>
                    <Character />
                  </div>
                </div>

              </div>
              <div className="absolute top-[0px] w-full left-0 h-full opacity-[0.3] z-10 charvideo">
                {
                  videoUrl &&
                  <video
                    loop
                    autoPlay
                    muted
                    src={videoUrl}
                  >
                  </video>
                }
              </div>
            </>
        }

      </div>
    </div>
  )
}

export default nft
