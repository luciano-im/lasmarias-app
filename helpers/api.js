import { AsyncStorage } from 'react-native';
import { SQLite } from 'expo';
import axios from 'axios';
import qs from 'qs';
import NavigationService from '../navigation/NavigationService';
import Reactotron from 'reactotron-react-native';

// Open a database, creating it if it doesn't exist
const db = SQLite.openDatabase('lasmarias.db');

export const api = 'https://960201b3.ngrok.io';

///////// AsyncStorage

_saveToken = async token => {
  try {
    await AsyncStorage.setItem('Token', JSON.stringify(token));
  } catch (error) {
    Reactotron.error('Error saving Token');
  }
};

export let _getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('Token');
    return JSON.parse(token);
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

export let _saveDbData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    Reactotron.error('Error saving dbData');
  }
};

export let _getDbData = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    Reactotron.error('Error retrieving dbData');
  }
};

export let _addProductToOrder = async (item, qty = 1) => {
  try {
    const orderProducts = await AsyncStorage.getItem('OrderProducts');
    let products = orderProducts === null ? [] : JSON.parse(orderProducts);
    products.push({ id: item.product_id, item: item, qty: qty });
    try {
      await AsyncStorage.setItem('OrderProducts', JSON.stringify(products));
      return { error: false };
    } catch {
      Reactotron.error('Error saving product');
      return { error: true };
    }
  } catch {
    Reactotron.error('Error retrieving OrderProducts');
    return { error: true };
  }
};

export let _removeProductFromOrder = async product_id => {
  try {
    const orderProducts = await AsyncStorage.getItem('OrderProducts');
    if (orderProducts !== null) {
      let products = JSON.parse(orderProducts);
      delete products[product_id];
      await AsyncStorage.setItem('OrderProducts', JSON.stringify(products));
      return { error: false };
    }
  } catch {
    Reactotron.error('Error retrieving OrderProducts');
    return { error: true };
  }
};

export let _getOrder = async () => {
  try {
    const products = await AsyncStorage.getItem('OrderProducts');
    return JSON.parse(products);
  } catch {
    Reactotron.error('Error getting OrderProducts');
  }
};

export let _setOrder = async products => {
  try {
    await AsyncStorage.setItem('OrderProducts', JSON.stringify(products));
  } catch {
    Reactotron.error('Error saving products');
  }
};

export let _removeOrder = async () => {
  try {
    await AsyncStorage.removeItem('OrderProducts');
  } catch {
    Reactotron.error('Error deleting OrderProducts');
  }
};

///////// Not Authenticated

_notAuthenticated = () => {
  this._removeToken();
  NavigationService.navigate('Auth');
};

///////// Update dbData

export let updateDbData = async () => {
  // Check if there is dbData stored and compare with props dbData
  // If stored dbData is null or it's distinct from props dbData then call update
  try {
    const currentDbData = await _getDbData('currentDbData');
    const newDbData = await _getDbData('newDbData');
    // Reactotron.log('2 - current DB', JSON.parse(currentDbData));
    // Reactotron.log('2 - new DB', JSON.parse(newDbData));
    if (currentDbData === null || currentDbData !== newDbData) {
      NavigationService.navigate('UpdateModalScreen');
    }
  } catch (error) {
    Reactotron.error(error);
  }
};

///////// Fetch Auth API

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
    .post(api + '/rest-auth/login/', qs.stringify(data), config)
    .then(response => {
      // Reactotron.log(response);
      if (response.status === 200) {
        this._saveToken(response.data);
        return { error: false, userType: response.data.user_type };
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
    headers: { Authorization: 'Token ' + token.key }
  };

  return await axios
    .post(api + '/rest-auth/logout/', {}, config)
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

export let signUp = async (email, password, password2, relatedData) => {
  const config = {
    timeout: 5000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  const data = {
    email: email,
    password1: password,
    password2: password2,
    related_name: relatedData.nameText,
    related_last_name: relatedData.lastNameText,
    related_customer_name: relatedData.businessText,
    related_customer_address: relatedData.addressText,
    related_telephone: relatedData.telText,
    related_cel_phone: relatedData.celText,
    related_city: relatedData.cityText,
    related_zip_code: relatedData.zipText
  };

  return await axios
    .post(api + '/rest-auth/registration/', qs.stringify(data), config)
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

export let resetPassword = async email => {
  const config = {
    timeout: 5000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  const data = {
    email: email
  };

  return await axios
    .post(api + '/rest-auth/password/reset/', qs.stringify(data), config)
    .then(response => {
      Reactotron.log(response);
      if (response.status === 200) {
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
          msg: 'No se pudo procesar la solicitud',
          data: error
        };
      }
    });
};

///////// Fetch App Data API

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
  //       Reactotron.log(error);
  //     }
  //   );
  // });

  // Create database table if not exists
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS customer (customer_id integer PRIMARY KEY NOT NULL, name text NOT NULL, city text NOT NULL, discount numeric)'
    );
  });

  const token = await _getToken();

  const config = {
    timeout: 5000,
    responseType: 'json',
    headers: { Authorization: 'Token ' + token.key }
  };

  return await axios
    .get(api + '/api/customer/', config)
    .then(response => {
      Reactotron.log(response.data);
      if (response.status === 401) {
        this._notAuthenticated();
      }
      if (response.status === 200) {
        const data = response.data;
        data.forEach(customer => {
          db.transaction(tx => {
            tx.executeSql(
              'REPLACE INTO customer (customer_id, name, city, discount) VALUES (?, ?, ?, ?);',
              [
                customer.customer_id,
                customer.name,
                customer.city,
                customer.discount
              ]
            );
          });
        });
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
          msg: 'No se pudo procesar la solicitud',
          data: error
        };
      }
    });
};

