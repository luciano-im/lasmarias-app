import React from 'react';
import { SafeAreaView } from 'react-native';
import { YellowBox } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import PubNubReact from 'pubnub-react';
import { Navigation } from './navigation/Navigation';
import NavigationService from './navigation/NavigationService';
import { theme } from './helpers/styles';
import { pubnubConfig } from './PubnubConfig';
import './ReactotronConfig';
import Reactotron from 'reactotron-react-native';

YellowBox.ignoreWarnings(['Setting a timer']);

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.PRIMARY_COLOR,
    accent: theme.ACCENT_COLOR
  }
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      db_data: null
    };

    // Init PubNub object
    this.pubnub = new PubNubReact({
      publishKey: pubnubConfig.PUBNUB_PUBLISH_KEY,
      subscribeKey: pubnubConfig.PUBNUB_SUBSCRIBE_KEY
    });
    this.pubnub.init(this);
  }

  _setId = data => {
    this.setState({
      id: data.id,
      name: data.name
    });
  };

  _removeId = data => {
    this.setState({
      id: null,
      name: null
    });
  };

  componentWillMount() {
    // Subscribe to channel
    this.pubnub.subscribe({
      channels: ['lasmarias']
    });

    // Get new messages
    this.pubnub.getMessage('lasmarias', msg => {
      this.setState({
        db_data: msg.message
      });
      Reactotron.log(msg.message);

      NavigationService.navigate('UpdateModalScreen');
    });

    //Get last message from history
    this.pubnub.history(
      {
        channel: 'lasmarias',
        reverse: false,
        count: 1 // how many items to fetch
      },
      (status, response) => {
        if (status.error === false) {
          this.setState({
            db_data: response.messages[0].entry
          });
          Reactotron.log(response.messages[0].entry);
        }
      }
    );
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels: ['lasmarias']
    });
  }

  // Ref prop and NavigationService enable us to use navigate in App.js and any other screen that haven't navigation prop
  render() {
    return (
      <PaperProvider theme={customTheme}>
        <SafeAreaView style={{ flex: 1 }}>
          <Navigation
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
            screenProps={{
              setId: data => this._setId(data),
              removeId: () => this._removeId(),
              id: this.state.id,
              name: this.state.name,
              db_data: this.state.db_data
            }}
          />
        </SafeAreaView>
      </PaperProvider>
    );
  }
}
