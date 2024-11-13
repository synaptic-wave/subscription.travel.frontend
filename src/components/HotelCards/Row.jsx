import { NumericFormat } from 'react-number-format'
import { Button, IconButton, Navigator, Radio, ShareModal } from '..'
import { useContext, useEffect, useMemo, useState } from 'react'
import { AddToCart } from '../AddToCart'
import StarIcon from '@/assets/icons/star.svg?react'
import ChevronUpIcon from '@/assets/icons/chevron-up.svg?react'
import ChevronDownIcon from '@/assets/icons/chevron-down.svg?react'
import ShareIcon from '@/assets/icons/share.svg?react'
import FavouriteIcon from '@/assets/icons/favourite.svg?react'
import LocationIcon from '@/assets/icons/location.svg?react'
import HBIcon from '@/assets/icons/hb.svg?react'
import MoreIcon from '@/assets/icons/more.svg?react'
import classNames from 'classnames'
import useCalculateOccupancy from '@/hooks/useCalculateOccupancy'
import { tripAdvisorServices } from '@/services/tripAdvisor.service'
import Skeleton from 'react-loading-skeleton'
import FavouriteFilledIcon from '@/assets/icons/favourite-fill.svg?react'
import LocationV3Icon from '@/assets/icons/location-v3.svg?react'
import moment from 'moment'
import InfoIcon from '@/assets/icons/info.svg?react'
import Slider from 'react-slick'
import defaultRoomImg from '@/assets/images/defaultRoom.jpg'
import useGetRoomsByJPCode from '@/hooks/useGetRoomsByJPCode'

import { commonActions } from '@/store/common/common.slice'
import { useDispatch, useSelector } from 'react-redux'
import { HotelContext } from '@/modules/SearchResult/contexts'
import { wishlistActions } from '@/store/wishlist/wishlist.slice'
import { getCancelationExpiredDate } from '@/utils/hotelFunctions'
import { HotelInfoDialog } from '@/modules/SearchResult/components/HotelInfoDialog'
import { useGetHotelContent } from '@/services/hotel.service'
import { languageKeys } from '@/consts/languages'
import { Oval } from 'react-loader-spinner'
import { NoRoomDialog } from '@/modules/SearchResult/components/NoRoomDialog'
import { boardTypeKeys } from '@/consts/boards'
import { PriceSection } from '../PriceSection'
import { handleErrorOnImageLoad } from '@/consts/img'

