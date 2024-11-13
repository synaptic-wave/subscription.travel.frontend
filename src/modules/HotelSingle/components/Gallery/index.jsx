import Slider from "react-slick";
import GalleryIcon from "@/assets/icons/gallery.svg?react";
import WarningIcon from "@/assets/icons/warning.svg?react";
import {
  Dialog,
  Modal,
  SliderNextArrow,
  SliderPrevArrow
} from "@/components/index";
import { useRef, useState } from "react";
import HBIcon from "@/assets/icons/hb.svg?react";
import PerfectScrollbar from "react-perfect-scrollbar";
import classNames from "classnames";
import { handleErrorOnImageLoad } from "@/consts/img";
import Skeleton from "react-loading-skeleton";

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "100px",
  slidesToShow: 3,
  speed: 500,
  nextArrow: <SliderNextArrow arrowClassName="sm:right-[30px] right-[15px]" />,
  prevArrow: <SliderPrevArrow arrowClassName="sm:left-[30px] left-[15px]" />,
  responsive: [
    {
      breakpoint: 640,
      settings: {
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 800,
      settings: {
        centerMode: false,
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
};

export function Gallery({
  images,
  rating,
  hotelName,
  specialMarkup,
  isLoading
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  let sliderRef = useRef(null);
  const onChangeIndex = (idx) => {
    sliderRef.slickGoTo(idx);
    setIndex(idx);
  };

  const settings2 = {
    infinite: false,
    slidesToShow: 1,
    speed: 500,
    nextArrow: <SliderNextArrow arrowClassName="right-[30px]" />,
    prevArrow: <SliderPrevArrow arrowClassName="left-[30px]" />,
    beforeChange: (current, next) => setIndex(next),
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (isLoading) return <GallerySkeleton />;

  return (
    <div className="overflow-hidden relative gallery sm:w-full w-[95%] mx-auto">
      {images?.length > 1 && (
        <Slider {...settings}>
          {images?.map((image, idx) => (
            <div className="sm:h-[320px] h-[180px] sm:px-[5px]" key={idx}>
              <img
                src={image}
                onError={handleErrorOnImageLoad}
                className="w-full h-full object-cover rounded-xl sm:rounded-none"
              />
            </div>
          ))}
        </Slider>
      )}
      {/* {images?.length === 0 && (
        <div className='sm:h-[320px] h-[180px] sm:px-[5px] max-w-[500px] mx-auto'>
          <img
            src={import.meta.env.VITE_EMPTY_HOTEL_IMAGE_URL}
            className='w-full h-full object-cover rounded-xl sm:rounded-none'
          />
        </div>
      )} */}
      {images?.length === 1 && (
        <div className="sm:h-[320px] h-[180px] sm:px-[5px] max-w-[500px] mx-auto">
          <img
            onError={handleErrorOnImageLoad}
            src={images[0]}
            className="w-full h-full object-cover rounded-xl sm:rounded-none"
          />
        </div>
      )}
      {specialMarkup && (
        <img
          src={specialMarkup.imageURL.browser}
          className="w-[35px] h-[43px] sm:w-[50px] sm:h-[65px] object-contain left-[10px] top-[10px] sm:left-[130px] sm:top-[30px] absolute"
        />
      )}
      <button
        onClick={() => setIsOpen(true)}
        className="sm:rounded-[100px] rounded-[10px] bg-white absolute sm:bottom-[20px] sm:right-[120px] bottom-[18px] right-[15px] flex items-center gap-1 sm:py-[13px] py-[7px] sm:px-[17px] px-[5px] sm:text-sm text-[11px]"
      >
        <GalleryIcon />
        모든 이미지 보기
      </button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="sm:max-w-[800px] sm:w-[800px] w-[100%] max-w-[100%] sm:py-[29px] sm:px-[20px] p-[0] sm:h-auto"
      >
        <div className="p-[20px] sm:p-0">
          <h4 className="text-base leading-[23px] sm:text-[20px] sm:leading-[28px] font-medium mb-2 sm:mb-4">
            {hotelName}
          </h4>
          <div className="flex items-center gap-[6px] ">
            <HBIcon />
            <div className="flex items-center gap-[2px]">
              {Array?.from(Array(Math.floor(rating || 5)).keys())?.map(
                (value) => (
                  <div
                    className="rounded-full sm:w-[11px] sm:h-[11px] w-[10px] h-[10px] bg-[#00AA6C] border border-[#00AA6C]"
                    key={value}
                  ></div>
                )
              )}
              {Array?.from(Array(5 - Math.floor(rating || 0)).keys())?.map(
                (value) => (
                  <div
                    className="rounded-full sm:w-[11px] sm:h-[11px] w-[10px] h-[10px] bg-[#fff] border border-gray-100"
                    key={value}
                  ></div>
                )
              )}
            </div>
            <p className="text-xs text-[#333333]">7,243</p>
          </div>
        </div>
        <div className="sm:flex gap-[20px] sm:gap-[3px] sm:mt-[27px]">
          <div className="min-w-[100%] max-w-[100%] sm:min-w-[510px] sm:max-w-[510px]">
            <Slider
              ref={(slider) => {
                sliderRef = slider;
              }}
              {...settings2}
            >
              {images?.map((image, idx) => (
                <div className="sm:h-[375px] h-[250px] sm:px-[5px]" key={idx}>
                  <img
                    onError={handleErrorOnImageLoad}
                    src={image}
                    className="w-full h-full object-cover sm:rounded-[10px]"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="flex-auto py-[20px] px-[32px] sm:p-0">
            <div className="grid grid-cols-4 gap-[5px] max-h-[375px] overflow-auto">
              {images?.map((image, idx) => (
                <div
                  className={classNames(
                    "h-[60px] cursor-pointer",
                    index === idx
                      ? "border-2 border-[#161A3F]"
                      : "border-2 border-white"
                  )}
                  key={idx}
                  onClick={() => onChangeIndex(idx)}
                >
                  <img
                    onError={handleErrorOnImageLoad}
                    src={image}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="flex items-center gap-1 text-xs text-[#5C5F79] mt-[15px] sm:mt-[15px] px-[20px] sm:px-0 pb-[20px] sm:pb-0">
          <WarningIcon className="min-w-[20px]" /> 위 이미지의 정확성에 대한
          책임은 본 숙소의 공급자 또는 소유자에게 있습니다. 당사는 부정확성에
          대해 책임을 지지 않습니다.
        </p>
      </Dialog>
    </div>
  );
}

const GallerySkeleton = () => {
  const settings2 = {
    infinite: false,
    slidesToShow: 1,
    speed: 500,
    nextArrow: <SliderNextArrow arrowClassName="right-[30px]" />,
    prevArrow: <SliderPrevArrow arrowClassName="left-[30px]" />,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="overflow-hidden relative gallery sm:w-full w-[95%] mx-auto">
      <Slider {...settings}>
        {Array(10)
          .fill(1)
          ?.map((_, idx) => (
            <div className="sm:h-[320px] h-[180px] sm:px-[5px]" key={idx}>
              <Skeleton className="w-full h-full object-cover rounded-xl sm:rounded-none" />
            </div>
          ))}
      </Slider>

      <Skeleton className="w-[35px] h-[43px] sm:w-[50px] sm:h-[65px] object-contain left-[10px] top-[10px] sm:left-[130px] sm:top-[30px] absolute" />

      <button className="sm:rounded-[100px] rounded-[10px] bg-white absolute sm:bottom-[20px] sm:right-[120px] bottom-[18px] right-[15px] flex items-center gap-1 sm:py-[13px] py-[7px] sm:px-[17px] px-[5px] sm:text-sm text-[11px]">
        <GalleryIcon />
        <Skeleton height={16} width={60} />
      </button>
    </div>
  );
};
