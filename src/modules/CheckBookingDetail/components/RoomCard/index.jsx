import TrashIcon from "@/assets/icons/trash.svg?react";
import LocationIcon from "@/assets/icons/location.svg?react";
import PeopleIcon from "@/assets/icons/people.svg?react";
import KinBedIcon from "@/assets/icons/king-bed.svg?react";
import MealIcon from "@/assets/icons/meal.svg?react";
import { NumericFormat } from "react-number-format";
import { handleErrorOnImageLoad } from "@/consts/img";

export default function RoomCard({
  title,
  img,
  location,
  persons,
  beds,
  meal,
  price,
  checkIn,
  checkOut
}) {
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between">
        <h5>호텔 예약 정보</h5>
        <button className="flex">
          <TrashIcon />
          <span>삭제</span>
        </button>
      </div>

      <img
        src={img}
        onError={handleErrorOnImageLoad}
        width="100%"
        className="h-[120px] object-cover rounded-[10px] mt-[26px]"
      />

      <h4 className="mt-5 text-[16px] font-medium">{title}</h4>

      <p className="flex items-center mt-[13px] gap-1 text-[#5C5F79]">
        <LocationIcon className="min-w-[18px]" /> {location}
      </p>

      <div className="flex w-full items-center gap-5 mt-3">
        <p className="flex items-center gap-1 text-[14px]">
          <PeopleIcon />
          인원 {persons}명
        </p>

        <p className="flex items-center gap-1 text-[14px]">
          <KinBedIcon />방 {beds}개
        </p>

        <p className="flex items-center gap-1 text-[14px]">
          <MealIcon />
          {meal}
        </p>
      </div>

      <div className="flex flex-col w-full mt-[32px] gap-4">
        <div className="flex justify-between">
          <span className="text-[14px] font-medium text-[#A3A5B8]">객실</span>
          <span className="text-[#161A3F] text-[14px]">
            스탠다드 싱글룸, 킹사이즈침대
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-[14px] font-medium text-[#A3A5B8]">일정</span>
          <span className="text-[#161A3F] text-[14px]">
            {checkIn}(수) ~ {checkOut}(목)
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
