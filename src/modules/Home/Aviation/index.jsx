import { useEffect, useState } from 'react'
import { Banner } from '../components/Banner'
import { CashbackHotels } from '../components/CashbackHotels'
import { RecommendedTravel } from '../components/RecommendedTravel'
import { SearchForm } from '../components/SearchFrom'
import { NoRoomDialog } from '../../SearchResult/components/NoRoomDialog'
import { SearchDialog } from '../../SearchResult/components/SearchDialog'
import { UpTargetDirections } from '../components/UpTargetDirections'
import { useGetSections } from '@/services/section.service'
import { TripBoard } from '../components/TripBoard'
import { PreviewHotels } from '../components/PreviewHotels'
import { CouponEventModal } from '../components/CouponEvent'
import { SalesBanner } from '../components/SalesBanner'
import bannerImg from '@/assets/images/aviation_banner.png'
import { AviaSearchForm } from '../components/AviaSearchForm'

export function Aviation() {
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
      <div className='container'>
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
              <p className='text-[28px] leading-[37px]'>
                항공 발권 수수료 면제
              </p>
              <p className='text-[18px] leading-[24px]'>
                온라인 최저가 대비 55,788원 절약 (항공포함)
              </p>
            </>
          }
        />

        <SalesBanner />
        <RecommendedTravel
          recommendedLocations={data?.results?.find(
            (item) => item.template === 'group-card'
          )}
        />
      </div>

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
