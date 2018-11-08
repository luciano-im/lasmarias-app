import React from 'react';
import { SafeAreaView } from 'react-native';
import {
  DefaultTheme,
  Provider as PaperProvider
} from 'react-native-paper';
import { Navigation } from './navigation/Navigation';
import { theme } from './helpers/styles';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.PRIMARY_COLOR,
    accent: theme.ACCENT_COLOR,
  }
};

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider theme={customTheme}>
        <SafeAreaView style={{flex: 1}}>
          <Navigation />
        </SafeAreaView>
      </PaperProvider>
    );
  }
}
