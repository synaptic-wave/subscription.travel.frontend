import { NumericFormat } from 'react-number-format'
import { Button, IconButton, Navigator, Radio, ShareModal } from '..'
import { useContext, useEffect, useRef, useState } from 'react'
import MoreIcon from '@/assets/icons/more.svg?react'
import ShareIcon from '@/assets/icons/share.svg?react'
import FavouriteIcon from '@/assets/icons/favourite.svg?react'
import LocationIcon from '@/assets/icons/location.svg?react'
import LocationV2Icon from '@/assets/icons/location-v3.svg?react'
import HBIcon from '@/assets/icons/hb.svg?react'
import { tripAdvisorServices } from '@/services/tripAdvisor.service'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { wishlistActions } from '@/store/wishlist/wishlist.slice'
import FavouriteFilledIcon from '@/assets/icons/favourite-fill.svg?react'
import { commonActions } from '@/store/common/common.slice'
import ChevronDownIcon from '@/assets/icons/chevron-down.svg?react'
import classNames from 'classnames'
import ChevronUpIcon from '@/assets/icons/chevron-up.svg?react'
import { HotelInfoDialog } from '@/modules/SearchResult/components/HotelInfoDialog'
import { useGetHotelContent } from '@/services/hotel.service'
import { languageKeys } from '@/consts/languages'
import InfoIcon from '@/assets/icons/info.svg?react'
import defaultRoomImg from '@/assets/images/defaultRoom.jpg'
import useGetRoomsByJPCode from '@/hooks/useGetRoomsByJPCode'
import { HotelContext } from '@/modules/SearchResult/contexts'
import { NoRoomDialog } from '@/modules/SearchResult/components/NoRoomDialog'
import { Oval } from 'react-loader-spinner'
import { VariantItem } from './Row'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import Slider from 'react-slick'
import { PriceSection } from '../PriceSection'
import StarIcon from '@/assets/icons/star.svg?react'
import { handleErrorOnImageLoad } from '@/consts/img'
import { useDetectIsMobile } from '@/hooks/useDetectIsMobile'

var settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  infinite: true,
  autoplaySpeed: 6000
}

