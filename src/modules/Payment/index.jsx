import { useMakePayment } from "@/services/book.service";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import paymentGif from "@/assets/gifs/payment.gif";
import { useNavigate, useSearchParams } from "react-router-dom";

export function Payment() {
  const [payment, setPayment] = useState(null);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const makePayment = useMakePayment({
    queryParams: {
      onSuccess: (res) => {
        //console.log('res===>', res)
        setPayment(res.data);
        // setActiveStep(1)
      },
      onError: (e) => {
        // setPayment(e.response.data)
        // setActiveStep(1)
        // console.log('e', e.response.data)
        //setIsOpen(true)
      }
    }
  });

  useEffect(() => {
    const payload = {};
    if (searchParams.get("payment_type") === "GIFT_CULT")
      payload.mallUserId = "CULTURELAND";
    makePayment.mutate({
      id: searchParams.get("booking_session_id"),
      signature: searchParams.get("signature"),
      ...payload
    });
  }, []);

  useEffect(() => {
    function handleReceiveMessage(event) {
      console.log("event", event);
      if (event.origin !== import.meta.env.VITE_BACKEND_URL) {
        return;
      }
      const res = JSON.parse(decodeURIComponent(event.data));

      console.log("res=====>", res);
      if (searchParams.get("new_window") === "true") {
        if (window.opener) {
          window.opener.postMessage(res, window.location.origin);
        }
        window.close();
      } else {
        navigate(`/pre-book?moid=${res?.moid}&status=${res?.status}`);
      }
    }

    window.addEventListener("message", handleReceiveMessage);

    return () => {
      window.removeEventListener("message", handleReceiveMessage);
    };
  }, []);

  return makePayment.isLoading ? (
    <div className="flex items-center justify-center h-[100vh] w-full">
      <img src={paymentGif} width={150} alt="" />
      {/* <Oval
        visible={true}
        height="50"
        width="50"
        ariaLabel="color-ring-loading"
        color={"#2D40FF"}
        strokeWidth={5}
        secondaryColor={"#9ca3af"}
      /> */}
    </div>
  ) : (
    <iframe
      style={{
        width: "100%",
        height: "100vh",
        outline: "none",
        border: "none"
      }}
      srcDoc={payment}
    />
  );
}
