import useHotelAvail from '@/hooks/useHotelAvail'
import { useGetUpTargetDestinations } from '@/services/target.service'
import { useMemo, useState } from 'react'
import { Hotels } from '../Hotels'
import { TermsAndConditionsDialog } from '../TermsAndConditionsDialog'
import { Tabs } from '../Tabs'
import { useDispatch } from 'react-redux'
import { commonActions } from '@/store/common/common.slice'
import { GroupHotels } from '../GroupHotels'
import { HotelsV2 } from '../HotelsV2'
import { getDecodedHtml } from '@/utils/decodeString'

export function UpTargetDirections({ section, isShowPrivacy }) {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [tab1, setTab1] = useState({})
  const onChangeTab1 = (value) => {
    setTab1(value)
  }

  const title = section.kr_title.split('#')

  const upTargetDestinations = useGetUpTargetDestinations({
    params: {
      page: 1,
      limit: 100,
      display_active: true,
      sortBy: 'order:asc',
      sectionId: section.id,
      populate: 'markUpId'
    },
    queryParams: {
      enabled: true,
      onSuccess: (res) => {
        dispatch(commonActions.toggleUpdateServerModal(false))
        setTab1(res.results[0])
      },
      onError: (err) => {
        dispatch(commonActions.toggleUpdateServerModal(true))
      }
    }
  })

  const hotelCodes = useMemo(() => {
    return (
      tab1?.hotel?.map((item) => ({
        JPCode: item.hotelCode,
        ...item.metaData
      })) || []
    )
  }, [tab1])

  const hotelCodesArray = useMemo(() => {
    return tab1?.hotel?.map((item) => item.hotelCode) || []
  }, [tab1])

  const {
    hotels,
    isSearching,
    isNotFound,
    closeSearchingModal,
    closeNotFoundModal,
    onChooseHotel,
    isLoading
  } = useHotelAvail({ hotelCodes: hotelCodesArray })

  if (upTargetDestinations.data?.results?.[0]?.location === 'none')
    return (
      <div className='container my-10'>
        <Hotels
          items={hotelCodes}
          hotels={hotels}
          isSearching={isSearching}
          isOpenNotFound={isNotFound}
          setIsOpenNotFound={closeNotFoundModal}
          setIsSearching={closeSearchingModal}
          onChooseHotel={onChooseHotel}
          isLoading={upTargetDestinations.isLoading || isLoading}
          markupImageUrl={tab1?.markUpId?.imageURL?.browser}
          mockHotels={tab1?.hotel}
          title2={title}
          tab={tab1}
          title={
            <div className='flex items-center justify-center gap-4 text-center w-full'>
              <h5
                className='text-lg sm:text-[28px] sm:leading-[36px] sm:font-bold font-medium'
                dangerouslySetInnerHTML={{
                  __html: getDecodedHtml(section.kr_title)
                }}
              ></h5>
            </div>
          }
          // tabs={
          //   <Tabs
          //     value={tab1}
          //     items={upTargetDestinations?.data?.results}
          //     onChange={onChangeTab1}
          //   />
          // }
        />
        <TermsAndConditionsDialog
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      </div>
    )

  return (
    <div className='container my-10'>
      {/* <Hotels */}
      <HotelsV2
        items={hotelCodes}
        hotels={hotels}
        isSearching={isSearching}
        isOpenNotFound={isNotFound}
        setIsOpenNotFound={closeNotFoundModal}
        setIsSearching={closeSearchingModal}
        onChooseHotel={onChooseHotel}
        isLoading={upTargetDestinations.isLoading}
        markupImageUrl={tab1?.markUpId?.imageURL?.browser}
        mockHotels={tab1?.hotel}
        title2={title}
        tab={tab1}
        title={
          <div className='flex items-center justify-center gap-4'>
            <h5
              className='text-lg sm:text-[28px] sm:leading-[36px] sm:font-bold font-medium'
              dangerouslySetInnerHTML={{
                __html: getDecodedHtml(section.kr_title)
              }}
            ></h5>
            {isShowPrivacy && (
              <button
                onClick={() => setOpen(true)}
                className='text-sm border border-gray-100 rounded-[10px] py-[10px] px-[20px] whitespace-nowrap'
              >
                약관보기
              </button>
            )}
          </div>
        }
        tabs={
          <Tabs
            value={tab1}
            items={upTargetDestinations?.data?.results}
            onChange={onChangeTab1}
          />
        }
      />
      <TermsAndConditionsDialog isOpen={open} onClose={() => setOpen(false)} />
    </div>
  )
}
