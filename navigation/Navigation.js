import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import { DrawerItems } from 'react-navigation';
import { List } from 'react-native-paper';
import { logout } from '../helpers/api';
import Header from '../components/Header';
import EmptyHeader from './auth/components/EmptyHeader';
import AuthLoadingScreen from './AuthLoading';
import LoginScreen from './auth/Login';
import SignUpScreen from './auth/SignUp';
import SignUp2Screen from './auth/SignUp2';
import SignUpOkScreen from './auth/SignUpOk';
import PasswordRecoveryScreen from './auth/PasswordRecovery';
import PasswordRecoveryOkScreen from './auth/PasswordRecoveryOk';
import HomeScreen from './app/Home';
import SearchCustomerScreen from './app/SearchCustomer';
import CheckoutScreen from './app/Checkout';
import CheckoutOkScreen from './app/CheckoutOk';
import OrdersScreen from './app/Orders';
import OrderDetailScreen from './app/OrderDetail';
import AccountBalanceScreen from './app/AccountBalance';
import ModifyDataScreen from './app/ModifyData';
import ModifyDataValidationScreen from './app/ModifyDataValidation';
import ModifyDataOkScreen from './app/ModifyDataOk';
import ModifyPasswordScreen from './app/ModifyPassword';
import UpdateInfoScreen from './app/UpdateInfoModal';

// TODO: Styles for drawer menu
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
    SignUpOk: {
      screen: SignUpOkScreen,
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
    },
    Checkout: {
      screen: CheckoutScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header leftAction="back" navigation={navigation} />
      })
    },
    CheckoutOk: {
      screen: CheckoutOkScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header leftAction="drawer" navigation={navigation} />
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

const OrdersStack = createStackNavigator(
  {
    Orders: {
      screen: OrdersScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header leftAction="drawer" navigation={navigation} />
      })
    },
    OrderDetail: {
      screen: OrderDetailScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header leftAction="back" navigation={navigation} />
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
    initialRouteName: 'Orders',
    cardStyle: {
      backgroundColor: 'white'
    }
  }
);

const AccountStack = createStackNavigator(
  {
    AccountBalance: {
      screen: AccountBalanceScreen,
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
    initialRouteName: 'AccountBalance',
    cardStyle: {
      backgroundColor: 'white'
    }
  }
);

const ModifyDataStack = createStackNavigator(
  {
    ModifyData: {
      screen: ModifyDataScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header leftAction="drawer" navigation={navigation} />
      })
    },
    ModifyDataValidation: {
      screen: ModifyDataValidationScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header leftAction="back" navigation={navigation} />
      })
    },
    ModifyDataOk: {
      screen: ModifyDataOkScreen,
      navigationOptions: ({ navigation }) => ({
        header: <EmptyHeader />
      })
    }
  },
  {
    initialRouteName: 'ModifyData',
    cardStyle: {
      backgroundColor: 'white'
    }
  }
);

const ModifyPasswordStack = createStackNavigator({
  ModifyPassword: {
    screen: ModifyPasswordScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header leftAction="drawer" navigation={navigation} />
    })
  }
});

const AppDrawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: 'Inicio',
        drawerIcon: ({ tintColor }) => (
          <List.Icon color={tintColor} icon="home" />
        )
      }
    },
    Orders: {
      screen: OrdersStack,
      navigationOptions: {
        drawerLabel: 'Mis Pedidos',
        drawerIcon: ({ tintColor }) => (
          <List.Icon color={tintColor} icon="shopping-cart" />
        )
      }
    },
    Account: {
      screen: AccountStack,
      navigationOptions: {
        drawerLabel: 'Estado de Cuenta',
        drawerIcon: ({ tintColor }) => (
          <List.Icon color={tintColor} icon="monetization-on" />
        )
      }
    },
    ModifyData: {
      screen: ModifyDataStack,
      navigationOptions: {
        drawerLabel: 'Modificar mis Datos',
        drawerIcon: ({ tintColor }) => (
          <List.Icon color={tintColor} icon="account-box" />
        )
      }
    },
    ModifyPassword: {
      screen: ModifyPasswordStack,
      navigationOptions: {
        drawerLabel: 'Cambiar Contraseña',
        drawerIcon: ({ tintColor }) => (
          <List.Icon color={tintColor} icon="lock" />
        )
      }
    }
  },
  {
    initialRouteName: 'Home',
    contentComponent: props => (
      <View style={{ flex: 1 }}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...props} />
          <View style={{ height: 172 }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                height: 172,
                alignItems: 'center'
              }}
              onPress={async () => {
                await logout().then(response => {
                  if (response.error === false) {
                    props.navigation.navigate('Auth');
                  }
                });
              }}
            >
              <List.Icon style={{ opacity: 0.62 }} icon="exit-to-app" />
              <Text style={{ margin: 16, fontWeight: 'bold' }}>
                Cerrar Sesión
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    )
  }
);

const AppStack = createStackNavigator(
  {
    UpdateInfo: {
      screen: UpdateInfoScreen
    },
    App: {
      screen: AppDrawer
    }
  },
  {
    initialRouteName: 'App',
    mode: 'modal',
    headerMode: 'none'
  }
);

const AppNavigation = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    // App: AppDrawer
    App: AppStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export const Navigation = createAppContainer(AppNavigation);
