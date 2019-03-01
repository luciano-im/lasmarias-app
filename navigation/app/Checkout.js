import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TouchableRipple } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../helpers/styles';
import SelectCustomer from '../../components/SelectCustomer';
import CheckoutProductsTable from './components/CheckoutProductsTable';
import PayMethod from './components/PayMethod';

export default class CheckoutScreen extends React.Component {
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
            <Text style={styles.headerText}>Pedido Nº: 000128</Text>
            <Text style={styles.headerText}>Fecha: 17/10/18</Text>
          </View>
          <View>{/* <CheckoutProductsTable /> */}</View>
          <View style={styles.addProductsButtonContainer}>
            <TouchableRipple
              borderless
              onPress={() => console.log('Click')}
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
            <View>
              <PayMethod />
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
    paddingHorizontal: 10
  },
  header: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  addProductsButtonContainer: {
    flex: 1,
    backgroundColor: theme.ACCENT_COLOR,
    margin: 20,
    marginTop: 30
    //width: 280
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
  totalsContainer: {},
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
  }
});
