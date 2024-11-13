import ArrowIcon from "@/assets/icons/arrow-right.svg?react";
import LocationIcon from "@/assets/icons/location.svg?react";
import { Button, Map, Select } from "..";
import { useMemo, useState } from "react";
import { PegmanRow } from "../PegmanRow";
import { AddressRow } from "../AddressRow";
import calculateDimensions from "@/utils/calculateDimensions";

export function Navigator({ lat = "37.532600", lng = "127.024612", address }) {
  const [isStreetView, setIsStreetView] = useState(false);

  return (
    <div className="w-full flex flex-col border-t border-gray-100">
      <div className="p-5 gap-[10px]">
        <AddressRow address={address} className="mb-[14px]" />
        <PegmanRow
          onClick={() => setIsStreetView((prev) => !prev)}
          isActive={isStreetView}
        />

        {/* <Select
          placeholder="출발지를 선택해 주세요"
          className="sm:w-auto w-full"
        />
        <span className="hidden sm:block">
          <ArrowIcon />
        </span>
        <div className="sm:w-[240px] w-full h-[48px] rounded-[10px] border border-solid border-gray-100 bg-[#F3F3FB] px-4 flex items-center text-nowrap overflow-hidden">
          <span>1085 Us Highway 46 West, 07657,</span>
        </div>

        <div className="flex gap-[10px] w-full">
          <button className="h-12 sm:w-[90px] w-[40%] rounded-[10px] bg-[#C3FBFF] text-[14px]">
            도착방법
          </button>

          <button className="h-12 sm:w-[120px] w-[60%] rounded-[10px] bg-[#C3FBFF] text-[14px] flex items-center justify-center">
            <LocationIcon /> 스트리트 뷰
          </button>
        </div> */}
      </div>

      <div
        className="w-full relative"
        style={{
          paddingBottom: window.innerWidth > 640 ? "calc(100% / 1.53)" : "153%"
        }}
      >
        <div className="absolute top-0 left-0 bottom-0 right-0">
          <Map
            isStreetViewMode={isStreetView}
            coordinates={[
              {
                lat: Number(lat),
                lng: Number(lng)
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
