import { useState } from "react";

import tripIcon from "@/assets/icons/trip.svg";
import personIcon from "@/assets/icons/person-rounded.svg";
import untickRounded from "@/assets/icons/untick-rounded.svg";
import tickRounded from "@/assets/icons/tick-rounded.svg";
import tickIcon from "@/assets/icons/tick.svg";
import untickIcon from "@/assets/icons/untick.svg";
import { Button, Input, Modal } from "@/components/index";
import { Link } from "react-router-dom";

export const Agreement = ({ handleSubmit }) => {
  const [agreedToAll, setAgreedToAll] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onSubmit = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <div className="w-full flex items-center mt-[110px] gap-4 flex-col min-h-[60vh]">
        <p>Kakao</p>

        <div className="w-full flex flex-col max-w-[680px] border border-[#EAEAF4] px-[70px] py-[53px]">
          <div className="flex gap-[10px]">
            <img src={tripIcon} width={42} height={42} />

            <div className="flex flex-col">
              <h2 className="text-[#374248] text-[22px] font-medium">
                핸디트립
              </h2>
              <p className="text-base font-light">핸디트립</p>
            </div>
          </div>

          <div className="border-t border-[#EAEAF4] mt-6 py-4 flex gap-1 items-start">
            <button
              onClick={() => setAgreedToAll((prev) => !prev)}
              className="mt-1"
            >
              {!agreedToAll ? (
                <img src={untickRounded} width={24} height={24} />
              ) : (
                <img src={tickRounded} width={24} height={24} />
              )}
            </button>

            <div className="flex flex-col gap-3">
              <h3 className="text-[18px] font-medium">전체 동의하기</h3>
              <p className="text-[13px] font-normal">
                전체동의는 선택목적에 대한 동의를 포함하고 있으며, 선택목적에
                대한 동의를 거부해도 서비스 이용이 가능합니다.
              </p>
            </div>
          </div>

          <div className="border-t border-[#EAEAF4] py-4 flex gap-1 items-start">
            <div className="opacity-0 min-w-6 min-h-6">
              <img src={untickRounded} width={24} height={24} />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[10px]">
                  <img src={personIcon} />
                  <h3 className="text-[15px] font-medium">abc@naver.com</h3>
                </div>

                <button className="text-[#A3A5B8] text-[15px] underline">
                  계정 변경
                </button>
              </div>
              <p className="text-[13px] font-normal">
                핸디트립 구독서비스 제공을 위해 회원번호와 함께 개인정보가
                제공됩니다. 보다 자세한 개인정보 제공항목은 동의 내용에서
                확인하실 수 있습니다. 해당 정보는 동의 철회나 서비스 탈퇴 시
                또는 제공 목적 달성 시 지체없이 파기됩니다.
              </p>
            </div>
          </div>

          <div className="border-t border-[#EAEAF4] py-4 flex gap-1 items-start">
            <button className="mt-1">
              {!agreedToAll ? (
                <img src={untickIcon} width={24} height={24} />
              ) : (
                <img src={tickIcon} width={24} height={24} />
              )}
            </button>

            <div className="flex flex-col gap-3 w-full">
              <div className="flex justify-between w-full">
                <h3 className="text-[18px] font-medium">
                  [필수] 카카오 개인정보 제3자 제공 동의
                </h3>

                <Link
                  to="/terms/third-parties-personal-information"
                  target="_blank"
                >
                  <button className="text-[#A3A5B8] text-[15px] underline">
                    보기
                  </button>
                </Link>
              </div>

              <p className="text-[13px] font-normal">
                카카오계정(이메일), 휴대전화 번호, 성별, CI(연계정보), 출생연도,
                이름
              </p>

              <div className="flex justify-between w-full mt-2">
                <h3 className="text-[18px] font-medium">
                  [선택] 카카오 개인정보 제3자 제공 동의
                </h3>

                <Link
                  to="/terms/third-parties-personal-information-optional"
                  target="_blank"
                >
                  <button className="text-[#A3A5B8] text-[15px] underline">
                    보기
                  </button>
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <button className="flex items-center gap-2">
                  {!agreedToAll ? (
                    <img src={untickIcon} width={24} height={24} />
                  ) : (
                    <img src={tickIcon} width={24} height={24} />
                  )}
                  <span className="text-[#374248] text-[13px] font-normal">
                    닉네임
                  </span>
                </button>

                <button className="flex items-center gap-2">
                  {!agreedToAll ? (
                    <img src={untickIcon} width={24} height={24} />
                  ) : (
                    <img src={tickIcon} width={24} height={24} />
                  )}
                  <span className="text-[#374248] text-[13px] font-normal">
                    프로필 사진
                  </span>
                </button>

                <button className="flex items-center gap-2">
                  {!agreedToAll ? (
                    <img src={untickIcon} width={24} height={24} />
                  ) : (
                    <img src={tickIcon} width={24} height={24} />
                  )}
                  <span className="text-[#374248] text-[13px] font-normal">
                    프로필 사진
                  </span>
                </button>
              </div>
            </div>
          </div>

          <Button
            className="mt-[100px] bg-[#FAE100] text-[#371C1D] disabled:bg-[#EAEAF4]"
            disabled={!agreedToAll}
            onClick={onSubmit}
          >
            동의하고 계속하기
          </Button>
        </div>
      </div>
      <p className="mt-10 mx-auto text-center mb-[200px]">
        Copyright<strong>© Kakao Corp.</strong>All rights reserved.
      </p>

      <Modal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title="기존 계정 안내"
      >
        <div className="border-t border-[#EAEAF4] py-4 flex flex-col">
          <h3 className="text-[#5C5F79] font-semibold text-[17px] leading-[28px]">
            회원님께서는 이미 가입된 정보가 있습니다.
          </h3>

          <p className="text-[#5C5F79] text-[14px] font-normal">
            아래 아이디를 통해 로그인하시면 kakao 아이디와 자동으로 연동됩니다.
          </p>

          <Input />

          <Button className="mt-5 w-[150px] mx-auto" onClick={handleSubmit}>
            로그인 하기
          </Button>

          <div className="flex gap-2 justify-center mt-4">
            <span className="text-[12px] text-[#5C5F79]">아이디 찾기</span>{" "}
            <span className="text-[12px] text-[#5C5F79]">|</span>
            <span className="text-[12px] text-[#5C5F79]">비밀번호 찾기</span>
          </div>
        </div>
      </Modal>
    </>
  );
};
