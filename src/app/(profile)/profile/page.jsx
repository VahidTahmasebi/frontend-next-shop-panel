"use client";

import { useGetUser } from "@/hooks/useAuth";

import { toLocalDateString } from "@/utils/toLocalDate";

function Profile() {
  const { data, isLoading } = useGetUser();
  const { user } = data || {};

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{user.name} خوش آمدی</h1>
      <span>تاریخ پیوستن: {toLocalDateString(user.createdAt)}</span>
    </div>
  );
}

export default Profile;
