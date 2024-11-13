import { Header } from '@/components/Header'
import { Link, useParams } from 'react-router-dom'
import { Hero } from './components/Hero'
import { PreviewSection } from './components/PreviewSection'
import { PreviewSectionGray } from './components/PreviewSectionGray'
import { Button } from '@/components/index'
import { useGetBanner } from '@/services/target.service'
import Skeleton from 'react-loading-skeleton'

export default function Banner() {
  const { id } = useParams()

  const { data, isLoading } = useGetBanner({ id })

  return (
    <>
      <Header />
      {isLoading && <Skeleton className='sm:h-[320px] w-full h-[140px]' />}
      {!isLoading && <Hero imageUrl={data?.imageURL} />}

      <div className='w-full sm:mt-[120px] mt-[31px] sm:mb-0 mb-[13px]'>
        <PreviewSection />
      </div>

      <div className='w-full sm:mt-[120px] mt-2 bg-[#F9F9FC] sm:py-20 py-[27px]'>
        <PreviewSectionGray />
      </div>

      <div className='flex justify-center sm:mt-[63px] mt-[40px] px-4'>
        <Link to='/' className='sm:w-auto w-full'>
          <Button className='w-full'>호텔 검색 바로가기</Button>
        </Link>
      </div>
    </>
  )
}
