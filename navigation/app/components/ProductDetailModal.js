import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, IconButton, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { theme } from '../../../helpers/styles';
import { getProductImages } from '../../../helpers/api';
import Slider from '../../../components/ImageSlider';
import Reactotron from 'reactotron-react-native';
import PropTypes from 'prop-types';

export default class ProductDetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  _addToCart = product => {
    this.props.addToCart(product);
  };

  async componentDidMount() {
    const { product_id } = this.props.data;
    const images = await getProductImages(product_id);

    this.setState({
      images: images
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.data !== this.props.data ||
      nextState.images !== this.state.images
    );
  }

  render() {
    const { data } = this.props;
    const offer = data.offer === 0 ? true : false;
    const offerPrice = data.offer_price.toFixed(2);

    const images = Array.from(this.state.images);

    return (
      <View style={styles.container}>
        <View style={styles.modalInner}>
          <IconButton
            icon="close"
            color={theme.PRIMARY_COLOR}
            size={moderateScale(15, 0.3)}
            onPress={this.props.onDismiss}
            style={styles.close}
          />
          <View style={styles.imageContainer}>
            <Slider images={images} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>
              {data.name.toUpperCase()} {data.brand.toUpperCase()}
            </Text>
            <Text style={styles.unit}>{data.package}</Text>
            <Text style={styles.category}>{data.product_line}</Text>
            <View style={styles.priceContainer}>
              <View style={styles.priceDetail}>
                {offer && <Text style={styles.prevPrice}>${offerPrice}</Text>}
                <Text style={styles.price}>${data.price.toFixed(2)}</Text>
              </View>
              <View style={styles.addProductContainer}>
                <TouchableOpacity
                  onPress={() => this._addToCart(data)}
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
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    marginHorizontal: '10@ms0.3',
    overflow: 'hidden'
  },
  modalInner: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: '15@ms0.3'
  },
  close: {
    borderWidth: 1.5,
    borderColor: theme.PRIMARY_COLOR,
    width: '25@ms0.3',
    height: '25@ms0.3',
    position: 'absolute',
    right: '10@ms0.3',
    top: '10@ms0.3',
    zIndex: 2
  },
  imageContainer: {
    alignItems: 'center'
  },
  image: {
    width: '150@ms0.3',
    height: '150@ms0.3'
  },
  infoContainer: {},
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
    alignItems: 'center',
    marginTop: '10@ms0.3'
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
  addButton: {
    alignItems: 'center',
    marginBottom: '5@ms0.3'
  },
  addButtonText: {
    color: theme.PRIMARY_COLOR,
    fontSize: '13@ms0.3',
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  }
});

ProductDetailModal.propTypes = {
  data: PropTypes.object,
  onDismiss: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired
};
