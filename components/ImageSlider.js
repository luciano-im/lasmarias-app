import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { ScaledSheet } from 'react-native-size-matters';
import { api } from '../helpers/api';
import Reactotron from 'reactotron-react-native';

export default class Slider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { images } = this.props;

    Reactotron.log(images);

    let imageArray = [];

    images.map((uri, i) => {
      const imgURL = api + uri.image;
      imageArray.push(
        <View style={styles.container} key={i}>
          <Image
            source={{
              uri: imgURL
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      );
    });

    return (
      <View style={styles.sliderContainer}>
        <Swiper height={200}>{imageArray}</Swiper>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  sliderContainer: {
    height: '250@ms0.3',
    width: '100%',
    padding: '5@ms0.3',
    overflow: 'hidden'
  },
  image: {
    height: '180@ms0.3',
    width: '100%',
    alignSelf: 'center'
  }
});
