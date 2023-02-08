import React, { useState, useEffect, useRef } from "react";
import Navbar from '../components/Navbar'
import { CloseOutlined } from "@ant-design/icons";
import api from "../api";
import Image from 'next/image'
import ConnectBtn from '../components/ConnectBtn'
import Character from '../components/nft/Character'
import Bg1 from '../statics/img/bg_text1.gif'
import Bg2 from '../statics/img/bg_2text.gif'
import ImgToRight from "../statics/img/toRight.png";
import ImgToLeft from "../statics/img/toLeft.png";
import ImgWhole from "../statics/img/whole-top.png";
import { Modal, Carousel } from "antd";
import useWeb3Context from "../hooks/useWeb3Context";
import config from "../config";
import useErc721Contract from "../contract/useErc721Contract";
// import VideoSource from "/public/vedio_rainbow.mp4"

const nft = () => {

  const { account, connectWallet } = useWeb3Context();

  const [nftList, setNftList] = useState([]);

  const [isShowPic, setIsShowPic] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const [total, setTotal] = useState(0);

  const [activeNftDetail, setActiveNftDetail] = useState<any>({});

  const erc721Contract = useErc721Contract();

  const handleOk = () => {
    setIsShowPic(false);
  };

  const handleCancel = () => {
    setIsShowPic(false);
    setActiveNftDetail({})
  };

  const getAllNfts = async () => {
    const res = await erc721Contract.getAll(config.contracts.nft);
    // check if claimed
    const res2: any = await api.get("/v1/nft/query_ids", {
      params: {
        ids: res.join(','),
      },
    });
    let rdata = [{
      id: '234',
      is_open: 0
    },
      , {
      id: '234',
      is_open: 0
    },
    {
      id: '234',
      is_open: 0
    },
    {
      id: '234',
      is_open: 0
    },
    {
      id: '234',
      is_open: 0
    },
    {
      id: '234',
      is_open: 0
    },
    {
      id: '234',
      is_open: 0
    },
    {
      id: '234',
      is_open: 0
    },
    {
      id: '234',
      is_open: 0
    },
    {
      id: '234',
      is_open: 0
    }]
    setTotal(res2.data.length);
    let newList: any = [];
    for (var i = 0; i < rdata.length; i += 4) {
      newList.push(rdata.slice(i, i + 4));
    }
    setNftList(newList);
  };

  const doOpenBox = async (id: number) => {
    const res = await api.post(`/v1/nft/open/${id}`);
    if (res.data) {
      console.log("open success");
      setActiveNftDetail(res.data)
      setIsShowPic(true)
    }
  };

  useEffect(() => {
    if (!account) {
      return;
    }
    getAllNfts();
    setIsShow(true)
  }, [account]);

  return (
    <div className="w-full h-full bg-[#000] flex">
      <Navbar />
      <div className='p-5 w-full text-[#fff] relative'>
        <ConnectBtn />
        <div className='h-[calc(100vh-70px)] overflow-y-auto relative'>
          <div className="absolute top-0 w-full left-0 h-full z-20">
            <div className='flex'>
              <Image
                className='mx-[auto]'
                src={Bg1}
                alt=""
              />
            </div>

            <div className="open-pic mb-[100px]">
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
                                  <div
                                    className="reveal"
                                    onClick={() => doOpenBox(item.id)}
                                  >
                                    REVEAL
                                  </div>
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
              {
                total !== 0 &&
                <div className="pic-total">Total:{total}</div>
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
            <div className='flex'>
              <Image
                className='mx-[auto]'
                src={Bg2}
                alt=""
              />
            </div>
            <div>
              <Character />
            </div>
          </div>
          
        </div>
        <div className="absolute top-[60px] w-full left-0 h-full opacity-[0.3] z-10 charvideo">
            <video
              loop
              autoPlay
              muted
              src="/vedio_rainbow.mp4"
            >
            </video>
          </div>
      </div>
    </div>
  )
}

export default nft
