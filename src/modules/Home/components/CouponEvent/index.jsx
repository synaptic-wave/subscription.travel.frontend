import { useEffect, useRef, useState } from "react";
import CloseIcon from "@/assets/icons/close.svg?react";
import CouponEventFrame from "@/assets/images/coupon_banner1.png";
import CouponEventContent from "@/assets/images/coupon_banner2.png";
import NewCouponBanner from "@/assets/images/new_coupon_banner.png";
import { useNavigate } from "react-router-dom";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Checkbox } from "@/components/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "@/store/common/common.slice";

const Ellipsis = () => (
  <svg
    width="150"
    height="150"
    viewBox="0 0 150 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="75" cy="75" r="75" fill="#331F52" />
    <path
      d="M62.3788 60.424L61.3468 62.488C57.7948 61.792 54.7228 59.632 53.3308 56.752C51.8908 59.632 48.8188 61.792 45.2908 62.488L44.2348 60.424C48.5308 59.704 52.0108 56.464 52.0108 53.128V51.496H54.6268V53.128C54.6268 56.488 58.1068 59.704 62.3788 60.424ZM54.5308 67.12H63.2188V69.16H43.5868V67.12H52.0588V62.056H54.5308V67.12ZM83.0409 50.2V65.968H80.5689V50.2H83.0409ZM78.5529 61.12L77.3049 63.064C74.8089 62.248 72.9849 60.568 72.0249 58.432C71.0649 60.736 69.2409 62.584 66.6489 63.448L65.3529 61.528C68.7849 60.376 70.7289 57.568 70.7289 54.64V53.848H66.0249V51.856H77.8809V53.848H73.2489V54.64C73.2489 57.4 75.2169 60.04 78.5529 61.12ZM71.3769 69.424H83.6649V71.44H68.8809V64.528H71.3769V69.424ZM94.7751 51.976V55.528C94.7751 59.512 96.9831 63.496 100.391 65.032L98.9511 67C96.4551 65.824 94.5591 63.424 93.5751 60.496C92.5911 63.64 90.6711 66.208 88.0551 67.48L86.5911 65.416C90.0471 63.856 92.3031 59.704 92.3031 55.528V51.976H94.7751ZM102.119 50.152H104.615V71.896H102.119V50.152ZM35.0134 96.304V87.088H30.6214V85.048H35.0134V80.176H37.4854V96.304H35.0134ZM32.3254 90.976L31.0054 92.896C28.6774 92.032 26.9734 90.28 26.0614 88.096C25.1014 90.52 23.3014 92.44 20.8054 93.4L19.4854 91.48C22.8694 90.28 24.7414 87.232 24.7414 84.016V81.496H27.2614V84.064C27.2614 86.992 29.0854 89.8 32.3254 90.976ZM25.8694 99.424H37.9894V101.44H23.3734V94.6H25.8694V99.424ZM53.9235 90.712L52.7475 92.632C50.2995 91.936 48.5235 90.4 47.5875 88.456C46.6035 90.592 44.8035 92.248 42.2595 93.04L41.0835 91.096C44.4195 90.088 46.2915 87.544 46.2915 84.856V84.616H41.7315V82.648H46.2915V80.08H48.7875V82.648H53.3235V84.616H48.7635V84.856C48.7635 87.352 50.6115 89.752 53.9235 90.712ZM43.7955 96.448V94.456H58.0515V101.896H55.5795V96.448H43.7955ZM61.1235 85.768V87.808H58.0515V93.424H55.5795V80.152H58.0515V85.768H61.1235ZM81.2336 87.496L80.2976 89.44C76.8176 88.912 73.9136 87.16 72.5216 84.784C71.1536 87.184 68.2736 88.96 64.7696 89.512L63.8096 87.544C68.0816 86.944 71.2496 84.352 71.2496 81.616V80.728H73.7936V81.616C73.7936 84.28 76.9856 86.896 81.2336 87.496ZM67.5776 95.128V99.424H80.1776V101.44H65.1056V95.128H67.5776ZM62.7056 91.048H82.3616V93.04H73.9616V97.096H71.4896V93.04H62.7056V91.048ZM91.0624 89.032L90.1984 87.112C94.2064 86.704 96.9664 85.024 97.3264 83.104H91.0384V81.112H107.046V83.104H100.71C101.046 85.024 103.83 86.704 107.862 87.112L106.974 89.032C103.158 88.624 100.182 87.088 99.0304 84.856C97.8544 87.088 94.8784 88.624 91.0624 89.032ZM98.9824 99.952C102.174 99.952 103.95 99.328 103.95 98.056C103.95 96.808 102.174 96.16 98.9824 96.16C95.7904 96.16 94.0384 96.808 94.0384 98.056C94.0384 99.328 95.7904 99.952 98.9824 99.952ZM98.9824 94.264C103.662 94.264 106.446 95.632 106.446 98.056C106.446 100.48 103.662 101.848 98.9824 101.848C94.3264 101.848 91.5184 100.48 91.5184 98.056C91.5184 95.632 94.3264 94.264 98.9824 94.264ZM100.23 90.784H108.822V92.776H89.2144V90.784H97.7584V87.88H100.23V90.784ZM118.541 93.52V97.264H122.981V93.52H118.541ZM125.429 97.264H130.469V99.304H110.837V97.264H116.093V93.52H113.213V86.56H125.693V83.68H113.165V81.688H128.141V88.528H115.637V91.528H128.621V93.52H125.429V97.264Z"
      fill="white"
    />
  </svg>
);

