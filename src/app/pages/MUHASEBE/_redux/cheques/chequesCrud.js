import axios from "axios";

export const BILLS_URL = "api/cheques";

// CREATE =>  POST: add a new cheque to the server
export function createCheque(cheque) {
  return axios.post(BILLS_URL, { cheque });
}

// READ
export function getAllCheques() {
  return axios.get(BILLS_URL);
}

export function getChequeById(chequeId) {
  return axios.get(`${BILLS_URL}/${chequeId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCheques(queryParams) {
  return axios.post(`${BILLS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the cheque on the server
export function updateCheque(cheque) {
  return axios.put(`${BILLS_URL}/${cheque.id}`, { cheque });
}

// UPDATE Status
export function updateStatusForCheques(ids, status) {
  return axios.post(`${BILLS_URL}/updateStatusForCheques`, {
    ids,
    status,
  });
}

// DELETE => delete the cheque from the server
export function deleteCheque(chequeId) {
  return axios.delete(`${BILLS_URL}/${chequeId}`);
}

// DELETE Cheques by ids
export function deleteCheques(ids) {
  return axios.post(`${BILLS_URL}/deleteCheques`, { ids });
}
