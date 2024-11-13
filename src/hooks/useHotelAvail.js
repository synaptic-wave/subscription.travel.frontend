import { languageKeys } from '@/consts/languages'
import { useCreateSession, useSearchHotels } from '@/services/search.service'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const __defaultPaxes = [
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

export default function useHotelAvail({ hotelCodes }) {
  const navigate = useNavigate()
  const createSession = useCreateSession()
  const createSession2 = useCreateSession()

  const [sessionId, setSessionId] = useState()
  const [isSearching, setIsSearching] = useState(false)
  const [isOpenNotFound, setIsOpenNotFound] = useState(false)

  const { data, isLoading } = useSearchHotels({
    sessionId: sessionId,
    queryParams: {
      enabled: !!sessionId
    }
  })

  useEffect(() => {
    if (hotelCodes?.length === 0) return

    const fetchHotels = async () => {
      const payload = {
        paxes: __defaultPaxes,
        language: languageKeys.KR,
        nationality: 'KR',
        checkInDate: moment(new Date()).add(29, 'days').format('yyyy-MM-DD'),
        checkOutDate: moment(new Date()).add(30, 'days').format('yyyy-MM-DD'),
        hotelCodes: hotelCodes ? [...hotelCodes] : [], // JPCode
        useCurrency: import.meta.env.VITE_JUNIPER_CURRENCY
      }

      createSession.mutate(payload, {
        onSuccess: (res) => {
          setSessionId(res.search_session_id)
        }
      })
    }

    fetchHotels()
  }, [hotelCodes])

  const onChooseHotel = async (jpCode, name) => {
    setIsSearching(true)

    const payload = {
      paxes: __defaultPaxes,
      language: languageKeys.KR,
      nationality: 'KR',
      checkInDate: moment(new Date()).add(29, 'days').format('yyyy-MM-DD'),
      checkOutDate: moment(new Date()).add(30, 'days').format('yyyy-MM-DD'),
      hotelCodes: [jpCode],
      useCurrency: import.meta.env.VITE_JUNIPER_CURRENCY,
      destination: name
    }

    createSession2.mutate(payload, {
      onSuccess: (res) => {
        navigate(`/hotel-details?sessionId=${res.search_session_id}`)
        setIsSearching(true)
      },
      onError: (err) => {
        console.log(err)
        setIsOpenNotFound(true)
        setIsSearching(true)
      }
    })
  }
  return {
    isSearching,
    isNotFound: isOpenNotFound,
    hotels: data?.hotels,
    locations: data?.locations,
    onChooseHotel,
    closeSearchingModal: setIsSearching,
    closeNotFoundModal: setIsOpenNotFound,
    isLoading: createSession.isLoading || isLoading
  }
}
