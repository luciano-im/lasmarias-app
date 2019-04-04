import React from 'react';
import { View } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { _getOrder } from '../helpers/api';

// TODO: Add search products logic
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  _navigateCheckout = async () => {
    const order = await _getOrder();
    if (order !== null) {
      this.props.navigation.navigate('Checkout');
    }
  };

  render() {
    let leftAction;
    if (this.props.leftAction === 'drawer') {
      leftAction = (
        <Appbar.Action
          icon="menu"
          onPress={() => this.props.navigation.toggleDrawer()}
        />
      );
    } else if (this.props.leftAction === 'back') {
      leftAction = (
        <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
      );
    }

    return (
      <Appbar.Header>
        {leftAction}
        <View style={{ flex: 1 }}>
          <Searchbar
            placeholder="Buscar Productos"
            onChangeText={query => {
              this.setState({ searchText: query });
            }}
            value={this.state.searchText}
            style={{ height: 40 }}
          />
        </View>
        <Appbar.Action
          icon="add-circle"
          onPress={() => console.log('nuevo pedido')}
        />
        <Appbar.Action
          icon="shopping-cart"
          onPress={() => this._navigateCheckout()}
        />
      </Appbar.Header>
    );
  }
}
