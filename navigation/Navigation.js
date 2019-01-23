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
import SignUp2Screen from './auth/SignUp2';
import SignUpResultScreen from './auth/SignUpResult';
import PasswordRecoveryScreen from './auth/PasswordRecovery';
import PasswordRecoveryOkScreen from './auth/PasswordRecoveryOk';
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
      screen: SignUpScreen,
      navigationOptions: ({ navigation }) => ({
        header: <EmptyHeader />
      })
    },
    SignUp2: {
      screen: SignUp2Screen,
      navigationOptions: ({ navigation }) => ({
        header: <EmptyHeader />
      })
    },
    SignUpResult: {
      screen: SignUpResultScreen,
      navigationOptions: ({ navigation }) => ({
        header: <EmptyHeader />
      })
    },
    PasswordRecovery: {
      screen: PasswordRecoveryScreen,
      navigationOptions: ({ navigation }) => ({
        header: <EmptyHeader />
      })
    },
    PasswordRecoveryOk: {
      screen: PasswordRecoveryOkScreen,
      navigationOptions: ({ navigation }) => ({
        header: <EmptyHeader />
      })
    }
  },
  {
    initialRouteName: 'Login',
    cardStyle: {
      backgroundColor: 'white'
    }
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
    initialRouteName: 'Home',
    cardStyle: {
      backgroundColor: 'white'
    }
  }
);

const AppDrawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <List.Icon color={tintColor} icon="home" />
        )
      }
    }
  },
  {
    initialRouteName: 'Home'
  }
);

const AppNavigation = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppDrawer
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export const Navigation = AppNavigation;
