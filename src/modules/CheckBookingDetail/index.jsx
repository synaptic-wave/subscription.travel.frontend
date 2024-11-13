import { Button, Modal } from '@/components/index'
import CheckoutBox from './components/CheckoutBox'
import RoomCard from './components/RoomCard'
import roomImg from '@/assets/images/room.png'
import BookForm from './components/BookForm'
import DisclaimerBox from './components/DisclaimerBox'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useBookingRules, usePreBook } from '@/services/book.service'
import { useForm } from 'react-hook-form'
import { paymentType } from '@/consts/index'
import { Header } from '@/components/Header'

export function CheckBookingDetail() {
  const [searchParams] = useSearchParams()
  const [form, setForm] = useState(null)
  const { control, handleSubmit } = useForm()
  const bookingRules = useBookingRules({
    queryParams: {
      refetchInterval: 540000
    }
  })
  const navigate = useNavigate()
  const [selectedPaymentType, setSelectedPaymentType] = useState(
    paymentType.CARD
  )
  const rate = searchParams.get('rate')
  const checkIn = searchParams.get('checkIn')
  const checkOut = searchParams.get('checkOut')
  const currency = searchParams.get('currency')
  const hotelCode = searchParams.get('hotelCode')
  const preBook = usePreBook()
  const [rules, setRules] = useState()
  const [checked, setChecked] = useState(false)
  const [isOpenPolicy, setIsOpenPolicy] = useState(false)

  const onChangePaymentType = (value) => {
    setSelectedPaymentType(value)
  }

  useEffect(() => {
    if (rules) return

    bookingRules.mutate(
      {
        language: import.meta.env.VITE_JUNIPER_LANG,
        ratePlanCode: encodeURIComponent(rate),
        checkInDate: checkIn, //this field should be same with hotel /hotel-availability
        checkOutDate: checkOut,
        hotelCode: hotelCode
        // useCurrency: currency
      },
      {
        onSuccess: (res) => {
          setRules(res?.HotelResult.HotelOptions.HotelOption)
        }
      }
    )
  }, [rate, checkIn, checkOut, hotelCode, currency])

  const price =
    rules?.PriceInformation?.Prices?.Price?.TotalFixAmounts?.attributes?.Gross

  const handleBook = (value) => {}

  return (
    <>
      <Header />
      <section className='container mx-auto max-w-[1170px] mt-8'>
        <h1 className='mb-[30px] text-[24px] font-medium'>예약 내역 확인</h1>
        <form
          onSubmit={handleSubmit(handleBook)}
          className='grid grid-cols-3 gap-[30px]'
        >
          <div className='flex flex-col col-span-1 gap-5'>
            <div className='py-8 px-5 border border-solid border-gray-100 rounded-[10px]'>
              <RoomCard
                beds={1}
                persons={
                  rules?.PriceInformation?.HotelRooms.HotelRoom.RoomOccupancy
                    .attributes.Occupancy
                }
                img={roomImg}
                price={price}
                checkIn={checkIn}
                checkOut={checkOut}
                meal='조식불포함'
                location={rules?.PriceInformation.HotelContent.Zone.Name}
                title={rules?.PriceInformation.HotelContent.HotelName}
              />

              {/* <div className="h-[1px] w-full bg-[#F3F3FB] my-7"></div> */}
            </div>
            <div className='py-8 px-5 border border-solid border-gray-100 rounded-[10px]'>
              <CheckoutBox
                orderAmount={1}
                roomsPrice={price}
                totalPrice={price}
                checked={checked}
                setChecked={setChecked}
              />
            </div>

            <Button
              type='submit'
              disabled={!checked}
              onClick={() => setIsOpenPolicy(true)}
            >
              예약 취소
            </Button>
            <span className='text-[#0066FF] text-center mt-[-15px] text-[13px]'>
              2024년 03월 20일까지 취소 가능
            </span>
          </div>
          <div className='flex col-span-2 flex-col gap-5'>
            <div className='py-8 px-5 border border-solid border-gray-100 rounded-[10px]'>
              <BookForm
                control={control}
                onChangePaymentType={onChangePaymentType}
                selectedPaymentType={selectedPaymentType}
              />
            </div>
            <div className='py-8 px-5 border border-solid border-gray-100 rounded-[10px]'>
              <DisclaimerBox
                comments={rules?.OptionalElements.Comments.Comment.value}
                cancellationPolicyComments={
                  rules?.CancellationPolicy.Description
                }
              />
            </div>
          </div>
        </form>

        <div></div>
      </section>

      <Modal
        title='서비스 이용약관'
        open={isOpenPolicy}
        onClose={() => setIsOpenPolicy(false)}
      >
        <div className='w-full flex flex-col'>
          <p
            className='text-[12px] text-[#5C5F79]'
            dangerouslySetInnerHTML={{
              __html: rules?.OptionalElements.Comments.Comment.value
            }}
          ></p>

          <p
            className='text-[12px] text-[#5C5F79]'
            dangerouslySetInnerHTML={{
              __html: rules?.CancellationPolicy.Description
            }}
          ></p>

          <Button className='w-[250px] mx-auto mt-[45px]'>동의합니다</Button>
        </div>
      </Modal>
    </>
  )
}
