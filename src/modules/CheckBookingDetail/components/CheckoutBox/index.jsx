import { Checkbox } from "@/components/Checkbox";
import { NumericFormat } from "react-number-format";
import ChevronIcon from "@/assets/icons/chevron-up.svg?react";
import { useEffect, useState } from "react";

export default function CheckoutBox({
  orderAmount,
  roomsPrice,
  totalPrice,
  checked,
  setChecked
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  useEffect(() => {
    setAgree1(checked);
    setAgree2(checked);
  }, [checked]);

  useEffect(() => {
    setChecked(agree1 && agree2);
  }, [agree1, agree2]);

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between items-center">
        <h5 className="text-[20px] font-medium text-[#161A3F]">결제 금액</h5>

        <p className="text-[14px] font-medium text-[#161A3F]">
          결제 총 {orderAmount}건
        </p>
      </div>

      <div className="flex flex-col w-full mt-[32px] gap-4">
        <div className="flex justify-between">
          <span className="text-[14px] font-medium text-[#A3A5B8]">
            총 상품 금액
          </span>
          <span className="text-[#161A3F] text-[20px] font-bold">
            <NumericFormat
              displayType="text"
              value={roomsPrice || 0}
              thousandSeparator
            />{" "}
            원
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-[14px] font-medium text-[#A3A5B8]">
            세금/수수료
          </span>
          <span className="text-[#161A3F] text-[20px] font-bold">
            <NumericFormat displayType="text" value={0} thousandSeparator /> 원
          </span>
        </div>
      </div>

      <div className="h-[1px] w-full bg-[#F3F3FB] my-7"></div>

      <div className="flex justify-between w-full">
        <span className="text-[14px] font-medium text-[#161A3F]">
          총 결제 금액
        </span>
        <span className="text-[#FF176B] text-[20px] font-bold">
          <NumericFormat
            displayType="text"
            value={totalPrice || 0}
            thousandSeparator
          />{" "}
          원
        </span>
      </div>
    </div>
  );
}
