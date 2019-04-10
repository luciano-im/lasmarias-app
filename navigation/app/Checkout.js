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
import { NavigationEvents } from 'react-navigation';
import { format, parse } from 'date-fns';
import { theme } from '../../helpers/styles';
import {
  _getOrder,
  _setOrder,
  _removeOrder,
  createOrder
} from '../../helpers/api';
import SelectCustomer from '../../components/SelectCustomer';
import CheckoutProductsTable from './components/CheckoutProductsTable';
import PayMethod from './components/PayMethod';
import DeliveryMethod from './components/DeliveryMethod';
import Reactotron from 'reactotron-react-native';

export default class CheckoutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
      delivery: null,
      inputs: null,
      subtotal: 0.0,
      snackVisible: false,
      snackText: '',
      confirmVisible: false,
      animating: false,
      firstStep: true,
      secondStep: false,
      errorStep: false,
      errorText: null,
      buttonDisabled: true
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
  };

  _setDeliveryMethod = val => {
    this.setState({
      delivery: val
    });
  };

  _processCheckout = async () => {
    this.setState({
      firstStep: false,
      secondStep: true
    });

    // Actualizo los productos guardados en AS
    await this._onBlurScreen();

    const { inputs, products, delivery } = this.state;
    Reactotron.log(inputs);
    const customer = this.props.screenProps.id;

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
        const items = products.map(item => {
          return {
            product_id: item.id,
            price: item.item.price,
            quantity: inputs['input' + item.id]
          };
        });
        const data = {
          status: 'Recibido',
          date: format(parse(new Date()), 'YYYY-MM-DD'),
          discount: 0,
          payment: 'Cheque',
          shipping: 'ENV',
          items: [...items]
        };

        const result = await createOrder(data, customer);
        Reactotron.log(result);
        if (result.error === false) {
          this.setState({
            confirmVisible: false
          });
          await _removeOrder();
          this.props.screenProps.setProductsInCart(0);
          this.props.navigation.navigate('CheckoutOk', {
            order: result.order
          });
        } else {
          this.setState({
            errorStep: true,
            errorText: result.msg,
            buttonDisabled: false
          });
          Reactotron.log('Guardar Pedido en AsyncStorage');
          await _removeOrder();
          this.props.screenProps.setProductsInCart(0);
          this.props.navigation.navigate('Home');
        }
      }
    }
  };

  _onCheckout = () => {
    this.setState({
      confirmVisible: true,
      firstStep: true,
      secondStep: false,
      errorStep: false,
      errorText: ''
    });
  };

  _onBlurScreen = async () => {
    if (this.state.errorText === null) {
      const customer = this.props.screenProps.id;
      // If customer is null = Remove customer button pressed
      if (customer !== null) {
        let { products } = this.state;
        const updatedProducts = products.map(item => {
          return { ...item, qty: this.state.inputs['input' + item.id] };
        });
        await _setOrder(updatedProducts);
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

  render() {
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
          {this.state.snackText}
        </Snackbar>
        <ScrollView style={styles.container}>
          <NavigationEvents onWillBlur={payload => this._onBlurScreen()} />
          <SelectCustomer
            navigation={this.props.navigation}
            screenProps={this.props.screenProps}
          />
          <View style={styles.title}>
            <Text style={styles.titleText}>CARRITO DE PEDIDO</Text>
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Pedido Nº: XXXXXX</Text>
              <Text style={styles.headerText}>
                Fecha: {format(parse(new Date()), 'DD/MM/YY')}
              </Text>
            </View>
            <View style={styles.productList}>
              <CheckoutProductsTable
                products={this.state.products}
                inputs={this.state.inputs}
                onUpdateInput={this._updateInputText}
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
                <Text style={{ color: '#AAA' }}>
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
            </View>
          </View>
        </ScrollView>
        <Portal>
          <Dialog
            visible={this.state.confirmVisible}
            dismissable={false}
            onDismiss={this._cancelConfirm}
          >
            <Dialog.Title style={styles.dialogTitle}>ATENCION!</Dialog.Title>
            {firstStep && (
              <Dialog.Content>
                <Paragraph>¿Desea confirmar el pedido?</Paragraph>
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
                  <Text>Confirmando pedido...</Text>
                </View>
              </Dialog.Content>
            )}
            {errorStep && (
              <Dialog.Content>
                <Paragraph>{this.state.errorText}</Paragraph>
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
                  onPress={this._cancelConfirm}
                  disabled={this.state.buttonDisabled}
                >
                  <Text
                    style={
                      this.state.buttonDisabled
                        ? styles.buttonDisabled
                        : styles.button
                    }
                  >
                    OK
                  </Text>
                </Button>
              </Dialog.Actions>
            )}
          </Dialog>
        </Portal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    marginVertical: 5,
    paddingVertical: 3,
    alignItems: 'center',
    backgroundColor: theme.PRIMARY_COLOR
  },
  titleText: {
    fontSize: 19,
    color: 'white'
  },
  dataContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20
  },
  header: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    marginBottom: 20
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  productList: {
    marginBottom: 25
  },
  addProductsButtonContainer: {
    flex: 1,
    backgroundColor: theme.ACCENT_COLOR,
    marginHorizontal: 20,
    marginVertical: 5
  },
  addProductsButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  addProductsButtonIcon: {
    marginRight: 10
  },
  addProductsButtonText: {
    fontSize: 18
  },
  totalsContainer: {
    marginTop: 20
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderBottomColor: '#CCC',
    borderBottomWidth: 1
  },
  totalText: {
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    fontSize: 17
  },
  totalRed: {
    color: 'red'
  },
  legend: {
    marginTop: 20
  },
  payMethod: {
    marginTop: 20
  },
  deliveryMethod: {
    marginTop: 5,
    marginBottom: 20
  },
  dialogTitle: {
    color: theme.PRIMARY_COLOR
  },
  dialogButton: {
    color: theme.PRIMARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  }
});
