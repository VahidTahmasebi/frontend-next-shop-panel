"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useGetProducts } from "@/hooks/useProducts";
import { useGetCouponById, useUpdateCoupon } from "@/hooks/useCoupons";

import Loading from "@/common/Loading";
import includesObject from "@/utils/objectUtils";

import CouponsForm from "@/components/CouponsForm";

const includesCouponsKey = ["code", "amount", "usageLimit"];

function page() {
  const { id } = useParams();
  const router = useRouter();

  const { isLoading: isLoadingCoupon, data } = useGetCouponById(id);
  const { coupon } = data || {};

  const { data: productsData } = useGetProducts();
  const { products } = productsData || {};

  const { isLoading, mutateAsync } = useUpdateCoupon();

  const [formData, setFormData] = useState({});
  const [type, setType] = useState("");
  const [productIds, setProductIds] = useState("");
  const [expireDate, setExpireDate] = useState(new Date());

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { message } = await mutateAsync({
        couponId: coupon._id,
        data: {
          ...formData,
          type,
          productIds: productIds.map((p) => p._id),
          expireDate: new Date(expireDate).toISOString(),
        },
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

  useEffect(() => {
    if (coupon) {
      setFormData(includesObject(coupon, includesCouponsKey));
      setType(coupon.type);
      setProductIds(coupon.productIds);
      setExpireDate(new Date(coupon.expireDate));
    }
  }, [data]);

  if (isLoadingCoupon) return <Loading />;

  return (
    <div className="mb-10">
      <h1 className="mb-4 text-xl font-bold">ویرایش کد تخفیف</h1>
      <CouponsForm
        couponsData={formData}
        couponsDataOnChange={changeHandler}
        type={type}
        setType={setType}
        products={products}
        productIds={coupon.productIds}
        setProductIds={setProductIds}
        expireDate={expireDate}
        setExpireDate={setExpireDate}
        submitHandler={submitHandler}
        isLoading={isLoading}
      />
    </div>
  );
}

export default page;
