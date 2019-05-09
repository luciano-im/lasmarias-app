import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { format, parse } from 'date-fns';
import { theme } from '../../../helpers/styles';

export default class AccountBalanceTable extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data;
  }

  render() {
    const { accum, data } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={[styles.col1, styles.title]}>COMPROBANTE</Text>
          <Text style={[styles.col2, styles.centerAlign, styles.title]}>
            FECHA
          </Text>
          <Text style={[styles.col3, styles.centerAlign, styles.title]}>
            SALDO
          </Text>
          {/* <Text style={[styles.col4, styles.centerAlign, styles.title]}>
            ACUMULADO
          </Text> */}
        </View>
        {this.props.data.map((item, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.col1}>{item.voucher}</Text>
            <Text style={[styles.col2, styles.centerAlign]}>
              {format(parse(item.date), 'DD/MM/YY')}
            </Text>
            <Text style={[styles.col3, styles.price]}>
              $ {item.balance.toFixed(2)}
            </Text>
            {/* <Text style={[styles.col4, styles.price]}>
              $ {item.accum.toFixed(2)}
            </Text> */}
          </View>
        ))}
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    // flex: 1
  },
  row: {
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
    flex: 0.45,
    fontSize: '14@ms0.3'
    // backgroundColor: '#EEE'
  },
  col2: {
    flex: 0.3,
    fontSize: '14@ms0.3'
    // backgroundColor: '#CCC'
  },
  col3: {
    flex: 0.25,
    textAlign: 'right',
    fontSize: '14@ms0.3'
    // backgroundColor: '#AAA'
  },
  // col4: {
  //   flex: 0.25,
  //   textAlign: 'right'
  // },
  price: {
    color: theme.PRIMARY_COLOR
  }
});
