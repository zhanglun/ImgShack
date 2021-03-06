import Nedb from 'nedb/browser-version/out/nedb.min';

const store = {};
store.db = {};

let storage = window.localStorage;

store.serialize = (value) => JSON.stringify(value);

store.deserialize = (value) => {
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
};

store.clear = () => {
  storage.clear();
};

store.forEach = (callback) => {
  for (let i = 0; i < storage.length; i++) {
    let key = storage.key(i);
    callback(key, store.get(key));
  }
};

store.addFile = (fileInfo) => {
  let fileList = store.get('fileList', []);
  fileList.push(fileInfo);
  store.set('fileList', fileList);
};

store.clearAllFile = () => {
  store.set('fileList', []);
};

let removeAll = function(database) {
  database.remove({}, { multi: true }, function(err, numRemoved) {
    console.log(numRemoved);
  });
};

store.open = (database) => {
  let db = store.db;
  db[database] = new Nedb(database);
  return store.db;
};

store.drop = (database) => {
  let db = store.db;
  db[database] ? removeAll(db[database]) : null;
};

export default store;
