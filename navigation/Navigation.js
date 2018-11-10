import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Header from '../components/Header';
import HomeScreen from './HomeScreen';
import SearchCustomerScreen from './SearchCustomerScreen';

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
    navigationOptions: ({ navigation }) => ({
      header: (
        <Header leftAction='back' navigation={navigation} />
      ),
    }),
  },
},{
  initialRouteName: 'Home',
});


export const Navigation = HomeStack;
