import { Button, Loader } from '@/components/index'
import { Info } from './sections/Info'
import { Rooms } from './sections/Rooms'
import { useDispatch, useSelector } from 'react-redux'
import emptyCartImg from '@/assets/icons/empty-cart.png'
import { Link, useNavigate } from 'react-router-dom'
import { Header } from '@/components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useCreateSession } from '@/services/search.service'
import moment from 'moment'
import { NumericFormat } from 'react-number-format'
import { SearchDialog } from '../SearchResult/components/SearchDialog'
import { NoRoomDialog } from '../SearchResult/components/NoRoomDialog'
import { service } from '@/services/book.service'
import Skeleton from 'react-loading-skeleton'
import { cartActions } from '@/store/cart/cart.slice'
import { useCartList, useUpdateCart } from '@/services/cart.service'

export function Cart() {
  const navigate = useNavigate()
  const { isAuth } = useSelector((state) => state.auth)
  const items = useSelector((state) => state.cart.items)
  const [cartData, setCartData] = useState([])
  const cartUpdate = useUpdateCart()
  const dispatch = useDispatch()
  const [disabledRooms, setDisabledRooms] = useState([])
  const [availableRooms, setAvailableRooms] = useState([])
  const [notAvailableRooms, setNotAvailableRooms] = useState([])
  const [selectedNotAvailRooms, setSelectedNotAvailRooms] = useState([])
  const [selectedRooms, setSelectedRooms] = useState([])
  const createSession = useCreateSession()
  const [isOpenNoRoom, setIsOpenNoRoom] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)

  const cartList = useCartList({
    queryParams: {
      enabled: isAuth
    }
  })

  const onSelectNotAvailRooms = (value) => {
    if (Array.isArray(value)) {
      setSelectedNotAvailRooms(value)
      return
    }

    const _room = selectedNotAvailRooms.find((item) => item.id === value.id)
    if (_room) {
      setSelectedNotAvailRooms((prev) =>
        prev.filter((item) => item.id !== value.id)
      )
    } else {
      setSelectedNotAvailRooms((prev) => [...prev, value])
    }
  }

  const onSelect = (value) => {
    if (Array.isArray(value)) {
      if (availableRooms.length === selectedRooms.length) {
        setSelectedRooms([])
      } else {
        setSelectedRooms(availableRooms)
      }

      if (notAvailableRooms.length === selectedNotAvailRooms.length) {
        setSelectedNotAvailRooms([])
      } else {
        setSelectedNotAvailRooms(notAvailableRooms)
      }

      return
    }

    const _room = selectedRooms.find((item) => item.id === value.id)
    if (_room) {
      setSelectedRooms((prev) => prev.filter((item) => item.id !== value.id))
    } else {
      setSelectedRooms((prev) => [...prev, value])
    }
  }

  const onNavigateToHotel = (option) => {
    const payload = {
      paxes: option.hotel.paxes,
      language: import.meta.env.VITE_JUNIPER_LANG,
      nationality: 'KR',
      checkInDate: moment(option.hotel.checkIn).format('yyyy-MM-DD'),
      checkOutDate: moment(option.hotel.checkOut).format('yyyy-MM-DD'),
      hotelCodes: [option.hotel.hotelCode],
      destination: option.hotel.name
    }
    createSession.mutate(payload, {
      onSuccess: (res) => {
        navigate(`/hotel-details?sessionId=${res.search_session_id}`)
      },
      onError: () => {
        setIsOpenNoRoom(true)
      }
    })
  }

  useEffect(() => {
    const onCheckRooms = async () => {
      setIsLoading2(true)
      const rooms = await Promise.all(
        items.map(async (item) => {
          try {
            const res = await service.checkHotel({
              language: import.meta.env.VITE_JUNIPER_LANG,
              ratePlanCode: item.ratePlanCode,
              checkInDate: item.hotel.checkIn,
              checkOutDate: item.hotel.checkOut,
              hotelCode: item.hotel.hotelCode,
              useCurrency: import.meta.env.VITE_JUNIPER_CURRENCY
            })
            return {
              status: 'active',
              ...item,
              room: res.HotelResult.HotelOptions.HotelOption
            }
          } catch (e) {
            // setIsLoading2(false)
            return {
              status: 'no-active',
              room: item,
              id: item.id
            }
          }
        })
      )

      const activeRooms = rooms.filter((value) => value.status === 'active')

      if (activeRooms.length > 0) {
        dispatch(
          cartActions.updateRoomFromCart({
            rooms: activeRooms
          })
        )
      }

      const _disabledRoomRates = rooms.filter(
        (value) => value.status === 'no-active'
      )

      setDisabledRooms(_disabledRoomRates.map((item) => item.id))
      setSelectedRooms(activeRooms)
      setAvailableRooms(activeRooms)
      setNotAvailableRooms(_disabledRoomRates)
      setSelectedNotAvailRooms(_disabledRoomRates)
      setIsLoading2(false)
    }
    if (!isAuth) onCheckRooms()
  }, [isAuth])

  useEffect(() => {
    const onCheckRooms = async () => {
      setIsLoading2(true)
      const rooms = await Promise.all(
        cartList?.data?.map(async (item) => {
          try {
            const res = await service.checkHotel({
              language: import.meta.env.VITE_JUNIPER_LANG,
              ratePlanCode: item.ratePlanCode,
              checkInDate: item.hotel.checkIn,
              checkOutDate: item.hotel.checkOut,
              hotelCode: item.hotel.hotelCode,
              useCurrency: import.meta.env.VITE_JUNIPER_CURRENCY
            })
            return {
              status: 'active',
              ...item,
              room: res.HotelResult.HotelOptions.HotelOption
            }
          } catch (e) {
            // setIsLoading2(false)
            return {
              status: 'no-active',
              room: item,
              id: item.id
            }
          }
        })
      )

      const activeRooms = rooms.filter((value) => value.status === 'active')

      const _disabledRoomRates = rooms.filter(
        (value) => value.status === 'no-active'
      )

      setCartData(cartList?.data)
      setDisabledRooms(_disabledRoomRates.map((item) => item.id))
      setSelectedRooms(activeRooms)
      setAvailableRooms(activeRooms)
      setNotAvailableRooms(_disabledRoomRates)
      setSelectedNotAvailRooms(_disabledRoomRates)
      setIsLoading2(false)
    }
    if (isAuth && cartList.data) onCheckRooms()
  }, [isAuth, cartList.data])

  const onUpdateSelectedRooms = (ids) => {
    const _selectedRooms = JSON.parse(JSON.stringify(selectedRooms))
    const _items = _selectedRooms.filter((item) => !ids.includes(item.id))
    const _availableRooms = availableRooms.filter(
      (item) => !ids.includes(item.id)
    )
    setSelectedRooms(_items)
    setAvailableRooms(_availableRooms)
  }

  const onUpdateSelectedNotAvailRooms = (ids) => {
    const _selectedRooms = JSON.parse(JSON.stringify(selectedNotAvailRooms))
    const _items = _selectedRooms.filter((item) => !ids.includes(item.id))
    const _notAvailableRooms = notAvailableRooms.filter(
      (item) => !ids.includes(item.id)
    )
    setSelectedNotAvailRooms(_items)
    setNotAvailableRooms(_notAvailableRooms)
  }

  const onNavigateToBook = async () => {
    setIsLoading(true)
    const _rooms = await Promise.all(
      selectedRooms.map(async (item) => {
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
        ratePlanCodes: selectedRooms.map((item) => item.id)
      })
    )
    navigate('/book', {
      state: {
        hotels: _rooms.filter((value) => !!value)
      }
    })
  }

  const roomsPrice = selectedRooms.reduce((a, b) => {
    return a + +b.room.Prices.Price.TotalFixAmounts.attributes.Gross
  }, 0)

  return (
    <>
      <Header />
      <section className='container mx-auto px-4 mt-[20px] sm:mt-12'>
        <div className='grid w-full sm:mt-[30px]'>
          <h1 className='text-xl font-medium sm:text-[24px] text-[#161A3F]'>
            장바구니
          </h1>
        </div>

        {((isAuth ? cartList.data?.length > 0 : items.length > 0) ||
          cartList.isFetching) && (
          <div className='flex flex-col-reverse sm:flex-row gap-[20px] sm:gap-10 sm:mt-0 mt-[30px]'>
            <div className='flex sm:w-[340px] sm:min-w-[340px] w-full min-w-full flex-col gap-5'>
              <Info
                isLoading={
                  isLoading2 || cartList.isFetching || cartUpdate.isLoading
                }
                roomAmount={selectedRooms.length}
                roomsPrice={roomsPrice}
              />
              {isLoading2 || cartList.isFetching || cartUpdate.isLoading ? (
                <Skeleton className='w-full h-[48px]' />
              ) : (
                <Button
                  onClick={onNavigateToBook}
                  disabled={selectedRooms.length === 0}
                  isLoading={isLoading}
                >
                  <NumericFormat
                    value={roomsPrice}
                    displayType='text'
                    thousandSeparator
                  />
                  &nbsp;원 결제하기
                </Button>
              )}
            </div>

            <div className='flex-auto'>
              <Rooms
                cartUpdate={cartUpdate}
                onSelect={onSelect}
                selectedRooms={selectedRooms}
                items={isAuth ? cartData : items}
                availableRooms={availableRooms}
                disabledRooms={disabledRooms}
                onNavigateToHotel={onNavigateToHotel}
                isLoading={
                  isLoading2 || cartList.isFetching || cartUpdate.isLoading
                }
                notAvailableRooms={notAvailableRooms}
                onSelectNotAvailRooms={onSelectNotAvailRooms}
                selectedNotAvailRooms={selectedNotAvailRooms}
                isAuth={isAuth}
                onUpdateSelectedRooms={onUpdateSelectedRooms}
                onUpdateSelectedNotAvailRooms={onUpdateSelectedNotAvailRooms}
                refetchList={cartList.refetch}
              />
            </div>
          </div>
        )}
        {(isAuth ? cartList.data?.length === 0 : items.length === 0) &&
          !cartList.isFetching && (
            <div className='w-full h-[60vh] flex justify-center items-center flex-col gap-5'>
              <img src={emptyCartImg} />
              <p className='text-lg text-[#5C5F79]'>
                장바구니에 담긴 상품이 없습니다
              </p>

              <Link to='/'>
                <Button className='mt-10'>상품 구경하러 가기</Button>
              </Link>
            </div>
          )}
      </section>
      <SearchDialog isOpen={createSession.isLoading} />
      <NoRoomDialog
        isOpen={isOpenNoRoom}
        onClose={() => setIsOpenNoRoom(false)}
      />
    </>
  )
}
