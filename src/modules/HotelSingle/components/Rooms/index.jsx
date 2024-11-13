import GridIcon from '@/assets/icons/grid.svg?react'
import RowIcon from '@/assets/icons/row.svg?react'
import { IconButton, RoomCard, ShareModal } from '@/components/index'
import { types, viewTypes } from '@/consts/index'
import { useMemo, useState } from 'react'
import { RoomInfoModal } from '../RoomInfoModal'
import { HotelDescription } from '../HotelDescription'
import { useDispatch, useSelector } from 'react-redux'
import FavouriteFilledIcon from '@/assets/icons/favourite-fill.svg?react'
import ShareIcon from '@/assets/icons/share.svg?react'
import FavouriteIcon from '@/assets/icons/favourite.svg?react'
import { wishlistActions } from '@/store/wishlist/wishlist.slice'

export function Rooms({
  rooms,
  checkIn,
  checkOut,
  currency,
  hotel,
  sessionId,
  onCheckRatePlanCode,
  isLoadingCheckRate,
  checkedRate,
  roomFeatures,
  hotelDescription,
  wishlist,
  handleToggleWishlist
}) {
  const dispatch = useDispatch()

  const [view, setView] = useState(types[0])
  const [showShareModal, setShowShareModal] = useState(false)

  const toggleShareModal = () => {
    setShowShareModal((prev) => !prev)
  }
  const [roomInfo, setRoomInfo] = useState(null)
  const onOpenRoomInfo = (value) => {
    setRoomInfo(value)
  }

  const roomsWithImages = useMemo(
    () => rooms?.filter((room) => room?.images?.length > 0),
    [rooms]
  )

  const roomsWithoutImages = useMemo(
    () => rooms?.filter((room) => room?.images?.length === 0),
    [rooms]
  )

  return (
    <>
      <div className='mt-[10px] sm:translate-y-0 translate-y-[-40px]'>
        <div className='flex justify-between'>
          <div className='flex gap-2'>
            <IconButton
              icon={
                wishlist?.includes(hotel.hotelCode) ? (
                  <FavouriteFilledIcon />
                ) : (
                  <FavouriteIcon />
                )
              }
              onClick={handleToggleWishlist}
            />
            <IconButton
              icon={<ShareIcon />}
              onClick={toggleShareModal}
              active={showShareModal}
            />
          </div>
          {roomsWithImages?.length > 0 && (
            <div className='sm:flex gap-2 hidden'>
              <IconButton
                icon={<RowIcon />}
                active={viewTypes.ROW === view}
                onClick={() => setView(viewTypes.ROW)}
              />
              <IconButton
                icon={<GridIcon />}
                active={viewTypes.GRID === view}
                onClick={() => setView(viewTypes.GRID)}
              />
            </div>
          )}
        </div>

        <HotelDescription description={hotelDescription} />

        <div
          className={
            viewTypes.GRID === view
              ? 'grid grid-cols-1 sm:grid-cols-2 border border-gray-100 rounded-[10px] mt-5'
              : 'flex flex-col border border-gray-100 rounded-[10px] mt-5'
          }
          id='room-info'
        >
          {roomsWithImages?.length > 0 &&
            roomsWithImages.map((room, idx) => (
              <RoomCard
                {...room}
                name={room.name}
                hotel={hotel}
                images={room.images}
                checkIn={checkIn}
                checkOut={checkOut}
                currency={currency}
                isGrid={viewTypes.GRID === view}
                isLast={idx === roomsWithImages.length - 1}
                rtl={idx % 2 === 0}
                sessionId={sessionId}
                groups={room.options}
                onCheckRatePlanCode={onCheckRatePlanCode}
                isLoadingCheckRate={isLoadingCheckRate}
                checkedRate={checkedRate}
                onOpenRoomInfo={onOpenRoomInfo}
                key={room.name}
                rtlSlider={idx % 2 === 0}
              />
            ))}
        </div>

        {roomsWithoutImages?.length > 0 && (
          <div className='w-full flex flex-col mt-8'>
            <h2 className='mb-3 sm:text-2xl text-base font-semibold'>
              다른 옵션
            </h2>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 border border-gray-100'>
              {roomsWithoutImages?.map((room, idx) => (
                <RoomCard
                  {...room}
                  name={room.name}
                  hotel={hotel}
                  noImage={true}
                  images={room.images}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  currency={currency}
                  isGrid={true}
                  isLast={idx === roomsWithoutImages.length - 1}
                  rtl={idx % 2 === 0}
                  sessionId={sessionId}
                  groups={room.options}
                  onCheckRatePlanCode={onCheckRatePlanCode}
                  isLoadingCheckRate={isLoadingCheckRate}
                  checkedRate={checkedRate}
                  onOpenRoomInfo={onOpenRoomInfo}
                  key={room.name}
                  rtlSlider={idx % 2 === 0}
                />
              ))}
            </div>
          </div>
        )}
        <RoomInfoModal
          roomInfo={roomInfo}
          isOpen={!!roomInfo}
          JRCode={roomInfo?.JRCode}
          onClose={() => setRoomInfo(null)}
          roomFeatures={roomFeatures}
        />
      </div>
      <ShareModal
        isOpen={showShareModal}
        onClose={toggleShareModal}
        isLoading={false}
        sessionId={sessionId}
      />
    </>
  )
}
