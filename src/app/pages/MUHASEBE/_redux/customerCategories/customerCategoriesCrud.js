import axios from "axios";

export const PRODUCTS_URL = "/customerCategory";

// CREATE =>  POST: add a new customerCategory to the server
export function createCustomerCategory(customerCategory) {
  return axios.post(`${PRODUCTS_URL}/new`, { customerCategory });
}

// READ
export function getAllCustomerCategories() {
  return axios.get(PRODUCTS_URL);
}

export function getCustomerCategoryById(customerCategoryId) {
  return axios.get(`${PRODUCTS_URL}/${customerCategoryId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCustomerCategories(queryParams) {
  return axios.post(`${PRODUCTS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the customerCategory on the server
export function updateCustomerCategory(customerCategory) {
  return axios.put(`${PRODUCTS_URL}/${customerCategory.id}`, {
    customerCategory,
  });
}

// UPDATE Status
export function updateStatusForCustomerCategories(ids, status) {
  return axios.post(`${PRODUCTS_URL}/updateStatusForCustomerCategories`, {
    ids,
    status,
  });
}

// DELETE => delete the customerCategory from the server
export function deleteCustomerCategory(customerCategoryId) {
  return axios.delete(`${PRODUCTS_URL}/${customerCategoryId}`);
}

// DELETE CustomerCategories by ids
export function deleteCustomerCategories(ids) {
  return axios.post(`${PRODUCTS_URL}/deleteCustomerCategories`, { ids });
}

//create super category
export function createSuperCategory(category) {
  return axios.post(`/customerCategory-category/new/super-category`, {
    category,
  });
}
//create category
export function createCategory(category) {
  return axios.post(`/customerCategory-category/new/category`, { category });
}

// create sub category
export function createSubCategory(category) {
  return axios.post(`/customerCategory-category/new/sub-category`, {
    category,
  });
}

// get all super categories
export function findSuperCustomerCategoryCategories() {
  return axios.get(`/customerCategory-category/super-category/all`);
}

// get all super categories
export function findCustomerCategoryCategories() {
  return axios.get(`/customerCategory-category/category/all`);
}
