(function () {
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
    let store = db.createObjectStore("Cycles", {
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

  // insert cycle
  insertCycle(db, {
    date: (new Date()).now,
   time: 'John',
     openingBal: 'John',
    stake: 'John',
      outcome: 'John',
    pnl: 'John',
    closingBal: 'John',
    profit: 'John',
     balance: 'John',
      odd: 'John',
   strategy: 'John',
      currencyPair: 'John',
  });


  // get cycle by id 1
  // getCycleById(db, 1);

  // get cycle by email
  // getCycleByDate(db, 'jane.doe@gmail.com');

  // get all cycles
  getAllCycles(db);

  //deleteCycle(db, 1);
};

function insertCycle(db, cycle) {
  // create a new transaction
  const txn = db.transaction("Cycles", "readwrite");

  // get the Cycles object store
  const store = txn.objectStore("Cycles");
  //
  let query = store.put(cycle);

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

function getCycleById(db, id) {
  const txn = db.transaction("Cycles", "readonly");
  const store = txn.objectStore("Cycles");

  let query = store.get(id);

  query.onsuccess = (event) => {
    if (!event.target.result) {
      console.log(`The cycle with ${id} not found`);
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

function getCycleByDate(db, date) {
  const txn = db.transaction("Cycles", "readonly");
  const store = txn.objectStore("Cycles");

  // get the index from the Object Store
  const index = store.index("date");
  // query by indexes
  let query = index.get(date);

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

function getAllCycles(db) {
  const txn = db.transaction("Cycles", "readonly");
  const objectStore = txn.objectStore("Cycles");

  objectStore.openCursor().onsuccess = (event) => {
    let cursor = event.target.result;
    if (cursor) {
      let cycle = cursor.value;
      console.log(cycle);
      // continue next record
      cursor.continue();
    }
  };
  // close the database connection
  txn.oncomplete = function () {
    db.close();
  };
}

function deleteCycle(db, id) {
  // create a new transaction
  const txn = db.transaction("Cycles", "readwrite");

  // get the Contacts object store
  const store = txn.objectStore("Cycles");
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
})();
