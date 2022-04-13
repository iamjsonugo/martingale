// check for IndexedDB support
if (!window.indexedDB) {
  console.log(`Your browser doesn't support IndexedDB`);
  return;
}

// open the CRM database with the version 1
const request = indexedDB.open("UGO", 1);

// create the object store and indexes
request.onupgradeneeded = (event) => {
    let db = event.target.result;
    let store = db.createObjectStore("Cycle", {
      autoIncrement: true,
    });
    let index = store.createIndex("date", "date", {
      unique: true,
    });
  };
 
// handle the error event
request.onerror = (event) => {
  console.error(`Database error: ${event.target.errorCode}`);
};

// handle the success event
request.onsuccess = (event) => {
  const db = event.target.result;

  // insert contacts
  // insertContact(db, {
  //     date: (new Date()).now,
  //     time: 'John',
  //     openingBal: 'John',
  //     stake: 'John',
  //     outcome: 'John',
  //     pnl: 'John',
  //     closingBal: 'John',
  //     profit: 'John',
  //     balance: 'John',
  //     odd: 'John',
  //     strategy: 'John',
  //     currencyPair: 'John',
  // });

  // insertContact(db, {
  //     email: 'jane.doe@gmail.com',
  //     firstName: 'Jane',
  //     lastName: 'Doe'
  // });

  // get contact by id 1
  // getContactById(db, 1);

  // get contact by email
  // getContactByEmail(db, 'jane.doe@gmail.com');

  // get all contacts
  // getAllContacts(db);

  //deleteContact(db, 1);
};

function insertContact(db, contact) {
  // create a new transaction
  const txn = db.transaction("Contacts", "readwrite");

  // get the Contacts object store
  const store = txn.objectStore("Contacts");
  //
  let query = store.put(contact);

  // handle success case
  query.onsuccess = function (event) {
    console.log(event);
  };

  // handle the error case
  query.onerror = function (event) {
    console.log(event.target.errorCode);
  };

  // close the database once the
  // transaction completes
  txn.oncomplete = function () {
    db.close();
  };
}

function getContactById(db, id) {
  const txn = db.transaction("Contacts", "readonly");
  const store = txn.objectStore("Contacts");

  let query = store.get(id);

  query.onsuccess = (event) => {
    if (!event.target.result) {
      console.log(`The contact with ${id} not found`);
    } else {
      console.table(event.target.result);
    }
  };

  query.onerror = (event) => {
    console.log(event.target.errorCode);
  };

  txn.oncomplete = function () {
    db.close();
  };
}

function getContactByEmail(db, email) {
  const txn = db.transaction("Contacts", "readonly");
  const store = txn.objectStore("Contacts");

  // get the index from the Object Store
  const index = store.index("email");
  // query by indexes
  let query = index.get(email);

  // return the result object on success
  query.onsuccess = (event) => {
    console.table(query.result); // result objects
  };

  query.onerror = (event) => {
    console.log(event.target.errorCode);
  };

  // close the database connection
  txn.oncomplete = function () {
    db.close();
  };
}

function getAllContacts(db) {
  const txn = db.transaction("Contacts", "readonly");
  const objectStore = txn.objectStore("Contacts");

  objectStore.openCursor().onsuccess = (event) => {
    let cursor = event.target.result;
    if (cursor) {
      let contact = cursor.value;
      console.log(contact);
      // continue next record
      cursor.continue();
    }
  };
  // close the database connection
  txn.oncomplete = function () {
    db.close();
  };
}

function deleteContact(db, id) {
  // create a new transaction
  const txn = db.transaction("Contacts", "readwrite");

  // get the Contacts object store
  const store = txn.objectStore("Contacts");
  //
  let query = store.delete(id);

  // handle the success case
  query.onsuccess = function (event) {
    console.log(event);
  };

  // handle the error case
  query.onerror = function (event) {
    console.log(event.target.errorCode);
  };

  // close the database once the
  // transaction completes
  txn.oncomplete = function () {
    db.close();
  };
}
