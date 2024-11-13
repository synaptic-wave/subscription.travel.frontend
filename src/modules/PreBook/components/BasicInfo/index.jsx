import { Button, Modal } from "@/components/index";
import CheckoutBox from "./components/CheckoutBox";
import RoomCard from "./components/RoomCard";
import BookInfo from "./components/BookInfo";
import useCalculateOccupancy from "@/hooks/useCalculateOccupancy";
import { useEffect, useMemo, useState } from "react";
import { getCancelationExpiredDate, getRoomName } from "@/utils/hotelFunctions";
import { NumericFormat } from "react-number-format";

export function BasicInfo({
  onNext,
  totalPrice,
  data,
  minutesUntilExpiration,
  onOpen,
  hotels,
  promocodePrice
}) {
  const [timeLeft, setTimeLeft] = useState(undefined);

  useEffect(() => {
    setTimeLeft(minutesUntilExpiration * 60);
  }, [minutesUntilExpiration]);

  useEffect(() => {
    if (timeLeft !== undefined && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
    if (timeLeft === 0) {
      onOpen();
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const _promocode = Number(promocodePrice) || 0;

  return (
    <>
      <div className="grid grid-cols-3 gap-[30px] mt-5">
        <div className="flex sm:col-span-2 col-span-3 flex-col gap-5">
          <div className="py-8 px-5 border border-solid border-gray-100 rounded-[10px]">
            <BookInfo hotelPaxes={data?.hotels} />
          </div>
          <div className="border border-gray-100 rounded-[10px]">
            {hotels.map((item, index) => (
              <RoomCard
                key={`${item.hotelCode}-${index}`}
                title={item.hotelOption.PriceInformation.HotelContent.HotelName}
                price={
                  item.hotelOption.PriceInformation.Prices?.Price
                    ?.TotalFixAmounts?.attributes?.Gross
                }
                roomPaxes={item.roomPaxes}
                checkIn={item?.checkIn}
                checkOut={item?.checkOut}
                hotel={item.hotelOption}
                hasBorderBottom={
                  hotels.length > 1 ? index !== hotels.length - 1 : false
                }
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:col-span-1 col-span-3 gap-5">
          <div className="py-[23px] px-5 rounded-[10px] border border-gray-100 flex items-center justify-between">
            <p className="text-sm font-medium">결제까지 남은시간</p>
            <p className="text-lg font-bold text-[#FF176B]">
              {timeLeft !== undefined &&
                !isNaN(timeLeft) &&
                formatTime(timeLeft)}
            </p>
          </div>
          <div className="py-8 px-5 border border-solid border-gray-100 rounded-[10px]">
            <CheckoutBox
              totalPrice={totalPrice}
              promocodePrice={promocodePrice}
            />
          </div>
          <Button onClick={onNext}>
            <NumericFormat
              value={totalPrice - (_promocode || 0) || 0}
              thousandSeparator
              displayType="text"
            />
            원 결제하기
          </Button>
        </div>
      </div>
    </>
  );
}
