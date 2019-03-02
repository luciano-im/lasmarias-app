import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DataTable, IconButton, Text } from 'react-native-paper';
import { theme } from '../../../helpers/styles';

const productData = [
  {
    id: 1,
    name: 'Mortadela Chica',
    brand: 'Paladini',
    category: 'Frescos y Congelados',
    price: 55.0,
    unit: '2,5 Kg'
  },
  {
    id: 2,
    name: 'Yerba',
    brand: 'Rosamonte',
    category: 'Almacen',
    price: 89.6,
    unit: '1 Kg'
  }
];

export default class CheckoutProductsTable extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.col1}>Producto</Text>
          <Text style={[styles.col2, styles.centerAlign]}>Cantidad</Text>
          <Text style={[styles.col3, styles.centerAlign]}>Importe</Text>
        </View>
        {/* <DataTable>
          <DataTable.Header>
            <DataTable.Title>Producto</DataTable.Title>
            <DataTable.Title numeric>Cantidad</DataTable.Title>
            <DataTable.Title numeric>Importe</DataTable.Title>
          </DataTable.Header>
          {productData.map(product => {
            <DataTable.Row>
              <DataTable.Cell>{product.name}</DataTable.Cell>
              <DataTable.Cell>
                <IconButton
                  icon="add-circle-outline"
                  color={theme.PRIMARY_COLOR}
                  size={20}
                  onPress={() => console.log('Pressed')}
                />
                <IconButton
                  icon="remove-circle-outline"
                  color={theme.PRIMARY_COLOR}
                  size={20}
                  onPress={() => console.log('Pressed')}
                />
              </DataTable.Cell>
              <DataTable.Cell numeric>6.0</DataTable.Cell>
            </DataTable.Row>;
          })}
        </DataTable> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1
  },
  centerAlign: {
    textAlign: 'center'
  },
  rightAlign: {
    textAlign: 'right'
  },
  col1: {
    flex: 0.5
  },
  col2: {
    flex: 0.3
  },
  col3: {
    flex: 0.2,
    textAlign: 'right'
  }
});
