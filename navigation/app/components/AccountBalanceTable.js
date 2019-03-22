import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../../../helpers/styles';

export default class AccountBalanceTable extends React.Component {
  // constructor(props) {
  //   super(props);

  //   let myState = {};
  //   this.props.data.map(item => {
  //     const key = 'input' + item.id;
  //     myState[key] = 1;
  //   });
  //   this.state = myState;
  // }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={[styles.col1, styles.title]}>Comprobante</Text>
          <Text style={[styles.col2, styles.centerAlign, styles.title]}>
            Fecha
          </Text>
          <Text style={[styles.col3, styles.centerAlign, styles.title]}>
            Saldo
          </Text>
          <Text style={[styles.col3, styles.centerAlign, styles.title]}>
            Acumulado
          </Text>
        </View>
        {this.props.data.map((item, index) => (
          <View style={styles.row}>
            <Text style={styles.col1}>{item.voucher}</Text>
            <Text style={[styles.col2, styles.centerAlign]}>{item.date}</Text>
            <Text style={[styles.col3, styles.price]}>$ {item.balance}</Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    paddingVertical: 5
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
    flex: 0.45
    // backgroundColor: '#EEE'
  },
  col2: {
    flex: 0.3
    // backgroundColor: '#CCC'
  },
  col3: {
    flex: 0.25,
    textAlign: 'right'
    // backgroundColor: '#AAA'
  },
  price: {
    color: theme.PRIMARY_COLOR
  }
});
