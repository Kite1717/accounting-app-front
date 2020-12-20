import axios from "axios";

export const OUTGOINGEBILLS_URL = "/outgoingEBill";

// CREATE =>  POST: add a new outgoingEBill to the server
export function createOutgoingEBill(outgoingEBill) {
  console.log(OUTGOINGEBILLS_URL, "  ", OUTGOINGEBILLS_URL + "/new")
  return axios.post(`${OUTGOINGEBILLS_URL}/new`, { outgoingEBill });
}

// READ
export function getAllOutgoingEBills() {
  return axios.get(OUTGOINGEBILLS_URL);
}

export function getOutgoingEBillById(outgoingEBillId) {
  return axios.get(`${OUTGOINGEBILLS_URL}/${outgoingEBillId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findOutgoingEBills(queryParams) {
  return axios.post(`${OUTGOINGEBILLS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the outgoingEBill on the server
export function updateOutgoingEBill(outgoingEBill) {
  return axios.put(`${OUTGOINGEBILLS_URL}/${outgoingEBill.id}`, { outgoingEBill });
}

// UPDATE Status
export function updateStatusForOutgoingEBills(ids, status) {
  return axios.post(`${OUTGOINGEBILLS_URL}/updateStatusForOutgoingEBills`, {
    ids,
    status
  });
}

// DELETE => delete the outgoingEBill from the server
export function deleteOutgoingEBill(outgoingEBillId) {
  return axios.delete(`${OUTGOINGEBILLS_URL}/${outgoingEBillId}`);
}

// DELETE OutgoingEBills by ids
export function deleteOutgoingEBills(ids) {
  return axios.post(`${OUTGOINGEBILLS_URL}/deleteOutgoingEBills`, { ids });
}
