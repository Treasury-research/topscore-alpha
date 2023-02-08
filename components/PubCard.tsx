
import Image from 'next/image'
import IconPost from '../statics/img/post-chart.png'
import Icon1 from '../statics/img/card-comment.png'
import Iconer from '../statics/img/card2.png'

const PubCard = () => {
  return (
    <div className="w-full bg-[#000] text-[#fff] p-5 my-10">
      <div className="overflow-hidden">
        <div className='w-[240px] bg-[#1A1A1A] px-4 py-3 rounded-[4px] float-left mr-5'>
          <div className='flex'>
            <div className='text-[rgba(255,255,255,0.9)]'>Pub #_num_</div>
            <div className='ml-[auto]'>
              <Image
                className="mr-1"
                src={IconPost}
                alt=""
              />
            </div>
          </div>
          <div className='text-[#6C747D] text-[14px] my-[10px]'>2h</div>
          <div className='text-[rgba(255,255,255,0.8)] text-[14px]'>
            Keep in mind that you'll only see insights for content you've posted since you converted to a business or creator account. You can also tap the drop-down at the top of the screen to choose if you want to view insights for your selected preset or custom timeframe within the past 90 days.
          </div>
          <div className='flex items-center'>
            <Image
              className="mr-1"
              src={Icon1}
              alt=""
            />
            <span>133</span>
          </div>
        </div>

        <div className='w-[240px] bg-[#1A1A1A] px-4 py-3 rounded-[4px]  float-left mr-5'>
          <div className='flex'>
            <div className='text-[rgba(255,255,255,0.9)]'>Pub #_num_</div>
            <div className='ml-[auto]'>
              <Image
                className="mr-1"
                src={IconPost}
                alt=""
              />
            </div>
          </div>
          <div className='text-[#6C747D] text-[14px] my-[10px]'>2h</div>
          <div className='text-[rgba(255,255,255,0.8)] text-[14px]'>
            Keep in mind that you'll only see insights for content you've posted since you converted to a business or creator account. You can also tap the drop-down at the top of the screen to choose if you want to view insights for your selected preset or custom timeframe within the past 90 days.
          </div>
          <div className='flex items-center'>
            <Image
              className="mr-1"
              src={Icon1}
              alt=""
            />
            <span>133</span>
          </div>
        </div>

        <div className='w-[240px] bg-[#1A1A1A] px-4 py-3 rounded-[4px] float-left mr-5'>
          <div className='flex'>
            <div className='text-[rgba(255,255,255,0.9)]'>Pub #_num_</div>
            <div className='ml-[auto]'>
              <Image
                className="mr-1"
                src={IconPost}
                alt=""
              />
            </div>
          </div>
          <div className='text-[#6C747D] text-[14px] my-[10px]'>2h</div>
          <div className='text-[rgba(255,255,255,0.8)] text-[14px]'>
            Keep in mind that you'll only see insights for content you've posted since you converted to a business or creator account. You can also tap the drop-down at the top of the screen to choose if you want to view insights for your selected preset or custom timeframe within the past 90 days.
          </div>
          <div className='flex items-center'>
            <Image
              className="mr-1"
              src={Icon1}
              alt=""
            />
            <span>133</span>
          </div>
        </div>

        <div className='w-[240px] bg-[#1A1A1A] px-4 py-3 rounded-[4px] float-left mr-5'>
          <div className='flex'>
            <div className='text-[rgba(255,255,255,0.9)]'>Pub #_num_</div>
            <div className='ml-[auto]'>
              <Image
                className="mr-1"
                src={IconPost}
                alt=""
              />
            </div>
          </div>
          <div className='text-[#6C747D] text-[14px] my-[10px]'>2h</div>
          <div className='text-[rgba(255,255,255,0.8)] text-[14px]'>
            Keep in mind that you'll only see insights for content you've posted since you converted to a business or creator account. You can also tap the drop-down at the top of the screen to choose if you want to view insights for your selected preset or custom timeframe within the past 90 days.
          </div>
          <div className='flex items-center'>
            <Image
              className="mr-1"
              src={Icon1}
              alt=""
            />
            <span>133</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PubCard
