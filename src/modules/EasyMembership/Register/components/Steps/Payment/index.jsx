import { useState } from "react";
import Tabs from "@/components/Tabs";
import warningIcon from "@/assets/icons/warning-rounded-red.svg";
import { Checkbox } from "@/components/Checkbox";
import { Accordion, Button } from "@/components/index";

export const PaymentInformation = ({ onSubmitPayment }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <div className="w-full flex flex-col gap-6 mt-[110px] min-h-[60vh] mx-auto items-center">
        <h2 className="text-[#161A3F] text-[24px] font-bold text-center">
          구독서비스 결제(선택)
        </h2>

        <div className="flex justify-center">
          <Tabs
            activeIndex={selectedIndex}
            onChangeTab={setSelectedIndex}
            elements={[
              {
                label: "1 년 정기 결제"
              },
              {
                label: "월 정기 결제"
              }
            ]}
          />
        </div>

        <div className="w-full flex flex-col max-w-[375px] gap-3">
          <div className="w-full flex justify-between">
            <span className="text-[13px] font-normal">정상 금액</span>
            <span className="text-[#A3A5B8]">
              <span className="text-black">월</span> 3,000원{" "}
            </span>
          </div>

          <div className="w-full flex justify-between">
            <span className="text-[13px] font-normal">월간 할인</span>
            <span className="text-[13px] font-normal">혜택없음</span>
          </div>

          <div className="w-full flex justify-between">
            <span className="text-[13px] font-normal text-[#EA4335]">
              결제 금액
            </span>
            <span className="text-[13px] font-normal text-[#EA4335]">
              혜택없음
            </span>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#EAEAF4] max-w-[375px]"></div>

        <div className="w-full flex justify-between max-w-[375px]">
          <span className="text-[13px] font-normal">결제 금액</span>
          <span className="text-[13px] font-normal">3,000원</span>
        </div>

        <div className="flex flex-col mt-6 gap-[14px]">
          <div className="flex gap-2 justify-center items-center">
            <img src={warningIcon} />
            <span className="text-[#5C5F79] font-normal">유의사항</span>
          </div>

          <div className="max-w-[670px] w-full">
            <ul className="w-full list-disc">
              <li className="text-[#5C5F79] text-[18px]">
                월 정기 구독서비스 신청 결제를 진행합니다.
              </li>
              <li className="text-[#5C5F79] text-[18px]">
                결제 일로부터 1개월 동안 멤버십 혜택을 받을 수 있습니다.
              </li>
              <li className="text-[#5C5F79] text-[18px]">
                1개월 뒤 결제하신 결제수단으로 자동 갱신됩니다.
              </li>
              <li className="text-[#5C5F79] text-[18px]">
                여행도우미 멤버십 유료 구독제는 해지 신청하기 전까지 구독이 자동
                갱신됩니다. 해지 신청한 후에도 유지 기간이 만료될 때까지 기존
                구독제 서비스 및 멤버십 혜택을 이용할 수 있으며 구독 요금의 부분
                환불은 불가합니다.
              </li>
              <li className="text-[#5C5F79] text-[18px]">
                <span className="text-[red]">
                  월간 구독제 가입 회원의 경우, 해지를 신청한 경우 유지 기간
                  동안 서비스를 이용할 수 있으며, 유지 기간 만료 후 월간 구독
                  회원으로의 재가입이 제한됩니다.{" "}
                </span>
                단, 연간 구독제로의 가입은 가능하며 연간 구독제 가입일은 신규
                가입일을 기준으로 유지 기간이 새롭게 설정됩니다.
              </li>

              <li className="text-[#5C5F79] text-[18px]">
                연간 구독제로 가입 후 변심으로 인해 청약 철회를 원하는 경우,
                가입일로부터 7일 이내에 홈페이지 에서 ‘멤버십 해지’ 신청 후 CS
                연락망을 통해 철회 요청 시, 전액 환불이 가능합니다. (단,
                멤버십을 이용하여 숙소 예약 건이 있는 경우 환불 불가)
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center my-10">
          <Checkbox label="유의사항 확인 함" />
        </div>

        <div className="flex flex-col max-w-[375px] w-full">
          <Accordion
            className="w-full"
            titleClassname="bg-[#F2F6FF] p-[15px] rounded-sm"
            title={<Checkbox label="약관에 모두 동의합니다." />}
          >
            <ul>
              <li>
                <Checkbox className="p-[15px]" label="서비스 이용약관 (필수)" />
              </li>
              <li>
                <Checkbox
                  className="p-[15px]"
                  label="개인정보 보호 정책 (필수)"
                />
              </li>
              <li>
                <Checkbox
                  className="p-[15px]"
                  label="구독서비스 특별약관 (필수)"
                />
              </li>
            </ul>
          </Accordion>
        </div>

        <Button
          className="w-full max-w-[375px] mb-[200px]"
          onClick={onSubmitPayment}
        >
          구독서비스 결제하기
        </Button>
      </div>
    </>
  );
};
