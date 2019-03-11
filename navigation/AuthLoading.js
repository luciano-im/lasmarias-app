import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { _getToken } from '../helpers/api';

// TODO: Style ActivityIndicator and create splash screen
export default class AuthLoadingScreen extends React.Component {
  async componentDidMount() {
    const token = await _getToken();
    this.props.navigation.navigate(token !== null ? 'App' : 'Auth');
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
}
