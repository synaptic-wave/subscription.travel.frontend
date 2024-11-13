import useDebounce from './useDebouce'
import { useSearchHotelAndZone } from '@/services/search.service'
import { useCallback, useEffect, useMemo, useState } from 'react'

function sortByAreaType(arr) {
  arr?.sort((a, b) => {
    const order = {
      PAS: 1,
      REG: 2,
      CTY: 3,
      LOC: 4,
      ARP: 5,
      BAR: 6,
      COL: 7,
      EST: 8,
      PRT: 9,
      PTI: 10,
      SKI: 11,
      TUR: 12,
      ALO: 13,
      OTR: 14
    }

    if (a.source.level > 0) return 1

    const aOrder = order[a.source.AreaType] || 3
    const bOrder = order[b?.source.AreaType] || 3

    return aOrder - bOrder
  })

  return arr
}

function filterByUniqueJPDCode(array) {
  const seen = new Set()
  return array.filter((item) => {
    if (seen.has(item.source.JPDCode)) {
      return false
    } else {
      seen.add(item.source.JPDCode)
      return true
    }
  })
}

function getTopSimilarItems(searchValue, data) {
  // Helper function to calculate similarity score
  function similarityScore(searchValue, item) {
    const en_name = item.source.en_name.toLowerCase()
    const kr_name = item.source.kr_name.toLowerCase()
    const searchLower = searchValue?.toLowerCase()

    let score = 0
    if (en_name.includes(searchLower)) score += 1
    if (kr_name.includes(searchLower)) score += 1

    return score
  }

  // Calculate scores for each item
  const scoredItems = data.map((item) => ({
    ...item,
    score: similarityScore(searchValue, item)
  }))

  // Sort items by score in descending order
  scoredItems.sort((a, b) => b.score - a.score)

  // Return the top 3 items
  return scoredItems.slice(0, 3)?.map((el) => ({
    source: {
      ...el.source,
      isRecommended: true
    }
  }))
}

export default function useLoadDirection({ defaultValueTerm }) {
  const [term, setTerm] = useState()

  const debouncedTerm = useDebounce(term)

  useEffect(() => {
    setTerm(defaultValueTerm)
  }, [defaultValueTerm])

  const { data: directions, isFetching: isFetchingDirections } =
    useSearchHotelAndZone({
      params: {
        search: debouncedTerm,
        page_size: 30
      },
      queryProps: {
        enabled: !!debouncedTerm
      }
    })

  const loadOptions = useCallback((inputValue) => {
    if (inputValue) setTerm(inputValue)
  }, [])

  const zonesList = useMemo(() => {
    const modifiedList = []
    const sortedListArr = sortByAreaType(directions?.data?.zones?.hits)

    function recursiveMapZones(arr, level = 1) {
      if (!arr || arr.length === 0) return
      const _level = level

      return arr.forEach((child) => {
        const _name = child.kr_name

        modifiedList.push({
          source: {
            ...child,
            en_name: _name,
            kr_name: _name,
            isChild: true,
            level: _level
          }
        })

        recursiveMapZones(child?.children, _level + 1)
      })
    }

    sortedListArr?.forEach((zone) => {
      if (zone.children?.length) {
        modifiedList.push({
          source: {
            ...zone.source,
            level: 0
          }
        })

        recursiveMapZones(zone.source.children, 1)
      } else {
        modifiedList.push({
          source: {
            ...zone.source,
            en_name: [
              zone?.source?.en_name,
              zone?.source?.parents?.[0]?.en_name
            ]
              .filter((el) => el)
              .join(' , '),
            kr_name: [
              zone?.source?.kr_name,
              zone?.source?.parents?.[0]?.kr_name
            ]
              .filter((el) => el)
              .join(' , '),
            level: 0
          }
        })

        recursiveMapZones(zone.source.children, 1)
      }
    })

    // return sortByAreaType(filterByUniqueJPDCode(modifiedList));
    return filterByUniqueJPDCode(modifiedList)
  }, [directions?.data?.zones?.hits])

  const hotels = useMemo(() => {
    if (!directions) return []

    return directions?.data?.hotels?.hits
  }, [directions])

  const exactSearchPlaces = useMemo(() => {
    return (
      sortByAreaType(getTopSimilarItems(term, [...zonesList, ...hotels])) || []
    )
  }, [zonesList, hotels, term])

  return {
    loadOptions,
    options: [
      {
        label: '추천 검색어',
        options: exactSearchPlaces
      },
      {
        label: '목적지',
        options: zonesList
      },
      {
        label: '숙소',
        options: hotels
      }
    ],
    isLoading: isFetchingDirections
  }
}
