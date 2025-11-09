export const saveInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getValueFromLocalStorage = (key: string) => {
  return key ? localStorage.getItem(key) : "";
};

export const clearToken = () => {
  return localStorage.clear();
};
