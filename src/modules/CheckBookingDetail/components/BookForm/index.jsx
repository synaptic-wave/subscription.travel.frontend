import { Input } from "@/components/FHElements";
import { HFInput } from "@/components/index";
import { paymentType, paymentTypes } from "@/consts/index";
import classNames from "classnames";
import { useState } from "react";

export default function BookForm({
  control,
  selectedPaymentType,
  onChangePaymentType
}) {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-[20px] font-medium text-[#161A3F]">예약 정보</h2>

      <div className="flex flex-wrap w-full gap-5 mt-[26px]">
        <div className="w-[48%]">
          <span className="text-[13px] color-[#5C5F79]">성(영문사용)</span>
          <p className="text-sm text-[#161A3F] mt-2">Hong</p>
        </div>

        <div className="w-[48%]">
          <span className="text-[13px] color-[#5C5F79]">이름(영문사용)</span>
          <p className="text-sm text-[#161A3F] mt-2">Gildong</p>
        </div>

        <div className="w-[48%]">
          <span className="text-[13px] color-[#5C5F79]">핸드폰</span>
          <p className="text-sm text-[#161A3F] mt-2">010-1234-5678</p>
        </div>

        <div className="w-[48%]">
          <span className="text-[13px] color-[#5C5F79]">이메일</span>
          <p className="text-sm text-[#161A3F] mt-2">hong@swave.com</p>
        </div>

        <div className="w-[48%]">
          <span className="text-[13px] color-[#5C5F79]">예약상태</span>
          <p className="text-sm text-[#161A3F] mt-2">예약완료</p>
        </div>

        <div className="w-[48%]">
          <span className="text-[13px] color-[#5C5F79]">예약번호</span>
          <p className="text-sm text-[#161A3F] mt-2">456-78912</p>
        </div>
      </div>

      <div className="h-[1px] w-full bg-[#F3F3FB] my-7"></div>

      <div className="flex flex-col w-full">
        <h2 className="text-[20px] font-medium text-[#161A3F]">결제 정보</h2>

        <div className="flex mt-[26px] gap-[10px] w-full">
          <div className="w-[48%]">
            <span className="text-[13px] color-[#5C5F79]">결제구분</span>
            <p className="text-sm text-[#161A3F] mt-2">신용카드</p>
          </div>

          <div className="w-[48%]">
            <span className="text-[13px] color-[#5C5F79]">결제일시</span>
            <p className="text-sm text-[#161A3F] mt-2">
              2023년 12월 23일 16:13:54
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
