import axios from "axios";

export const BILLS_URL = "api/cashes";

// CREATE =>  POST: add a new cash to the server
export function createCash(cash) {
  return axios.post(BILLS_URL, { cash });
}

// READ
export function getAllCashes() {
  return axios.get(BILLS_URL);
}

export function getCashById(cashId) {
  return axios.get(`${BILLS_URL}/${cashId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCashes(queryParams) {
  return axios.post(`${BILLS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the cash on the server
export function updateCash(cash) {
  return axios.put(`${BILLS_URL}/${cash.id}`, { cash });
}

// UPDATE Status
export function updateStatusForCashes(ids, status) {
  return axios.post(`${BILLS_URL}/updateStatusForCashes`, {
    ids,
    status,
  });
}

// DELETE => delete the cash from the server
export function deleteCash(cashId) {
  return axios.delete(`${BILLS_URL}/${cashId}`);
}

// DELETE Cashes by ids
export function deleteCashes(ids) {
  return axios.post(`${BILLS_URL}/deleteCashes`, { ids });
}
