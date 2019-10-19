import React from 'react';
import { Image, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { theme } from '../helpers/styles';

export default class Logo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={require('../assets/logo.png')}
            resizeMode="center"
          />
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '30@ms0.5'
  },
  title: {
    fontSize: '45@ms0.5',
    fontWeight: 'bold'
  },
  sub: {
    fontSize: '17@ms0.5'
  },
  imgContainer: {
    paddingHorizontal: '30@ms0.5',
    paddingTop: '15@ms0.5'
  },
  img: {
    alignSelf: 'center',
    height: 120,
    width: 480
  }
});
