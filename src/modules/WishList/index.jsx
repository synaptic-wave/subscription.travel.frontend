import { Header } from "@/components/Header";
import { useSelector } from "react-redux";
import {
  searchService,
  useCreateSession,
  useSearchHotels
} from "@/services/search.service";
import { useEffect, useState, useCallback, useMemo } from "react";
import moment from "moment";
import { OutputHotels } from "../SearchResult/Sections";
import { useCheckHotel } from "@/services/book.service";
import { Link, useNavigate } from "react-router-dom";
import { types } from "@/consts/index";
import { SearchDialog } from "../SearchResult/components/SearchDialog";
import { CompareBar } from "../SearchResult/components/CompareBar";
import emptyFavourite from "@/assets/images/empty-favourite.png";
import { Button } from "@/components/index";
import { HotelContext } from "../SearchResult/contexts";
import { useWishList } from "@/services/wishlist.service";
import { fetchHotelNames } from "../SearchResult";

const defaultPaxes = [
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
];

export function WishList() {
  const [paxes, setPaxes] = useState(defaultPaxes);
  const [hotels, setHotels] = useState([]);
  const { items: wishlist } = useSelector((state) => state.wishlist);
  const createSession = useCreateSession();
  const [view, setView] = useState(
    window.innerWidth > 600 ? types[0] : types[1]
  );
  const [isOpenMobileSearch, setIsOpenMobileSearch] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [page, setPage] = useState(1);
  const { mutate, isLoading: isLoadingCheckRate } = useCheckHotel();
  const [checkingRate, setCheckingRate] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);

  const { data: userWishlist } = useWishList({
    queryParams: {
      enabled: isAuth
    }
  });

  const { data, isLoading } = useSearchHotels({
    sessionId: sessionId,
    queryParams: {
      enabled: !!sessionId
    }
  });
  const checkIn = data?.query?.checkInDate;
  const checkOut = data?.query?.checkOutDate;

  const getHotels = () => {
    const payload = {
      paxes,
      language: import.meta.env.VITE_JUNIPER_LANG,
      nationality: "KR",
      checkInDate: moment().add(30, "days").format("yyyy-MM-DD"),
      checkOutDate: moment().add(31, "days").format("yyyy-MM-DD"),
      hotelCodes: isAuth ? userWishlist : wishlist,
      destination: "Wishlist"
    };

    if (payload?.hotelCodes?.length === 0 || !payload?.hotelCodes?.length)
      return;

    createSession.mutate(payload, {
      onSuccess: (res) => {
        setSessionId(res.search_session_id);
      },
      onError: (err) => {
        toast.error("No available hotels found");
      }
    });
  };

  const onChooseHotel = async (jpCode) => {
    setIsSearching(true);

    const payload = {
      paxes: data.query.paxes || defaultPaxes,
      language: import.meta.env.VITE_JUNIPER_LANG,
      nationality: data?.query?.nationality,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      hotelCodes: [jpCode] // JPCode
    };

    createSession.mutate(payload, {
      onSuccess: (res) => {
        navigate(`/hotel-details?sessionId=${res.search_session_id}`);
        setIsSearching(true);
      },
      onError: (err) => {
        toast.error("Error on checking hotel");
        setIsSearching(true);
      }
    });
  };

  const onCheckRatePlanCode = (ratePlanCode, jpCode) => {
    setCheckingRate(ratePlanCode);
    setIsSearching(true);
    mutate(
      {
        language: import.meta.env.VITE_JUNIPER_LANG,
        ratePlanCode,
        checkInDate: data?.query?.checkInDate,
        checkOutDate: data?.query?.checkOutDate,
        hotelCode: jpCode,
        useCurrency: import.meta.env.VITE_JUNIPER_CURRENCY
      },
      {
        onSuccess: (res) => {
          setCheckingRate(null);
          setIsSearching(true);
          navigate("/book", {
            state: {
              hotels: [
                {
                  rate: res.HotelResult.HotelOptions.HotelOption.attributes
                    .RatePlanCode,
                  checkIn,
                  checkOut,
                  hotelCode: jpCode
                }
              ]
            }
          });
          // navigate(
          //   `/book?rate=${res.HotelResult.HotelOptions.HotelOption.attributes.RatePlanCode}&checkIn=${checkIn}&checkOut=${checkOut}&hotelCode=${jpCode}&currency=USD`
          // )
        },
        onError: (err) => {
          console.log(err);
          setIsSearching(true);
        }
      }
    );
  };

  const onNextHotelsLoad = useCallback(() => {
    const _page = page + 1;

    searchService.searchHotels(sessionId, { page: _page }).then((res) => {
      fetchHotelNames(res?.hotels).then((__res) => {
        setHotels((prev) => [...prev, ...(__res || [])]);
      });

      setPage((prev) => prev + 1);
    });
  }, [hotels, page]);

  useEffect(() => {
    if (!data) return;

    async function updateHotelName() {
      fetchHotelNames(data?.hotels).then((res) => {
        setHotels(res);
      });
    }

    updateHotelName();
  }, [data]);

  useEffect(() => {
    if ((wishlist.length > 0 || userWishlist?.length > 0) && !data?.hotels) {
      getHotels();
    } else {
      const _hotels = isAuth
        ? hotels.filter((item) =>
            userWishlist.some((jpCode) => jpCode === item.attributes.JPCode)
          )
        : hotels.filter((item) =>
            wishlist.some((jpCode) => jpCode === item.attributes.JPCode)
          );

      setHotels(_hotels);
    }
  }, [wishlist, isAuth, userWishlist]);

  return (
    <HotelContext.Provider
      value={{
        occupancy: data?.query?.paxes,
        createSessionReqPayload: {
          language: import.meta.env.VITE_JUNIPER_LANG,
          nationality: data?.query?.nationality,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          useCurrency: import.meta.env.VITE_JUNIPER_CURRENCY
        }
      }}
    >
      <Header />
      <div className="container mx-auto px-4 min-h-[60vh]">
        <h3 className="text-xl sm:text-2xl mt-[20px] sm:mt-[50px] font-medium">
          찜리스트
        </h3>
        <div className="flex flex-col gap-5">
          {(isAuth ? userWishlist?.length > 0 : wishlist?.length) > 0 ? (
            <OutputHotels
              isVisibleSearchBox={false}
              isVisibleFilter={false}
              paxes={data?.query?.paxes}
              passengers={data?.query?.paxes?.reduce(
                (prev, curr) =>
                  prev + curr.passangers.filter((pass) => pass.age > 0)?.length,
                0
              )}
              toggleMobileSearch={() => setIsOpenMobileSearch((prev) => !prev)}
              view={view}
              isVisibleSort={false}
              setView={setView}
              checkIn={checkIn}
              checkOut={checkOut}
              destinationName={data?.query?.destination}
              sessionId={sessionId}
              hotels={hotels}
              locations={data?.locations}
              useMeridianToView={false}
              isLoading={isLoading || createSession.isLoading}
              onCheckRatePlanCode={onCheckRatePlanCode}
              isLoadingCheckRate={isLoadingCheckRate}
              checkingRate={checkingRate}
              onChooseHotel={onChooseHotel}
              onNextLoadHotels={onNextHotelsLoad}
              totalHotelsCount={Number(data?.filters?.totalHotels)}
              hasMore={Number(data?.filters?.totalHotels) !== hotels?.length}
            >
              <div className="w-full flex justify-end mt-5 text-[red] sm:px-0 px-4">
                <ul className=" list-disc">
                  <li>
                    아래의 객실가격은 참고용으로 제시되었으며, 사전 안내없이
                    변경될 수 있습니다.
                  </li>
                  <li>
                    예약시에는 꼭 예약 시점의 실시간 가격을 확인하시기 바랍니다.
                  </li>
                </ul>
              </div>
            </OutputHotels>
          ) : (
            <div className="w-full h-[60vh] flex justify-center items-center flex-col">
              <img
                className="w-[200px] h-[200px] object-contain"
                src={emptyFavourite}
              />
              <p className="text-lg mt-5 text-[#5C5F79]">
                찜리스트에 담긴 상품이 없습니다
              </p>

              <Link to="/" className="mt-[60px]">
                <Button>상품 구경하러 가기</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <SearchDialog
        isOpen={isSearching}
        onClose={() => setIsSearching(false)}
      />
      <CompareBar
        destination={data?.query?.destination}
        checkIn={checkIn}
        checkOut={checkOut}
        nationality={data?.query?.nationality}
        occupancies={data?.query?.paxes?.map((pax, idx) => ({
          adults: pax.passangers.filter((pax) => pax.age > 17)?.length || 0,
          childs: pax.passangers.filter((pax) => pax.age < 18)?.length || 0,
          childAges:
            pax.passangers
              .filter((pax) => pax.age < 18)
              .map((pax) => pax.age) || 0,
          id: idx + 1
        }))}
      />
    </HotelContext.Provider>
  );
}
