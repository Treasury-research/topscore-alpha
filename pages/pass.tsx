import Navbar from '../components/Navbar'
import ConnectBtn from '../components/ConnectBtn'
import Image from "next/image";
import Knn3 from "../statics/img/pass/knn3.svg";
import Img1 from "../statics/img/pass/img1.png";
import Img2 from "../statics/img/pass/img2.png";
import Img3 from "../statics/img/pass/img3.png";
import Img4 from "../statics/img/pass/img4.png";
import Img5 from "../statics/img/pass/img5.png";
import Img6 from "../statics/img/pass/img6.png";
import Img7 from "../statics/img/pass/img7.png";
import Img8 from "../statics/img/pass/img8.png";
import Img9 from "../statics/img/pass/img9.png";
import Img10 from "../statics/img/pass/img10.png";
import Img11 from "../statics/img/pass/img11.png";
import Img12 from "../statics/img/pass/img12.png";

const imgArray = [
  [{
    src:Img1,
    text:'Ens'
  }, {
    src:Img2,
    text:'BABT'
  }, {
    src:Img3,
    text:'Snapshot'
  }, {
    src:Img4,
    text:'NFT'
  }],
  [{
    src:Img5,
    text:'POAP'
  }, {
    src:Img6,
    text:'LENS'
  }, {
    src:Img7,
    text:'Github'
  }, {
    src:Img8,
    text:'Twitter'
  }],
  [{
    src:Img9,
    text:'Google'
  }, {
    src:Img10,
    text:'Discord'
  }, {
    src:Img11,
    text:'Linkedin'
  }, {
    src:Img12,
    text:'Gitcoin'
  }],
]

const pass = () => {
  return (
    <div className="w-full h-full bg-[#000] flex">
      <Navbar />
      <div className='p-5 w-full text-[#fff]'>
        <ConnectBtn type={3} />
        <div className="w-[80%] max-w-[1400px] min-w-[800px] mx-[auto] overflow-y-auto h-[calc(100%-40px)] hidden-scrollbar">
          <div className='mt-10'>
            <div className='w-full h-[160px] bg-[#1A1A1A] rounded-[20px] p-8 flex items-center'>
              <div className='w-[calc(100%-300px)] flex items-center'>
                <div className='mr-4'>
                  <Image
                    className="w-[100px] h-[100px] rounded-[50%]"
                    src={Knn3}
                    alt="" />
                </div>
                <div className='h-[fit-content] w-[calc(100%-100px)]'>
                  <p className='font-[600] text-[18px]'>KNN3 Network<span className='text-[12px] ml-4 text-[rgba(255,255,255,0.5)] font-[500]'>knn3_network.lens</span></p>
                  <p className='text-[14px]'>KNN3 is one-stop Web3 User-centric #DataFi solution for d/Apps and smart contracts.
                    DC: http://discord.gg/UKzFVpHk4J  Link3: http://link3.to/knn3network</p>
                </div>
              </div>
              <div className='w-[200px] ml-[auto]'>
                <div className='flex mb-3'>
                  <Image
                    className="w-[60px] h-[60px] mr-3 hover:opacity-70"
                    src={Img6}
                    alt="" />
                  <Image
                    className="w-[60px] h-[60px] mr-3 hover:opacity-70"
                    src={Img9}
                    alt="" />
                  <Image
                    className="w-[60px] h-[60px] hover:opacity-70"
                    src={Img10}
                    alt="" />
                </div>
                <div className='flex'>
                  <Image
                    className="w-[60px] h-[60px] mr-3 hover:opacity-70"
                    src={Img8}
                    alt="" />
                  <Image
                    className="w-[60px] h-[60px] mr-3 hover:opacity-70"
                    src={Img7}
                    alt="" />
                  <Image
                    className="w-[60px] h-[60px] hover:opacity-70"
                    src={Img11}
                    alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className='flex mt-5 mb-8'>
            <div className='px-5 py-2 bg-[#1A1A1A] rounded-[6px] mr-5 cursor-pointer'>Claimed Badges</div>
            <div className='px-5 py-2 bg-[#1A1A1A] rounded-[6px] cursor-pointer'>Unclaimed Badges</div>
          </div>
          <div>
            {
              imgArray.map((t: any, i: number) => (
                <div className='flex justify-between mb-5' key={i}>
                  {
                    t.map((tem: any, idx: number) => (
                      <div className={`w-[25%]`} key={idx}>
                        <Image
                          className='w-[70%] mx-[auto]'
                          src={tem.src}
                          alt="" />
                          <p className='text-center text-[18px] font-[600]'>{tem.text}</p>
                      </div>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default pass
