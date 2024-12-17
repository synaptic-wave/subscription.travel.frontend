import KakaoIcon from "@/assets/icons/kakao.svg?react";
import GoogleIcon from "@/assets/icons/google.svg?react";
import MembershipIcon from "@/assets/icons/membership.svg?react";

export const RegistrationList = () => {
  return (
    <div className="w-full flex items-center mt-[110px] gap-4 flex-col min-h-[60vh]">
      <button className="w-100% w-[375px] px-4 py-3 border border-[#EAEAF4] flex items-center justify-center relative">
        <span className="absolute left-4">
          <KakaoIcon />
        </span>
        <span className="text-[15px] font-normal">
          카카오톡 계정으로 회원가입
        </span>
      </button>

      <button className="w-100% w-[375px] px-4 py-3 border border-[#EAEAF4] flex items-center justify-center relative">
        <span className="absolute left-4">
          <GoogleIcon />
        </span>
        <span className="text-[15px] font-normal">구글 계정으로 회원가입</span>
      </button>

      <button className="w-100% w-[375px] px-4 py-3 border border-[#EAEAF4] flex items-center justify-center relative">
        <span className="absolute left-4">
          <MembershipIcon />
        </span>
        <span className="text-[15px] font-normal">일반 회원가입</span>
      </button>
    </div>
  );
};
