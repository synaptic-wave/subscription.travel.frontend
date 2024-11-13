import { Checkbox } from "@/components/Checkbox";
import { NumericFormat } from "react-number-format";
import ChevronIcon from "@/assets/icons/chevron-up.svg?react";
import { useEffect, useState } from "react";
import { TermsAndConditionsDialog } from "@/components/Footer/TermsAndConditionsDialog";

export default function CheckoutBox({
  orderAmount,
  checked,
  setChecked,
  totalAmountHotel,
  promocodePrice
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [openTerms, setOpenTerms] = useState();

  const onClose = () => {
    setOpenTerms(null);
  };

  const onOpen = (value) => {
    setOpenTerms(value);
  };
  useEffect(() => {
    setAgree1(checked);
    setAgree2(checked);
  }, [checked]);

  useEffect(() => {
    setChecked(agree1 && agree2);
  }, [agree1, agree2]);

  const _promocode = Number(promocodePrice);

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between items-center">
        <h5 className="text-base sm:text-[20px] font-medium text-[#161A3F]">
          결제 금액
        </h5>

        <p className="text-[14px] font-medium text-[#161A3F]">
          결제 총 {orderAmount}건
        </p>
      </div>

      <div className="flex flex-col w-full mt-[32px] gap-4">
        <div className="flex justify-between">
          <span className="text-[14px] font-medium text-[#A3A5B8]">
            총 상품 금액
          </span>
          <span className="text-[#161A3F] text-base sm:text-[20px] font-bold">
            <NumericFormat
              displayType="text"
              value={totalAmountHotel || 0}
              thousandSeparator
            />{" "}
            원
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-[14px] font-medium text-[#A3A5B8]">
            세금/수수료
          </span>
          <span className="text-[#161A3F] text-base sm:text-[20px] font-bold">
            <NumericFormat displayType="text" value={0} thousandSeparator /> 원
          </span>
        </div>

        {promocodePrice > 0 && (
          <div className="flex justify-between">
            <span className="text-[14px] font-medium text-[#A3A5B8]">
              할인 쿠폰 금액
            </span>
            <span className="text-[#161A3F] text-base sm:text-[20px] font-bold">
              <NumericFormat
                displayType="text"
                prefix="-"
                allowNegative
                value={_promocode}
                thousandSeparator
              />{" "}
              원
            </span>
          </div>
        )}
      </div>

      <div className="h-[1px] w-full bg-[#F3F3FB] my-7"></div>

      <div className="flex justify-between w-full">
        <span className="text-[14px] font-medium text-[#161A3F]">
          총 결제 금액
        </span>
        <span className="text-[#FF176B] text-lg sm:text-[20px] font-bold">
          <NumericFormat
            displayType="text"
            value={totalAmountHotel - (_promocode || 0) || 0}
            thousandSeparator
          />{" "}
          원
        </span>
      </div>

      <div className="flex w-full flex-col mt-[22px]">
        <div className="w-full rounded-[10px] bg-[#F2F6FF] px-[18px] py-[14px] flex justify-between">
          <Checkbox
            label="약관에 모두 동의합니다."
            labelClassname="text-[14px] text-[#161A3F] font-normal"
            isChecked={checked}
            onChange={setChecked}
          />

          <button type="button" onClick={() => setIsExpanded((prev) => !prev)}>
            <ChevronIcon
              style={{
                transform: !isExpanded && "rotateZ(180deg)"
              }}
            />
          </button>
        </div>

        {isExpanded && (
          <div className="flex flex-col px-[18px] py-[14px] gap-[14px]">
            <div className="flex items-center">
              <Checkbox isChecked={agree1} onChange={(val) => setAgree1(val)} />
              <p
                onClick={() => onOpen("service")}
                className="text-[13px] leading-[19px] underline cursor-pointer"
              >
                서비스 이용약관 (필수)
              </p>
            </div>
            <div className="flex items-center">
              <Checkbox isChecked={agree2} onChange={(val) => setAgree2(val)} />
              <p
                onClick={() => onOpen("privacy")}
                className="text-[13px] leading-[19px] underline cursor-pointer"
              >
                개인정보 보호 정책 (필수)
              </p>
            </div>
          </div>
        )}
      </div>
      <TermsAndConditionsDialog
        src={openTerms}
        isOpen={!!openTerms}
        onClose={onClose}
      />
    </div>
  );
}
