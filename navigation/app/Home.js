import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { theme } from '../../helpers/styles';
import SelectCustomer from '../../components/SelectCustomer';
import CategoryFilter from './components/CategoryFilter';
import Product from './components/Product';

const productData = [
  {
    id: 1,
    name: 'Mortadela Chica',
    brand: 'Paladini',
    category: 'Frescos y Congelados',
    price: 55.0,
    unit: '2,5 Kg',
    image: require('../../assets/products/mortadela-225.jpg')
  },
  {
    id: 2,
    name: 'Yerba',
    brand: 'Rosamonte',
    category: 'Almacen',
    price: 89.6,
    unit: '1 Kg',
    image: require('../../assets/products/yerba-225.jpg')
  },
  {
    id: 3,
    name: 'Jugo Naranja Dulce',
    brand: 'Clight',
    category: 'Bebidas',
    price: 38.99,
    unit: 'Caja',
    image: require('../../assets/products/jugo-225.jpg')
  },
  {
    id: 4,
    name: 'Bizcochos Dulces',
    brand: 'Don Satur',
    category: 'Almacen',
    price: 238.25,
    unit: 'Pack',
    image: require('../../assets/products/galletitas-225.jpg')
  },
  {
    id: 5,
    name: 'Queso Port Salut',
    brand: 'La Serenisima',
    category: 'Frescos y Congelados',
    price: 181.75,
    unit: '1 Kg',
    image: require('../../assets/products/queso-225.jpg')
  },
  {
    id: 6,
    name: 'Cerveza',
    brand: 'Stella Artois',
    category: 'Bebidas',
    price: 305.0,
    unit: 'Pack x 6 unidades',
    image: require('../../assets/products/cerveza-225.jpg')
  }
];

//TODO: Add logic and products fetch
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //showError: false
    };
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <Product
      name={item.name.toUpperCase()}
      brand={item.brand.toUpperCase()}
      category={item.category}
      price={item.price}
      unit={item.unit}
      image={item.image}
    />
  );

  render() {
    return (
      <ScrollView style={styles.container}>
        <SelectCustomer
          navigation={this.props.navigation}
          screenProps={this.props.screenProps}
        />
        <CategoryFilter />
        <View style={styles.titleBackground}>
          <Text style={styles.title}>OFERTAS / DESTACADOS</Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            ItemSeparatorComponent={() => (
              <View style={{ height: 6, backgroundColor: '#EEE' }} />
            )}
            data={productData}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleBackground: {
    backgroundColor: theme.PRIMARY_COLOR,
    paddingVertical: 5
  },
  title: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  listContainer: {
    flex: 1
  }
});
