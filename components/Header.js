import React from 'react';
import { Appbar } from 'react-native-paper';
import { fetchCustomers } from '../helpers/api';
import Reactotron from 'reactotron-react-native';

export default class Header extends React.Component {
  render() {
    let leftAction;
    if(this.props.leftAction === 'drawer') {
      leftAction = <Appbar.Action icon='menu' onPress={() => this.props.navigation.toggleDrawer()} />;
    } else if (this.props.leftAction === 'back') {
      leftAction = <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />;
    }

    return (
      <Appbar.Header>
        {leftAction}
        <Appbar.Content title='Las Marias' />
        <Appbar.Action icon='refresh' onPress={() => fetchCustomers()} />
      </Appbar.Header>
    )
  }
}
