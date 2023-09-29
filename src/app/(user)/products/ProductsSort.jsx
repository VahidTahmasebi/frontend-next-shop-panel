"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import RadioInput from "@/common/RadioInput";

const sortOptions = [
  { id: 1, value: "latest", label: "جدید ترین" },
  { id: 2, value: "earliest", label: "قدیمی ترین" },
  { id: 3, value: "popular", label: "محبوب ترین" },
];

function ProductsSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sort, setSort] = useState("");

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const sortHandler = ({ target }) => {
    const value = target.value;
    setSort(value);
    router.push(pathname + "?" + createQueryString("sort", value));
  };

  useEffect(() => {
    setSort(searchParams.get("sort") || "");
  }, [searchParams]);

  return (
    <div>
      <p className="mt-7 mb-4 font-bold">مرتب سازی</p>
      {sortOptions.map((item) => {
        return (
          <RadioInput
            key={item.id}
            name="product-sort"
            id={item.id}
            label={item.label}
            checked={sort === item.value}
            value={item.value}
            onChange={sortHandler}
          />
        );
      })}
    </div>
  );
}

export default ProductsSort;
