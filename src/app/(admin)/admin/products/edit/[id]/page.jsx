"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useGetProductById, useUpdateProduct } from "@/hooks/useProducts";
import { useGetCategories } from "@/hooks/useCategories";

import Loading from "@/common/Loading";
import includesObject from "@/utils/objectUtils";

import ProductForm from "@/components/ProductForm";

const includesProductsKey = [
  "title",
  "description",
  "slug",
  "brand",
  "price",
  "discount",
  "offPrice",
  "countInStock",
  "imageLink",
];

function page() {
  const { id } = useParams();
  const router = useRouter();

  const { isLoading: isLoadingProduct, data } = useGetProductById(id);
  const { product } = data || {};

  const { data: categoryData } = useGetCategories();
  const { categories } = categoryData || {};

  const { isLoading, mutateAsync } = useUpdateProduct();

  const [formData, setFormData] = useState({});
  const [tags, setTags] = useState(product?.tags || []);
  const [selectedCategory, setSelectedCategory] = useState("");

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { message } = await mutateAsync({
        productId: product._id,
        data: {
          ...formData,
          tags,
          category: selectedCategory._id,
        },
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

  useEffect(() => {
    if (product) {
      setFormData(includesObject(product, includesProductsKey));
      setTags(product.tags);
      setSelectedCategory(product.category);
    }
  }, [data]);

  if (isLoadingProduct) return <Loading />;

  return (
    <div className="mb-10">
      <h1 className="mb-4 text-xl font-bold">ویرایش اطلاعات محصول</h1>{" "}
      <ProductForm
        productData={formData}
        productDataOnChange={changeHandler}
        tags={tags}
        setTags={setTags}
        categories={categories}
        selectedCategory={product.category}
        setSelectedCategory={setSelectedCategory}
        submitHandler={submitHandler}
        isLoading={isLoading}
      />
    </div>
  );
}

export default page;
