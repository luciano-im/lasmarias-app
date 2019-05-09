import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { ScaledSheet } from 'react-native-size-matters';
import { theme } from '../../helpers/styles';
import OrderDetailProductsTable from './components/OrderDetailProductsTable';

const orderData = {
  id: 180,
  date: '2018-10-17',
  customer: 'La Biela',
  seller: 'La Biela',
  state: 'FINALIZADO',
  payMethod: 'Efectivo',
  deliveryMethod: 'Envío a Domicilio',
  productData: [
    {
      id: 1,
      name: 'Mortadela Chica',
      brand: 'Paladini',
      category: 'Frescos y Congelados',
      price: 55.0,
      unit: '2,5 Kg',
      quantity: 5
    },
    {
      id: 2,
      name: 'Yerba',
      brand: 'Rosamonte',
      category: 'Almacen',
      price: 89.6,
      unit: '1 Kg',
      quantity: 3
    }
  ]
};

export default class OrderDetailScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.seller}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="person" size={25} color="white" />
            <Text style={{ color: 'white', marginLeft: 15, fontSize: 16 }}>
              {orderData.customer}
            </Text>
          </View>
          <View>
            <MaterialIcons name="assignment" size={25} color="white" />
          </View>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>DETALLE DE PEDIDO</Text>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Pedido Nº: 000128</Text>
            <Text style={styles.headerText}>Fecha: 17/10/18</Text>
          </View>
          <View style={[styles.header, { marginTop: 10, marginBottom: 20 }]}>
            <Text style={styles.headerText}>
              Estado:{' '}
              <Text style={{ color: theme.PRIMARY_COLOR }}>FINALIZADO</Text>
            </Text>
          </View>
          <View style={styles.productList}>
            <OrderDetailProductsTable data={orderData.productData} />
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
              <View style={styles.payIcon}>
                <MaterialIcons name="credit-card" size={24} color="grey" />
              </View>
              <View style={styles.payData}>
                <Text style={styles.payTitle}>Forma de Pago</Text>
                <Text style={styles.payText}>{orderData.payMethod}</Text>
              </View>
            </View>
            <View style={styles.deliveryMethod}>
              <View style={styles.payIcon}>
                <MaterialIcons name="local-shipping" size={24} color="grey" />
              </View>
              <View style={styles.payData}>
                <Text style={styles.payTitle}>Forma de Entrega / Retiro</Text>
                <Text style={styles.payText}>{orderData.deliveryMethod}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.backButtonContainer}>
          <Button
            mode="contained"
            style={styles.backButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text
              style={styles.backButtonText}
              theme={{
                colors: {
                  text: '#FFFFFF'
                }
              }}
            >
              VOLVER
            </Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  seller: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '10@ms0.3',
    paddingHorizontal: '10@ms0.3',
    marginTop: '5@ms0.3',
    backgroundColor: theme.ACCENT_COLOR
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
    borderBottomWidth: 1
  },
  headerText: {
    fontSize: '16@ms0.3',
    fontWeight: 'bold'
  },
  productList: {
    marginBottom: '25@ms0.3'
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '30@ms0.3',
    paddingHorizontal: '16@ms0.3'
  },
  payIcon: {
    marginRight: '24@ms0.3'
  },
  payTitle: {
    fontSize: '16@ms0.3'
  },
  payText: {
    color: 'grey'
  },
  deliveryMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20@ms0.3',
    marginBottom: '20@ms0.3',
    paddingHorizontal: '16@ms0.3'
  },
  backButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  backButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: '50@ms0.3'
  },
  backButtonText: {
    fontSize: '16@ms0.3'
  }
});
