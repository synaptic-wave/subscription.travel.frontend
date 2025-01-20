import { Header } from "@/components/Header";
import { SubHeader } from "@/modules/Home/components/SubHeader";
import membershipImg from "@/assets/images/membership.png";
import mobileImg from "@/assets/images/mobile_membership.png";
import buildingImg from "@/assets/icons/building-icon.svg";
import protectionImg from "@/assets/icons/protection.svg";
import planeImg from "@/assets/icons/plane.svg";
import planeWingImg from "@/assets/images/plane-wing.png";
import hadnyTripMembImg from "@/assets/images/handytrip-memb.png";
import travelWomanImg from "@/assets/images/travel-woman.png";
import subscriptionTableImg from "@/assets/images/subscription-table.png";

import { Button } from "@/components/index";

export default function StaticMembership() {
  return (
    <>
      <Header />
      <SubHeader />

      <div
        className="w-full flex flex-col h-[400px] justify-center items-center relative"
        style={{
          background: `url(${membershipImg})`,
          backgroundPosition: "center center",
          backgroundSize: "cover"
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 bottom-0 "
          style={{
            background:
              "linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)"
          }}
        />
        <span className="text-white text-[30px] z-10">
          HandyTrip Membership
        </span>
        <h1 className="text-white mt-[15p] text-[44px] leading-[59px] font-bold z-10">
          핸디트립 멤버십
          <br />
          고객혜택 서비스
        </h1>
      </div>

      <div className="w-full flex container my-[95px] flex-col">
        <h2 className="text-[#374248] text-[34px] font-semibold w-full text-center">
          핸디트립 멤버십 혜택을 부담없이 무료로 체험해 보세요*
        </h2>

        <p className="mt-[14px] text-[#374248] text-xl font-light text-center w-full">
          지금 핸디트립 구독서비스를 1개월간 무료로 체험해 보세요! <br />
          숙박에서 항공, 여행자보험까지 다양한 혜택을 드립니다.
        </p>

        <p className="text-[#374248] text-xl font-light text-center w-full mt-[32px]">
          *제공하신 결제 수단으로 1개월간 아무런 결제가 발생하지 않습니다.{" "}
          <br />
          계속 멤버십을 이용하시고자 하시면 1개월 후 자동으로 결제가
          이루워집니다.
        </p>

        <div className="w-[80%] grid grid-cols-4 gap-[30px] mx-auto mt-[55px]">
          <div className="w-full bg-[#CEDC00] border border-[#CEDC00] py-2 rounded-full text-center text-white text-[15px] font-medium">
            멤버 전용 페이지
          </div>

          <div className="w-full border border-[#DC231E] py-2 rounded-full text-center text-[#DC231E] text-[15px] font-medium">
            호텔 최대 50% 할인
          </div>

          <div className="w-full border border-[#DC231E] bg-[#DC231E] py-2 rounded-full text-center text-white text-[15px] font-medium">
            원가여행 보상제
          </div>

          <div className="w-full border border-[#DC231E] py-2 rounded-full text-center text-[#DC231E] text-[15px] font-medium">
            280 만개 호텔
          </div>
        </div>

        <div className="w-[80%] grid grid-cols-4 gap-[30px] mx-auto mt-3">
          <div className="w-full border border-[#DC231E] py-2 rounded-full text-center text-[#DC231E] text-[15px] font-medium">
            항공 발권 수수료 면제
          </div>

          <div className="w-full bg-[#5A7BF0] border border-[#5A7BF0] py-2 rounded-full text-center text-white text-[15px] font-medium">
            170개 여행국가
          </div>

          <div className="w-full border border-[#DC231E] py-2 rounded-full text-center text-[#DC231E] text-[15px] font-medium">
            150개 노선 15개 항공사
          </div>

          <div className="w-full border border-[#DC231E] py-2 rounded-full text-center text-[#DC231E] text-[15px] font-medium">
            여행자 보험 상시 할인
          </div>
        </div>
      </div>

      <div className="w-full bg-[#EFF3FF99] pt-[95px] max-h-[570px] overflow-hidden">
        <div className="container">
          <div className="w-full flex gap-[50px]">
            <div className="w-[70%] flex flex-col pb-[71px]">
              <h2 className="text-[#374248] font-semibold text-[34px]">
                여행 최저가 끝판왕! 예약마진 포기
              </h2>

              <div className="w-full flex gap-[22px] mt-8">
                <img width={40} height={60} src={buildingImg} />

                <div className="flex flex-col gap-2">
                  <h3 className="text-[#576FCD] font-semibold text-2xl">
                    숙박 원가 예약 / 170 국가 + 280만 숙박
                  </h3>
                  <p className="text-[#374248] font-normal text-base">
                    <strong>온라인 최저가 대비 평균 10% 저렴하게 예약!</strong>{" "}
                    대형 글로벌 공급사의 숙박상품을 비교, 최저가를 추출하고,
                    당사의 예약마진을 더하지 않아 공급원가 그대로 예약할 수
                    있습니다.
                  </p>
                </div>
              </div>

              <div className="w-full flex gap-[22px] mt-8">
                <img width={40} height={60} src={planeImg} />

                <div className="flex flex-col gap-2">
                  <h3 className="text-[#576FCD] font-semibold text-2xl">
                    항공 발권 수수료 면제 /15 항공사 + 150 노선 +
                  </h3>
                  <p className="text-[#374248] font-normal text-base">
                    <strong>2인 기준 평균 2만원 발권 수수료 면제!</strong> 해외
                    여행 시 2명 기준, 왕복 최대 4만원까지 면제 받을 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="w-full flex gap-[22px] mt-8">
                <img width={40} height={60} src={protectionImg} />

                <div className="flex flex-col gap-2">
                  <h3 className="text-[#576FCD] font-semibold text-2xl">
                    여행자 보험 상시 10% 할인 / 휴대품 200만원, 해외의료비
                    300만원
                  </h3>
                  <p className="text-[#374248] font-normal text-base">
                    <strong>보험료의 10% 할인혜택 제공!</strong> 여행일정만
                    입력하면 보험료도 간편계산하는 가입도 보상도 간편하게 받을
                    수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-[30%] flex items-end justify-start">
              <img src={mobileImg} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-full h-[350px] flex justify-center items-center gap-[166px] relative"
        style={{
          background: `url(${planeWingImg})`,
          backgroundPosition: "-140px center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 bottom-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(58, 73, 131, 0.8) 0%, rgba(90, 123, 240, 0.75) 100%)"
          }}
        />
        <div className="flex flex-col z-10">
          <h3 className="text-white text-[64px] font-bold text-center">
            170개 +
          </h3>
          <span className="text-white text-[22px] font-medium text-center">
            COUNTRY
          </span>
        </div>

        <div className="flex flex-col z-10">
          <h3 className="text-white text-[64px] font-bold text-center">
            280만 +
          </h3>
          <span className="text-white text-[22px] font-medium text-center">
            HOTEL
          </span>
        </div>

        <div className="flex flex-col z-10">
          <h3 className="text-white text-[64px] font-bold text-center">
            150노선 +
          </h3>
          <span className="text-white text-[22px] font-medium text-center">
            AIR ROUTE
          </span>
        </div>
      </div>

      <div className="w-full flex flex-col container pt-[130px] items-center">
        <h2 className="text-[#374248] text-[36px] font-semibold w-full text-center">
          핸디트립 안심 + 추가 혜택 서비스
        </h2>

        <ul className="mt-[11px]">
          <li className="text-[#374248] text-lg font-light">
            1. 핸디회원이 되어 핸디트립의 최저가 예약 서비스를 1개월간 무료로
            체험해 보세요.
          </li>

          <li className="text-[#374248] text-lg font-light">
            2. 1개월 무료체험 기간 중 마음에 들지 않으시면 자유롭게 결제를
            취소해 주세요.
          </li>
          <li className="text-[#374248] text-lg font-light">
            3. 12개월 구독권을 구입하시고 한번도 여행을 가지 않으셨다면 결제하신
            금액 전액을 환불해 드립니다.!
          </li>
        </ul>

        <div className="mt-7 pb-[91px] flex flex-col items-center">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex">
              <img src={hadnyTripMembImg} />
            </div>

            <div className="flex flex-col w-full gap-5">
              <div className="border border-[#5A7BF0] p-[25px] rounded-[10px] flex items-center gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M13.75 21.25H16.25V16.25H21.25V13.75H16.25V8.75H13.75V13.75H8.75V16.25H13.75V21.25ZM15 27.5C13.2708 27.5 11.6458 27.1719 10.125 26.5156C8.60417 25.8594 7.28125 24.9688 6.15625 23.8438C5.03125 22.7188 4.14062 21.3958 3.48438 19.875C2.82812 18.3542 2.5 16.7292 2.5 15C2.5 13.2708 2.82812 11.6458 3.48438 10.125C4.14062 8.60417 5.03125 7.28125 6.15625 6.15625C7.28125 5.03125 8.60417 4.14062 10.125 3.48438C11.6458 2.82812 13.2708 2.5 15 2.5C16.7292 2.5 18.3542 2.82812 19.875 3.48438C21.3958 4.14062 22.7188 5.03125 23.8438 6.15625C24.9688 7.28125 25.8594 8.60417 26.5156 10.125C27.1719 11.6458 27.5 13.2708 27.5 15C27.5 16.7292 27.1719 18.3542 26.5156 19.875C25.8594 21.3958 24.9688 22.7188 23.8438 23.8438C22.7188 24.9688 21.3958 25.8594 19.875 26.5156C18.3542 27.1719 16.7292 27.5 15 27.5Z"
                      fill="#5A7BF0"
                    />
                  </svg>
                </span>

                <div>
                  <strong>1개월 구독권 정기 결제 : 3,000원/월</strong>{" "}
                  (부가가치세 별도)
                </div>
              </div>

              <div className="border border-[#5A7BF0] p-[25px] rounded-[10px] flex items-center gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M13.75 21.25H16.25V16.25H21.25V13.75H16.25V8.75H13.75V13.75H8.75V16.25H13.75V21.25ZM15 27.5C13.2708 27.5 11.6458 27.1719 10.125 26.5156C8.60417 25.8594 7.28125 24.9688 6.15625 23.8438C5.03125 22.7188 4.14062 21.3958 3.48438 19.875C2.82812 18.3542 2.5 16.7292 2.5 15C2.5 13.2708 2.82812 11.6458 3.48438 10.125C4.14062 8.60417 5.03125 7.28125 6.15625 6.15625C7.28125 5.03125 8.60417 4.14062 10.125 3.48438C11.6458 2.82812 13.2708 2.5 15 2.5C16.7292 2.5 18.3542 2.82812 19.875 3.48438C21.3958 4.14062 22.7188 5.03125 23.8438 6.15625C24.9688 7.28125 25.8594 8.60417 26.5156 10.125C27.1719 11.6458 27.5 13.2708 27.5 15C27.5 16.7292 27.1719 18.3542 26.5156 19.875C25.8594 21.3958 24.9688 22.7188 23.8438 23.8438C22.7188 24.9688 21.3958 25.8594 19.875 26.5156C18.3542 27.1719 16.7292 27.5 15 27.5Z"
                      fill="#5A7BF0"
                    />
                  </svg>
                </span>

                <div>
                  <strong>
                    추천인 코드 입력하고 1개월 구독권 정기 결제 신청시 최대
                    2개월 멤버십 기간 연장 혜택*
                  </strong>{" "}
                  (*12개월간 정기 결제 유지시 제공)
                </div>
              </div>

              <div className="border border-[#5A7BF0] p-[25px] rounded-[10px] flex items-center gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M13.75 21.25H16.25V16.25H21.25V13.75H16.25V8.75H13.75V13.75H8.75V16.25H13.75V21.25ZM15 27.5C13.2708 27.5 11.6458 27.1719 10.125 26.5156C8.60417 25.8594 7.28125 24.9688 6.15625 23.8438C5.03125 22.7188 4.14062 21.3958 3.48438 19.875C2.82812 18.3542 2.5 16.7292 2.5 15C2.5 13.2708 2.82812 11.6458 3.48438 10.125C4.14062 8.60417 5.03125 7.28125 6.15625 6.15625C7.28125 5.03125 8.60417 4.14062 10.125 3.48438C11.6458 2.82812 13.2708 2.5 15 2.5C16.7292 2.5 18.3542 2.82812 19.875 3.48438C21.3958 4.14062 22.7188 5.03125 23.8438 6.15625C24.9688 7.28125 25.8594 8.60417 26.5156 10.125C27.1719 11.6458 27.5 13.2708 27.5 15C27.5 16.7292 27.1719 18.3542 26.5156 19.875C25.8594 21.3958 24.9688 22.7188 23.8438 23.8438C22.7188 24.9688 21.3958 25.8594 19.875 26.5156C18.3542 27.1719 16.7292 27.5 15 27.5Z"
                      fill="#5A7BF0"
                    />
                  </svg>
                </span>

                <div className="flex justify-between w-full">
                  <span>
                    <strong>12개월 구독권 일시불 결제:</strong>
                  </span>{" "}
                  <div className="flex flex-col items-end">
                    <div>
                      <span className="line-through">36,000</span>원 ->
                      33,000원/년
                    </div>

                    <span className="text-xs"> (부가가치세 별도)</span>
                  </div>
                </div>
              </div>

              <div className="border border-[#5A7BF0] p-[25px] rounded-[10px] flex items-center gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M13.75 21.25H16.25V16.25H21.25V13.75H16.25V8.75H13.75V13.75H8.75V16.25H13.75V21.25ZM15 27.5C13.2708 27.5 11.6458 27.1719 10.125 26.5156C8.60417 25.8594 7.28125 24.9688 6.15625 23.8438C5.03125 22.7188 4.14062 21.3958 3.48438 19.875C2.82812 18.3542 2.5 16.7292 2.5 15C2.5 13.2708 2.82812 11.6458 3.48438 10.125C4.14062 8.60417 5.03125 7.28125 6.15625 6.15625C7.28125 5.03125 8.60417 4.14062 10.125 3.48438C11.6458 2.82812 13.2708 2.5 15 2.5C16.7292 2.5 18.3542 2.82812 19.875 3.48438C21.3958 4.14062 22.7188 5.03125 23.8438 6.15625C24.9688 7.28125 25.8594 8.60417 26.5156 10.125C27.1719 11.6458 27.5 13.2708 27.5 15C27.5 16.7292 27.1719 18.3542 26.5156 19.875C25.8594 21.3958 24.9688 22.7188 23.8438 23.8438C22.7188 24.9688 21.3958 25.8594 19.875 26.5156C18.3542 27.1719 16.7292 27.5 15 27.5Z"
                      fill="#5A7BF0"
                    />
                  </svg>
                </span>

                <div>
                  추천인 코드 입력하고 12개월 구독권 일시불 결제시 최대 6,000원
                  추가 할인
                </div>
              </div>

              <div className="border border-[#5A7BF0] p-[25px] rounded-[10px] flex items-center gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M13.75 21.25H16.25V16.25H21.25V13.75H16.25V8.75H13.75V13.75H8.75V16.25H13.75V21.25ZM15 27.5C13.2708 27.5 11.6458 27.1719 10.125 26.5156C8.60417 25.8594 7.28125 24.9688 6.15625 23.8438C5.03125 22.7188 4.14062 21.3958 3.48438 19.875C2.82812 18.3542 2.5 16.7292 2.5 15C2.5 13.2708 2.82812 11.6458 3.48438 10.125C4.14062 8.60417 5.03125 7.28125 6.15625 6.15625C7.28125 5.03125 8.60417 4.14062 10.125 3.48438C11.6458 2.82812 13.2708 2.5 15 2.5C16.7292 2.5 18.3542 2.82812 19.875 3.48438C21.3958 4.14062 22.7188 5.03125 23.8438 6.15625C24.9688 7.28125 25.8594 8.60417 26.5156 10.125C27.1719 11.6458 27.5 13.2708 27.5 15C27.5 16.7292 27.1719 18.3542 26.5156 19.875C25.8594 21.3958 24.9688 22.7188 23.8438 23.8438C22.7188 24.9688 21.3958 25.8594 19.875 26.5156C18.3542 27.1719 16.7292 27.5 15 27.5Z"
                      fill="#5A7BF0"
                    />
                  </svg>
                </span>

                <div className="flex flex-col items-end">
                  <span className="text-[#F00]">
                    일시불 결제 후 1회라도 여행 예약을 하지 않으셨다면 전액
                    환불*
                  </span>

                  <span className="text-[#5C5F79] text-xs">
                    (*12개월 멤버십 기간 종료 후 환불신청 또는 무료 12개월 연장
                    신청)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Button className="mx-auto mt-[72px] rounded-[10px] w-[280px]">
            핸디트립 멤버십 가입하기
          </Button>
        </div>
      </div>

      <div
        className="w-full h-[500px] relative"
        style={{
          background: `url(${travelWomanImg})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      >
        <div className="w-full absolute top-0 left-0 right-0 bottom-0 bg-[#202020BF] z-[1]" />

        <div className="w-full h-full flex flex-col justify-center items-center relative z-10 gap-9">
          <span className="text-white text-[24px] font-medium">
            여행이 저렴해지는 비법
          </span>
          <h2 className="text-white text-[36px] font-medium">
            딱 한번만 여행 가도 많이 남는 선택!!! 핸디트립 멤버십
          </h2>

          <div className="w-full flex justify-center gap-[180px]">
            <div className="flex flex-col gap-6 items-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
              >
                <g clip-path="url(#clip0_437_4866)">
                  <path
                    d="M42.5 27.5V7.5H17.5V17.5H7.5V52.5H27.5V42.5H32.5V52.5H52.5V27.5H42.5ZM17.5 47.5H12.5V42.5H17.5V47.5ZM17.5 37.5H12.5V32.5H17.5V37.5ZM17.5 27.5H12.5V22.5H17.5V27.5ZM27.5 37.5H22.5V32.5H27.5V37.5ZM27.5 27.5H22.5V22.5H27.5V27.5ZM27.5 17.5H22.5V12.5H27.5V17.5ZM37.5 37.5H32.5V32.5H37.5V37.5ZM37.5 27.5H32.5V22.5H37.5V27.5ZM37.5 17.5H32.5V12.5H37.5V17.5ZM47.5 47.5H42.5V42.5H47.5V47.5ZM47.5 37.5H42.5V32.5H47.5V37.5Z"
                    fill="#198FFE"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_437_4866">
                    <rect width="60" height="60" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <h3 className="text-2xl font-bold">숙박원가예약</h3>

              <span className="text-center">
                온라인 최저가 대비 평균
                <br /> 10% 저렴하게
              </span>
            </div>

            <div className="flex flex-col gap-6 items-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
              >
                <g clip-path="url(#clip0_437_4875)">
                  <path
                    d="M6.25156 47.4969H53.7516V52.4969H6.25156V47.4969ZM55.1766 24.0969C54.6516 22.0969 52.5766 20.8969 50.5766 21.4469L37.3016 24.9969L20.0516 8.92188L15.2266 10.1969L25.5766 28.1219L13.1516 31.4469L8.22656 27.5969L4.60156 28.5719L9.15156 36.4719L11.0766 39.7969L52.5016 28.7219C54.5266 28.1469 55.7016 26.0969 55.1766 24.0969Z"
                    fill="#CEDC00"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_437_4875">
                    <rect width="60" height="60" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <h3 className="text-2xl font-bold">항공발권수수료 면제</h3>

              <span className="text-center">
                1인 해외여행 왕복시 평균 2만원 면제
                <br />
                스카이스캐너 항공 정보 기준
              </span>
            </div>
            <div className="flex flex-col gap-6 items-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="61"
                viewBox="0 0 60 61"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.375 2.36719C5.23286 2.36719 1.875 5.72505 1.875 9.86719V47.3672C1.875 51.5093 5.23286 54.8672 9.375 54.8672H31.1507C27.5044 51.2823 25.3125 46.438 25.3125 41.1878V33.9081C25.3125 30.5117 27.5132 27.8353 30.3416 26.7422H14.0625C13.0269 26.7422 12.1875 25.9028 12.1875 24.8672C12.1875 23.8316 13.0269 22.9922 14.0625 22.9922H34.6875C35.7231 22.9922 36.5625 23.8316 36.5625 24.8672C36.5625 24.9926 36.5502 25.1152 36.5267 25.2338L41.277 24.1396C42.4919 23.8598 43.7581 23.8598 44.973 24.1396L46.875 24.5777V9.86719C46.875 5.72505 43.5172 2.36719 39.375 2.36719H9.375ZM34.6875 19.2422C35.7231 19.2422 36.5625 18.4028 36.5625 17.3672C36.5625 16.3316 35.7231 15.4922 34.6875 15.4922H14.0625C13.0269 15.4922 12.1875 16.3316 12.1875 17.3672C12.1875 18.4028 13.0269 19.2422 14.0625 19.2422H34.6875ZM24.375 32.3672C24.375 33.4028 23.5356 34.2422 22.5 34.2422H14.0625C13.0269 34.2422 12.1875 33.4028 12.1875 32.3672C12.1875 31.3316 13.0269 30.4922 14.0625 30.4922H22.5C23.5356 30.4922 24.375 31.3316 24.375 32.3672ZM22.5 41.7422C23.5356 41.7422 24.375 40.9027 24.375 39.8672C24.375 38.8316 23.5356 37.9922 22.5 37.9922H14.0625C13.0269 37.9922 12.1875 38.8316 12.1875 39.8672C12.1875 40.9027 13.0269 41.7422 14.0625 41.7422H22.5Z"
                  fill="#A7D8B7"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M41.9083 26.8803C42.7077 26.6962 43.5423 26.6962 44.3417 26.8803L54.1854 29.1478C56.3996 29.6579 58.125 31.551 58.125 33.9081V41.1878C58.125 47.5039 54.3719 53.2244 48.4951 56.1576L43.9623 58.4198C43.4351 58.683 42.8149 58.683 42.2877 58.4198L37.7549 56.1576C31.8781 53.2245 28.125 47.5039 28.125 41.1878V33.9081C28.125 31.551 29.8504 29.6579 32.0646 29.1478L41.9083 26.8803ZM43.125 34.2422C44.1606 34.2422 45 35.0816 45 36.1172V39.8672H48.75C49.7856 39.8672 50.625 40.7066 50.625 41.7422C50.625 42.7777 49.7856 43.6172 48.75 43.6172H45V47.3672C45 48.4027 44.1606 49.2422 43.125 49.2422C42.0894 49.2422 41.25 48.4027 41.25 47.3672V43.6172H37.5C36.4644 43.6172 35.625 42.7777 35.625 41.7422C35.625 40.7066 36.4644 39.8672 37.5 39.8672H41.25V36.1172C41.25 35.0816 42.0894 34.2422 43.125 34.2422Z"
                  fill="#A7D8B7"
                />
              </svg>

              <h3 className="text-2xl font-bold">안심여행자 보험</h3>

              <span className="text-center">
                가입 보험금액의 10% <br />
                상시할인 혜택
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full container flex flex-col items-center py-[91px] ">
        <img src={subscriptionTableImg} className="max-w-[890px]" />
        <p className="mt-[14px] text-center text-[#DC231E] text-lg font-light">
          월 정기 결제 핸디회원은 단 1회라도 미결제 되면 자동으로 핸디회원
          자격이 해제되며 서비스를 이용할 수 없습니다. <br />
          계속 서비스를 이용하려면 다시 핸디회원 가입을 하고 연간 구독료를
          일시불로 결제 하면 됩니다.
        </p>

        <Button className="mx-auto mt-[72px] rounded-[10px] w-[280px]">
          핸디트립 멤버십 가입하기
        </Button>

        <div className="w-full flex flex-col items-center mt-[91px]">
          <span className="text-[#374248] text-[22px]">
            핸디트립 회원 전용 이벤트 1탄
          </span>
          <h3 className="text-[#374248] text-4xl font-medium mt-[7px]">
            아고다를 이겨라*
          </h3>
          <p className="text-center mt-[15px] text-xl font-light">
            <span className="text-[#EA4335]">
              실제 예약을 하실 필요가 없습니다! 아고다와 가격만 비교해 보십시요!
            </span>
            <br />
            핸디트립의 가격이 아고다보다 비싼 숙소를 발견하시면, 차액을
            마일리지로 돌려드립니다.
          </p>

          <div className="w-full flex justify-center gap-[180px]">
            <div className="flex flex-col items-center mt-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M42 42L33.3 33.3M38 22C38 30.8366 30.8366 38 22 38C13.1634 38 6 30.8366 6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22Z"
                  stroke="#576FCD"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <h4 className="mt-8 text-[#374248] text-[22px] font-medium">
                아고다 최저가 찾기
              </h4>

              <p className="mt-2 text-center text-[#69777E] text-sm">
                아고다에서 관심있는 호텔을 검색하고,
                <br /> 최종 결제금액을 확인하세요
              </p>
            </div>

            <div className="flex flex-col items-center mt-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M35.6899 4.33273H31.2643V1.69273C31.2643 1.42871 31.0387 1.20312 30.7747 1.20312H14.3203C14.0515 1.20312 13.8259 1.42871 13.8259 1.69273V4.33273H9.80352C9.26592 4.33273 8.81952 4.7791 8.81952 5.31676V42.1568H3.94751C3.67871 42.1568 3.45312 42.3823 3.45312 42.6511V43.1407C3.45312 43.4095 3.67871 43.6351 3.94751 43.6351H26.5555C26.4163 43.5103 26.2819 43.3807 26.1475 43.2463C25.2163 42.2863 24.4771 41.1727 23.9347 39.9151C23.6803 39.3247 23.4835 38.7151 23.3491 38.0911H21.0259C20.8483 38.0911 20.7139 37.9568 20.7139 37.7791V31.8751C20.7139 31.6975 20.8483 31.5631 21.0259 31.5631H24.0211C24.5635 30.3583 25.2883 29.3023 26.1715 28.4239C26.7763 27.8143 27.4627 27.2863 28.2259 26.8351V21.0559C28.2259 20.8783 28.3603 20.7439 28.5379 20.7439H32.0227C32.2051 20.7439 32.3395 20.8783 32.3395 21.0559V25.4287C32.7523 25.3759 33.1699 25.352 33.5923 25.352H33.7219C34.7155 25.352 35.6995 25.5103 36.6739 25.8223V5.31676C36.6739 4.7791 36.2275 4.33273 35.6899 4.33273ZM17.2675 37.7791C17.2675 37.9568 17.1331 38.0911 16.9555 38.0911H13.4707C13.2883 38.0911 13.1539 37.9568 13.1539 37.7791V31.8751C13.1539 31.6975 13.2883 31.5631 13.4707 31.5631H16.9555C17.1331 31.5631 17.2675 31.6975 17.2675 31.8751V37.7791ZM17.2675 26.9551C17.2675 27.1375 17.1331 27.272 16.9555 27.272H13.4707C13.2883 27.272 13.1539 27.1375 13.1539 26.9551V21.0559C13.1539 20.8783 13.2883 20.7439 13.4707 20.7439H16.9555C17.1331 20.7439 17.2675 20.8783 17.2675 21.0559V26.9551ZM17.2675 16.1359C17.2675 16.3135 17.1331 16.4479 16.9555 16.4479H13.4707C13.2883 16.4479 13.1539 16.3135 13.1539 16.1359V10.2368C13.1539 10.0543 13.2883 9.91988 13.4707 9.91988H16.9555C17.1331 9.91988 17.2675 10.0543 17.2675 10.2368V16.1359ZM24.8275 26.9551C24.8275 27.1375 24.6931 27.272 24.5107 27.272H21.0259C20.8483 27.272 20.7139 27.1375 20.7139 26.9551V21.0559C20.7139 20.8783 20.8483 20.7439 21.0259 20.7439H24.5107C24.6931 20.7439 24.8275 20.8783 24.8275 21.0559V26.9551ZM24.8275 16.1359C24.8275 16.3135 24.6931 16.4479 24.5107 16.4479H21.0259C20.8483 16.4479 20.7139 16.3135 20.7139 16.1359V10.2368C20.7139 10.0543 20.8483 9.91988 21.0259 9.91988H24.5107C24.6931 9.91988 24.8275 10.0543 24.8275 10.2368V16.1359ZM32.3395 16.1359C32.3395 16.3135 32.2051 16.4479 32.0227 16.4479H28.5379C28.3603 16.4479 28.2259 16.3135 28.2259 16.1359V10.2368C28.2259 10.0543 28.3603 9.91988 28.5379 9.91988H32.0227C32.2051 9.91988 32.3395 10.0543 32.3395 10.2368V16.1359Z"
                  fill="#576FCD"
                />
                <path
                  d="M44.0171 43.661L40.7892 40.4331C41.6938 39.035 42.1461 37.493 42.1461 35.8482C42.1461 34.6763 41.92 33.566 41.4676 32.5175C41.0153 31.4689 40.3985 30.5642 39.6584 29.8035C38.8976 29.0428 37.993 28.4465 36.9239 27.9737C35.8547 27.5008 34.7445 27.254 33.5931 27.2746C32.4212 27.2746 31.3109 27.5008 30.2624 27.9531C29.2138 28.4054 28.2886 29.0222 27.5279 29.783C26.7671 30.5437 26.1503 31.4689 25.698 32.5175C25.2457 33.566 25.0401 34.6557 25.0195 35.8482C25.0195 36.9996 25.2457 38.1098 25.698 39.1584C26.1503 40.2069 26.7671 41.1321 27.5073 41.8929C28.268 42.6536 29.1727 43.2704 30.2418 43.7022C31.3109 44.1545 32.4212 44.3806 33.5726 44.3806C35.2174 44.3806 36.7594 43.9283 38.1575 43.0237L41.406 46.2722C41.7555 46.6217 42.1872 46.8068 42.7013 46.8068C43.2153 46.8068 43.647 46.6217 44.0171 46.2722C44.3872 45.9227 44.5517 45.4909 44.5517 44.9769C44.5311 44.4629 44.3666 44.0311 44.0171 43.661ZM38.8771 38.9117C38.3219 39.8574 37.5818 40.5976 36.6566 41.1321C35.7108 41.6873 34.7034 41.9545 33.5931 41.9545C32.4829 41.9545 31.4548 41.6873 30.5091 41.1321C29.5633 40.577 28.8232 39.8574 28.2886 38.9117C27.7335 37.9865 27.4662 36.9584 27.4662 35.8482C27.4662 34.738 27.7335 33.71 28.2886 32.7642C28.8437 31.8184 29.5839 31.0783 30.5091 30.5437C31.4343 30.0091 32.4829 29.7213 33.5931 29.7213C34.6828 29.7213 35.7108 29.9886 36.6566 30.5437C37.6023 31.0988 38.3425 31.839 38.8771 32.7642C39.4116 33.6894 39.6789 34.738 39.6995 35.8482C39.6995 36.9584 39.4322 37.9865 38.8771 38.9117Z"
                  fill="#576FCD"
                />
              </svg>

              <h4 className="mt-8 text-[#374248] text-[22px] font-medium">
                핸디트립 호텔 찾기
              </h4>

              <p className="mt-2 text-center text-[#69777E] text-sm">
                핸디트립에서 동일 호텔을 <br />
                같은 검색 일자에 동일 조건으로 검색하시고 <br />
                금액을 비교해 보세요
              </p>
            </div>

            <div className="flex flex-col items-center mt-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M10 7C13.8 3.8 18.6 2 24 2C36.2 2 46 11.8 46 24C46 36.2 36.2 46 24 46C11.8 46 2 36.2 2 24C2 22.8 2.8 22 4 22C5.2 22 6 22.8 6 24C6 34 14 42 24 42C34 42 42 34 42 24C42 14 34 6 24 6C19.8 6 15.8 7.4 12.6 10H16C17.2 10 18 10.8 18 12C18 13.2 17.2 14 16 14H8C6.8 14 6 13.2 6 12V4C6 2.8 6.8 2 8 2C9.2 2 10 2.8 10 4V7ZM26 16C26 14.8 25.2 14 24 14C22.8 14 22 14.8 22 16V16.2C19.8 16.6 18 18.6 18 21C18 23.8 20.2 26 23 26H25C25.6 26 26 26.4 26 27C26 27.6 25.6 28 25 28H24.2C23 28 22 27.8 21 27.2C20 26.8 18.8 27.2 18.4 28C18 29 18.4 30.2 19.2 30.6C20 31 21 31.4 22 31.6V32C22 33.2 22.8 34 24 34C25.2 34 26 33.2 26 32V31.8C28.2 31.4 30 29.4 30 27C30 24.2 27.8 22 25 22H23C22.4 22 22 21.6 22 21C22 20.4 22.4 20 23 20H23.8C25 20 26 20.2 27 20.8C28 21.2 29.2 20.8 29.6 20C30 19 29.6 17.8 28.8 17.4C28 16.8 27 16.4 26 16.2V16Z"
                  fill="#576FCD"
                />
              </svg>

              <h4 className="mt-8 text-[#374248] text-[22px] font-medium">
                최저가 신고 및 보상
              </h4>

              <p className="mt-2 text-center text-[#69777E] text-sm">
                핸디트립 가격이 비싸다면 핸디트립에
                <br /> 신고해 주십시요.
                <br />그 차액만큼 마일리지를 지급합니다.
              </p>
            </div>
          </div>

          <p className="text-base text-[#5C5F79] mt-[51px]">
            *일부 제약조건 있음. 상세한 내용은 첨부 참조
          </p>
        </div>
      </div>
    </>
  );
}
