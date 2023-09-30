import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/services/productServices";

export const useGetProducts = () =>
  useQuery({
    queryKey: ["get-products"],
    queryFn: getProducts,
    retry: false,
    refetchOnWindowFocus: true,
  });
