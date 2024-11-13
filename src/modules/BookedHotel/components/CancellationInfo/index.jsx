import CheckIcon from "@/assets/icons/check.svg?react";

import moment from "moment";
import { NumericFormat } from "react-number-format";
import PeopleIcon from "@/assets/icons/people.svg?react";
import KinBedIcon from "@/assets/icons/king-bed.svg?react";
import { getRoomNameFromResponse } from "@/utils/hotelFunctions";
import { useMemo } from "react";
import { Button } from "@/components/index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function CancellationInfo({ data }) {
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const roomName = useMemo(() => {
    if (!data) return "";
    if (!data.items) return "";
    return getRoomNameFromResponse(data?.items[0]?.hotelRooms);
  }, [data]);

  const personsAmount = useMemo(() => {
    if (data) return data?.paxes?.length - 1;
    return "";
  }, [data]);

  const promocodePrice = data?.promoCodeValue;

  return (
    <div className="py-5 px-4 sm:px-0 sm:py-[50px]">
      <div className="sm:w-[500px] flex items-center flex-col mx-auto">
        <CheckIcon />
        <p className="text-xl sm:text-2xl font-medium mt-[10px]">
          예약이 취소되었습니다
        </p>
        <div className="border border-gray-100 py-[40px] px-[30px] mt-[30px] rounded-[10px] w-full">
          {data?.items && (
            <p className="tex-base font-medium">
              {data.items[0]?.hotelInfo?.name}
            </p>
          )}
          <div className="flex items-center gap-5 mt-[10px]">
            <div className="flex items-center gap-1 text-sm">
              <PeopleIcon />
              인원 {personsAmount}명
            </div>

            <div className="flex items-center gap-1 text-sm">
              <KinBedIcon />방{" "}
              {data?.items
                ? data.items[0]?.hotelRooms?.length
                : data?.paxes?.roomPaxes?.length}
              개
            </div>

            {/* <div className='flex items-center gap-1 text-sm'>
              <MealIcon />
              조식불포함
            </div> */}
          </div>
          <div className="flex flex-col gap-4 mt-[40px]">
            {roomName && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#A3A5B8] font-medium">객실</p>
                <p className="text-sm">{roomName}</p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#A3A5B8] font-medium">일정</p>
              <p className="text-sm">
                {moment(new Date(data?.items[0]?.attributes?.start)).format(
                  "YYYY.MM.DD (ddd)"
                )}{" "}
                ~{" "}
                {moment(new Date(data?.items[0]?.attributes?.end)).format(
                  "YYYY.MM.DD (ddd)"
                )}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-[#A3A5B8] font-medium">예약번호</p>
              <p className="text-sm">{data?.attributes?.locator}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-[#A3A5B8] font-medium">결제구분</p>
              <p className="text-sm">
                {data?.payment?.paymentMethod === "CARD"
                  ? "신용카드"
                  : "컬쳐캐쉬"}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-[#A3A5B8] font-medium">결제일시</p>
              <p className="text-sm">
                {moment(new Date(data?.createdAt)).format(
                  "YYYY년 MM월 DD일 HH:mm:ss "
                )}
              </p>
            </div>

            {promocodePrice > 0 && (
              <div className="flex justify-between">
                <span className="text-[14px] font-medium text-[#A3A5B8]">
                  총 상품 가격
                </span>

                <span className="text-[#161A3F] text-base sm:text-xl font-bold">
                  <NumericFormat
                    displayType="text"
                    value={data?.payment?.amount}
                    thousandSeparator
                  />{" "}
                  <span className="text-sm font-normal">원</span>
                </span>
              </div>
            )}

            {promocodePrice > 0 && (
              <div className="flex justify-between">
                <span className="text-[14px] font-medium text-[#A3A5B8]">
                  할인 쿠폰 금액
                </span>

                <span className="text-[#161A3F] text-base sm:text-xl font-bold">
                  <NumericFormat
                    displayType="text"
                    value={promocodePrice}
                    prefix="-"
                    allowNegative
                    thousandSeparator
                  />{" "}
                  <span className="text-sm font-normal">원</span>
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <p className="text-sm text-[#A3A5B8] font-medium">결제금액</p>
              <p className="text-xl font-bold text-[#FF3838]">
                <NumericFormat
                  displayType="text"
                  value={Number(data?.payment?.amount) - (promocodePrice || 0)}
                  thousandSeparator
                />{" "}
                <span className="text-sm font-normal">원</span>
              </p>
            </div>
          </div>
        </div>
        {!isAuth && (
          <div className="flex justify-center">
            <Button
              onClick={() => navigate("/")}
              className="w-full sm:w-[300px] mt-[30px]"
            >
              홈으로 가기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
