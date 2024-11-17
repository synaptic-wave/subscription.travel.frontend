import { useEffect, useState } from 'react'
import { Banner } from './components/Banner'
import { CashbackHotels } from './components/CashbackHotels'
import { RecommendedTravel } from './components/RecommendedTravel'
import { SearchForm } from './components/SearchFrom'
import { Header } from '@/components/Header'
import { NoRoomDialog } from '../SearchResult/components/NoRoomDialog'
import { SearchDialog } from '../SearchResult/components/SearchDialog'
import { UpTargetDirections } from './components/UpTargetDirections'
import { useGetSections } from '@/services/section.service'
import { TripBoard } from './components/TripBoard'
import { PreviewHotels } from './components/PreviewHotels'
import { CouponEventModal } from './components/CouponEvent'
import { SubHeader } from './components/SubHeader'
import { SalesBanner } from './components/SalesBanner'

export function Home() {
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
      <Header />
      <SubHeader />
      <NoRoomDialog
        isOpen={isOpenNotFound}
        onClose={() => setIsOpenNotFound(false)}
      />
      <SearchDialog
        isOpen={isOpenSearchHotel}
        onClose={() => setIsOpenSearchHotel(false)}
      />

      <TripBoard
        setIsOpenNotFound={setIsOpenNotFound}
        setIsOpenSearchHotel={setIsOpenSearchHotel}
        recommendedLocations={data?.results?.find(
          (item) => item.template === 'group-card'
        )}
      />
      {/* <CouponEventModal /> */}
      <div className='container'>
        {/* <h4 className="text-[20px] mb-[20px] sm:text-[36px] mt-[20px] font-[500] sm:text-center sm:mt-[27px] sm:mb-[50px]">
          문화에 여행을 더하다!{" "}
          <span className="text-primary-600">컬쳐랜드 트래블</span>
        </h4>

        <SearchForm
          setIsOpenNotFound={setIsOpenNotFound}
          setIsOpenSearchHotel={setIsOpenSearchHotel}
        /> */}

        <Banner />
        <SalesBanner />
        <RecommendedTravel />
        {/* <RecommendedTravel />
        <CashbackHotels />
        <UpTargetDirections />
        <DownTargetDirections /> */}
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
    </>
  )
}
