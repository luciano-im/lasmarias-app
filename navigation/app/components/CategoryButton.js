import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, Surface } from 'react-native-paper';

export default class CategoryButton extends React.Component {
  render() {
    const backgroundColor = this.props.backgroundColor;
    const elevation = this.props.elevation;
    const size = this.props.size;
    const borderColor = this.props.borderColor;
    const image = this.props.image;
    const category = this.props.category;
    const label = this.props.label;

    // const isIOS = Platform.OS === 'ios';
    // const fontFamily = isIOS ? 'HelveticaNeue-Medium' : 'sans-serif-medium';

    return (
      <View style={{ width: size + 20 }}>
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
            onPress={() => this.props.onPress(category)}
            style={{
              borderWidth: 1,
              borderColor: borderColor,
              width: size,
              height: size,
              borderRadius: size
            }}
          >
            <View style={styles.content}>
              <Image
                //style={{ width: 80, height: 80 }}
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
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  label: {
    textAlign: 'center',
    marginTop: 9,
    marginHorizontal: 16,
    fontSize: 14
  }
});
