export const get = (key) => {
  return localStorage.getItem(key);
};
export const set = (key, data) => {
  return localStorage.setItem(key, data);
};
export const remove = (key) => {
  localStorage.removeItem(key);
};

export const setJSON = (key, data) => {
  set(key, JSON.stringify(data));
};
export const getJSON = (key) => {
  const data = get(key);
  return typeof data === "string" ? JSON.parse(data) : null;
};

const storage = {
  get,
  set,
  remove,
  setJSON,
  getJSON,
};

export default storage;
