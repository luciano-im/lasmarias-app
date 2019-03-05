import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { theme } from '../../../helpers/styles';
import { format, parse } from 'date-fns';

const ordersData = [
  {
    id: 180,
    date: '2018-10-17',
    customer: 'La Biela',
    seller: 'La Biela'
  },
  {
    id: 179,
    date: '2018-10-17',
    customer: 'Parrilla Fernandez',
    seller: 'Vendedor 01'
  },
  {
    id: 178,
    date: '2018-10-17',
    customer: 'El Sol',
    seller: 'El Sol'
  },
  {
    id: 177,
    date: '2018-10-17',
    customer: 'La Biela',
    seller: 'Vendedor 05'
  }
];

//TODO: Add checkout logic
export default class OrdersTable extends React.Component {
  render() {
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
          <Text style={[styles.col4, styles.centerAlign, styles.title]}>
            SOLICITANTE
          </Text>
        </View>
        {ordersData.map((item, index) => (
          <View style={styles.row}>
            <Text style={[styles.col1, styles.centerAlign]}>
              {format(parse(item.date), 'DD/MM/YY')}
            </Text>
            <Text style={[styles.col2, styles.centerAlign]}>{item.id}</Text>
            <Text style={styles.col3}>{item.customer}</Text>
            <Text style={[styles.col4, styles.rightAlign]}>{item.seller}</Text>
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
    flex: 0.2
    // backgroundColor: '#EEE'
  },
  col2: {
    flex: 0.2
    // backgroundColor: '#CCC'
  },
  col3: {
    flex: 0.25
    // backgroundColor: '#AAA'
  },
  col4: {
    flex: 0.35
    // backgroundColor: '#999'
  }
});
