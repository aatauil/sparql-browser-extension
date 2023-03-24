import Dexie from 'dexie';

export const db = new Dexie('myDatabase');

db.version(1).stores({
  workspaces: '++id, name, focused, created',
  files: '++id, name, workspaceId, focused, code, output, created, modified, favorite, status, statusMessage, errorMessage, isLoading, duration',
  endpoints: '++id, value, label, focused'
})

db.open().then(function (db) {
  console.log("db initialized")
}).catch (function (err) {
  console.log("db error", err)
});