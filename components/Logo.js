import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { theme } from '../helpers/styles';

export default class Logo extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.PRIMARY_COLOR }]}>
          Las Marías
        </Text>
        <Text style={[styles.sub, { fontWeight: theme.FONT_WEIGHT_MEDIUM }]}>
          DISTRIBUIDORA
        </Text>
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
  }
});
