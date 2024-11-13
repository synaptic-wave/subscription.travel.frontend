import { Header } from "@/components/Header";

import { SearchFormMini } from "@/components/SearchFormMini";

import SearchIcon from "@/assets/icons/search-v2.svg?react";
import CalendarIcon from "@/assets/icons/calendar.svg?react";
import BedIcon from "@/assets/icons/bed.svg?react";
import PersonIcon from "@/assets/icons/person.svg?react";
import moment from "moment";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useCreateSession, useSearchHotels } from "@/services/search.service";
import classNames from "classnames";
import {
  HotelParentContainer,
  MapView
} from "../SearchResult/Sections/Output/View";
import { HotelCompareGridCard } from "@/components/HotelCards/CompareGrid";
import { SearchDialog } from "../SearchResult/components/SearchDialog";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { NoRoomDialog } from "../SearchResult/components/NoRoomDialog";

const GridView = ({
  hotels,
  checkIn,
  checkOut,
  sessionId,
  onCheckRatePlanCode,
  checkingRate,
  isLoadingCheckRate
}) => {
  return (
    <div className="grid sm:grid-cols-3 grid-cols-1 mt-5 gap-[25px]">
      {hotels?.map((hotel) => {
        return (
          <div className="mt-3" key={hotel?.attributes?.JPCode}>
            <HotelParentContainer
              hotel={hotel}
              Component={HotelCompareGridCard}
              props={{
                address: hotel.HotelInfo?.Address,
                lng: hotel.HotelInfo?.Longitude,
                lat: hotel.HotelInfo?.Latitude,
                checkOut: checkOut,
                checkIn: checkIn,
                sessionId: sessionId,
                hbRating: Number(hotel?.attributes?.rating),
                hbComments: Number(hotel?.attributes?.reviewsCount),
                isLoadingCheckRate,
                onCheckRatePlanCode,
                checkingRate
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const Renderers = {
  grid: GridView,
  map: MapView
};

function filterUniqueJPCode(arr) {
  const seenJPCode = new Set();
  return arr.filter((item) => {
    const jpCode = item.attributes.JPCode;
    if (!seenJPCode.has(jpCode)) {
      seenJPCode.add(jpCode);
      return true;
    }
    return false;
  });
}

export const CompareHotels = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { hotels } = useSelector((store) => store.common.comparedHotels);

  const sessionId = searchParams.get("sessionId");

  const createSession = useCreateSession();
  const { data } = useSearchHotels({
    sessionId: sessionId
  });

  const checkIn = data?.query?.checkInDate;
  const checkOut = data?.query?.checkOutDate;
  const destination = data?.query?.destination;
  const paxes = data?.query?.paxes;
  const passengersAmount = paxes?.reduce(
    (prev, curr) =>
      prev + curr.passangers.filter((pass) => pass.age > 0)?.length,
    0
  );

  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpenMobileSearch, setIsOpenMobileSearch] = useState(false);
  const [isOpenNotFound, setIsOpenNotFound] = useState(false);
  const [view, setView] = useState("grid"); // grid or map

  const Render = Renderers[view];

  const filtereHotels = useMemo(() => {
    return filterUniqueJPCode([
      ...(data?.hotels || []),
      ...hotels.map((hotel) => ({
        HotelInfo: {
          Name: hotel.name
        },
        attributes: {
          JPCode: hotel.JPCode,
          Code: hotel.JPCode
        }
      }))
    ]);
  }, [hotels, data?.hotels]);

  const onChooseHotel = async (jpCode) => {
    setIsSearching(true);
    let amount = 0;

    const occupancies = paxes?.map((pax, idx) => ({
      adults: pax.passangers.filter((pax) => pax.age > 17)?.length || 0,
      childs: pax.passangers.filter((pax) => pax.age < 18)?.length || 0,
      childAges:
        pax.passangers.filter((pax) => pax.age < 18).map((pax) => pax.age) || 0,
      id: idx + 1
    }));

    const _paxes = occupancies.map((occupancy, index) => {
      const passangers = [
        ...Array(occupancy.adults)
          .fill(1)
          .map((_, idx) => ({
            idPax: idx + 1 + amount,
            age: 35
          })),
        ...Array(occupancy.child)
          .fill(1)
          .map((_, idx) => ({
            idPax: idx + occupancy.adults + 1 + amount,
            age: Number(occupancy.childAges[idx])
          }))
      ];
      amount = amount + passangers.length;
      return {
        roomId: index + 1,
        passangers
      };
    });

    const payload = {
      paxes: _paxes,
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
        console.log(err);
        // toast.error("Error on checking hotel");
        setIsSearching(true);
        setIsOpenNotFound(true);
      }
    });
  };

  return (
    <>
      <SearchDialog
        isOpen={isSearching}
        onClose={() => setIsSearching(false)}
      />

      <NoRoomDialog
        isOpen={isOpenNotFound}
        onClose={() => setIsOpenNotFound(false)}
      />

      <Header>
        <>
          {!isOpenSearch && (
            <button
              onClick={() => setIsOpenSearch((prev) => !prev)}
              className="sm:flex hidden py-2 px-4 rounded-lg bg-[#F3F3FB] items-center gap-3"
            >
              <span className="scale-[0.7]">
                <SearchIcon />
              </span>
              <p className="text-sm text-black font-medium">{destination}</p>

              <span className="h-[20px] w-[1px] border border-[#EAEAF4]"></span>

              <p className="text-sm text-black font-medium">
                {checkIn} ~ {checkOut}
              </p>

              <span className="h-[20px] w-[1px] border border-[#EAEAF4]"></span>

              <p className="text-sm text-black font-medium">
                객실 {paxes?.length}, 인원 {passengersAmount}
              </p>
            </button>
          )}

          {isOpenSearch && (
            <div className="fixed w-full left-0 top-[79px] right-0 h-[100px] bg-[rgba(255,255,255,1)] z-10 border-top border-gray-500">
              <SearchFormMini
                isOpen={isOpenMobileSearch}
                setIsOpen={setIsOpenSearch}
                initHotelCodes={data?.query?.hotelCodes}
                navigateLink="/compare"
                defaultValues={{
                  date: [moment(checkIn), moment(checkOut)],
                  location: {
                    source: {
                      en_name: destination,
                      JPDCode: null
                    }
                  },
                  occupancies: paxes?.map((pax, idx) => ({
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
              onClick={() => setIsOpenSearch((prev) => !prev)}
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
          initHotelCodes={data?.query?.hotelCodes}
          navigateLink="/compare"
          defaultValues={{
            date: [moment(checkIn), moment(checkOut)],
            location: {
              source: {
                en_name: destination,
                JPDCode: null
              }
            },
            occupancies: paxes?.map((pax, idx) => ({
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

      <section className="container mx-auto px-4 sm:mt-12 mt-4">
        <button
          className="w-full sm:hidden bg-[#F3F3FB] p-4 rounded-[10px] flex gap-4 mb-[30px]"
          onClick={() => setIsOpenMobileSearch((prev) => !prev)}
        >
          <div className="svgStrokeGray mt-1">
            <SearchIcon />
          </div>

          <div className="flex flex-col gap-[6px]">
            <h3 className="text-sm text-[#161A3F] font-medium text-left">
              {destination}
            </h3>
            <div className="flex text-[13px] text-[#5C5F79]">
              <p>
                {checkIn} ~ {checkOut}
              </p>{" "}
              |{" "}
              <p>
                객실{paxes?.length}, 인원 {passengersAmount}
              </p>
            </div>
          </div>
        </button>

        <div className="flex flex-col w-full">
          <h1 className="text-md font-bold">{destination}</h1>

          <div className="flex gap-3 mt-3">
            <div className="flex gap-1 items-center text-[13px]">
              <CalendarIcon /> {checkIn} ~ {checkOut}
            </div>
            <div className="flex gap-1 items-center text-[13px]">
              <BedIcon /> 객실 {paxes?.length}
            </div>

            <div className="flex gap-1 items-center text-[13px]">
              <PersonIcon /> 인원 {passengersAmount}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full mt-9">
          <h2 className="text-md font-bold">
            비교 호텔 ({filtereHotels?.length})
          </h2>

          <div className="flex gap-4 mt-[22px]">
            <button
              onClick={() => setView("grid")}
              className={classNames("text-base border-b-2 py-[10px]", {
                ["text-[#2D40FF] border-[#2D40FF]"]: view === "grid",
                ["text-[#8D8FA2] border-[transparent]"]: view !== "grid"
              })}
            >
              호텔 소개 및 서비스
            </button>
            <button
              onClick={() => setView("map")}
              className={classNames("text-base border-b-2", {
                ["text-[#2D40FF] border-[#2D40FF]"]: view === "map",
                ["text-[#8D8FA2] border-[transparent]"]: view !== "map"
              })}
            >
              호텔 위치
            </button>
          </div>
        </div>

        <div className="flex flex-col w-full mt-[45px]">
          <Render
            hotels={filtereHotels}
            checkIn={checkIn}
            checkOut={checkOut}
            sessionId={sessionId}
            onChooseHotel={onChooseHotel}
            onCheckRatePlanCode={onChooseHotel}
            locations={filtereHotels
              ?.map((hotel) => ({
                ...hotel?.HotelInfo,
                Latitude: Number(hotel?.HotelInfo?.Latitude),
                Longitude: Number(hotel?.HotelInfo?.Longitude),
                HotelImages:
                  hotel?.HotelInfo?.Images?.Image ||
                  hotel?.HotelInfo?.Images?.Image?.[0],
                JPCode: hotel?.attributes?.JPCode
              }))
              .filter((loc) => loc?.Latitude && loc?.Longitude)}
          />
        </div>
      </section>
    </>
  );
};
