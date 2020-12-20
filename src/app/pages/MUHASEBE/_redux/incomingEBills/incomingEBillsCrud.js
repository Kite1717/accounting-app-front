import axios from "axios";

export const INCOMINGEBILLS_URL = "/incomingEBill";

// CREATE =>  POST: add a new incomingEBill to the server
export function createIncomingEBill(incomingEBill) {
  console.log(INCOMINGEBILLS_URL, "  ", INCOMINGEBILLS_URL + "/new")
  return axios.post(`${INCOMINGEBILLS_URL}/new`, { incomingEBill });
}

// READ
export function getAllIncomingEBills() {
  return axios.get(INCOMINGEBILLS_URL);
}

export function getIncomingEBillById(incomingEBillId) {
  return axios.get(`${INCOMINGEBILLS_URL}/${incomingEBillId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findIncomingEBills(queryParams) {
  return axios.post(`${INCOMINGEBILLS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the incomingEBill on the server
export function updateIncomingEBill(incomingEBill) {
  return axios.put(`${INCOMINGEBILLS_URL}/${incomingEBill.id}`, { incomingEBill });
}

// UPDATE Status
export function updateStatusForIncomingEBills(ids, status) {
  return axios.post(`${INCOMINGEBILLS_URL}/updateStatusForIncomingEBills`, {
    ids,
    status
  });
}

// DELETE => delete the incomingEBill from the server
export function deleteIncomingEBill(incomingEBillId) {
  return axios.delete(`${INCOMINGEBILLS_URL}/${incomingEBillId}`);
}

// DELETE IncomingEBills by ids
export function deleteIncomingEBills(ids) {
  return axios.post(`${INCOMINGEBILLS_URL}/deleteIncomingEBills`, { ids });
}
