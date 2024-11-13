import moment from "moment";
import HomeIcon from "@/assets/icons/home.svg?react";
import HotelIcon from "@/assets/icons/hotel.svg?react";
import SearchIcon from "@/assets/icons/search.svg?react";
import HotelV2Icon from "@/assets/icons/hotel.svg?react";
import useLoadDirection from "@/hooks/useLoadDirections";
import LocationIcon from "@/assets/icons/location.svg?react";
import BedIcon from "@/assets/icons/bed.svg?react";
import { Button } from "@/components/index";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOccupancy } from "@/hooks/useOccupancy";

import { searchService, useCreateSession } from "@/services/search.service";
import { Controller, useForm, useWatch } from "react-hook-form";
import { searchTypes } from "@/consts/searchTypes";
import classNames from "classnames";
import { nationalities } from "@/consts/nationality";
import { RangeDatepicker } from "@/modules/Home/components/RangeDatepicker";
import { AutoComplete } from "@/modules/Home/components/Autocomplete";
import { Occupancy } from "@/modules/Home/components/Occupancy";
import { components } from "react-select";
import { toast } from "react-toastify";
import { languageKeys } from "@/consts/languages";
import locationTypes from "@/consts/locationTypes";
import { locationIcons } from "@/modules/Home/components/SearchFrom";
import ChevronUp from "@/assets/icons/chevron-up.svg?react";
import { FaBuilding } from "react-icons/fa";

const Group = (props) => {
  const [showMore, setShowMore] = useState(false);

  const displayedOptions = showMore
    ? props.children
    : props.children.slice(0, 5);

  if (props?.data?.label === "목적지") {
    return (
      <div className="flex flex-col w-full" key={props?.data?.label}>
        <components.Group {...props}>{displayedOptions}</components.Group>

        {!showMore ? (
          <button
            type="button"
            onClick={() => setShowMore((prev) => !prev)}
            className="text-sm text-primary-600"
          >
            자세히보기
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowMore((prev) => !prev)}
            className="text-sm text-primary-600"
          >
            간략하게 표시
          </button>
        )}
      </div>
    );
  }
  return (
    <div>
      <components.Group {...props} />
    </div>
  );
};

const Option = ({ expandedJPDCodes, toggleJPDCode, ...props }) => {
  const icon = locationIcons[props?.data?.source?.AreaType || "other"];

  const isExpanded = expandedJPDCodes?.includes(props?.value);

  const isExpandedChild = expandedJPDCodes.includes(
    props?.data?.source?.ParentJPDCode
  );

  const hasOptions = useMemo(() => {
    const locationOptions = props?.options?.find((el) => el.label === "목적지");

    const foundChildOptions = locationOptions?.options?.filter(
      (el) => el?.source?.ParentJPDCode === props?.value
    );

    return foundChildOptions?.length > 0;
  }, [props?.options, props?.value]);

  const isZone = props?.value?.includes("JPD");
  const isParentZone = props?.data?.source?.level === 0;

  const isRecommendedZones = useMemo(() => {
    return props?.data?.source?.isRecommended;
  }, [props?.data]);

  const handleToggle = (e) => {
    e.stopPropagation();

    toggleJPDCode(props?.value);
  };

  if (!isExpandedChild && isZone && !isParentZone && !isRecommendedZones)
    return <></>;

  return (
    <div className="flex" key={props?.data?.source?.JPDCode}>
      <components.Option {...props}>
        <div
          className={classNames(
            "flex items-center gap-3 text-xs w-full justify-between",
            {
              [`pl-[10px]`]:
                props?.data?.source?.level === 1 && !isRecommendedZones,
              [`pl-[30px]`]:
                props?.data?.source?.level === 2 && !isRecommendedZones,
              [`pl-[50px]`]:
                props?.data?.source?.level === 3 && !isRecommendedZones
            }
          )}
        >
          <div className="flex items-center">
            <span className="w-5 h-5 active_cart">
              {props.value?.includes("JPD") ? (
                icon || locationIcons.other
              ) : (
                <FaBuilding
                  size={14}
                  style={{
                    marginLeft: "2px",
                    marginTop: "2px"
                  }}
                />
              )}
            </span>

            <div className="flex items-center gap-2">
              <p
                className="text-[12px] leading-[18px] font-medium"
                dangerouslySetInnerHTML={{
                  __html: props.data.source.kr_name || props.data.source.en_name
                }}
              ></p>

              {props.data.source?.hotel_count ? (
                <p className="text-gray-600">
                  ({props.data.source?.hotel_count})
                </p>
              ) : (
                ""
              )}

              {props.data.source?.Zone && (
                <p
                  className="text-[10px] leading-[18px] mt-1 text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html:
                      props.data.source.Zone.kr_name ||
                      props.data.source.Zone.en_name
                  }}
                ></p>
              )}
              {props.value?.includes("JPD") && props.data.source?.City && (
                <p
                  className="text-[10px] leading-[18px] mt-1 text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html:
                      props.data.source.City.kr_value ||
                      props.data.source.City.en_value
                  }}
                ></p>
              )}
              {props.data.source?.AreaType && (
                <p className="text-[10px] leading-[18px] mt-1 text-gray-500">
                  {locationTypes[props.data.source.AreaType]}
                </p>
              )}
            </div>
          </div>

          {hasOptions && !isRecommendedZones && (
            <>
              {isExpanded ? (
                <button className="rotate-180" onClick={handleToggle}>
                  <ChevronUp />
                </button>
              ) : (
                <button
                  className="rotate-90"
                  // className="text-gray-500 text-[9px] border border-gray-500 py-1 px-2 rounded-md"
                  onClick={handleToggle}
                >
                  <ChevronUp />
                </button>
              )}
            </>
          )}

          {/* {props.children} */}
        </div>
      </components.Option>
    </div>
  );
};

