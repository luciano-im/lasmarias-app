import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
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
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { logout } from '../helpers/api';
import { theme } from '../helpers/styles';
import Header from '../components/Header';
import DrawerHeader from '../components/DrawerHeader';
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
import PendingOrdersScreen from './app/PendingOrders';

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => ({
        header: <EmptyHeader navigation={navigation} />
      })
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: ({ navigation }) => ({
        header: <EmptyHeader navigation={navigation} />
      })
    },
    SignUp2: {
      screen: SignUp2Screen,
      navigationOptions: ({ navigation }) => ({
        header: <EmptyHeader navigation={navigation} />
      })
    },
    SignUpOk: {
      screen: SignUpOkScreen,
      navigationOptions: ({ navigation }) => ({
        header: <EmptyHeader navigation={navigation} />
      })
    },
    PasswordRecovery: {
      screen: PasswordRecoveryScreen,
      navigationOptions: ({ navigation }) => ({
        header: <EmptyHeader navigation={navigation} />
      })
    },
    PasswordRecoveryOk: {
      screen: PasswordRecoveryOkScreen,
      navigationOptions: ({ navigation }) => ({
        header: <EmptyHeader navigation={navigation} />
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
    // ModifyDataValidation: {
    //   screen: ModifyDataValidationScreen,
    //   navigationOptions: ({ navigation }) => ({
    //     header: <Header leftAction="back" navigation={navigation} />
    //   })
    // },
    ModifyDataOk: {
      screen: ModifyDataOkScreen,
      navigationOptions: ({ navigation }) => ({
        header: <EmptyHeader navigation={navigation} />
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

const PendingOrdersStack = createStackNavigator({
  PendingOrders: {
    screen: PendingOrdersScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header leftAction="pending" navigation={navigation} />
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
      <View style={{ flex: 1, paddingTop: 25 }}>
        <SafeAreaView
          style={{ flex: 1 }}
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <View
            style={{
              alignItems: 'center',
              paddingTop: moderateScale(15, 0.3)
            }}
          >
            <Image
              style={{
                width: moderateScale(80, 0.3),
                height: moderateScale(80, 0.3),
                maxWidth: 128
              }}
              source={require('../assets/user-128.png')}
            />
            <View style={{ paddingVertical: 10 }}>
              <DrawerHeader />
            </View>
            <View
              style={{ borderColor: '#CCC', borderTopWidth: 1, width: '100%' }}
            />
          </View>
          <DrawerItems
            {...props}
            labelStyle={{ fontSize: moderateScale(13, 0.3) }}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%'
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
            <Text
              style={{
                margin: 16,
                fontWeight: 'bold',
                fontSize: moderateScale(13, 0.3)
              }}
            >
              Cerrar Sesión
            </Text>
          </TouchableOpacity>
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
    },
    PendingScreen: {
      screen: PendingOrdersStack
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
    App: AppStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

export const Navigation = createAppContainer(AppNavigation);
