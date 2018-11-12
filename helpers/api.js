import { SQLite } from 'expo';
import axios from 'axios';
import Reactotron from 'reactotron-react-native';

// Open a database, creating it if it doesn't exist
const db = SQLite.openDatabase('lasmarias.db');

const api = 'https://las-marias.localtunnel.me/';


export let fetchCustomers = () => {
  // Delete table customer
  // db.transaction(tx => {
  //   tx.executeSql(
  //     'DROP TABLE customer;',
  //     [],
  //     (tx, results) => {
  //       Reactotron.log(results);
  //     },
  //     (tx, error) => {
  //       Reactotron.log(error) ;
  //     }
  //   );
  // });

  //Create database table if not exists
  db.transaction(
    tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS customer (id integer PRIMARY KEY NOT NULL, name text, address text, city text)'
      );
    }
  );

  const config = {
    responseType: 'json'
  };

  axios.get(api+'api/customer/', config)
  .then(response => {
    const data = response.data;
    data.forEach(customer => {
      db.transaction(
        tx => {
          tx.executeSql(
            'REPLACE INTO customer (id, name, address, city) VALUES (?, ?, ?, ?);',
            [customer.customer_id, customer.name, customer.address, customer.city],
          );
        }
      );
    });
  })
  .catch(error => {
    console.log(error);
  });
}


// Use a Promise to assign result asynchronously
export let getCustomers = async () => {
  return new Promise((resolve, reject) => db.transaction(tx => {
    tx.executeSql(
      'SELECT id, name FROM customer;',
      [],
      (tx, { rows }) => {
        resolve(rows._array);
      },
      reject
    );
  }));
}

export let getCities = async () => {
  return new Promise((resolve, reject) => db.transaction(tx => {
    tx.executeSql(
      'SELECT DISTINCT city FROM customer;',
      [],
      (tx, { rows }) => {
        resolve(rows._array);
      },
      reject
    );
  }));
}
