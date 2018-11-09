import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Header from '../components/Header';
import HomeScreen from './HomeScreen';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      header: (
        <Header leftAction='drawer' />
      ),
    }),
  },
});


export const Navigation = HomeStack;
