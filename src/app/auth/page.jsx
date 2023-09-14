"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getOtp } from "@/services/authServices";

import SendOTPForm from "./SendOTPForm";

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const { data, error, isLoading, mutateAsync } = useMutation({
    mutationFn: getOtp,
  });

  const phoneNumberHandler = ({ target }) => {
    setPhoneNumber(target.value);
  };

  const sendOTPHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await mutateAsync(phoneNumber);
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "خطایی رخ داد"
      );
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">
        <SendOTPForm
          phoneNumber={phoneNumber}
          onChange={phoneNumberHandler}
          onSubmit={sendOTPHandler}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default AuthPage;
