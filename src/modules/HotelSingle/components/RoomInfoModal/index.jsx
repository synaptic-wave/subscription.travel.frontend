import { Dialog, SliderNextArrow, SliderPrevArrow } from "@/components/index";
import PersonIcon from "@/assets/icons/person-v2.svg?react";
import BedIcon from "@/assets/icons/bed-v2.svg?react";
import Slider from "react-slick";
import classNames from "classnames";
import { useGetRoomInfo } from "@/services/hotel.service";
import { FacilityItem } from "../Facilities";
import { handleErrorOnImageLoad } from "@/consts/img";

export function RoomInfoModal({
  isOpen,
  onClose,
  roomInfo,
  roomFeatures,
  JRCode
}) {
  // const { data } = useGetRoomInfo({
  //   JRCode,
  //   queryParams: {
  //     enabled: !!JRCode
  //   }
  // });
  // console.log(data);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderNextArrow arrowClassName="right-[30px]" />,
    prevArrow: <SliderPrevArrow arrowClassName="left-[30px]" />
  };
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className={classNames(
        "w-[90%] sm:p-[30px] p-5",
        roomInfo?.images ? "sm:w-[500px]" : "sm:w-[500px]"
      )}
    >
      {roomInfo?.images && (
        <div className="mb-3 sm:mb-5 sm:mt-4 mt-6">
          <Slider {...settings}>
            {roomInfo.images.map((image) => (
              <div className="h-[180px] sm:h-[315px] sm:w-[440px] w-full">
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

      <h4 className="text-base sm:text-xl mb-[14px] font-medium">
        {roomInfo?.name}
      </h4>
      <p className="flex items-center gap-1 text-[13px]">
        <PersonIcon />
        기준 {roomInfo?.occupancy}인 / 최대 {roomInfo?.maxOccupancy}인
      </p>
      {/* <p className="flex items-center gap-1 text-[13px] mt-2">
        <BedIcon />
        퀸사이즈 침대 1개
      </p> */}
      <h3 className="text-sm sm:text-base font-medium mt-[30px]">
        객실 편의 시설
      </h3>
      <ul className="mt-[9px] list-disc pl-4">
        {roomFeatures.map((item) => (
          <li className="text-xs text-[#5C5F79]" key={item}>
            <FacilityItem item={item} />
          </li>
        ))}
      </ul>
    </Dialog>
  );
}
