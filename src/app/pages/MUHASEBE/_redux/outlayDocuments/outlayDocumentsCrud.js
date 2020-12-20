import axios from "axios";

export const BILLS_URL = "api/outlayDocuments";

// CREATE =>  POST: add a new outlayDocument to the server
export function createOutlayDocument(outlayDocument) {
  return axios.post(BILLS_URL, { outlayDocument });
}

// READ
export function getAllOutlayDocuments() {
  return axios.get(BILLS_URL);
}

export function getOutlayDocumentById(outlayDocumentId) {
  return axios.get(`${BILLS_URL}/${outlayDocumentId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findOutlayDocuments(queryParams) {
  return axios.post(`${BILLS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the outlayDocument on the server
export function updateOutlayDocument(outlayDocument) {
  return axios.put(`${BILLS_URL}/${outlayDocument.id}`, { outlayDocument });
}

// UPDATE Status
export function updateStatusForOutlayDocuments(ids, status) {
  return axios.post(`${BILLS_URL}/updateStatusForOutlayDocuments`, {
    ids,
    status,
  });
}

// DELETE => delete the outlayDocument from the server
export function deleteOutlayDocument(outlayDocumentId) {
  return axios.delete(`${BILLS_URL}/${outlayDocumentId}`);
}

// DELETE OutlayDocuments by ids
export function deleteOutlayDocuments(ids) {
  return axios.post(`${BILLS_URL}/deleteOutlayDocuments`, { ids });
}
