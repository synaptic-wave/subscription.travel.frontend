import PersonIcon from '@/assets/icons/person.svg?react'
import BedIcon from '@/assets/icons/bed.svg?react'
import CartIcon from '@/assets/icons/cartV2.svg?react'
import CloseIcon from '@/assets/icons/close.svg?react'
import CheckIcon from '@/assets/images/check-v2.svg'
import { Button } from '@/components/index'
import { useDispatch, useSelector } from 'react-redux'
import { NumericFormat } from 'react-number-format'
import { cartActions } from '@/store/cart/cart.slice'
import { service } from '@/services/book.service'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { commonActions } from '@/store/common/common.slice'
import WarningIcon from '@/assets/icons/warning.svg?react'
import { useAddCart, useCartList } from '@/services/cart.service'

export function RoomsCart() {
  const navigate = useNavigate()
  const addCart = useAddCart()
  const [quantity, setQuantity] = useState(1)
  const { isAuth } = useSelector((state) => state.auth)
  const rooms = useSelector((state) => state.cart.rooms)
  const paxes = useSelector((state) => state.common.paxes)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const roomsPrice = rooms.reduce((a, b) => {
    return a + +b.room.Prices.Price.TotalFixAmounts.attributes.Gross
  }, 0)

  const cartList = useCartList({
    queryParams: {
      enabled: isAuth
    }
  })

  const adults = paxes
    .map((item) => item.passangers)
    .flat()
    .filter((item) => item.age >= 18)

  const onClearRoom = () => {
    dispatch(cartActions.clearRoom())
  }

  const onCheckRatePlanCode = async () => {
    setIsLoading(true)
    const _rooms = await Promise.all(
      rooms.map(async (item) => {
        try {
          const result = await service.checkHotel({
            language: import.meta.env.VITE_JUNIPER_LANG,
            ratePlanCode: item.ratePlanCode,
            checkInDate: item.hotel.checkIn,
            checkOutDate: item.hotel.checkOut,
            hotelCode: item.hotel.hotelCode,
            useCurrency: import.meta.env.VITE_JUNIPER_CURRENCY
          })
          return {
            rate: result.HotelResult.HotelOptions.HotelOption.attributes
              .RatePlanCode,
            hotelCode: item.hotel.hotelCode,
            checkIn: item.hotel.checkIn,
            checkOut: item.hotel.checkOut
          }
        } catch (e) {
          return null
        }
      })
    )

    setIsLoading(false)
    dispatch(
      cartActions.addDeletableRatePlanCodes({
        ratePlanCodes: rooms.map((item) => item.ratePlanCode)
      })
    )
    navigate('/book', {
      state: {
        hotels: _rooms.filter((value) => !!value)
      }
    })
  }

  const onAddToCart = async () => {
    if (!isAuth) {
      await Promise.all(
        rooms.map(async (item) => {
          return dispatch(
            cartActions.addToCart({
              ...item,
              id: uuidv4()
            })
          )
        })
      )
      // setIsOpen(false)
    }
    if (isAuth) {
      await Promise.all(
        rooms.map(async (item) => {
          return await addCart.mutateAsync({
            item: {
              ...item,
              id: uuidv4()
            }
          })
        })
      )
      cartList.refetch()
    }

    dispatch(
      commonActions.toggleCartModal({
        isOpen: true
      })
    )
    dispatch(cartActions.clearRoom())
  }

  const onChangeQuantity = (action) => {
    if (action === '+') {
      setQuantity((prev) => prev + 1)
    } else {
      if (quantity > 1) setQuantity((prev) => prev - 1)
    }
  }

  return (
    <>
      <div className='sm:h-[165px] fixed bottom-0 w-full bg-white z-[99999] left-0 right-0 py-[10px] px-[15px] sm:py-[20px] sm:px-[30px] border-t border-gray-100 flex justify-between'>
        <div className='flex sm:items-center flex-col sm:flex-row gap-2 sm:gap-7 h-fit'>
          <div className='flex items-center gap-2 text-xs sm:text-base font-semibold'>
            <span className='flex w-[20px]'>
              <BedIcon />
            </span>
            {paxes.length} 개 객실 중 {rooms.length}개가 선택됨
          </div>
          <div className='flex items-center gap-2 text-xs sm:text-base'>
            <PersonIcon />
            {adults?.length} 성인
          </div>
          {rooms.length !== paxes.length && (
            <div className='flex items-center gap-1'>
              <WarningIcon />
              <p className='text-sm font-medium text-gray-600'>
                {rooms.length} 검색 결과 남은 방{' '}
              </p>
            </div>
          )}
          {rooms.length === paxes.length && (
            <div className='flex items-center gap-1'>
              <img
                src={CheckIcon}
                className='w-[20px] h-[20px] object-contain'
              />
              <p className='sm:w-auto w-[130px] text-sm font-medium text-primary-600'>
                이미 검색조건에 따라 객실을 선택하셨습니다.
              </p>
            </div>
          )}
          <button
            onClick={onClearRoom}
            className='items-center gap-1 text-sm font-semibold sm:hidden flex'
          >
            <CloseIcon />
            전체 선택 해제
          </button>
        </div>
        <div className='flex flex-col gap-3 sm:justify-end items-end'>
          <div className='flex items-center gap-1'>
            <p className='text-lg sm:text-xl'>총:</p>{' '}
            <p className='text-lg sm:text-xl font-bold'>
              <NumericFormat
                value={roomsPrice}
                displayType='text'
                thousandSeparator
              />
              <span className='text-xs font-medium'>&nbsp;원</span>
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex sm:items-center gap-4 flex-col sm:flex-row'>
              <button
                onClick={onClearRoom}
                className='items-center gap-1 text-sm font-semibold sm:flex hidden'
              >
                <CloseIcon />
                전체 선택 해제
              </button>
              <Button
                disabled={rooms.length !== paxes.length}
                onClick={onAddToCart}
                leftIcon={<CartIcon />}
                isLoading={addCart.isLoading}
                size={window.innerWidth > 600 ? 'md' : 'xs'}
              >
                장바구니에 추가
              </Button>
              <Button
                disabled={rooms.length !== paxes.length}
                onClick={onCheckRatePlanCode}
                isLoading={isLoading}
                size={window.innerWidth > 600 ? 'md' : 'xs'}
              >
                예약하기
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <AddMultipleRoomModal
        isOpen={isOpen}
        onChangeQuantity={onChangeQuantity}
        onAdd={onAddToCart}
        quantity={quantity}
        onClose={() => setIsOpen(false)}
      /> */}
    </>
  )
}