export let fetchProducts = async () => {
  // Delete table customer
  // db.transaction(tx => {
  //   tx.executeSql(
  //     'DROP TABLE products;',
  //     [],
  //     (tx, results) => {
  //       Reactotron.log(results);
  //     },
  //     (tx, error) => {
  //       Reactotron.log(error);
  //     }
  //   );
  //   tx.executeSql(
  //     'DROP TABLE product_images;',
  //     [],
  //     (tx, results) => {
  //       Reactotron.log(results);
  //     },
  //     (tx, error) => {
  //       Reactotron.log(error);
  //     }
  //   );
  // });

  // Create database table if not exists
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS products (product_id text PRIMARY KEY NOT NULL, name text NOT NULL, brand text NOT NULL, product_line text NOT NULL, unit text NOT NULL, price number NOT NULL, offer boolean, offer_price number, package text)'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS product_images (product_id text NOT NULL, image text NOT NULL, PRIMARY KEY (product_id, image))'
    );
  });

  const token = await _getToken();

  const config = {
    timeout: 5000,
    responseType: 'json',
    headers: { Authorization: 'Token ' + token.key }
  };

  return await axios
    .get(api + '/api/product/', config)
    .then(response => {
      Reactotron.log(response.data);
      if (response.status === 401) {
        this._notAuthenticated();
      }
      if (response.status === 200) {
        const data = response.data;
        data.forEach(product => {
          db.transaction(tx => {
            tx.executeSql(
              'REPLACE INTO products (product_id, name, brand, product_line, unit, price, offer, offer_price, package) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
              [
                product.product_id,
                product.name,
                product.brand,
                product.product_line,
                product.unit,
                product.price,
                product.offer,
                product.offer_price,
                product.package
              ]
            );
            product.images.forEach(image => {
              tx.executeSql(
                'REPLACE INTO product_images (product_id, image) VALUES (?, ?);',
                [product.product_id, image.image_relative_url]
              );
            });
          });
        });
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
          msg: 'No se pudo procesar la solicitud',
          data: error
        };
      }
    });
};

export let fetchAccountBalance = async user => {
  const token = await _getToken();

  const config = {
    timeout: 5000,
    responseType: 'json',
    headers: { Authorization: 'Token ' + token.key }
  };

  return await axios
    .get(api + `/api/balance/${user}/`, config)
    .then(response => {
      if (response.status === 401) {
        this._notAuthenticated();
      }
      if (response.status === 200) {
        return {
          error: false,
          data: response.data
        };
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
          msg: 'No se pudo procesar la solicitud',
          data: error
        };
      }
    });
};

export let createOrder = async (data, customer) => {
  const token = await _getToken();

  const config = {
    timeout: 5000,
    responseType: 'json',
    headers: { Authorization: 'Token ' + token.key }
  };

  return await axios
    .post(api + `/api/order/${customer}/`, data, config)
    .then(response => {
      if (response.status === 401) {
        this._notAuthenticated();
      }
      if (response.status === 201) {
        const data = response.data;
        return { error: false, order: data.order_id };
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
          msg: 'No se pudo procesar la solicitud',
          data: error
        };
      }
    });
};

///////// DB Querys

export let getProducts = async (brand, productLine, unit) => {
  let where = '';
  if (brand || productLine || unit) {
    where = 'WHERE';
  }
  if (brand) {
    where += ` brand="${brand}"`;
  }
  if (productLine) {
    if (brand) {
      where += ` AND product_line="${productLine}"`;
    } else {
      where += ` product_line="${productLine}"`;
    }
  }
  if (unit) {
    if (brand || productLine) {
      where += ` AND unit="${unit}"`;
    } else {
      where += ` unit="${unit}"`;
    }
  }

  const sql = `SELECT * FROM products ${where} ORDER BY name ASC;`;

  return new Promise((resolve, reject) =>
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, { rows }) => {
          // Reactotron.log(rows);
          resolve(rows._array);
        },
        (tx, error) => {
          Reactotron.log('Error', tx, error, reject);
        }
      );
    })
  );
};

export let getProductImages = async product_id => {
  const sql = `SELECT image FROM product_images WHERE product_id="${product_id}";`;

  // Reactotron.log(sql);

  return new Promise((resolve, reject) =>
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, { rows }) => {
          // Reactotron.log(rows);
          resolve(rows._array);
        },
        (tx, error) => {
          Reactotron.log('Error', tx, error, reject);
        }
      );
    })
  );
};

// Use a Promise to assign result asynchronously
export let getCustomers = async city => {
  let where = '';
  if (city) {
    where = `WHERE city="${city}"`;
  }

  const sql = `SELECT customer_id, name FROM customer ${where} ORDER BY name ASC;`;

  return new Promise((resolve, reject) =>
    db.transaction(tx => {
      tx.executeSql(
        sql,
        [],
        (tx, { rows }) => {
          resolve(rows._array);
        },
        (tx, error) => {
          Reactotron.log('Error', tx, error, reject);
        }
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
        (tx, error) => {
          Reactotron.log('Error', tx, error, reject);
        }
      );
    })
  );
};
