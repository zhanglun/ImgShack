let store = {};
let storage = window.localStorage;

store.serialize = (value) => JSON.stringify(value);

store.deserialize = (value) =>  {
  if (typeof value != 'string') {
    return undefined;
  }
  return JSON.parse(value);
};

store.set = (key, val) => {
  if (val === undefined) {
    return store.remove(key);
  }
  storage.setItem(key, store.serialize(val));
  return val;
};

store.get = (key, defaultVal) => {
  let val = store.deserialize(storage.getItem(key));
  return (val === undefined ? defaultVal : val);
};

store.remove = (key) => {
  storage.removeItem(key);
}

store.clear = () => {
  storage.clear();
}

store.forEach = (callback) => {
  for (let i = 0; i < storage.length; i++) {
    let key = storage.key(i)
    callback(key, store.get(key))
  }
}

export default store;
