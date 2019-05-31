import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Badge, Searchbar } from 'react-native-paper';
import { withStore } from '@spyna/react-store';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Reactotron from 'reactotron-react-native';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
  }

  _isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  _navigateCheckout = () => {
    const customer = this.props.id;
    if (customer !== null) {
      this.props.navigation.navigate('Checkout');
    }
  };

  _navigatePendingOrders = () => {
    const { pendingOrders } = this.props;
    if (pendingOrders) {
      this.props.navigation.navigate('PendingScreen');
    }
  };

  _onSearch = query => {
    this.setState({
      searchQuery: query
    });
    this.props.store.set('searchProductsQuery', query.match(/\S+/g));
  };

  render() {
    const { productsInCart, pendingOrders } = this.props;

    let leftAction;
    if (this.props.leftAction === 'drawer') {
      leftAction = (
        <Appbar.Action
          icon="menu"
          size={moderateScale(24, 0.3)}
          onPress={() => this.props.navigation.toggleDrawer()}
        />
      );
    } else if (this.props.leftAction === 'back') {
      leftAction = (
        <Appbar.BackAction
          size={moderateScale(24, 0.3)}
          onPress={() => this.props.navigation.goBack()}
        />
      );
    } else if (this.props.leftAction === 'pending') {
      leftAction = (
        <Appbar.BackAction
          size={moderateScale(24, 0.3)}
          onPress={() => this.props.navigation.navigate('AppScreens')}
        />
      );
    }

    return (
      <Appbar.Header style={styles.header}>
        {leftAction}
        <View style={{ flex: 1 }}>
          <Searchbar
            placeholder="Buscar Productos"
            onChangeText={query => this._onSearch(query)}
            value={this.state.searchQuery}
            style={{ height: 40 }}
          />
        </View>
        <View>
          <Appbar.Action
            color={'#FFFFFF'}
            icon="autorenew"
            size={moderateScale(24, 0.3)}
            disabled={!pendingOrders}
            onPress={() => this._navigatePendingOrders()}
          />
          <Badge
            visible={pendingOrders > 0 ? true : false}
            size={moderateScale(20, 0.1)}
            style={[
              styles.badge,
              { backgroundColor: 'orange', color: 'white' }
            ]}
          >
            !
          </Badge>
        </View>
        <View>
          <Appbar.Action
            color={'#FFFFFF'}
            icon="shopping-cart"
            size={moderateScale(24, 0.3)}
            disabled={productsInCart > 0 ? false : true}
            onPress={() => this._navigateCheckout()}
          />
          <Badge
            size={moderateScale(20, 0.1)}
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

const styles = ScaledSheet.create({
  badge: {
    position: 'absolute',
    top: 4,
    right: 0,
    fontSize: 13
  },
  header: {
    height: '56@ms0.3'
  }
});

export default withStore(Header, [
  'id',
  'productsInCart',
  'pendingOrders',
  'searchProductsQuery'
]);

Header.propTypes = {
  leftAction: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  id: PropTypes.number,
  productsInCart: PropTypes.number,
  pendingOrders: PropTypes.bool,
  searchProductsQuery: PropTypes.array
};
