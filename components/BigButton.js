import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  Button,
  Text,
  TouchableRipple,
  Surface,
  withTheme
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class BigButton extends React.Component {
  render() {
    const label = this.props.label;
    const elevation = this.props.elevation;
    const radius = this.props.radius;
    const icon = this.props.icon;
    const iconSize = this.props.iconSize;
    const iconColor = this.props.iconColor;

    return (
      <Surface style={[styles.button, {elevation: elevation, borderRadius: radius}]}>
        <TouchableRipple borderless onPress={() => console.log('Pressed')}>
           <View style={styles.content}>
              <View>
                <MaterialCommunityIcons name={icon} size={iconSize} color={iconColor} />
              </View>
              <Text
                numberOfLines={1}
                style={[styles.label]}>
                {label}
              </Text>
           </View>
        </TouchableRipple>
      </Surface>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    minWidth: 64,
    borderStyle: 'solid'
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    textAlign: 'center',
    letterSpacing: 1,
    marginVertical: 9,
    marginHorizontal: 16
  }
});
