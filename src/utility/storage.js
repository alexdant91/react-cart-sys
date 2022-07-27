export const setStorage = (label, value) => {
  localStorage.setItem(label, JSON.stringify(value));
}

export const getStorage = (label) => {
  return JSON.parse(localStorage.getItem(label));
}

export const clearStorage = () => {
  localStorage.clear();
}
