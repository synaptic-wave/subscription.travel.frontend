import { useState } from "react";
import { Agreement } from "./Agreement";
import { MembershipForm } from "./MembershipForm";

const STEPS = {
  AUTH: "auth",
  AGREEMENT: "agreement",
  FORM: "form"
};

export const KakaoMembership = ({ onSubmitForm }) => {
  const [step, setStep] = useState(STEPS.AGREEMENT);

  console.log(onSubmitForm);
  const handleSubmitAgreement = () => {
    setStep(STEPS.FORM);
  };

  const handleSubmit = (vals) => {
    onSubmitForm(vals);
  };

  if (step === STEPS.AGREEMENT) {
    return <Agreement handleSubmit={handleSubmitAgreement} />;
  }

  if (step === STEPS.FORM) {
    return <MembershipForm onClick={handleSubmit} />;
  }

  return (
    <div className="w-full flex items-center mt-[110px] gap-4 flex-col min-h-[60vh]">
      <p>Kakao</p>

      <div className="w-full flex flex-col max-w-[680px]"></div>
    </div>
  );
};
