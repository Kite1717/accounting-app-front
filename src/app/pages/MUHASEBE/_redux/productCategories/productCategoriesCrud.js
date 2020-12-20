import axios from "axios";

export const PRODUCTS_URL = "/productCategory";

// CREATE =>  POST: add a new productCategory to the server
export function createProductCategory(productCategory) {
  return axios.post(`${PRODUCTS_URL}/new`, { productCategory });
}

// READ
export function getAllProductCategories() {
  return axios.get(PRODUCTS_URL);
}

export function getProductCategoryById(productCategoryId) {
  return axios.get(`${PRODUCTS_URL}/${productCategoryId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findProductCategories(queryParams) {
  return axios.post(`${PRODUCTS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the productCategory on the server
export function updateProductCategory(productCategory) {
  return axios.put(`${PRODUCTS_URL}/${productCategory.id}`, {
    productCategory,
  });
}

// UPDATE Status
export function updateStatusForProductCategories(ids, status) {
  return axios.post(`${PRODUCTS_URL}/updateStatusForProductCategories`, {
    ids,
    status,
  });
}

// DELETE => delete the productCategory from the server
export function deleteProductCategory(productCategoryId) {
  return axios.delete(`${PRODUCTS_URL}/${productCategoryId}`);
}

// DELETE ProductCategories by ids
export function deleteProductCategories(ids) {
  return axios.post(`${PRODUCTS_URL}/deleteProductCategories`, { ids });
}

//create super category
export function createSuperCategory(category) {
  return axios.post(`/productCategory-category/new/super-category`, {
    category,
  });
}
//create category
export function createCategory(category) {
  return axios.post(`/productCategory-category/new/category`, { category });
}

// create sub category
export function createSubCategory(category) {
  return axios.post(`/productCategory-category/new/sub-category`, {
    category,
  });
}

// get all super categories
export function findSuperProductCategoryCategories() {
  return axios.get(`/productCategory-category/super-category/all`);
}

// get all super categories
export function findProductCategoryCategories() {
  return axios.get(`/productCategory-category/category/all`);
}
