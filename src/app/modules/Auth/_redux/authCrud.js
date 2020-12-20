import axios from "axios";

export const LOGIN_URL = "/user/login";
export const REGISTER_URL = "/user/register";
export const REQUEST_PASSWORD_URL = "/user/forgot-password";

export const ME_URL = "/user/me";

export function login(phoneNumber, password) {
  return axios.post(LOGIN_URL, { phoneNumber, password });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
