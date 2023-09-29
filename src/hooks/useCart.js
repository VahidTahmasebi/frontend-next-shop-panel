import { useMutation } from "@tanstack/react-query";

import { addToCart } from "@/services/cartService";

export const useAddToCart = () =>
  useMutation({
    mutationFn: addToCart,
  });
