import { SliderNextArrow, SliderPrevArrow } from "@/components/index";
import { handleErrorOnImageLoad } from "@/consts/img";
import classNames from "classnames";
import Slider from "react-slick";

var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SliderNextArrow arrowClassName="right-[25px]" />,
  prevArrow: <SliderPrevArrow arrowClassName="left-[25px]" />
};

export function Gallery({ images, size }) {
  return (
    <div className="flex flex-col sm:grid grid-cols-12 gap-1">
      <div className="col-span-8 recommended-travel-image-slider">
        <Slider {...settings}>
          {images?.map((image, idx) => (
            <img
              key={idx}
              className={classNames(
                "h-[200px] sm:h-[520px] object-cover rounded-[5px]",
                {
                  "sm:h-[200px] sm:max-h-[286px]": size === "sm"
                }
              )}
              src={image}
              onError={handleErrorOnImageLoad}
            />
          ))}
        </Slider>
      </div>
      <div className="col-span-4">
        <div className="grid grid-cols-4 sm:grid-cols-2 gap-1">
          {images?.map((image, idx) => (
            <img
              key={idx}
              className={classNames(
                "h-[68px] sm:h-[170px] object-cover w-full",
                {
                  "sm:h-[92px]": size === "sm"
                }
              )}
              onError={handleErrorOnImageLoad}
              src={image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
