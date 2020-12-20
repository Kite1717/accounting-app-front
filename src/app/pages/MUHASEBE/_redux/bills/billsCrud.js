import axios from "axios";

export const BILLS_URL = "api/bills";

// CREATE =>  POST: add a new bill to the server
export function createBill(bill) {
  return axios.post(BILLS_URL, { bill });
}

// READ
export function getAllBills() {
  return axios.get(BILLS_URL);
}

export function getBillById(billId) {
  return axios.get(`${BILLS_URL}/${billId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findBills(queryParams) {
  return axios.post(`${BILLS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the bill on the server
export function updateBill(bill) {
  return axios.put(`${BILLS_URL}/${bill.id}`, { bill });
}

// UPDATE Status
export function updateStatusForBills(ids, status) {
  return axios.post(`${BILLS_URL}/updateStatusForBills`, {
    ids,
    status
  });
}

// DELETE => delete the bill from the server
export function deleteBill(billId) {
  return axios.delete(`${BILLS_URL}/${billId}`);
}

// DELETE Bills by ids
export function deleteBills(ids) {
  return axios.post(`${BILLS_URL}/deleteBills`, { ids });
}
