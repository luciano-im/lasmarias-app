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
        <Text style={styles.sub}>DISTRIBUIDORA</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold'
  },
  sub: {
    fontSize: 18
  }
});
