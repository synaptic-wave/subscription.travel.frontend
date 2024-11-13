import Skeleton from "react-loading-skeleton";
import { IconButton } from "..";

import ShareIcon from "@/assets/icons/share.svg?react";
import FavouriteIcon from "@/assets/icons/favourite.svg?react";
import LocationIcon from "@/assets/icons/location.svg?react";
import HBIcon from "@/assets/icons/hb.svg?react";

export default function HotelGridCardSkeleton() {
  return (
    <div className="w-full flex border border-solid border-gray-100 rounded-[10px] overflow-hidden flex-col">
      <div className="w-full flex flex-col">
        <div className="w-full h-[240px] max-h-[240px] overflow-hidden">
          <Skeleton width="100%" height={240} />
        </div>

        <div className="flex flex-1 flex-col p-5">
          {/* Row one */}
          <div className="w-full flex justify-between">
            <h3 className=" text-[20px] font-medium">
              <Skeleton width={150} height={20} />
            </h3>
          </div>

          <div className="w-full flex flex-col mt-[10px]">
            <div className="w-full flex flex-col">
              <span className="flex items-center text-[#5C5F79] text-[13px]">
                <LocationIcon /> 리지필드 - 지도
              </span>

              <div className="flex items-center mt-[15px]">
                <HBIcon />

                <div className="flex items-center ml-2 gap-[2px]">
                  {Array(Math.floor(4))
                    .fill(1)
                    .map((_) => (
                      <span className="w-[16px] h-[16px] border border-solid border-[#00AA6C] rounded-xl bg-[#00AA6C]"></span>
                    ))}
                  {Array(5 - Math.floor(4))
                    .fill(1)
                    .map((_) => (
                      <span className="w-[16px] h-[16px] border border-solid border-[#00AA6C] rounded-xl bg-white"></span>
                    ))}
                </div>

                <span className="ml-2 text-[12px] text-[#333333]">
                  <Skeleton width={100} height={12} />
                </span>
              </div>
            </div>

            <div className="w-full flex mt-[15px] gap-2">
              <IconButton icon={<FavouriteIcon />} />
              <IconButton icon={<ShareIcon />} />
              <IconButton
                icon={<p className="text-[14px] text-[#161A3F]">가격비교</p>}
                className="w-[83px]"
              />
            </div>

            <div className="w-full flex flex-col items-start mt-5">
              <div className="flex justify-end items-center">
                <span className="text-[22px] font-bold">
                  <Skeleton width={60} height={22} />
                </span>
                <span className="text-[20px] ml-1"> 원</span>
              </div>

              <p className="text-[12px] mt-1 text-[#5C5F79]">
                1박 최저가, 성인 2명 기준
              </p>

              <p className="text-[11px] mt-1 text-[#087671]">
                세금 및 기타 요금 포함
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
