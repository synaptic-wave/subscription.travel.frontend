import useHotelAvail from '@/hooks/useHotelAvail'
import { useGetDownTargetDestinations } from '@/services/target.service'
import { useMemo, useState } from 'react'
import { Hotels } from '../Hotels'
import { Tabs } from '../Tabs'

export function DownTargetDirections() {
  const [tab1, setTab1] = useState({})
  const onChangeTab1 = (value) => {
    setTab1(value)
  }

  const downTargetDestinations = useGetDownTargetDestinations({
    params: {
      page: 1,
      limit: 100,
      display_active: true,
      sortBy: 'order:asc'
    },
    queryParams: {
      enabled: true,
      onSuccess: (res) => {
        setTab1(res.results[0])
      }
    }
  })

  const hotelCodes = useMemo(() => {
    return tab1?.hotelCode?.map((code) => ({ JPCode: code })) || []
  }, [tab1])

  const {
    hotels,
    isSearching,
    isNotFound,
    closeSearchingModal,
    closeNotFoundModal,
    onChooseHotel,
    isLoading
  } = useHotelAvail({ hotelCodes: tab1?.hotelCode || [] })

  return (
    <>
      <Hotels
        items={hotelCodes}
        hotels={hotels}
        isSearching={isSearching}
        isOpenNotFound={isNotFound}
        setIsOpenNotFound={closeNotFoundModal}
        setIsSearching={closeSearchingModal}
        onChooseHotel={onChooseHotel}
        isLoading={isLoading}
        title={
          <h5 className='text-lg sm:text-[26px] font-medium'>
            가보고 싶은
            <span className='text-primary-600'>유럽을 보다 가깝게</span>
          </h5>
        }
        tabs={
          <Tabs
            value={tab1}
            items={downTargetDestinations?.data?.results}
            onChange={onChangeTab1}
          />
        }
      />
    </>
  )
}
