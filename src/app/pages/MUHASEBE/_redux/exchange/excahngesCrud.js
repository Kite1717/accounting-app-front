import axios from "axios";

export const EXCHANGES_URL = "https://api.exchangeratesapi.io/latest?base=USD";

// CREATE =>  POST: add a new exchange to the server

export function getExchangesByTRY(){
  return axios.get("https://api.exchangeratesapi.io/latest")
}

export function createExchange(exchange) {
  console.log(EXCHANGES_URL, "  ", EXCHANGES_URL + "/new")
  return axios.post(`${EXCHANGES_URL}/new`, { exchange });
}

// READ
export function getAllExchanges() {
  return axios.get(EXCHANGES_URL);
}

export function getExchangeById(exchangeId) {
  return axios.get(`${EXCHANGES_URL}/${exchangeId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findExchanges(queryParams) {
  return axios.post(`${EXCHANGES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the exchange on the server
export function updateExchange(exchange) {
  return axios.put(`${EXCHANGES_URL}/${exchange.id}`, { exchange });
}

// UPDATE Status
export function updateStatusForExchanges(ids, status) {
  return axios.post(`${EXCHANGES_URL}/updateStatusForExchanges`, {
    ids,
    status
  });
}

// DELETE => delete the exchange from the server
export function deleteExchange(exchangeId) {
  return axios.delete(`${EXCHANGES_URL}/${exchangeId}`);
}

// DELETE Exchanges by ids
export function deleteExchanges(ids) {
  return axios.post(`${EXCHANGES_URL}/deleteExchanges`, { ids });
}
