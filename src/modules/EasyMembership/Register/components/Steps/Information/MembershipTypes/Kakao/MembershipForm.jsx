import starIcon from "@/assets/icons/star-orange.svg";
import { Button, Input } from "@/components/index";
import { nationalities } from "@/consts/nationality";
import { AutoComplete } from "@/modules/Home/components/Autocomplete";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export const MembershipForm = ({ onClick }) => {
  const { control, handleSubmit } = useForm();

  const [searchNationality, setSearchNationality] = useState("");
  console.log(onClick);
  const onSubmit = (vals) => {
    console.log(vals);
    onClick(vals);
  };

  return (
    <div className="w-full max-w-[375px] flex flex-col gap-6 mt-[110px] min-h-[60vh] mx-auto">
      <h2 className="text-[#5A7BF0] text-[24px] font-bold">SNS 간편가입</h2>

      <div className="bg-[#161A3F] w-full h-[1px]" />

      <div className="w-full flex items-center justify-between">
        <h3 className="text-[24px] text-[#161A3F] font-medium">
          회원정보 입력
        </h3>

        <div className="flex items-center gap-1">
          <span>
            <img src={starIcon} />
          </span>
          <span className="text-[#5C5F79] text-[13px]">필수 입력</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-7">
          <Controller
            name="account_id"
            control={control}
            render={({ field: { value, name, onChange } }) => (
              <Input
                value={value}
                name={name}
                onChange={onChange}
                label="계정 아이디(필수)"
                className="flex-1"
                inputClassName="rounded-none"
                placeholder="아이디를 입력하세요(5자 이상)"
              />
            )}
          />

          <Button>중복확인</Button>
        </div>

        <Controller
          name="email"
          control={control}
          render={({ field: { value, name, onChange } }) => (
            <Input
              value={value}
              name={name}
              onChange={onChange}
              label="이메일(필수)"
              className="flex-1"
              inputClassName="rounded-none"
              placeholder="randy@swave.kr"
              disabled
              type="email"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { value, name, onChange } }) => (
            <Input
              value={value}
              name={name}
              onChange={onChange}
              label="비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)"
              className="flex-1"
              inputClassName="rounded-none"
              placeholder="비밀번호를 입력해 주세요"
              type="password"
            />
          )}
        />

        <Controller
          name="confirm_password"
          control={control}
          render={({ field: { value, name, onChange } }) => (
            <Input
              value={value}
              name={name}
              onChange={onChange}
              label="비밀번호 확인(필수)"
              className="flex-1"
              inputClassName="rounded-none"
              placeholder="비밀번호를 한번 더 입력해 주세요"
              type="password"
            />
          )}
        />

        <div className="flex items-end justify-between gap-7">
          <Controller
            name="phone_number"
            control={control}
            render={({ field: { value, name, onChange } }) => (
              <Input
                value={value}
                name={name}
                onChange={onChange}
                label="휴대폰 번호 입력(필수)"
                className="flex-1"
                inputClassName="rounded-none"
                placeholder="01024541245"
              />
            )}
          />

          <Button>인증완료</Button>
        </div>

        <Controller
          name="surname"
          control={control}
          render={({ field: { value, name, onChange } }) => (
            <Input
              value={value}
              name={name}
              onChange={onChange}
              label="성 (영문사용)(필수)"
              className="flex-1"
              inputClassName="rounded-none"
              placeholder="Hong"
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({ field: { value, name, onChange } }) => (
            <Input
              value={value}
              name={name}
              onChange={onChange}
              label="이름 (영문사용)(필수)"
              className="flex-1"
              inputClassName="rounded-none"
              placeholder="Gildong"
            />
          )}
        />

        <Controller
          control={control}
          name="nationality"
          // rules={{ required: true }}
          render={({
            field: { onChange, value, name },
            formState: { errors }
          }) => (
            <AutoComplete
              name={name}
              icon={null}
              value={value}
              label="국적 선택(필수)"
              placeholder="국적을 선택하세요"
              // className="sm:min-w-[15%] sm:max-w-[15%] sm:w-[15%]"
              defaultValue={nationalities.find((nat) => nat.value === "KR")}
              options={nationalities.filter((item) =>
                item.name
                  .toLowerCase()
                  .includes(searchNationality.toLowerCase())
              )}
              getOptionLabel={(opt) => opt.name}
              getOptionValue={(opt) => opt.value}
              onChange={onChange}
              onInputChange={(val) => setSearchNationality(val)}
            />
          )}
        />

        <Controller
          name="referral_code"
          control={control}
          render={({ field: { value, name, onChange } }) => (
            <Input
              value={value}
              name={name}
              onChange={onChange}
              label="추천코드 입력"
              className="flex-1"
              inputClassName="rounded-none"
              placeholder="예) 123456 / 없으면 빈칸으로 두시면 됩니다. "
            />
          )}
        />

        <span className="text-[13px] text-[#DC231E]">
          추천코드를 입력하시면 추가 할인 혜택이 제공됩니다.
        </span>

        <Button type="submit" className="mb-[100px]">
          결제페이지 이동
        </Button>
      </form>
    </div>
  );
};
