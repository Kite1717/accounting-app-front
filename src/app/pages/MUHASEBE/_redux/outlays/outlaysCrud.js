import axios from "axios";

export const BILLS_URL = "api/outlays";

// CREATE =>  POST: add a new outlay to the server
export function createOutlay(outlay) {
  return axios.post(BILLS_URL, { outlay });
}

// READ
export function getAllOutlays() {
  return axios.get(BILLS_URL);
}

export function getOutlayById(outlayId) {
  return axios.get(`${BILLS_URL}/${outlayId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findOutlays(queryParams) {
  return axios.post(`${BILLS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the outlay on the server
export function updateOutlay(outlay) {
  return axios.put(`${BILLS_URL}/${outlay.id}`, { outlay });
}

// UPDATE Status
export function updateStatusForOutlays(ids, status) {
  return axios.post(`${BILLS_URL}/updateStatusForOutlays`, {
    ids,
    status,
  });
}

// DELETE => delete the outlay from the server
export function deleteOutlay(outlayId) {
  return axios.delete(`${BILLS_URL}/${outlayId}`);
}

// DELETE Outlays by ids
export function deleteOutlays(ids) {
  return axios.post(`${BILLS_URL}/deleteOutlays`, { ids });
}
