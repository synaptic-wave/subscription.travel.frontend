import { useMemo, useState } from "react";

import {
  useGetHotelReviews,
  useGetLocationDetails,
  useGetNearestObjects
} from "@/services/tripAdvisor.service";
import {
  reviewFilterTypes,
  reviewLabels,
  reviewPeriods
} from "@/consts/review";
import moment from "moment";
import { languages } from "@/consts/languages";

const isDateIntervalInMonths = (val, items) => {
  const selectedMonths = [
    ...items.map((item) => reviewPeriods.find((per) => per.name === item).value)
  ].flat();

  return selectedMonths.includes(moment(val).get("month") + 1);
};

const useReviews = ({
  hotelName,
  hotelLat,
  hotelLng,
  language,
  category = "hotels",
  postalCode
}) => {
  const [filterByRating, setFilterByRating] = useState([]);
  const [filterByType, setFilterByType] = useState([]);
  const [filterByTime, setFilterByTime] = useState([]);
  const [filterByLanguage, setFilterByLanguage] = useState([]);

  const { data: nearestPlaces } = useGetNearestObjects({
    params: {
      searchQuery: hotelName,
      language: language,
      category: category,
      latLong: [hotelLat, hotelLng].join(",")
    },
    queryParams: {
      enabled: !!hotelName
    }
  });

  const currentHotelTripadvisorPlace = useMemo(() => {
    return (
      nearestPlaces?.data?.find(
        (place) => place.address_obj.postalcode === postalCode
      ) || nearestPlaces?.data?.[0]
    );
  }, [nearestPlaces, postalCode]);

  const { data: details } = useGetLocationDetails({
    locationId: currentHotelTripadvisorPlace?.location_id,
    queryParams: {
      enabled: !!currentHotelTripadvisorPlace?.location_id
    }
  });

  const { data: reviews } = useGetHotelReviews({
    code: currentHotelTripadvisorPlace?.location_id,
    params: {
      language: language,
      limit: 1000,
      offset: 0
    },
    queryParams: {
      enabled: !!currentHotelTripadvisorPlace
    }
  });

  const reviewRatings = useMemo(() => {
    if (!reviews || !reviews?.data || reviews?.data?.length === 0) return [];

    const _arr = Array(5)
      .fill(null)
      .map((_, idx) => {
        const _value = reviews?.data?.filter(
          (review) => review.rating === idx + 1
        )?.length;

        const percent = (_value * 100) / reviews.data.length;

        return {
          key: idx + 1,
          value: _value,
          label: reviewLabels[idx + 1],
          percent: percent || null
        };
      })
      .sort((a, b) => b.key - a.key);

    return _arr;
  }, [reviews]);

  const reviewTimes = useMemo(() => {
    if (!reviews || !reviews?.data || reviews?.data?.length === 0) return [];

    return [...reviewPeriods];
  }, [reviews]);

  const reviewTypes = useMemo(() => {
    if (!reviews || !reviews?.data || reviews?.data?.length === 0) return [];

    const _arr = [];

    reviews.data.forEach((review) => {
      const foundItem = _arr.find((item) => item === review.trip_type);

      if (!!foundItem) return _arr;

      _arr.push(review.trip_type);
    });

    return _arr;
  }, [reviews]);

  const reviewLanguages = useMemo(() => {
    if (!reviews || !reviews?.data || reviews?.data?.length === 0) return [];

    return [...languages];
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    if (!reviews || !reviews?.data || reviews?.data?.length === 0) return [];

    return reviews.data
      .filter(
        (
          review // filter by reviews rating
        ) =>
          filterByRating.length > 0
            ? filterByRating.includes(review.rating)
            : true
      )
      .filter(
        (
          review // filter by reviews language
        ) =>
          filterByLanguage.length > 0
            ? filterByLanguage.includes(review.lang)
            : true
      )
      .filter(
        (
          review // filter by reviews type
        ) =>
          filterByType.length > 0
            ? filterByType.includes(review.trip_type)
            : true
      )
      .filter(
        (
          review // filter by reviews travel date
        ) =>
          filterByTime.length > 0
            ? isDateIntervalInMonths(review.travel_date, filterByTime)
            : true
      );
  }, [reviews, filterByType, filterByTime, filterByRating, filterByLanguage]);

  const handleFilter = (filterType, val) => {
    switch (filterType) {
      case reviewFilterTypes.RATING:
        setFilterByRating((prev) =>
          prev.includes(val)
            ? prev.filter((item) => item !== val)
            : [...prev, val]
        );

        break;
      case reviewFilterTypes.TYPE:
        setFilterByType((prev) =>
          prev.includes(val)
            ? prev.filter((item) => item !== val)
            : [...prev, val]
        );

        break;

      case reviewFilterTypes.TIME:
        setFilterByTime((prev) =>
          prev.includes(val)
            ? prev.filter((item) => item !== val)
            : [...prev, val]
        );

        break;

      case reviewFilterTypes.LANGUAGE:
        setFilterByLanguage((prev) =>
          prev.includes(val)
            ? prev.filter((item) => item !== val)
            : [...prev, val]
        );

        break;
      default:
        break;
    }
  };

  return {
    rating: Number(details?.rating || 0),
    reviewsCount: Number(details?.num_reviews || 0),
    reviews: filteredReviews,
    subRatings: details?.subratings && Object.values(details?.subratings),
    tripTypes: details?.trip_types,
    hotelStyles: details?.styles,
    reviewTypes,
    reviewTimes,
    handleFilter,
    reviewRatings,
    reviewLanguages,
    filterByRating,
    filterByType,
    filterByTime,
    filterByLanguage
  };
};

export default useReviews;
