import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { SubHeader } from "./components/SubHeader";
import Tabs from "@/components/Tabs";
import { Hotel } from "./Hotel";
import { Aviation } from "./Aviation";
import { Insurance } from "./components/InsuranceSection";

const elements = [
  {
    label: "숙소"
  },
  {
    label: "항공"
  },
  {
    label: "여행자보험"
  }
];

const renderer = {
  0: Hotel,
  1: Aviation,
  2: Insurance
};

export function Home() {
  const [activeTab, setActiveTab] = useState(0);

  const onChangeTab = (index) => {
    setActiveTab(index);
  };

  const Component = renderer[activeTab];

  return (
    <>
      <Header />
      <SubHeader />
      {/* <div className="container pt-[26px]">
        <Tabs
          activeIndex={activeTab}
          onChangeTab={onChangeTab}
          elements={elements}
        />
      </div> */}

      <div className="py-[28px]">
        <div className="w-full">
          <iframe
            className="w-full"
            style={{
              width: "100%",
              height: "100vh"
            }}
            src="https://b2b.oaas.co.kr/air_oaas/AirRevV2/AirSearch.html?pid=OY01375&mid=12312312&ts=NO#"
          />
        </div>
        <Component />
      </div>
    </>
  );
}
