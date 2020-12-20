import axios from "axios";

export const BILLS_URL = "api/suppliers";

// CREATE =>  POST: add a new supplier to the server
export function createSupplier(supplier) {
  return axios.post(BILLS_URL, { supplier });
}

// READ
export function getAllSuppliers() {
  return axios.get(BILLS_URL);
}

export function getSupplierById(supplierId) {
  return axios.get(`${BILLS_URL}/${supplierId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findSuppliers(queryParams) {
  return axios.post(`${BILLS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the supplier on the server
export function updateSupplier(supplier) {
  return axios.put(`${BILLS_URL}/${supplier.id}`, { supplier });
}

// UPDATE Status
export function updateStatusForSuppliers(ids, status) {
  return axios.post(`${BILLS_URL}/updateStatusForSuppliers`, {
    ids,
    status,
  });
}

// DELETE => delete the supplier from the server
export function deleteSupplier(supplierId) {
  return axios.delete(`${BILLS_URL}/${supplierId}`);
}

// DELETE Suppliers by ids
export function deleteSuppliers(ids) {
  return axios.post(`${BILLS_URL}/deleteSuppliers`, { ids });
}
