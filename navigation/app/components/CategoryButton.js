import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, Surface } from 'react-native-paper';
import Reactotron from 'reactotron-react-native';

export default class CategoryButton extends React.Component {
  _onPress = (category, label) => {
    this.props.onPress(category, label);
  };

  render() {
    const backgroundColor = this.props.backgroundColor;
    const elevation = this.props.elevation;
    const size = this.props.size;
    const borderColor = this.props.borderColor;
    const image = this.props.image;
    const category = this.props.category;
    const label = this.props.label;
    const imageSize = size - (size * 40) / 100;

    // const isIOS = Platform.OS === 'ios';
    // const fontFamily = isIOS ? 'HelveticaNeue-Medium' : 'sans-serif-medium';

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Surface
          style={[
            styles.button,
            {
              elevation: elevation,
              borderRadius: size,
              width: size,
              height: size,
              backgroundColor: backgroundColor
            }
          ]}
        >
          <TouchableRipple
            borderless
            onPress={() => this._onPress(category, label)}
            style={[
              styles.touchable,
              {
                borderColor: borderColor,
                width: size,
                height: size,
                borderRadius: size
              }
            ]}
          >
            <View>
              <Image
                style={{ width: imageSize, height: imageSize }}
                source={image}
              />
            </View>
          </TouchableRipple>
        </Surface>
        <Text style={styles.label} numberOfLines={2}>
          {label}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderStyle: 'solid'
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  label: {
    textAlign: 'center',
    marginTop: 9,
    marginHorizontal: 4,
    fontSize: 14
  }
});
