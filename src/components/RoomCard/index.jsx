import image1 from '@/assets/images/room.png'
import GalleryIcon from '@/assets/icons/gallery.svg?react'
import PersonIcon from '@/assets/icons/person-v2.svg?react'
import BedIcon from '@/assets/icons/bed-v2.svg?react'
import ArrowRightIcon from '@/assets/icons/arrow-right-v2.svg?react'
import { useContext, useMemo, useState } from 'react'
import { Radio } from '../Radio'
import { AddToCart } from '../AddToCart'
import { Button } from '../Button'
import classNames from 'classnames'
import { NumericFormat } from 'react-number-format'
import useCalculateOccupancy from '@/hooks/useCalculateOccupancy'
import { getCancelationExpiredDate } from '@/utils/hotelFunctions'
import moment from 'moment'
import { HotelSingleContext } from '@/modules/HotelSingle/contexts'
import { toast } from 'react-toastify'
import Slider from 'react-slick'
import roomImg from '@/assets/images/defaultRoom.jpg'
import { boardTypeKeys } from '@/consts/boards'
import { PriceSection } from '../PriceSection'
import { handleErrorOnImageLoad } from '@/consts/img'

export function RoomCard({
  isGrid,
  isLast,
  name,
  checkIn,
  checkOut,
  groups,
  hotel,
  onCheckRatePlanCode,
  isLoadingCheckRate,
  rtl,
  JRCode,
  checkedRate,
  onOpenRoomInfo,
  images,
  rtlSlider,
  noImage = false
}) {
  const [selectedVariant, setSelectedVariant] = useState(groups[0])
  const { occupancy: paxes } = useContext(HotelSingleContext)
  const { adults, occupancy, maxOccupancy } = useCalculateOccupancy({
    hotelRooms: selectedVariant?.HotelRooms?.HotelRoom,
    paxes
  })

  const offers = useMemo(() => {
    if (!selectedVariant?.AdditionalElements?.HotelOffers?.HotelOffer) return []
    const _offers = Array.isArray(
      selectedVariant.AdditionalElements.HotelOffers.HotelOffer
    )
      ? selectedVariant.AdditionalElements.HotelOffers.HotelOffer
      : [selectedVariant.AdditionalElements.HotelOffers.HotelOffer]
    return _offers.filter((item) => item.attributes.Amount !== undefined)
  }, [selectedVariant])

  const cancellationDate = useMemo(
    () => getCancelationExpiredDate(selectedVariant),
    [selectedVariant]
  )

  const onNavigateToBooking = () => {
    onCheckRatePlanCode(selectedVariant.attributes.RatePlanCode)
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 6000,
    rtl: rtlSlider
  }

  return (
    <div
      className={classNames(
        'sm:p-[30px] p-[12px] flex gap-[20px] sm:gap-[30px] w-full border-gray-100 sm:flex-row flex-col',
        isGrid
          ? rtl
            ? 'sm:flex-col gap-[20px] border-r border-b'
            : 'sm:flex-col gap-[20px] border-b'
          : 'border-b',
        isLast && 'border-none'
      )}
    >
      <div
        className={classNames(
          isGrid
            ? 'w-full relative max-h-[180px] h-[180px] sm:max-h-[240px] sm:h-[240px]'
            : 'min-w-[280px] sm:max-w-[280px] max-w-full relative max-h-[240px] h-[240px]',
          {
            'h-0 max-h-0 min-h-0 hidden': noImage
          }
        )}
      >
        {!noImage ? (
          images.length > 1 ? (
            <Slider {...settings}>
              {images.map((image) => (
                <div
                  className={isGrid ? 'h-[180px] sm:h-[240px]' : 'h-[240px]'}
                >
                  <img
                    className='w-full h-full object-cover rounded-[10px]'
                    src={image}
                    onError={handleErrorOnImageLoad}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img
              className='w-full h-full object-cover rounded-[10px]'
              src={images[0] || roomImg}
              onError={handleErrorOnImageLoad}
            />
          )
        ) : (
          ''
        )}

        {images.length > 0 && (
          <button
            style={{ background: 'rgba(0, 0, 0, 0.70)' }}
            onClick={() =>
              onOpenRoomInfo({
                maxOccupancy,
                occupancy,
                name,
                images,
                JRCode:
                  selectedVariant?.HotelRooms?.HotelRoom?.attributes?.JRCode
              })
            }
            className='absolute text-white gap-1 text-[11px] font-bold bottom-[20px] right-[20px] flex items-center py-[6px] px-[13px] rounded-[100px]'
          >
            <GalleryIcon className='gallery-icon' />
            {images.length} +
          </button>
        )}
      </div>

      <div className='flex justify-between flex-auto'>
        <div className='flex flex-col justify-between sm:w-auto w-full'>
          <div className='mb-4'>
            <p className='text-sm sm:text-lg font-medium mb-3'>{name}</p>
            <p className='flex items-center gap-1 sm:text-[13px] text-xs'>
              <PersonIcon />
              기준 {occupancy}인 / 최대 {maxOccupancy}인
            </p>
            {/* <p className='flex items-center gap-1 sm:text-[13px] text-xs mt-2'>
              <BedIcon />
              퀸사이즈 침대 1개
            </p> */}
            <div className='mt-[20px] flex sm:flex-col flex-row flex-wrap'>
              {groups.map((item, idx) => {
                const _cancellationDate = getCancelationExpiredDate(item)

                return (
                  <Radio
                    key={item?.attributes.RatePlanCode}
                    name={item?.attributes?.RatePlanCode}
                    value={item?.attributes?.RatePlanCode}
                    onChange={() => setSelectedVariant(item)}
                    checked={
                      item?.attributes?.RatePlanCode ===
                      selectedVariant?.attributes?.RatePlanCode
                    }
                    label={
                      idx === 0 ? (
                        <>
                          {boardTypeKeys[item?.Board?.value] ||
                            item?.Board?.value}{' '}
                          <span
                            className={classNames('ml-3', {
                              'text-[#0066FF]': !!_cancellationDate,
                              'text-[#FF3838]': !_cancellationDate
                            })}
                          >
                            {!!_cancellationDate ? '무료 취소' : '취소 불가'}
                          </span>
                        </>
                      ) : (
                        <>
                          {boardTypeKeys[item?.Board?.value] ||
                            item?.Board?.value}{' '}
                          +
                          <NumericFormat
                            value={
                              Number(
                                item?.Prices?.Price?.TotalFixAmounts?.attributes
                                  ?.Gross
                              ) -
                              Number(
                                groups[0]?.Prices?.Price?.TotalFixAmounts
                                  ?.attributes?.Gross
                              )
                            }
                            thousandSeparator
                            displayType='text'
                          />
                          원
                          <span
                            className={classNames('ml-3', {
                              'text-[#0066FF]': !!_cancellationDate,
                              'text-[#FF3838]': !_cancellationDate
                            })}
                          >
                            {!!_cancellationDate ? '무료 취소' : '취소 불가'}
                          </span>
                        </>
                      )
                    }
                  />
                )
              })}
            </div>
          </div>

          <div className='sm:hidden w-full flex justify-between'>
            <div className='flex items-start flex-col'>
              <PriceInfo
                price={
                  selectedVariant?.Prices?.Price?.TotalFixAmounts?.attributes
                    ?.Gross
                }
                checkIn={checkIn}
                checkOut={checkOut}
                adults={adults}
                cancellationDate={cancellationDate}
                offers={offers}
              />
            </div>
            <div className='flex items-end gap-4'>
              <AddToCart
                room={{
                  ...selectedVariant,
                  name
                }}
                hotel={{
                  ...hotel,
                  checkIn,
                  checkOut,
                  paxes,
                  images: images?.length === 0 ? hotel.images : images
                }}
              />
              {paxes?.length === 1 && (
                <Button
                  isLoading={
                    checkedRate === selectedVariant?.attributes?.RatePlanCode &&
                    isLoadingCheckRate
                  }
                  onClick={onNavigateToBooking}
                >
                  예약하기
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className='sm:flex hidden flex-col justify-between items-end min-w-[200px]'>
          <div className='flex items-end flex-col'>
            <button
              onClick={() =>
                onOpenRoomInfo({
                  maxOccupancy,
                  occupancy,
                  name,
                  JRCode:
                    selectedVariant?.HotelRooms?.HotelRoom?.attributes?.JRCode
                })
              }
              className='text-[15px] font-medium flex items-center gap-1'
            >
              객실 정보 <ArrowRightIcon />
            </button>
            <PriceInfo
              price={
                selectedVariant?.Prices?.Price?.TotalFixAmounts?.attributes
                  ?.Gross
              }
              checkIn={checkIn}
              checkOut={checkOut}
              adults={adults}
              cancellationDate={cancellationDate}
              offers={offers}
            />
          </div>
          <div className='flex items-end gap-4 mt-2'>
            <AddToCart
              room={{
                ...selectedVariant,
                name
              }}
              hotel={{
                ...hotel,
                checkIn,
                checkOut,
                paxes,
                images: images?.length === 0 ? hotel.images : images
              }}
            />
            {paxes?.length === 1 && (
              <Button
                className={classNames(isGrid && 'mt-[30px]', 'sm:mt-0 mt-3')}
                onClick={onNavigateToBooking}
                isLoading={
                  checkedRate === selectedVariant?.attributes?.RatePlanCode &&
                  isLoadingCheckRate
                }
              >
                예약하기
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const PriceInfo = ({
  price,
  cancellationDate,
  adults,
  offers,
  checkIn,
  checkOut
}) => {
  return (
    <>
      <PriceSection
        price={price}
        checkIn={checkIn}
        checkOut={checkOut}
        responsiveTextAlign='left'
        textAlign='right'
        // hotelOffers={[1, 2, 3]}
        paxes={adults}
      />
      {/* <p className="sm:text-2xl text-lg font-bold mt-[10px]">
        <div className="flex justify-end items-center  gap-[6px]">
          <span className="bg-[#FFF06B] px-[3px] py-[7px] text-xs font-medium rounded-[5px]">
            30% 할인
          </span>

          <div className="flex items-center text-[#FF3838]">
            <span className="text-[13px] font-normal line-through">
              <NumericFormat
                prefix="₩"
                value={price}
                displayType="text"
                thousandSeparator
              />
            </span>
          </div>
        </div>
        <NumericFormat value={price} thousandSeparator displayType="text" />{" "}
        <span className="sm:text-[16px] text-xs font-[400]">원</span>
      </p> */}
      {/* <p className="sm:text-xs text-[11px] text-[#5C5F79] mt-1">
        1박 최저가, 성인 {adults}명 기준
      </p> */}
      {offers.map((item) => (
        <p className='sm:text-xs text-[11px] text-[#087671] mt-1'>
          {item.Name}:{' '}
          <NumericFormat
            value={Number(item.attributes.Amount)}
            thousandSeparator
            displayType='text'
          />
          원
        </p>
      ))}

      <p
        className={classNames(
          'sm:text-xs text-[11px] sm:mt-[14px] mt-[10px]',
          cancellationDate ? 'text-[#06F]' : 'text-[#FF176B]'
        )}
      >
        {cancellationDate
          ? moment(cancellationDate).format('YYYY년 MM월 DD일까지 취소 가능')
          : '취소 불가'}
      </p>
    </>
  )
}
