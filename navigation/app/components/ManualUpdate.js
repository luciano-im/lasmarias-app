import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Reactotron from 'reactotron-react-native';

export default class ManualUpdate extends React.Component {
  render() {
    const { loading } = this.props;

    return (
      <View
        style={{
          borderBottomWidth: 2,
          borderBottomColor: 'red',
          flexDirection: 'row',
          backgroundColor: '#FF5555'
        }}
      >
        <Text style={{ color: 'white' }}>
          <Text onPress={this.props.onPress}>Reintentar</Text> la verificación
          de contenido nuevo.
        </Text>
        {loading && (
          <ActivityIndicator animating={true} size={moderateScale(22, 0.3)} />
        )}
        {!loading && (
          <MaterialIcons
            name="warning"
            color={'white'}
            size={22}
            style={{ alignSelf: 'flex-end' }}
          />
        )}
      </View>
    );
  }
}