export function SearchFormMini({
  defaultValues,
  isOpen,
  navigateLink = "/hotel-details",
  setIsOpen,
  initHotelCodes,
  setIsOpenNotFound
}) {
  const navigate = useNavigate();

  const [searchNationality, setSearchNationality] = useState("");
  const [expandedJPDCodes, setExpandedJPDCodes] = useState([]);

  const toggleJPDCode = (jpdCode) =>
    setExpandedJPDCodes((prev) =>
      prev.includes(jpdCode)
        ? prev.filter((el) => el !== jpdCode)
        : [...prev, jpdCode]
    );

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      nationality: {
        name: "대한민국",
        value: "KR"
      },
      ...defaultValues
    }
  });

  const isSelectedZone = watch("location.source.JPDCode")?.includes("JPD");

  const { onChange, rooms } = useOccupancy({
    defaulRooms: defaultValues?.occupancies
  });

  const { loadOptions, options, isLoading } = useLoadDirection({
    defaultValueTerm: defaultValues.location.source.en_name
  });

  const createSession = useCreateSession();

  const onSearch = async (data) => {
    let amount = 0;
    const paxes = data.occupancies.map((occupancy, index) => {
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
      paxes,
      language: languageKeys.KR,
      nationality: data.nationality?.value,
      checkInDate: moment(data.date[0].toDate()).format("yyyy-MM-DD"),
      checkOutDate: moment(data.date[1].toDate()).format("yyyy-MM-DD"),
      hotelCodes: initHotelCodes ? [...initHotelCodes] : [], // JPCode
      destination:
        data?.location?.source?.kr_name || data?.location?.source?.en_name,
      useCurrency: import.meta.env.VITE_JUNIPER_CURRENCY,
      JPDCode: data?.location?.source?.JPDCode
    };

    if (data?.location?.source?.JPDCode) {
      try {
        const res = await searchService.getHotelCodesByJPD(
          data?.location?.source?.JPDCode
        );

        payload.hotelCodes = [...res.data.hotel_portfolios_codes];

        createSession.mutate(payload, {
          onSuccess: (res) => {
            navigate(`/search?sessionId=${res.search_session_id}`);
            setIsOpen(false);
            window.location.reload();
          },
          onError: (err) => {
            setIsOpenNotFound(true);
          }
        });
        return;
      } catch (e) {
        setIsOpenNotFound(true);
      }
    }

    payload.hotelCodes = data?.location?.source?.attributes?.JPCode
      ? [data?.location?.source?.attributes?.JPCode]
      : initHotelCodes;

    createSession.mutate(payload, {
      onSuccess: (res) => {
        navigate(`${navigateLink}?sessionId=${res.search_session_id}`);
        window.location.reload();

        setIsOpen(false);
      },
      onError: async () => {
        // setIsOpenNotFound(true);
        // setIsOpenSearchHotel(false);

        const res = await searchService.getHotelCodesByJPD(
          data?.location?.source?.Zone?.attributes?.JPDCode
        );

        if (!res.data?.hotel_portfolios_codes.length)
          return setIsOpenNotFound(true);

        payload.hotelCodes = res.data?.hotel_portfolios_codes;
        createSession.mutate(payload, {
          onSuccess: (res) => {
            navigate(
              `/search?sessionId=${res.search_session_id}&notAvailableHotelCode=${data?.location?.source?.attributes?.JPCode}`
            );
          },
          onError: () => {
            setIsOpenNotFound(true);
          }
        });
      }
    });
  };

  const occupancies = useWatch({
    control,
    name: "occupancies"
  });

  const onSaveOccupancy = (val) => {
    setValue("occupancies", val);
  };

  useEffect(() => {
    onSaveOccupancy(rooms);
  }, [rooms]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSearch)}
        className={classNames(
          "fixed top-0 left-0 right-0 z-[999] sm:z-[9] sm:relative sm:rounded-[10px] bg-white transition ease-in-out duration-500 sm:translate-y-0 ",
          isOpen ? "translate-y-0" : "translate-y-[-1000px]"
        )}
      >
        <div className="px-[20px] py-[20px] flex-col flex mx-auto sm:max-w-[1140px] sm:flex-row sm:w-[1140px] gap-[10px] sm:items-start sm:px-[0] sm:py-[25px] justify-center">
          <Controller
            control={control}
            name="location"
            cacheOptions
            rules={{ required: true }} // TODO: uncomment this field
            render={({
              field: { onChange, value, name },
              formState: { errors }
            }) => (
              <AutoComplete
                icon={
                  isSelectedZone ? (
                    <LocationIcon />
                  ) : (
                    <span className="w-5 h-5 active_cart">
                      <FaBuilding />
                    </span>
                  )
                }
                defaultMenuIsOpen={defaultValues.isOpenLocation}
                autoFocus={defaultValues.isOpenLocation}
                placeholder="목적지 또는 호텔 명 입력"
                name={name}
                value={value}
                errors={errors}
                options={options}
                className="sm:min-w-[330px] sm:max-w-[330px] sm:w-[330px]"
                isLoading={isLoading}
                getOptionLabel={(opt) =>
                  opt?.source?.kr_name || opt?.source?.en_name
                }
                getOptionValue={(opt) =>
                  opt?.source?.JPDCode || opt?.source?.attributes?.JPCode
                }
                onChange={onChange}
                onInputChange={loadOptions}
                components={{
                  Group,
                  Option: (props) => (
                    <Option
                      {...props}
                      expandedJPDCodes={expandedJPDCodes}
                      toggleJPDCode={toggleJPDCode}
                    />
                  )
                }}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            rules={{ required: true }}
            render={({
              field: { onChange, name, value },
              formState: { errors }
            }) => (
              <>
                <RangeDatepicker
                  defaultIsOpen={defaultValues.isOpenDate}
                  value={value}
                  isInOneInput
                  onChange={onChange}
                  format={"YYYY/MM/DD"}
                  fullWidth
                  errors={errors}
                  name={name}
                  className="w-full sm:min-w-[270px] sm:max-w-[270px] sm:w-[270px]"
                />
              </>
            )}
          />
          {/* <Controller
            control={control}
            name="nationality"
            rules={{ required: true }}
            render={({
              field: { onChange, value, name },
              formState: { errors }
            }) => (
              <AutoComplete
                name={name}
                icon={null}
                value={value}
                label="접속지역."
                placeholder="국적을 선택하세요"
                className="sm:min-w-[15%] sm:max-w-[15%] sm:w-[15%]"
                defaultValue={nationalities[0]}
                errors={errors}
                options={nationalities.filter((item) =>
                  item.name
                    .toLowerCase()
                    .includes(searchNationality.toLowerCase())
                )}
                defaultMenuIsOpen={defaultValues.isOpenNationality}
                autoFocus={defaultValues.isOpenNationality}
                getOptionLabel={(opt) => opt.name}
                getOptionValue={(opt) => opt.value}
                onChange={onChange}
                onInputChange={(val) => setSearchNationality(val)}
              />
            )}
          /> */}
          <Occupancy
            onConfirm={onSaveOccupancy}
            rooms={rooms}
            value={occupancies}
            onChange={onChange}
            defaultIsOpen={defaultValues.isOpenOccupancy}
          />
          <Button
            type="submit"
            className="w-full sm:w-[15%] mt-[20px]"
            leftIcon={<SearchIcon />}
            isLoading={createSession.isLoading}
          >
            검색
          </Button>
        </div>
      </form>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="top-0 left-0 bottom-0 right-0 fixed z-10"
          style={{ background: "rgba(22, 26, 63, 0.20)" }}
        ></div>
      )}
    </>
  );
}
