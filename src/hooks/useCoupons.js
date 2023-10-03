import { useMutation, useQuery } from "@tanstack/react-query";

import {
  addNewCoupon,
  getAllCoupons,
  getOneCouponById,
  removeCoupon,
  updateCoupon,
} from "@/services/couponsServices";

export const useGetCoupons = () =>
  useQuery({
    queryKey: ["get-coupons"],
    queryFn: getAllCoupons,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetCouponById = (id) =>
  useQuery({
    queryKey: ["get-coupon", id],
    queryFn: () => getOneCouponById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddNewCoupon = () => {
  return useMutation({ mutationFn: addNewCoupon });
};

export const useUpdateCoupon = () => {
  return useMutation({ mutationFn: updateCoupon });
};

export const useRemoveCoupon = () => {
  return useMutation({ mutationFn: removeCoupon });
};
