"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { completeProfile } from "@/services/authServices";

import TextField from "@/common/TextField";

function CompleteProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: completeProfile,
  });

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { message } = await mutateAsync({ name, email });
      toast.success(message);
      router.push("/");
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
        <form className="space-y-8" onSubmit={submitHandler}>
          <TextField
            label="نام و نام خانوادگی"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="ایمیل"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <button type="submit" className="w-full btn btn--primary">
                تایید
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfile;
