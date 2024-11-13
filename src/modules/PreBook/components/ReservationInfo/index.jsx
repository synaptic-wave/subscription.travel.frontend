import CheckIcon from '@/assets/icons/check.svg?react'
import WarningIcon from '@/assets/icons/warningV2.svg?react'
import { Button } from '@/components/index'
import moment from 'moment'
import { NumericFormat } from 'react-number-format'
import { useNavigate } from 'react-router-dom'
import PeopleIcon from '@/assets/icons/people.svg?react'
import KinBedIcon from '@/assets/icons/king-bed.svg?react'
import MealIcon from '@/assets/icons/meal.svg?react'
import { paymentMethods, paymentStatusKeys } from '@/consts/paymentMethods'
import { getRoomNameFromResponse } from '@/utils/hotelFunctions'
import { paymentTypes } from '@/consts/index'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCartList, useUpdateCart } from '@/services/cart.service'
import { cartActions } from '@/store/cart/cart.slice'

const getRoomName = (value) => {
  if (!value) return ''
  if (!value.items) return ''
  return getRoomNameFromResponse(value?.items[0]?.hotelRooms)
}

export function ReservationInfo({ hotels, bookingStatus, onChangeStep }) {
  const navigate = useNavigate()
  const { isAuth } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { deletableRatePlanCodes } = useSelector((state) => state.cart)
  const cartList = useCartList({
    queryParams: {
      enabled: isAuth
    }
  })
  const cartUpdate = useUpdateCart()

  const getPersonsAmount = (value) => {
    if (bookingStatus.status === paymentStatusKeys.FAILED && !value?.items) {
      return value?.paxes?.roomPaxes?.map((item) => item.passangers)?.flat()
        ?.length
    }
    return value?.paxes?.length - 1
  }

  useEffect(() => {
    if (
      isAuth &&
      cartList.data &&
      !cartList.isLoading &&
      deletableRatePlanCodes.length > 0
    ) {
      const list = JSON.parse(JSON.stringify(cartList.data))
      const _filteredList = list.filter(
        (item) => !deletableRatePlanCodes.includes(item.id)
      )
      cartUpdate.mutate(
        {
          items: _filteredList
        },
        {
          onSuccess: () => {
            cartList.refetch()
            dispatch(cartActions.clearDeletableRatePlanCodes())
          },
          onError: () => {
            dispatch(cartActions.clearDeletableRatePlanCodes())
          }
        }
      )
    }

    if (!isAuth && deletableRatePlanCodes.length > 0) {
      dispatch(
        cartActions.removeRoomsFromCart({
          ids: [...deletableRatePlanCodes]
        })
      )
      dispatch(cartActions.clearDeletableRatePlanCodes())
    }
  }, [isAuth, cartList.data])

  return (
    <div className='py-5 px-0 sm:py-[50px]'>
      <div className='flex items-center flex-col mx-auto'>
        {bookingStatus.status === paymentStatusKeys.FAILED ? (
          <WarningIcon />
        ) : (
          <CheckIcon />
        )}
        <p className='text-xl sm:text-2xl font-medium mt-[10px]'>
          {bookingStatus.status === paymentStatusKeys.FAILED
            ? '예약을 실패했습니다'
            : '예약이 완료되었습니다'}
        </p>
        <div className='flex justify-center w-full flex-wrap mt-[30px] gap-4'>
          {hotels?.map((data) => (
            <div className='min-w-[100%] max-w-[100%] sm:min-w-[40%] sm:max-w-[40%] border border-gray-100 py-[40px] px-[30px]  rounded-[10px]'>
              {data?.items && (
                <p className='tex-base font-medium'>
                  {data.items[0]?.hotelInfo?.name}
                </p>
              )}
              {data?.hotelName && (
                <p className='tex-base font-medium'>{data.hotelName}</p>
              )}
              <div className='flex items-center gap-5 mt-[10px]'>
                <div className='flex items-center gap-1 text-sm'>
                  <PeopleIcon />
                  인원 {getPersonsAmount(data)}명
                </div>

                <div className='flex items-center gap-1 text-sm'>
                  <KinBedIcon />방{' '}
                  {data?.items
                    ? data.items[0]?.hotelRooms?.length
                    : data?.paxes?.roomPaxes?.length}
                  개
                </div>

                {/* <div className='flex items-center gap-1 text-sm'>
              <MealIcon />
              조식불포함
            </div> */}
              </div>
              <div className='flex flex-col gap-4 mt-[40px]'>
                {getRoomName(data) && (
                  <div className='flex items-center justify-between'>
                    <p className='text-sm text-[#A3A5B8] font-medium'>객실</p>
                    <p className='text-sm'>{getRoomName(data)}</p>
                  </div>
                )}
                <div className='flex items-center justify-between'>
                  <p className='text-sm text-[#A3A5B8] font-medium'>일정</p>
                  <p className='text-sm'>
                    {moment(
                      new Date(
                        bookingStatus.status === paymentStatusKeys.FAILED &&
                        !data?.items
                          ? data?.paxes?.roomPaxes[0]?.checkInDate
                          : data?.items[0]?.attributes?.start
                      )
                    ).format('YYYY.MM.DD (ddd)')}{' '}
                    ~{' '}
                    {moment(
                      new Date(
                        bookingStatus.status === paymentStatusKeys.FAILED &&
                        !data?.items
                          ? data?.paxes?.roomPaxes[0]?.checkOutDate
                          : data?.items[0]?.attributes?.end
                      )
                    ).format('YYYY.MM.DD (ddd)')}
                  </p>
                </div>
                {bookingStatus.status === paymentStatusKeys.SUCCESS && (
                  <div className='flex items-center justify-between'>
                    <p className='text-sm text-[#A3A5B8] font-medium'>
                      예약번호
                    </p>
                    <p className='text-sm'>{data?.attributes?.locator}</p>
                  </div>
                )}

                <div className='flex items-center justify-between'>
                  <p className='text-sm text-[#A3A5B8] font-medium'>결제구분</p>
                  <p className='text-sm'>
                    {paymentMethods[data?.payment?.paymentMethod]}
                  </p>
                </div>

                {bookingStatus.status === paymentStatusKeys.FAILED && (
                  <div className='flex items-center justify-between'>
                    <p className='text-sm text-[#A3A5B8] font-medium'>
                      결제실패
                    </p>
                    <p className='text-sm text-[#FF3838]'>카드 승인 거절</p>
                  </div>
                )}
                {bookingStatus.status === paymentStatusKeys.SUCCESS && (
                  <div className='flex items-center justify-between'>
                    <p className='text-sm text-[#A3A5B8] font-medium'>
                      결제일시
                    </p>
                    <p className='text-sm'>
                      {moment(new Date(data?.createdAt)).format(
                        'YYYY년 MM월 DD일 HH:mm'
                      )}
                    </p>
                  </div>
                )}
                <div className='flex items-center justify-between'>
                  <p className='text-sm text-[#A3A5B8] font-medium'>결제금액</p>
                  <p className='text-xl font-bold'>
                    <NumericFormat
                      displayType='text'
                      value={data?.payment?.amount}
                      thousandSeparator
                    />{' '}
                    <span className='text-sm font-normal'>원</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='sm:w-[500px] flex justify-center'>
          {bookingStatus.status === paymentStatusKeys.SUCCESS && (
            <Button
              className='mt-[30px]'
              onClick={() =>
                isAuth
                  ? navigate('/reservation-list')
                  : navigate('/check-reservation-info')
              }
            >
              예약내역 바로가기
            </Button>
          )}
        </div>

        {bookingStatus.status === paymentStatusKeys.FAILED && (
          <div className='grid grid-cols-2 mt-[30px] gap-2 w-full sm:w-[500px]'>
            <Button
              onClick={() => navigate('/')}
              className='w-full'
              variant='secondary'
            >
              결제 취소
            </Button>
            <Button onClick={() => onChangeStep(0)} className='w-full'>
              다시 결제하기
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
