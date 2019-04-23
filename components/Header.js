import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Badge, Searchbar } from 'react-native-paper';
import {
  _getOrder,
  _getPendingOrders,
  _setPendingOrders,
  _removePendingOrders,
  _removePendingOrder,
  createOrder
} from '../helpers/api';
import Reactotron from 'reactotron-react-native';

// TODO: Add search products logic
export default class Header extends React.Component {
  _isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  _processPendingOrders = async () => {
    const pendingOrders = await _getPendingOrders();

    // Create orders
    const responses = await Promise.all(
      pendingOrders.map(order => createOrder(order.order, order.customer))
    );

    // Get successful requests
    let toRemove = [];
    responses.forEach((operation, index) => {
      if (operation.error === false) {
        return toRemove.push(index);
      }
    });

    // Delete successfull requests from pendingOrders
    if (this._isEmpty(toRemove) === false) {
      for (var i = toRemove.length - 1; i >= 0; i--) {
        pendingOrders.splice(toRemove[i], 1);
      }

      if (pendingOrders === null || this._isEmpty(pendingOrders) === true) {
        await _removePendingOrders();
      } else {
        await _setPendingOrders(pendingOrders);
      }

      this.props.screenProps.setPendingOrders(
        pendingOrders === null || this._isEmpty(pendingOrders) === true
          ? false
          : true
      );
    }
  };

  _navigateCheckout = async () => {
    const customer = this.props.screenProps.id;
    if (customer !== null) {
      this.props.navigation.navigate('Checkout');
    }
  };

  _onSearch = query => {
    this.props.screenProps.setSearchProductsQuery(query);
  };

  render() {
    const { productsInCart, pendingOrders } = this.props.screenProps;

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
            onChangeText={query => this._onSearch(query)}
            value={
              this.props.screenProps.searchProductsQuery === null
                ? ''
                : this.props.screenProps.searchProductsQuery.join(' ')
            }
            style={{ height: 40 }}
          />
        </View>
        <View>
          <Appbar.Action
            color={'#FFFFFF'}
            icon="autorenew"
            disabled={!pendingOrders}
            onPress={() => this._processPendingOrders()}
          />
          <Badge
            visible={pendingOrders > 0 ? true : false}
            style={[
              styles.badge,
              { backgroundColor: 'orange', color: 'white', fontSize: 13 }
            ]}
          >
            !
          </Badge>
        </View>
        <View>
          <Appbar.Action
            color={'#FFFFFF'}
            icon="shopping-cart"
            disabled={productsInCart > 0 ? false : true}
            onPress={() => this._navigateCheckout()}
          />
          <Badge
            visible={productsInCart > 0 ? true : false}
            style={styles.badge}
          >
            {productsInCart}
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
