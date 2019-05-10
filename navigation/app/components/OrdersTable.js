import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { format, parse } from 'date-fns';
import { theme } from '../../../helpers/styles';

export default class OrdersTable extends React.Component {
  render() {
    const { orders } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={[styles.col1, styles.centerAlign, styles.title]}>
            FECHA
          </Text>
          <Text style={[styles.col2, styles.centerAlign, styles.title]}>
            Nº
          </Text>
          <Text style={[styles.col3, styles.title]}>CLIENTE</Text>
          {/* <Text style={[styles.col4, styles.centerAlign, styles.title]}>
            SOLICITANTE
          </Text> */}
          <Text style={[styles.col4, styles.centerAlign, styles.title]}>
            IMPORTE
          </Text>
        </View>
        {orders.map((item, index) => (
          <View style={styles.row} key={item.invoice_id}>
            <Text style={[styles.col1, styles.centerAlign]}>
              {format(parse(item.date), 'DD/MM/YY')}
            </Text>
            <TouchableOpacity
              style={styles.col2}
              onPress={() =>
                this.props.navigation.navigate('OrderDetail', {
                  type: 'F',
                  data: item
                })
              }
            >
              <Text
                style={[
                  styles.centerAlign,
                  {
                    color: theme.PRIMARY_COLOR,
                    fontSize: moderateScale(14, 0.3)
                  }
                ]}
              >
                {item.invoice_id}
              </Text>
            </TouchableOpacity>
            <Text style={styles.col3}>{item.customer_name}</Text>
            <Text style={[styles.col4, styles.rightAlign]}>
              $ {item.get_total.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    paddingVertical: '5@ms0.3'
  },
  title: {
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  centerAlign: {
    textAlign: 'center'
  },
  rightAlign: {
    textAlign: 'right'
  },
  col1: {
    flex: 0.2,
    fontSize: '14@ms0.3'
    // backgroundColor: '#EEE'
  },
  col2: {
    flex: 0.2,
    fontSize: '14@ms0.3'
    // backgroundColor: '#CCC'
  },
  col3: {
    flex: 0.35,
    fontSize: '14@ms0.3'
    // backgroundColor: '#AAA'
  },
  col4: {
    flex: 0.25,
    fontSize: '14@ms0.3'
    // backgroundColor: '#999'
  }
});
