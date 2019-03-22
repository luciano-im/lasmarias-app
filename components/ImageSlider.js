import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import Reactotron from 'reactotron-react-native';

export default class Slider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { images } = this.props;

    let imageArray = [];

    images.map((uri, i) => {
      Reactotron.log(uri.image);
      imageArray.push(
        <View style={styles.container} key={i}>
          <Image
            source={{ uri: uri.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      );
    });

    return (
      <View
        style={{
          height: 250,
          width: '100%',
          // backgroundColor: '#AAAAAA',
          padding: 5,
          overflow: 'hidden'
        }}
      >
        <Swiper height={200}>{imageArray}</Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: 180,
    alignSelf: 'center'
  }
});
