import { Header } from "@/components/Header";
import Tabs from "./components/Tabs";
import { Title } from "./components/Title";
import { MemberInformation } from "./components/Steps/Information";
import { useState } from "react";
import { PaymentInformation } from "./components/Steps/Payment";
import { CompleteRegistration } from "./components/Steps/Complete";

const StepComponents = {
  0: MemberInformation,
  1: PaymentInformation,
  2: CompleteRegistration
};

export default function EasyMembershipRegister() {
  const [activeStep, setActiveStep] = useState(0);

  const handleSubmitPersonalForm = () => {
    setActiveStep(1);
  };

  const handleSubmitPayment = () => {
    setActiveStep(2);
  };

  const StepComponent = StepComponents[activeStep || 0];

  return (
    <>
      <Header />
      <Title title="구독서비스 가입" />
      <Tabs activeStep={activeStep} />
      <StepComponent
        onSubmitForm={handleSubmitPersonalForm}
        onSubmitPayment={handleSubmitPayment}
      />
    </>
  );
}
