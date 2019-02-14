import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../../helpers/styles';
import Slider from '../../../components/Slider2';

// //TODO: Receive data and make to work "detail" link
export default class ProductDetailModal extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.modalInner}>
          <IconButton
            icon="close"
            color={theme.PRIMARY_COLOR}
            size={15}
            onPress={this.props.onDismiss}
            style={styles.close}
          />
          <View style={styles.imageContainer}>
            {/* <Image
              style={styles.image}
              source={data.image}
              resizeMode="contain"
            /> */}
            <Slider images={data.gallery} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>
              {data.name.toUpperCase()} {data.brand.toUpperCase()}
            </Text>
            <Text style={styles.category}>{data.category}</Text>
            <Text style={styles.unit}>{data.unit}</Text>
            <View style={styles.priceContainer}>
              <View style={styles.priceDetail}>
                <Text style={styles.price}>${data.price}</Text>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  },
  modalInner: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15
  },
  close: {
    borderWidth: 1.5,
    borderColor: theme.PRIMARY_COLOR,
    width: 25,
    height: 25,
    position: 'absolute',
    right: 10,
    top: 10
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  image: {
    width: 150,
    height: 150
  },
  infoContainer: {},
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
    alignItems: 'center',
    marginTop: 10
  },
  price: {
    fontSize: 28,
    fontWeight: theme.FONT_WEIGHT_BOLD
  },
  addButton: {
    alignItems: 'center',
    marginBottom: 5
  },
  addButtonText: {
    color: theme.PRIMARY_COLOR,
    fontSize: 12,
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  }
});
