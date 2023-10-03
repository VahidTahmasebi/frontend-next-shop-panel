"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useGetProducts } from "@/hooks/useProducts";
import { useAddNewCoupon } from "@/hooks/useCoupons";

import CouponsForm from "@/components/CouponsForm";

function addCouponsPage() {
  const router = useRouter();

  const { isLoading, mutateAsync } = useAddNewCoupon();

  const { data } = useGetProducts();
  const { products } = data || {};

  const [formData, setFormData] = useState({
    code: "",
    amount: "",
    usageLimit: "",
  });

  const [type, setType] = useState("percent");
  const [productIds, setProductIds] = useState([]);
  const [expireDate, setExpireDate] = useState(new Date());

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { message } = await mutateAsync({
        ...formData,
        type,
        productIds: productIds.map((p) => p._id),
        expireDate: new Date(expireDate).toISOString(),
      });
      router.push("/admin/coupons");
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
      <h1 className="mb-4 text-xl font-bold">اضافه کردن کد تخفیف</h1>
      <CouponsForm
        couponsData={formData}
        couponsDataOnChange={changeHandler}
        type={type}
        setType={setType}
        products={products}
        setProductIds={setProductIds}
        expireDate={expireDate}
        setExpireDate={setExpireDate}
        submitHandler={submitHandler}
        isLoading={isLoading}
      />
    </div>
  );
}

export default addCouponsPage;
