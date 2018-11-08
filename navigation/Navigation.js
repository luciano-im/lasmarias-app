import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
});


export const Navigation = HomeStack;
