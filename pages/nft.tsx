import Navbar from '../components/Navbar'
import Image from 'next/image'
import Bg1 from '../statics/img/bg1.gif'
import Bg2 from '../statics/img/bg2.gif'

const Feed = () => {
  return (
    <div className="w-full h-full bg-[#000] flex">
      <Navbar />
      <div className='p-5 w-full text-[#fff]'>
        sdfsdf
        <Image
          src={Bg1}
          alt=""
        />
      </div>
    </div>
  )
}

export default Feed
