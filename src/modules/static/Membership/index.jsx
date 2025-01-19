import { Header } from "@/components/Header";
import { SubHeader } from "@/modules/Home/components/SubHeader";

export default function StaticMembership() {
  return (
    <>
      <Header />
      <SubHeader />

      <div
        className="w-full flex flex-col h-[400px] justify-center items-center"
        style={{
          background:
            "linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)"
        }}
      >
        <span className="text-white text-[30px]">HandyTrip Membership</span>
        <h1 className="text-white mt-[15p] text-[44px] leading-[59px] font-bold">
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

      <div className="w-full bg-[#EFF3FF99] pt-[95px]">
        <div className="container">
          <div className="w-full flex">
            <div className="w-[70%] flex flex-col pb-[71px]">
              <h2 className="text-[#374248] font-semibold text-[34px]">
                여행 최저가 끝판왕! 예약마진 포기
              </h2>

              <div className="w-full flex gap-[22px] mt-8">
                <img src={120} height={60} />

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
                <img src={120} height={60} />

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
                <img src={120} height={60} />

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
          </div>
        </div>
      </div>

      <div
        className="w-full h-[350px] flex justify-center items-center gap-[166px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(58, 73, 131, 0.8) 0%, rgba(90, 123, 240, 0.75) 100%)"
        }}
      >
        <div className="flex flex-col">
          <h3 className="text-white text-[64px] font-bold text-center">
            170개 +
          </h3>
          <span className="text-white text-[22px] font-medium text-center">
            COUNTRY
          </span>
        </div>

        <div className="flex flex-col">
          <h3 className="text-white text-[64px] font-bold text-center">
            280만 +
          </h3>
          <span className="text-white text-[22px] font-medium text-center">
            HOTEL
          </span>
        </div>

        <div className="flex flex-col">
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

        <div className="grid grid-cols-2 mt-7">
          <div></div>
          <div className="flex flex-col w-full">
            <div className="border border-[#5A7BF0] p-[25px] rounded-[10px]"></div>
          </div>
        </div>
      </div>
    </>
  );
}
