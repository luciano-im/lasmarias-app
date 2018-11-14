import { SQLite } from 'expo';
import axios from 'axios';
import Reactotron from 'reactotron-react-native';

// Open a database, creating it if it doesn't exist
const db = SQLite.openDatabase('lasmarias.db');

const api = 'https://las-marias.localtunnel.me/';


export let fetchCustomers = async () => {
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


export let fetchAccountBalance = async (user) => {

  const config = {
    responseType: 'json'
  };

  axios.get(api+`api/balance/${user}/`, config)
  .then(response => {
    const data = response.data;
    console.log(data);
    return data;
  })
  .catch(error => {
    console.log(error);
  });
}


// Use a Promise to assign result asynchronously
export let getCustomers = async (city, address) => {
  let where = '';
  if(city && address) {
    where = `WHERE city="${city}" AND UPPER(address) LIKE '%${address.toUpperCase()}%'`;
  } else if (city) {
    where = `WHERE city="${city}"`;
  } else if (address) {
    where = `WHERE UPPER(address) LIKE '%${address.toUpperCase()}%'`;
  }

  const sql = `SELECT id, name FROM customer ${where} ORDER BY name ASC;`;

  console.log(sql);
  return new Promise((resolve, reject) => db.transaction(tx => {
    tx.executeSql(
      sql,
      [],
      (tx, { rows }) => {
        resolve(rows._array);
      },
      reject
    );
  }));
}

export let getCities = async () => {
  const sql = 'SELECT DISTINCT city FROM customer ORDER BY city ASC;';
  return new Promise((resolve, reject) => db.transaction(tx => {
    tx.executeSql(
      sql,
      [],
      (tx, { rows }) => {
        resolve(rows._array);
      },
      reject
    );
  }));
}
