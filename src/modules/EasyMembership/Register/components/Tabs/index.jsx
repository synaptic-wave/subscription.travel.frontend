import { Stepper } from "react-form-stepper";

const steps = [
  { label: "회원정보" },
  { label: "결제하기" },
  { label: "가입완료" }
];

export default function Tabs({ activeStep }) {
  return (
    <Stepper
      steps={steps}
      activeStep={activeStep}
      connectorStateColors={activeStep}
      stepClassName="border border-primary-600"
      width={50}
      height={50}
      styleConfig={{
        activeBgColor: "#5A7BF0",
        activeTextColor: "#fff",
        completedBgColor: "#5A7BF0",
        completedTextColor: "#fff",
        fontWeight: "500",
        labelFontSize: "16px",
        inactiveBgColor: "#C8CADA",
        inactiveTextColor: "#fff",
        size: "50px"
      }}
      connectorStyleConfig={{
        completedColor: "#5A7BF0",
        disabledColor: "#EAEAF4",
        activeColor: "#5A7BF0"
      }}
    />
  );
}
