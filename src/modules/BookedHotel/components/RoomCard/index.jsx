import TrashIcon from "@/assets/icons/trash.svg?react";
import LocationIcon from "@/assets/icons/location.svg?react";
import PeopleIcon from "@/assets/icons/people.svg?react";
import KinBedIcon from "@/assets/icons/king-bed.svg?react";
import MealIcon from "@/assets/icons/meal.svg?react";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import Slider from "react-slick";
import { handleErrorOnImageLoad } from "@/consts/img";

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
  img,
  location,
  persons,
  roomAmount,
  meal,
  price,
  checkIn,
  checkOut,
  name,
  images
}) {
  return (
    <div className="w-full flex flex-col">
      <h5 className="mb-[26px] text-[20px] font-medium">호텔 예약 정보</h5>

      {images && images?.length > 1 && (
        <Slider {...settings}>
          {images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              onError={handleErrorOnImageLoad}
              width="100%"
              className="h-[120px] object-cover rounded-[10px]"
            />
          ))}
        </Slider>
      )}

      {images?.length === 0 && (
        <img
          src={import.meta.env.VITE_EMPTY_HOTEL_IMAGE_URL}
          width="100%"
          onError={handleErrorOnImageLoad}
          className="h-[120px] object-cover rounded-[10px]"
        />
      )}

      {images?.length === 1 && (
        <img
          src={images[0]}
          onError={handleErrorOnImageLoad}
          width="100%"
          className="h-[120px] object-cover rounded-[10px]"
        />
      )}

      <h4 className="mt-5 text-[16px] font-medium">{title}</h4>

      <p className="flex gap-1 items-center mt-[13px] text-[#5C5F79]">
        <LocationIcon className="min-w-[18px]" /> {location}
      </p>

      <div className="flex w-full items-center gap-5 mt-3">
        <p className="flex items-center gap-1 text-[14px]">
          <PeopleIcon />
          인원 {persons}명
        </p>

        <p className="flex items-center gap-1 text-[14px]">
          <KinBedIcon />방 {roomAmount}개
        </p>

        {/* <p className='flex items-center gap-1 text-[14px]'>
          <MealIcon />
          조식불포함
        </p> */}
      </div>

      <div className="flex flex-col w-full mt-[32px] gap-4">
        <div className="flex justify-between">
          <span className="text-[14px] font-medium text-[#A3A5B8]">객실</span>
          <span className="text-[#161A3F] text-[14px]">{name}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[14px] font-medium text-[#A3A5B8]">일정</span>
          <span className="text-[#161A3F] text-[14px]">
            {moment(new Date(checkIn)).format("YYYY.MM.DD(ddd)")} ~{" "}
            {moment(new Date(checkOut)).format("YYYY.MM.DD(ddd)")}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-[14px] font-medium text-[#A3A5B8]">
            객실 가격(1박)
          </span>
          <span className="text-[#161A3F] text-[20px] font-bold">
            <NumericFormat displayType="text" value={price} thousandSeparator />{" "}
            원
          </span>
        </div>
      </div>
    </div>
  );
}
