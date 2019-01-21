import React from 'react';
import {
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import { List } from 'react-native-paper';
import Header from '../components/Header';
import EmptyHeader from './auth/components/EmptyHeader';
import AuthLoadingScreen from './AuthLoading';
import LoginScreen from './auth/Login';
import SignUpScreen from './auth/SignUp';
import HomeScreen from './app/Home';
import SearchCustomerScreen from './app/SearchCustomer';
// import AccountBalanceScreen from './app/AccountBalance';

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => ({
        header: <EmptyHeader />
      })
    },
    SignUp: {
      screen: SignUpScreen
    }
  },
  {
    initialRouteName: 'Login'
  }
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header leftAction="drawer" navigation={navigation} />
      })
    },
    SearchCustomer: {
      screen: SearchCustomerScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header leftAction="back" navigation={navigation} />
      })
    }
  },
  {
    initialRouteName: 'Home'
  }
);

// const AppNavigation = createDrawerNavigator(
//   {
//     Home: {
//       screen: HomeStack,
//       navigationOptions: {
//         drawerLabel: 'Home',
//         drawerIcon: ({ tintColor }) => (
//           <List.Icon color={tintColor} icon="home" />
//         )
//       }
//     },
//     AccountBalance: {
//       screen: AccountBalanceStack,
//       navigationOptions: {
//         drawerLabel: 'Saldo de Cuenta',
//         drawerIcon: ({ tintColor }) => (
//           <List.Icon color={tintColor} icon="attach-money" />
//         )
//       }
//     }
//   },
//   {
//     initialRouteName: 'Home'
//   }
// );

const AppNavigation = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: HomeStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export const Navigation = AppNavigation;
