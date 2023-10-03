"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  useGetCategories,
  useGetCategoryById,
  useUpdateCategory,
} from "@/hooks/useCategories";

import Loading from "@/common/Loading";
import includesObject from "@/utils/objectUtils";

import CategoryForm, { categoryTypes } from "@/components/CategoryForm";

const includesCategoryKey = ["title", "englishTitle", "description"];

function page() {
  const { id } = useParams();
  const router = useRouter();

  const { isLoading: isLoadingCategory, data } = useGetCategoryById(id);
  const { category } = data || {};

  const { data: categoryData } = useGetCategories();
  const { categories } = categoryData || {};

  const { isLoading, mutateAsync } = useUpdateCategory();

  const [formData, setFormData] = useState({});
  const [selectedType, setSelectedType] = useState("");

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { message } = await mutateAsync({
        categoryId: category._id,
        data: {
          ...formData,
          type: selectedType.value,
        },
      });
      router.push("/admin/categories");
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
    if (category) {
      setFormData(includesObject(category, includesCategoryKey));
      setSelectedType(categoryTypes.find((c) => c.value === category.type));
    }
  }, [data]);

  if (isLoadingCategory) return <Loading />;

  return (
    <div className="mb-10">
      <h1 className="mb-4 text-xl font-bold">ویرایش اطلاعات دسته بندی</h1>
      <CategoryForm
        categoryData={formData}
        categoryDataOnChange={changeHandler}
        categoryTypes={categories}
        selectedType={categoryTypes.find((c) => c.value === category.type)}
        setSelectedType={setSelectedType}
        submitHandler={submitHandler}
        isLoading={isLoading}
      />
    </div>
  );
}

export default page;
