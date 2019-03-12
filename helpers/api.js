import { AsyncStorage } from 'react-native';
import { SQLite } from 'expo';
import axios from 'axios';
import qs from 'qs';
import Reactotron from 'reactotron-react-native';

// Open a database, creating it if it doesn't exist
const db = SQLite.openDatabase('lasmarias.db');

const api = 'https://las-marias.localtunnel.me/';

/////////

_saveToken = async token => {
  try {
    await AsyncStorage.setItem('Token', token);
  } catch (error) {
    Reactotron.error('Error saving Token');
  }
};

export let _getToken = async () => {
  try {
    return await AsyncStorage.getItem('Token');
  } catch {
    Reactotron.error('Error retrieving Token');
  }
};

export let _removeToken = async () => {
  try {
    await AsyncStorage.removeItem('Token');
  } catch {
    Reactotron.error('Error deleting Token');
  }
};

/////////

export let login = async (email, password) => {
  const config = {
    timeout: 5000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  const data = {
    email: email,
    password: password
  };

  return await axios
    .post(api + 'rest-auth/login/', qs.stringify(data), config)
    .then(response => {
      // Reactotron.log(response);
      if (response.status === 200) {
        this._saveToken(response.data.key);
        return { error: false };
      }
    })
    .catch(error => {
      // Reactotron.error(error);
      if (error.code === 'ECONNABORTED') {
        return {
          error: true,
          msg: 'El servidor no responde',
          data: error
        };
      } else {
        return {
          error: true,
          msg: 'No se pudo iniciar sesión con los datos ingresados',
          data: error
        };
      }
    });
};

export let logout = async () => {
  const token = await _getToken();

  const config = {
    timeout: 5000,
    headers: { Authorization: 'Token ' + token }
  };

  return await axios
    .post(api + 'rest-auth/logout/', {}, config)
    .then(async response => {
      // Reactotron.log(response);
      if (response.status === 200) {
        await _removeToken();
        return { error: false };
      }
    })
    .catch(error => {
      // Reactotron.error(error);
      if (error.code === 'ECONNABORTED') {
        return {
          error: true,
          msg: 'El servidor no responde',
          data: error
        };
      } else {
        return {
          error: true,
          msg: 'Error al cerrar sesión',
          data: error
        };
      }
    });
};

export let signUp = async (email, password, password2) => {
  const config = {
    timeout: 5000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  const data = {
    email: email,
    password1: password,
    password2: password2
  };

  return await axios
    .post(api + 'rest-auth/registration/', qs.stringify(data), config)
    .then(response => {
      // Reactotron.log(response);
      if (response.status === 201) {
        return { error: false };
      }
    })
    .catch(error => {
      Reactotron.error(error);
      if (error.code === 'ECONNABORTED') {
        return {
          error: true,
          msg: 'El servidor no responde',
          data: error
        };
      } else {
        return {
          error: true,
          msg: 'No se pudo registrar el usuario',
          data: error
        };
      }
    });
};

export let saveUserProfile = async (email, userData) => {
  const config = {
    timeout: 5000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  const data = {
    email: email,
    related_name: userData.nameText,
    related_last_name: userData.lastNameText,
    related_customer_name: userData.businessText,
    related_customer_address: userData.addressText,
    related_telephone: userData.telText,
    related_cel_phone: userData.celText,
    related_city: userData.cityText,
    related_zip_code: userData.zipText
  };

  return await axios
    .post(api + 'api/user/related-info/', qs.stringify(data), config)
    .then(response => {
      Reactotron.log(response);
      // if (response.status === 200) {
      //   return { error: false };
      // }
    })
    .catch(error => {
      Reactotron.error(error);
      if (error.code === 'ECONNABORTED') {
        return {
          error: true,
          msg: 'El servidor no responde',
          data: error
        };
      } else {
        return {
          error: true,
          msg: 'No se pudo registrar los datos del usuario',
          data: error
        };
      }
    });
};

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
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS customer (id integer PRIMARY KEY NOT NULL, name text, address text, city text)'
    );
  });

  const config = {
    responseType: 'json'
  };

  axios
    .get(api + 'api/customer/', config)
    .then(response => {
      const data = response.data;
      data.forEach(customer => {
        db.transaction(tx => {
          tx.executeSql(
            'REPLACE INTO customer (id, name, address, city) VALUES (?, ?, ?, ?);',
            [
              customer.customer_id,
              customer.name,
              customer.address,
              customer.city
            ]
          );
        });
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export let fetchAccountBalance = async user => {
  const config = {
    responseType: 'json'
  };

  return await axios
    .get(api + `api/balance/${user}/`, config)
    .then(response => {
      return response.data[0];
    })
    .catch(error => {
      console.log(error);
    });
};

// Use a Promise to assign result asynchronously
export let getCustomers = async (city, address) => {
  let where = '';
  if (city && address) {
    where = `WHERE city="${city}" AND UPPER(address) LIKE '%${address.toUpperCase()}%'`;
  } else if (city) {
    where = `WHERE city="${city}"`;
  } else if (address) {
    where = `WHERE UPPER(address) LIKE '%${address.toUpperCase()}%'`;
  }

  const sql = `SELECT id, name FROM customer ${where} ORDER BY name ASC;`;

  console.log(sql);
  return new Promise((resolve, reject) =>
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, { rows }) => {
          resolve(rows._array);
        },
        reject
      );
    })
  );
};

export let getCities = async () => {
  const sql = 'SELECT DISTINCT city FROM customer ORDER BY city ASC;';
  return new Promise((resolve, reject) =>
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, { rows }) => {
          resolve(rows._array);
        },
        reject
      );
    })
  );
};
