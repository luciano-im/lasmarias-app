import React from 'react';
import {
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';
import { List } from 'react-native-paper';
import Header from '../components/Header';
import HomeScreen from './HomeScreen';
import SearchCustomerScreen from './SearchCustomerScreen';
import AccountBalanceScreen from './AccountBalanceScreen';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      header: (
        <Header leftAction='drawer' navigation={navigation} />
      ),
    }),
  },
  SearchCustomer: {
    screen: SearchCustomerScreen,
    navigationOptions: ({navigation}) => ({
      header: (
        <Header leftAction='back' navigation={navigation} />
      ),
    }),
  },
},{
  initialRouteName: 'Home',
});

const AccountBalanceStack = createStackNavigator({
  AccountBalance: {
    screen: AccountBalanceScreen,
    navigationOptions: ({navigation}) => ({
      header: (
        <Header leftAction='back' navigation={navigation} />
      ),
    }),
  }
});


const AppNavigation = createDrawerNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({tintColor}) => (<List.Icon color={tintColor} icon='home' />),
    }
  },
  AccountBalance: {
    screen: AccountBalanceStack,
    navigationOptions: {
      drawerLabel: 'Saldo de Cuenta',
      drawerIcon: ({tintColor}) => (<List.Icon color={tintColor} icon='attach-money' />),
    }
  }
},{
  initialRouteName: 'Home'
});


export const Navigation = AppNavigation;
