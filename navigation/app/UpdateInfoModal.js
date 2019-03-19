import React from 'react';
import { Portal, Text } from 'react-native-paper';

export default class UpdateInfoScreen extends React.Component {
  render() {
    return (
      <Portal>
        <Text>This is rendered at a different place</Text>
      </Portal>
    );
  }
}
