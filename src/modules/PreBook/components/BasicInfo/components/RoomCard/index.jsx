import image1 from "@/assets/images/room.png";
import PersonIcon from "@/assets/icons/person-v2.svg?react";
import BedIcon from "@/assets/icons/bed-v2.svg?react";
import { Button } from "@/components/index";
import classNames from "classnames";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import { useMemo } from "react";
import useCalculateOccupancy from "@/hooks/useCalculateOccupancy";
import { getCancelationExpiredDate, getRoomName } from "@/utils/hotelFunctions";
import { handleErrorOnImageLoad } from "@/consts/img";
import { SuspectHotelName } from "@/components/SuspectHotelName";

export default function RoomCard({
  hasBorderBottom,
  title,
  checkIn,
  checkOut,
  price,
  hotel,
  roomPaxes
}) {
  const { occupancy: persons, roomAmount } = useCalculateOccupancy({
    hotelRooms: hotel?.PriceInformation?.HotelRooms?.HotelRoom,
    paxes: roomPaxes
  });

  const images = hotel?.PriceInformation?.HotelContent?.Images?.Image
    ? Array.isArray(hotel?.PriceInformation?.HotelContent?.Images?.Image)
      ? hotel?.PriceInformation?.HotelContent?.Images?.Image
      : [hotel?.PriceInformation?.HotelContent?.Images?.Image]
    : [];

  const cancellationDate = useMemo(
    () => getCancelationExpiredDate(hotel),
    [hotel]
  );

  const name = useMemo(() => {
    const { roomName: name } = getRoomName(
      hotel?.PriceInformation?.HotelRooms?.HotelRoom
    );
    return name;
  }, [hotel?.PriceInformation?.HotelRooms?.HotelRoom]);

  return (
    <div
      className={classNames(
        "py-[31px] px-[20px]",
        hasBorderBottom && "border-b border-gray-100"
      )}
    >
      <p className="text-base mb-[20px] sm:mb-[28px] font-medium">
        <SuspectHotelName
          jpCode={hotel?.PriceInformation?.HotelContent?.attributes.Code}
          defaultName={title}
        />
      </p>
      <div className="grid grid-cols-12 gap-[20px]">
        <div className="sm:col-span-3 col-span-12">
          <img
            src={
              images.length > 0
                ? images[0]?.FileName
                : import.meta.env.VITE_EMPTY_HOTEL_IMAGE_URL
            }
            onError={handleErrorOnImageLoad}
            className="h-[178px] w-full object-cover rounded-[10px]"
          />
        </div>
        <div className="sm:col-span-9 col-span-12">
          <div className="flex justify-between sm:flex-row flex-col">
            <div>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1 text-sm">
                  <PersonIcon />
                  인원 {persons}명
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <BedIcon />방 {roomAmount}개
                </div>
              </div>
              <div className="flex items-center sm:justify-normal justify-between mt-4 gap-5">
                <p className="w-[52px] text-sm text-[#A3A5B8]">객실</p>
                <p className="text-sm">{name}</p>
              </div>
              <div className="flex items-center sm:justify-normal justify-between mt-4 gap-5">
                <p className="w-[52px] text-sm text-[#A3A5B8]">일정</p>
                <p className="text-sm">
                  {moment(new Date(checkIn)).format("YYYY.MM.DD(ddd)")} ~{" "}
                  {moment(new Date(checkOut)).format("YYYY.MM.DD(ddd)")}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:items-end items-start sm:mt-0 mt-4">
              <p className="text-2xl font-bold">
                <NumericFormat
                  value={price}
                  thousandSeparator
                  displayType="text"
                />{" "}
                <span className="text-[16px] font-[400]">원</span>
              </p>
              <p className="text-xs text-[#5C5F79] mt-1">
                1박 최저가, 성인 {persons}명 기준
              </p>
              {/* <p className='text-xs text-[#087671] mt-1'>
                세금 및 기타 요금 포함
              </p> */}
              <p
                className={classNames("text-xs text-[#06F] mt-[14px]", {
                  ["text-[#FF3838]"]: !cancellationDate
                })}
              >
                {cancellationDate
                  ? moment(cancellationDate).format(
                      "YYYY년 MM월 DD일까지 취소 가능"
                    )
                  : "취소 불가"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
