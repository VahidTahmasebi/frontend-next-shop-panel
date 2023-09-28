"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useGetUser } from "@/hooks/useAuth";

import includesObject from "@/utils/objectUtils";

import TextField from "@/common/TextField";
import Loading from "@/common/Loading";

import { updateProfile } from "@/services/authServices";

function MePage() {
  const [formData, setFormData] = useState({});

  const { data, isLoading } = useGetUser();
  const { user } = data || {};

  const { isLoading: isUpdating, mutateAsync } = useMutation({
    mutationFn: updateProfile,
  });

  const queryClient = useQueryClient();

  const includesKey = ["name", "email", "phoneNumber", "biography"];

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { message } = await mutateAsync(formData);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success(message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "خطایی رخ داد"
      );
    }
  };

  useEffect(() => {
    if (user) setFormData(includesObject(user, includesKey));
  }, [user]);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-sm">
      <h1>اطلاعات کاربری</h1>
      <form onSubmit={submitHandler}>
        {Object.keys(includesObject(user, includesKey)).map((key) => {
          return (
            <TextField
              key={key}
              label={key}
              name={key}
              value={formData[key] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          );
        })}
        <div>
          {isUpdating ? (
            <Loading />
          ) : (
            <button type="submit" className="w-full btn btn--primary">
              تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default MePage;
