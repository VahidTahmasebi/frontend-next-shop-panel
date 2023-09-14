"use client";

import { useState } from "react";

import SendOTPForm from "./SendOTPForm";

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const phoneNumberHandler = ({ target }) => {
    setPhoneNumber(target.value);
  };

  const sendOTPHandler = (e) => {
    e.preventDefault();
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
