import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { Button } from "..";
import LocationIcon from "@/assets/icons/location.svg?react";
import { useEffect, useMemo, useState } from "react";
import { useGetHotelContent } from "@/services/hotel.service";
import { languageKeys } from "@/consts/languages";
import { handleErrorOnImageLoad } from "@/consts/img";

export function HotelCompareGridCard({
  img,
  name,
  paxes,
  price,
  hotelCode,
  address,
  onCheckRatePlanCode
}) {
  const [hotelContent, setHotelContent] = useState();
  const [showMoreText, setShowMoreText] = useState(false);
  const getHotelContent = useGetHotelContent();

  useEffect(() => {
    if (hotelContent) return;
    if (!hotelCode) return;

    function getHContent() {
      getHotelContent.mutate(
        {
          language: languageKeys.KR,
          JPCode: [hotelCode]
        },
        {
          onSuccess: (res) => {
            setHotelContent(res.HotelContent);
          },
          onError: (err) => {
            console.log(err);
          }
        }
      );
    }

    getHContent();
  }, [hotelCode]);

  const description = hotelContent?.Descriptions?.Description?.find(
    (descr) => descr.attributes.Type === "LNG"
  );

  const hotelFeatures = useMemo(() => {
    if (!hotelContent) return [];

    return hotelContent?.Features?.Feature?.filter(
      (feat) => feat?.attributes.Type === "HOT"
    )?.map((feat) => feat.value);
  }, [hotelContent]);

  const roomFeatures = useMemo(() => {
    if (!hotelContent) return [];
    return hotelContent?.Features?.Feature?.filter(
      (feat) => feat?.attributes.Type === "ROO"
    )?.map((feat) => feat.value);
  }, [hotelContent]);

  return (
    <div className="w-full flex border border-solid border-gray-100 rounded-[10px] overflow-hidden flex-col">
      <div className="w-full flex flex-col">
        <div className="w-full h-[240px] max-h-[240px] overflow-hidden">
          <img
            src={img}
            width="100%"
            height="100%"
            className="object-cover"
            onError={handleErrorOnImageLoad}
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          {/* Row one */}
          <div className="w-full flex justify-between">
            <h3 className=" text-[20px] font-medium">
              <button
                className="text-left"
                onClick={() => onCheckRatePlanCode(hotelCode)}
              >
                {name}
              </button>
            </h3>
          </div>

          <div className="w-full flex flex-col mt-[10px]">
            <div className="w-full flex flex-col">
              <span className="flex items-center text-[#5C5F79] text-[13px]">
                <span className="w-[30px]">
                  <LocationIcon />
                </span>{" "}
                <span className="more-dots">{address}</span>
              </span>
            </div>

            <div className="flex w-full justify-between items-end">
              <div className="flex flex-col items-start mt-5 flex-1">
                <div className="flex justify-end items-center">
                  {price ? (
                    <>
                      <span className="text-[22px] font-bold">
                        <NumericFormat
                          value={price}
                          displayType="text"
                          thousandSeparator
                        />
                      </span>
                      <span className="text-[20px] ml-1"> 원</span>
                    </>
                  ) : (
                    <span className="text-[22px] font-bold text-[red]">
                      비교 일자에 예약불가
                    </span>
                  )}
                </div>

                <p className="text-[12px] mt-1 text-[#5C5F79]">
                  1박 최저가, 성인 {paxes}명 기준
                </p>

                <p className="text-[11px] mt-1 text-[#087671]">
                  세금 및 기타 요금 포함
                </p>
              </div>

              {price && (
                <Button
                  onClick={() => onCheckRatePlanCode(price && hotelCode)}
                  className="w-[100px]"
                >
                  상세보기
                </Button>
              )}
            </div>
          </div>

          <div className="mt-20 w-full flex flex-col">
            <h4 className="text-base font-medium">호텔 설명</h4>
            <p className="mt-[10px] text-[13px] font-normal">
              {showMoreText
                ? description?.value
                : [...(description?.value || [])?.slice(0, 450)]}{" "}
              &nbsp;
              {description?.value?.length > 450 && (
                <span
                  className="cursor-pointer text-[#06F]"
                  onClick={() => setShowMoreText((prev) => !prev)}
                >
                  {showMoreText ? "간략하게 표시" : "..."}
                </span>
              )}
            </p>
          </div>

          <div className="mt-[30px] w-full flex flex-col">
            <h4 className="text-base font-medium">호텔 서비스</h4>
            <CollapsableList items={hotelFeatures} />
          </div>

          <div className="mt-[30px] w-full flex flex-col">
            <h4 className="text-base font-medium">룸 서비스</h4>
            <CollapsableList items={roomFeatures} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const CollapsableList = ({ items }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <ul className="list-none m-0 p-0 mt-[10px]">
        {[...(showMore ? items : [...items?.slice(0, 7)])]?.map((feat) => (
          <li className="text-[13px] text-[#5C5F79] mb-2 flex items-center justify-start">
            <span className="w-2 h-2 bg-[#C5CAFF] rounded-full mr-2"></span>
            {feat}
          </li>
        ))}
      </ul>

      <button
        className="text-left text-sm text-[#06F]"
        onClick={() => setShowMore((prev) => !prev)}
      >
        {showMore ? "간략하게 표시" : "자세히보기"}
      </button>
    </>
  );
};
