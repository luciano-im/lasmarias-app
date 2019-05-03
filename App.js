import React from 'react';
import { SafeAreaView, YellowBox } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStore } from '@spyna/react-store';
import { Navigation } from './navigation/Navigation';
import NavigationService from './navigation/NavigationService';
import { theme } from './helpers/styles';
import { _removeOrder } from './helpers/api';
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
  },
  pendingOrders: false,
  searchProductsQuery: []
};

class App extends React.Component {
  async componentDidMount() {
    // AsyncStorage.removeItem('PendingOrders');

    // Delete products in cart
    _removeOrder();
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
          />
        </SafeAreaView>
      </PaperProvider>
    );
  }
}

export default createStore(App, initialValue);
