import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { ScaledSheet } from 'react-native-size-matters';
import { API_URL } from 'react-native-dotenv';
import Reactotron from 'reactotron-react-native';

export default class Slider extends Component {
  constructor(props) {
    super(props);
  }

  _isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  render() {
    const { images } = this.props;
    let imageArray = [];
    if (this._isEmpty(images)) {
      imageArray.push(
        <View style={styles.container} key={1}>
          <Image
            style={styles.image}
            source={require('../assets/no-photo.jpg')}
            resizeMode="contain"
          />
        </View>
      );
    } else {
      images.map((uri, i) => {
        const imgURL = API_URL + uri.image;
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
    }

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
