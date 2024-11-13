import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FilterHotels, OutputHotels } from "./Sections";
import {
  searchService,
  useCreateSession,
  useSearchHotels
} from "@/services/search.service";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useCheckHotel } from "@/services/book.service";
import { Header } from "@/components/Header";
import { SearchFormMini } from "@/components/SearchFormMini";
import { sortArrays, sortKeys } from "@/consts/sorts";
import BedIcon from "@/assets/icons/bed.svg?react";
import SearchIcon from "@/assets/icons/search-v2.svg?react";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg?react";
import moment from "moment";
import PersonIcon from "@/assets/icons/person.svg?react";
import { SearchDialog } from "./components/SearchDialog";
import { CompareBar } from "./components/CompareBar";
import { HotelContext } from "./contexts";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "@/store/common/common.slice";
import { DateObject } from "react-multi-date-picker";
import { Button } from "@/components/index";
import { nationalities } from "@/consts/nationality";
import { useDetectIsMobile } from "@/hooks/useDetectIsMobile";
import { NoRoomDialog } from "./components/NoRoomDialog";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useWebsocketFilter } from "@/hooks/useWebsocketFilter";
import { cartActions } from "@/store/cart/cart.slice";
import CartIcon from "@/assets/icons/cart.svg?react";
import classNames from "classnames";
import { viewTypes } from "@/consts/index";
import CloseIcon from "@/assets/icons/close.svg?react";
import { useGetHotelContent } from "@/services/hotel.service";
import { languageKeys } from "@/consts/languages";

const getCurrentHotelCode = (attribute) =>
  attribute?.JPCode !== attribute?.Code ? attribute?.Code : attribute?.JPCode;

export const fetchHotelNames = (__hotels, pageSize = 100) => {
  if (!__hotels.length || __hotels.length === 0) return;

  const jpCodes = __hotels?.map((hotel) =>
    getCurrentHotelCode(hotel?.attributes)
  );

  return new Promise(async (resolve, reject) => {
    try {
      const data = await searchService.getTranslatedHotelPortfolio({
        jp_codes: jpCodes,
        "request.page_size": pageSize,
        "request.page": 1
      });

      const mutatedHotels = __hotels.map((el) => el);

      resolve(
        mutatedHotels.map((el) => {
          const foundHotel = data?.data?.hits?.find(
            (hotel) =>
              hotel?.source?.attributes?.JPCode ===
              getCurrentHotelCode(el?.attributes)
          );
          const isKorea = foundHotel?.source?.en_address
            ?.toLowerCase()
            .includes("korea");

          return {
            ...el,
            HotelInfo: {
              ...el.HotelInfo,
              HotelName: el.HotelInfo?.Name || el.HotelInfo?.HotelName,
              HotelAddress:
                el.HotelInfo?.Address || el.HotelInfo?.Address?.Address,
              Name: foundHotel?.source?.kr_name,
              NameEn: foundHotel?.source?.en_name,
              ZoneEn: foundHotel?.source?.Zone?.en_name,
              ZoneKr: foundHotel?.source?.Zone?.kr_name,
              Address: isKorea
                ? foundHotel?.source?.kr_address ||
                  foundHotel?.source?.en_address
                : foundHotel?.source?.en_address
            }
          };
        })
      );

      return mutatedHotels;
    } catch (err) {
      reject(err);
      return __hotels;
    }
  });
};

