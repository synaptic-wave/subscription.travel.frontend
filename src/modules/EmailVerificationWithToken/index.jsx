import { Header } from "@/components/Header";
import { useVerifyEmailWithToken } from "@/services/auth.service";
import { Oval } from "react-loader-spinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export function EmailVerificationWithToken() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useVerifyEmailWithToken({
    params: {
      token: searchParams.get("token"),
      otp: searchParams.get("otp")
    },
    queryParams: {
      onSuccess: () => {
        navigate("/login");
        toast.success("이메일이 확인되었습니다");
      },
      onError: (err) => {
        toast.error(err?.data?.message);
      }
    }
  });

  return (
    <>
      <Header />
      <div className="flex items-center justify-center py-[40px] flex-col min-h-[60vh]">
        <p className="text-xl sm:text-2xl font-medium text-left mb-[40px]">
          이메일 인증
        </p>
        <div className="mt-[50px]">
          <Oval
            visible={true}
            height="50"
            width="50"
            ariaLabel="color-ring-loading"
            color="#2D40FF"
            strokeWidth={5}
            secondaryColor="#E7E7EE"
          />
        </div>
      </div>
    </>
  );
}
