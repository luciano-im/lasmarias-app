import { SQLite } from 'expo';
import axios from 'axios';

// Open a database, creating it if it doesn't exist
const db = SQLite.openDatabase('lasmarias.db');

const api = 'https://las-marias.localtunnel.me/';

fetchCustomers = () => {

  //Create database table if not exists
  db.transaction(tx => {
    tx.executeSql(
      'create table if not exists customer (id integer primary key not null, address text, city text);'
    );
  });

  const config = {
    responseType: 'json'
  };

  axios.get(api+'api/customer/', config)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
}

export default fetchCustomers;
