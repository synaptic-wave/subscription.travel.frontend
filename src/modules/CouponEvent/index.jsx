import { Header } from "@/components/Header";

import bannerImg from "@/assets/images/coupon-event-banner1.png";
import bannerMobileImg from "@/assets/images/coupon-event-banner-mobile1.png";

import coupon1 from "@/assets/images/coupon_1.png";
import coupon2 from "@/assets/images/coupon_2.png";

import couponEvent5000 from "@/assets/images/coupon_event_50000.png";

import sale1 from "@/assets/images/coupon_img.png";

import { Button } from "@/components/index";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGeneratePromocode,
  useGetLatestUsedPromocode,
  useGetPromocodeTypesById
} from "@/services/promocode.service";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { promocodeTypeId } from "@/consts/index";

export default function CouponEvent() {
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth);
  const [isCopied, setIsCopied] = useState(false);

  const [isCouponIssued, setIsCouponIssued] = useState(false);

  const promocodeType = useGetPromocodeTypesById({
    // id: "66cda7ba09d63bcfe29ac39c",
    id: promocodeTypeId
  });

  const generateSinglePromocode = useGeneratePromocode();

  const { data: userPromocodeData, isLoading: promocodeLoading } =
    useGetLatestUsedPromocode({
      id: promocodeTypeId
    });

  const endDate = useMemo(() => {
    if (!promocodeType?.data) return null;

    return moment(promocodeType?.data?.dateTo).format("YY.MM.DD");
  }, [promocodeType]);

  const handleClick = useCallback(() => {
    if (!user) return navigate("/login");

    generateSinglePromocode.mutate({
      // promocodeTypeId: "66cda7ba09d63bcfe29ac39c",
      promocodeTypeId: promocodeTypeId,
      value: promocodeType?.data?.value,
      dateFrom: new Date(moment().format("YYYY-MM-DD")),
      dateTo: new Date(moment().add(12, "months").format("YYYY-MM-DD")),
      code: promocodeType?.data?.type
    });
  }, [user, isCouponIssued, promocodeType]);

  const promocode = useMemo(() => {
    if (!user) return null;
    if (userPromocodeData) return userPromocodeData?.code;
    if (generateSinglePromocode) return generateSinglePromocode?.data?.code;

    return null;
  }, [userPromocodeData, generateSinglePromocode, user]);

  const isLoading = generateSinglePromocode.isLoading || promocodeLoading;

  const onCopy = () => {
    navigator.clipboard.writeText(promocode);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <>
      <Header />
      <section className="w-full flex justify-center bg-[#ceceef] sm:h-[320px] h-[165px] overflow-hidden">
        <div className="container">
          <img src={bannerImg} className="sm:block hidden" />
          <img src={bannerMobileImg} className="block sm:hidden" />
        </div>
      </section>

      <section className="max-w-[890px] px-5 sm:px-0 mx-auto">
        <div className="flex flex-col w-full items-center sm:mt-[89px] mt-[36px]">
          <span className="sm:w-[564px] px-[62px]  py-[18px] flex sm:px-[106px] justify-center items-center rounded-full sm:text-[28px] text-[18px] font-bold">
            여행 지원금 앵콜 이벤트
          </span>

          <span className="font-normal sm:text-xl text-[15px] sm:w-full w-[60%] text-center">
            컬쳐랜드 트래블 회원이라면 누구나! 숙소 예약시 즉시 5만원
            지원해드려요
          </span>
        </div>

        <div className="w-full flex sm:flex-row flex-col justify-between sm:mt-[77px] mt-[73px]">
          <div className="flex flex-col items-center sm:gap-[42px] gap-[25px] w-full relative">
            <img
              src={couponEvent5000}
              className="object-contain h-auto sm:w-[600px]"
            />

            <div className="absolute sm:w-[150px] w-[100px] h-[100px] sm:h-[150px] rounded-full bg-[#000000] top-[-50px] sm:left-[120px] left-0 flex flex-col justify-center items-center text-center text-white font-medium sm:text-2xl text-[15px]">
              소진시
              <br />
              선착순 종료
            </div>

            {isLoading && <Skeleton width={350} height={70} />}

            {!isLoading && !promocode && (
              <button
                className="bg-[#6200EE] h-[70px] text-white sm:w-[350px] w-full rounded-[10px] font-medium text-[22px] flex items-center justify-center gap-1"
                onClick={handleClick}
              >
                5만원 지원금 쿠폰 받기 <DownloadIcon />
              </button>
            )}

            {promocode && (
              <div className="sm:w-[350px] w-full max-auto">
                <div className="flex items-center mt-[20px] px-[15px] rounded-[5px] text-[#867979] text-[16px] border-2 border-[#6200EE] py-[10px] sm:w-[350px] h-[70px] justify-center sm:text-[22px]">
                  {isLoading || promocodeType.isLoading ? (
                    <Skeleton height={24} width={100} />
                  ) : (
                    promocode
                  )}
                </div>

                <div className="grid grid-cols-1 gap-[16px] mt-[16px] w-full">
                  {isLoading || promocodeType.isLoading ? (
                    <Skeleton height={41} className="w-full" />
                  ) : (
                    <button
                      data-tooltip-id="dark-tooltip"
                      data-tooltip-content={isCopied ? "Copied" : "Copy"}
                      onClick={onCopy}
                      className="px-[15px] text-[#A3A5B8] rounded-[10px] bg-[#EAEAF4] py-[10px]"
                    >
                      코드 복사
                    </button>
                  )}
                  {/* <button
                    // onClick={onClose}
                    className="px-[15px] rounded-[10px] text-[#A3A5B8] bg-[#EAEAF4] py-[10px]"
                  >
                    닫기
                  </button> */}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-[10px] items-center">
              <span className="font-medium sm:text-2xl text-lg text-[#161A3F]">
                쿠폰 사용기간 : {endDate}까지 결제 가능
              </span>
              <span className="text-[#FF3838] sm:text-[20px] text-[15px]">
                숙소 예약 기간은 사용 기간과 관계없이 전 기간 가능!
              </span>
            </div>
          </div>
        </div>

        <div className="w-full h-[0.5px] bg-[#A8ABBF] sm:mt-[88px] mt-[66px]" />

        <div className="w-full flex flex-col items-center justify-between sm:gap-7 gap-[18px] sm:mt-[110px] mt-[62px]">
          <WarningIcon />

          <h2 className="sm:text-2xl text-xl text-[#161A3F] font-medium">
            지원금 쿠폰은 이렇게 사용하세요!
          </h2>

          <div className="flex flex-col items-center mt-[14px]">
            <img src={sale1} className="object-contain h-auto sm:h-[430px]" />
          </div>
        </div>

        <div className="w-full flex justify-center gap-7 mt-[40px] text-center sm:text-[20px] text-[19px]">
          숙소 결제 시, 할인 쿠폰 등록 칸에
          <br />
          지원금 쿠폰 번호를 등록할 수 있어요!
        </div>

        <div className="w-full flex flex-col sm:mt-[112px] mt-[59px] bg-[#D9D9D9] sm:px-[55px] px-5 sm:py-10 py-[22px] gap-[11px]">
          <h2 className="sm:text-[26px] text-xl font-medium">
            이벤트 유의사항
          </h2>

          <ul className="list-decimal pl-4">
            <li className="sm:text-xl text-xs">
              본 이벤트는 결제 시 선착순 적용으로, 쿠폰 다운로드 횟수 소진시
              조기 마감됩니다.
            </li>
            <li className="sm:text-xl text-xs">
              지원금 쿠폰은 1인당 1회에 한해 적용 가능합니다.
            </li>
            <li className="sm:text-xl text-xs">
              컬쳐랜드 트래블 결제 정책에 따라, 10만 원 이상의 숙소 구매 시,
              코드가 적용됩니다.
            </li>
            <li className="sm:text-xl text-xs">
              지원금 쿠폰은 정해진 사용 기간 내에만 결제 시 사용하실 수 있으며,
              이후 자동 소멸됩니다.
            </li>
            <li className="sm:text-xl text-xs">
              이벤트와 관련한 사항은 고객센터 1533-7901을 통해 문의하실 수
              있습니다.
            </li>
          </ul>
        </div>
        <div className="flex justify-center sm:mt-[63px] mt-[40px] px-4">
          <Link to="/" className="sm:w-auto w-full">
            <Button className="w-full flex items-center gap-2 justify-center">
              지금 바로 숙소 예약하러 가기 <ArrowRightIcon />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

const ArrowRightIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_436_636)">
      <path
        d="M8.59003 16.59L13.17 12L8.59003 7.41L10 6L16 12L10 18L8.59003 16.59Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_436_636">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const WarningIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_436_671)">
      <path
        d="M16 2.66675C8.63996 2.66675 2.66663 8.64008 2.66663 16.0001C2.66663 23.3601 8.63996 29.3334 16 29.3334C23.36 29.3334 29.3333 23.3601 29.3333 16.0001C29.3333 8.64008 23.36 2.66675 16 2.66675ZM17.3333 22.6668H14.6666V20.0001H17.3333V22.6668ZM17.3333 17.3334H14.6666V9.33342H17.3333V17.3334Z"
        fill="#FF3838"
      />
    </g>
    <defs>
      <clipPath id="clip0_436_671">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_436_708)">
      <path
        d="M22.12 12H20V5.33333C20 4.6 19.4 4 18.6667 4H13.3334C12.6 4 12 4.6 12 5.33333V12H9.88002C8.69335 12 8.09335 13.44 8.93335 14.28L15.0534 20.4C15.5734 20.92 16.4134 20.92 16.9334 20.4L23.0534 14.28C23.8934 13.44 23.3067 12 22.12 12ZM6.66669 25.3333C6.66669 26.0667 7.26669 26.6667 8.00002 26.6667H24C24.7334 26.6667 25.3334 26.0667 25.3334 25.3333C25.3334 24.6 24.7334 24 24 24H8.00002C7.26669 24 6.66669 24.6 6.66669 25.3333Z"
        fill="#FBEE00"
      />
    </g>
    <defs>
      <clipPath id="clip0_436_708">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
