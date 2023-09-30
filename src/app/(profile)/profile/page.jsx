"use client";

import { useGetUser } from "@/hooks/useAuth";

import { toLocalDateString } from "@/utils/toLocalDate";
import Loading from "@/common/Loading";

function Profile() {
  const { data, isLoading } = useGetUser();
  const { user } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div className="py-4">
      <h1 className="mb-4 text-xl">{user.name} خوش آمدی</h1>
      <h1 className="font-bold">
        <span className="font-bold">
          تاریخ پیوستن: {toLocalDateString(user.createdAt)}
        </span>
      </h1>
    </div>
  );
}

export default Profile;
