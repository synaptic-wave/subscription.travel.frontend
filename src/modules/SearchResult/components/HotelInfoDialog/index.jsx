import { Dialog, SliderNextArrow, SliderPrevArrow } from "@/components/index";
import Slider from "react-slick";
import classNames from "classnames";
import { Facilities } from "@/modules/HotelSingle/components/Facilities";
import useTranslate from "@/hooks/useTranslate";
import Skeleton from "react-loading-skeleton";
import { NumericFormat } from "react-number-format";
import HBIcon from "@/assets/icons/hb.svg?react";
import LocationIcon from "@/assets/icons/location.svg?react";
import { handleErrorOnImageLoad } from "@/consts/img";

var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SliderNextArrow arrowClassName="right-[30px]" />,
  prevArrow: <SliderPrevArrow arrowClassName="left-[30px]" />
};

export function HotelInfoDialog({
  isOpen,
  onClose,
  name,
  description,
  images,
  features,
  taRating,
  location,
  isLoadingReview,
  taComments
}) {
  const { data } = useTranslate(description);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className={classNames(
        "w-[100%] sm:py-[31px] sm:px-[25px] p-5",
        images ? "sm:w-[550px]" : "sm:w-[500px]"
      )}
    >
      <h2 className="text-[15px] sm:text-[17px] leading-[22px] font-medium">
        {name}
      </h2>
      <div className="flex items-center mt-[5px] sm:mt-[7px] min-h-[30px] min-w-[100px]">
        {taRating && <HBIcon />}

        {isLoadingReview ? (
          <div className="flex items-center ml-2">
            <Skeleton height={13} width={100} />
          </div>
        ) : (
          taRating && (
            <div className="flex items-center ml-2 gap-[2px]">
              {Array(Math.floor(taRating || 0))
                ?.fill(1)
                ?.map((_) => (
                  <span className="md:w-[16px] md:h-[16px] w-[9.8px] h-[9.8px] border border-solid border-[#00AA6C] rounded-xl bg-[#00AA6C]"></span>
                ))}

              {Array(5 - Math.floor(taRating || 0))
                ?.fill(1)
                ?.map((_) => (
                  <span className="md:w-[16px] md:h-[16px] w-[9.8px] h-[9.8px] border border-solid border-[#00AA6C] rounded-xl bg-white"></span>
                ))}
            </div>
          )
        )}

        <span className="ml-2 text-[12px] text-[#333333]">
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
        </span>
      </div>
      {images && (
        <div className="mb-3 sm:mb-5 sm:mt-4 mt-[18px]">
          <Slider {...settings}>
            {images.map((image) => (
              <div className="h-[262px] sm:h-[375px]">
                <img
                  onError={handleErrorOnImageLoad}
                  className="w-full h-full object-cover rounded-[10px]"
                  src={image}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      <div className="flex gap-1 items-center text-[#5C5F79] text-[13px]">
        <LocationIcon className="min-w-[18px]" />{" "}
        <span className="truncate">{location}</span>
      </div>
      <p className="text-[#5C5F79] text-[13px] mt-[17px]">
        {data?.data?.data?.translations?.[0]?.translatedText || description}
      </p>

      {features?.length > 0 && (
        <Facilities
          features={features}
          className="border-0"
          style={{ padding: "0", marginTop: "25px" }}
        />
      )}
    </Dialog>
  );
}
