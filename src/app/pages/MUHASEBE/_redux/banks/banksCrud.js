import axios from "axios";

export const BILLS_URL = "/bank";

// CREATE =>  POST: add a new bank to the server
export function createBank(bank) {
  return axios.post(`${BILLS_URL}/new`, { bank });
}

// READ
export function getAllBanks() {
  return axios.get(BILLS_URL);
}

export function getBankById(bankId) {
  return axios.get(`${BILLS_URL}/${bankId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findBanks(queryParams) {
  return axios.post(`${BILLS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the bank on the server
export function updateBank(bank) {
  return axios.put(`${BILLS_URL}/${bank.id}`, { bank });
}

// UPDATE Status
export function updateStatusForBanks(ids, status) {
  return axios.post(`${BILLS_URL}/updateStatusForBanks`, {
    ids,
    status,
  });
}

// DELETE => delete the bank from the server
export function deleteBank(bankId) {
  return axios.delete(`${BILLS_URL}/${bankId}`);
}

// DELETE Banks by ids
export function deleteBanks(ids) {
  return axios.post(`${BILLS_URL}/deleteBanks`, { ids });
}
