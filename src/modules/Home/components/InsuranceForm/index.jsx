import { Controller, useForm } from "react-hook-form";
import { Datepicker } from "../Datepicker";
import { AutoComplete } from "../Autocomplete";

import { hours } from "@/consts/hours";
import { useState } from "react";
import { v4 } from "uuid";
import { Button, Input } from "@/components/index";
import { genders } from "@/consts/gender";

import classNames from "classnames";

import RedCalendarIcon from "@/assets/icons/red-calendar.svg?react";
import ClockIcon from "@/assets/icons/clock.svg?react";
import DropdownIcon from "@/assets/icons/triangle-down.svg?react";
import PlusIcon from "@/assets/icons/plus-white.svg?react";
import CloseIcon from "@/assets/icons/close-white.svg?react";

export function InsuranceForm() {
  const { control, handleSubmit, setValue, watch } = useForm();

  const [guests, setGuests] = useState([
    {
      id: v4()
    }
  ]);

  const onAdd = () => {
    setGuests((prev) => [
      ...prev,
      {
        id: v4()
      }
    ]);
  };

  const onRemove = (id) => {
    setGuests((prev) => prev.filter((el) => el.id !== id));
  };

  const onSubmit = () => {};

  return (
    <>
      <div className="flex flex-col w-full">
        <h2 className="text-xl text-[#374248] font-semibold">해외여행자보험</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col mt-9 gap-5"
        >
          <div className="grid grid-cols-4 gap-[30px]">
            <div className="w-full">
              <Controller
                control={control}
                name="departure_date"
                rules={{ required: true }}
                render={({
                  field: { onChange, name, value },
                  formState: { errors }
                }) => (
                  <>
                    <Datepicker
                      value={value}
                      icon={<RedCalendarIcon />}
                      onChange={onChange}
                      format={"YYYY/MM/DD"}
                      isInOneInput
                      fullWidth
                      isRedColor
                      labelProps={{
                        className: "text-black text-lg"
                      }}
                      label="체크인/체크아웃"
                      containerProps={{
                        className:
                          "font-[500] h-[48px] text-sm w-full flex items-center justify-between px-[16px] py-[12px] relative transition-all ease-in-out overflow-hidden outline outline-1 outline-grey-100 hover:outline-grey-100 text-lg"
                      }}
                      errors={errors}
                      name={name}
                      labelCheckIn="체크인"
                      labelCheckOut="체크아웃"
                      className="w-full"
                    />
                  </>
                )}
              />
            </div>

            <div className="w-full">
              <Controller
                control={control}
                name="departure_time"
                rules={{ required: true }}
                render={({
                  field: { onChange, name, value },
                  formState: { errors }
                }) => (
                  <AutoComplete
                    name={name}
                    icon={<ClockIcon />}
                    label="집에서 출발하는 시간"
                    value={value}
                    errors={errors}
                    onChange={onChange}
                    placeholder="집에서 출발하는 시간"
                    isSearchable={false}
                    dropDownIndicator={() => <DropdownIcon />}
                    options={hours}
                    getOptionLabel={(opt) => opt.name}
                    getOptionValue={(opt) => opt.value}
                    isClearable={false}
                  />
                )}
              />
            </div>

            <div className="w-full">
              <Controller
                control={control}
                name="arrival_date"
                rules={{ required: true }}
                render={({
                  field: { onChange, name, value },
                  formState: { errors }
                }) => (
                  <>
                    <Datepicker
                      value={value}
                      icon={<RedCalendarIcon />}
                      onChange={onChange}
                      format={"YYYY/MM/DD"}
                      isInOneInput
                      fullWidth
                      isRedColor
                      labelProps={{
                        className: "text-black text-lg"
                      }}
                      label="도착일"
                      errors={errors}
                      name={name}
                      className="w-full"
                    />
                  </>
                )}
              />
            </div>

            <div className="w-full">
              <Controller
                control={control}
                name="arrival_time"
                rules={{ required: true }}
                render={({
                  field: { onChange, name, value },
                  formState: { errors }
                }) => (
                  <AutoComplete
                    name={name}
                    icon={<ClockIcon />}
                    label="집에서 출발하는 시간"
                    value={value}
                    errors={errors}
                    onChange={onChange}
                    placeholder="집에서 출발하는 시간"
                    isSearchable={false}
                    dropDownIndicator={() => <DropdownIcon />}
                    options={hours}
                    getOptionLabel={(opt) => opt.name}
                    getOptionValue={(opt) => opt.value}
                    isClearable={false}
                  />
                )}
              />
            </div>
          </div>

          {guests.map((guest, index) => (
            <div className="grid grid-cols-4 gap-[30px]" key={guest.id}>
              <GuestFields
                index={index}
                onRemove={() => onRemove(guest.id)}
                control={control}
              />
            </div>
          ))}

          <div className="grid grid-cols-4 gap-[30px]">
            <div />
            <div />
            <div />
            <Button
              leftIcon={<PlusIcon />}
              onClick={onAdd}
              variant="secondary"
              className="w-[170px] h-[48px!important] text-xl"
            >
              동반자 추가
            </Button>
          </div>

          <div className="w-full border-[#EAEAF4] border-t-[0.5px] flex justify-center items-center py-[45px]">
            <Button size="lg" className="w-[360px]" type="submit">
              내 보험료 확인하기
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

const GuestFields = ({ control, onRemove, index }) => {
  return (
    <>
      <Controller
        name={`${index}.name`}
        control={control}
        render={({
          field: { onChange, name, value },
          formState: { errors }
        }) => (
          <Input
            name={name}
            value={value}
            onChange={onChange}
            placeholder="이름"
            label="가입자 정보"
            inputClassName="border-1/2 border-[#B7C5C8] rounded-none"
          />
        )}
      />

      <Controller
        name={`${index}.dob`}
        control={control}
        render={({
          field: { onChange, name, value },
          formState: { errors }
        }) => (
          <Input
            name={name}
            value={value}
            onChange={onChange}
            placeholder="생년월일 8자리"
            label="생년월일"
            inputClassName="border-1/2 border-[#B7C5C8] rounded-none"
          />
        )}
      />

      <Controller
        name={`${index}.gender`}
        control={control}
        render={({
          field: { onChange, name, value },
          formState: { errors }
        }) => (
          <div className="flex gap-[5.5px] flex-col">
            <span className="text-[#374248] text-sm font-medium">성별</span>

            <div className="w-full grid grid-cols-2 gap-[10px]">
              {genders.map((gend, gidx) => (
                <button
                  key={gidx}
                  className={classNames("h-[48px] border border-[#B7C5C8]", {
                    "bg-[#5A7BF033] border-[#5A7BF0]": gend.value === value
                  })}
                  type="button"
                  onClick={() => onChange(gend.value)}
                >
                  {gend.name}
                </button>
              ))}
            </div>
          </div>
        )}
      />

      {index === 0 ? (
        <Controller
          name={`${index}.phone_number`}
          control={control}
          render={({
            field: { onChange, name, value },
            formState: { errors }
          }) => (
            <Input
              name={name}
              value={value}
              onChange={onChange}
              placeholder="“-”없이 숫자만 입력하세요"
              label="전화번호"
              inputClassName="border-1/2 border-[#B7C5C8] rounded-none"
            />
          )}
        />
      ) : (
        <Button
          leftIcon={<CloseIcon />}
          onClick={onRemove}
          variant="secondary"
          className="w-[170px] h-[48px!important] mt-[26px] text-xl"
        >
          동반자 삭제
        </Button>
      )}
    </>
  );
};
