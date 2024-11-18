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
import bannerImg from '@/assets/images/hotel_banner.png'

export function Hotel() {
  const [isOpenNotFound, setIsOpenNotFound] = useState(false)
  const [isOpenSearchHotel, setIsOpenSearchHotel] = useState(false)
  const { data } = useGetSections({
    params: {
      page: 1,
      page_size: 1000,
      sortBy: 'order:asc'
    }
  })

  const showPrivacyOrder = data?.results?.filter(
    (item) => item.template === 'group-hotel'
  )

  return (
    <>
      <div className='container'>
        <TripBoard
          setIsOpenNotFound={setIsOpenNotFound}
          setIsOpenSearchHotel={setIsOpenSearchHotel}
          recommendedLocations={data?.results?.find(
            (item) => item.template === 'group-card'
          )}
        />

        <Banner
          img={bannerImg}
          content={
            <>
              <p className='text-[48px] leading-[64px] font-bold text-primary mb-[23px]'>
                1번 여행으로 받는 할인 혜택!
                <br /> 연간 멤버십 가격보다 크다고?
              </p>
              <p className='text-[24px] leading-[32px]'>
                예시) 제주 신라호텔 2인 / 24.12.9~11{' '}
              </p>
              <p className='text-[24px] text-center leading-[32px]'>
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

      {data?.results?.map((item) => {
        return item.template === 'location' ? (
          // <RecommendedTravel key={item.id} section={item} />
          <></>
        ) : item.template === 'group-hotel' ? (
          <UpTargetDirections
            isShowPrivacy={showPrivacyOrder[0].order === item.order}
            key={item.id}
            section={item}
          />
        ) : item.template === 'preview-hotel' ? (
          <PreviewHotels
            isShowPrivacy={showPrivacyOrder[0].order === item.order}
            key={item.id}
            section={item}
          />
        ) : (
          // <CashbackHotels key={item.id} section={item} />
          <></>
        )
      })}
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
