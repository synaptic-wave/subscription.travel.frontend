import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "@/store/common/common.slice";
import { Button } from "@/components/index";
import { useNavigate } from "react-router-dom";

import CloseIcon from "@/assets/icons/close.svg?react";
import ChevronUpIcon from "@/assets/icons/chevron-up.svg?react";
import { useCreateSession } from "@/services/search.service";

const CompareHotelItem = ({ hotel }) => {
  const dispatch = useDispatch();

  return (
    <div className="sm:w-[270px] w-full p-5 border border-gray-100 rounded-xl flex justify-between items-start">
      <span className="text-[15px] font-normal w-[85%]">{hotel?.name}</span>
      <button
        onClick={() =>
          dispatch(
            commonActions.toggleHotelFromCompareList({ JPCode: hotel.JPCode })
          )
        }
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export const CompareBar = ({
  checkIn,
  checkOut,
  occupancies,
  nationality,
  destination
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createSession = useCreateSession();

  const { isOpen, hotels } = useSelector(
    (store) => store.common.comparedHotels
  );

  const onChooseHotels = async () => {
    let amount = 0;

    const paxes = occupancies.map((occupancy, index) => {
      const passangers = [
        ...Array(occupancy.adults)
          .fill(1)
          .map((_, idx) => ({
            idPax: idx + 1 + amount,
            age: 35
          })),
        ...Array(occupancy.child)
          .fill(1)
          .map((_, idx) => ({
            idPax: idx + occupancy.adults + 1 + amount,
            age: Number(occupancy.childAges[idx])
          }))
      ];

      amount = amount + passangers.length;

      return {
        roomId: index + 1,
        passangers
      };
    });

    const payload = {
      paxes,
      language: import.meta.env.VITE_JUNIPER_LANG,
      destination,
      nationality: nationality,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      hotelCodes: [...hotels.map((hotel) => hotel.JPCode)] // JPCode
    };

    createSession.mutate(payload, {
      onSuccess: (res) => {
        navigate(`/compare?sessionId=${res.search_session_id}`);
      },
      onError: (err) => {
        console.log(err);
        // toast.error("Error on checking hotel");
        navigate(`/compare`);
      }
    });
  };

  if (!isOpen) return <></>;

  return (
    <div className="fixed bottom-0 w-full min-h-[175px] bg-white border-t border-[#2D40FF] shadow-[0px -2px 4px 0px #00000040] z-20">
      <button
        onClick={() => dispatch(commonActions.toggleCompareBar())}
        className="absolute sm:right-[5%] right-[10%] translate-y-[-30px] bg-white w-[30px] h-[30px] translate-x-[90%] flex justify-center items-center border-t border-r border-l border-[#2D40FF]"
      >
        <ChevronUpIcon />
      </button>
      <div className="container mx-auto grid grid-cols-4 gap-10">
        <div className="hidden md:flex"></div>
        <div className="md:col-span-3 col-span-4 py-[21px]">
          <div className="grid grid-cols-12 gap-3">
            <div className="sm:col-span-9 col-span-12">
              <div className="flex flex-col">
                <h5 className="text-lg text-[#161A3F] font-medium">
                  호텔 비교
                </h5>
                <div className="w-full flex sm:gap-5 max-h-[400px] overflow-y-auto gap-2 mt-[17px] flex-wrap">
                  {hotels.map((hotel) => (
                    <CompareHotelItem key={hotel.JPCode} hotel={hotel} />
                  ))}
                </div>
              </div>
            </div>
            <div className="sm:col-span-3 col-span-12 flex justify-end gap-4">
              <Button
                variant="outlined"
                className="border border-[#2D40FF] text-[#2D40FF] w-[90px]"
                onClick={() => dispatch(commonActions.clearCompareList())}
              >
                취소
              </Button>
              <Button
                disabled={createSession.isLoading}
                variant="default"
                onClick={onChooseHotels}
              >
                호텔비교
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
