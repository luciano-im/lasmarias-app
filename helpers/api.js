﻿import { AsyncStorage } from 'react-native';
import { SQLite } from 'expo-sqlite';
import axios from 'axios';
import qs from 'qs';
import { format, parse } from 'date-fns';
import NavigationService from '../navigation/NavigationService';
import { API_URL } from 'react-native-dotenv';
import Reactotron from 'reactotron-react-native';

// Open a database, creating it if it doesn't exist
const db = SQLite.openDatabase('lasmarias.db');

const timeout = 30000;

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

export let _removeProductFromOrder = async productId => {
  try {
    const orderProducts = await AsyncStorage.getItem('OrderProducts');
    let products = JSON.parse(orderProducts);
    const newProducts = products.filter(p => {
      return p.id !== productId;
    });
    try {
      await AsyncStorage.setItem('OrderProducts', JSON.stringify(newProducts));
      return {
        error: false,
        products: newProducts,
        productsInCart: newProducts.length
      };
    } catch {
      Reactotron.error('Error saving product');
      return { error: true };
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

export let _addPendingOrder = async order => {
  try {
    const pendingOrders = await AsyncStorage.getItem('PendingOrders');
    let orders = pendingOrders === null ? [] : JSON.parse(pendingOrders);
    orders.push(order);
    try {
      await AsyncStorage.setItem('PendingOrders', JSON.stringify(orders));
      return { error: false };
    } catch {
      Reactotron.error('Error saving PendingOrders');
      return { error: true };
    }
  } catch {
    Reactotron.error('Error retrieving PendingOrders');
    return { error: true };
  }
};

// export let _removePendingOrder = async index => {
//   try {
//     const pendingOrders = await AsyncStorage.getItem('PendingOrders');
//     if (pendingOrders !== null) {
//       let orders = JSON.parse(pendingOrders);
//       orders.splice(index, 1);
//       await AsyncStorage.setItem('PendingOrders', JSON.stringify(orders));
//       return { error: false, pendingOrders: orders };
//     }
//   } catch {
//     Reactotron.error('Error retrieving PendingOrders');
//     return { error: true };
//   }
// };

export let _getPendingOrders = async () => {
  try {
    const pendingOrders = await AsyncStorage.getItem('PendingOrders');
    return JSON.parse(pendingOrders);
  } catch {
    Reactotron.error('Error getting PendingOrders');
  }
};

export let _setPendingOrders = async orders => {
  try {
    await AsyncStorage.setItem('PendingOrders', JSON.stringify(orders));
  } catch {
    Reactotron.error('Error saving PendingOrders');
  }
};

export let _removePendingOrders = async () => {
  try {
    await AsyncStorage.removeItem('PendingOrders');
  } catch {
    Reactotron.error('Error deleting PendingOrders');
  }
};

///////// Not Authenticated

_notAuthenticated = () => {
  this._removeToken();
  NavigationService.navigate('Auth');
};

///////// Update dbData

export let updateDbData = async newDbData => {
  const newData = JSON.stringify(newDbData);
  // Check if there is dbData stored and compare with props dbData
  // If stored dbData is null or it's distinct from props dbData then call update
  try {
    const currentDbData = await _getDbData('currentDbData');
    if (currentDbData === null || currentDbData !== newData) {
      await _saveDbData('newDbData', newDbData);
      await _saveDbData('imagesFetchDate', Date.now());
      NavigationService.navigate('UpdateModalScreen', { newDbData: newDbData });
    }
  } catch (error) {
    Reactotron.error(error);
  }
};

///////// Fetch Auth API

export let login = async (email, password) => {
  const config = {
    timeout: timeout,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  const data = {
    email: email,
    password: password
  };

  return await axios
    .post(API_URL + '/rest-auth/login/', qs.stringify(data), config)
    .then(response => {
      // Reactotron.log(response);
      if (response.status === 200) {
        const data = response.data;
        this._saveToken(data);
        return {
          error: false,
          userType: data.user_type,
          userName: data.name,
          userLastName: data.last_name,
          userEmail: data.email
        };
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
    timeout: timeout,
    headers: { Authorization: 'Token ' + token.key }
  };

  return await axios
    .post(API_URL + '/rest-auth/logout/', {}, config)
    .then(async response => {
      // Reactotron.log(response);
      if (response.status === 200) {
        _removeToken();
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
    timeout: timeout,
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
    related_zip_code: relatedData.zipText,
    related_cuit: relatedData.cuitText
  };

  return await axios
    .post(API_URL + '/rest-auth/registration/', qs.stringify(data), config)
    .then(response => {
      // Reactotron.log(response);
      if (response.status === 201) {
        return { error: false };
      }
    })
    .catch(error => {
      // Reactotron.error(error);
      if (error.code === 'ECONNABORTED') {
        return {
          error: true,
          msg: 'El servidor no responde',
          data: error.response.data
        };
      } else {
        return {
          error: true,
          msg: 'No se pudo registrar el usuario',
          data: error.response.data
        };
      }
    });
};

export let resetPassword = async email => {
  const config = {
    timeout: timeout,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  const data = {
    email: email
  };

  return await axios
    .post(API_URL + '/rest-auth/password/reset/', qs.stringify(data), config)
    .then(response => {
      // Reactotron.log(response);
      if (response.status === 401) {
        this._notAuthenticated();
      }
      if (response.status === 200) {
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
          msg: 'No se pudo procesar la solicitud',
          data: error
        };
      }
    });
};

export let changePassword = async (old, new1, new2) => {
  const token = await _getToken();

  const config = {
    timeout: timeout,
    headers: {
      Authorization: 'Token ' + token.key,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const data = {
    new_password1: new1,
    new_password2: new2,
    old_password: old
  };

  return await axios
    .post(API_URL + '/rest-auth/password/change/', qs.stringify(data), config)
    .then(response => {
      // Reactotron.log(response);
      if (response.status === 401) {
        this._notAuthenticated();
      }
      if (response.status === 200) {
        _removeToken();
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
          msg: 'No se pudo procesar la solicitud',
          data: error
        };
      }
    });
};

export let getUser = async () => {
  const token = await _getToken();

  const config = {
    timeout: timeout,
    headers: { Authorization: 'Token ' + token.key }
  };

  return await axios
    .get(API_URL + '/rest-auth/user/', config)
    .then(response => {
      if (response.status === 401) {
        this._notAuthenticated();
      }
      if (response.status === 200) {
        return { error: false, data: response.data };
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
          msg: 'No se pudo procesar la solicitud',
          data: error
        };
      }
    });
};

export let updateUser = async relatedData => {
  const token = await _getToken();

  const config = {
    timeout: timeout,
    headers: {
      Authorization: 'Token ' + token.key,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const data = {
    related_name: relatedData.nameText,
    related_last_name: relatedData.lastNameText,
    related_customer_name: relatedData.businessText,
    related_customer_address: relatedData.addressText,
    related_telephone: relatedData.telText,
    related_cel_phone: relatedData.celText,
    related_city: relatedData.cityText,
    related_zip_code: relatedData.zipText,
    related_cuit: relatedData.cuitText
  };

  return await axios
    .put(API_URL + '/rest-auth/user/', qs.stringify(data), config)
    .then(response => {
      if (response.status === 401) {
        this._notAuthenticated();
      }
      if (response.status === 200) {
        return { error: false, data: response.data };
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
          msg: 'No se pudo procesar la solicitud',
          data: error
        };
      }
    });
};

///////// Fetch App Data API

export let fetchImages = async (method, updateTimestamp = null) => {
  const token = await _getToken();

  const config = {
    url: API_URL + '/api/product/images/',
    method: method,
    headers: { Authorization: 'Token ' + token.key },
    timeout: timeout,
    responseType: 'json'
  };

  return await axios(config)
    .then(response => {
      console.log(response.data);
      if (response.status === 401) {
        this._notAuthenticated();
      }
      if (response.status === 200) {
        if (method === 'head') {
          return { error: false, updateDate: response.headers['update-date'] };
        }
        if (method === 'get') {
          // Create database table if not exists
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS product_images (product_id text NOT NULL, image text NOT NULL, PRIMARY KEY (product_id, image))'
            );
          });

          const data = response.data;
          data.forEach(product => {
            db.transaction(tx => {
              tx.executeSql(
                'REPLACE INTO product_images (product_id, image) VALUES (?, ?);',
                [product.product_id, product.image_relative_url]
              );
            });
          });

          _saveDbData('imagesUpdateDate', updateTimestamp);
          _saveDbData('imagesFetchDate', Date.now());
          return { error: false };
        }
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
          msg: 'No se pudo procesar la solicitud',
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
    timeout: timeout,
    responseType: 'json',
    headers: { Authorization: 'Token ' + token.key }
  };

  return await axios
    .get(API_URL + '/api/customer/', config)
    .then(response => {
      // Reactotron.log(response.data);
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
    timeout: timeout,
    responseType: 'json',
    headers: { Authorization: 'Token ' + token.key }
  };

  return await axios
    .get(API_URL + '/api/product/', config)
    .then(response => {
      // Reactotron.log(response.data);
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
          msg: 'No se pudo procesar la solicitud',
          data: error
        };
      }
    });
};

export let fetchAccountBalance = async user => {
  const token = await _getToken();

  const config = {
    timeout: timeout,
    responseType: 'json',
    headers: { Authorization: 'Token ' + token.key }
  };

  return await axios
    .get(API_URL + `/api/balance/${user}/`, config)
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
          msg: 'No se pudo procesar la solicitud',
          data: error
        };
      }
    });
};

export let fetchInvoices = async (
  user = null,
  dateFrom = null,
  dateTo = null
) => {
  const token = await _getToken();

  const config = {
    timeout: timeout,
    responseType: 'json',
    headers: { Authorization: 'Token ' + token.key }
  };

  let urlPath;
  if (user !== null && dateFrom !== null && dateTo !== null) {
    const dFrom = format(parse(dateFrom), 'YYYY-MM-DD');
    const dTo = format(parse(dateTo), 'YYYY-MM-DD');
    urlPath = `${user}/${dFrom}/${dTo}`;
  } else {
    if (user !== null && (dateFrom === null || dateTo === null)) {
      urlPath = `${user}`;
    } else {
      if (user === null && dateFrom !== null && dateTo !== null) {
        const dFrom = format(parse(dateFrom), 'YYYY-MM-DD');
        const dTo = format(parse(dateTo), 'YYYY-MM-DD');
        urlPath = `${dFrom}/${dTo}`;
      }
    }
  }

  const url = urlPath ? `/api/invoice/${urlPath}/` : `/api/invoice/`;

  return await axios
    .get(API_URL + url, config)
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
          msg: 'No se pudo procesar la solicitud',
          data: error
        };
      }
    });
};

