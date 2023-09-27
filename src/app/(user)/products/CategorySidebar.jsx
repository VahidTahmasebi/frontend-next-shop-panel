"use client";

import CheckBox from "@/common/CheckBox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

function CategorySidebar({ categories }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState([
    searchParams.get("category")?.split(",") || [],
  ]);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const categoryHandler = (e) => {
    const value = e.target.value;
    if (selectedCategories.includes(value)) {
      const categories = selectedCategories.filter((c) => c !== value);
      setSelectedCategories(categories);
      router.push(pathname + "?" + createQueryString("category", categories));
    } else {
      setSelectedCategories([...selectedCategories, value]);
      router.push(
        pathname +
          "?" +
          createQueryString("category", [...selectedCategories, value])
      );
    }
  };

  return (
    <div className="col-span-1">
      <p className="mb-4 font-bold">دسته بندی ها</p>

      <ul className="space-y-4">
        {categories.map((category) => {
          return (
            <CheckBox
              key={category._id}
              name="product-type"
              id={category._id}
              checked={selectedCategories.includes(category.englishTitle)}
              value={category.englishTitle}
              onChange={categoryHandler}
              label={category.title}
            />
          );
          // <li key={category._id}>{category.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default CategorySidebar;
