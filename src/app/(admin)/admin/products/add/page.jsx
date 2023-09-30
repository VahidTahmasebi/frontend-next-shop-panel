"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TagsInput } from "react-tag-input-component";
import Select from "react-select";
import toast from "react-hot-toast";

import { useAddProduct } from "@/hooks/useProducts";
import { useGetCategories } from "@/hooks/useCategories";

import TextField from "@/common/TextField";
import Loading from "@/common/Loading";

const productsFormData = [
  {
    id: 1,
    label: "عنوان",
    name: "title",
  },
  {
    id: 2,
    label: "توضیحات",
    name: "description",
  },
  {
    id: 3,
    label: "اسلاگ",
    name: "slug",
  },
  {
    id: 4,
    label: "برند",
    name: "brand",
  },
  {
    id: 5,
    label: "قیمت",
    name: "price",
  },
  {
    id: 6,
    label: "تخفیف",
    name: "discount",
  },
  {
    id: 7,
    label: "قیمت روی تخفیف",
    name: "offPrice",
  },
  {
    id: 8,
    label: "موجودی",
    name: "countInStock",
  },
  {
    id: 9,
    label: "لینک عکس محصول",
    name: "imageLink",
  },
];

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
    <div className="max-w-sm mb-10">
      <h1 className="mb-4 text-xl font-bold">اضافه کردن محصول</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        {productsFormData.map((item) => {
          return (
            <TextField
              key={item.id}
              label={item.label}
              name={item.name}
              value={formData[item.name]}
              onChange={changeHandler}
            />
          );
        })}
        <div>
          <label htmlFor="tags" className="mb-2">
            تگ محصولات
          </label>
          <TagsInput id="tags" name="tags" value={tags} onChange={setTags} />
        </div>

        <div>
          <label htmlFor="category" className="mb-2">
            دسته بندی
          </label>
          <Select
            id="category"
            options={categories}
            onChange={setSelectedCategory}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option._id}
          />
        </div>
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <button type="submit" className="w-full btn btn--primary">
              اضافه کردن محصول
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default addProductPage;
