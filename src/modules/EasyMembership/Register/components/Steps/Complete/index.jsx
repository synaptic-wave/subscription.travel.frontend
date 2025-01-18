import { Button } from "@/components/index";

const TickIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <g clip-path="url(#clip0_5009_8206)">
      <path
        d="M20.0007 3.33301C10.8007 3.33301 3.33398 10.7997 3.33398 19.9997C3.33398 29.1997 10.8007 36.6663 20.0007 36.6663C29.2007 36.6663 36.6673 29.1997 36.6673 19.9997C36.6673 10.7997 29.2007 3.33301 20.0007 3.33301ZM16.6673 28.333L8.33398 19.9997L10.684 17.6497L16.6673 23.6163L29.3173 10.9663L31.6673 13.333L16.6673 28.333Z"
        fill="#CEDC00"
      />
    </g>
    <defs>
      <clipPath id="clip0_5009_8206">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const CompleteRegistration = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-6 mt-[110px] min-h-[60vh] mx-auto items-center max-w-[375px]">
        <TickIcon />

        <h1 className="text-2xl text-[#161A3F] font-medium">회원 가입 완료</h1>
        <p className="text-center text-lg font-normal">
          축하 합니다. 정기구독 서비스 신청이 완료 됐습니다. 이제 멤버십만의
          다양한 혜택을 누려 보세요!
        </p>

        <Button className="w-full mt-6">홈으로 가기</Button>

        <h2 className="text-2xl text-[#161A3F] mt-8 font-medium">
          나의 추천 코드
        </h2>

        <p className="text-[#5C5F79] text-lg font-normal">sw241104m007124</p>

        <ul className="list-disc text-[#DC231E] text-[13px]">
          <li>친구에게 나의 추천코드를 알리고 추가 혜택을 받으세요!</li>
          <li>
            나의 추천코드는 마이페이지 나의 추천코드에서도 확인할 수 있습니다.
          </li>
        </ul>

        <div className="border border-[#EAEAF4] flex gap-3 justify-between max-w-[375px] mb-[300px]">
          <span className="flex-1 px-[9px] py-[14px] max-w-[75%] overflow-hidden text-[#5A7BF0] text-sm font-normal">
            https://handytrip.kr/membercode0121424
          </span>

          <Button className="w-[87px]">복사</Button>
        </div>
      </div>
    </>
  );
};
