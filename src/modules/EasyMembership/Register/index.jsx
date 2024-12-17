import { Header } from "@/components/Header";
import Tabs from "./components/Tabs";
import { Title } from "./components/Title";
import { MemberInformation } from "./components/Steps/Information";

const StepComponents = {
  0: MemberInformation
};

export default function EasyMembershipRegister() {
  const activeStep = 0;

  const StepComponent = StepComponents[activeStep || 0];

  return (
    <>
      <Header />
      <Title title="구독서비스 가입" />
      <Tabs activeStep={activeStep} />
      <StepComponent />
    </>
  );
}