export function CouponEventModal() {
  const ref = useRef();
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.common.isVisibleCoupon);
  const [hideToday, setHideToday] = useState(false);

  useEffect(() => {
    dispatch(commonActions.checkHideForToday());
  }, [dispatch]);

  const navigate = useNavigate();

  const onClose = () => {
    if (hideToday) {
      const now = new Date();
      const hideUntil = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
      localStorage.setItem("hideCouponModalUntil", hideUntil.toISOString());
    }
    dispatch(commonActions.hideCouponModal());
  };

  useOutsideClick(ref, () => {
    if (isVisible) {
      onClose();
    }
  });

  if (!isVisible) return <></>;

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center z-[999] w-[100vw] h-[100vh]">
      <div
        ref={ref}
        className="sm:w-[500px] w-[310px]  h-[550px] sm:h-[830px] bg-white rounded-xl flex flex-col items-center relative"
        style={{
          "box-shadow": "0px 0px 20px 0px #5E66A740"
        }}
      >
        <div
          className="h-[550px] sm:h-full w-full relative overflow-hidden"
          style={{
            borderRadius: "10px 10px 0 0"
          }}
        >
          <img
            src={NewCouponBanner}
            className="object-contain w-full h-full translate-y-[-25px]"
          />
          {/* 
          <img
            src={NewCouponBanner}
            className="object-cover absolute bottom-[90px] sm:bottom-[105px] sm:w-[390px] w-[76%] sm:ml-[55px] ml-[47px]"
          /> */}

          {/* <div className="absolute sm:bottom-[90px] sm:right-[75px] sm:scale-90 scale-75 bottom-[80px] right-[45px]">
            <Ellipsis />
          </div> */}

          <button
            onClick={() => navigate("/banner/coupon-event")}
            className="text-[22px] py-[15px] px-[20px] w-full absolute bottom-0 left-0 right-0 bg-[#0060FF] text-white"
          >
            쿠폰 받으러 가기
          </button>
        </div>
        <div
          style={{
            borderRadius: "0 0 10px 10px"
          }}
          className="flex items-center py-[7px] justify-between w-full px-[10px] bg-white"
        >
          <div className="flex items-center">
            <Checkbox
              isChecked={hideToday}
              onChange={(value) => setHideToday(value)}
            />
            <p className="text-sm">오늘 하루 열지 않기</p>
          </div>
          <button onClick={onClose} className="flex items-center">
            <CloseIcon />
            <p className="text-sm">CLOSE</p>
          </button>
        </div>
      </div>
    </div>
  );
}
