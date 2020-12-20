import axios from "axios";

export const BILLS_URL = "api/receipts";

// CREATE =>  POST: add a new receipt to the server
export function createReceipt(receipt) {
  return axios.post(BILLS_URL, { receipt });
}

// READ
export function getAllReceipts() {
  return axios.get(BILLS_URL);
}

export function getReceiptById(receiptId) {
  return axios.get(`${BILLS_URL}/${receiptId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findReceipts(queryParams) {
  return axios.post(`${BILLS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the receipt on the server
export function updateReceipt(receipt) {
  return axios.put(`${BILLS_URL}/${receipt.id}`, { receipt });
}

// UPDATE Status
export function updateStatusForReceipts(ids, status) {
  return axios.post(`${BILLS_URL}/updateStatusForReceipts`, {
    ids,
    status,
  });
}

// DELETE => delete the receipt from the server
export function deleteReceipt(receiptId) {
  return axios.delete(`${BILLS_URL}/${receiptId}`);
}

// DELETE Receipts by ids
export function deleteReceipts(ids) {
  return axios.post(`${BILLS_URL}/deleteReceipts`, { ids });
}