export function HotelRowCard({
  rooms,
  name,
  nameEn,
  location = '리지필드 - 지도',
  price,
  paxes,
  img,
  rating,
  isSaved,
  description,
  defaultShowList,
  lat,
  lng,
  isCompared,
  checkIn,
  checkOut,
  hotelCode,
  onCheckRatePlanCode,
  isLoadingCheckRate,
  checkingRate,
  onChooseHotel,
  onGetSessionId,
  isLoadingSessionId,
  wishlist,
  handleToggleWishlist,
  specialMarkup
}) {
  const dispatch = useDispatch()
  const [isOpenNotFound, setIsOpenNotFound] = useState(false)

  const [hotelContent, setHotelContent] = useState()
  const [showShareModal, setShowShareModal] = useState(false)
  const [showList, setShowList] = useState(defaultShowList)
  const [showMap, setShowMap] = useState(false)
  const [showAllOptions, setShowAllOptions] = useState(false)
  const [taRating, setTaRating] = useState(null)
  const [taComments, setTaComments] = useState(null)
  const [isLoadingReview, setIsLoadingReviews] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [hotelStyles, setHotelStyles] = useState(null)
  const [ratingAmoungHotels, setRatingAmoungHotels] = useState(null)
  const [showDetailPopup, setShowDetailPopup] = useState(false)
  const [taImages, setTaImages] = useState([])
  const [taLocationId, setTaLocationId] = useState()

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

  const getHotelContent = useGetHotelContent()

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

  const contentRating = useMemo(() => {
    return Number(
      hotelContent?.HotelCategory?.attributes?.Type?.replace('est', '')
    )
  }, [hotelContent])

  const getSessionId = async () => {
    try {
      const _sessionId = await onGetSessionId(hotelCode)

      setSessionId(_sessionId)
    } catch (err) {
      console.log(err)
    }
  }

  const toggleShareModal = () => {
    if (!sessionId && !showShareModal) {
      getSessionId()
    }
    setShowShareModal((prev) => !prev)
  }

  const onClickCompareBtn = () => {
    dispatch(
      commonActions.toggleHotelFromCompareList({
        JPCode: hotelCode,
        name
      })
    )
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

  const Images = Array.isArray(hotelContent?.Images?.Image)
    ? hotelContent?.Images?.Image?.filter(
        (val) => val?.attributes?.Type === 'BIG'
      )
        ?.map((image) => image?.FileName)
        ?.filter((url) => url)
    : hotelContent?.Images?.Image?.FileName
    ? [hotelContent?.Images?.Image?.FileName]?.filter((url) => url)
    : []

  const Features = Array.isArray(hotelContent?.Features?.Feature)
    ? hotelContent?.Features?.Feature?.map((feature) => feature?.value)
    : hotelContent?.Features?.Feature?.value
    ? [hotelContent?.Features?.Feature?.value]
    : []

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

  const _images = Images?.length > 0 ? Images : taImages

  return (
    <div className='w-full flex border border-solid border-gray-100 rounded-[10px] overflow-hidden flex-col'>
      <div className='w-full flex h-full'>
        <div
          onClick={onChooseHotel}
          className='sm:w-[27%] w-[32%] min-w-[32%] sm:min-w-[27%] sm:h-[266px] h-[330px] relative'
        >
          {_images?.length > 1 ? (
            <Slider {...settings}>
              {_images?.map((img, idx) => (
                <img
                  src={img || defaultRoomImg}
                  className='object-cover w-full sm:h-[266px] h-[330px]'
                  onError={handleErrorOnImageLoad}
                  key={idx}
                />
              ))}
            </Slider>
          ) : _images?.length === 1 ? (
            <img
              src={_images[0]}
              onError={handleErrorOnImageLoad}
              className='object-cover w-full sm:h-[266px] h-[330px]'
            />
          ) : (
            <img
              src={defaultRoomImg}
              onError={handleErrorOnImageLoad}
              className='object-cover w-full sm:h-[266px] h-[330px]'
            />
          )}
          {specialMarkup?.specialMarkup && (
            <img
              src={specialMarkup.specialMarkup.imageURL.browser}
              className='w-[35px] h-[43px] object-contain left-[10px] top-[10px] absolute'
            />
          )}
        </div>

        <div className='flex w-[68%] sm:w-[73%] flex-col md:p-5 p-3'>
          {/* Row one */}
          <div className='w-full flex justify-between items-start'>
            <div className='flex flex-col'>
              <h3 className='md:text-[20px] text-[15px] w-full font-medium'>
                <button
                  onClick={onChooseHotel}
                  className='text-left w-full truncate sm:text-wrap'
                >
                  {name}
                </button>
              </h3>

              <h3 className='md:text-[20px] text-[15px] w-full font-medium'>
                <button
                  onClick={onChooseHotel}
                  className='text-left w-full truncate sm:text-wrap'
                >
                  {nameEn}
                </button>
              </h3>
            </div>

            <div className='md:flex hidden items-center justify-end'>
              {Array(rating || 0)
                .fill(1)
                .map((_) => (
                  <StarIcon />
                ))}
            </div>
          </div>

          {/* Row two */}
          <div className='w-full flex justify-between mt-[5px] sm:mt-[10px] md:flex-row flex-col'>
            <div className='md:w-[60%] w-full flex flex-col'>
              <button
                className='flex gap-1 items-center text-[#5C5F79] text-[13px] underline'
                onClick={() => setShowMap((prev) => !prev)}
              >
                <LocationIcon className='min-w-[18px]' />{' '}
                <span className='truncate'>{location}</span>
              </button>

              <div className='flex items-center mt-[5px] sm:mt-[15px] min-h-[30px] min-w-[100px]'>
                <p className='text-sm mr-1'>고객평점</p>
                {(taRating || isLoadingReview) && <HBIcon />}

                {isLoadingReview ? (
                  <div className='flex items-center ml-2'>
                    <Skeleton height={13} width={100} />
                  </div>
                ) : (
                  taRating && (
                    <div className='flex items-center ml-2 gap-[2px]'>
                      {Array(Math.floor(taRating || 0))
                        ?.fill(1)
                        ?.map((_) => (
                          <span className='md:w-[16px] md:h-[16px] w-[9.8px] h-[9.8px] border border-solid border-[#00AA6C] rounded-xl bg-[#00AA6C]'></span>
                        ))}

                      {Array(5 - Math.floor(taRating || 0))
                        ?.fill(1)
                        ?.map((_) => (
                          <span className='md:w-[16px] md:h-[16px] w-[9.8px] h-[9.8px] border border-solid border-[#00AA6C] rounded-xl bg-white'></span>
                        ))}
                    </div>
                  )
                )}

                <span className='ml-2 text-[12px] text-[#333333]'>
                  {isLoadingReview ? (
                    <Skeleton height={13} width={30} />
                  ) : taComments > 0 ? (
                    <NumericFormat
                      value={taComments}
                      thousandSeparator
                      displayType='text'
                    />
                  ) : (
                    <></>
                  )}
                </span>
              </div>

              {isLoadingReview ? (
                <div className='mt-[5px] sm:mt-[14px] h-[19.5px] more-dots-1 max-h-[20px]'>
                  <Skeleton height={13} width={200} />
                </div>
              ) : (
                <p className='text-[13px] font-normal text-[#FE8900] mt-[5px] sm:mt-[14px] h-[19.5px] more-dots-1 max-h-[20px]'>
                  {ratingAmoungHotels}
                </p>
              )}

              {isLoadingReview ? (
                <div className='h-[19.5px] md:w-auto md:h-auto'>
                  <Skeleton height={13} width={160} />
                </div>
              ) : (
                <p className='mt-[5px] more-dots text-[13px] text-[#161A3F] h-[19.5px] md:w-auto md:h-auto'>
                  {hotelStyles ? '호텔스타일 :' : ''} {hotelStyles}
                </p>
              )}
            </div>

            <div className='md:w-[40%] w-full flex flex-col md:items-end items-start'>
              <PriceSection
                responsiveTextAlign='left'
                price={price}
                checkIn={checkIn}
                checkOut={checkOut}
                // hotelOffers={[1, 2]}
                paxes={paxes}
              />

              {/* <p className="text-[12px] mt-1 text-[#5C5F79]">
                1박 최저가, 성인 {paxes}명 기준
              </p> */}

              <p className={classNames('text-[11px] mt-1 text-[#087671]')}>
                세금 및 기타 요금 포함
                {/* {boardTypeLabel} */}
              </p>
            </div>
          </div>

          {/* Row three */}
          <div className='w-full flex gap-1 sm:gap-0 sm:justify-between mt-[5px] sm:mt-[15px] flex-wrap'>
            <div className='flex gap-1 sm:gap-2'>
              <IconButton
                onClick={handleToggleWishlist}
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
                icon={<ShareIcon />}
                onClick={toggleShareModal}
                active={showShareModal}
              />

              <IconButton
                icon={<InfoIcon />}
                active={showDetailPopup}
                onClick={() => setShowDetailPopup((prev) => !prev)}
              />

              <IconButton
                onClick={onClickCompareBtn}
                icon={<p className='text-[14px] text-[#161A3F]'>호텔비교</p>}
                className={classNames(
                  'w-[83px] hidden sm:flex items-center justify-center',
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

            <div className='flex gap-1 sm:gap-2'>
              <IconButton
                icon={showMap ? <LocationIcon /> : <LocationV3Icon />}
                onClick={() => setShowMap((prev) => !prev)}
                className='sm:hidden w-[36px] h-[36px] flex items-center justify-center'
              />
              <button
                className='text-sm py-[10px] px-[16px] rounded-[10px] border border-gray-100 sm:block hidden'
                onClick={() => setShowMap((prev) => !prev)}
              >
                위치보기
              </button>

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
                      className='w-[120px]'
                    />
                  ) : (
                    <Button
                      onClick={() => setShowList((prev) => !prev)}
                      rightIcon={<ChevronDownIcon />}
                      size={window.innerWidth < 600 ? 'xs' : 'md'}
                      isLoading={isLoading}
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
                  className='w-[120px]'
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showMap && <Navigator address={location} lat={lat} lng={lng} />}

      {showList && !isLoading && (
        <ul className='w-full m-0 p-0 list-none'>
          {(showAllOptions ? hotelRooms : [...hotelRooms].slice(0, 1))?.map(
            (group, rIdx) => (
              <li className='w-full' key={rIdx}>
                <VariantItem
                  options={group.options}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  hotel={{
                    name,
                    hotelCode,
                    images: _images
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
            <li className='w-full h-[50px] flex items-center justify-center border-t border-solid border-gray-100 bg-[#F8F8FC]'>
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
        onClose={toggleShareModal}
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
        taRating={taRating}
        description={description}
        images={Images}
        features={Features}
        taComments={taComments}
        isLoadingReview={isLoadingReview}
      />
    </div>
  )
}

export const VariantItem = ({
  options,
  checkIn,
  checkOut,
  hotel,
  onCheckRatePlanCode,
  isLoadingCheckRate,
  name,
  checkingRate
}) => {
  const [selectedVariant, setSelectedVariant] = useState(options[0])

  const { occupancy } = useContext(HotelContext)

  // useEffect(() => {
  //   // if (selectedVariant) return

  //   setSelectedVariant(options[0]);
  // }, [options]);

  const { adults } = useCalculateOccupancy({
    hotelRooms: selectedVariant?.HotelRooms?.HotelRoom,
    paxes: occupancy
  })

  const cancellationDate = useMemo(
    () => getCancelationExpiredDate(selectedVariant),
    [selectedVariant]
  )

  const onNavigateToBooking = () => {
    onCheckRatePlanCode(selectedVariant?.attributes.RatePlanCode)
  }

  return (
    <div className='w-full flex sm:flex-row flex-col p-5 justify-between border-t border-solid border-gray-100'>
      <div className='flex flex-col'>
        <p>{name}</p>

        <div className='flex flex-wrap gap-1 items-center ml-[-5px]'>
          {options?.map((item, idx) => (
            <Radio
              key={item?.attributes?.RatePlanCode}
              name={item?.attributes?.RatePlanCode}
              value={item?.attributes?.RatePlanCode}
              onChange={() => setSelectedVariant(item)}
              checked={
                item?.attributes?.RatePlanCode ===
                selectedVariant?.attributes?.RatePlanCode
              }
              label={
                idx === 0 ? (
                  boardTypeKeys[item?.Board?.value] || item?.Board?.value
                ) : (
                  <>
                    {boardTypeKeys[item?.Board?.value] || item?.Board?.value} +
                    <NumericFormat
                      value={
                        Number(
                          item?.Prices?.Price?.TotalFixAmounts?.attributes
                            ?.Gross
                        ) -
                        Number(
                          options[0]?.Prices?.Price?.TotalFixAmounts?.attributes
                            ?.Gross
                        )
                      }
                      thousandSeparator
                      displayType='text'
                    />
                    원
                  </>
                )
              }
            />
          ))}
        </div>

        <span
          className={classNames('text-[#0066FF] mt-[8.5px] text-[13px]', {
            ['text-[#FF3838]']: !cancellationDate
          })}
        >
          {cancellationDate
            ? moment(cancellationDate).format('YYYY년 MM월 DD일까지 취소 가능')
            : '취소 불가'}
        </span>
      </div>

      <div className='min-w-[184px] flex items-center justify-end gap-12'>
        <div className='flex flex-col items-end'>
          <PriceSection
            responsiveTextAlign='right'
            price={
              selectedVariant?.Prices?.Price?.TotalFixAmounts?.attributes?.Gross
            }
            checkIn={checkIn}
            checkOut={checkOut}
            paxes={adults}
          />

          <p className={classNames('text-[11px] mt-1 text-[#087671]')}>
            세금 및 기타 요금 포함
            {/* {selectedVariant?.Board.value} */}
          </p>
          <div className='flex items-center gap-3 mt-4'>
            <AddToCart
              room={{
                ...selectedVariant,
                name
              }}
              hotel={{
                ...hotel,
                checkIn,
                checkOut,
                paxes: occupancy
              }}
            />
            {occupancy.length === 1 && (
              <Button
                onClick={onNavigateToBooking}
                isLoading={
                  checkingRate === selectedVariant?.attributes.RatePlanCode &&
                  isLoadingCheckRate
                }
              >
                바로 예약하기
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
