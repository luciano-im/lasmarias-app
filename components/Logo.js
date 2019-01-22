import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold'
  },
  sub: {
    fontSize: 17
  }
});
