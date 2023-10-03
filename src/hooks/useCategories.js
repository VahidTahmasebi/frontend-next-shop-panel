import { useMutation, useQuery } from "@tanstack/react-query";

import {
  addCategory,
  getCategories,
  getOneCategoryById,
  removeCategory,
  updateCategory,
} from "@/services/categoryServices";

export const useGetCategories = () =>
  useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategories,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddCategory = () => {
  return useMutation({ mutationFn: addCategory });
};

export const useUpdateCategory = () => {
  return useMutation({ mutationFn: updateCategory });
};

export const useRemoveCategory = () => {
  return useMutation({ mutationFn: removeCategory });
};

export const useGetCategoryById = (id) =>
  useQuery({
    queryKey: ["get-category", id],
    queryFn: () => getOneCategoryById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });
