import classNames from "classnames";
import InfoIcon from "@/assets/icons/info.svg?react";
import Skeleton from "react-loading-skeleton";
import { AddToCart } from "../AddToCart";
import { Button, IconButton } from "..";
import StarIcon from "@/assets/icons/star.svg?react";
import ChevronIcon from "@/assets/icons/chevron-up.svg?react";
import ShareIcon from "@/assets/icons/share.svg?react";
import FavouriteIcon from "@/assets/icons/favourite.svg?react";
import LocationIcon from "@/assets/icons/location.svg?react";
import HBIcon from "@/assets/icons/hb.svg?react";

export default function HotelRowCardSkeleton() {
  return (
    <div className="w-full flex border border-solid border-gray-100 rounded-[10px] overflow-hidden flex-col">
      <div className="w-full flex h-full">
        <div className="sm:w-[27%] w-[32%] min-w-[32%] sm:min-w-[27%] sm:h-[266px] h-[340px] hidden sm:block">
          <Skeleton width={246} height={400} />
        </div>

        <div className="md:w-[240px] w-[120px] min-w-[120px] sm:hidden block">
          <Skeleton width={120} height={275} />
        </div>

        <div className="flex flex-1 flex-col md:p-5 p-3">
          {/* Row one */}
          <div className="w-full flex justify-between">
            <h3 className="md:text-[20px] text-[15px] font-medium sm:block hidden">
              <Skeleton width={300} height={20} />
            </h3>

            <h3 className="md:text-[20px] text-[15px] font-medium sm:hidden block">
              <Skeleton width={100} height={20} />
            </h3>

            <div className="md:flex hidden items-center justify-end">
              {Array(5)
                .fill(1)
                .map((_) => (
                  <StarIcon />
                ))}
            </div>
          </div>

          {/* Row two */}
          <div className="w-full flex justify-between mt-[10px] md:flex-row flex-col">
            <div className="md:w-[60%] w-full flex flex-col">
              <button className="flex items-center text-[#5C5F79] text-[13px] underline">
                <LocationIcon /> <Skeleton width={200} height={13} />
              </button>

              <div className="flex items-center mt-[15px]">
                <HBIcon />

                <div className="flex items-center ml-2 gap-[2px]">
                  {Array(Math.floor(4))
                    .fill(1)
                    .map((_) => (
                      <span className="md:w-[16px] md:h-[16px] w-[9.8px] h-[9.8px] border border-solid border-[#00AA6C] rounded-xl bg-[#00AA6C]"></span>
                    ))}

                  {Array(5 - Math.floor(4))
                    .fill(1)
                    .map((_) => (
                      <span className="md:w-[16px] md:h-[16px] w-[9.8px] h-[9.8px] border border-solid border-[#00AA6C] rounded-xl bg-white"></span>
                    ))}

                  {/* <span className="ml-2 text-[12px] text-[#333333]">
                    <Skeleton height={13} width={30} />
                  </span> */}
                </div>

                <span className="ml-2 text-[12px] text-[#333333]">
                  <Skeleton width={60} height={12} />
                </span>
              </div>

              <div className="mt-[5px] sm:mt-[14px] h-[19.5px] more-dots-1 max-h-[20px]">
                <Skeleton height={13} width={200} />
              </div>

              <div className="h-[19.5px] md:w-auto md:h-auto">
                <Skeleton height={13} width={160} />
              </div>

              {/* <p className="mt-5 more-dots text-[13px] text-[#5C5F79] w-0 h-0 md:w-auto md:h-auto">
                <Skeleton width={250} height={13} />
              </p> */}
            </div>

            <div className="md:w-[40%] w-full flex flex-col md:items-end items-start">
              <div className="flex justify-end items-center">
                <span className="text-[22px] font-bold">
                  <Skeleton width={100} height={22} />
                </span>
                <span className="text-[20px] ml-1"> 원</span>
              </div>

              <p className="text-[12px] mt-1 text-[#5C5F79]">
                1박 최저가, 성인 2명 기준
              </p>

              <p className={classNames("text-[11px] mt-1 text-[#087671]")}>
                세금 및 기타 요금 포함
                {/* {boardTypeLabel} */}
              </p>
            </div>
          </div>

          {/* Row three */}
          <div className="w-full flex justify-between mt-[15px]">
            <div className="flex gap-2">
              <IconButton icon={<FavouriteIcon />} active={false} />
              <IconButton icon={<ShareIcon />} />
              <IconButton icon={<InfoIcon />} />
              <IconButton
                icon={<p className="text-[14px] text-[#161A3F]">호텔비교</p>}
                className={classNames(
                  "w-[83px] hidden sm:flex items-center justify-center"
                )}
                style={{
                  borderRadius: 8,
                  border: "1px solid rgb(234, 234, 244)"
                }}
              />
            </div>

            <div className="flex gap-1 sm:gap-2">
              <IconButton
                icon={<LocationIcon />}
                className="sm:hidden w-[36px] h-[36px] flex items-center justify-center"
              />
              <button className="text-sm py-[10px] px-[16px] rounded-[10px] border border-gray-100 sm:block hidden">
                위치보기
              </button>
              <IconButton
                icon={
                  <div className="flex justify-center">
                    <p className="text-[14px] text-[#2D40FF]">객실보기</p>
                    <ChevronIcon />
                  </div>
                }
                className="w-[100px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <ul className="w-full m-0 p-0 list-none">
        <li className="w-full">
          <VariantItem />
        </li>
      </ul> */}
    </div>
  );
}

function VariantItem() {
  return (
    <div className="w-full flex sm:flex-row flex-col p-5 justify-between border-t border-solid border-gray-100">
      <div className="flex flex-col">
        <p className="w-[300px] h-[24px]">
          <Skeleton />
        </p>

        <div className="flex items-center ml-[-5px]">
          <div className="flex items-center gap-3">
            <Skeleton circle width={20} height={20} />
            <Skeleton width={80} height={20} />
          </div>
        </div>

        <span className={classNames("text-[#0066FF] mt-[8.5px] text-[13px]")}>
          <Skeleton width={100} height={20} />
        </span>
      </div>

      <div className="flex items-center justify-end gap-12">
        <div className="flex flex-col items-end">
          <div className="flex justify-end items-center">
            <span className="sm:text-[22px] text-[20px] font-bold">
              <Skeleton width={50} height={20} />
            </span>
            <span className="sm:text-[20px] text-[18px] ml-1"> 원</span>
          </div>

          <p className="text-[12px] mt-1 text-[#5C5F79]">
            <Skeleton width={70} height={12} />
          </p>

          <p className={classNames("text-[11px] mt-1 text-[#087671]")}>
            <Skeleton width={100} height={11} />
            {/* {selectedVariant?.Board.value} */}
          </p>
          <div className="flex items-center gap-3 mt-4">
            <AddToCart />
            <Button>인증번호 전송</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
