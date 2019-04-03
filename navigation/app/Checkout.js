import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TouchableRipple } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { format, parse } from 'date-fns';
import { theme } from '../../helpers/styles';
import { _getOrder } from '../../helpers/api';
import SelectCustomer from '../../components/SelectCustomer';
import CheckoutProductsTable from './components/CheckoutProductsTable';
import PayMethod from './components/PayMethod';
import DeliveryMethod from './components/DeliveryMethod';
import Reactotron from 'reactotron-react-native';

//TODO: Add checkout logic
export default class CheckoutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null
    };
  }

  async componentWillMount() {
    const products = await _getOrder();
    Reactotron.log('Productos:', products);
    if (products !== null) {
      this.setState({
        products: products
      });
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
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
            <CheckoutProductsTable products={this.state.products} />
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
              <Text style={styles.totalText}>$1.515,00</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>IVA (21%):</Text>
              <Text style={styles.totalText}>$318,15</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={[styles.totalText, styles.totalRed]}>
                DESCUENTO:
              </Text>
              <Text style={[styles.totalText, styles.totalRed]}>$15,15</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>(*) TOTAL:</Text>
              <Text style={styles.totalText}>$1.818,00</Text>
            </View>
            <View style={styles.legend}>
              <Text style={{ color: '#AAA' }}>
                (*) Los importes quedarán sujetos al valor final de facturación
                debido a la merma en el peso. Cuando el pedido pase al estado de
                <Text style={{ color: '#555' }}> Pedido Preparado </Text>
                se actualizarán los valores finales tanto en el pedido como en
                el <Text style={{ color: '#555' }}>Estado de Cuenta</Text>
              </Text>
            </View>
            <View style={styles.payMethod}>
              <PayMethod />
            </View>
            <View style={styles.deliveryMethod}>
              <DeliveryMethod />
            </View>
            <View style={styles.addProductsButtonContainer}>
              <TouchableRipple
                borderless
                onPress={() => this.props.navigation.navigate('CheckoutOk')}
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
  }
});
