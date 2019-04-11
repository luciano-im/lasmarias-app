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
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  _isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  _processPendingOrders = async () => {
    const pendingOrders = await _getPendingOrders();
    Reactotron.log(pendingOrders);
    // pendingOrders.map(async (order, index) => {
    //   const result = await createOrder(order.order, order.customer);
    //   if (result.error === false) {
    //     const newPendingOrders = await _removePendingOrder(index);
    //     this.props.screenProps.setPendingOrders(
    //       newPendingOrders === null || this._isEmpty(newPendingOrders) === true
    //         ? false
    //         : true
    //     );
    //   }
    // });
    const newPendingOrders = await pendingOrders.map(async (order, index) => {
      const result = await createOrder(order.order, order.customer);
      if (result.error === true) {
        return order;
      }
    });
    if (newPendingOrders === null || this._isEmpty(newPendingOrders) === true) {
      await _removePendingOrders();
    } else {
      await _setPendingOrders(newPendingOrders);
    }
    this.props.screenProps.setPendingOrders(
      newPendingOrders === null || this._isEmpty(newPendingOrders) === true
        ? false
        : true
    );
  };

  _navigateCheckout = async () => {
    const customer = this.props.screenProps.id;
    if (customer !== null) {
      this.props.navigation.navigate('Checkout');
    }
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
            onChangeText={query => {
              this.setState({ searchText: query });
            }}
            value={this.state.searchText}
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
