import { Stepper } from 'react-form-stepper'
import { BasicInfo } from './components/BasicInfo'
import { useEffect, useState } from 'react'
import { ReservationInfo } from './components/ReservationInfo'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {
  service,
  useBookingStatus,
  usePreBook,
  usePreBookById
} from '@/services/book.service'
import { Dialog } from '@/components/index'
import { Header } from '@/components/Header'
import { getRoomPaxes } from '@/utils/hotelFunctions'
import { toast } from 'react-toastify'
import { getMostExpensiveHotelCode } from '../Book'

import SearchGif from '@/assets/gifs/search.gif'

const steps = [
  { label: '예약정보' },
  { label: '결제하기' },
  { label: '예약완료' }
]

const isMacos = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  return userAgent.includes('macintosh') || userAgent.includes('mac os')
}

const isMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera

  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    userAgent.toLowerCase()
  )
}

export function PreBook() {
  const [activeStep, setActiveStep] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const preBook = usePreBook()
  const { state } = useLocation()
  const navigate = useNavigate()
  const { mutate, data } = usePreBookById()
  const [minutesUntilExpiration, setMinutesUntilExpiration] = useState()
  const [searchParams, setSearchParams] = useSearchParams()
  const moid = searchParams.get('moid')

  const hotelRooms = state?.hotelRooms
  const promocodePrice = state?.promocodePrice || 0
  const promocode = state?.promocode || ''

  const { data: reservationInfo, isLoading } = useBookingStatus({
    params: {
      moid
    },
    queryParams: {
      enabled: !!moid,
      onSuccess: (res) => {
        setActiveStep(2)
      },
      onError: () => {
        setActiveStep(2)
      }
    }
  })

  const getBookingRules = async () => {
    setIsOpen(true)
    let hotelPaxes = JSON.parse(JSON.stringify(state?.hotels))
    await Promise.all(
      hotelPaxes.map(async (item, index) => {
        try {
          const res = await service.bookingRules({
            language: import.meta.env.VITE_JUNIPER_LANG || languageKeys.KR,
            ratePlanCode: item.ratePlanCode,
            checkInDate: item.checkIn, //this field should be same with hotel /hotel-availability
            checkOutDate: item.checkOut,
            hotelCode: item.hotelCode
          })

          const option = res.HotelResult.HotelOptions.HotelOption

          hotelPaxes[index].bookingCode = option.BookingCode.value
          hotelPaxes[index].hotelOption = option
        } catch (e) {}
      })
    )

    const totalAmountHotel = hotelPaxes
      ? hotelPaxes.reduce(
          (a, b) =>
            a +
            +b.hotelOption?.PriceInformation?.Prices?.Price?.TotalFixAmounts
              .attributes.Gross,
          0
        )
      : 0

    const _mostExpensiveHotelCode = getMostExpensiveHotelCode(hotelRooms)
    const isApplyPromocode = !!promocode && !!promocodePrice

    preBook.mutate(
      {
        language: state.language,
        totalPrice: totalAmountHotel,
        hotels: hotelPaxes.map((item) => ({
          ratePlanCode: item.ratePlanCode,
          hotelName: item.hotelName,
          paxes: {
            holderIdPax: 1,
            roomPaxes: getRoomPaxes(item)
          },
          promoCode: _mostExpensiveHotelCode === item?.hotelCode &&
            isApplyPromocode && {
              code: promocode,
              price: Math.abs(promocodePrice)
            },
          payment: {
            paymentMethod: state.paymentMethod,
            currencyType:
              item.hotelOption?.PriceInformation.Prices.Price.attributes
                .Currency,
            amount:
              item.hotelOption?.PriceInformation?.Prices?.Price?.TotalFixAmounts
                .attributes.Gross
          }
        }))
      },
      {
        onSuccess: (res) => {
          setIsOpen(false)
          setMinutesUntilExpiration(res.minutesUntilExpiration)
          navigate('/pre-book', {
            state: {
              pre_booking_session_id: res.pre_booking_session_id,
              hotels: hotelPaxes,
              signature: res.signature,
              paymentMethod: state.paymentMethod,
              language: state.language,
              promocodePrice,
              promocode
            }
          })
        },
        onError: (err) => {
          toast.error(err?.data?.data)
          setIsOpen(false)
        }
      }
    )
  }

  // const makePayment = useMakePayment({
  //   queryParams: {
  //     onSuccess: (res) => {

  //       setPayment(res.data)
  //       setActiveStep(1)
  //     },
  //     onError: (e) => {

  //     }
  //   }
  // })

  const onChangeStep = (value) => {
    setActiveStep(value)
  }

  const onOpen = () => {
    getBookingRules()
  }

  const totalPrice =
    data?.totalPrice + ((promocode && promocodePrice && promocodePrice) || 0)

  const onNext = () => {
    if (activeStep === 0) {
      mutate(
        {
          id: state.pre_booking_session_id,
          signature: state.signature
        },
        {
          onSuccess: (res) => {
            if (res.minutesUntilExpiration < 5) {
              getBookingRules()
              return
            } else {
              if (isMacos() || isMobile()) {
                const ua = navigator.userAgent.toLowerCase()
                const isSafari = ua.includes('safari') && !ua.includes('chrome')
                window.open(
                  `/payment?booking_session_id=${
                    state.pre_booking_session_id
                  }&signature=${encodeURIComponent(
                    state.signature
                  )}&payment_type=${data.hotels[0].payment.paymentMethod}`,
                  isSafari ? '_self' : '_blank'
                )
              } else {
                const url = `${
                  window.location.origin
                }/payment?booking_session_id=${
                  state.pre_booking_session_id
                }&signature=${encodeURIComponent(
                  state.signature
                )}&payment_type=${
                  data.hotels[0].payment.paymentMethod
                }&new_window=true`
                const features =
                  'width=800,height=600,left=200,top=200,resizable=yes,scrollbars=yes'
                window.open(url, '_blank', features)
              }

              // makePayment.mutate({
              //   id: state.pre_booking_session_id,
              //   signature: state.signature
              // })
            }
            setMinutesUntilExpiration(res.minutesUntilExpiration)
          },
          onError: () => {
            getBookingRules()
          }
        }
      )
    }
    // setActiveStep((prev) => prev + 1)
  }

  useEffect(() => {
    const receiveMessage = (event) => {
      if (event.origin !== window.location.origin) {
        return
      }

      if (event.data?.moid) {
        setSearchParams({
          moid: event.data?.moid,
          status: event.data?.status
        })
      }
    }

    window.addEventListener('message', receiveMessage)

    return () => {
      window.removeEventListener('message', receiveMessage)
    }
  }, [])

  useEffect(() => {
    if (!moid)
      mutate(
        {
          id: state.pre_booking_session_id,
          signature: state.signature
        },
        {
          onSuccess: async (res) => {
            if (res.minutesUntilExpiration < 5) {
              getBookingRules()
              return
            }
            setMinutesUntilExpiration(res.minutesUntilExpiration)
          },
          onError: () => {
            getBookingRules()
            // setIsOpen(true)
          }
        }
      )
  }, [moid, state])

  return (
    <>
      <Header />
      <section className='container mx-auto max-w-[1170px] sm:mt-8'>
        <Stepper
          steps={steps}
          activeStep={activeStep}
          connectorStateColors={activeStep}
          stepClassName='border border-primary-600'
          styleConfig={{
            activeBgColor: '#2D40FF',
            activeTextColor: '#fff',
            completedBgColor: '#2D40FF',
            completedTextColor: '#fff',
            fontWeight: '500',
            labelFontSize: '16px',
            inactiveBgColor: '#C8CADA',
            inactiveTextColor: '#fff'
          }}
          connectorStyleConfig={{
            completedColor: '#2D40FF',
            disabledColor: '#EAEAF4',
            activeColor: '#2D40FF'
          }}
        />

        {activeStep === 0 && !moid && (
          <BasicInfo
            promocodePrice={promocodePrice}
            totalPrice={totalPrice}
            hotels={state.hotels}
            data={data}
            onNext={onNext}
            minutesUntilExpiration={minutesUntilExpiration}
            onOpen={onOpen}
          />
        )}
        {/* {activeStep === 1 && payment && (
          <Payment
            isLoading={isLoading}
            onChangeStatusId={onChangeStatusId}
            payment={payment}
          />
        )} */}

        {moid && (
          <ReservationInfo
            bookingStatus={{
              moid,
              status: searchParams.get('status')
            }}
            data={reservationInfo}
            hotels={reservationInfo?.hotels}
            onNext={onNext}
            onChangeStep={onChangeStep}
          />
        )}
      </section>
      <Dialog
        isOpen={isOpen}
        onClose={() => navigate(-1)}
        withCloseButton={false}
        className='w-full sm:w-[500px] transform overflow-hidden rounded-[10px] bg-white text-left align-middle shadow-xl transition-all'
      >
        <div className='flex flex-col items-center p-5 sm:pt-[50px] sm:pb-[110px]'>
          <img
            className='w-[110px] h-[110px] sm:w-[110px] sm:h-[110px] object-contain'
            src={SearchGif}
          />
          <p className='text-lg sm:text-xl font-[400] mt-[20px] text-center'>
            <span className='text-[#FF176B]'>결제 시간이 지나</span>
            <br />
            호텔가격을 다시 확인하고 있습니다.
          </p>
          {/* <Button onClick={() => navigate(-1)} type='button'>
            OK
          </Button> */}
        </div>
      </Dialog>
      {/* <Dialog
        isOpen={!!payment}
        onClose={() => setPayment(null)}
        className='w-[90vw] h-[80vh] transform overflow-hidden rounded-[10px] bg-white py-[16px] px-[16px] text-left align-middle shadow-xl transition-all'
      >
        <iframe
          style={{
            width: '100%',
            height: '100%',
            outline: 'none',
            border: 'none'
          }}
          srcDoc={payment}
        />
      </Dialog> */}
    </>
  )
}
