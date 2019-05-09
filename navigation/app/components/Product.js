import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { theme } from '../../../helpers/styles';
import {
  api,
  _addProductToOrder,
  getProductImages
} from '../../../helpers/api';
import Reactotron from 'reactotron-react-native';

export default class Product extends React.Component {
  _isMounted = false;

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
    this._isMounted = true;

    const { product_id } = this.props.item;
    const images = await getProductImages(product_id);
    if (this._isMounted) {
      this.setState({
        images: images
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const name = this.props.name;
    const brand = this.props.brand;
    const productLine = this.props.productLine;
    const price = this.props.price.toFixed(2);
    const unit = this.props.unit;
    const packaging = this.props.packaging;
    const offer = this.props.item.offer === 0 ? true : false;
    const offerPrice = this.props.item.offer_price.toFixed(2);

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
        <ActivityIndicator
          color={theme.PRIMARY_COLOR}
          size={moderateScale(25, 0.3)}
        />
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
              <Text />
              {offer && <Text style={styles.prevPrice}>${offerPrice}</Text>}
              <Text style={styles.price}>${price}</Text>
            </View>
            <View style={styles.addProductContainer}>
              <TouchableOpacity
                onPress={() => this._addToCart(this.props.item)}
                style={styles.addButton}
              >
                <MaterialIcons
                  name="shopping-cart"
                  size={moderateScale(32, 0.3)}
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

styles = ScaledSheet.create({
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
    padding: '10@ms0.3'
  },
  nameContainer: {},
  name: {
    fontSize: '16@ms0.3'
  },
  category: {
    color: '#CCC',
    fontSize: '14@ms0.3'
  },
  unit: {
    color: '#CCC',
    fontSize: '14@ms0.3'
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: '20@ms0.3'
  },
  priceDetail: {},
  button: {
    paddingVertical: '3@ms0.3',
    paddingHorizontal: '8@ms0.3',
    backgroundColor: theme.PRIMARY_COLOR,
    alignItems: 'center',
    width: '100@ms0.3'
  },
  buttonText: {
    color: '#FFF',
    fontSize: '14@ms0.3'
  },
  price: {
    fontSize: '28@ms0.3',
    fontWeight: theme.FONT_WEIGHT_BOLD
  },
  prevPrice: {
    color: 'grey',
    fontSize: '18@ms0.3',
    fontWeight: theme.FONT_WEIGHT_BOLD,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  addProductContainer: {},
  addButton: {
    alignItems: 'center',
    marginRight: '5@ms0.3',
    marginBottom: '5@ms0.3'
  },
  addButtonText: {
    color: theme.PRIMARY_COLOR,
    fontSize: '13@ms0.3',
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  }
});
