import { useMutation, useQuery } from "@tanstack/react-query";

import {
  addProduct,
  getOneProductById,
  getProducts,
  updateProduct,
} from "@/services/productServices";

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

export const useUpdateProduct = () => {
  return useMutation({ mutationFn: updateProduct });
};

export const useGetProductById = (id) =>
  useQuery({
    queryKey: ["get-product", id],
    queryFn: () => getOneProductById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });
