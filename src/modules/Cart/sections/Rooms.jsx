import TrashIcon from '@/assets/icons/trash.svg?react'
import { Checkbox } from '@/components/Checkbox'
import { RoomCard } from '../components/RoomCard'
import { useDispatch } from 'react-redux'
import { cartActions } from '@/store/cart/cart.slice'
import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'
import { RoomCardSkleton } from '../components/RoomCardSkleton'
import { SuspectHotelName } from '@/components/SuspectHotelName'
import { FiMinus } from 'react-icons/fi'

export function Rooms({
  items,
  selectedRooms,
  onSelect,
  onNavigateToHotel,
  disabledRooms,
  availableRooms,
  isLoading,
  isAuth,
  refetchList,
  cartUpdate,
  onUpdateSelectedRooms,
  selectedNotAvailRooms,
  onSelectNotAvailRooms,
  onUpdateSelectedNotAvailRooms,
  notAvailableRooms
}) {
  const dispatch = useDispatch()

  const onDeleteItem = (id) => {
    if (isAuth) {
      const list = JSON.parse(JSON.stringify(items))
      const _filteredList = list.filter((item) => item.id !== id)
      cartUpdate.mutate(
        {
          items: _filteredList
        },
        {
          onSuccess: () => {
            refetchList()
          }
        }
      )
    } else {
      dispatch(cartActions.removeFromCart({ id }))
    }
    onUpdateSelectedRooms([id])
    onUpdateSelectedNotAvailRooms([id])
  }

  const onRemoveRoomsFromCart = () => {
    if (
      isAuth &&
      (selectedRooms.length > 0 || selectedNotAvailRooms.length > 0)
    ) {
      const list = JSON.parse(JSON.stringify(items))
      const ids = selectedRooms.map((item) => item.id)
      const idsNotAvail = selectedNotAvailRooms.map((item) => item.id)
      let _filteredList = list.filter((item) => !ids.includes(item.id))
      _filteredList = _filteredList.filter(
        (item) => !idsNotAvail.includes(item.id)
      )
      cartUpdate.mutate(
        {
          items: _filteredList
        },
        {
          onSuccess: () => {
            refetchList()
          }
        }
      )
    } else {
      dispatch(
        cartActions.removeRoomsFromCart({
          ids: [
            ...selectedRooms.map((item) => item.id),
            ...selectedNotAvailRooms.map((item) => item.id)
          ]
        })
      )
    }
    onUpdateSelectedRooms(selectedRooms.map((item) => item.id))
    onUpdateSelectedNotAvailRooms(selectedNotAvailRooms.map((item) => item.id))
  }

  return (
    <div className='w-full border border-solid border-gray-100 rounded-[10px] flex flex-col sm:mt-[30px] overflow-hidden'>
      <div className='flex w-full bg-[#EAEAF4] py-3 px-5 justify-between items-center'>
        {isLoading ? (
          <Skeleton width={90} h={24} />
        ) : (
          <Checkbox
            isChecked={
              availableRooms.length === selectedRooms.length &&
              selectedNotAvailRooms.length === notAvailableRooms.length
            }
            labelClassname='!text-base !font-medium'
            label='전체 선택'
            onChange={() => onSelect([])}
          />
        )}

        {isLoading ? (
          <Skeleton className='w-[86px] h-[24px]' />
        ) : (
          <button onClick={onRemoveRoomsFromCart} className='flex'>
            <TrashIcon />
            <span className='whitespace-nowrap'>선택 삭제</span>
          </button>
        )}
      </div>
      <div className='flex w-full justify-between items-center flex-col'>
        {isLoading
          ? Array.from(Array(10).keys()).map((ind) => (
              <div
                className={classNames(
                  'flex flex-col w-full px-5 py-[20px]',
                  items.length > 1 &&
                    ind !== items.length - 1 &&
                    'border-b border-gray-100'
                )}
                key={`room-${ind}`}
              >
                <div className='flex justify-between mb-4'>
                  <Skeleton width={150} h={24} />

                  <Skeleton className='w-[100px] h-[24px]' />
                </div>

                <RoomCardSkleton className='min-w-[200px]' />
              </div>
            ))
          : items?.map((item, index) => (
              <div
                className={classNames(
                  'flex flex-col w-full px-5 py-[20px]',
                  disabledRooms.includes(item.id) && 'bg-[#fef2f2]',
                  items.length > 1 &&
                    index !== items.length - 1 &&
                    'border-b border-gray-100'
                )}
                key={item.id}
              >
                <div className='flex justify-between mb-4'>
                  {disabledRooms.includes(item.id) ? (
                    <div className='flex items-center gap-[10px]'>
                      <div
                        onClick={() => onSelectNotAvailRooms(item)}
                        className='cursor-pointer w-[20px] h-[20px] rounded-[2px] border border-[#dc2626] flex items-center justify-center'
                      >
                        {selectedNotAvailRooms.find(
                          (room) => room.id === item.id
                        ) && <FiMinus color='#dc2626' />}
                      </div>
                      <div className='flex items-center gap-1'>
                        <p className='font-medium'>
                          <SuspectHotelName
                            jpCode={item?.hotel?.hotelCode}
                            defaultName={item.hotel.name}
                          />
                        </p>
                        {disabledRooms.includes(item.id) && (
                          <p className='text-[#dc2626]'>
                            (해당 일자에 예약 불가)
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Checkbox
                      labelClassname='!text-base !font-medium'
                      label={
                        <div className='flex items-center gap-1'>
                          <p>
                            <SuspectHotelName
                              jpCode={item?.hotel?.hotelCode}
                              defaultName={item.hotel.name}
                            />
                          </p>
                        </div>
                      }
                      onChange={() => onSelect(item)}
                      isChecked={Boolean(
                        selectedRooms.find((room) => room.id === item.id)
                      )}
                    />
                  )}

                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className='flex'
                  >
                    <TrashIcon />
                    <span className='whitespace-nowrap'>삭제</span>
                  </button>
                </div>

                <RoomCard
                  disabled={disabledRooms.includes(item.id)}
                  onNavigateToHotel={onNavigateToHotel}
                  item={item}
                  className='min-w-[200px]'
                />
              </div>
            ))}
      </div>
    </div>
  )
}
