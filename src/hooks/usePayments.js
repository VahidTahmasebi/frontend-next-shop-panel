import { useQuery } from "@tanstack/react-query";

import { getAllPayments, getOnePaymentById } from "@/services/paymentsServices";

export const useGetPayments = () =>
  useQuery({
    queryKey: ["payments"],
    queryFn: getAllPayments,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetPaymentById = (id) =>
  useQuery({
    queryKey: ["get-payment", id],
    queryFn: () => getOnePaymentById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });
