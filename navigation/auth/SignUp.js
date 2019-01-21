import React from 'react';
import { Button, Text, View } from 'react-native';

// TODO: Create the sign up screen
export default class SignUpScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>SignUp Screen</Text>
        <Button onPress={() => this.props.navigation.goBack()} title="Volver" />
      </View>
    );
  }
}
