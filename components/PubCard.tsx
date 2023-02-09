
import { useEffect, useState } from 'react';
import api from "../api";
import Image from 'next/image'
import Icon1 from '../statics/img/pubIcon/commentBig.svg'
import IconNum1 from '../statics/img/pubIcon/commentSmall.svg'
import IconNum2 from '../statics/img/pubIcon/mirror.png'
import IconNum3 from '../statics/img/like.svg'
import IconNum4 from '../statics/img/Paid_collect.svg'
import IconNum5 from '../statics/img/Free_collect.svg'
import IconNum6 from '../statics/img/post_icon.svg'
import { LoadingOutlined } from '@ant-design/icons';
import { ethers } from 'ethers'
import moment from 'moment'

const PubCard = (props: any) => {
  const [pubData, setPubData] = useState([]);
  const { lineData } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    if (lineData.length > 0) {
      let legendData = [];
      if (lineData.length == 0) return;
      const s = lineData[lineData.length - 1];
      for (let i = 0; i < s.length; i++) {
        legendData.push(`${s[i]['pubId']}`)
      }
      if (legendData.length > 0) {
        getPubs([legendData])
      } else {
        setPubData([])
      }
    }
  }, [lineData])

  const getPubs = async (ids: any) => {
    const res = await api.get(`/lens/pubByLatest?profileId=5&pubIds=${ids.join(',')}`);
    if (res.data) {
      let newList: any = [];
      for (var i = 0; i < res.data.length; i += 3) {
        newList.push(res.data.slice(i, i + 3));
      }
      const data = DivideArrayEquallyInto4Parts(res.data)
      setPubData([...data])
      setLoading(false)
    }
  };

  const DivideArrayEquallyInto4Parts = (s: any) => {
    if (s.length >= 4) {
      let arr1, arr2, arr3, arr4;
      arr1 = s.slice(0, Math.round(s.length / 4));
      arr2 = s.slice(Math.round(s.length / 4), Math.round(s.length / 4) * 2);
      arr3 = s.slice(Math.round(s.length / 4) * 2, Math.round(s.length / 4) * 3);
      arr4 = s.slice(Math.round(s.length / 4) * 3);
      return [arr1, arr2, arr3, arr4];
    } else if (s.length == 3) {
      return [[s[0]], [s[1]], [s[2]]];
    }
    else if (s.length == 2) {
      return [[s[0]], [s[1]]];
    }
    else if (s.length == 1) {
      return [[s[0]]];
    } else {
      return []
    }
  }

  const toLesnter = (t: any) => {
    const proId = ethers.utils.hexlify(t.profileId)
    const pubId = ethers.utils.hexlify(t.pubId)
    window.open(`https://lenster.xyz/posts/${proId}-${pubId}`)
  }

  const getHours = (t: any) => {
    const diff = new Date().getTime() - t.timestamp * 1000
    const h = parseInt(diff / (1000 * 60 * 60));
    return h
  }

  return (
    <div className="w-full bg-[#000] text-[#fff] p-5 my-10">
      {
        loading ?
          <LoadingOutlined className="text-2xl block mx-auto my-[80px]" />
          : (
            <div className="flex flex-row overflow-hidden">
              {
                pubData.map((t: any, i: number) => (
                  <div key={i} className={`flex flex-col ${i === 3 ? 'mr-[0px]' : 'mr-[20px]'} pub-items`}>
                    {
                      t.map((tem: any, index: number) => (
                        <div key={index} className='bg-[#1A1A1A] py-[20px] px-[20px] rounded-[4px] relative my-[20px]'>
                          <div className='flex'>
                            <div className='text-[rgba(255,255,255,0.9)]'>Pub #{tem.pubId}</div>
                            <div className={`cursor-pointer ml-[auto] rounded-[4px] h-[24px] w-[24px] ${tem.type === 'Post' ? 'bg-[#575BFF]' : 'bg-[#9D3611]'}`} onClick={() => toLesnter(tem)}>
                              {
                                tem.type === 'Post' &&
                                <Image
                                  className="mr-1"
                                  src={IconNum6}
                                  alt=""
                                />

                              }
                              {
                                tem.type === 'Comment' &&
                                <Image
                                  className="mr-1"
                                  src={Icon1}
                                  alt=""
                                />
                              }
                            </div>
                          </div>
                          <div className='text-[#6C747D] text-[14px] my-[10px]'>
                            {
                              getHours(tem)
                            }
                            h
                          </div>
                          <p className='text-[rgba(255,255,255,0.7)] text-[14px]'>
                            {tem.content}
                          </p>
                          <div className='flex items-center mt-[20px]'>
                            <div className='flex items-center mr-[20px]'>
                              <Image
                                className="mr-1"
                                src={IconNum1}
                                alt=""
                              />
                              <span className='text-[14px]'>{tem.commentByCount}</span>
                            </div>

                            <div className='flex items-center mr-[20px]'>
                              <Image
                                className="mr-1"
                                src={IconNum2}
                                alt=""
                              />
                              <span className='text-[14px]'>{tem.mirrorByCount}</span>
                            </div>

                            <div className='flex items-center mr-[20px]'>

                              {
                                tem.isFee === 0 &&
                                <Image
                                  className="mr-1"
                                  src={IconNum5}
                                  alt=""
                                />
                              }

                              {
                                tem.isFee === 1 &&
                                <Image
                                  className="mr-1"
                                  src={IconNum6}
                                  alt=""
                                />
                              }
                              <span className='text-[14px]'>{tem.collectByCount}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ))
              }
            </div>
          )
      }

    </div>
  )
}

export default PubCard
