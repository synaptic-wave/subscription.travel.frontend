import { useEffect, useState } from "react";

import { Button, IconButton } from "..";

import StarIcon from "@/assets/icons/star.svg?react";
import ChevronUpIcon from "@/assets/icons/chevron-up.svg?react";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg?react";
import ShareIcon from "@/assets/icons/share.svg?react";
import FavouriteIcon from "@/assets/icons/favourite.svg?react";
import LocationIcon from "@/assets/icons/location.svg?react";
import HBIcon from "@/assets/icons/hb.svg?react";
import MoreIcon from "@/assets/icons/more.svg?react";
import classNames from "classnames";

import Skeleton from "react-loading-skeleton";
import FavouriteFilledIcon from "@/assets/icons/favourite-fill.svg?react";
import LocationV3Icon from "@/assets/icons/location-v3.svg?react";

import InfoIcon from "@/assets/icons/info.svg?react";
import Slider from "react-slick";
import defaultRoomImg from "@/assets/images/defaultRoom.jpg";
import searchImg from "@/assets/images/search.png";

import { Oval } from "react-loader-spinner";
import { handleErrorOnImageLoad } from "@/consts/img";

var settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  infinite: true,
  autoplaySpeed: 6000
};

export default function NotAvailableHotelCard({
  hotelContent,
  isSaved,
  handleToggleWishlist,
  hotelCode,
  wishlist,
  onChooseHotel
}) {
  const [taImages, setTaImages] = useState([]);
  const [showMap, setShowMap] = useState(false);

  const Images = Array.isArray(hotelContent?.Images?.Image)
    ? hotelContent?.Images?.Image?.map((image) => image?.FileName)?.filter(
        (url) => url
      )
    : hotelContent?.Images?.Image?.FileName
    ? [hotelContent?.Images?.Image?.FileName]?.filter((url) => url)
    : [];
  const _images = Images?.length > 0 ? Images : taImages;

  return (
    <div className="w-full flex border border-solid border-gray-100 rounded-[10px] overflow-hidden flex-col">
      <div className="w-full h-10 bg-[#FF3838] flex items-center justify-center px-[25px]">
        <p className="text-white text-left w-full">
          고객님이 검색하신 호텔 입니다.
        </p>
      </div>
      <div className="w-full flex h-full flex-col sm:flex-row">
        <div className="sm:w-[27%] w-full min-w-full sm:min-w-[27%] sm:h-[240px] h-[120px]">
          {_images?.length > 1 ? (
            <Slider {...settings}>
              {_images?.map((img, idx) => (
                <img
                  src={img || defaultRoomImg}
                  className="object-cover w-full sm:h-[240px] h-[120px]"
                  onError={handleErrorOnImageLoad}
                  key={idx}
                />
              ))}
            </Slider>
          ) : _images?.length === 1 ? (
            <img
              src={_images[0]}
              onError={handleErrorOnImageLoad}
              className="object-cover w-full sm:h-[240px] h-[120px]"
            />
          ) : (
            <img
              src={defaultRoomImg}
              onError={handleErrorOnImageLoad}
              className="object-cover w-full sm:h-[240px] h-[120px]"
            />
          )}
        </div>

        <div className="flex w-full sm:w-[43%] flex-col md:px-5 md:py-2 p-3">
          {/* Row one */}
          <div className="w-full flex justify-between items-start">
            <div className="flex flex-col">
              <h3 className="md:text-[20px] text-[15px] w-full font-medium">
                <button
                  onClick={onChooseHotel}
                  className="text-left w-full truncate sm:text-wrap"
                >
                  {hotelContent?.HotelInfo?.Name}
                </button>
              </h3>

              <h3 className="md:text-[20px] text-[15px] w-full font-medium">
                <button
                  onClick={onChooseHotel}
                  className="text-left w-full truncate sm:text-wrap"
                >
                  {hotelContent?.HotelInfo?.NameEn}
                </button>
              </h3>
            </div>
          </div>

          {/* Row two */}
          <div className="w-full flex justify-between mt-[5px] sm:mt-[10px] md:flex-row flex-col">
            <div className="md:w-[60%] w-full flex flex-col">
              <button
                className="flex gap-1 items-center text-[#5C5F79] text-[13px] underline"
                onClick={() => setShowMap((prev) => !prev)}
              >
                <LocationIcon className="min-w-[18px]" />{" "}
                <span className="truncate">
                  {hotelContent?.HotelInfo?.Address}
                </span>
              </button>

              <div className="flex items-center mt-[5px] sm:mt-[15px] min-h-[30px] min-w-[100px]">
                <p className="text-sm mr-1">고객평점</p>
                <HBIcon />

                <div className="flex items-center ml-2 gap-[2px]">
                  {Array(Math.floor(5 || 0))
                    ?.fill(1)
                    ?.map((_) => (
                      <span className="md:w-[16px] md:h-[16px] w-[9.8px] h-[9.8px] border border-solid border-[#00AA6C] rounded-xl bg-[#00AA6C]"></span>
                    ))}

                  {Array(5 - Math.floor(5 || 0))
                    ?.fill(1)
                    ?.map((_) => (
                      <span className="md:w-[16px] md:h-[16px] w-[9.8px] h-[9.8px] border border-solid border-[#00AA6C] rounded-xl bg-white"></span>
                    ))}
                </div>

                {/* <span className="ml-2 text-[12px] text-[#333333]">
                {isLoadingReview ? (
                  <Skeleton height={13} width={30} />
                ) : taComments > 0 ? (
                  <NumericFormat
                    value={taComments}
                    thousandSeparator
                    displayType="text"
                  />
                ) : (
                  <></>
                )}
              </span> */}
              </div>

              {/* {isLoadingReview ? (
              <div className="h-[19.5px] md:w-auto md:h-auto">
                <Skeleton height={13} width={160} />
              </div>
            ) : (
              <p className="mt-[5px] more-dots text-[13px] text-[#161A3F] h-[19.5px] md:w-auto md:h-auto">
                {hotelStyles ? "호텔스타일 :" : ""} {hotelStyles}
              </p>
            )} */}
            </div>
          </div>

          {/* Row three */}
          <div className="w-full flex gap-1 sm:gap-0 sm:justify-between mt-[5px] sm:mt-[15px] flex-wrap">
            <div className="flex gap-1 sm:gap-2">
              <IconButton
                onClick={() => handleToggleWishlist(hotelCode)}
                icon={
                  wishlist?.includes(hotelCode) ? (
                    <FavouriteFilledIcon />
                  ) : (
                    <FavouriteIcon />
                  )
                }
                active={isSaved}
              />

              {/* <IconButton
                icon={<ShareIcon />}
                //   onClick={toggleShareModal}
                //   active={showShareModal}
              />

              <IconButton
                icon={<InfoIcon />}
                //   active={showDetailPopup}
                //   onClick={() => setShowDetailPopup((prev) => !prev)}
              />

              <IconButton
                icon={showMap ? <LocationIcon /> : <LocationV3Icon />}
                onClick={() => setShowMap((prev) => !prev)}
                className="sm:hidden w-[36px] h-[36px] flex items-center justify-center"
              /> */}
              {/* 
              <button
                className="text-sm py-[10px] px-[16px] rounded-[10px] border border-gray-100 sm:block hidden"
                onClick={() => setShowMap((prev) => !prev)}
              >
                위치보기
              </button> */}
            </div>
          </div>
        </div>

        <div className="sm:w-[30%] w-[100%] sm:h-[240px] h-[115px] relative flex items-center">
          <img
            src={searchImg}
            className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
          />

          <p className="text-[#3F1616] text-[22px] z-10 mt-3 font-medium">
            검색한 조건에 맞는
            <br /> 객실이 없습니다.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
