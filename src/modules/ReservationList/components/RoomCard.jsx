import image1 from "@/assets/images/room.png";
import PersonIcon from "@/assets/icons/person-v2.svg?react";
import BedIcon from "@/assets/icons/bed-v2.svg?react";
import { Button } from "@/components/index";
import classNames from "classnames";
import { handleErrorOnImageLoad } from "@/consts/img";
import moment from "moment";
import { getRoomNameFromResponse } from "@/utils/hotelFunctions";
import { useEffect, useMemo, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useGetHotelContent } from "@/services/hotel.service";
import { languageKeys } from "@/consts/languages";
import { useNavigate } from "react-router-dom";

export function RoomCard({ hasBorderBottom, item, cancellationExpiredDate }) {
  const option = item?.items?.[0];
  const navigate = useNavigate();
  const [hotelImages, setHotelImages] = useState([]);
  const roomName = useMemo(() => {
    if (!option) return "";
    return getRoomNameFromResponse(option?.hotelRooms);
  }, [option]);

  const getHotelContent = useGetHotelContent();

  useEffect(() => {
    function getHContent() {
      getHotelContent.mutate(
        {
          language: languageKeys.KR,
          JPCode: [item?.items?.[0].hotelInfo.code]
        },
        {
          onSuccess: (res) => {
            const images = res.HotelContent.Images.Image
              ? Array.isArray(res.HotelContent.Images.Image)
                ? res.HotelContent.Images.Image
                : [res.HotelContent.Images.Image]
              : [];

            setHotelImages(
              images
                .filter((item) => item.FileName)
                .map((item) => item.FileName)
            );
          },
          onError: (err) => {
            console.log(err);
          }
        }
      );
    }

    if (item?.items) getHContent();
  }, [item]);

  return (
    <div
      className={classNames(
        "py-[31px] px-[20px]",
        hasBorderBottom && "border-b border-gray-100"
      )}
    >
      <p className="text-base mb-[18px] sm:mb-[28px] font-medium">
        {option?.hotelInfo?.name}
      </p>
      <div className="flex flex-col sm:grid grid-cols-12 sm:gap-[20px]">
        <div className="col-span-3">
          <img
            src={hotelImages[0]}
            onError={handleErrorOnImageLoad}
            className="h-[178px] hidden sm:block w-full object-cover rounded-[10px]"
          />
        </div>
        <div className="col-span-9 ">
          <div className="sm:flex justify-between">
            <div>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-1 text-[13px] sm:text-sm">
                  <PersonIcon />
                  인원 {item?.paxes?.length - 1}명
                </div>
                <div className="flex items-center gap-1 text-[13px] sm:text-sm">
                  <BedIcon />
                  인원 {option?.hotelRooms?.length}명
                </div>
              </div>
              <div className="flex items-center mt-4 gap-5">
                <p className="w-[52px] text-[13px] sm:text-sm text-[#A3A5B8]">
                  객실
                </p>
                <p className="text-[13px] sm:text-sm">{roomName}</p>
              </div>
              <div className="flex items-center mt-4 gap-5">
                <p className="w-[52px] text-[13px] sm:text-sm text-[#A3A5B8]">
                  일정
                </p>
                <p className="text-[13px] sm:text-sm">
                  {" "}
                  {moment(new Date(option?.attributes?.start)).format(
                    "YYYY.MM.DD(ddd)"
                  )}{" "}
                  ~{" "}
                  {moment(new Date(option?.attributes?.end)).format(
                    "YYYY.MM.DD(ddd)"
                  )}
                </p>
              </div>
              <div className="flex items-center mt-4 gap-5">
                <p className="w-[52px] text-[13px] sm:text-sm text-[#A3A5B8]">
                  예약번호
                </p>
                <p className="text-[13px] sm:text-sm">
                  {item?.attributes?.locator}
                </p>
              </div>
              <div className="flex items-center mt-4 gap-5">
                <p className="w-[52px] text-[13px] sm:text-sm text-[#A3A5B8]">
                  결제일시
                </p>
                <p className="text-[13px] sm:text-sm">
                  {moment(new Date(item?.createdAt)).format(
                    "YYYY년 MM월 DD일 HH:mm:ss "
                  )}
                </p>
              </div>
            </div>
            <div className="flex sm:flex-col sm:items-end sm:mt-0 mt-[30px] sm:justify-normal  justify-between">
              <div className="sm:flex flex-col items-end">
                <p className="text-lg sm:text-2xl font-bold">
                  <NumericFormat
                    value={item?.payment?.amount}
                    thousandSeparator
                    displayType="text"
                  />{" "}
                  <span className="text-[13px] sm:text-[16px] font-[400]">
                    원
                  </span>
                </p>
                <p className="text-[11px] sm:text-xs text-[#5C5F79] mt-1">
                  1박 최저가, 성인 {item?.paxes?.length - 1}명 기준
                </p>
                <p className="text-[11px] sm:text-xs text-[#087671] mt-1">
                  세금 및 기타 요금 포함
                </p>

                <p
                  className={classNames(
                    "sm:text-xs text-[11px] sm:mt-[14px] mt-1",
                    cancellationExpiredDate ? "text-[#06F]" : "text-[#FF176B]"
                  )}
                >
                  {cancellationExpiredDate
                    ? moment(new Date(cancellationExpiredDate)).format(
                        "YYYY년 MM월 DD일까지 취소 가능"
                      )
                    : "취소불가"}
                </p>
              </div>

              <Button
                onClick={() =>
                  navigate(`/booked-hotel?booking_id=${item?._id}`, {
                    state: {
                      otp: null,
                      email: null,
                      reservationLocator: item?.attributes?.locator
                    }
                  })
                }
                className="sm:mt-[32px]"
              >
                상세보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
