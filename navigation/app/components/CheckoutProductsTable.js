import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
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
  constructor(props) {
    super(props);

    let myState = {};
    productData.map(item => {
      const key = 'input' + item.id;
      myState[key] = 1;
    });
    this.state = myState;
  }

  _addQuantity = input => {
    this.setState(prevState => {
      return { [input]: parseInt(prevState[input]) + 1 };
    });
  };

  _subQuantity = input => {
    this.setState(prevState => {
      return { [input]: parseInt(prevState[input]) - 1 };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.col1}>Producto</Text>
          <Text style={[styles.col2, styles.centerAlign]}>Cantidad</Text>
          <Text style={[styles.col3, styles.centerAlign]}>Importe</Text>
        </View>
        {productData.map((item, index) => (
          <View style={styles.row}>
            <Text style={styles.col1}>{item.name}</Text>
            <View style={[styles.col2, styles.controls]}>
              <IconButton
                style={styles.quantityButton}
                icon="remove-circle-outline"
                color={theme.PRIMARY_COLOR}
                size={20}
                onPress={() => this._subQuantity('input' + item.id)}
              />
              <TextInput
                style={styles.quantityInput}
                keyboardType="numeric"
                value={this.state['input' + item.id].toString()}
                onChangeText={text =>
                  this.setState({
                    ['input' + item.id]: text
                  })
                }
              />
              <IconButton
                style={styles.quantityButton}
                icon="add-circle-outline"
                color={theme.PRIMARY_COLOR}
                size={20}
                onPress={() => this._addQuantity('input' + item.id)}
              />
            </View>
            <Text style={[styles.col3, styles.price]}>$ 110.262,50</Text>
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
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityButton: {
    margin: 0,
    height: 22,
    width: 22
  },
  quantityInput: {
    borderColor: '#CCC',
    borderWidth: 1,
    backgroundColor: '#FFF',
    textAlign: 'center',
    width: 35,
    paddingHorizontal: 5,
    marginHorizontal: 5
  },
  price: {
    color: theme.PRIMARY_COLOR
  }
});
