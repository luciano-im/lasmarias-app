import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, Surface } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import Reactotron from 'reactotron-react-native';
import { PropTypes, ImageSourcePropType } from 'prop-types';

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
    // const imageSize = size - (size * 40) / 100;
    const imageSize = size;

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

const styles = ScaledSheet.create({
  button: {
    borderStyle: 'solid'
  },
  touchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2
  },
  label: {
    textAlign: 'center',
    marginTop: '9@ms0.3',
    marginHorizontal: '4@ms0.3',
    fontSize: '14@ms0.3'
  }
});

CategoryButton.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  elevation: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  image: ImageSourcePropType
};
