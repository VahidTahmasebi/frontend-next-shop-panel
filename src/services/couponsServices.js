import http from "./httpService";

export function getAllCoupons() {
  return http.get(`/admin/coupon/list/`).then(({ data }) => data.data);
}

export function getOneCouponById(id) {
  return http.get(`/admin/coupon/${id}`).then(({ data }) => data.data);
}

export function addNewCoupon(data) {
  return http.post(`/admin/coupon/add/`, data).then(({ data }) => data.data);
}

export function removeCoupon(id) {
  return http
    .delete(`/admin/coupon/remove/${id}`)
    .then(({ data }) => data.data);
}

export function updateCoupon({ couponId, data }) {
  return http
    .patch(`/admin/coupon/update/${couponId}`, data)
    .then(({ data }) => data.data);
}
