import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import CategoryButton from './CategoryButton';

//TODO: Add logic and see how to receive category
const categoryData = [
  {
    category: 'ofertas',
    label: 'Ofertas',
    image: require('../../../assets/category/offer-128.png')
  },
  {
    category: 'almacen',
    label: 'Almacen',
    image: require('../../../assets/category/shop-128.png')
  },
  {
    category: 'congelados',
    label: 'Frescos y Congelados',
    image: require('../../../assets/category/milk-128.png')
  },
  {
    category: 'bebidas',
    label: 'Bebidas',
    image: require('../../../assets/category/drink-128.png')
  }
];

export default class CategoryFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>¿QUE ESTAS BUSCANDO?</Text>
        <View style={styles.categoryContainer}>
          {categoryData.map((category, index) => (
            <CategoryButton
              backgroundColor={'#FFF'}
              borderColor={'#AAA'}
              elevation={2}
              size={70}
              image={category.image}
              label={category.label}
              key={index}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingVertical: 12,
    backgroundColor: '#EEE'
  },
  title: {
    paddingHorizontal: 20,
    marginBottom: 10,
    fontSize: 16,
    color: 'grey'
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
