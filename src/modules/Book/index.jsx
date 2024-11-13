import { Button, Dialog } from "@/components/index";
import CheckoutBox from "./components/CheckoutBox";
import RoomCard from "./components/RoomCard";
import BookForm from "./components/BookForm";
import DisclaimerBox from "./components/DisclaimerBox";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { service, useBookingRules, usePreBook } from "@/services/book.service";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { paymentType, paymentTypes } from "@/consts/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { calculateOccupancy } from "./utils/calculateOccupancy";
import { schema } from "./consts/validation";
import {
  getCancelationExpiredDate,
  getRoomName,
  getRoomPaxes
} from "@/utils/hotelFunctions";
import { Header } from "@/components/Header";
import RoomCardSkeleton from "./components/RoomCardSkeleton";
import BookFormSkeleton from "./components/BookFormSkeleton";
import { toast } from "react-toastify";
import { languageKeys } from "@/consts/languages";
import { useProfile } from "@/services/auth.service";
import { useSelector } from "react-redux";
import useDebounce from "@/hooks/useDebouce";
import { fetchHotelNames } from "../SearchResult";
import { SuspectHotelName } from "@/components/SuspectHotelName";
import { useCheckPromocode } from "@/services/promocode.service";
import warningGif from "@/assets/gifs/warning.gif";

export function getMostExpensiveHotelCode(hotels) {
  if (!Array.isArray(hotels) || hotels.length === 0) {
    return;
  }

  return hotels.reduce((mostExpensiveHotel, currentHotel) => {
    return parseFloat(currentHotel.price) > parseFloat(mostExpensiveHotel.price)
      ? currentHotel
      : mostExpensiveHotel;
  }).hotelCode;
}