export let fetchOrders = async (
  user = null,
  dateFrom = null,
  dateTo = null
) => {
  const token = await _getToken();

  const config = {
    timeout: timeout,
    responseType: 'json',
    headers: { Authorization: 'Token ' + token.key }
  };

  let urlPath;
  if (user !== null && dateFrom !== null && dateTo !== null) {
    const dFrom = format(parse(dateFrom), 'YYYY-MM-DD');
    const dTo = format(parse(dateTo), 'YYYY-MM-DD');
    urlPath = `${user}/${dFrom}/${dTo}`;
  } else {
    if (user !== null && (dateFrom === null || dateTo === null)) {
      urlPath = `${user}`;
    } else {
      if (user === null && dateFrom !== null && dateTo !== null) {
        const dFrom = format(parse(dateFrom), 'YYYY-MM-DD');
        const dTo = format(parse(dateTo), 'YYYY-MM-DD');
        urlPath = `${dFrom}/${dTo}`;
      }
    }
  }

  const url = urlPath ? `/api/order/${urlPath}/` : `/api/order/`;

  return await axios
    .get(API_URL + url, config)
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
          msg: 'No se pudo procesar la solicitud',
          data: error
        };
      }
    });
};

export let createOrder = async (data, customer) => {
  const token = await _getToken();

  const config = {
    timeout: timeout,
    responseType: 'json',
    headers: { Authorization: 'Token ' + token.key }
  };

  return await axios
    .post(API_URL + `/api/order/${customer}/`, data, config)
    .then(response => {
      // Reactotron.log(response);
      if (response.status === 401) {
        this._notAuthenticated();
      }
      if (response.status === 201) {
        const data = response.data;
        return {
          error: false,
          order: data.order_id,
          status_code: response.status,
          msg: 'Pedido creado'
        };
      }
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 404) {
          return {
            error: true,
            msg: 'El servidor no esta disponible'
          };
        }
        if (error.response.status === 409) {
          const data = error.response.data;
          return {
            error: false,
            order: data.order_id,
            status_code: error.response.status,
            msg: 'El pedido ya existe'
          };
        }
        if (error.code === 'ECONNABORTED') {
          return {
            error: true,
            msg: 'El servidor no responde',
            data: error
          };
        }
        return {
          error: true,
          msg: 'No se pudo procesar la solicitud',
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

export let getProducts = async productLine => {
  let where = '';
  if (productLine) {
    if (productLine === 'ofertas') {
      where = `WHERE offer=0`;
    } else {
      where = `WHERE lower(product_line)="${productLine}"`;
    }
  }

  const sql = `SELECT * FROM products ${where} ORDER BY name ASC;`;

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
