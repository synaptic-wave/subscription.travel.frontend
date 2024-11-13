import bannerImg from '@/assets/images/home-main-banner.png'
import bannerV2Img from '@/assets/images/banner_v2.png'
import { SearchFormV2 } from '../SearchFromV2'
import { useNavigate } from 'react-router-dom'
import { useCreateSession } from '@/services/search.service'
import { useGetGroupDestinations } from '@/services/target.service'
import Skeleton from 'react-loading-skeleton'
import moment from 'moment'
import { SearchDialog } from '@/modules/SearchResult/components/SearchDialog'
import { getDecodedHtml } from '@/utils/decodeString'
import { motion } from 'framer-motion'
import Tabs from '@/components/Tabs'
import { useState } from 'react'

const paxes = [
  {
    roomId: 1,
    passangers: [
      {
        idPax: 1,
        age: 35
      },
      {
        idPax: 2,
        age: 35
      }
    ]
  }
]

const animation = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
      duration: 0.1,
      delay: 0
    }
  }
}

const elements = [
  {
    label: '숙소'
  },
  {
    label: '항공'
  },
  {
    label: '여행자보험'
  }
]

const components = {
  0: SearchFormV2
}

export const TripBoard = ({
  recommendedLocations,
  setIsOpenNotFound,
  setIsOpenSearchHotel
}) => {
  const [activeTab, setActiveTab] = useState(0)

  const onChangeTab = (index) => {
    setActiveTab(index)
  }

  const { data, isLoading } = useGetGroupDestinations({
    params: {
      page: 1,
      limit: 100,
      display_active: true,
      sortBy: 'order:asc',
      sectionId: recommendedLocations?.id,
      populate: 'markUpId'
    },
    queryParams: {
      enabled: true
    }
  })

  const title = recommendedLocations?.kr_title.split('#')
  const navigate = useNavigate()
  const createSession = useCreateSession()

  const onNavigateToSearchResult = async (item) => {
    const payload = {
      paxes: paxes,
      language: import.meta.env.VITE_JUNIPER_LANG,
      nationality: 'KR',
      checkInDate: moment().add(30, 'days').format('yyyy-MM-DD'),
      checkOutDate: moment().add(31, 'days').format('yyyy-MM-DD'),
      hotelCodes: item.hotelCode,
      destination: item.kr_location
    }

    createSession.mutate(payload, {
      onSuccess: (res) => {
        navigate(`/search?sessionId=${res.search_session_id}`)
      },
      onError: (err) => {
        toast.error('Error on checking hotel')
      }
    })
  }

  const Component = components[activeTab]

  return (
    <>
      <SearchDialog isOpen={createSession.isLoading} />

      <div className='container py-[26px]'>
        <Tabs
          activeIndex={activeTab}
          onChangeTab={onChangeTab}
          elements={elements}
        />

        <div className='pt-[28px]'>
          <Component
            setIsOpenNotFound={setIsOpenNotFound}
            setIsOpenSearchHotel={setIsOpenSearchHotel}
          />
        </div>

        {!isLoading && data?.results?.length > 0 && (
          <motion.div
            initial='hidden'
            animate='visible'
            variants={container}
            transition={{
              duration: 0.8
            }}
            className='w-full flex gap-3 mt-[26px] flex-wrap justify-between'
          >
            {data?.results?.map((item, index) => (
              <motion.div variants={animation}>
                <div
                  className='sm:h-[266px] scale-image sm:w-[266px] h-[150px] w-[150px] rounded-full flex items-end justify-center p-4 relative cursor-pointer'
                  key={index}
                  onClick={() => onNavigateToSearchResult(item)}
                  style={{
                    backgroundImage: `url(${item.imageURL})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center'
                  }}
                >
                  <span className='sm:px-7 sm:py-4 px-[14px] py-[9px] bg-[rgba(255,255,255,0.7)] rounded-full text-[15px]'>
                    {item.kr_location}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        {isLoading && (
          <div className='w-full flex gap-3 mt-[26px] flex-wrap justify-between'>
            <Skeleton className='sm:h-[266px] sm:w-[266px] h-[182px] rounded-full' />
            <Skeleton className='sm:h-[266px] sm:w-[266px] h-[182px] rounded-full' />
            <Skeleton className='sm:h-[266px] sm:w-[266px] h-[182px] rounded-full' />
            <Skeleton className='sm:h-[266px] sm:w-[266px] h-[182px] rounded-full' />
          </div>
        )}
      </div>
    </>
  )
}
