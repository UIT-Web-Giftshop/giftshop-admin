/**
 * @file Token
 * @module service.token

 */

import storage from "./storage";

const TOKEN_STORAGE_KEY = "auth";
const TOKEN_BIRTH_TIME = "token_birth_time";
const TOKEN_EXPIRES_IN = "token_expires_in";

export const getToken = () => {
  return storage.get(TOKEN_STORAGE_KEY);
};

export const setToken = (token) => {
  storage.set(TOKEN_STORAGE_KEY, token);
};

export const removeToken = () => {
  storage.remove(TOKEN_STORAGE_KEY);
  storage.remove(TOKEN_EXPIRES_IN);
  storage.remove(TOKEN_BIRTH_TIME);
};

export const isTokenValid = () => {
  const token = getToken();
  const tokenIsOk = token?.split(".").length === 3;
  return tokenIsOk;
};

const token = {
  getToken,
  setToken,
  removeToken,
  isTokenValid,
};

export default token;
