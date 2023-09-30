import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/services/categoryServices";

export const useGetCategories = () =>
  useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategories,
    retry: false,
    refetchOnWindowFocus: true,
  });
