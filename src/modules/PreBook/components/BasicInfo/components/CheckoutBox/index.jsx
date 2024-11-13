import { NumericFormat } from "react-number-format";

export default function CheckoutBox({ totalPrice, promocodePrice }) {
  const _promocode = Number(promocodePrice) || 0;

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between items-center">
        <h5 className="text-[20px] font-medium text-[#161A3F]">결제 금액</h5>

        <p className="text-[14px] font-medium text-[#161A3F]">결제 총 1건</p>
      </div>

      <div className="flex flex-col w-full mt-[32px] gap-4">
        <div className="flex justify-between">
          <span className="text-[14px] font-medium text-[#A3A5B8]">
            총 상품 가격
          </span>
          <span className="text-[#161A3F] text-[20px] font-bold">
            <NumericFormat
              displayType="text"
              value={totalPrice}
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

        {promocodePrice > 0 && (
          <div className="flex justify-between">
            <span className="text-[14px] font-medium text-[#A3A5B8]">
              할인 쿠폰 금액
            </span>
            <span className="text-[#161A3F] text-base sm:text-[20px] font-bold">
              <NumericFormat
                displayType="text"
                value={_promocode}
                prefix="-"
                allowNegative
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
        <span className="text-[#FF176B] text-[20px] font-bold">
          <NumericFormat
            displayType="text"
            value={totalPrice - (_promocode || 0) || 0}
            thousandSeparator
          />{" "}
          원
        </span>
      </div>
    </div>
  );
}
