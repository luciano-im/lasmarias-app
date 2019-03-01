import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DataTable, IconButton } from 'react-native-paper';
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
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Producto</DataTable.Title>
            <DataTable.Title numeric>Cantidad</DataTable.Title>
            <DataTable.Title numeric>Importe</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>Hola</DataTable.Cell>
            <DataTable.Cell>
              <IconButton
                icon="add-circle-outline"
                color={theme.PRIMARY_COLOR}
                size={20}
                onPress={() => console.log('Pressed')}
              />
            </DataTable.Cell>
            <DataTable.Cell numeric>6.0</DataTable.Cell>
          </DataTable.Row>
          {productData.map(product => {
            <DataTable.Row>
              <DataTable.Cell>{product.name}</DataTable.Cell>
              <DataTable.Cell>
                {/* <IconButton
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
                /> */}
                5.0
              </DataTable.Cell>
              <DataTable.Cell numeric>6.0</DataTable.Cell>
            </DataTable.Row>;
          })}
        </DataTable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
