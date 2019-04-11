import React from 'react';
import { AsyncStorage, SafeAreaView, YellowBox } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Navigation } from './navigation/Navigation';
import NavigationService from './navigation/NavigationService';
import { theme } from './helpers/styles';
import { _removeOrder, _getPendingOrders } from './helpers/api';
import './ReactotronConfig';
import Reactotron from 'reactotron-react-native';

YellowBox.ignoreWarnings(['Setting a timer']);

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.PRIMARY_COLOR,
    accent: theme.ACCENT_COLOR
  }
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      userType: null,
      updated: null,
      productsInCart: null,
      pendingOrders: null
    };
  }

  _isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  _setId = data => {
    this.setState({
      id: data.customer_id,
      name: data.name
    });
  };

  _removeId = data => {
    this.setState({
      id: null,
      name: null
    });
  };

  _setUserType = data => {
    this.setState({
      userType: data
    });
  };

  _setUpdated = isUpdated => {
    this.setState({
      updated: isUpdated
    });
  };

  _setProductsInCart = qty => {
    this.setState({
      productsInCart: qty
    });
  };

  _setPendingOrders = value => {
    this.setState({
      pendingOrders: value
    });
  };

  async componentDidMount() {
    // AsyncStorage.removeItem('PendingOrders');

    // Delete products in cart
    _removeOrder();

    const pendingOrders = await _getPendingOrders();
    this.setState({
      pendingOrders:
        pendingOrders === null || this._isEmpty(pendingOrders) === true
          ? false
          : true
    });
  }

  // Ref prop and NavigationService enable us to use navigate in App.js and any other screen that haven't navigation prop
  render() {
    return (
      <PaperProvider theme={customTheme}>
        <SafeAreaView style={{ flex: 1 }}>
          <Navigation
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
            screenProps={{
              setId: data => this._setId(data),
              removeId: () => this._removeId(),
              setUserType: data => this._setUserType(data),
              setUpdated: isUpdated => this._setUpdated(isUpdated),
              setProductsInCart: qty => this._setProductsInCart(qty),
              setPendingOrders: qty => this._setPendingOrders(qty),
              id: this.state.id,
              name: this.state.name,
              userType: this.state.userType,
              updated: this.state.updated,
              productsInCart: this.state.productsInCart,
              pendingOrders: this.state.pendingOrders
            }}
          />
        </SafeAreaView>
      </PaperProvider>
    );
  }
}
