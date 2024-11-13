import CartIcon from '@/assets/icons/cart.svg?react'
import { useDispatch, useSelector } from 'react-redux'
import { cartActions } from '@/store/cart/cart.slice'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useAddCart, useCartList } from '@/services/cart.service'
import { commonActions } from '@/store/common/common.slice'
import { AddMultipleRoomModal } from '../AddMultipleRoomModal'
import { v4 as uuidv4 } from 'uuid'

export function AddToCart({ hotel = {}, room = {} }) {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const { isAuth } = useSelector((state) => state.auth)
  const items = useSelector((state) => state.cart.items)
  const rooms = useSelector((state) => state.cart.rooms)
  const activeRooms = rooms.filter(
    (item) => item.ratePlanCode === room?.attributes?.RatePlanCode
  )
  const [quantity, setQuantity] = useState(1)
  const cartList = useCartList({
    queryParams: {
      enabled: isAuth
    }
  })

  // const item = isAuth
  //   ? cartList.data?.find(
  //       (item) => item.ratePlanCode === room?.attributes?.RatePlanCode
  //     )
  //   : items.find((item) => item.ratePlanCode === room?.attributes?.RatePlanCode)

  const addCart = useAddCart()

  useEffect(() => {
    return () => {
      dispatch(cartActions.clearRoom())
    }
  }, [])

  const onAdd = async () => {
    if (!isAuth) {
      await Promise.all(
        Array.from(Array(quantity).keys()).map(async (_) => {
          try {
            return dispatch(
              cartActions.addToCart({
                ratePlanCode: room.attributes.RatePlanCode,
                hotel,
                room,
                id: uuidv4()
              })
            )
          } catch (e) {
            return null
          }
        })
      )
    }
    if (isAuth) {
      await Promise.all(
        Array.from(Array(quantity).keys()).map(async (_) => {
          await addCart.mutateAsync({
            item: {
              ratePlanCode: room.attributes.RatePlanCode,
              hotel,
              room,
              id: uuidv4()
            }
          })
        })
      )
      cartList.refetch()
    }
    setIsOpen(false)
    dispatch(
      commonActions.toggleCartModal({
        isOpen: true
      })
    )
  }

  const onChangeQuantity = (action) => {
    if (action === '+') {
      setQuantity((prev) => prev + 1)
    } else {
      if (quantity > 1) setQuantity((prev) => prev - 1)
    }
  }

  const onAddRoom = () => {
    dispatch(
      cartActions.addRoom({
        ratePlanCode: room.attributes.RatePlanCode,
        hotel,
        room
      })
    )
  }

  const onRemoveRoom = () => {
    dispatch(
      cartActions.removeRoom({
        ratePlanCode: room.attributes.RatePlanCode,
        hotel,
        room
      })
    )
  }

  return (
    <>
      {hotel?.paxes?.length > 1 && (
        <div>
          <p className='text-sm text-center mb-1'>객실 추가</p>
          <div className='flex items-center gap-1'>
            <button
              className='flex items-center justify-center rounded-full border border-primary-600 w-[25px] h-[25px]'
              onClick={onRemoveRoom}
            >
              <MinusIcon />
            </button>
            <div className='border-[#EAEAF4] border rounded-[10px] py-[6px] w-[67px] px-[7px] text-sm text-[#A3A5B8] text-right'>
              {activeRooms && activeRooms.length > 0 ? activeRooms.length : 0}
            </div>
            <button
              className={classNames(
                'flex rounded-full border items-center justify-center w-[25px] h-[25px]',
                rooms.length === hotel?.paxes?.length
                  ? 'border-gray-100'
                  : 'border-primary-600'
              )}
              onClick={onAddRoom}
              disabled={rooms.length === hotel?.paxes?.length}
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      )}

      {hotel?.paxes?.length === 1 && (
        <div
          className='rounded-[10px] flex justify-between  overflow-hidden'
          style={{
            border: `1px solid #EAEAF4`
          }}
        >
          <button
            className={classNames(
              'md:w-[48px] md:h-[48px] w-[48px] h-[48px] flex items-center justify-center text-[#A8ABBF] md:text-[26px] text-[21px]'
            )}
            onClick={() => {
              setIsOpen(true)
              setQuantity(1)
            }}
          >
            <CartIcon />
          </button>
        </div>
      )}
      <AddMultipleRoomModal
        isOpen={isOpen}
        quantity={quantity}
        onChangeQuantity={onChangeQuantity}
        onAdd={onAdd}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}

function MinusIcon() {
  return (
    <svg
      width='30'
      height='30'
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='7.70001'
        y='14.2998'
        width='14.6'
        height='1.4'
        rx='0.5'
        fill='black'
        stroke='#EAEAF4'
      />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      width='30'
      height='30'
      viewBox='0 0 30 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='7.7'
        y='14.2998'
        width='14.6'
        height='1.4'
        rx='0.5'
        fill='black'
        stroke='#EAEAF4'
      />
      <rect
        x='15.7'
        y='7.7002'
        width='14.6'
        height='1.4'
        rx='0.5'
        transform='rotate(90 15.7 7.7002)'
        fill='black'
        stroke='#EAEAF4'
      />
    </svg>
  )
}
