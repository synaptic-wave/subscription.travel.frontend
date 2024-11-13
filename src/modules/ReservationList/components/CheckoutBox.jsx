import { Button } from "@/components/index";
import classNames from "classnames";
import moment from "moment";
import { useMemo } from "react";
import { NumericFormat } from "react-number-format";

export function CheckoutBox({
  totalAmount,
  totalPayment,
  data,
  onOpenCancel,
  cancellationExpiredDate
}) {
  const hotelIsUsed =
    moment().format("YYYY-MM-DD") === data?.items?.[0]?.attributes?.end ||
    moment().isAfter(data?.items?.[0]?.attributes?.end);

  return (
    <div className="flex flex-col gap-4">
      <div className="border border-gray-100 border-solid rounded-[10px] py-[25px] px-[20px]">
        <div className="flex items-center justify-between mb-[20px]">
          <p className="text-base sm:text-xl font-medium">결제 금액</p>
          <p className="text-sm">결제 총 {totalPayment}건</p>
        </div>
        <div className="flex items-center justify-between mb-[17px]">
          <p className="text-sm font-medium text-[#A3A5B8]">총 상품 가격</p>
          <p className="text-base font-bold">
            <NumericFormat
              value={totalAmount}
              thousandSeparator
              displayType="text"
            />{" "}
            <span className="text-sm font-normal">원</span>
          </p>
        </div>
        <div className="flex items-center justify-between pb-[22px] border-b border-gray-100">
          <p className="text-sm font-medium text-[#A3A5B8]">세금/수수료</p>
          <p className="text-base font-bold">
            0 <span className="text-sm font-normal">원</span>
          </p>
        </div>
        <div className="flex items-center justify-between mt-[20px]">
          <p className="text-sm font-medium">세금/총 결제 금액</p>
          <p className="text-lg sm:text-xl font-bold text-[#FF176B]">
            <NumericFormat
              value={totalAmount}
              thousandSeparator
              displayType="text"
            />{" "}
            <span className="text-sm font-normal">원</span>
          </p>
        </div>
      </div>

      {hotelIsUsed && data?.status !== "CANCELLED" && (
        <div className="flex w-full flex-col gap-[10px]">
          <p className="text-[#2D40FF] text-lg py-2 border-t-2 text-center font-medium border-b-2 border-[#2D40FF]">
            이용 완료
          </p>
          <p className="text-[13px] text-[#A3A5B8] text-center">
            과거 이용하신 호텔입니다.
          </p>
        </div>
      )}

      {data?.status === "CANCELLED" && (
        <div className="flex w-full flex-col gap-[10px]">
          <p className="text-[#FF176B] text-lg py-2 border-t-2 text-center font-medium border-b-2 border-[#FF176B]">
            취소 완료
          </p>
          <p className="text-[13px] text-[#A3A5B8] text-center">
            취소된 호텔입니다.
          </p>
        </div>
      )}

      {data?.status !== "CANCELLED" && !hotelIsUsed && (
        <div className="flex w-full flex-col">
          <Button onClick={onOpenCancel} disabled={!cancellationExpiredDate}>
            {cancellationExpiredDate ? "예약 취소" : "취소 불가"}
          </Button>
          <p
            className={classNames(
              "text-center font-medium text-[13px] mt-2",
              cancellationExpiredDate ? "text-primary-600" : "text-[#A3A5B8]"
            )}
          >
            {cancellationExpiredDate
              ? moment(new Date(cancellationExpiredDate)).format(
                  "YYYY년 MM월 DD일까지 취소 가능"
                )
              : "취소 불가능합니다."}
          </p>
        </div>
      )}
    </div>
  );
}
