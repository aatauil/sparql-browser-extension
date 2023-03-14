import Dexie from 'dexie';

export const db = new Dexie('myDatabase');

db.version(1).stores({
  workspaces: '++id, name, focused, created',
  files: '++id, name, workspaceId, focused, code, output, created, modified, favorite, duration, error, isLoading',
  endpoints: '++id, value, focused'
})

db.open().then(function (db) {
  console.log("db initialized")
}).catch (function (err) {
  console.log("db error", err)
});