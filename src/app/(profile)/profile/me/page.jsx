"use client";

import { useEffect, useState } from "react";

import { useGetUser } from "@/hooks/useAuth";

import includesObject from "@/utils/objectUtils";

import TextField from "@/common/TextField";
import Loading from "@/common/Loading";

function MePage() {
  const [formData, setFormData] = useState({});

  const { data, isLoading } = useGetUser();
  const { user } = data || {};

  const includesKey = ["name", "email", "phoneNumber", "biography"];

  useEffect(() => {
    if (user) setFormData(includesObject(user, includesKey));
  }, [user]);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-sm">
      <h1>اطلاعات کاربری</h1>
      <form>
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
      </form>
    </div>
  );
}

export default MePage;
