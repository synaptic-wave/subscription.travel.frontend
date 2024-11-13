import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "@/assets/icons/close.svg?react";
import FavouriteFilledIcon from "@/assets/icons/favourite-fill.svg?react";
import WishlistImg from "@/assets/images/wishlist.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { wishlistActions } from "@/store/wishlist/wishlist.slice";
import {
  useGeneratePromocode,
  useGetPromocodeTypesById
} from "@/services/promocode.service";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { promocodeTypeId } from "@/consts/index";

export function FavouriteModal() {
  const dispatch = useDispatch();
  const [isCopied, setIsCopied] = useState(false);
  const { showFavourite } = useSelector((state) => state.wishlist);
  // const showFavourite = false;
  const ref = useRef();
  const navigate = useNavigate();

  const onClose = () => {
    dispatch(wishlistActions.onCloseFavouritePopup());
  };

  useOutsideClick(ref, () => {
    if (showFavourite) {
      onClose();
    }
  });

  const promocodeType = useGetPromocodeTypesById({
    id: promocodeTypeId,
    queryParams: {
      enabled: !!showFavourite
    }
  });

  const generateSinglePromocode = useGeneratePromocode();

  // useEffect(() => {
  //   if (promocodeType.data && showFavourite)
  //     generateSinglePromocode.mutate({
  //       promocodeTypeId: "6708ee83a79c498974622cf4",
  //       value: promocodeType.data.value,
  //       dateFrom: new Date(moment().format("YYYY-MM-DD")),
  //       dateTo: new Date(moment().add(12, "months").format("YYYY-MM-DD")),
  //       code: promocodeType.data.type
  //     });
  // }, [promocodeType.data, showFavourite]);

  const onCopy = () => {
    // navigator.clipboard.writeText(generateSinglePromocode?.data?.code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  if (!showFavourite) return <></>;

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center z-[999] w-[100vw] h-[100vh]">
      <div
        ref={ref}
        className="sm:w-[400px] w-[90%] bg-white rounded-xl flex flex-col px-5 py-7 items-center relative"
        style={{
          "box-shadow": "0px 0px 20px 0px #5E66A740"
        }}
      >
        {/* <img
          src={WishlistImg}
          className="absolute w-[100px] top-[-50px] h-[100px] object-contain"
        /> */}
        <div className="relative w-full h-full flex flex-col">
          <button
            className="absolute right-[-10px]  top-[-16px]"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
          <p className=" font-medium text-[22px] text-[#161A3F] mb-[34px] text-center">
            위시리스트 저장
          </p>
          {/*<p className="text-[22px] text-[#FF0000] mt-[40px] font-medium text-center">
            찜 리스트 저장
          </p>
          <p className="text-center text-[18px] mt-[5px]">
            나의 찜 리스트에서 확인할 수 있어요!
          </p>
          <p className="text-[22px] mt-[35px] font-bold text-center">
            지금 내가 찜한 숙소{" "}
          </p>
          <p className="text-[22px] font-bold text-center text-[#FF0000]">
            {generateSinglePromocode.isLoading || promocodeType.isLoading ? (
              <Skeleton
                containerClassName="inline-block"
                height={25}
                width={50}
              />
            ) : (
              generateSinglePromocode?.data?.value || ""
            )}
            원 더 할인해드려요!
          </p>
          <Link
            className="underline text-sm text-center"
            to="/banner/coupon-event"
            onClick={onClose}
          >
            이벤트 자세히 보기
          </Link>
          <div className="flex items-center mt-[20px] px-[15px] rounded-[5px] text-[#A1A1A1] text-[16px] border-2 border-[#FF0000] py-[10px]">
            {generateSinglePromocode.isLoading || promocodeType.isLoading ? (
              <Skeleton height={24} width={100} />
            ) : (
              generateSinglePromocode?.data?.code
            )}
          </div>
          <div className="grid grid-cols-2 gap-[16px] mt-[15px]">
            {generateSinglePromocode.isLoading || promocodeType.isLoading ? (
              <Skeleton height={41} className="w-full" />
            ) : (
              <button
                data-tooltip-id="dark-tooltip"
                data-tooltip-content={isCopied ? "Copied" : "Copy"}
                onClick={onCopy}
                className="px-[15px] rounded-[5px] bg-[#D9D9D9] py-[10px]"
              >
                코드 복사
              </button>
            )}
            <button
              onClick={onClose}
              className="px-[15px] rounded-[5px] bg-[#D9D9D9] py-[10px]"
            >
              닫기
            </button>
          </div> */}
          <div className="w-[70px] mx-auto border border-gray-100 rounded-[10px] h-[70px] flex items-center justify-center">
            <FavouriteFilledIcon className="w-[35px] h-[35px]" />
          </div>
          <p className="text-center text-[20px] leading-[30px] mt-[17px]">
            <span
              onClick={() => {
                dispatch(wishlistActions.onCloseFavouritePopup());
                navigate("/wishlist");
              }}
              className="text-primary-600 font-medium cursor-pointer"
            >
              찜리스트
            </span>
            에서 확인할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
