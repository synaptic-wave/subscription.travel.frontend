import useReviews from '@/hooks/useReviews'
import useHotelRooms from '@/hooks/useHotelRooms'
import SearchIcon from '@/assets/icons/search-v2.svg?react'
import WarningIcon from '@/assets/icons/warning-red.svg?react'
import { Info } from './components/Info'
import { Rooms } from './components/Rooms'
import { Review } from './components/Review'
import { Gallery } from './components/Gallery'
import { MapInfo } from './components/Map'
import { Comments } from './components/Comments'
import { Facilities } from './components/Facilities'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSearchHotels } from '@/services/search.service'
import { useGetHotelContent } from '@/services/hotel.service'
import { useEffect, useMemo, useRef, useState } from 'react'
import { languageKeys } from '@/consts/languages'
import { useCheckHotel } from '@/services/book.service'
import { Header } from '@/components/Header'
import { SearchFormMini } from '@/components/SearchFormMini'
import moment from 'moment'
import { HotelSingleContext } from './contexts'
import { DateObject } from 'react-multi-date-picker'
import { nationalities } from '@/consts/nationality'
import { Tabs } from './components/Tabs'
import useTranslate from '@/hooks/useTranslate'
import { NoRoomDialog } from '../SearchResult/components/NoRoomDialog'
import { useWishlistItem } from '@/hooks/useWishlist'
import { fetchHotelNames } from '../SearchResult'
import { commonActions } from '@/store/common/common.slice'
import { useDispatch } from 'react-redux'
import useOnScreen from '@/hooks/useOnScreen'

export function HotelSingle() {
  const [searchParams] = useSearchParams()
  const [action, setAction] = useState(null)
  const [hotelContent, setHotelContent] = useState()
  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const [isOpenNotFound, setIsOpenNotFound] = useState(false)

  const dispatch = useDispatch()
  const [isOpenMobileSearch, setIsOpenMobileSearch] = useState(false)
  const [activeTab, setActiveTab] = useState('#room-info')
  const navigate = useNavigate()
  const sessionId = searchParams.get('sessionId')
  const getHotelContent = useGetHotelContent()
  const [checkedRate, setCheckedRate] = useState(null)

  const [data, setData] = useState({})
  const { isLoading: isLoadingSearchHotels } = useSearchHotels({
    sessionId,
    queryParams: {
      onSuccess: async (res) => {
        const _res = await fetchHotelNames([res?.hotels[0]])

        setData({ ...res, hotels: _res })
      }
    }
  })

  const onChangeAction = (value) => {
    setAction(value)
  }

  const onChangeTab = (value) => {
    setActiveTab(value)
    const section = document.querySelector(value)
    // section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    const offset = 120
    const rect = section.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const finalPosition = rect.top + scrollTop - offset

    window.scrollTo({
      top: finalPosition,
      behavior: 'smooth'
    })
  }

  const adultsAmount = useMemo(() => {
    if (!data) return 0
    const adults = data?.query?.paxes
      .map((item) => item.passangers.filter((value) => value.age >= 18))
      .flat()
    return adults?.length
  }, [data])

  const { roomWithMinPrice, hotelOptions } = useHotelRooms({
    data: {
      results: {
        HotelResult: data?.hotels?.[0]
      }
    }
  })

  const {
    rating: taRating,
    reviewsCount,
    reviews,
    reviewTimes,
    reviewTypes,
    reviewRatings,
    reviewLanguages,
    filterByRating,
    filterByType,
    filterByTime,
    filterByLanguage,
    subRatings,
    tripTypes,
    hotelStyles,
    handleFilter
  } = useReviews({
    category: 'hotels',
    language: 'ko' || languageKeys.KO,
    postalCode: hotelContent?.Address.PostalCode,
    hotelName: data?.hotels?.[0]?.HotelInfo?.Name,
    hotelLat: data?.hotels?.[0]?.HotelInfo.Latitude,
    hotelLng: data?.hotels?.[0]?.HotelInfo.Longitude
  })

  const features = useMemo(() => {
    if (!hotelContent) return []

    const extractedFeatures = Array.isArray(hotelContent?.Features?.Feature)
      ? hotelContent?.Features?.Feature
      : [hotelContent?.Features?.Feature]

    return extractedFeatures?.map((feature) => feature?.value)
  }, [hotelContent])

  const roomFeatures = useMemo(() => {
    if (!hotelContent) return []

    const extractedFeatures = Array.isArray(hotelContent?.Features?.Feature)
      ? hotelContent?.Features?.Feature.filter(
          (item) => item?.attributes?.Type === 'ROO'
        )
      : [hotelContent?.Features?.Feature].filter(
          (item) => item?.attributes?.Type === 'ROO'
        )

    return extractedFeatures?.map((feature) => feature?.value)
  }, [hotelContent])

  useEffect(() => {
    if (data?.query)
      dispatch(
        commonActions.savePaxes({
          paxes: data?.query?.paxes
        })
      )
    return () => {
      dispatch(commonActions.savePaxes({ paxes: [] }))
    }
  }, [data?.query])

  useEffect(() => {
    if (hotelContent) return
    if (!data?.hotels?.[0].attributes.JPCode) return

    function getHContent() {
      getHotelContent.mutate(
        {
          language: languageKeys.KR,
          JPCode: [data?.hotels?.[0].attributes.JPCode]
        },
        {
          onSuccess: (res) => {
            setHotelContent(res.HotelContent)
          },
          onError: (err) => {
            console.log(err)
          }
        }
      )
    }

    getHContent()
  }, [data])

  const { mutate, isLoading: isLoadingCheckRate } = useCheckHotel()

  const checkIn = data?.query?.checkInDate
  const checkOut = data?.query?.checkOutDate

  const galleryImages = useMemo(() => {
    if (!hotelContent) return []
    if (!hotelContent?.Images?.Image) return []

    return Array.isArray(hotelContent?.Images?.Image)
      ? hotelContent?.Images?.Image?.filter(
          (val) => val.attributes.Type === 'BIG'
        )
          ?.map((el) => el?.FileName)
          ?.filter((url) => url)
      : [hotelContent?.Images?.Image?.FileName]
  }, [hotelContent])

  const onCheckRatePlanCode = (ratePlanCode) => {
    setCheckedRate(ratePlanCode)
    mutate(
      {
        language: import.meta.env.VITE_JUNIPER_LANG,
        ratePlanCode,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        hotelCode: data?.hotels?.[0]?.attributes.Code,
        useCurrency: import.meta.env.VITE_JUNIPER_CURRENCY
      },
      {
        onSuccess: (res) => {
          setCheckedRate(null)

          navigate('/book', {
            state: {
              hotels: [
                {
                  rate: res.HotelResult.HotelOptions.HotelOption.attributes
                    .RatePlanCode,
                  checkIn,
                  checkOut,
                  hotelCode: data?.hotels?.[0]?.attributes.Code
                }
              ]
            }
          })
        },
        onError: () => {
          setIsOpenNotFound(true)
        }
      }
    )
  }

  const currentNationality = nationalities.find(
    (item) => item.value === data?.query?.nationality
  )

  const tabs = [
    {
      title: '객실 소개',
      key: '#room-info'
    },
    {
      title: '서비스 및 부대시설',
      key: '#facilities'
    },
    {
      title: '위치',
      key: '#map'
    },
    {
      title: '리뷰',
      key: '#review'
    }
  ]

  const _description = (
    Array.isArray(hotelContent?.Descriptions?.Description)
      ? hotelContent?.Descriptions?.Description?.find(
          (el) => el?.attributes?.Type === 'LNG'
        )?.value
      : hotelContent?.Descriptions?.Description?.value
  )?.replace(
    '((* Sorry, this information is not available in the selected language and is shown in EN)',
    ''
  )

  const translatedDescriptionResponse = useTranslate(_description)

  const [wishlist, handleToggleWishlist] = useWishlistItem()

  const description =
    translatedDescriptionResponse?.data?.data?.data?.translations?.[0]
      ?.translatedText ||
    hotelContent?.Descriptions?.Description?.value ||
    _description

  const isDataLoading =
    getHotelContent.isLoading ||
    isLoadingCheckRate ||
    isLoadingSearchHotels ||
    !hotelContent?.HotelName

  return (
    <HotelSingleContext.Provider
      value={{
        occupancy: data?.query?.paxes
      }}
    >
      <NoRoomDialog
        isOpen={isOpenNotFound}
        onClose={() => setIsOpenNotFound(false)}
      />

      <Header withoutContainer>
        <>
          {!isOpenSearch && (
            <div
              onClick={() => setIsOpenSearch((prev) => !prev)}
              className='sm:flex hidden rounded-lg bg-[#F3F3FB] items-center overflow-hidden'
            >
              <button
                onClick={() => onChangeAction('location')}
                className='flex items-center py-[13px] px-4 gap-3 hover:bg-[#DBDBE8]'
              >
                <span className='scale-[0.7]'>
                  <SearchIcon />
                </span>
                <p className='text-sm text-black font-medium truncate max-w-[100px]'>
                  {data?.query?.destination}
                </p>
              </button>
              <span className='h-[20px] w-[1px] border border-[#EAEAF4]'></span>
              <button
                onClick={() => onChangeAction('date')}
                className='flex items-center py-[13px] px-4 hover:bg-[#DBDBE8]'
              >
                <p className='text-sm text-black font-medium truncate'>
                  {moment(checkIn).format('YYYY.MM.DD')} ~{' '}
                  {moment(checkOut).format('YYYY.MM.DD')}
                </p>
              </button>

              {/* <span className='h-[20px] w-[1px] border border-[#EAEAF4]'></span>
              <button
                onClick={() => onChangeAction('nationality')}
                className='flex items-center py-[13px] px-4 hover:bg-[#DBDBE8]'
              >
                <p className='text-sm text-black font-medium'>
                  {currentNationality?.name}
                </p>
              </button> */}

              <span className='h-[20px] w-[1px] border border-[#EAEAF4]'></span>
              <button
                onClick={() => onChangeAction('occupancy')}
                className='flex items-center py-[13px] px-4 hover:bg-[#DBDBE8]'
              >
                <p className='text-sm text-black font-medium truncate'>
                  객실 {data?.query?.paxes?.length}, 인원{' '}
                  {data?.query?.paxes?.reduce(
                    (prev, curr) =>
                      prev +
                      curr.passangers.filter((pass) => pass.age > 0)?.length,
                    0
                  )}
                </p>
              </button>
            </div>
          )}

          {isOpenSearch && (
            <div className='fixed w-full left-0 top-[79px] right-0 h-[100px] bg-[rgba(255,255,255,1)] z-10 border-top border-gray-500'>
              <SearchFormMini
                isHotel={true}
                setIsOpenNotFound={setIsOpenNotFound}
                isOpen={isOpenMobileSearch}
                setIsOpen={setIsOpenSearch}
                initHotelCodes={[data?.hotels?.[0]?.attributes.Code]}
                defaultValues={{
                  isOpenLocation: action === 'location',
                  isOpenDate: action === 'date',
                  isOpenOccupancy: action === 'occupancy',
                  isOpenNationality: action === 'nationality',
                  date: [
                    new DateObject({
                      year: new Date(checkIn).getFullYear(),
                      month: new Date(checkIn).getMonth() + 1,
                      day: new Date(checkIn).getDate()
                    }),
                    new DateObject({
                      year: new Date(checkOut).getFullYear(),
                      month: new Date(checkOut).getMonth() + 1,
                      day: new Date(checkOut).getDate()
                    })
                  ],
                  location: {
                    source: {
                      en_name: data?.query?.destination,
                      kr_name: data?.query?.destination,
                      attributes: {
                        ...data?.hotels?.[0]?.attributes
                      }
                    }
                  },
                  occupancies: data?.query?.paxes?.map((pax, idx) => ({
                    adults:
                      pax.passangers.filter((pax) => pax.age > 17)?.length || 0,
                    child: pax.passangers.filter(
                      (pax) => pax.age > 0 && pax.age < 18
                    )?.length,
                    childAges:
                      pax.passangers
                        .filter((pax) => pax.age > 0 && pax.age < 18)
                        .map((pax) => Number(pax.age)) || 0,
                    id: idx + 1
                  }))
                }}
              />
            </div>
          )}

          {isOpenSearch && (
            <div
              onClick={() => {
                setIsOpenSearch((prev) => !prev)
                setAction(null)
              }}
              className='fixed w-full left-0 top-[90px] right-0 bottom-0 bg-[rgba(0,0,0,0.4)]'
            ></div>
          )}
        </>
      </Header>

      <div className='sm:hidden block fixed w-full left-0 top-[79px] z-[99]'>
        <SearchFormMini
          key={isOpenMobileSearch}
          isHotel={true}
          setIsOpenNotFound={setIsOpenNotFound}
          isOpen={isOpenMobileSearch}
          setIsOpen={setIsOpenMobileSearch}
          initHotelCodes={[data?.hotels?.[0]?.attributes.Code]}
          defaultValues={{
            date: [
              new DateObject({
                year: new Date(checkIn).getFullYear(),
                month: new Date(checkIn).getMonth() + 1,
                day: new Date(checkIn).getDate()
              }),
              new DateObject({
                year: new Date(checkOut).getFullYear(),
                month: new Date(checkOut).getMonth() + 1,
                day: new Date(checkOut).getDate()
              })
            ],
            location: {
              source: {
                en_name: data?.query?.destination,
                kr_name: data?.query?.destination,
                attributes: {
                  ...data?.hotels?.[0]?.attributes
                }
              }
            },
            occupancies: data?.query?.paxes?.map((pax, idx) => ({
              adults: pax.passangers.filter((pax) => pax.age > 17)?.length || 0,
              child: pax.passangers.filter((pax) => pax.age > 0 && pax.age < 18)
                ?.length,
              childAges:
                pax.passangers
                  .filter((pax) => pax.age > 0 && pax.age < 18)
                  .map((pax) => Number(pax.age)) || 0,
              id: idx + 1
            }))
          }}
        />
      </div>

      <div className='container mx-auto px-4 mt-6'>
        <button
          className='w-full sm:hidden bg-[#F3F3FB] p-4 rounded-[10px] flex gap-4 mb-[30px]'
          onClick={() => setIsOpenMobileSearch((prev) => !prev)}
        >
          <div className='svgStrokeGray mt-1'>
            <SearchIcon />
          </div>

          <div className='flex flex-col gap-[6px]'>
            <h3 className='text-sm text-[#161A3F] font-medium text-left'>
              {hotelContent?.HotelName}
            </h3>

            <div className='flex text-[13px] text-[#5C5F79]'>
              <p>
                {checkIn} ~ {checkOut}
              </p>{' '}
              |{' '}
              <p>
                객실{data?.query?.paxes?.length}, 인원{' '}
                {data?.query?.paxes?.reduce(
                  (prev, curr) =>
                    prev +
                    curr.passangers.filter((pass) => pass.age > 0)?.length,
                  0
                )}
              </p>
            </div>
          </div>
        </button>
      </div>

      {!getHotelContent.isLoading && (
        <div className='container sm:hidden block pb-[15px] mb-[15px] sticky top-[78px] z-10 bg-white'>
          <Tabs activeTab={activeTab} onChange={onChangeTab} tabs={tabs} />
        </div>
      )}

      <Gallery
        isLoading={isDataLoading}
        hotelName={hotelContent?.HotelName}
        rating={taRating}
        images={galleryImages}
        specialMarkup={data?.hotels?.[0]?.specialMarkup?.specialMarkup}
      />

      <div className='container mx-auto px-4'>
        <Info
          sessionId={sessionId}
          hotelCode={data?.hotels?.[0]?.attributes.Code}
          name={data?.hotels?.[0]?.HotelInfo?.Name}
          nameEn={
            data?.hotels?.[0]?.HotelInfo?.NameEn || hotelContent?.HotelName
          }
          location={
            data?.hotels?.[0]?.HotelInfo?.Address ||
            hotelContent?.Address?.Address
          }
          rating={taRating}
          price={roomWithMinPrice?.price}
          commentsAmount={reviewsCount}
          stars={Number(
            data?.hotels?.[0]?.HotelInfo?.HotelCategory?.value?.replace(
              ' Stars',
              ''
            )
          )}
          checkOut={checkOut}
          checkIn={checkIn}
          adultsAmount={adultsAmount}
        />

        <Rooms
          rooms={hotelOptions}
          hotel={{
            name: hotelContent?.HotelName,
            hotelCode: data?.hotels?.[0]?.attributes.Code,
            images: galleryImages
          }}
          wishlist={wishlist}
          handleToggleWishlist={() =>
            handleToggleWishlist(data?.hotels?.[0]?.attributes.Code)
          }
          hotelDescription={description}
          checkIn={data?.query?.checkInDate}
          checkOut={data?.query?.checkOutDate}
          currency={data?.query?.language}
          sessionId={sessionId}
          onCheckRatePlanCode={onCheckRatePlanCode}
          isLoadingCheckRate={isLoadingCheckRate}
          checkedRate={checkedRate}
          roomFeatures={roomFeatures}
        />

        <Facilities
          features={features}
          description={data?.hotels?.[0]?.HotelInfo?.Description}
        />

        {data?.hotels?.[0] && (
          <MapInfo
            key={hotelContent}
            currentPlace={{
              name: hotelContent?.HotelName,
              address: hotelContent?.Address?.Address,
              image: ''
            }}
            address={data?.hotels?.[0]?.HotelInfo?.Address}
            coordinate={{
              lat: Number(data?.hotels?.[0]?.HotelInfo?.Latitude),
              lng: Number(data?.hotels?.[0]?.HotelInfo?.Longitude),
              info: {
                ...data?.hotels?.[0],
                ...data?.hotels?.[0]?.HotelInfo,
                HotelImages:
                  hotelContent?.Images?.Image?.[0]?.FileName ||
                  hotelContent?.Images?.Image?.FileName,
                rating: taRating,
                reviewsCount: reviewsCount
              }
            }}
          />
        )}

        {reviews?.length ? (
          <>
            <Review
              subRatings={subRatings}
              tripTypes={tripTypes}
              times={reviewTimes}
              types={reviewTypes}
              ratings={reviewRatings}
              languages={reviewLanguages}
              filterByType={filterByType}
              filterByTime={filterByTime}
              filterByRating={filterByRating}
              filterByLanguage={filterByLanguage}
              hotelStyles={hotelStyles}
              rating={taRating}
              commentsAmount={reviewsCount}
              handleFilter={handleFilter}
            />

            <div className='flex items-center gap-1 mt-4'>
              <WarningIcon />{' '}
              <p className='text-[#FF3838] sm:text-sm text-xs'>
                리뷰는 기계로 번역되어 오역이 있을 수 있습니다. 참고용으로만
                봐주세요!
              </p>
            </div>

            <Comments data={reviews} />
          </>
        ) : (
          <></>
        )}
      </div>
    </HotelSingleContext.Provider>
  )
}
