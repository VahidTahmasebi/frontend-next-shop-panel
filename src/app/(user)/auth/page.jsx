"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { checkOtp, getOtp } from "@/services/authServices";

import SendOTPForm from "./SendOTPForm";
import CheckOTPForm from "./CheckOTPForm";

const RESEND_TIME = 90;

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [time, setTime] = useState(RESEND_TIME);

  const {
    data: otpResponse,
    error,
    isLoading,
    mutateAsync: mutateGetOtp,
  } = useMutation({
    mutationFn: getOtp,
  });
  const { isLoading: isCheckingOtp, mutateAsync: mutateCheckOtp } = useMutation(
    {
      mutationFn: checkOtp,
    }
  );

  const router = useRouter();

  const phoneNumberHandler = ({ target }) => {
    setPhoneNumber(target.value);
  };

  const sendOtpHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await mutateGetOtp({ phoneNumber });
      toast.success(data?.message);
      setStep(2);
      setTime(RESEND_TIME);
      setOtp("");
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "خطایی رخ داد"
      );
    }
  };

  const checkOtpHandler = async (e) => {
    e.preventDefault();

    try {
      const { message, user } = await mutateCheckOtp({ phoneNumber, otp });
      toast.success(message);
      if (user.isActive) {
        router.push("/");
      } else {
        router.push("/complete-profile");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "خطایی رخ داد"
      );
    }
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">
        {(() => {
          switch (step) {
            case 1:
              return (
                <SendOTPForm
                  phoneNumber={phoneNumber}
                  onChange={phoneNumberHandler}
                  onSubmit={sendOtpHandler}
                  isLoading={isLoading}
                />
              );
            case 2:
              return (
                <CheckOTPForm
                  otp={otp}
                  setOtp={setOtp}
                  time={time}
                  otpResponse={otpResponse}
                  onSubmit={checkOtpHandler}
                  onBack={() => setStep((s) => s - 1)}
                  onResendOtp={sendOtpHandler}
                  isCheckingOtp={isCheckingOtp}
                />
              );
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}

export default AuthPage;
