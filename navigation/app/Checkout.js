import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Paragraph,
  Portal,
  Snackbar,
  Text,
  TouchableRipple
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { NavigationEvents } from 'react-navigation';
import { format, parse } from 'date-fns';
import { withStore } from '@spyna/react-store';
import { theme } from '../../helpers/styles';
import {
  _getOrder,
  _setOrder,
  _removeOrder,
  _removeProductFromOrder,
  _addPendingOrder,
  createOrder
} from '../../helpers/api';
import SelectCustomer from '../../components/SelectCustomer';
import CheckoutProductsTable from './components/CheckoutProductsTable';
import PayMethod from './components/PayMethod';
import DeliveryMethod from './components/DeliveryMethod';
import Reactotron from 'reactotron-react-native';
import PropTypes from 'prop-types';

class CheckoutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      delivery: null,
      inputs: {},
      subtotal: 0.0,
      snackVisible: false,
      snackText: '',
      confirmVisible: false,
      confirmDeleteVisible: false,
      confirmRemoveProductVisible: false,
      productToRemove: null,
      animating: false,
      firstStep: true,
      secondStep: false,
      errorStep: false,
      errorText: null,
      buttonDisabled: true,
      cancelCheckout: false
    };
  }

  _showSnack = text => {
    this.setState({
      snackVisible: true,
      snackText: text
    });
  };

  _hideSnack = () => {
    this.setState({
      snackVisible: false
    });
  };

  _cancelConfirm = () => {
    this.setState({
      confirmVisible: false
    });
  };

  _updateInputText = (input, action, qty) => {
    let newState;
    if (action === 'add') {
      newState = { [input]: parseInt(this.state.inputs[input]) + qty };
    } else {
      if (action === 'sub') {
        newState = { [input]: parseInt(this.state.inputs[input]) - qty };
      } else {
        if (action === null) {
          newState = { [input]: qty };
        }
      }
    }

    // Disable update on qty < 1
    if (newState[input] >= 1) {
      const subtotal = this.state.products.reduce((total, item) => {
        // Use (+) unary operator to turn string into numbers
        if ('input' + item.id === input) {
          return +total + +item.item.price * +newState[input];
        } else {
          return +total + +item.item.price * +item.qty;
        }
      }, []);

      this.setState({
        inputs: {
          ...this.state.inputs,
          ...newState
        },
        subtotal: subtotal
      });
    }
  };

  _setDeliveryMethod = val => {
    this.setState({
      delivery: val
    });
  };

  _removeProduct = async () => {
    this.setState({
      confirmRemoveProductVisible: false
    });

    let product = this.state.productToRemove;

    const removeProduct = await _removeProductFromOrder(product.id);
    // Set productsinCart badge
    if (removeProduct.error === false) {
      this.props.store.set('productsInCart', removeProduct.productsInCart);
    }
    // Update state
    let { inputs } = this.state;
    const deletedInput = 'input' + product.id;
    delete inputs[deletedInput];
    let subtotal;
    let products;
    if (removeProduct.productsInCart > 0) {
      subtotal = removeProduct.products.reduce((total, item) => {
        // Use (+) unary operator to turn string into numbers
        const currentInput = 'input' + item.id;
        if (currentInput !== deletedInput) {
          return +total + +item.item.price * +inputs[currentInput];
        }
      }, []);
      products = removeProduct.products;
    } else {
      subtotal = 0;
      products = [];
    }

    this.setState({
      products: products,
      inputs: { ...inputs },
      subtotal: subtotal,
      productToRemove: null
    });
  };

  _cancelRemoveProduct = () => {
    this.setState({
      confirmRemoveProductVisible: false
    });
  };

  _onRemoveProduct = product => {
    this.setState({
      confirmRemoveProductVisible: true,
      productToRemove: product
    });
  };

  _processCheckout = async () => {
    // Show second modal view
    this.setState({
      firstStep: false,
      secondStep: true
    });

    const { inputs, products, delivery } = this.state;
    const customer = this.props.id;
    const customerName = this.props.name;

    if (products === null) {
      this.setState({
        confirmVisible: false
      });
      this._showSnack('Debe seleccionar al menos un Producto');
    } else {
      if (delivery === null) {
        this.setState({
          confirmVisible: false
        });
        this._showSnack('Debe seleccionar la forma de Envío');
      } else {
        // Build payload
        const date = new Date();
        const items = products.map(item => {
          return {
            product_id: item.id,
            price: item.item.price,
            quantity: inputs['input' + item.id]
          };
        });
        const data = {
          status: 'Recibido',
          date: format(parse(date), 'YYYY-MM-DD'),
          discount: 0,
          payment: 'Cheque',
          shipping: 'ENV',
          created_at: format(parse(date), 'YYYY-MM-DD[T]HH:mm:ss'),
          items: [...items]
        };
        // Send request
        const result = await createOrder(data, customer);

        if (result.error === false) {
          this.setState({
            confirmVisible: false
          });
          // Remove products in cart
          await _removeOrder();
          this.props.store.set('productsInCart', 0);
          // Navigate to success screen
          this.props.navigation.navigate('CheckoutOk', {
            order: result.order
          });
        } else {
          // Show error message
          this.setState({
            secondStep: false,
            errorStep: true,
            errorText: result.msg,
            buttonDisabled: false
          });
          // Save pending order in AsyncStorage
          const pendingOrder = {
            customer: customer,
            name: customerName,
            order: data
          };
          await _addPendingOrder(pendingOrder);
          if (this.props.pendingOrders === false) {
            this.props.store.set('pendingOrders', true);
          }
          // Remove products in cart
          await _removeOrder();
          this.props.store.set('productsInCart', 0);
        }
      }
    }
  };

  _cancelCheckout = async () => {
    await _removeOrder();
    this.setState({
      cancelCheckout: true,
      confirmDeleteVisible: false
    });
    // Set products in cart to 0
    this.props.store.set('productsInCart', 0);
    this.props.navigation.navigate('Home');
  };

  _cancelDeleteCheckout = () => {
    this.setState({
      confirmDeleteVisible: false
    });
  };

  _onCheckout = () => {
    // Show confirm modal
    this.setState({
      confirmVisible: true,
      firstStep: true,
      secondStep: false,
      errorStep: false,
      errorText: ''
    });
  };

  _onBlurScreen = async () => {
    if (this.state.cancelCheckout !== true) {
      // Update products in cart if leaving screen without errors
      if (this.state.errorText === null) {
        const customer = this.props.id;
        // If customer is null = Remove customer button pressed
        if (customer !== null) {
          let { products } = this.state;
          const updatedProducts = products.map(item => {
            return { ...item, qty: this.state.inputs['input' + item.id] };
          });
          await _setOrder(updatedProducts);
        }
      }
    }
  };

  async componentDidMount() {
    const products = await _getOrder();
    let inputs = {};
    let subtotal = 0;
    products.map(item => {
      const key = 'input' + item.item.product_id.toString().trim();
      inputs[key] = item.qty;
      // Calculate subtotal for products on initial view
      subtotal += item.item.price * item.qty;
    });

    this.setState({
      products: products,
      inputs: inputs,
      subtotal: subtotal
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.products !== this.state.products ||
      nextState.inputs !== this.state.inputs ||
      nextState.snackVisible !== this.state.snackVisible ||
      nextState.confirmDeleteVisible !== this.state.confirmDeleteVisible ||
      nextState.confirmVisible !== this.state.confirmVisible ||
      nextState.confirmRemoveProductVisible !==
        this.state.confirmRemoveProductVisible ||
      nextState.firstStep !== this.state.firstStep ||
      nextState.secondStep !== this.state.secondStep ||
      nextState.errorStep !== this.state.errorStep
    );
  }

  render() {
    Reactotron.log('Render Checkout');
    const { firstStep, secondStep, errorStep } = this.state;

    const iva = (this.state.subtotal * 21) / 100;
    const total = this.state.subtotal + iva;

    return (
      <View style={styles.container}>
        <Snackbar
          style={{ zIndex: 10000 }}
          visible={this.state.snackVisible}
          onDismiss={() => this._hideSnack()}
          duration={5000}
          action={{
            label: 'OK',
            onPress: () => this._hideSnack()
          }}
          theme={{
            colors: {
              accent: theme.ACCENT_COLOR
            }
          }}
        >
          <Text style={{ fontSize: moderateScale(14, 0.3), color: 'white' }}>
            {this.state.snackText}
          </Text>
        </Snackbar>
        <ScrollView style={styles.container}>
          <NavigationEvents onWillBlur={payload => this._onBlurScreen()} />
          <SelectCustomer navigation={this.props.navigation} />
          <View style={styles.title}>
            <Text style={styles.titleText}>CARRITO DE PEDIDO</Text>
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.header}>
              {/* <Text style={styles.headerText}>Pedido Nº: XXXXXX</Text> */}
              <Text style={styles.headerText}>
                Fecha: {format(parse(new Date()), 'DD/MM/YY')}
              </Text>
            </View>
            <View style={styles.productList}>
              <CheckoutProductsTable
                products={this.state.products}
                inputs={this.state.inputs}
                onUpdateInput={this._updateInputText}
                onRemoveProduct={this._onRemoveProduct}
              />
            </View>
            <View style={styles.addProductsButtonContainer}>
              <TouchableRipple
                borderless
                onPress={() => this.props.navigation.navigate('Home')}
                style={styles.addProductsButton}
              >
                <View style={{ flexDirection: 'row' }}>
                  <MaterialIcons
                    name="add-circle"
                    size={25}
                    color="white"
                    style={styles.addProductsButtonIcon}
                  />
                  <Text
                    theme={{
                      colors: {
                        text: '#FFFFFF'
                      }
                    }}
                    style={styles.addProductsButtonText}
                  >
                    AGREGAR PRODUCTOS
                  </Text>
                </View>
              </TouchableRipple>
            </View>
            <View style={styles.totalsContainer}>
              <View style={styles.totalRow}>
                <Text style={styles.totalText}>Subtotal:</Text>
                <Text style={styles.totalText}>
                  $ {this.state.subtotal.toFixed(2)}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalText}>IVA (21%):</Text>
                <Text style={styles.totalText}>$ {iva.toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={[styles.totalText, styles.totalRed]}>
                  DESCUENTO:
                </Text>
                <Text style={[styles.totalText, styles.totalRed]}>$ -</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalText}>(*) TOTAL:</Text>
                <Text style={styles.totalText}>$ {total.toFixed(2)}</Text>
              </View>
              <View style={styles.legend}>
                <Text
                  style={{ color: '#AAA', fontSize: moderateScale(14, 0.3) }}
                >
                  (*) Los importes quedarán sujetos al valor final de
                  facturación debido a la merma en el peso. Cuando el pedido
                  pase al estado de
                  <Text style={{ color: '#555' }}> Pedido Preparado </Text>
                  se actualizarán los valores finales tanto en el pedido como en
                  el <Text style={{ color: '#555' }}>Estado de Cuenta</Text>
                </Text>
              </View>
              {/* <View style={styles.payMethod}>
              <PayMethod />
            </View> */}
              <View style={styles.deliveryMethod}>
                <DeliveryMethod onSelect={this._setDeliveryMethod} />
              </View>
              <View style={styles.addProductsButtonContainer}>
                <TouchableRipple
                  borderless
                  onPress={() => this._onCheckout()}
                  style={styles.addProductsButton}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      theme={{
                        colors: {
                          text: '#FFFFFF'
                        }
                      }}
                      style={styles.addProductsButtonText}
                    >
                      CONFIRMAR PEDIDO
                    </Text>
                  </View>
                </TouchableRipple>
              </View>
              <View style={styles.addProductsButtonContainer}>
                <TouchableRipple
                  borderless
                  onPress={() => this.props.navigation.navigate('Home')}
                  style={styles.addProductsButton}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <MaterialIcons
                      name="add-circle"
                      size={25}
                      color="white"
                      style={styles.addProductsButtonIcon}
                    />
                    <Text
                      theme={{
                        colors: {
                          text: '#FFFFFF'
                        }
                      }}
                      style={styles.addProductsButtonText}
                    >
                      AGREGAR PRODUCTOS
                    </Text>
                  </View>
                </TouchableRipple>
              </View>
              <View style={styles.addProductsButtonContainer}>
                <TouchableRipple
                  borderless
                  onPress={() =>
                    this.setState({
                      confirmDeleteVisible: true
                    })
                  }
                  style={styles.addProductsButton}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      theme={{
                        colors: {
                          text: '#FFFFFF'
                        }
                      }}
                      style={styles.addProductsButtonText}
                    >
                      CANCELAR PEDIDO
                    </Text>
                  </View>
                </TouchableRipple>
              </View>
            </View>
          </View>
        </ScrollView>
        <Portal>
          <Dialog
            visible={this.state.confirmVisible}
            dismissable={false}
            onDismiss={this._cancelConfirm}
            style={styles.dialog}
          >
            <Dialog.Title style={styles.dialogTitle}>ATENCION!</Dialog.Title>
            {firstStep && (
              <Dialog.Content>
                <Paragraph style={styles.paragraph}>
                  ¿Desea confirmar el pedido?
                </Paragraph>
              </Dialog.Content>
            )}
            {secondStep && (
              <Dialog.Content>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ActivityIndicator
                    color={theme.PRIMARY_COLOR}
                    size={30}
                    style={{
                      marginRight: 16,
                      display: this.state.animating ? 'flex' : 'none'
                    }}
                    animating={this.state.animating}
                  />
                  <Text style={styles.paragraph}>Confirmando pedido...</Text>
                </View>
              </Dialog.Content>
            )}
            {errorStep && (
              <Dialog.Content>
                <Paragraph style={styles.paragraph}>
                  {this.state.errorText}
                </Paragraph>
              </Dialog.Content>
            )}
            {firstStep && (
              <Dialog.Actions>
                <Button onPress={this._cancelConfirm}>
                  <Text style={styles.dialogButton}>CANCELAR</Text>
                </Button>
                <Button onPress={this._processCheckout}>
                  <Text style={styles.dialogButton}>ACEPTAR</Text>
                </Button>
              </Dialog.Actions>
            )}
            {errorStep && (
              <Dialog.Actions>
                <Button
                  onPress={() => this.props.navigation.navigate('Home')}
                  disabled={this.state.buttonDisabled}
                >
                  <Text
                    style={
                      this.state.buttonDisabled
                        ? styles.buttonDisabled
                        : styles.dialogButton
                    }
                  >
                    OK
                  </Text>
                </Button>
              </Dialog.Actions>
            )}
          </Dialog>
          <Dialog
            visible={this.state.confirmDeleteVisible}
            dismissable={false}
            onDismiss={this._cancelDeleteCheckout}
            style={styles.dialog}
          >
            <Dialog.Title style={styles.dialogTitle}>ATENCION!</Dialog.Title>
            <Dialog.Content>
              <Paragraph style={styles.paragraph}>
                Esta por cancelar el pedido. ¿Está seguro?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._cancelDeleteCheckout}>
                <Text style={styles.dialogButton}>CANCELAR</Text>
              </Button>
              <Button onPress={this._cancelCheckout}>
                <Text style={styles.dialogButton}>ACEPTAR</Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
          <Dialog
            visible={this.state.confirmRemoveProductVisible}
            dismissable={false}
            onDismiss={this._cancelRemoveProduct}
            style={styles.dialog}
          >
            <Dialog.Title style={styles.dialogTitle}>ATENCION!</Dialog.Title>
            <Dialog.Content>
              <Paragraph style={styles.paragraph}>
                Esta por borrar un producto del pedido. ¿Está seguro?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._cancelRemoveProduct}>
                <Text style={styles.dialogButton}>CANCELAR</Text>
              </Button>
              <Button onPress={this._removeProduct}>
                <Text style={styles.dialogButton}>ACEPTAR</Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  title: {
    marginVertical: '5@ms0.3',
    paddingVertical: '3@ms0.3',
    alignItems: 'center',
    backgroundColor: theme.PRIMARY_COLOR
  },
  titleText: {
    fontSize: '19@ms0.3',
    color: 'white'
  },
  dataContainer: {
    paddingHorizontal: '10@ms0.3',
    paddingBottom: '20@ms0.3'
  },
  header: {
    flexDirection: 'row',
    marginTop: '10@ms0.3',
    justifyContent: 'space-between',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    marginBottom: '20@ms0.3'
  },
  headerText: {
    fontSize: '16@ms0.3',
    fontWeight: 'bold'
  },
  productList: {
    marginBottom: '25@ms0.3'
  },
  addProductsButtonContainer: {
    flex: 1,
    backgroundColor: theme.ACCENT_COLOR,
    marginHorizontal: '20@ms0.3',
    marginVertical: '5@ms0.3'
  },
  addProductsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10@ms0.3'
  },
  addProductsButtonIcon: {
    marginRight: '10@ms0.3'
  },
  addProductsButtonText: {
    fontSize: '18@ms0.3'
  },
  totalsContainer: {
    marginTop: '20@ms0.3'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5@ms0.3',
    paddingVertical: '3@ms0.3',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1
  },
  totalText: {
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    fontSize: '17@ms0.3'
  },
  totalRed: {
    color: 'red'
  },
  legend: {
    marginTop: '20@ms0.3'
  },
  payMethod: {
    marginTop: '20@ms0.3'
  },
  deliveryMethod: {
    marginTop: '15@ms0.3',
    marginBottom: '25@ms0.3'
  },
  dialog: {
    maxWidth: 400,
    width: '300@ms',
    alignSelf: 'center'
  },
  dialogTitle: {
    color: theme.PRIMARY_COLOR
  },
  dialogButton: {
    color: theme.PRIMARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    fontSize: '14@ms0.3'
  },
  buttonDisabled: {
    color: '#AAAAAA',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    fontSize: '14@ms0.3'
  },
  paragraph: {
    fontSize: '14@ms0.3'
  }
});

export default withStore(CheckoutScreen, [
  'id',
  'name',
  'productsInCart',
  'pendingOrders'
]);

CheckoutScreen.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  productsInCart: PropTypes.number,
  pendingOrders: PropTypes.bool
};
