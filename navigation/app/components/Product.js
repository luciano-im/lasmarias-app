import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
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
        <Text>HOLA</Text>
        <view style={styles.imageContainer}>
          <Image style={styles.image} source={image} />
        </view>
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
              <Button style={styles.button}>Ver detalle</Button>
              <Text style={styles.price}>${price}</Text>
            </View>
            <View style={styles.addProductContainer}>
              <Button style={styles.addButton}>Carrito</Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {},
  image: {},
  dataContainer: {},
  nameContainer: {},
  name: {},
  category: {},
  unit: {},
  priceContainer: {},
  priceDetail: {},
  button: {},
  price: {},
  addProductContainer: {},
  addButton: {}
});
