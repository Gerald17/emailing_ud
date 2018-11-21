import localforage from 'localforage';

const localDb = localforage.createInstance({
  name        : 'Emailing',
});

localDb.config({
  driver      : [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
  version     : 1.0,
  size        : 4980736,
})

export default localDb;
