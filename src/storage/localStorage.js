const savelocalStorage = function(localStorageKey, localStorageValue) {
  window.localStorage.setItem(localStorageKey, localStorageValue);
};

const getlocalStorage = function(localStorageKey) {
  return window.localStorage.getItem(localStorageKey);
};

const destroyLocalStorage = function(localStorageKey) {
  window.localStorage.removeItem(localStorageKey);
};
export default {
  savelocalStorage,
  getlocalStorage,
  destroyLocalStorage
};
