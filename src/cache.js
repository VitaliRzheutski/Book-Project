const writeToCache = (url, data) => {
  console.log("localStorage", localStorage);
  return localStorage.setItem(url, JSON.stringify(data));
};

const readFromCache = (url) => JSON.parse(localStorage.getItem(url)) || null;

export { readFromCache, writeToCache };
