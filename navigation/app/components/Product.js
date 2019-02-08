import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../../helpers/styles';

//TODO: Receive data and make to work "detail" link
export default class Product extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {};
  }

  render() {
    const name = this.props.name;
    const brand = this.props.brand;
    const category = this.props.category;
    const price = this.props.price;
    const unit = this.props.unit;
    const image = this.props.image;

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={image} resizeMode="contain" />
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {name} {brand}
            </Text>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.unit}>{unit}</Text>
          </View>
          <View style={styles.priceContainer}>
            <View style={styles.priceDetail}>
              <TouchableOpacity
                onPress={() => this.props.onPress(this.props.item)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Ver detalle</Text>
              </TouchableOpacity>
              <Text style={styles.price}>${price}</Text>
            </View>
            <View style={styles.addProductContainer}>
              <TouchableOpacity
                onPress={() => console.log('click')}
                style={styles.addButton}
              >
                <MaterialIcons
                  name="shopping-cart"
                  size={32}
                  color={theme.PRIMARY_COLOR}
                />
                <Text style={styles.addButtonText}>AGREGAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  dataContainer: {
    flex: 2,
    flexDirection: 'column',
    padding: 10
  },
  nameContainer: {},
  name: {
    fontSize: 16
  },
  category: {
    color: '#CCC'
  },
  unit: {
    color: '#CCC'
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20
  },
  priceDetail: {},
  button: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: theme.PRIMARY_COLOR,
    alignItems: 'center',
    width: 100
  },
  buttonText: {
    color: '#FFF'
  },
  price: {
    fontSize: 28,
    fontWeight: theme.FONT_WEIGHT_BOLD
  },
  addProductContainer: {},
  addButton: {
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 5
  },
  addButtonText: {
    color: theme.PRIMARY_COLOR,
    fontSize: 12,
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  }
});
