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
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const Slide = props => {
  <View style={styles.container}>
    <Image source={props.uri} style={styles.image} />
  </View>;
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center'
  },
  image: {
    // flex: 1,
    width
  }
});

export default class Slider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { images } = this.props;

    return (
      <View>
        <Swiper autoplay height={200}>
          {images.map((item, i) => {
            <Slide uri={item} key={i} />;
          })}
        </Swiper>
      </View>
    );
  }
}
