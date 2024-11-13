import { useMemo, useState } from "react";
import { CheckoutBox } from "./CheckoutBox";
import { RoomCard } from "./RoomCard";
import { useCancelBooking } from "@/services/book.service";
import { Button, Dialog } from "@/components/index";
import moment from "moment";
import CheckIcon from "@/assets/icons/check.svg?react";
import warningGif from "@/assets/gifs/warning.gif";

export function ReservationInfoCard({ group, refetch, data }) {
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isCancelSuccess, setIsCancelSuccess] = useState(false);
  const [isCancelFailed, setIsCancelFailed] = useState(false);
  const onOpenCancel = () => {
    setIsOpenCancel(true);
  };

  const onCloseCancel = () => {
    setIsOpenCancel(false);
  };

  const cancellationExpiredDate = useMemo(() => {
    const firstDayCostCancellation =
      data?.items?.[0]?.cancellationPolicy?.firstDayCostCancellation?.value;

    if (
      firstDayCostCancellation &&
      moment(firstDayCostCancellation)
        .subtract(1, "days")
        .isAfter(moment().format("YYYY-MM-DD"))
    ) {
      return moment(firstDayCostCancellation)
        .subtract(1, "days")
        .format("YYYY-MM-DD");
    }

    return null;
  }, [data]);

  const { mutate, isLoading } = useCancelBooking({
    queryParams: {
      onSuccess: (res) => {
        refetch();
        setIsOpenCancel(false);
        setIsCancelSuccess(true);
      },
      onError: () => {
        setIsCancelFailed(true);
      }
    }
  });

  return (
    <>
      <div className="mt-[20px] sm:mt-[30px] flex flex-col-reverse sm:grid grid-cols-12 gap-[17px] sm:gap-[30px] border-b border-solid border-gray-100 pb-5">
        <div className="col-span-4">
          <CheckoutBox
            data={data}
            totalPayment={1}
            totalAmount={data?.payment?.amount}
            onOpenCancel={onOpenCancel}
            cancellationExpiredDate={cancellationExpiredDate}
          />
        </div>
        <div className="col-span-8">
          <div className="border rounded-[10px] border-gray-100">
            <RoomCard
              item={data}
              key={data?.attributes?.locator}
              cancellationExpiredDate={cancellationExpiredDate}
            />
          </div>
        </div>
      </div>
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
                        bookingId: data._id,
                        reservationLocator: data?.attributes?.locator
                      }
                    ]
                  });
              }}
              isLoading={isLoading}
              disabled={isLoading}
              type="button"
              className="w-full"
              size="sm"
            >
              확인
            </Button>
          </div>
        </div>
      </Dialog>
      <Dialog
        isOpen={isCancelSuccess}
        withCloseButton={false}
        onClose={() => setIsCancelSuccess(false)}
        className="sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[100px] text-left align-middle shadow-xl transition-all "
      >
        <div className="flex flex-col items-center ">
          <CheckIcon />
          <p className="text-xl sm:text-2xl mt-[10px] text-center">
            예약이 취소되었습니다
          </p>
          <p className="mt-[10px] sm:mt-[41px] text-sm sm:text-base text-center text-[#5C5F79]">
            고객님의 예약이 정상적으로 취소되었습니다.
          </p>
          <Button
            onClick={() => setIsCancelSuccess(false)}
            type="button"
            className="w-full mt-[30px] sm:mt-[70px]"
          >
            이전으로 돌아가기
          </Button>
        </div>
      </Dialog>
      <Dialog
        isOpen={isCancelFailed}
        withCloseButton={false}
        onClose={() => setIsCancelFailed(false)}
        className="sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[100px] text-left align-middle shadow-xl transition-all "
      >
        <div className="flex flex-col items-center ">
          <img src={warningGif} width={80} height={80} />
          <p className="text-xl sm:text-2xl mt-[10px] text-center">
            예약 취소에 실패하였습니다.
          </p>
          <p className="mt-[14px] text-sm sm:text-base text-center text-[#5C5F79]">
            고객님의 예약 취소에 실패하였습니다.
            <br />
            취소/환불 조건을 확인하시고 다시 시도해 주십시요.
            <br />
            만일 취소가 가능하나 취소가 되지 않는 경우
            <br />
            {data?.attributes?.locator}로 문의해 주십시요
          </p>
          <Button
            onClick={() => setIsCancelFailed(false)}
            type="button"
            className="w-full mt-[22px]"
          >
            이전으로 돌아가기
          </Button>
        </div>
      </Dialog>
    </>
  );
}
