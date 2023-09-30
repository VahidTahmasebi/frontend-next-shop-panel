import http from "./httpService";

export function getProducts(qs, cookies) {
  return http
    .get(`/product/list?${qs}`, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);
}
export function getOneProductBySlug(slug) {
  return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}
export function likeProduct(id) {
  return http.post(`/product/like/${id}`).then(({ data }) => data.data);
}

// admin relate function

export function addProduct(data) {
  return http.post(`/admin/product/add/`, data).then(({ data }) => data.data);
}
