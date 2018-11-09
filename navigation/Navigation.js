import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Appbar } from 'react-native-paper';

import HomeScreen from './HomeScreen';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      header: (
        <Appbar.Header>
          <Appbar.Action icon='menu' onPress={() => navigation.navigate('DrawerOpen')} />
          <Appbar.Content title='LAS MARIAS' />
        </Appbar.Header>
      ),
    }),
  },
});


export const Navigation = HomeStack;
