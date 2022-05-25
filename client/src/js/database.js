import { text } from 'express';
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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => { 
  console.log('PUT to the database');
  //connect to DB and version we want to use
  const textDb = await openDB('jate',1);
  //make new transaction , specify the db we posting to and the data privilege of "readwrite"
  const tx = textDb.transaction('jate','readwrite');
  //open object store
  const store = tx.objectStore('jate');
  //use .put() method to pass in content
  const request = store.put({ id: id, text: content });
  //confirm teh data was added
  const result = await request; console.log('🚀 - data saved to the database', result)
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  //connect to DB and version we want to use
  const todosDb = await openDB('jate', 1);
  // make new transaction , specify the db we posting to and the data privilege of "readonly"
  const tx = todosDb.transaction('jate', 'readonly');
  //open the object store
  const store = tx.objectStore('jate');
  //use .getAll() method to grab all the content in the DB
  const request = store.getAll();
  //confirm the data was fetched
  const result = await request;
  console.log('result.value', result);
  return result;
}
initdb();
