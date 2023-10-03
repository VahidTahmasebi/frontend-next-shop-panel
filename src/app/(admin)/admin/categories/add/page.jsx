"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAddCategory, useGetCategories } from "@/hooks/useCategories";

import CategoryForm from "@/components/CategoryForm";

function addCategoryPage() {
  const { isLoading, mutateAsync } = useAddCategory();

  const { data } = useGetCategories();
  const { categories } = data || {};

  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    englishTitle: "",
    description: "",
  });

  const [selectedType, setSelectedType] = useState("");

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { message } = await mutateAsync({
        ...formData,
        type: selectedType.value,
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

  return (
    <div className="mb-10">
      <h1 className="mb-4 text-xl font-bold">اضافه کردن دسته بندی</h1>
      <CategoryForm
        categoryData={formData}
        categoryDataOnChange={changeHandler}
        setSelectedType={setSelectedType}
        submitHandler={submitHandler}
        isLoading={isLoading}
      />
    </div>
  );
}

export default addCategoryPage;
