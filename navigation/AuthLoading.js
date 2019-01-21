import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._checkLogin();
  }

  // TODO: develop a real check function
  _checkLogin = () => {
    const logged = false;

    this.props.navigation.navigate(logged ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
}
