import image1 from "@/assets/images/room.png";
import PersonIcon from "@/assets/icons/person-v2.svg?react";
import { Button } from "@/components/index";
import classNames from "classnames";
import moment from "moment";
import { getCancelationExpiredDate } from "@/utils/hotelFunctions";
import { PriceSection } from "@/components/PriceSection";
import useCalculateOccupancy from "@/hooks/useCalculateOccupancy";
import { defaultImg, handleErrorOnImageLoad } from "@/consts/img";

export function RoomCard({
  item,
  className = "",
  onNavigateToHotel,
  disabled
}) {
  const paxes = useCalculateOccupancy({
    hotelRooms: item.room.HotelRooms.HotelRoom,
    paxes: item.hotel.paxes
  });

  const cancelledDate = getCancelationExpiredDate(item?.room);

  return (
    <div className={className}>
      <div className="grid grid-cols-12 gap-[20px]">
        <div className="sm:col-span-3 col-span-12">
          <img
            src={
              item.hotel.images
                ? item.hotel.images[0] || defaultImg
                : item.hotel.img || defaultImg
            }
            onError={handleErrorOnImageLoad}
            className="h-[118px] sm:h-[178px] w-full object-cover rounded-[10px]"
          />
        </div>
        <div className="sm:col-span-9 col-span-12">
          <div className="flex sm:justify-between sm:flex-row flex-col">
            <div className="flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1 text-sm">
                    <PersonIcon />
                    인원 {paxes?.occupancy || 2}명
                  </div>
                  {/* <div className="flex items-center gap-1 text-sm">
                    <BedIcon />방 1개
                  </div> */}
                  {/* <div className="flex items-center gap-1 text-sm">
                    <MealIcon />
                    조식불포함
                  </div> */}
                </div>
                <div className="flex items-center sm:justify-normal justify-between mt-4 gap-5">
                  <p className="w-[52px] text-sm text-[#A3A5B8]">객실</p>
                  <p className="text-sm">{item.room.name}</p>
                </div>
                <div className="flex items-center sm:justify-normal justify-between mt-4 gap-5">
                  <p className="w-[52px] text-sm text-[#A3A5B8]">일정</p>
                  <p className="text-sm">
                    {moment(new Date(item.hotel.checkIn)).format("YYYY.MM.DD")}
                    (수) ~{" "}
                    {moment(new Date(item?.hotel?.checkOut)).format(
                      "YYYY.MM.DD"
                    )}
                    (목) (총{" "}
                    {moment(item?.hotel?.checkOut).diff(
                      item.hotel.checkIn,
                      "day"
                    )}{" "}
                    박)
                  </p>
                </div>
              </div>

              <RoomInfo
                className="sm:hidden flex justify-between items-end"
                item={item}
                paxes={paxes}
                cancellationDate={cancelledDate}
                onNavigateToHotel={onNavigateToHotel}
                disabled={disabled}
              />
            </div>
            <RoomInfo
              className="sm:flex hidden flex-col items-end"
              item={item}
              paxes={paxes}
              cancellationDate={cancelledDate}
              onNavigateToHotel={onNavigateToHotel}
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const RoomInfo = ({
  item,
  className,
  paxes,
  onNavigateToHotel,
  cancellationDate,
  disabled
}) => {
  return (
    <div className={className}>
      <div className="flex justify-between items-start sm:items-end flex-col">
        <PriceSection
          price={item.room.Prices.Price.TotalFixAmounts.attributes.Gross}
          paxes={paxes?.adults}
          checkIn={item?.hotel?.checkIn}
          checkOut={item?.hotel?.checkOut}
          responsiveTextAlign="left"
        />
        {/* <p className="text-2xl font-bold">
          <NumericFormat
            value={Number(
              item.room.Prices.Price.TotalFixAmounts.attributes.Gross
            )}
            displayType="text"
            thousandSeparator
          />

          <span className="text-[16px] font-[400]">원</span>
        </p>
        <p className="text-xs text-[#5C5F79] mt-1">
          1박 최저가, 성인 {paxes.adults}명 기준
        </p> */}
        <p className="text-xs text-[#087671] mt-1">세금 및 기타 요금 포함</p>
        <p
          className={classNames(
            "text-xs mt-[14px]",
            cancellationDate ? "text-[#06F]" : "text-[#FF176B]"
          )}
        >
          {cancellationDate
            ? moment(cancellationDate).format("YYYY년 MM월 DD일까지 취소 가능")
            : "취소 불가"}
        </p>
      </div>

      <Button
        disabled={disabled}
        className="sm:mt-[30px]"
        onClick={() => onNavigateToHotel(item)}
      >
        상세보기
      </Button>
    </div>
  );
};