export function SearchResult() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createSession = useCreateSession();
  const filterRef = useRef();
  const { search } = useLocation();

  const [action, setAction] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [notAvailableHotel, setNotAvailableHotel] = useState();
  const [hotels, setHotels] = useState([]);
  const [page, setPage] = useState(1);

  const { hotelView } = useSelector((store) => store.common);
  const getHotelContent = useGetHotelContent();

  const replacements = searchParams.get("replacement")?.split(",");
  const selectedBoardTypes = searchParams.get("boardTypes")?.split(",");
  const sort = searchParams.get("sortBy") || sortKeys.RECOMMENDATION;
  const sessionId = searchParams.get("sessionId");
  const cancellationPolicy = searchParams.get("cancellationPolicy")?.split(",");
  const availableZones = searchParams.get("availableZones")?.split(",");
  const notAvailableHotelCode = searchParams.get("notAvailableHotelCode");

  useEffect(() => {
    if (!notAvailableHotelCode) return;

    function getHContent() {
      getHotelContent.mutate(
        {
          language: languageKeys.KR,
          JPCode: [notAvailableHotelCode]
        },
        {
          onSuccess: async (res) => {
            fetchHotelNames([res.HotelContent]).then((res2) => {
              setNotAvailableHotel({ ...res, ...res2[0] });
            });
          },
          onError: (err) => {
            console.log(err);
          }
        }
      );
    }

    getHContent();
  }, [notAvailableHotelCode]);

  const _params = useMemo(() => {
    const _res = {
      minPriceFilter: searchParams.get("minPrice"),
      maxPriceFilter: searchParams.get("maxPrice"),
      hotelRating: searchParams.get("replacement"),
      boardTypes: searchParams.get("boardTypes"),
      nonRefundable: searchParams.get("cancellationPolicy"),
      zoneSearch: searchParams.get("availableZones")
    };

    if (!searchParams.get("availableZones")) delete _res.zoneSearch;
    if (!searchParams.get("cancellationPolicy")) delete _res.nonRefundable;
    if (!searchParams.get("boardTypes")) delete _res.boardTypes;
    if (!searchParams.get("availableZones")) delete _res.zoneSearch;

    if (!searchParams.get("replacement")) delete _res.hotelRating;

    if (
      isNaN(Number(searchParams.get("minPrice"))) ||
      !searchParams.get("minPrice")
    )
      delete _res.minPriceFilter;
    if (
      isNaN(Number(searchParams.get("maxPrice"))) ||
      !searchParams.get("maxPrice")
    )
      delete _res.maxPriceFilter;

    if (sort) _res.sortBy = sort;

    return _res;
  }, [search, sort]);

  const { data, isLoading, refetch } = useSearchHotels({
    sessionId: sessionId,
    params: _params,
    queryParams: {
      onSuccess: (res) => {
        setPage(1);

        return res;
      }
    }
  });

  const { filters: wsFilters, loading: wsLoading } = useWebsocketFilter({
    sessionId
  });

  useEffect(() => {
    if (!data) return;

    async function updateHotelName() {
      fetchHotelNames(data?.hotels).then((res) => {
        setHotels(res);
      });
    }

    updateHotelName();

    return () => {
      dispatch(commonActions.closeCompareBar());
    };
  }, [data]);

  const filters = useMemo(() => {
    const copyParams = { ...(_params || {}) };

    delete copyParams?.sortBy;

    if (JSON.stringify(copyParams) === "{}") {
      return wsFilters || data?.filters;
    }

    return data?.filters;
  }, [data, wsFilters, _params]);

  const priceRange = [
    Number(searchParams.get("minPrice")),
    Number(searchParams.get("maxPrice"))
  ];

  const checkIn = data?.query?.checkInDate;
  const checkOut = data?.query?.checkOutDate;

  const [allowFilter, setAllowFilter] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const onChooseHotel = async (jpCode, hotelName) => {
    setIsSearching(true);

    const payload = {
      paxes: data.query.paxes,
      language: import.meta.env.VITE_JUNIPER_LANG,
      nationality: data?.query?.nationality,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      hotelCodes: [jpCode],
      useCurrency: import.meta.env.VITE_JUNIPER_CURRENCY,
      destination: hotelName
    };

    createSession.mutate(payload, {
      onSuccess: (res) => {
        navigate(`/hotel-details?sessionId=${res.search_session_id}`);
        setIsSearching(true);
      },
      onError: (err) => {
        console.log(err);
        setIsOpenNotFound(true);
        setIsSearching(false);
      }
    });
  };

  const onChangePriceRange = (min, max) => {
    if (!allowFilter || wsLoading) return;

    setSearchParams((prev) => {
      prev.set("minPrice", min || filters?.minPrice);
      prev.set("maxPrice", max || filters?.maxPrice);

      return prev;
    });
  };

  const setSort = (val) => {
    setSearchParams((prev) => {
      prev.set("sortBy", val.key);

      return prev;
    });
  };

  const onChangeReplacement = (item) => {
    if (!allowFilter) return;

    setSearchParams((prev) => {
      prev.set(
        "replacement",
        replacements?.includes(item)
          ? [
              ...(replacements || []).filter(
                (el) => Number(el) !== Number(item)
              )
            ]
              .filter((el) => el)
              .join(",")
          : [...(replacements || []), item].filter((el) => el).join(",")
      );

      return prev;
    });
  };

  const onChangeBoardTypes = (item) => {
    if (!allowFilter) return;

    setSearchParams((prev) => {
      prev.set(
        "boardTypes",
        selectedBoardTypes?.includes(item)
          ? [...(selectedBoardTypes || []).filter((el) => el !== item)]
              .filter((el) => el)
              .join(",")
          : [...(selectedBoardTypes || []), item].filter((el) => el).join(",")
      );

      return prev;
    });
  };

  const onChangeAvailableZones = (item) => {
    if (!allowFilter) return;
    setSearchParams((prev) => {
      prev.set(
        "availableZones",
        availableZones?.includes(item)
          ? [...(availableZones || []).filter((el) => el !== item)]
              .filter((el) => el)
              .join(",")
          : [...(availableZones || []), item].filter((el) => el).join(",")
      );

      return prev;
    });
  };

  const onChangeCancellationPolicy = (item) => {
    if (!allowFilter) return;

    setSearchParams((prev) => {
      prev.set(
        "cancellationPolicy",
        cancellationPolicy?.includes(item)
          ? [...(cancellationPolicy || []).filter((el) => el !== item)]
              .filter((el) => el)
              .join(",")
          : [...(cancellationPolicy || []), item].filter((el) => el).join(",")
      );

      return prev;
    });
  };

  const { mutate, isLoading: isLoadingCheckRate } = useCheckHotel();
  const isMobile = useDetectIsMobile();

  // const [view, setView] = useState(isMobile ? types[1] : types[0]);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isOpenNotFound, setIsOpenNotFound] = useState(false);
  const [isOpenMobileSearch, setIsOpenMobileSearch] = useState(false);
  const [checkingRate, setCheckingRate] = useState(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const view = hotelView;
  const setView = (val) => dispatch(commonActions.setHotelView(val));

  useEffect(() => {
    if (window.innerWidth < 600) {
      dispatch(commonActions.setHotelView(viewTypes.GRID));
    }
  }, []);

  useEffect(() => {
    dispatch(cartActions.clearDeletableRatePlanCodes());
  }, []);

  useEffect(() => {
    if (data?.query?.paxes)
      dispatch(
        commonActions.savePaxes({
          paxes: data?.query?.paxes
        })
      );
    return () => {
      dispatch(commonActions.savePaxes({ paxes: [] }));
    };
  }, [data?.query]);

  useEffect(() => {
    if (wsLoading) return;

    const timer = setTimeout(() => {
      setAllowFilter(true);
      refetch();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [wsLoading]);

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
          //   `/book?rate=${encodeURIComponent(
          //     res.HotelResult.HotelOptions.HotelOption.attributes.RatePlanCode
          //   )}&checkIn=${checkIn}&checkOut=${checkOut}&hotelCode=${jpCode}&currency=USD`
          // );
        },
        onError: (err) => {
          console.log(err);
          setIsSearching(false);
        }
      }
    );
  };

  const isLastPage =
    Number(filters?.totalHotels) === Number(hotels?.length) ||
    Number(hotels?.length) < 10 ||
    page >= Math.ceil(Number(filters?.totalHotels) / 10) ||
    isLoading;

  const onNextHotelsLoad = useCallback(() => {
    const _page = page + 1;

    if (!isLastPage) {
      setIsLoadingPage(true);
      searchService
        .searchHotels(sessionId, { ..._params, page: _page })
        .then((res) => {
          fetchHotelNames(res?.hotels).then((__res) => {
            setHotels((prev) => [...prev, ...(__res || [])]);
          });
          setPage((prev) => prev + 1);
        })
        .finally(() => {
          setIsLoadingPage(false);
        });
    }
  }, [hotels, _params, page, isLastPage]);

  const onChangeAction = (value) => {
    setAction(value);
  };

  const currentNationality = nationalities.find(
    (item) => item.value === data?.query?.nationality
  );

  const toggleFilter = () => {
    setIsOpenFilter((prev) => !prev);
  };

  useOutsideClick(filterRef, () => {
    if (isOpenFilter) setIsOpenFilter(false);
  });

  useEffect(() => {
    if (isMobile && view === "row") setView("grid");
  }, [isMobile, view]);

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
        },
        rooms: []
      }}
    >
      <SearchDialog
        isOpen={isSearching}
        onClose={() => setIsSearching(false)}
      />

      <NoRoomDialog
        isOpen={isOpenNotFound}
        onClose={() => setIsOpenNotFound(false)}
      />

      <Header withoutContainer>
        <>
          {!isOpenSearch && (
            <div
              onClick={() => setIsOpenSearch((prev) => !prev)}
              className="sm:flex hidden rounded-lg bg-[#F3F3FB] items-center overflow-hidden"
            >
              <button
                onClick={() => onChangeAction("location")}
                className="flex items-center py-[13px] px-4 gap-3 hover:bg-[#DBDBE8] sm:w-[266px] sm:w-max-[266px]"
              >
                <span className="scale-[0.7]">
                  <SearchIcon />
                </span>
                <p className="text-sm text-black font-medium">
                  {data?.query?.destination}
                </p>
              </button>

              <span className="h-[20px] w-[1px] border border-[#EAEAF4]"></span>

              <button
                onClick={() => onChangeAction("date")}
                className="flex items-center py-[13px] px-4 hover:bg-[#DBDBE8]"
              >
                <p className="text-sm text-black font-medium">
                  {moment(checkIn).format("YYYY.MM.DD")} ~{" "}
                  {moment(checkOut).format("YYYY.MM.DD")}
                </p>
              </button>

              {/* <span className="h-[20px] w-[1px] border border-[#EAEAF4]"></span>
              <button
                onClick={() => onChangeAction("nationality")}
                className="flex items-center py-[13px] px-4 hover:bg-[#DBDBE8]"
              >
                <p className="text-sm text-black font-medium">
                  {currentNationality?.name}
                </p>
              </button> */}

              <span className="h-[20px] w-[1px] border border-[#EAEAF4]"></span>
              <button
                onClick={() => onChangeAction("occupancy")}
                className="flex items-center py-[13px] px-4 hover:bg-[#DBDBE8]"
              >
                <p className="text-sm text-black font-medium">
                  객실 {data?.query?.paxes?.length}, 인원{" "}
                  {data?.query?.paxes?.reduce(
                    (prev, curr) =>
                      prev +
                      curr.passangers.filter((pass) => pass.age > 0)?.length,
                    0
                  )}
                </p>
              </button>
            </div>
          )}

          {isOpenSearch && (
            <div className="fixed w-full left-0 top-[79px] right-0 h-[100px] bg-[rgba(255,255,255,1)] z-10 border-top border-gray-500">
              <SearchFormMini
                isOpen={isOpenMobileSearch}
                setIsOpen={setIsOpenSearch}
                setIsOpenNotFound={setIsOpenNotFound}
                defaultValues={{
                  isOpenLocation: action === "location",
                  isOpenDate: action === "date",
                  isOpenOccupancy: action === "occupancy",
                  isOpenNationality: action === "nationality",
                  date: [
                    new DateObject({
                      year: new Date(checkIn).getFullYear(),
                      month: new Date(checkIn).getMonth() + 1,
                      day: new Date(checkIn).getDate()
                    }),
                    new DateObject({
                      year: new Date(checkOut).getFullYear(),
                      month: new Date(checkOut).getMonth() + 1,
                      day: new Date(checkOut).getDate()
                    })
                  ],
                  location: {
                    source: {
                      en_name: data?.query?.destination,
                      JPDCode:
                        data?.query?.JPDCode ||
                        data?.hotels[0]?.attributes?.JPDCode
                    }
                  },
                  nationality: currentNationality,
                  occupancies: data?.query?.paxes?.map((pax, idx) => ({
                    adults:
                      pax.passangers.filter((pax) => pax.age > 17)?.length || 0,
                    child:
                      pax.passangers.filter(
                        (pax) => pax.age > 0 && pax.age < 18
                      )?.length || 0,
                    childAges:
                      pax.passangers
                        .filter((pax) => pax.age > 0 && pax.age < 18)
                        .map((pax) => Number(pax.age)) || 0,
                    id: idx + 1
                  }))
                }}
              />
            </div>
          )}

          {isOpenSearch && (
            <div
              onClick={() => {
                setIsOpenSearch((prev) => !prev);
                setAction(null);
              }}
              className="fixed w-full left-0 top-[90px] right-0 bottom-0 bg-[rgba(0,0,0,0.4)]"
            ></div>
          )}
        </>
      </Header>

      <div className="sm:hidden block fixed w-full left-0 top-[79px] z-[99]">
        <SearchFormMini
          key={isOpenMobileSearch}
          isOpen={isOpenMobileSearch}
          setIsOpen={setIsOpenMobileSearch}
          setIsOpenNotFound={setIsOpenNotFound}
          defaultValues={{
            date: [
              new DateObject({
                year: new Date(checkIn).getFullYear(),
                month: new Date(checkIn).getMonth() + 1,
                day: new Date(checkIn).getDate()
              }),
              new DateObject({
                year: new Date(checkOut).getFullYear(),
                month: new Date(checkOut).getMonth() + 1,
                day: new Date(checkOut).getDate()
              })
            ],
            location: {
              source: {
                en_name: data?.query?.destination,
                JPDCode:
                  data?.query?.JPDCode || data?.hotels[0]?.attributes?.JPDCode
              }
            },
            nationality: currentNationality,
            occupancies: data?.query?.paxes?.map((pax, idx) => ({
              adults: pax.passangers.filter((pax) => pax.age > 17)?.length || 0,
              childs: pax.passangers.filter((pax) => pax.age < 18)?.length || 0,
              childAges:
                pax.passangers
                  .filter((pax) => pax.age < 18)
                  .map((pax) => pax.age) || 0,
              id: idx + 1
            }))
          }}
        />
      </div>

      <section className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-4 gap-10">
          <div className="hidden md:flex">
            <FilterHotels
              view={view}
              setView={setView}
              filters={filters}
              priceRange={priceRange}
              replacements={replacements}
              availableZones={availableZones}
              selectedBoardTypes={selectedBoardTypes}
              cancellationPolicy={cancellationPolicy}
              onChangeAvailableZones={onChangeAvailableZones}
              onChangeCancellationPolicy={onChangeCancellationPolicy}
              onChangeBoardTypes={onChangeBoardTypes}
              onChangePriceRange={onChangePriceRange}
              onChangeReplacement={onChangeReplacement}
            />
          </div>
          <div className="md:col-span-3 col-span-4 flex flex-col items-center gap-5">
            <OutputHotels
              notAvailableHotel={notAvailableHotel}
              paxes={data?.query?.paxes}
              passengers={data?.query?.paxes?.reduce(
                (prev, curr) =>
                  prev + curr.passangers.filter((pass) => pass.age > 0)?.length,
                0
              )}
              toggleFilter={toggleFilter}
              toggleMobileSearch={() => setIsOpenMobileSearch((prev) => !prev)}
              view={view}
              sort={sortArrays.find((el) => el.key === sort)}
              setSort={setSort}
              setView={setView}
              checkIn={checkIn}
              checkOut={checkOut}
              nationality={data?.query?.nationality}
              destinationName={data?.query?.destination}
              sessionId={sessionId}
              hotels={hotels}
              isLastPage={isLastPage}
              locations={data?.locations}
              isLoading={isLoading}
              onCheckRatePlanCode={onCheckRatePlanCode}
              isLoadingCheckRate={isLoadingCheckRate}
              checkingRate={checkingRate}
              onChooseHotel={onChooseHotel}
              onNextLoadHotels={onNextHotelsLoad}
              totalHotelsCount={Number(data?.filters?.totalHotels)}
              hasMore={Number(data?.filters?.totalHotels) !== hotels?.length}
            />

            {(!isLastPage || wsLoading || isLoading || isLoadingPage) &&
            view !== "map" ? (
              <Button
                key={isLastPage}
                disabled={isLoadingPage}
                onClick={onNextHotelsLoad}
                variant="unstyled"
                className="border-[0.5px] border-[#06F] text-[#06F] rounded-full flex active_cart w-[200px] justify-center font-light min-h-[53px] max-h-[53px] h-[53px]"
              >
                {isLoadingPage || wsLoading ? (
                  "로드 중..."
                ) : (
                  <>
                    검색된 호텔 더보기 <ChevronRightIcon />{" "}
                  </>
                )}
              </Button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>

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

      <div
        style={{
          pointerEvents: isOpenFilter ? "initial" : "none"
        }}
        className={classNames(
          "w-full sm:hidden fixed left-0 top-0 right-0 bottom-0 z-20 overflow-auto",
          isOpenFilter && "bg-black/25"
        )}
      >
        <div
          ref={filterRef}
          className={classNames(
            "w-[320px] bg-white px-[25px] transition-all",
            isOpenFilter ? "translate-x-0" : "translate-x-[-1000px]"
          )}
        >
          <FilterHotels
            view={view}
            setView={setView}
            filters={filters}
            priceRange={priceRange}
            replacements={replacements}
            availableZones={availableZones}
            selectedBoardTypes={selectedBoardTypes}
            cancellationPolicy={cancellationPolicy}
            onChangeAvailableZones={onChangeAvailableZones}
            onChangeCancellationPolicy={onChangeCancellationPolicy}
            onChangeBoardTypes={onChangeBoardTypes}
            onChangePriceRange={onChangePriceRange}
            onChangeReplacement={onChangeReplacement}
            toggleFilter={toggleFilter}
          />
        </div>
      </div>
    </HotelContext.Provider>
  );
}
