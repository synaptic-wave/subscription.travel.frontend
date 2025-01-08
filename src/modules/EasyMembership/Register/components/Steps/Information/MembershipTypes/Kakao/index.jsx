import { useState } from "react";
import { Agreement } from "./Agreement";
import { MembershipForm } from "./MembershipForm";

const STEPS = {
  AUTH: "auth",
  AGREEMENT: "agreement",
  FORM: "form"
};

export const KakaoMembership = () => {
  const [step, setStep] = useState(STEPS.AGREEMENT);

  const handleSubmitAgreement = () => {
    setStep(STEPS.FORM);
  };

  if (step === STEPS.AGREEMENT) {
    return <Agreement handleSubmit={handleSubmitAgreement} />;
  }

  if (step === STEPS.FORM) {
    return <MembershipForm />;
  }

  return (
    <div className="w-full flex items-center mt-[110px] gap-4 flex-col min-h-[60vh]">
      <p>Kakao</p>

      <div className="w-full flex flex-col max-w-[680px]"></div>
    </div>
  );
};
