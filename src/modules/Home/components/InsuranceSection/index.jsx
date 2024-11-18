import { useState } from "react";

import { useGetSections } from "@/services/section.service";

import bannerImg from "@/assets/images/insurance_banner.png";
import { InsuranceForm } from "../InsuranceForm";
import { Banner } from "../Banner";
import { NoRoomDialog } from "@/modules/SearchResult/components/NoRoomDialog";
import { SearchDialog } from "@/modules/SearchResult/components/SearchDialog";
import { SalesBanner } from "../SalesBanner";
import { RecommendedTravel } from "../RecommendedTravel";

export function Insurance() {
  const [isOpenNotFound, setIsOpenNotFound] = useState(false);
  const [isOpenSearchHotel, setIsOpenSearchHotel] = useState(false);
  const { data } = useGetSections({
    params: {
      page: 1,
      page_size: 1000,
      sortBy: "order:asc"
    }
  });

  return (
    <>
      <div className="container">
        <InsuranceForm
          setIsOpenNotFound={setIsOpenNotFound}
          setIsOpenSearchHotel={setIsOpenSearchHotel}
          recommendedLocations={data?.results?.find(
            (item) => item.template === "group-card"
          )}
        />

        <Banner
          img={bannerImg}
          content={
            <>
              <p className="text-[48px] leading-[64px] font-bold text-primary mb-[2px]">
                여행자 보험 비교하고 캐시백 받자!
              </p>
              <p className="text-[28px] leading-[37px]">
                가입한 여행자 보험 결제 금액 중 일부
              </p>
              <p className="text-[28px] leading-[37px]">마일리지 적립</p>
            </>
          }
        />
        <SalesBanner />
        <RecommendedTravel
          recommendedLocations={data?.results?.find(
            (item) => item.template === "group-card"
          )}
        />
      </div>

      <NoRoomDialog
        isOpen={isOpenNotFound}
        onClose={() => setIsOpenNotFound(false)}
      />
      <SearchDialog
        isOpen={isOpenSearchHotel}
        onClose={() => setIsOpenSearchHotel(false)}
      />
    </>
  );
}
