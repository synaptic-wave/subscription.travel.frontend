import mapImg from "@/assets/images/map.png";
import PlayIcon from "@/assets/icons/play.svg?react";
import StarIcon from "@/assets/icons/star.svg?react";
import { Accordion, MultiRangeSlider, Radio } from "@/components/index";
import { Checkbox } from "@/components/Checkbox";
import { useEffect, useMemo, useState } from "react";
import { types } from "@/consts/index";
import CloseIcon from "@/assets/icons/close.svg?react";

import axios from "axios";
import { boardTypeKeys } from "@/consts/boards";
import generateSignature from "@/utils/generateSignature";

const StartBulks = ({ amount }) => {
  return (
    <div className="flex gap-1">
      {Array(amount)
        .fill(1)
        .map((_) => (
          <StarIcon />
        ))}
    </div>
  );
};

const CheckboxFilters = ({ values, onChange, options, title }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Accordion title={title}>
      <div className="w-full flex flex-col mt-4 gap-3">
        {(showMore ? [...options] : [...options].slice(0, 7))?.map((option) => (
          <Checkbox
            key={option.key}
            value={option?.key}
            isChecked={!!values?.find((value) => value === option.key)}
            onChange={() => onChange(option.key)}
            label={option?.label}
          />
        ))}

        {options?.length > 7 && (
          <button
            className="text-left text-[#2D40FF] text-sm ml-7"
            onClick={() => setShowMore((prev) => !prev)}
          >
            {showMore ? "간략히 표시" : `모두 표시 (${options?.length - 7})`}
          </button>
        )}
      </div>
    </Accordion>
  );
};

const FilterByReplacement = ({ values, onChange, options }) => {
  return (
    <Accordion title="숙박 시설 등급">
      <div className="w-full flex flex-col mt-4 gap-3">
        {options?.map((option) =>
          Number(option.key) === 0 ? (
            <Checkbox
              key={option.key}
              value={option.key}
              isChecked={values?.includes(option.key)}
              onChange={() => onChange(option.key)}
              label={
                <>
                  성급 없음{" "}
                  <span className="font-medium">({option.count})</span>
                </>
              }
            />
          ) : (
            <Checkbox
              value={option.key}
              isChecked={values?.includes(option.key)}
              onChange={() => onChange(option.key)}
              label={
                <div className="flex gap-2 items-center">
                  <StartBulks amount={Number(option.key) || 0} />{" "}
                  <span className="font-medium">({option.count})</span>
                </div>
              }
            />
          )
        )}
      </div>
    </Accordion>
  );
};

const FilterByClientRating = () => {
  return (
    <Accordion title="고객 평점">
      <div className="w-full flex flex-col mt-4 gap-3">
        <Radio label="전체" />
        <Radio label="아주 좋음" />
        <Radio label="좋음" />
        <Radio label="보통" />
      </div>
    </Accordion>
  );
};

const FilterByMap = ({ setView, hotelTotalAmount, className }) => {
  return (
    <div className="flex flex-col w-full pb-[30px] border-0 border-b border-solid border-gray-100">
      <div className="flex items-center justify-center border border-solid border-gray-100 h-[36px] rounded-[10px] text-[13px]">
        <strong>{hotelTotalAmount}</strong>개의 추천 호텔 리스트
      </div>

      <button
        onClick={() => setView(types[2])}
        className="w-full h-[78px] rounded-[10px] overflow-hidden mt-[14px]"
      >
        <img src={mapImg} width="100%" height="100%" />
      </button>

      <button
        onClick={() => setView(types[2])}
        className="flex text-center justify-center items-center mt-[10px]"
      >
        <span>지도에 호텔 표시</span>
        <PlayIcon />
      </button>
    </div>
  );
};

const FilterByService = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Accordion title="룸 서비스">
      <div className="w-full flex flex-col mt-4 gap-3">
        <Checkbox value={5} label="공기 조절" />
        <Checkbox value={4} label="목욕가운" />
        <Checkbox value={3} label="케이블 TV" />
        <Checkbox value={2} label="커피 티 메이커" />
        <Checkbox value={1} label="책상" />
        {showMore && (
          <>
            <Checkbox value={5} label="공기 조절" />
            <Checkbox value={4} label="목욕가운" />
            <Checkbox value={3} label="케이블 TV" />
            <Checkbox value={2} label="커피 티 메이커" />
            <Checkbox value={1} label="책상" />
          </>
        )}
        {!showMore ? (
          <button
            className="text-[#2D40FF] text-[12px]"
            onClick={() => setShowMore((prev) => !prev)}
          >
            모두 표시 (29) +
          </button>
        ) : (
          <button
            className="text-[#2D40FF] text-[12px]"
            onClick={() => setShowMore((prev) => !prev)}
          >
            숨다 -
          </button>
        )}
      </div>
    </Accordion>
  );
};

const boardKeys = boardTypeKeys;

const _cpKeys = {
  NRF: "취소환불불가",
  RF: "무료취소"
};

const getZonesByJPCodes = (jpCodes) => {
  const signature = generateSignature();
  const headers = {};

  headers["x-api-key"] = import.meta.env.VITE_API_KEY;
  headers["x-api-secret"] = signature.key;
  headers["x-timestamp"] = signature.timestamp;

  return axios.get(
    "https://static-api.wafflestay.net/v1/zone-lists-by-params",
    {
      params: { jpd_codes: jpCodes },
      headers: {
        ...headers
      }
    }
  );
};

