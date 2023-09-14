"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import http from "@/services/httpService";

import SendOTPForm from "./SendOTPForm";

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const phoneNumberHandler = ({ target }) => {
    setPhoneNumber(target.value);
  };

  const sendOTPHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await http.post("/user/get-otp", { phoneNumber });
      console.log(data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">
        <SendOTPForm
          phoneNumber={phoneNumber}
          onChange={phoneNumberHandler}
          onSubmit={sendOTPHandler}
        />
      </div>
    </div>
  );
}

export default AuthPage;
