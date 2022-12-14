import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// add logic to a method that accepts some content and adds it to the database.. LOOK AT ACT 24 JS/DATABASE.JS
export const putDb = async (content) => {
  console.log('PUT to database');
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the .get() method to get a piece of data from the database based on the id.
  const request = store.put({ jate: content });
  // Get confirmation of the request.
  const result = await request;
    console.log('🚀 - data saved to the database', result.value);
};

// add logic for a method that gets all the content from the database.. LOOK AT ACT 24 JS/DATABASE.JS
// Export a function we will use to GET from the database.
export const getDb = async () => {
  console.error('GET from database!');
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the .get() method to get a piece of data from the database based on the id.
  const request = store.getAll();
  // Get confirmation of the request.
  const result = await request;
    console.log('🚀 - data saved to database', result.value)
  return result.value
};

initdb();