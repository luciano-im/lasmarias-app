import React from 'react';
import { SafeAreaView, YellowBox } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStore } from '@spyna/react-store';
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

const initialValue = {
  //id => customer id
  //name => customer name
  id: null,
  name: null,
  productsInCart: null,
  updated: null,
  userData: {
    userType: null,
    userName: null,
    userLastName: null,
    userEmail: null
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingOrders: null,
      searchProductsQuery: []
    };
  }

  _isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  _setPendingOrders = value => {
    this.setState({
      pendingOrders: value
    });
  };

  _setSearchProductsQuery = query => {
    // Store querys as an array of words
    this.setState({
      searchProductsQuery: query.match(/\S+/g)
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
              // setId: data => this._setId(data),
              // removeId: () => this._removeId(),
              // setUserData: (userType, userName, userLastName, userEmail) =>
              //   this._setUserData(userType, userName, userLastName, userEmail),
              // setUpdated: isUpdated => this._setUpdated(isUpdated),
              // setProductsInCart: qty => this._setProductsInCart(qty),
              setPendingOrders: qty => this._setPendingOrders(qty),
              setSearchProductsQuery: query =>
                this._setSearchProductsQuery(query),
              // id: this.state.id,
              // name: this.state.name,
              // userType: this.state.userType,
              // userName: this.state.userName,
              // userLastName: this.state.userLastName,
              // userEmail: this.state.userEmail,
              // updated: this.state.updated,
              // productsInCart: this.state.productsInCart,
              pendingOrders: this.state.pendingOrders,
              searchProductsQuery: this.state.searchProductsQuery
            }}
          />
        </SafeAreaView>
      </PaperProvider>
    );
  }
}

export default createStore(App, initialValue);
