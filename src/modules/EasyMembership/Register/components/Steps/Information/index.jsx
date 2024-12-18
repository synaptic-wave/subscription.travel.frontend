import { useState } from "react";
import { RegistrationList } from "./RegistrationList";
import KakaoIcon from "@/assets/icons/kakao.svg?react";
import GoogleIcon from "@/assets/icons/google.svg?react";
import MembershipIcon from "@/assets/icons/membership.svg?react";
import { KakaoMembership } from "./MembershipTypes/Kakao";

const memberTypes = {
  KAKAO: "kakao",
  GOOGLE: "google",
  GENERAL: "general"
};

const registrationsList = [
  {
    icon: <KakaoIcon />,
    name: "카카오톡 계정으로 회원가입",
    value: memberTypes.KAKAO
  },
  {
    icon: <GoogleIcon />,
    name: "구글 계정으로 회원가입",
    value: memberTypes.GOOGLE
  },
  {
    icon: <MembershipIcon />,
    name: "일반 회원가입",
    value: memberTypes.GENERAL
  }
];

const Components = {
  [memberTypes.KAKAO]: KakaoMembership
};

export const MemberInformation = () => {
  const [memberType, setMemberType] = useState();

  const handleSelectMembership = (val) => {
    setMemberType(val);
  };

  const MembershipComponent = Components[memberType];

  if (memberType) {
    return <MembershipComponent />;
  }

  return (
    <RegistrationList
      items={registrationsList}
      onSelect={handleSelectMembership}
    />
  );
};
