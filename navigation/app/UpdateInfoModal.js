import React from 'react';
import { View } from 'react-native';
import { Portal, Text } from 'react-native-paper';

export default class UpdateInfoScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 6,
            elevation: 6,
            shadowColor: 'black',
            shadowOpacity: 0.15,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 10
          }}
        >
          <Text>Este es mi texto</Text>
        </View>
      </View>
    );
  }
}
