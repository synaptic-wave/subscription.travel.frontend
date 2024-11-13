import BedIcon from "@/assets/icons/bed-black.svg?react";

import LocationIcon from "@/assets/icons/location.svg?react";
import PeopleIcon from "@/assets/icons/people.svg?react";

import MealIcon from "@/assets/icons/meal.svg?react";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import Slider from "react-slick";
import { useMemo } from "react";
import { handleErrorOnImageLoad } from "@/consts/img";

import { boardTypeKeys } from "@/consts/boards";

var settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  infinite: true,
  autoplaySpeed: 6000
};

export default function RoomCard({
  title,
  titleEn,
  img,
  location,
  personsAmount,
  roomAmount,
  price,
  checkIn,
  checkOut,
  roomType,
  images,
  hotelCode,
  meal
}) {
  const nightsAmount = useMemo(() => {
    return moment(checkOut).diff(checkIn, "day") || 1;
  }, [checkIn, checkOut]);

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between">
        <h5 className="text-[20px] leading-[28px] font-medium">
          호텔 예약 정보
        </h5>
        {/* <button className='flex'>
          <TrashIcon />
          <span>삭제</span>
        </button> */}
      </div>

      {images && images?.length > 1 && (
        <Slider {...settings}>
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              onError={handleErrorOnImageLoad}
              width="100%"
              className="h-[120px] object-cover rounded-[10px] mt-[26px]"
            />
          ))}
        </Slider>
      )}

      {images?.length === 0 && (
        <img
          src={import.meta.env.VITE_EMPTY_HOTEL_IMAGE_URL}
          width="100%"
          onError={handleErrorOnImageLoad}
          className="h-[120px] object-cover rounded-[10px] mt-[26px]"
        />
      )}

      {images?.length === 1 && (
        <img
          src={images[0]}
          width="100%"
          onError={handleErrorOnImageLoad}
          className="h-[120px] object-cover rounded-[10px] mt-[26px]"
        />
      )}

      <h4 className="mt-5 text-base font-medium"> {title}</h4>
      {titleEn && <h4 className="text-base font-medium">{titleEn}</h4>}

      <div className="flex items-center mt-[13px] gap-1">
        <LocationIcon className="min-w-[18px]" />
        <p className="truncate text-[13px] text-[#5C5F79]">{location}</p>
      </div>

      <div className="flex w-full items-center gap-5 mt-3">
        <p className="flex items-center gap-1 text-sm">
          <PeopleIcon />
          인원 {personsAmount}명
        </p>

        <p className="flex items-center gap-1 text-sm">
          <BedIcon
            style={{
              color: "black"
            }}
          />
          방 {roomAmount}개
        </p>

        <p className="flex items-center gap-1 text-sm">
          <MealIcon />
          {boardTypeKeys[meal] || meal}
        </p>
      </div>

      <div className="flex flex-col w-full mt-[32px] gap-4">
        <div className="flex justify-between gap-1">
          <span className="text-sm font-medium min-w-[30px] text-[#A3A5B8]">
            객실
          </span>
          <span className="text-[#161A3F] text-sm max-w-[200px]">
            {roomType}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-[#A3A5B8]">일정</span>
          <span className="text-[#161A3F] text-sm">
            {moment(checkIn).format("YYYY.MM.DD(ddd)")} ~{" "}
            {moment(checkOut).format("YYYY.MM.DD(ddd)")} (총 {nightsAmount}박)
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span />
          <div className="flex flex-col">
            <span className="text-[#161A3F] text-base text-right sm:text-xl font-bold">
              <NumericFormat
                displayType="text"
                value={price}
                thousandSeparator
              />{" "}
              원
            </span>
            <div
              className={`text-xs text-right flex items-center justify-end text-[#5b95eb] mt-1`}
            >
              1박당 평균금액
              <NumericFormat
                displayType="text"
                thousandSeparator
                prefix=" "
                decimalScale={0}
                value={Number(price) / (nightsAmount || 1)}
                suffix="원"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
