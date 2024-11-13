import { Button, Dialog, Modal } from "@/components/index";
import CheckoutBox from "./components/CheckoutBox";
import RoomCard from "./components/RoomCard";
import BookForm from "./components/BookForm";
import DisclaimerBox from "./components/DisclaimerBox";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  useCancelBooking,
  useGetBookedHotel,
  useGetBookingHistoryById
} from "@/services/book.service";
import { paymentStatuses } from "@/consts/paymentMethods";
import { getRoomNameFromResponse } from "@/utils/hotelFunctions";
import { Header } from "@/components/Header";
import moment from "moment";
import classNames from "classnames";
import { CancellationInfo } from "./components/CancellationInfo";
import { useGetHotelContent } from "@/services/hotel.service";
import { languageKeys } from "@/consts/languages";

export function BookedHotel() {
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [hotelImages, setHotelImages] = useState([]);
  const [searchParams] = useSearchParams();
  const [data, setData] = useState();
  const {
    state: { otp, email, reservationLocator }
  } = useLocation();

  const getHotelContent = useGetHotelContent();

  const { refetch } = useGetBookedHotel({
    params: {
      email,
      reservationLocator,
      otp
    },
    queryParams: {
      enabled: !!otp && !!email && !!otp,
      onSuccess: (res) => {
        setData(res);
      },
      onError: (err) => {
        toast.error(err.data.message);
      }
    }
  });

  const { refetch: refetchBooking } = useGetBookingHistoryById({
    id: searchParams.get("booking_id"),
    queryParams: {
      enabled: !!searchParams.get("booking_id"),
      onSuccess: (res) => {
        setData(res);
      }
    }
  });

  const cancellationExpiredDate = useMemo(() => {
    const firstDayCostCancellation =
      data?.items[0]?.cancellationPolicy?.firstDayCostCancellation?.value;

    // if (
    //   firstDayCostCancellation &&
    //   moment(firstDayCostCancellation)
    //     .subtract(1, "days")
    //     .isAfter(moment().format("YYYY-MM-DD"))
    // ) {
    //   return moment(firstDayCostCancellation)
    //     .subtract(1, "days")
    //     .format("YYYY-MM-DD");
    // }

    if (
      firstDayCostCancellation &&
      moment(firstDayCostCancellation).isAfter(moment().format("YYYY-MM-DD"))
    ) {
      return moment(firstDayCostCancellation).format("YYYY-MM-DD");
    }

    return null;
  }, [data]);

  const { mutate, isLoading } = useCancelBooking({
    queryParams: {
      onSuccess: (res) => {
        if (otp && email) refetch();
        if (searchParams.get("booking_id")) refetchBooking();
        setIsOpenCancel(false);
        setCancelSuccess(true);
      }
    }
  });

  const onOpenCancel = () => setIsOpenCancel(true);
  const onCloseCancel = () => setIsOpenCancel(false);

  const totalPrice = data?.payment?.amount;

  const roomName = useMemo(() => {
    if (!data) return "";
    return getRoomNameFromResponse(data?.items[0]?.hotelRooms);
  }, [data]);

  useEffect(() => {
    function getHContent() {
      getHotelContent.mutate(
        {
          language: languageKeys.KR,
          JPCode: [data.items[0].hotelInfo.code]
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

    if (data?.items) getHContent();
  }, [data]);

  const hotelIsUsed =
    moment().format("YYYY-MM-DD") === data?.items[0]?.attributes?.end ||
    moment().isAfter(data?.items[0]?.attributes?.end);

  return (
    <>
      <Header />
      {cancelSuccess ? (
        <CancellationInfo data={data} />
      ) : (
        <section className="container mx-auto max-w-[1170px] mt-5 px-4 sm:px-0 sm:mt-8">
          <h1 className="mb-[30px] text-xl sm:text-[24px] font-medium">
            예약 내역 확인
          </h1>

          <div className="sm:grid grid-cols-3 gap-[30px]">
            <div className="flex flex-col col-span-1 gap-5">
              <div className="py-8 px-5 border border-solid border-gray-100 rounded-[10px]">
                <RoomCard
                  name={roomName}
                  roomAmount={data?.items[0]?.hotelRooms?.length}
                  persons={data?.paxes?.length - 1}
                  images={hotelImages}
                  price={data?.items[0]?.prices?.totalFixAmounts?.gross}
                  checkIn={data?.items[0]?.attributes?.start}
                  checkOut={data?.items[0]?.attributes?.end}
                  meal="조식불포함"
                  location={data?.items[0]?.hotelInfo?.address}
                  title={data?.items[0]?.hotelInfo?.name}
                />
              </div>
              <div className="hidden sm:block py-8 px-5 border border-solid border-gray-100 rounded-[10px]">
                <CheckoutBox
                  orderAmount={1}
                  roomsPrice={data?.items[0]?.prices?.totalFixAmounts?.gross}
                  promocodePrice={data?.promoCodeValue}
                  totalPrice={totalPrice}
                />
              </div>

              {hotelIsUsed && data?.status !== "CANCELLED" && (
                <div className="hidden sm:flex w-full flex-col gap-[10px]">
                  <p className="text-[#2D40FF] text-lg py-2 border-t-2 text-center font-medium border-b-2 border-[#2D40FF]">
                    이용 완료
                  </p>
                  <p className="text-[13px] text-[#A3A5B8] text-center">
                    과거 이용하신 호텔입니다.
                  </p>
                </div>
              )}

              {data?.status === "CANCELLED" && (
                <div className="hidden sm:flex w-full flex-col gap-[10px]">
                  <p className="text-[#FF176B] text-lg py-2 border-t-2 text-center font-medium border-b-2 border-[#FF176B]">
                    취소 완료
                  </p>
                  <p className="text-[13px] text-[#A3A5B8] text-center">
                    취소된 호텔입니다.
                  </p>
                </div>
              )}

              {data?.status !== "CANCELLED" && !hotelIsUsed && (
                <div className="hidden sm:flex w-full flex-col">
                  <Button
                    disabled={!cancellationExpiredDate}
                    onClick={onOpenCancel}
                  >
                    {cancellationExpiredDate ? "예약 취소" : "취소 불가"}
                  </Button>
                  <p
                    className={classNames(
                      "text-center font-medium text-[13px] mt-2",
                      cancellationExpiredDate
                        ? "text-primary-600"
                        : "text-[#A3A5B8]"
                    )}
                  >
                    {cancellationExpiredDate
                      ? moment(new Date(cancellationExpiredDate)).format(
                          "YYYY년 MM월 DD일까지 취소 가능"
                        )
                      : "취소 불가능합니다."}
                  </p>
                </div>
              )}
            </div>
            <div className="flex col-span-2 flex-col gap-5 sm:mt-0 mt-5">
              <div className="py-8 px-5 border border-solid border-gray-100 rounded-[10px]">
                <BookForm
                  paxes={data?.paxes
                    ?.slice(0, data?.paxes?.length - 1)
                    .filter(
                      (item) => item.name && !item.name.includes("Synaptic")
                    )}
                  reservationLocator={reservationLocator}
                  createdAt={data?.createdAt}
                  paymentMethod={data?.payment?.paymentMethod}
                  status={paymentStatuses[data?.status]}
                />
              </div>
              <div className="py-8 px-5 border border-solid border-gray-100 rounded-[10px]">
                <DisclaimerBox
                  comments={data?.items[0]?.comments[0].value}
                  cancellationPolicyComments={
                    data?.items[0]?.cancellationPolicy?.description
                  }
                />
              </div>
            </div>
            <div className="block sm:hidden py-8 px-5 border border-solid border-gray-100 rounded-[10px] mt-5">
              <CheckoutBox
                orderAmount={1}
                roomsPrice={data?.items[0]?.prices?.totalFixAmounts?.gross}
                totalPrice={totalPrice}
              />
            </div>

            {data?.status !== "CANCELLED" && hotelIsUsed && (
              <div className="flex sm:hidden w-full flex-col mt-5 gap-[10px]">
                <p className="text-[#2D40FF] text-center text-lg py-2 border-t-2 border-b-2 border-[#2D40FF]">
                  이용 완료
                </p>
                <p className="text-[13px] text-[#A3A5B8] text-center">
                  과거 이용하신 호텔입니다.
                </p>
              </div>
            )}

            {data?.status === "CANCELLED" && (
              <div className="flex sm:hidden w-full flex-col mt-5 gap-[10px]">
                <p className="text-[#FF176B] text-center text-lg py-2 border-t-2 border-b-2 border-[#FF176B]">
                  취소 완료
                </p>
                <p className="text-[13px] text-[#A3A5B8] text-center">
                  취소된 호텔입니다.
                </p>
              </div>
            )}

            {data?.status !== "CANCELLED" && !hotelIsUsed && (
              <div className="flex sm:hidden w-full flex-col mt-5">
                <Button
                  disabled={!cancellationExpiredDate}
                  onClick={onOpenCancel}
                >
                  {cancellationExpiredDate ? "예약 취소" : "취소 불가"}
                </Button>
                <p
                  className={classNames(
                    "text-center font-medium text-[13px] mt-2",
                    cancellationExpiredDate
                      ? "text-primary-600"
                      : "text-[#A3A5B8]"
                  )}
                >
                  {cancellationExpiredDate
                    ? moment(new Date(cancellationExpiredDate)).format(
                        "YYYY년 MM월 DD일까지 취소 가능"
                      )
                    : "취소 불가능합니다."}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      <Dialog
        isOpen={isOpenCancel}
        onClose={onCloseCancel}
        withCloseButton={false}
        className="sm:w-[400px] w-full transform overflow-hidden rounded-[10px] bg-white py-[40px] sm:px-[100px] px-[50px] text-left align-middle shadow-xl transition-all "
      >
        <div className="flex flex-col items-center">
          <p className="text-lg text-center">예약을 취소하시겠습니까?</p>
          <div className="grid grid-cols-2 mt-[44px] w-full gap-2">
            <Button
              onClick={onCloseCancel}
              type="button"
              variant="secondary"
              className="w-full"
              size="sm"
            >
              닫기
            </Button>
            <Button
              onClick={() => {
                if (cancellationExpiredDate)
                  mutate({
                    hotels: [
                      {
                        bookingId: data.id,
                        reservationLocator: data.attributes.locator
                      }
                    ]
                  });
              }}
              isLoading={isLoading}
              type="button"
              className="w-full"
              size="sm"
            >
              확인
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
