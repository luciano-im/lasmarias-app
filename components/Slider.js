import React, { Component } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  FlatList,
  Text,
  Animated,
  ScrollView
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const FIXED_BAR_WIDTH = 280;
const BAR_SPACE = 10;

export default class Slider extends Component {
  constructor(props) {
    super(props);
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item }) => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        padding: 5,
        backgroundColor: '#AAAAAA'
      }}
    >
      <Image source={item} resizeMode="contain" />
    </View>
  );

  render() {
    const { images } = this.props;
    numItems = images.length;
    itemWidth =
      FIXED_BAR_WIDTH / this.numItems - (this.numItems - 1) * BAR_SPACE;
    animVal = new Animated.Value(0);

    return (
      <FlatList
        data={images}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        horizontal={true}
        style={{ width: '100%' }}
      />
    );
  }
}
