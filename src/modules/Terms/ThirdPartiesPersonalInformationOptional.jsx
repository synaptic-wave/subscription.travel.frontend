import kakaoTextIcon from "@/assets/icons/kakao-text.svg";

export default function ThirdPartiesPersonalInformationOption() {
  return (
    <>
      <div className="w-full flex flex-col items-center my-[91px]">
        <img src={kakaoTextIcon} />

        <div className="mt-[71px] max-w-[515px] border border-[#EAEAF4] p-[70px] w-full flex flex-col gap-6">
          <p className="text-[13px] text-[#A3A5B8]">
            핸디트립 서비스 내 이용자 식별, 회원관리 및 서비스 제공을 위해
            회원번호와 함께 abc@naver.com 님의 개인정보를 제공합니다. 해당
            정보는 동의 철회 또는 서비스 탈퇴 시 지체없이 파기됩니다. 아래
            동의를 거부할 권리가 있으며, 동의를 거부할 경우 기재된 목적의 일부
            서비스 이용이 제한될 수 있습니다.
          </p>

          <div className="h-[1px] w-full bg-[#EAEAF4]" />

          <p className="text-[13px] text-[#A3A5B8]">
            [제공 받는 자]
            <br />
            시냅틱웨이브
          </p>

          <div className="h-[1px] w-full bg-[#EAEAF4]" />

          <p className="text-[13px] text-[#A3A5B8]">
            [선택 제공 항목]
            <br />
            연령대, 프로필 사진, 닉네임
          </p>

          <p className="text-[13px] text-[#A3A5B8]">
            [제공 목적]
            <br />
            시냅틱웨이브 서비스 내 이용자 식별, 회원관리 및 서비스 제공
          </p>

          <p className="text-[13px] text-[#A3A5B8]">
            [보유 기간]
            <br />
            동의 철회 또는 서비스 탈퇴 시 지체없이 파기
          </p>
        </div>
      </div>

      <p className="mt-10 mx-auto text-center mb-[200px]">
        Copyright<strong>© Kakao Corp.</strong>All rights reserved.
      </p>
    </>
  );
}
