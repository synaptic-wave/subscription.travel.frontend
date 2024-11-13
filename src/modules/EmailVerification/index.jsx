import { Button, Dialog } from "@/components/index";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import warningGif from "@/assets/gifs/warning.gif";
import checkGif from "@/assets/gifs/check.gif";
import { useVerifyEmail } from "@/services/auth.service";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { Header } from "@/components/Header";

const validationSchema = yup.object({
  otp: yup.string().required("이 필드는 필수입니다")
});

export function EmailVerification() {
  const resolver = yupResolver(validationSchema);
  const navigate = useNavigate();

  const { state } = useLocation();
  const { control, handleSubmit, watch, setValue } = useForm({ resolver });

  const [openWrongModal, setOpenWrongModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  useEffect(() => {
    setValue("user_email", state?.email);
  }, []);

  const { isLoading, refetch } = useVerifyEmail({
    params: {
      otp: watch("otp")
    },
    headers: { Authorization: `Bearer ${state?.token}` },
    queryParams: {
      enabled: false,
      onSuccess: () => {
        setOpenSuccessModal(true);
      },
      onError: () => {
        setOpenWrongModal(true);
      }
    }
  });

  const onSubmit = () => {
    refetch();
  };

  return (
    <>
      <Header />

      <div className="py-[20px] sm:py-[40px] mx-auto w-full sm:px-0 px-4 sm:w-[375px] min-h-[60vh]">
        <p className="text-xl sm:text-2xl font-medium text-left">이메일 인증</p>
        <p className="mb-[40px] mt-2 text-sm text-[#8D8FA2]">
          {state?.email} 계정으로 인증번호를 발송했습니다 메일 확인 후 아래에
          인증번호를 입력해주세요
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-[13px] text-[#5C5F79] mb-[10px]">인증번호 입력</p>
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

          <Button
            isLoading={isLoading}
            disabled={!watch("otp") || watch("otp").length < 6}
            type="submit"
            className="mt-[70px] w-full"
          >
            인증 완료
          </Button>
        </form>
      </div>

      <Dialog
        isOpen={openWrongModal}
        withCloseButton={false}
        onClose={() => setOpenWrongModal(false)}
        className="sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[65px] text-left align-middle shadow-xl transition-all "
      >
        <div className="flex flex-col items-center ">
          <img src={warningGif} width={80} height={80} />
          <p className="text-xl sm:text-2xl mt-[10px] text-center">
            인증번호 불일치!
          </p>
          <p className="mt-[20px] text-sm sm:text-base text-center text-[#5C5F79]">
            입력하신 인증번호가 일치하지 않습니다.
            <br />
            인증번호를 다시한번 확인해 주시기 바랍니다!
          </p>
          <div className="flex mt-[68px] w-full gap-2 justify-center">
            <Button
              onClick={() => setOpenWrongModal(false)}
              type="button"
              className="w-full max-w-[180px]"
            >
              다시 입력하기
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog
        isOpen={openSuccessModal}
        withCloseButton={false}
        onClose={() => setOpenSuccessModal(false)}
        className="sm:w-[500px] w-full transform overflow-hidden rounded-[10px] bg-white py-[30px] sm:py-[50px] px-[30px] sm:px-[65px] text-left align-middle shadow-xl transition-all "
      >
        <div className="flex flex-col items-center ">
          <img src={checkGif} width={80} height={80} />
          <p className="text-xl sm:text-2xl mt-[10px] text-center">
            이메일 인증 완료
          </p>
          <p className="mt-[20px] text-sm sm:text-base text-center text-[#5C5F79]">
            이메일이 확인되었습니다
            <br />
            다시 로그인해 주세요
          </p>
          <div className="grid grid-cols-2 mt-[44px] w-full gap-2">
            <Button
              onClick={() => navigate("/")}
              type="button"
              variant="secondary"
              className="w-full"
              size="sm"
            >
              홈으로 가기
            </Button>
            <Button
              onClick={() => navigate("/login")}
              type="button"
              className="w-full"
              size="sm"
            >
              로그인
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
