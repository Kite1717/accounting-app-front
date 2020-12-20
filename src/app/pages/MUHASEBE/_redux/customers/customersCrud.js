import axios from "axios";

export const CUSTOMERS_URL = "/customer";

// CREATE =>  POST: add a new customer to the server
export function createCustomer(customer) {
  return axios.post(`${CUSTOMERS_URL}/new`, { customer });
}

// READ
export function getAllCustomers() {
  return axios.get(CUSTOMERS_URL);
}

export function getCustomerById(customerId) {
  return axios.get(`${CUSTOMERS_URL}/${customerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCustomers(queryParams) {
  return axios.post(`${CUSTOMERS_URL}/find`, { queryParams });
}

export function findAllRealCustomerCount() {
  return axios.get(`${CUSTOMERS_URL}/count/all`,);
}


export function findCities() {
  return axios.get(`/city-town/find/city`);
}
export function findTowns() {
  return axios.get(`/city-town/find/town`);
}

export function findUsers() {
  return axios.get(`/user/find/all`);
}



export function createCategory(category) {
  return axios.post(`/customer-category/new/category`,{category});
}


export function createSubCategory(subCategory) {
  return axios.post(`/customer-category/new/sub-category`,{subCategory});
}





export function findCategories() {
  return axios.get(`/customer-category/find/category`);
}

export function findCategoriesHaveSub() {
  return axios.get(`/customer-category/find/category/have/sub`);
}





export function findSubCategories() {
  return axios.get(`/customer-category/find/sub-category`);
}










// UPDATE => PUT: update the customer on the server
export function updateCustomer(customer) {
  return axios.put(`${CUSTOMERS_URL}/${customer.id}`, { customer });
}

// UPDATE Status
export function updateStatusForCustomers(ids, status) {
  return axios.post(`${CUSTOMERS_URL}/updateStatusForCustomers`, {
    ids,
    status
  });
}

// DELETE => delete the customer from the server
export function deleteCustomer(customerId) {
  return axios.delete(`${CUSTOMERS_URL}/${customerId}`);
}

// DELETE Customers by ids
export function deleteCustomers(ids) {
  return axios.post(`${CUSTOMERS_URL}/deleteCustomers`, { ids });
}
