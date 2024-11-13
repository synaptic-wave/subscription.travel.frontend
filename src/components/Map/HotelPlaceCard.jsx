import { NumericFormat } from "react-number-format";
import { Button } from "..";
import HBIcon from "@/assets/icons/hb.svg?react";
import tiktok from "@/assets/icons/tiktok.svg";
import { useRef } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { handleErrorOnImageLoad } from "@/consts/img";

export const HotelPlaceCard = ({
  image,
  name,
  nameEn,
  address,
  onClick,
  rating,
  reviewsCount,
  onClose,
  onOpenTikTok
}) => {
  const ref = useRef();

  useOutsideClick(ref, onClose);

  return (
    <div
      className="flex flex-col p-0 cursor-pointer"
      ref={ref}
      onClick={onClick}
    >
      <img
        src={image}
        width={180}
        height={100}
        onError={handleErrorOnImageLoad}
        className="object-cover max-h-[100px]"
      />

      <span className="more_dots max-w-[180px] text-sm mt-1 font-bold cursor-pointer">
        <strong>{name}</strong>
      </span>

      {nameEn && (
        <span className="more_dots max-w-[180px] text-sm font-bold cursor-pointer">
          <strong>{nameEn}</strong>
        </span>
      )}

      {rating && (
        <div className="flex items-center mt-1 gap-[6px]">
          <HBIcon />
          <div className="flex items-center gap-[2px]">
            {Array.from(
              Array(rating > 5 ? 5 : Math.floor(rating || 0)).keys()
            ).map((value) => (
              <div
                className="rounded-full w-[12px] h-[12px] bg-[#00AA6C] border border-[#00AA6C]"
                key={value}
              ></div>
            ))}

            {Array.from(
              Array(5 - (rating > 5 ? 5 : Math.floor(rating || 0))).keys()
            ).map((value) => (
              <div
                className="rounded-full w-[12px] h-[12px] bg-white border border-[#00AA6C]"
                key={value}
              ></div>
            ))}
          </div>
          <p className="text-xs text-[#333333]">
            <NumericFormat
              displayType="text"
              value={reviewsCount}
              thousandSeparator
            />
          </p>
        </div>
      )}
      <span className="text-xs text-[#888888] max-w-[180px] mt-1">
        {address}
      </span>
      {name === "스노우폭스- 선릉역점" && (
        <button onClick={onOpenTikTok} className="flex mt-1">
          <img src={tiktok} className="w-[24px] h-[24px] object-contain" />
        </button>
      )}
    </div>
  );
};
