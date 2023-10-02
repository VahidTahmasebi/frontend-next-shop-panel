import http from "./httpService";

export function getAllPayments() {
  return http.get("/admin/payment/list").then(({ data }) => data.data);
}
export function getOnePaymentById(id) {
  return http.get(`/admin/payment/${id}`).then(({ data }) => data.data);
}