export function HotelGridCard({
  img,
  name,
  nameEn,
  paxes,
  price,
  isSaved,
  isLastChild,
  description,
  lat,
  checkIn,
  checkOut,
  lng,
  hotelCode,
  isLoadingCheckRate,
  onChooseHotel,
  checkingRate,
  location,
  onGetSessionId,
  isLoadingSessionId,
  isCompared,
  onCheckRatePlanCode,
  bGroupHotel,
  cGroupHotel,
  rating,
  wishlist,
  handleToggleWishlist,
  specialMarkup
}) {
  const [taRating, setTaRating] = useState(0)
  const [taComments, setTaComments] = useState(0)
  const [isLoadingReview, setIsLoadingReviews] = useState(false)

  const dispatch = useDispatch()
  const getHotelContent = useGetHotelContent()

  const [showMap, setShowMap] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [showList, setShowList] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [hotelStyles, setHotelStyles] = useState(null)
  const [ratingAmoungHotels, setRatingAmoungHotels] = useState(null)
  const [hotelContent, setHotelContent] = useState()
  const [showDetailPopup, setShowDetailPopup] = useState(false)
  const [showAllOptions, setShowAllOptions] = useState(false)
  const [isOpenNotFound, setIsOpenNotFound] = useState(false)
  const [taLocationId, setTaLocationId] = useState()
  const [taImages, setTaImages] = useState([])

  const isMobile = useDetectIsMobile()

  const { occupancy, createSessionReqPayload } = useContext(HotelContext)
  const { hotelOptions: hotelRooms, isLoading } = useGetRoomsByJPCode({
    JPCode: showList ? hotelCode : null,
    payload: {
      ...createSessionReqPayload,
      paxes: occupancy
    },
    onError: () => {
      setIsOpenNotFound(true)
      setShowList(false)
    }
  })

  useEffect(() => {
    if (!hotelCode) return

    function getHContent() {
      getHotelContent.mutate(
        {
          language: languageKeys.KR,
          JPCode: [hotelCode]
        },
        {
          onSuccess: (res) => {
            setHotelContent(res?.HotelContent)
          },
          onError: (err) => {
            console.log(err)
          }
        }
      )
    }

    getHContent()
  }, [hotelCode])

  const getSessionId = async () => {
    try {
      const _sessionId = await onGetSessionId(hotelCode)

      setSessionId(_sessionId)
    } catch (err) {
      console.log(err)
    }
  }

  const onClickCompareBtn = () => {
    dispatch(
      commonActions.toggleHotelFromCompareList({
        JPCode: hotelCode,
        name
      })
    )
  }

  const listRef = useRef()
  const mapRef = useRef()

  useOutsideClick(listRef, () => {
    if (showList) setShowList(false)
  })

  useOutsideClick(mapRef, () => {
    if (mapRef) setShowMap(false)
  })

  const toggleShareModal = () => {
    if (!sessionId && !showShareModal) {
      getSessionId()
    }
    setShowShareModal(true)
  }

  useEffect(() => {
    const fetchReview = async () => {
      setIsLoadingReviews(true)
      const tripadvisorLocation = await tripAdvisorServices.getNearestObjects({
        searchQuery: name,
        language: 'ko',
        category: 'hotels',
        latLong: [lat, lng].join(',')
      })
      if (tripadvisorLocation?.data?.[0]?.location_id) {
        const tripadvisorReviews = await tripAdvisorServices.getLocationDetails(
          tripadvisorLocation?.data?.[0]?.location_id,
          { language: 'ko', currency: 'KRW' }
        )
        setRatingAmoungHotels(tripadvisorReviews?.ranking_data?.ranking_string)
        setHotelStyles(tripadvisorReviews?.styles?.join(' , '))
        setTaRating(tripadvisorReviews?.rating)
        setTaComments(tripadvisorReviews?.num_reviews)
      }

      setTaLocationId(tripadvisorLocation?.data?.[0]?.location_id)

      setIsLoadingReviews(false)
    }

    fetchReview()
  }, [name, lat, lng])

  const Images = Array.isArray(hotelContent?.Images?.Image)
    ? hotelContent?.Images?.Image?.filter(
        (val) => val?.attributes?.Type === 'BIG'
      )
        ?.map((image) => image?.FileName)
        ?.filter((url) => url)
    : [hotelContent?.Images?.Image?.FileName]

  const Features = Array.isArray(hotelContent?.Features?.Feature)
    ? hotelContent?.Features?.Feature?.map((feature) => feature?.value)
    : hotelContent?.Features?.Feature?.value

  useEffect(() => {
    if (!hotelContent) return
    if (Images?.length > 0) return
    if (taImages?.length > 0) return

    const getHotelPhotos = async () => {
      const _res = await tripAdvisorServices.getLocationPhotos(taLocationId)

      if (_res?.data?.length > 0) {
        setTaImages(_res.data?.map((item) => item?.images.small.url))
      }
    }

    getHotelPhotos()
  }, [Images, hotelContent, taLocationId])

  const [isFullTaLevel, setIsFullTravel] = useState(false)

  const _images = Images?.length > 0 ? Images : taImages

  return (
    <div className='w-full flex h-full border border-solid border-gray-100 rounded-[10px] flex-col relative'>
      <div className='w-full flex flex-col'>
        <div
          onClick={() => onChooseHotel(hotelCode, name)}
          className='w-full h-[240px] max-h-[240px] overflow-hidden relative'
        >
          {_images?.length > 1 ? (
            <Slider {...settings}>
              {_images?.map((img, idx) => (
                <img
                  src={img || defaultRoomImg}
                  className='object-cover w-full h-[240px]'
                  onError={handleErrorOnImageLoad}
                  key={idx}
                />
              ))}
            </Slider>
          ) : _images?.length === 1 ? (
            <img
              src={_images[0] || defaultRoomImg}
              className='object-cover w-full h-[240px]'
              onError={handleErrorOnImageLoad}
            />
          ) : (
            <img
              src={defaultRoomImg}
              onError={handleErrorOnImageLoad}
              className='object-cover w-full h-[240px]'
            />
          )}
          {specialMarkup?.specialMarkup && (
            <img
              src={specialMarkup.specialMarkup.imageURL.browser}
              className='w-[35px] h-[43px] object-contain left-[10px] top-[10px] absolute'
            />
          )}
        </div>

        <div className='flex flex-1 flex-col p-[14px] sm:p-5'>
          <div className='flex items-center mb-1'>
            {Array(rating || 0)
              .fill(1)
              .map((_) => (
                <StarIcon />
              ))}
          </div>
          <div className='w-full flex flex-col justify-between'>
            <h3
              onClick={() => onChooseHotel(hotelCode, name)}
              className='text-[15px] leading-[21px] sm:text-[18px] sm:leading-[26px] font-medium w-full truncate text-left'
            >
              {name}
            </h3>

            <h3
              onClick={() => onChooseHotel(hotelCode, name)}
              className='text-[15px] leading-[21px] sm:text-[18px] sm:leading-[26px] font-medium w-full truncate text-left'
            >
              {nameEn}
            </h3>
          </div>

          <div className='w-full flex flex-col mt-[5px]'>
            <div className='w-full flex flex-col'>
              <button
                className='flex gap-1 items-center text-[#5C5F79] text-xs sm:text-[13px]'
                // onClick={() => setShowMap((prev) => !prev)}
              >
                <LocationIcon className='min-w-[18px]' />{' '}
                <span className='truncate'>{location}</span>
              </button>
              {/* <span className='flex items-center text-[#5C5F79] text-[13px]'>
                <LocationIcon /> 리지필드 - 지도
              </span> */}

              <div className='flex items-center mt-[8px]'>
                {!!taRating && <p className='text-sm mr-1'>고객평점</p>}
                {!!taRating && <HBIcon />}

                {isLoadingReview ? (
                  <div className='flex items-center ml-2 gap-[2px]'>
                    <Skeleton height={18} width={100} />
                  </div>
                ) : (
                  <div className='flex items-center ml-2 gap-[2px] h-[26px]'>
                    {!!taRating &&
                      Array(Math.floor(taRating || 0))
                        ?.fill(1)
                        ?.map((_) => (
                          <span className='md:w-[16px] md:h-[16px] w-[9.8px] h-[9.8px] border border-solid border-[#00AA6C] rounded-xl bg-[#00AA6C]'></span>
                        ))}

                    {!!taRating &&
                      Array(5 - Math.floor(taRating || 0))
                        ?.fill(1)
                        ?.map((_) => (
                          <span className='md:w-[16px] md:h-[16px] w-[9.8px] h-[9.8px] border border-solid border-[#00AA6C] rounded-xl bg-white'></span>
                        ))}
                  </div>
                )}

                <span className='ml-2 text-[12px] text-[#333333]'>
                  {isLoadingReview ? (
                    <Skeleton height={18} width={30} />
                  ) : (
                    !!taComments &&
                    taComments !== '0' && (
                      <NumericFormat
                        value={taComments}
                        thousandSeparator
                        displayType='text'
                      />
                    )
                  )}
                </span>
              </div>

              <p
                className={classNames(
                  'text-[11px] sm:text-[13px] font-normal text-[#FE8900] mt-[4px]',
                  {
                    'sm:h-[19.5px] more-dots-1': !isFullTaLevel
                  }
                )}
                onClick={() => setIsFullTravel((prev) => !prev)}
              >
                {ratingAmoungHotels}
              </p>

              <p className='mt-[5px] more-dots text-[11px] sm:text-[13px] sm:h-[19.5px] text-[#161A3F] md:w-auto'>
                {hotelStyles ? `호텔스타일 : ${hotelStyles}` : ''}
              </p>
            </div>

            <div className='w-full flex mt-[10px] gap-1'>
              <IconButton
                onClick={handleToggleWishlist}
                className='h-10 w-10 flex justify-center items-center'
                icon={
                  wishlist?.includes(hotelCode) ? (
                    <FavouriteFilledIcon />
                  ) : (
                    <FavouriteIcon />
                  )
                }
                active={isSaved}
              />
              <IconButton
                className='h-10 w-10 flex justify-center items-center'
                icon={<ShareIcon />}
                onClick={toggleShareModal}
                active={showShareModal}
              />
              <IconButton
                className='h-10 w-10 flex justify-center items-center'
                icon={<InfoIcon />}
                active={showDetailPopup}
                onClick={() => setShowDetailPopup((prev) => !prev)}
              />
              <IconButton
                className='h-10 w-10 flex justify-center items-center'
                icon={showMap ? <LocationIcon /> : <LocationV2Icon />}
                active={showMap}
                onClick={() => setShowMap((prev) => !prev)}
              />

              <IconButton
                onClick={onClickCompareBtn}
                icon={<p className='text-[14px] text-[#161A3F]'>호텔 비교</p>}
                className={classNames(
                  'sm:w-[83px] w-[100px] flex items-center justify-center',
                  {
                    ['border-[#2D40FF] text-[#2D40FF]']: isCompared
                  }
                )}
                style={{
                  borderRadius: 8,
                  border: isCompared
                    ? '1px solid #2D40FF'
                    : '1px solid rgb(234, 234, 244)',
                  color: isCompared && '#2D40FF'
                }}
              />
            </div>

            <div className='w-full flex gap-2 justify-between items-end'>
              <div className='flex flex-col items-start mt-[10px] w-[60%]'>
                <PriceSection
                  textAlign='left'
                  responsiveTextAlign='left'
                  price={price}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  // hotelOffers={[1, 2]}
                  paxes={paxes}
                />

                <p className='text-[11px] mt-1 text-[#087671]'>
                  세금 및 기타 요금 포함
                </p>
              </div>

              {showList ? (
                <>
                  {isLoading ? (
                    <IconButton
                      onClick={() => setShowList((prev) => !prev)}
                      icon={
                        <div className='flex justify-center'>
                          <Oval
                            visible={true}
                            height='20'
                            width='20'
                            ariaLabel='color-ring-loading'
                            color='#2D40FF'
                            strokeWidth={5}
                            secondaryColor='#9ca3af'
                          />
                        </div>
                      }
                      className='w-[100px] h-[40px] min-h-[40px]'
                    />
                  ) : (
                    <Button
                      onClick={() => setShowList((prev) => !prev)}
                      rightIcon={<ChevronDownIcon />}
                      size={window.innerWidth < 600 ? 'xs' : 'sm'}
                      isLoading={isLoading}
                      className='w-[100px]'
                    >
                      닫기
                    </Button>
                  )}
                </>
              ) : (
                <IconButton
                  onClick={() => setShowList((prev) => !prev)}
                  icon={
                    <div className='flex justify-center gap-[8px]'>
                      <p className='text-[14px] text-[#2D40FF]'>
                        객실보기
                        {/* {rooms?.length > 1 ? '객실보기' : '최저가 보기'} */}
                      </p>
                      <ChevronUpIcon />
                    </div>
                  }
                  className='w-[100px] h-[40px] min-h-[40px]'
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showMap && (
        <div
          ref={mapRef}
          style={{
            right:
              window.innerWidth < 600
                ? 0
                : cGroupHotel
                ? '-0.5%'
                : bGroupHotel
                ? isLastChild
                  ? '0'
                  : '-110%'
                : 'initial',
            width: document.getElementById('grid-hotels').offsetWidth
          }}
          className={classNames(
            'w-full m-0 p-0 list-none absolute top-[99%] bg-white z-[999] border border-solid border-gray-100 border-t-0',
            {
              'relative top-auto right-0':
                isLastChild && window.innerWidth < 600
            }
          )}
        >
          <Navigator address={location} lat={lat} lng={lng} />
        </div>
      )}

      {showList && !isLoading && (
        <ul
          ref={listRef}
          style={{
            right: cGroupHotel
              ? '-0.5%'
              : bGroupHotel
              ? isLastChild && window.innerWidth < 600
                ? '0'
                : '-110%'
              : 'initial',
            width: document.getElementById('grid-hotels').offsetWidth
          }}
          className={classNames(
            'w-full m-0 p-0 list-none absolute top-[99%] bg-white z-[999] border border-solid border-gray-100 border-t-0',
            {
              'relative top-auto left-0': window.innerWidth < 600,
              'max-h-[440px] overflow-y-auto':
                !isLastChild && !(window.innerWidth < 600)
            }
          )}
        >
          {(showAllOptions ? hotelRooms : [...hotelRooms].slice(0, 1))?.map(
            (group, rIdx) => (
              <li className='w-full' key={rIdx}>
                <VariantItem
                  options={group.options}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  hotel={{
                    images: _images,
                    name,
                    hotelCode
                  }}
                  onCheckRatePlanCode={(val) =>
                    onCheckRatePlanCode(val, hotelCode)
                  }
                  isLoadingCheckRate={isLoadingCheckRate}
                  name={group.name}
                  checkingRate={checkingRate}
                />
              </li>
            )
          )}

          {hotelRooms?.length > 1 && (
            <li className='w-full h-[50px] flex items-center justify-center border-t border-solid border-gray-100 bg-[#F8F8FC] sticky bottom-0'>
              <button
                className='flex items-center gap-[5px] text-sm text-[#2D40FF]'
                onClick={() => setShowAllOptions((prev) => !prev)}
              >
                {showAllOptions ? (
                  <span>옵션 숨기기</span>
                ) : (
                  <>
                    <MoreIcon /> <span>더 많은 객실 보기</span>
                  </>
                )}
              </button>
            </li>
          )}
        </ul>
      )}

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        isLoading={isLoadingSessionId}
        sessionId={sessionId}
      />

      <NoRoomDialog
        isOpen={isOpenNotFound}
        onClose={() => setIsOpenNotFound(false)}
      />

      <HotelInfoDialog
        isOpen={showDetailPopup}
        onClose={() => setShowDetailPopup(false)}
        name={name}
        location={location}
        description={description}
        taRating={taRating}
        images={Images}
        features={Features}
        taComments={taComments}
        isLoadingReview={isLoadingReview}
      />
    </div>
  )
}