export function FilterHotels({
  setView,
  filters,
  priceRange,
  replacements,
  selectedBoardTypes,
  cancellationPolicy,
  availableZones,
  onChangeAvailableZones,
  onChangeCancellationPolicy,
  onChangeBoardTypes,
  onChangePriceRange,
  onChangeReplacement,
  toggleFilter,
  onCloseFilter
}) {
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [replacementOptions, setReplacementOptions] = useState();
  const [boardTypeOptions, setBoardTypeOptions] = useState();
  const [cancellationPolicOptions, setCancellationPolicyOptions] = useState();
  const [zones, setZones] = useState();
  const [zonesList, setZonesList] = useState([]);

  useEffect(() => {
    if (!zones) return;

    async function fetchZones() {
      getZonesByJPCodes(zones?.map((zone) => zone.key)).then((res) => {
        setZonesList(res?.data?.hits);
      });
    }

    fetchZones();
  }, [zones]);

  useEffect(() => {
    if (filters?.fixedMinPrice) setMinPrice(Number(filters?.fixedMinPrice));
    if (filters?.fixedMaxPrice) setMaxPrice(Number(filters?.fixedMaxPrice));
    if (filters?.hotelRatingCounts) {
      const _keys = Object.keys(filters?.hotelRatingCounts);

      setReplacementOptions(
        _keys
          .map((_key) => ({
            key: _key,
            count: filters?.hotelRatingCounts[_key]
          }))
          .sort((a, b) => Number(b.key) - Number(a.key))
      );
    }
    if (filters?.boardTypes) {
      setBoardTypeOptions(
        Object.keys(filters?.boardTypes)?.map((el, idx) => {
          const _values = Object.values(filters?.boardTypes);

          return {
            key: el,
            label: `${boardKeys[el] || el} (${_values?.[idx] || 0})`
          };
        })
      );
    }
    if (filters?.nonRefundableCount) {
      setCancellationPolicyOptions(
        Object.keys(filters?.nonRefundableCount)
          ?.map((el, idx) => {
            const _values = Object.values(filters?.nonRefundableCount);

            return {
              key: el,
              label: `${_cpKeys[el]} (${_values?.[idx] || 0})`
            };
          })
          ?.filter((el) => !!el)
      );
    }
    if (filters?.availableZone) {
      const arr = Object.keys(filters?.availableZone);
      const vals = Object.values(filters?.availableZone);

      setZones(
        arr.map((_key, idx) => ({
          key: _key,
          label: `${_key} - ${vals[idx]}`
        }))
      );
    }
  }, [filters]);

  return (
    <aside className="flex flex-col w-full gap-5 sm:gap-[30px] relative">
      <div className="sm:block hidden">
        <FilterByMap
          setView={setView}
          hotelTotalAmount={filters?.totalHotels}
        />
      </div>
      <button
        onClick={toggleFilter}
        className="sm:hidden flex absolute top-3 right-[-10px]"
      >
        <CloseIcon />
      </button>
      <p className="sm:hidden block text-sm font-medium text-center mt-[35px]">
        검색 조건
      </p>

      <div className="w-full border-0 border-b border-solid border-gray-100">
        <MultiRangeSlider
          label="총 예약 금액"
          valMin={priceRange?.[0] || minPrice}
          valMax={priceRange?.[1] || maxPrice}
          min={minPrice}
          max={maxPrice}
          onChange={(min, max) => onChangePriceRange(min, max)}
        />
      </div>

      {/* <div className="w-full pb-[30px] border-0 border-b border-solid border-gray-100">
        <FilterByClientRating />
      </div> */}

      {zones?.length > 0 && (
        <div className="w-full pb-[30px] border-0 border-b border-solid border-gray-100">
          <CheckboxFilters
            options={zones?.map((zone) => {
              const foundZone = zonesList?.find(
                (el) => el?.source?.JPDCode === zone?.key
              );

              return {
                ...zone,
                label: zone?.label?.replace(
                  foundZone?.source?.JPDCode,
                  foundZone?.source?.kr_name
                )
              };
            })}
            values={availableZones}
            onChange={onChangeAvailableZones}
            title="예약 가능 지역"
          />
        </div>
      )}

      <div className="w-full pb-[30px] border-0 border-b border-solid border-gray-100">
        <FilterByReplacement
          options={replacementOptions}
          values={replacements}
          onChange={onChangeReplacement}
        />
      </div>

      {boardTypeOptions?.length > 0 && (
        <div className="w-full pb-[30px] border-0 border-b border-solid border-gray-100">
          <CheckboxFilters
            options={boardTypeOptions}
            values={selectedBoardTypes}
            onChange={onChangeBoardTypes}
            title="객실 옵션"
          />
        </div>
      )}

      {cancellationPolicOptions?.length > 0 && (
        <div className="w-full pb-[30px] border-0 border-b border-solid border-gray-100">
          <CheckboxFilters
            options={cancellationPolicOptions}
            values={
              Array.isArray(cancellationPolicy)
                ? cancellationPolicy
                : [cancellationPolicy]
            }
            onChange={onChangeCancellationPolicy}
            title="취소환불조건"
          />
        </div>
      )}

      {/* 
      <div className="w-full pb-[30px] border-0 border-b border-solid border-gray-100">
        <FilterByService />
      </div> */}
    </aside>
  );
}
