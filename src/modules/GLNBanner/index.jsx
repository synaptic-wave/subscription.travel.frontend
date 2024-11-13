import { Header } from '@/components/Header'
import Logo from '@/assets/logos/logo.svg?react'
import bannerImg from '@/assets/images/gln_banner.png'
import glnContentImg from '@/assets/images/gln_section.png'
import glnContentMobileImg from '@/assets/images/gln_section_mobile.png'
import bannerMobileImg from '@/assets/images/gln_banner_mobile.png'

import { Button } from '@/components/index'
import { Link } from 'react-router-dom'

export default function GLNBanner() {
  return (
    <>
      <Header />
      <section className='w-full flex justify-center bg-[#DDE8FC] sm:h-[320px] h-[165px] overflow-hidden'>
        <img src={bannerImg} className='sm:block hidden' />
        <img src={bannerMobileImg} className='block sm:hidden object-contain' />
      </section>

      <section className='max-w-[890px] mt-[40px] sm:mt-[123px] sm:px-0 mx-auto'>
        <div className='flex justify-center flex-col items-center mb-[16px]'>
          <Logo className='w-[200px] sm:w-auto' />
          <p className='text-[20px] sm:text-[30px] font-bold sm:mt-[12px]'>
            여행 안심결제 프로세스
          </p>
        </div>
        <img
          src={glnContentImg}
          className='sm:block hidden object-cover w-full h-auto'
        />
        <img
          src={glnContentMobileImg}
          className='block sm:hidden object-cover w-full h-auto'
        />
        <div className='grid sm:grid-cols-2 sm:px-0 px-4 grid-cols-1 gap-4 sm:mt-[30px] sm:w-[70%] w-full mx-auto'>
          <Link
            to='https://www.glninternational.com'
            target='_blank'
            className='sm:w-auto w-full'
          >
            <Button
              size={window.innerWidth > 600 ? 'md' : 'sm'}
              className='w-full'
            >
              GLN인터내셔널 자세히 보기
            </Button>
          </Link>
          <Link to='/' className='sm:w-auto w-full'>
            <Button
              size={window.innerWidth > 600 ? 'md' : 'sm'}
              variant='secondary'
              className='w-full'
            >
              호텔 검색 바로가기
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
