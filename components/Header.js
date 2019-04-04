import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Badge, Searchbar } from 'react-native-paper';
import { _getOrder } from '../helpers/api';

// TODO: Add search products logic
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      productsInCart: null,
      badgeVisible: false
    };
  }

  _navigateCheckout = async () => {
    const customer = this.props.screenProps.id;
    if (customer !== null) {
      this.props.navigation.navigate('Checkout');
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.screenProps.productsInCart !==
      prevProps.screenProps.productsInCart
    ) {
      if (this.props.screenProps.productsInCart > 0) {
        this.setState({
          badgeVisible: true,
          productsInCart: this.props.screenProps.productsInCart
        });
      }
    }
  }

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
        <View>
          <Appbar.Action
            color={'#FFFFFF'}
            icon="shopping-cart"
            onPress={() => this._navigateCheckout()}
          />
          <Badge visible={this.state.badgeVisible} style={styles.badge}>
            {this.state.productsInCart}
          </Badge>
        </View>
      </Appbar.Header>
    );
  }
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 4,
    right: 0
  }
});
