import axios from "axios";

export const BILLS_URL = "api/workers";

// CREATE =>  POST: add a new worker to the server
export function createWorker(worker) {
  return axios.post(BILLS_URL, { worker });
}

// READ
export function getAllWorkers() {
  return axios.get(BILLS_URL);
}

export function getWorkerById(workerId) {
  return axios.get(`${BILLS_URL}/${workerId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findWorkers(queryParams) {
  return axios.post(`${BILLS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the worker on the server
export function updateWorker(worker) {
  return axios.put(`${BILLS_URL}/${worker.id}`, { worker });
}

// UPDATE Status
export function updateStatusForWorkers(ids, status) {
  return axios.post(`${BILLS_URL}/updateStatusForWorkers`, {
    ids,
    status,
  });
}

// DELETE => delete the worker from the server
export function deleteWorker(workerId) {
  return axios.delete(`${BILLS_URL}/${workerId}`);
}

// DELETE Workers by ids
export function deleteWorkers(ids) {
  return axios.post(`${BILLS_URL}/deleteWorkers`, { ids });
}
