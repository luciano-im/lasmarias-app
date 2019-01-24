import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import CategoryButton from './CategoryButton';

const categoryData = [
  {
    category: 'ofertas',
    label: 'Ofertas',
    image: '../../assets/category/offer-128.png'
  },
  {
    category: 'almacen',
    label: 'Almacen',
    image: '../../assets/category/shop-128.png'
  },
  {
    category: 'congelados',
    label: 'Frescos y Congelados',
    image: '../../assets/category/milk-128.png'
  },
  {
    category: 'bebidas',
    label: 'Bebidas',
    image: '../../assets/category/drink-128.png'
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
              size={80}
              image={category.image}
              label={category.label}
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
    paddingVertical: 20,
    backgroundColor: '#EEE'
  },
  title: {
    paddingHorizontal: 20,
    fontSize: 16
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

{
  /* <IconButton
  icon="local-offer"
  // color={Colors.red500}
  size={50}
  onPress={() => console.log('Pressed')}
/>
<IconButton
  icon="store"
  // color={Colors.red500}
  size={50}
  onPress={() => console.log('Pressed')}
/> */
}