export function Book() {
  const { state } = useLocation();
  const { isAuth } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [hotelRooms, setHotelRooms] = useState([]);
  const [formIds, setFormIds] = useState([]);
  const [promocode, setPromocode] = useState("");
  const [promocodeId, setPromocodeId] = useState("");
  const [promocodePrice, setPromocodePrice] = useState();
  const [isLoadingPromocode, setIsLoadingPromocode] = useState();
  const [openPromocodeNotExist, setOpenPromocodeNotExist] = useState(false);
  const [priceCheckInvalid, setPriceCheckInvalid] = useState(false);
  const [isUserAlreadyUsedThisDiscount, setIsUserAlreadyUsedThisDiscount] =
    useState(false);

  const { control, handleSubmit, setValue, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      hotelPaxes: []
    }
  });

  const { fields } = useFieldArray({
    control,
    name: "hotelPaxes"
  });

  const hotelPaxes = useWatch({
    control,
    name: "hotelPaxes"
  });

  const name = useWatch({
    control,
    name: "hotelPaxes[0].roomPaxes[0].passangers[0].name"
  });

  const email = useWatch({
    control,
    name: "hotelPaxes[0].roomPaxes[0].passangers[0].email"
  });

  const phone = useWatch({
    control,
    name: "hotelPaxes[0].roomPaxes[0].passangers[0].phone"
  });

  const surname = useWatch({
    control,
    name: "hotelPaxes[0].roomPaxes[0].passangers[0].surname"
  });

  const debouncedName = useDebounce(name, 600);
  const debouncedEmail = useDebounce(email, 600);
  const debouncedSurname = useDebounce(surname, 600);
  const debouncedPhone = useDebounce(phone, 600);

  useEffect(() => {
    if (hotelPaxes.length > 0 && debouncedPhone) {
      hotelPaxes.forEach((_, index) => {
        if (index > 0) {
          if (formState?.touchedFields?.hotelPaxes) {
            if (!formState.touchedFields?.hotelPaxes[index]) {
              setValue(
                hotelPaxes[`${index}`].roomPaxes[0].passangers[0].phone,
                debouncedPhone
              );
            } else if (
              formState.touchedFields.hotelPaxes[index] &&
              !formState.touchedFields.hotelPaxes[index].roomPaxes[0]
                .passangers[0].phone
            ) {
              setValue(
                hotelPaxes[`${index}`].roomPaxes[0].passangers[0].phone,
                debouncedPhone
              );
            }
          } else {
            setValue(
              hotelPaxes[`${index}`].roomPaxes[0].passangers[0].phone,
              debouncedPhone
            );
          }
        }
      });
    }
  }, [debouncedPhone]);

  useEffect(() => {
    if (hotelPaxes.length > 0 && debouncedEmail) {
      hotelPaxes.forEach((_, index) => {
        if (index > 0) {
          if (formState?.touchedFields?.hotelPaxes) {
            if (!formState.touchedFields?.hotelPaxes[index]) {
              setValue(
                hotelPaxes[`${index}`].roomPaxes[0].passangers[0].email,
                debouncedEmail
              );
            } else if (
              formState.touchedFields.hotelPaxes[index] &&
              !formState.touchedFields.hotelPaxes[index].roomPaxes[0]
                .passangers[0].email
            ) {
              setValue(
                hotelPaxes[`${index}`].roomPaxes[0].passangers[0].email,
                debouncedEmail
              );
            }
          } else {
            setValue(
              hotelPaxes[`${index}`].roomPaxes[0].passangers[0].email,
              debouncedEmail
            );
          }
        }
      });
    }
  }, [debouncedEmail]);

  useEffect(() => {
    if (hotelPaxes.length > 0 && debouncedName) {
      hotelPaxes.forEach((_, index) => {
        if (index > 0) {
          if (formState?.touchedFields?.hotelPaxes) {
            if (!formState.touchedFields?.hotelPaxes[index]) {
              setValue(
                hotelPaxes[`${index}`].roomPaxes[0].passangers[0].name,
                debouncedName
              );
            } else if (
              formState.touchedFields.hotelPaxes[index] &&
              !formState.touchedFields.hotelPaxes[index].roomPaxes[0]
                .passangers[0].name
            ) {
              setValue(
                hotelPaxes[`${index}`].roomPaxes[0].passangers[0].name,
                debouncedName
              );
            }
          } else {
            setValue(
              hotelPaxes[`${index}`].roomPaxes[0].passangers[0].name,
              debouncedName
            );
          }
        }
      });
    }
  }, [debouncedName]);

  useEffect(() => {
    if (hotelPaxes.length > 0 && debouncedSurname) {
      hotelPaxes.forEach((_, index) => {
        if (index > 0) {
          if (formState?.touchedFields?.hotelPaxes) {
            if (!formState.touchedFields?.hotelPaxes[index]) {
              setValue(
                hotelPaxes[`${index}`].roomPaxes[0].passangers[0].surname,
                debouncedSurname
              );
            } else if (
              formState.touchedFields.hotelPaxes[index] &&
              !formState.touchedFields.hotelPaxes[index].roomPaxes[0]
                .passangers[0].surname
            ) {
              setValue(
                hotelPaxes[`${index}`].roomPaxes[0].passangers[0].surname,
                debouncedSurname
              );
            }
          } else {
            setValue(
              hotelPaxes[`${index}`].roomPaxes[0].passangers[0].surname,
              debouncedSurname
            );
          }
        }
      });
    }
  }, [debouncedSurname]);

  const navigate = useNavigate();
  const [selectedPaymentType, setSelectedPaymentType] = useState(
    paymentType.CARD
  );

  const preBook = usePreBook();

  const [checked, setChecked] = useState(false);

  const onChangePaymentType = (value) => {
    setSelectedPaymentType(value);
  };

  useProfile({
    key: "booking",
    queryParams: {
      enabled: !!hotelPaxes && hotelPaxes.length > 0 && isAuth,
      onSuccess: (res) => {
        const _hotelPaxes = hotelPaxes;
        _hotelPaxes[0].roomPaxes[0].passangers[0].name = res.user_first_name;
        _hotelPaxes[0].roomPaxes[0].passangers[0].surname = res.user_last_name;
        _hotelPaxes[0].roomPaxes[0].passangers[0].phone =
          res?.user_mobile_phone;
        _hotelPaxes[0].roomPaxes[0].passangers[0].email = res?.user_email;
        setValue("hotelPaxes", _hotelPaxes);
      }
    }
  });

  const getBookingRules = async (_promocode) => {
    if (!_promocode) setIsLoading(true);
    else setIsLoadingPromocode(true);

    const _formIds = {};
    let hotelPaxes = [];
    let _hotelRooms = [];
    let translatedHotels = await fetchHotelNames(
      state.hotels?.map((hotel) => ({
        attributes: {
          ...hotel,
          JPCode: hotel?.hotelCode
        }
      }))
    );

    const _totalPrice =
      hotelRooms?.reduce((prev, curr) => prev + Number(curr.price), 0) || 0;

    const _mostExpensiveHotelCode = getMostExpensiveHotelCode(hotelRooms);

    await Promise.all(
      state.hotels.map(async (item, hotelIndex) => {
        let res;

        try {
          const _payload = {
            language: import.meta.env.VITE_JUNIPER_LANG || languageKeys.KR,
            ratePlanCode: item.rate,
            checkInDate: item.checkIn, //this field should be same with hotel /hotel-availability
            checkOutDate: item.checkOut,
            hotelCode: item.hotelCode
          };

          if (item.hotelCode === _mostExpensiveHotelCode && _promocode) {
            _payload.promoCode = _promocode;
          }

          res = await service.bookingRules(_payload);
        } catch (err) {
          toast.error(err?.data?.data?.message?.promocode);
        }

        if (state.hotels.length - 1 === hotelIndex)
          setIsLoadingPromocode(false);

        if (!res) return null;

        if (_promocode && res.AdjustmentResult) {
          const _couponPrice =
            res?.AdjustmentResult?.PriceInformation?.Price?.TotalFixAmounts
              ?.attributes?.Gross;

          // check if diff between coupon price and total price more than 1000 KRW
          if (_totalPrice + Number(_couponPrice) < 1000)
            toast.error("Invalida promocode for current hotel");
          else setPromocodePrice(res.AdjustmentResult);
        }

        if (
          _promocode &&
          !res.AdjustmentResult &&
          item.hotelCode === _mostExpensiveHotelCode
        ) {
          toast.error("이 프로모션 코드에서는 할인을 찾을 수 없습니다.");
        }

        const option = res.HotelResult.HotelOptions.HotelOption;
        let relPaxesDist =
          option.HotelRequiredFields.HotelBooking.Elements.HotelElement
            .RelPaxesDist.RelPaxDist;
        let paxes = option.HotelRequiredFields.HotelBooking.Paxes.Pax;

        paxes = Array.isArray(paxes) ? paxes : [paxes];

        relPaxesDist = Array.isArray(relPaxesDist)
          ? relPaxesDist
          : [relPaxesDist];

        const paxesWithAge = {};

        paxes.forEach((item) => {
          paxesWithAge[item.attributes.IdPax] = {
            age: +item.Age,
            nameIsRequired: !!item.Name,
            nationalityIsRequired:
              +item.attributes.IdPax === 1 ? true : !!item.Nationality,
            surnameIsRequired: !!item.Surname
          };
        });

        const { roomName, roomAmount } = getRoomName(
          option.PriceInformation.HotelRooms.HotelRoom
        );

        const images = option.PriceInformation?.HotelContent?.Images?.Image;
        const foundHotel = translatedHotels.find(
          (hotel) => hotel?.attributes?.JPCode === item?.hotelCode
        );
        const _hotelName =
          res?.HotelResult?.HotelOptions?.HotelOption?.PriceInformation
            ?.HotelContent?.HotelName;
        const _hotelAddress =
          res?.HotelResult?.HotelOptions?.HotelOption?.PriceInformation
            ?.HotelContent?.Address?.Address;

        _hotelRooms = [
          {
            name: roomName,
            hotelCode: item?.hotelCode,
            price:
              option.PriceInformation.Prices.Price.TotalFixAmounts.attributes
                .Gross,
            checkIn: item.checkIn,
            checkOut: item.checkOut,
            roomAmount: roomAmount,
            address: foundHotel?.HotelInfo?.Address || _hotelAddress, // option.PriceInformation.HotelContent.Address.Address,
            title: foundHotel?.HotelInfo?.Name,
            titleEn: foundHotel?.HotelInfo?.NameEn || _hotelName,
            meal: option?.PriceInformation?.Board?.value,
            personsAmount: paxes.length,
            images: images
              ? Array.isArray(images)
                ? images?.map((img) => img?.FileName)?.filter((img) => img)
                : [images.FileName]
              : []
          },
          ..._hotelRooms
        ];

        const _roomPaxes = calculateOccupancy({
          paxesWithAge,
          relPaxesDist
        });

        const requiredPaxes = _roomPaxes
          .map((_room) => ({
            ..._room,
            passangers: _room.passangers.filter(
              (passanger) => passanger.nationalityIsRequired
            )
          }))
          .filter((item) => item.passangers.length > 0);

        requiredPaxes.forEach((_room) => {
          _room.passangers.forEach((passanger) => {
            _formIds[
              `${hotelIndex}${_room.roomId}${passanger.idPax}`
            ] = `${hotelIndex}${_room.roomId}${passanger.idPax}`;
          });
        });

        // setValue('roomPaxes', _roomPaxes)

        hotelPaxes = [
          {
            hotelCode: item.hotelCode,
            hotelName: option.PriceInformation.HotelContent.HotelName,
            roomPaxes: _roomPaxes,
            hotelOption: option,
            checkIn: item.checkIn,
            checkOut: item.checkOut,
            ratePlanCode: item.rate,
            bookingCode: option.BookingCode.value
          },
          ...hotelPaxes
        ];
        return res?.HotelResult.HotelOptions.HotelOption;
      })
    );

    if (_hotelRooms.length === 0) return;

    setFormIds(_formIds);
    setIsLoading(false);
    setHotelRooms(_hotelRooms);
    setValue("hotelPaxes", hotelPaxes);
  };

  useEffect(() => {
    getBookingRules();
  }, [state.hotels]);

  const totalAmountHotel = hotelPaxes
    ? hotelPaxes.reduce(
        (a, b) =>
          a +
          +b.hotelOption?.PriceInformation?.Prices?.Price?.TotalFixAmounts
            .attributes.Gross,
        0
      )
    : 0;

  const handleBook = (value) => {
    // for (let i = 0; i < value.hotelPaxes.length; i++) {
    //   const cancellationDate = getCancelationExpiredDate(
    //     value.hotelPaxes[i].hotelOption
    //   )
    //   if (
    //     !cancellationDate &&
    //     import.meta.env.VITE_DISABLE_NON_REFUNDABLE === 'true'
    //   )
    //     return toast.error(
    //       'You cannot make NRF bookings in the test environment. Please remember to cancel any bookings by 23:00 today!'
    //     )
    // }

    const payload = {
      language: import.meta.env.VITE_JUNIPER_LANG || languageKeys.KR,
      promoCode: {
        id: promocodeId,
        code: promocode.replace(/\s+/g, ""),
        price: Math.abs(promocodePrice)
      },
      totalPrice: totalAmountHotel - (promocodePrice || 0),
      hotels: value.hotelPaxes.map((item) => ({
        ratePlanCode: item.ratePlanCode,
        hotelName: item.hotelName,
        paxes: {
          holderIdPax: 1,
          roomPaxes: getRoomPaxes(item)
        },

        payment: {
          paymentMethod: selectedPaymentType,
          currencyType:
            item.hotelOption?.PriceInformation.Prices.Price.attributes.Currency,
          amount:
            item.hotelOption?.PriceInformation?.Prices?.Price?.TotalFixAmounts
              .attributes.Gross
        }
      }))
    };

    if (!promocodeId) delete payload.promoCode;

    preBook.mutate(payload, {
      onSuccess: (res) => {
        navigate("/pre-book", {
          state: {
            pre_booking_session_id: res.pre_booking_session_id,
            hotels: hotelPaxes,
            hotelRooms,
            signature: res.signature,
            paymentMethod: selectedPaymentType,
            language: import.meta.env.VITE_JUNIPER_LANG || languageKeys.KR,
            promocode,
            promocodePrice
          }
        });
      },
      onError: (err) => {
        if (err?.data?.message === "PROMOCODE_NOT_ALLOWED")
          setIsUserAlreadyUsedThisDiscount(true);
        else toast.error(err?.data?.data);
      }
    });
  };

  const onOpenAccordion = (value) => {
    const _formIds = { ...formIds };
    if (_formIds[value]) {
      delete _formIds[value];
      setFormIds(_formIds);
    } else {
      setFormIds((prev) => ({
        ...prev,
        [value]: value
      }));
    }
  };

  const checkPromocode = useCheckPromocode({
    id: promocode.trimStart().trimEnd(),
    queryParams: {
      enabled: false,
      onSuccess: (res) => {
        const validAmount = totalAmountHotel - res.value > 0;

        if (totalAmountHotel < 100000) {
          return setPriceCheckInvalid(true);
        }

        if (res.valid && validAmount) {
          setPromocodeId(res.id);
          setPromocodePrice(res.value);
        } else {
          setOpenPromocodeNotExist(true);
        }
      },
      onError: (err) => {
        if (err?.message === "PROMOCODE_NOT_ALLOWED")
          setIsUserAlreadyUsedThisDiscount(true);
        else setOpenPromocodeNotExist(true);
      }
    }
  });

  const onCheckPromocode = () => {
    checkPromocode.refetch();
  };

  return (
    <>
      <Header />

      <section className="container mx-auto max-w-[1170px] mt-[20px] px-4 sm:px-0 sm:mt-8">
        <h1 className="mb-[30px] text-xl sm:text-[24px] font-medium">
          예약 확인 및 결제
        </h1>

        <form
          onSubmit={handleSubmit(handleBook)}
          className="grid grid-cols-3 gap-[30px]"
        >
          <div className="flex flex-col sm:col-span-1 col-span-3 gap-5">
            <div className="px-[20px] py-[30px] gap-[30px] flex flex-col sm:py-8 sm:px-5 border border-solid border-gray-100 rounded-[10px]">
              {isLoading && <RoomCardSkeleton />}
              {!isLoading &&
                hotelRooms.map((item, index) => (
                  <RoomCard
                    meal={item.meal}
                    key={`${item.title}-${index}`}
                    roomAmount={item.roomAmount}
                    personsAmount={item.personsAmount}
                    images={item.images}
                    price={item.price}
                    checkIn={item.checkIn}
                    checkOut={item.checkOut}
                    location={item.address}
                    title={item.title}
                    titleEn={item.titleEn}
                    roomType={item.name}
                    hotelCode={item?.hotelCode}
                  />
                ))}

              {/* <div className="h-[1px] w-full bg-[#F3F3FB] my-7"></div> */}
            </div>

            <div className="sm:block hidden py-8 px-5 border border-solid border-gray-100 rounded-[10px]">
              <CheckoutBox
                promocodePrice={promocodePrice}
                totalAmountHotel={totalAmountHotel}
                orderAmount={1}
                checked={checked}
                setChecked={setChecked}
              />
            </div>

            <div className="hidden sm:block py-8 px-5 border border-solid border-gray-100 rounded-[10px]">
              <DisclaimerBox
                isLoadingPromocode={isLoadingPromocode}
                onCheckPromocode={onCheckPromocode}
                promocode={promocode}
                hasAppliedPromoced={!!promocodePrice}
                onChangePromocode={setPromocode}
                paymentTypes={paymentTypes}
                selectedPaymentType={selectedPaymentType}
                onChangePaymentType={onChangePaymentType}
                isLoading={checkPromocode.isLoading}
              />
            </div>

            <p className="sm:block hidden text-xs text-[#FF3838]">
              *금일 환율을 실시간 공급가격에 적용하여 원화로 환산한 결제
              금액입니다. 나중에 예약시 가격이 변동될 수 있습니다.
            </p>

            <Button
              type="submit"
              className="sm:flex justify-center hidden"
              disabled={!checked}
              isLoading={preBook.isLoading}
              // onClick={() => setIsOpenPolicy(true)}
            >
              지금 예약
            </Button>
          </div>
          <div className="flex sm:col-span-2 col-span-3 flex-col gap-5">
            {!isLoading &&
              fields?.map((item, index) => (
                <div className="flex flex-col gap-[6px]" key={item.id}>
                  <div className="flex items-center gap-[10px] sm:gap-[40px] py-[9px] px-4 sm:px-[30px] border border-[#EAEAF4] rounded-[10px]">
                    <p className="text-base sm:text-xl font-medium whitespace-nowrap ">
                      호텔 {index + 1}
                    </p>
                    <h5 className="text-base sm:text-xl font-medium">
                      <SuspectHotelName
                        jpCode={item?.hotelCode}
                        defaultName={item?.hotelName}
                      />
                    </h5>
                  </div>

                  <BookForm
                    useWatch={useWatch}
                    control={control}
                    onChangePaymentType={onChangePaymentType}
                    selectedPaymentType={selectedPaymentType}
                    onOpenAccordion={onOpenAccordion}
                    formIds={formIds}
                    fields={item.roomPaxes}
                    setValue={setValue}
                    description={
                      item.hotelOption.CancellationPolicy.Description
                    }
                    hotelIndex={index}
                    comment={
                      item.hotelOption.OptionalElements?.Comments?.Comment
                        ?.value
                    }
                  />
                </div>
              ))}
            {isLoading && (
              <div className="py-8 px-5 border border-solid border-gray-100 rounded-[10px]">
                <BookFormSkeleton
                  control={control}
                  onChangePaymentType={onChangePaymentType}
                  selectedPaymentType={selectedPaymentType}
                />
              </div>
            )}
            <div className="block sm:hidden py-8 px-5 border border-solid border-gray-100 rounded-[10px]">
              <DisclaimerBox
                paymentTypes={paymentTypes}
                selectedPaymentType={selectedPaymentType}
                onChangePaymentType={onChangePaymentType}
                isLoadingPromocode={isLoadingPromocode}
                onCheckPromocode={onCheckPromocode}
                promocode={promocode}
                hasAppliedPromoced={!!promocodePrice}
                onChangePromocode={setPromocode}
                isLoading={checkPromocode.isLoading}
              />
            </div>

            <div className="sm:hidden block py-8 px-5 border border-solid border-gray-100 rounded-[10px]">
              <CheckoutBox
                orderAmount={1}
                checked={checked}
                totalAmountHotel={totalAmountHotel}
                setChecked={setChecked}
                promocodePrice={promocodePrice}
              />
            </div>

            <p className="sm:hidden block text-xs text-[#FF3838]">
              *금일 환율을 실시간 공급가격에 적용하여 원화로 환산한 결제
              금액입니다. 나중에 예약시 가격이 변동될 수 있습니다.
            </p>

            <Button
              type="submit"
              className="sm:hidden flex justify-center"
              disabled={!checked}
              isLoading={preBook.isLoading}
              // onClick={() => setIsOpenPolicy(true)}
            >
              지금 예약
            </Button>
            {/* <div className="hidden sm:block py-8 px-5 border border-solid border-gray-100 rounded-[10px]">
            <DisclaimerBox
              paymentTypes={paymentTypes}
              selectedPaymentType={selectedPaymentType}
              onChangePaymentType={onChangePaymentType}
            />
          </div> */}
          </div>
        </form>
      </section>

      <Dialog
        isOpen={openPromocodeNotExist}
        withCloseButton={false}
        onClose={() => setOpenPromocodeNotExist(false)}
        className="sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[65px] text-left align-middle shadow-xl transition-all "
      >
        <div className="flex flex-col items-center ">
          <img src={warningGif} width={80} height={80} />
          <p className="text-xl sm:text-2xl mt-[10px] text-center">
            쿠폰 확인 오류
          </p>
          <p className="mt-[20px] text-sm sm:text-base text-center text-[#5C5F79]">
            유효하지 않은 쿠폰입니다
            <br />
            쿠폰 번호를 다시 확인해 주세요
          </p>
          <Button
            onClick={() => setOpenPromocodeNotExist(false)}
            type="button"
            className="w-[180px] mt-[60px]"
          >
            다시 입력하기
          </Button>
        </div>
      </Dialog>

      <Dialog
        isOpen={isUserAlreadyUsedThisDiscount}
        withCloseButton={false}
        onClose={() => setIsUserAlreadyUsedThisDiscount(false)}
        className="sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[65px] text-left align-middle shadow-xl transition-all "
      >
        <div className="flex flex-col items-center ">
          <img src={warningGif} width={80} height={80} />
          <p className="text-xl sm:text-2xl mt-[10px] text-center">
            이미 금번 이벤트 할인 혜택을 받으셨습니다!
          </p>
          <p className="mt-[20px] text-sm sm:text-base text-center text-[#5C5F79]">
            할인 쿠폰 정책에 따라,<strong>투숙객 1인당 1회에 한하여</strong>
            <br />
            할인혜택을 받으실 수 있습니다.
          </p>
          <Button
            onClick={() => setIsUserAlreadyUsedThisDiscount(false)}
            type="button"
            className="w-[180px] mt-[60px]"
          >
            확인
          </Button>
        </div>
      </Dialog>

      <Dialog
        isOpen={priceCheckInvalid}
        withCloseButton={false}
        onClose={() => setPriceCheckInvalid(false)}
        className="sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[65px] text-left align-middle shadow-xl transition-all "
      >
        <div className="flex flex-col items-center ">
          <img src={warningGif} width={80} height={80} />
          <p className="text-xl sm:text-2xl mt-[10px] text-center">
            할인 쿠폰 적용 대상이 아닙니다!
          </p>
          <p className="mt-[20px] text-sm sm:text-base text-center text-[#5C5F79]">
            할인 쿠폰 정책에 따라, <strong>10만원 이상</strong> 결제 시
            <br />
            할인 코드가 적용됩니다.
          </p>
          <Button
            onClick={() => setPriceCheckInvalid(false)}
            type="button"
            className="w-[180px] mt-[60px]"
          >
            다시 입력하기
          </Button>
        </div>
      </Dialog>
      {/* <Modal
      title='서비스 이용약관'
      open={isOpenPolicy}
      onClose={() => setIsOpenPolicy(false)}
    >
      <div className="w-full flex flex-col">
        <p
          className="text-[12px] text-[#5C5F79]"
          dangerouslySetInnerHTML={{
            __html:
              translatedComments?.data?.data?.data?.translations?.[0]
                ?.translatedText ||
              rules?.OptionalElements?.Comments?.Comment?.value
          }}
        ></p>

        <p
          className="text-[12px] text-[#5C5F79]"
          dangerouslySetInnerHTML={{
            __html:
              translatedRules?.data?.data?.data?.translations?.[0]
                ?.translatedText || rules?.CancellationPolicy.Description
          }}
        ></p>

        <Button
          className="w-[250px] mx-auto mt-[20px] sm:mt-[45px]"
          onClick={onNavigateToPreBook}
          disabled={preBook.isLoading}
        >
          동의합니다
        </Button>
      </div>
    </Modal> */}
    </>
  );
}
