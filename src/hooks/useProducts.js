import { useMutation, useQuery } from "@tanstack/react-query";

import { addProduct, getProducts } from "@/services/productServices";

export const useGetProducts = () =>
  useQuery({
    queryKey: ["get-products"],
    queryFn: getProducts,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddProduct = () => {
  return useMutation({ mutationFn: addProduct });
};
