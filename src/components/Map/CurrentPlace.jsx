import classNames from "classnames";
import { useState } from "react";

import markerImg from "@/assets/icons/marker.png";
import ShoppingMallIcon from "@/assets/icons/shopping-mall.svg";
import RestaurantIcon from "@/assets/icons/restaurant.svg";
import StarIcon from "@/assets/icons/star.svg";
import ChevronUpIcon from "@/assets/icons/chevron-up.svg?react";
import TouristAttractionIcon from "@/assets/icons/tourist-attraction.svg";

export const CurrentPlace = ({
  onClickItem,
  currentPlace,
  shoppings,
  attractions,
  restaurants
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRestaurant, setIsOpenRestaurant] = useState(false);
  const [isOpenShopping, setIsOpenShopping] = useState(false);
  const [isOpenAttraction, setIsOpenAttraction] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <>
      <div
        className={classNames(
          "sm:w-[300px] w-[225px] sm:h-[100%] h-[87%] absolute top-0 right-0 bg-white z-[9] shadow-2xl transition-transform",
          {
            ["sm:translate-x-[300px] translate-x-[225px]"]: !isOpen
          }
        )}
      >
        <div className="w-full h-full flex flex-col overflow-y-auto">
          <div className="border-b border-gray-100 flex py-3 px-4 gap-3 items-center">
            <img src={markerImg} width={20} height={30} />
            <span>현재 위치</span>
          </div>

          <button className="flex py-3 px-4 text-left justify-start w-full flex-col  border-b border-gray-100">
            <span className="text-sm">{currentPlace?.name}</span>
            <div className="flex gap-2">
              <div className="flex gap-1">
                <span className=" text-xs text-gray-500">
                  {currentPlace?.address}
                </span>
              </div>
            </div>
          </button>

          <button
            className="border-b border-gray-100 bg-gray-50 flex py-3 px-4 justify-between items-center"
            onClick={() => setIsOpenRestaurant((prev) => !prev)}
          >
            <div className="flex items-center gap-3">
              <img src={RestaurantIcon} width={20} height={30} />
              <span>레스토랑</span>
            </div>

            <span
              className={classNames({
                ["rotate-180"]: !isOpenRestaurant
              })}
            >
              <ChevronUpIcon />
            </span>
          </button>

          {isOpenRestaurant && (
            <div className="flex items-center flex-col">
              {restaurants?.map((item) => (
                <button
                  className="flex py-3 px-4 text-left justify-start w-full flex-col  border-b border-gray-100"
                  onClick={() => onClickItem(item.place_id)}
                >
                  <span className="text-sm">{item.name}</span>
                  <div className="flex gap-2">
                    <div className="flex gap-1">
                      <img src={StarIcon} width={15} />
                      <span className=" text-xs">{item.rating}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          <button
            className="border-b border-gray-100 bg-gray-50 flex py-3 px-4 justify-between items-center"
            onClick={() => setIsOpenShopping((prev) => !prev)}
          >
            <div className="flex items-center gap-3">
              <img src={ShoppingMallIcon} width={20} height={30} />
              <span>쇼핑몰</span>
            </div>

            <span
              className={classNames({
                ["rotate-180"]: !isOpenShopping
              })}
            >
              <ChevronUpIcon />
            </span>
          </button>

          {isOpenShopping && (
            <div className="flex items-center flex-col">
              {shoppings?.map((item) => (
                <button
                  className="flex py-3 px-4 text-left justify-start w-full flex-col  border-b border-gray-100"
                  onClick={() => onClickItem(item.place_id)}
                >
                  <span className="text-sm">{item.name}</span>
                  <div className="flex gap-2">
                    <div className="flex gap-1">
                      {item.rating && (
                        <>
                          <img src={StarIcon} width={15} />
                          <span className=" text-xs">{item.rating}</span>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          <button
            className="border-b border-gray-100 bg-gray-50 flex py-3 px-4 justify-between items-center"
            onClick={() => setIsOpenAttraction((prev) => !prev)}
          >
            <div className="flex items-center gap-3">
              <img src={TouristAttractionIcon} width={20} height={30} />
              <span>관광지</span>
            </div>

            <span
              className={classNames({
                ["rotate-180"]: !isOpenAttraction
              })}
            >
              <ChevronUpIcon />
            </span>
          </button>

          {isOpenAttraction && (
            <div className="flex items-center flex-col">
              {attractions?.map((item) => (
                <button
                  className="flex py-3 px-4 text-left justify-start w-full flex-col  border-b border-gray-100"
                  onClick={() => onClickItem(item.place_id)}
                >
                  <span className="text-sm">{item.name}</span>
                  <div className="flex gap-2">
                    <div className="flex gap-1">
                      <img src={StarIcon} width={15} />
                      <span className=" text-xs">{item.rating}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <button
        className={classNames(
          "w-[50px] h-[130px] absolute top-[44%] right-0 z-[9] rounded-s-xl bg-[rgba(255,255,255,0.8)] flex justify-center items-center transition-transform",
          {
            ["sm:translate-x-[-300px] translate-x-[-225px]"]: isOpen
          }
        )}
        onClick={toggle}
      >
        <span className={classNames("sm:scale-125")}>
          {isOpen ? (
            <>
              <span className="flex h-[19px] font-medium">감</span>
              <span className="flex h-[19px] font-medium">추</span>
              <span className="flex h-[19px] font-medium">기</span>
            </>
          ) : (
            <>
              <span className="flex h-[19px] font-medium">상</span>
              <span className="flex h-[19px] font-medium">세</span>
              <span className="flex h-[19px] font-medium">보</span>
              <span className="flex h-[19px] font-medium">기</span>
            </>
          )}
        </span>
      </button>
    </>
  );
};
