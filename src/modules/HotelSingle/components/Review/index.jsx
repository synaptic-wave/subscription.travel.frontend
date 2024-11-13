import { Checkbox } from "@/components/Checkbox";
import { Radio } from "@/components/index";
import AddIcon from "@/assets/icons/add.svg?react";
import { reviewFilterTypes } from "@/consts/review";
import { NumericFormat } from "react-number-format";
import HBIcon from "@/assets/icons/hb.svg?react";

export function Review({
  times,
  types,
  ratings,
  languages,
  filterByRating,
  filterByType,
  filterByTime,
  filterByLanguage,
  handleFilter,
  rating,
  commentsAmount,
  tripTypes,
  hotelStyles,
  subRatings
}) {
  return (
    <div
      id="review"
      className="sm:p-[30px] p-[12px] mt-[50px] border border-gray-100 border-solid rounded-[10px]"
    >
      <div className="flex items-center mt-[20px] gap-[6px] mb-8">
        <span className="sm:text-xl text-base font-medium text-[#161A3F] mr-2 sm:mr-4">
          리뷰
        </span>
        <HBIcon />
        <div className="flex items-center gap-[2px]">
          {Array.from(Array(Math.floor(rating || 5)).keys()).map((value) => (
            <div
              className="rounded-full sm:w-[16px] sm:h-[16px] w-[10px] h-[10px] bg-[#00AA6C] border border-[#00AA6C]"
              key={value}
            ></div>
          ))}
          {Array.from(Array(5 - Math.floor(rating || 5)).keys()).map(
            (value) => (
              <div
                className="rounded-full sm:w-[16px] sm:h-[16px] w-[10px] h-[10px] bg-[#fff] border border-gray-100"
                key={value}
              ></div>
            )
          )}
        </div>
        <p className="text-xs text-[#333333]">
          <NumericFormat
            value={commentsAmount}
            thousandSeparator
            displayType="text"
          />
        </p>
      </div>
      <div className="grid grid-cols-12 gap-[30px]">
        <div className="sm:col-span-6 col-span-12">
          <p className="text-[15px] mb-[20px] font-medium">총평</p>
          <div className="flex flex-col gap-[10px]">
            {subRatings?.map((rating, idx) => {
              const percent = (Number(rating.value) / 5) * 100;

              return (
                <div className="flex items-center gap-[12px]" key={idx}>
                  <div className="w-[80px] sm:w-[160px]">
                    <span className="text-xs sm:text-sm text-[#5C5F79] font-normal">
                      {rating.localized_name}
                    </span>
                  </div>
                  <div className="sm:w-full w-[65%] bg-[#F3F3FB] h-[14px] rounded-[2px] overflow-hidden relative">
                    <div
                      className="bg-[#00AA6C] h-full"
                      style={{
                        width: !percent ? "0" : `${percent}%`
                      }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600">({rating.value})</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="sm:col-span-3 col-span-12 sm:pl-10 sm:border-l sm:border-t-0 border-t pt-4 sm:pt-0  border-gray-100 border-solid">
          <p className="text-[15px] mb-[20px] font-medium">여행 유형</p>
          <div className="flex flex-col gap-[10px]">
            {tripTypes?.map((type, idx) => (
              <div
                className="flex sm:justify-normal justify-between w-full"
                key={idx}
              >
                <span className="w-[115px] text-xs sm:text-sm text-[#5C5F79] font-normal">
                  {type?.localized_name}
                </span>

                <span className="text-right w-[50px] text-xs sm:text-sm text-[#5C5F79] font-normal">
                  <NumericFormat
                    value={+type?.value}
                    suffix=" 건"
                    displayType="text"
                  />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="sm:col-span-3 col-span-12 sm:pl-10 sm:border-l sm:border-t-0 border-t pt-4 sm:pt-0  border-gray-100 border-solid">
          <p className="text-[15px] mb-[20px] font-medium">호텔 스타일</p>
          <div className="flex flex-col gap-[10px]">
            {hotelStyles?.map((type, idx) => (
              <div className="flex" key={idx}>
                <span className="w-[115px] text-xs sm:text-sm text-[#5C5F79] font-normal">
                  {type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="sm:col-span-2 col-span-12 sm:border-r sm:border-t-0 border-t pt-4 sm:pt-0 border-gray-100">
          <p className="text-[15px] mb-[20px]">기간</p>
          <div className="flex flex-col gap-[10px]">
            {times.map((time, idx) => (
              <Checkbox
                label={time.name}
                key={idx}
                isChecked={filterByTime.includes(time.name)}
                onChange={() => handleFilter(reviewFilterTypes.TIME, time.name)}
              />
            ))}
          </div>
        </div>
        <div className="sm:col-span-2 col-span-12 sm:border-r sm:border-t-0 border-t pt-4 sm:pt-0 border-gray-100">
          <p className="text-[15px] mb-[20px]">여행자 유형</p>
          <div className="flex flex-col gap-[10px]">
            {types.map((type, idx) => (
              <Checkbox
                label={type}
                key={idx}
                isChecked={filterByType.includes(type)}
                onChange={() => handleFilter(reviewFilterTypes.TYPE, type)}
              />
            ))}
          </div>
        </div>
        <div className="sm:col-span-2 col-span-12 pt-4 sm:pt-0 sm:border-t-0 border-t border-gray-100">
          <p className="text-[15px] mb-[20px]">언어</p>
          <div className="flex flex-col gap-[10px]">
            {languages.map((lang, idx) => (
              <Checkbox
                label={lang.name}
                key={idx}
                isChecked={filterByLanguage.includes(lang.key)}
                onChange={() =>
                  handleFilter(reviewFilterTypes.LANGUAGE, lang.key)
                }
              />
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
