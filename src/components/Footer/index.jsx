import PhoneIcon from "@/assets/icons/phone.svg?react";
import OriginalIcon from "@/assets/icons/original.svg?react";
import { useState } from "react";
import { TermsAndConditionsDialog } from "./TermsAndConditionsDialog";

export function Footer() {
  const [open, setOpen] = useState();

  const onClose = () => {
    setOpen(null);
  };
  const onOpen = (value) => {
    setOpen(value);
  };

  return (
    <footer className="container mx-auto py-[60px] flex flex-col px-4">
      <div className="flex items-start sm:items-center flex-wrap flex-col sm:flex-row">
        <p className="flex items-center font-semibold sm:text-2xl text-xl text-[#161A3F] gap-2">
          <PhoneIcon /> 1533-7901
        </p>
        <div className="flex items-center">
          <span className="sm:inline hidden text-sm font-medium text-[#E5E6EE]">
            ㅣ
          </span>
          <span className="sm:text-sm font-medium text-xs text-[#161A3F]">
            고객센터
          </span>
          <span className="text-sm font-medium text-[#E5E6EE]"> ㅣ</span>
          <span className="sm:text-sm font-medium text-xs text-[#161A3F]">
            상담시간(평일)10:00~18:00
          </span>
        </div>
      </div>
      <p className="text-[#5B5D75] text-xs sm:text-[13px] mt-3 hidden sm:block">
        문의메일 : <a href="mailto:wafl@wafflestay.kr">wafl@wafflestay.kr</a>
      </p>
      <p className="sm:text-sm text-xs text-[#ff3838] mt-[10px] sm:mt-1 leading-4">
        컬쳐랜드 트래블은 (주)한국문화진흥의 여행상품 제휴사인
        (주)시냅틱웨이브의 책임하에 운영되고 있으며, (주)시냅틱웨이브의 약관을
        따릅니다.
      </p>
      <div className="flex items-center mt-[7px] sm:mt-[30px] flex-wrap">
        <button
          // to='https://admin.wafflestay.kr/term/service'
          // target='_blank'
          className="text-[#2D40FF] sm:text-[13px] text-xs leading-7"
          onClick={() => onOpen("service")}
        >
          이용약관
        </button>
        <span className="text-[14px] text-[#E5E6EE]"> ㅣ</span>
        <button
          // to='https://event.wafflestay.kr/policy/privacy'
          // target='_blank'
          className="text-[#2D40FF] sm:text-[13px] text-xs leading-7"
          onClick={() => onOpen("privacy")}
        >
          개인정보 보호정책
        </button>
        {/* <span className="text-[14px] text-[#E5E6EE] sm:block hidden"> ㅣ</span>
        <button
          // to='https://event.wafflestay.kr/policy/location'
          // target='_blank'
          className="text-[#2D40FF] sm:text-[13px] text-xs sm:block hidden leading-7"
          onClick={() => onOpen("location")}
        >
          위치정보 이용약관
        </button> */}
      </div>
      <div className="sm:flex block items-start mt-[5px] sm:mt-[10px] sm:max-w-[80%] w-full flex-wrap">
        <div className="flex">
          <p className="text-[#5B5D75] text-xs sm:text-[13px]">
            (주)시냅틱웨이브
          </p>
          <span className="text-[14px] text-[#E5E6EE]"> ㅣ</span>
          <p className="text-[#5B5D75] text-xs sm:text-[13px]">대표 김세일</p>
          <span className="text-[14px] text-[#E5E6EE]"> ㅣ</span>
        </div>

        <div className="flex">
          <p className="text-[#5B5D75] text-xs sm:text-[13px]">
            사업자등록번호 : 422-86-01896
          </p>
          <span className="text-[14px] text-[#E5E6EE]"> ㅣ</span>
        </div>

        <div className="flex">
          <p className="text-[#5B5D75] text-xs sm:text-[13px]">
            통신판매신고번호: 제2022-안양동안-0425호
          </p>
          <span className="text-[14px] text-[#E5E6EE]"> ㅣ</span>
        </div>

        <div className="flex">
          <p className="text-[#5B5D75] text-xs sm:text-[13px] leading-4">
            종합여행업 등록번호: 제 2022-000001 호
          </p>
          <span className="text-[14px] text-[#E5E6EE]"> ㅣ</span>
        </div>

        <div className="flex">
          <p className="text-[#5B5D75] text-xs sm:text-[13px]  leading-4">
            문의메일 :{" "}
            <a href="mailto:wafl@wafflestay.kr">wafl@wafflestay.kr</a>
          </p>
          <span className="text-[14px] text-[#E5E6EE]"> ㅣ</span>
        </div>

        <p className="text-[#5B5D75] text-xs sm:text-[13px] leading-4">
          경기도 안양시 동안구 엘에스로 116번길 118, 안양2차 SK V1 센터 1030호
        </p>
      </div>
      <div className="flex gap-[6px] mt-3 items-center">
        <span className="sm:scale-1 scale-[0.7]">
          <OriginalIcon />{" "}
        </span>

        <p className="sm:text-[13px] text-xs">
          Copyright ©2024. Wafflestay Inc. All rights reserved.
        </p>
      </div>
      <TermsAndConditionsDialog src={open} isOpen={!!open} onClose={onClose} />
    </footer>
  );
}
