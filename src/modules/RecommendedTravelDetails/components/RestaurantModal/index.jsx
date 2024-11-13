import { Button, Dialog } from "@/components/index";
import LocationIcon from "@/assets/icons/location.svg?react";
import { NumericFormat } from "react-number-format";
import { Gallery } from "../Gallery";
import { useGetHotelReviews } from "@/services/tripAdvisor.service";
import { languageKeys } from "@/consts/languages";
import { useState } from "react";
import { Comments } from "@/modules/HotelSingle/components/Comments";

export default function RestaurantModal({
  open,
  onClose,
  title,
  rating,
  reviewsCount,
  address,
  images,
  rateFood,
  rateService,
  rateValue,
  overallRate,
  openTime,
  phone,
  cuisines,
  locationId
}) {
  const [allowFetchReviews, setAllowFetchReviews] = useState(false);

  const { data: reviews, isLoading } = useGetHotelReviews({
    code: locationId,
    params: {
      language: "ko",
      limit: 1000,
      offset: 0
    },
    queryParams: {
      enabled: !!open && !!locationId && allowFetchReviews
    }
  });

  return (
    <Dialog
      isOpen={open}
      onClose={onClose}
      withCloseButton
      className="sm:w-[700px] w-[100%] flex flex-col py-7 px-5"
    >
      <h2 className="text-xl font-medium text-[#161A3F]">{title}</h2>

      <div className="flex items-center mt-2 gap-[6px]">
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

      <div className="flex gap-1 mt-2 items-center">
        <LocationIcon />
        <span className="text-[11px]">{address}</span>
      </div>
      <div className="mt-3">
        <Gallery images={images} size="sm" />
      </div>

      <div className="h-[1px] bg-[#E1E1E1] mt-[15px] sm:mt-[27px]"></div>

      <div className="grid grid-cols-1 sm:gap-0 gap-2 sm:grid-cols-2 w-full mt-5">
        <div className="flex flex-col">
          <h2 className="text-base font-medium text-gray-900">평가 및 리뷰</h2>

          <div className="flex items-center mt-2 gap-[6px]">
            <NumericFormat
              value={rating}
              decimalScale={1}
              displayType="text"
              className="text-medium"
            />

            <div className="flex items-center gap-[2px]">
              {Array.from(
                Array(rating > 5 ? 5 : Math.floor(rating || 0)).keys()
              ).map((value) => (
                <div
                  className="rounded-full w-[18px] h-[18px] bg-[#00AA6C] border border-[#00AA6C]"
                  key={value}
                ></div>
              ))}

              {Array.from(
                Array(5 - (rating > 5 ? 5 : Math.floor(rating || 0))).keys()
              ).map((value) => (
                <div
                  className="rounded-full w-[18px] h-[18px] bg-white border border-[#00AA6C]"
                  key={value}
                ></div>
              ))}
            </div>
            <p className="text-xs text-[#333333]">
              <NumericFormat
                displayType="text"
                value={reviewsCount}
                thousandSeparator
                suffix="건의 리뷰"
              />
            </p>
          </div>

          <div className="mt-[14px] text-xs">{overallRate}</div>

          <div className="w-full flex flex-col mt-6">
            <h3 className="font-medium">평점</h3>

            <div className="flex flex-col w-full mt-3 gap-3">
              <div className="flex gap-2 items-center">
                <ForkIcon />{" "}
                <span className="text-[#5C5F79] w-[70px] text-[13px] leading-[18px]">
                  음식
                </span>
                <img src={rateFood?.rating_image_url} />
              </div>

              <div className="flex gap-2 items-center">
                <RoomServiceIcon />{" "}
                <span className="text-[#5C5F79] w-[70px] text-[13px] leading-[18px]">
                  서비스
                </span>
                <img src={rateService?.rating_image_url} />
              </div>

              <div className="flex gap-2 items-center">
                <RadioIcon />{" "}
                <span className="text-[#5C5F79] w-[70px] text-[13px] leading-[18px]">
                  가격
                </span>
                <img src={rateValue?.rating_image_url} />
              </div>

              {/* <div className="flex gap-2 items-center">
                <ForkIcon />
                <span className="text-[#5C5F79] w-[70px]">분위기</span>
              </div> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-base font-medium text-gray-900">상세정보</h2>
          <div className="flex flex-col mt-1">
            <h3 className="text-[13px] font-medium">영업시간</h3>
            <p className="text-[13px] font-normal">
              오전 {openTime}에 영업 시작
            </p>
          </div>
          <div className="flex flex-col mt-1">
            <h3 className="text-[13px] font-medium">전화번호</h3>
            <p className="text-[13px] font-normal">{phone}</p>
          </div>
          {cuisines.length > 0 && (
            <div className="flex flex-col mt-1">
              <h3 className="text-[13px] font-medium">요리</h3>
              <p className="text-[13px] font-normal">{cuisines}</p>
            </div>
          )}
          {/* <div className="flex flex-col mt-1">
            <h3 className="text-[13px] font-medium">식사 시간</h3>
            <p className="text-[13px] font-normal">
              점심식사, 저녁식사, 브런치, 야간 영업
            </p>
          </div>
          <div className="flex flex-col mt-1">
            <h3 className="text-[13px] font-medium">특징</h3>
            <p className="text-[13px] font-normal">
              테이크아웃, 좌석, 신용카드 결제 가능, 테이블 서비스
            </p>
          </div> */}
        </div>
      </div>

      <div className="w-full flex flex-col mt-4 items-center">
        {allowFetchReviews && reviews?.data ? (
          <Comments data={reviews?.data} />
        ) : (
          <Button
            variant="unstyled"
            disabled={isLoading}
            onClick={() => setAllowFetchReviews(true)}
          >
            {isLoading ? "Loading..." : "댓글 표시"}
          </Button>
        )}
      </div>
    </Dialog>
  );
}

const ForkIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.43739 16.3125V9.49325C4.82874 9.36153 4.31601 9.0536 3.89918 8.56946C3.48234 8.08533 3.27393 7.5077 3.27393 6.83655V1.68752H4.39891V6.83655H5.43739V1.68752H6.56236V6.83655H7.60084V1.68752H8.72583V6.83655C8.72583 7.5077 8.51741 8.08533 8.10057 8.56946C7.68374 9.0536 7.17101 9.36153 6.56236 9.49325V16.3125L5.43739 16.3125ZM12.6489 16.3125V10.3125H10.6008V5.25C10.6008 4.31347 10.9016 3.50122 11.503 2.81323C12.1044 2.12525 12.8614 1.75482 13.7739 1.70193V16.3125H12.6489Z"
      fill="#161A3F"
    />
  </svg>
);

const RoomServiceIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_2122_7560)">
      <path
        d="M1.5 12.75H16.5V14.25H1.5V12.75ZM10.38 5.8425C10.455 5.6625 10.5 5.46 10.5 5.25C10.5 4.425 9.825 3.75 9 3.75C8.175 3.75 7.5 4.425 7.5 5.25C7.5 5.46 7.545 5.6625 7.62 5.8425C4.6875 6.45 2.4525 8.9475 2.25 12H15.75C15.5475 8.9475 13.3125 6.45 10.38 5.8425Z"
        fill="#161A3F"
      />
    </g>
    <defs>
      <clipPath id="clip0_2122_7560">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const RadioIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_2110_7557)">
      <path
        d="M2.43 4.6125C1.8825 4.8225 1.5 5.3775 1.5 6V15C1.5 15.825 2.1675 16.5 3 16.5H15C15.8325 16.5 16.5 15.825 16.5 15V6C16.5 5.1675 15.8325 4.5 15 4.5H6.225L12.42 1.995L11.91 0.75L2.43 4.6125ZM5.25 15C4.005 15 3 13.995 3 12.75C3 11.505 4.005 10.5 5.25 10.5C6.495 10.5 7.5 11.505 7.5 12.75C7.5 13.995 6.495 15 5.25 15ZM15 9H13.5V7.5H12V9H3V6H15V9Z"
        fill="#161A3F"
      />
    </g>
    <defs>
      <clipPath id="clip0_2110_7557">
        <rect width="18" height="18" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
