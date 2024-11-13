import PegmanIcon from "@/assets/icons/pegman.svg?react";
import pegman from "@/assets/images/pegman2.png";
import LocationV2Icon from "@/assets/icons/location-v2.svg?react";
import LocationWhiteIcon from "@/assets/icons/location-white.svg?react";
import classNames from "classnames";

export function PegmanRow({
  onClick,
  className,
  isActive,
  hideViewLocationArround = false
}) {
  return (
    <div
      className={classNames(
        "flex sm:items-center gap-1 sm:gap-[10px] sm:flex-row flex-col items-start",
        className
      )}
    >
      <div className="flex gap-[5px] sm:gap-[10px] items-center ">
        <div className="min-w-[36px] min-h-[36px] rounded-full flex items-center justify-center bg-[#F3F3FB]">
          <img src={pegman} className="w-[20px] h-[24px] object-contain" />
          {/* <PegmanIcon /> */}
        </div>
        <p className="text-xs sm:text-sm flex flex-wrap">
          지도 오른쪽 아래의&nbsp;
          <span className="text-[#FF3838] font-bold">사람 모양 아이콘</span>
          &nbsp;
          <img src={pegman} className="w-[16px] h-[19px] object-contain" /> 을
          원하는 위치에 가져가 보세요! 해당 지역을 3D 사진으로 자세히 보실 수
          있습니다.
        </p>
      </div>

      {!hideViewLocationArround && (
        <button
          variant="outlined"
          onClick={onClick}
          className={classNames(
            "text-sm border-2 py-[7px] sm:py-[13px] px-[16px] rounded-[10px] flex items-center gap-1 w-full mt-[14px] sm:mt-0 justify-center sm:justify-normal sm:w-auto min-w-[150px]",
            {
              "bg-[#0074DB] text-[#fff] border-[transparent]": isActive,
              "bg-white text-[#0074DB] border-[#0074DB]": !isActive
            }
          )}
        >
          {isActive ? <LocationWhiteIcon /> : <LocationV2Icon />}
          호텔 주변보기
        </button>
      )}
    </div>
  );
}
