import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView
} from 'react-native';
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
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <EmptyHeader navigation={navigation} screenProps={screenProps} />
        )
      })
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <EmptyHeader navigation={navigation} screenProps={screenProps} />
        )
      })
    },
    SignUp2: {
      screen: SignUp2Screen,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <EmptyHeader navigation={navigation} screenProps={screenProps} />
        )
      })
    },
    SignUpOk: {
      screen: SignUpOkScreen,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <EmptyHeader navigation={navigation} screenProps={screenProps} />
        )
      })
    },
    PasswordRecovery: {
      screen: PasswordRecoveryScreen,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <EmptyHeader navigation={navigation} screenProps={screenProps} />
        )
      })
    },
    PasswordRecoveryOk: {
      screen: PasswordRecoveryOkScreen,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <EmptyHeader navigation={navigation} screenProps={screenProps} />
        )
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
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <Header
            leftAction="drawer"
            navigation={navigation}
            screenProps={screenProps}
          />
        )
      })
    },
    SearchCustomer: {
      screen: SearchCustomerScreen,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <Header
            leftAction="back"
            navigation={navigation}
            screenProps={screenProps}
          />
        )
      })
    },
    Checkout: {
      screen: CheckoutScreen,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <Header
            leftAction="back"
            navigation={navigation}
            screenProps={screenProps}
          />
        )
      })
    },
    CheckoutOk: {
      screen: CheckoutOkScreen,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <Header
            leftAction="drawer"
            navigation={navigation}
            screenProps={screenProps}
          />
        )
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
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <Header
            leftAction="drawer"
            navigation={navigation}
            screenProps={screenProps}
          />
        )
      })
    },
    OrderDetail: {
      screen: OrderDetailScreen,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <Header
            leftAction="back"
            navigation={navigation}
            screenProps={screenProps}
          />
        )
      })
    },
    SearchCustomer: {
      screen: SearchCustomerScreen,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <Header
            leftAction="back"
            navigation={navigation}
            screenProps={screenProps}
          />
        )
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
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <Header
            leftAction="drawer"
            navigation={navigation}
            screenProps={screenProps}
          />
        )
      })
    },
    SearchCustomer: {
      screen: SearchCustomerScreen,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <Header
            leftAction="back"
            navigation={navigation}
            screenProps={screenProps}
          />
        )
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
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <Header
            leftAction="drawer"
            navigation={navigation}
            screenProps={screenProps}
          />
        )
      })
    },
    ModifyDataValidation: {
      screen: ModifyDataValidationScreen,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <Header
            leftAction="back"
            navigation={navigation}
            screenProps={screenProps}
          />
        )
      })
    },
    ModifyDataOk: {
      screen: ModifyDataOkScreen,
      navigationOptions: ({ navigation, screenProps }) => ({
        header: (
          <EmptyHeader navigation={navigation} screenProps={screenProps} />
        )
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
    navigationOptions: ({ navigation, screenProps }) => ({
      header: (
        <Header
          leftAction="drawer"
          navigation={navigation}
          screenProps={screenProps}
        />
      )
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

// Stack allow us to use transparentCard
const AppStack = createStackNavigator(
  {
    UpdateModalScreen: {
      screen: UpdateInfoScreen
    },
    AppScreens: {
      screen: AppDrawer
    }
  },
  {
    initialRouteName: 'AppScreens',
    mode: 'modal',
    headerMode: 'none',
    // Modal screen with transparent background
    transparentCard: true,
    // Rewrite transitionConfig() to mantain background transparent when screen transition ends
    transitionConfig: () => ({
      screenInterpolator: sceneProps => {
        const { position, scene } = sceneProps;
        const { index } = scene;
        const opacity = position.interpolate({
          inputRange: [index - 1, index],
          outputRange: [0, 1]
        });
        return { opacity };
      },
      containerStyle: {
        backgroundColor: 'transparent'
      }
    })
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
