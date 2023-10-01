"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAddProduct } from "@/hooks/useProducts";
import { useGetCategories } from "@/hooks/useCategories";

import ProductForm from "@/components/ProductForm";

function addProductPage() {
  const { isLoading, mutateAsync } = useAddProduct();

  const { data } = useGetCategories();
  const { categories } = data || {};

  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    brand: "",
    price: "",
    discount: "",
    offPrice: "",
    countInStock: "",
    imageLink: "",
  });

  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { message } = await mutateAsync({
        ...formData,
        tags,
        category: selectedCategory._id,
      });
      router.push("/admin/products");
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
      <h1 className="mb-4 text-xl font-bold">اضافه کردن محصول</h1>
      <ProductForm
        productData={formData}
        productDataOnChange={changeHandler}
        tags={tags}
        setTags={setTags}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        submitHandler={submitHandler}
        isLoading={isLoading}
      />
    </div>
  );
}

export default addProductPage;
