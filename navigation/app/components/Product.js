import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../../helpers/styles';
import {
  api,
  _addProductToOrder,
  getProductImages
} from '../../../helpers/api';
import Reactotron from 'reactotron-react-native';

//TODO: Receive data and make to work "add" link
export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  _isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  _addToCart = product => {
    this.props.addToCart(product);
  };

  async componentDidMount() {
    const { product_id } = this.props.item;
    const images = await getProductImages(product_id);

    this.setState({
      images: images
    });
  }

  render() {
    const name = this.props.name;
    const brand = this.props.brand;
    const productLine = this.props.productLine;
    const price = this.props.price.toFixed(2);
    const unit = this.props.unit;
    const packaging = this.props.packaging;

    const images = Array.from(this.state.images);
    const imagesEmpty = this._isEmpty(images);

    let imageComponent;
    if (!imagesEmpty) {
      const imgURL = api + Array.from(this.state.images)[0].image;
      imageComponent = (
        <Image
          style={styles.image}
          source={{ uri: imgURL }}
          resizeMode="contain"
        />
      );
    } else {
      imageComponent = (
        <ActivityIndicator color={theme.PRIMARY_COLOR} size={25} />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>{imageComponent}</View>
        <View style={styles.dataContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {name} {brand}
            </Text>
            {/* <Text style={styles.unit}>{unit}</Text> */}
            <Text style={styles.unit}>{packaging}</Text>
            <Text style={styles.category}>{productLine}</Text>
          </View>
          <View style={styles.priceContainer}>
            <View style={styles.priceDetail}>
              <TouchableOpacity
                onPress={() => this.props.showModal(this.props.item)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Ver detalle</Text>
              </TouchableOpacity>
              <Text style={styles.price}>${price}</Text>
            </View>
            <View style={styles.addProductContainer}>
              <TouchableOpacity
                onPress={() => this._addToCart(this.props.item)}
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
    flex: 1,
    justifyContent: 'center'
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
