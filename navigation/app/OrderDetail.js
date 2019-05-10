import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { format, parse } from 'date-fns';
import { theme } from '../../helpers/styles';
import OrderDetailProductsTable from './components/OrderDetailProductsTable';

export default class OrderDetailScreen extends React.Component {
  render() {
    const type = this.props.navigation.getParam('type');
    const data = this.props.navigation.getParam('data');

    const voucher = type === 'F' ? 'Factura' : 'Pedido';

    const subtotal = data.get_total - data.iva - data.taxes;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.seller}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons
              name="person"
              size={moderateScale(25, 0.3)}
              color="white"
            />
            <Text
              style={{
                color: 'white',
                marginLeft: moderateScale(15, 0.3),
                fontSize: moderateScale(16, 0.3)
              }}
            >
              {data.customer_name}
            </Text>
          </View>
          <View>
            <MaterialIcons
              name="assignment"
              size={moderateScale(25, 0.3)}
              color="white"
            />
          </View>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>DETALLE DE PEDIDO</Text>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              {voucher} Nº: {data.invoice_id}
            </Text>
            <Text style={styles.headerText}>
              Fecha: {format(parse(data.date), 'DD/MM/YY')}
            </Text>
          </View>
          {/* <View style={[styles.header, { marginTop: moderateScale(10, 0.3), marginBottom: moderateScale(20, 0.3) }]}>
            <Text style={styles.headerText}>
              Estado:{' '}
              <Text style={{ color: theme.PRIMARY_COLOR }}>FINALIZADO</Text>
            </Text>
          </View> */}
          <View style={styles.productList}>
            <OrderDetailProductsTable products={data.items} />
          </View>
          <View style={styles.totalsContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Subtotal:</Text>
              <Text style={styles.totalText}>$ {subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>IVA (21%):</Text>
              <Text style={styles.totalText}>$ {data.iva.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Percepciones:</Text>
              <Text style={styles.totalText}>$ {data.taxes.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={[styles.totalText, styles.totalRed]}>
                DESCUENTO:
              </Text>
              <Text style={[styles.totalText, styles.totalRed]}>$ 0,00</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalText}>(*) TOTAL:</Text>
              <Text style={styles.totalText}>
                $ {data.get_total.toFixed(2)}
              </Text>
            </View>
            <View style={styles.legend}>
              <Text style={{ color: '#AAA', fontSize: moderateScale(14, 0.3) }}>
                (*) Los importes quedarán sujetos al valor final de facturación
                debido a la merma en el peso. Cuando el pedido pase al estado de
                <Text style={{ color: '#555' }}> Pedido Preparado </Text>
                se actualizarán los valores finales tanto en el pedido como en
                el <Text style={{ color: '#555' }}>Estado de Cuenta</Text>
              </Text>
            </View>
            {/* <View style={styles.payMethod}>
              <View style={styles.payIcon}>
                <MaterialIcons name="credit-card" size={moderateScale(24, 0.3)} color="grey" />
              </View>
              <View style={styles.payData}>
                <Text style={styles.payTitle}>Forma de Pago</Text>
                <Text style={styles.payText}>{orderData.payMethod}</Text>
              </View>
            </View>
            <View style={styles.deliveryMethod}>
              <View style={styles.payIcon}>
                <MaterialIcons name="local-shipping" size={moderateScale(24, 0.3)} color="grey" />
              </View>
              <View style={styles.payData}>
                <Text style={styles.payTitle}>Forma de Entrega / Retiro</Text>
                <Text style={styles.payText}>{orderData.deliveryMethod}</Text>
              </View>
            </View> */}
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
    fontSize: '15@ms0.3',
    fontWeight: 'bold'
  },
  productList: {
    marginTop: '10@ms0.3',
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
