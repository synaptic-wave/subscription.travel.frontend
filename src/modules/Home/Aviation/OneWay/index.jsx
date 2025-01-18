import { useEffect, useState } from 'react'
import { Banner } from '../../components/Banner'
import { RecommendedTravel } from '../../components/RecommendedTravel'
import { NoRoomDialog } from '../../../SearchResult/components/NoRoomDialog'
import { SearchDialog } from '../../../SearchResult/components/SearchDialog'
import { useGetSections } from '@/services/section.service'
import { SalesBanner } from '../../components/SalesBanner'
import bannerImg from '@/assets/images/aviation_banner.png'
import { AviaSearchForm } from '../../components/AviaSearchForm'

export function OneWay() {
  const [isOpenNotFound, setIsOpenNotFound] = useState(false)
  const [isOpenSearchHotel, setIsOpenSearchHotel] = useState(false)

  const { data } = useGetSections({
    params: {
      page: 1,
      page_size: 1000,
      sortBy: 'order:asc'
    }
  })

  return (
    <>
      <AviaSearchForm
        setIsOpenNotFound={setIsOpenNotFound}
        setIsOpenSearchHotel={setIsOpenSearchHotel}
      />

      <Banner
        img={bannerImg}
        content={
          <>
            <p className='text-[48px] leading-[64px] font-bold text-primary mb-[2px]'>
              15개 항공사 150개 노선
            </p>
            <p className='text-[28px] leading-[37px]'>항공 발권 수수료 면제</p>
            <p className='text-[18px] leading-[24px]'>
              온라인 최저가 대비 55,788원 절약 (항공포함)
            </p>
          </>
        }
      />

      <AviaSearchForm
        setIsOpenNotFound={setIsOpenNotFound}
        setIsOpenSearchHotel={setIsOpenSearchHotel}
      />

      <Banner
        img={bannerImg}
        content={
          <>
            <p className='text-[48px] leading-[64px] font-bold text-primary mb-[2px]'>
              15개 항공사 150개 노선
            </p>
            <p className='text-[28px] leading-[37px]'>항공 발권 수수료 면제</p>
            <p className='text-[18px] leading-[24px]'>
              온라인 최저가 대비 55,788원 절약 (항공포함)
            </p>
          </>
        }
      />

      <NoRoomDialog
        isOpen={isOpenNotFound}
        onClose={() => setIsOpenNotFound(false)}
      />
      <SearchDialog
        isOpen={isOpenSearchHotel}
        onClose={() => setIsOpenSearchHotel(false)}
      />
    </>
  )
}
