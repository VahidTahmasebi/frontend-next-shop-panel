"use client";

import { useParams } from "next/navigation";

function page() {
  const { id } = useParams();

  return <div>user id: {id}</div>;
}

export default page;
