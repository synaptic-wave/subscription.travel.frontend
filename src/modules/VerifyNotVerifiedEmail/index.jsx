import { Button, HFInput } from "@/components/index";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useResendEmail, useVerifyEmail } from "@/services/auth.service";
import { useState } from "react";
import OTPInput from "react-otp-input";
import classNames from "classnames";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { Header } from "@/components/Header";

const validationSchema = yup.object({
  user_email: yup.string().required("이 필드는 필수입니다"),
  password: yup.string().required("이 필드는 필수입니다")
});

export function VerifyNotVerifiedEmail() {
  const resolver = yupResolver(validationSchema);
  const [isShowOtp, setIsShowOtp] = useState(false);
  const navigate = useNavigate();

  const { control, handleSubmit, watch } = useForm({ resolver });

  const { isLoading, mutate, data } = useResendEmail({
    queryParams: {
      onSuccess: () => {
        setIsShowOtp(true);
      },
      onError: () => {
        setIsShowOtp(false);
      }
    }
  });

  const { isLoading: isLoadingVerify, refetch } = useVerifyEmail({
    params: {
      otp: watch("otp")
    },
    headers: { Authorization: `Bearer ${data?.access?.token}` },
    queryParams: {
      enabled: false,
      onSuccess: () => {
        toast.success("이메일이 확인되었습니다");
        navigate("/login");
      },
      onError: (err) => {
        toast.error(err?.data?.message);
      }
    }
  });

  const onSubmit = (data) => {
    if (!isShowOtp)
      return mutate({
        ...data
      });

    refetch();
  };

  return (
    <>
      <Header />
      <div className="py-[20px] sm:py-[40px] flex-col mx-auto w-full px-4 sm:px-0 sm:w-[375px] min-h-[60vh]">
        <p
          className={classNames(
            "text-xl sm:text-2xl font-medium text-left",
            !isShowOtp && "sm:mb-[40px] mb-[27px]"
          )}
        >
          이메일 주소 확인
        </p>
        {isShowOtp && (
          <p className="mb-[40px] mt-2 text-sm text-[#8D8FA2]">
            {watch("user_email")} 계정으로 인증번호를 발송했습니다 메일 확인 후
            아래에 인증번호를 입력해주세요
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isShowOtp && (
            <>
              <HFInput
                name="user_email"
                control={control}
                placeholder="이메일을 입력해 주세요"
                label="이메일"
              />

              <HFInput
                name="password"
                control={control}
                placeholder="비밀번호를 입력해 주세요"
                label="비밀번호"
                type="password"
                className="mt-5"
              />
            </>
          )}

          {isShowOtp && (
            <>
              <p className="text-[13px] text-[#5C5F79] mb-[10px]">
                인증번호 입력
              </p>
              <Controller
                control={control}
                name="otp"
                render={({ field: { onChange, value } }) => (
                  <OTPInput
                    containerStyle={{
                      display: "grid",
                      gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                      gap: "10px"
                    }}
                    shouldAutoFocus
                    value={value}
                    onChange={onChange}
                    numInputs={6}
                    renderInput={(props) => (
                      <input
                        {...props}
                        style={{
                          width: "100%"
                        }}
                        className="rounded-[10px] border border-solid border-[#EAEAF4] outline-none h-[60px] text-center text-[28px] font-bold text-[#161A3F]"
                      />
                    )}
                  />
                )}
              />
            </>
          )}

          <Button
            type="submit"
            disabled={isShowOtp && (!watch("otp") || watch("otp").length < 6)}
            isLoading={isLoading || isLoadingVerify}
            className="mt-[30px] w-full"
          >
            {isShowOtp ? "확인하다" : "보내다"}
          </Button>
        </form>
      </div>
    </>
  );
}
