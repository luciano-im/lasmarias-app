import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { theme } from '../helpers/styles';
import { _getToken } from '../helpers/api';

// TODO: Style ActivityIndicator and create splash screen
export default class AuthLoadingScreen extends React.Component {
  async componentDidMount() {
    const token = await _getToken();
    this.props.navigation.navigate(token !== null ? 'App' : 'Auth');
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: theme.PRIMARY_COLOR
        }}
      >
        <ActivityIndicator color={theme.ACCENT_COLOR} size={25} />
      </View>
    );
  }
}
