import React from 'react';
import { SafeAreaView } from 'react-native';
import { YellowBox } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import PubNubReact from 'pubnub-react';
import { Navigation } from './navigation/Navigation';
import { theme } from './helpers/styles';
import { pubnubConfig } from './PubnubConfig';
import './ReactotronConfig';

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
      id: null
    };
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
    this.pubnub.subscribe({
      channels: ['lasmarias']
    });

    this.pubnub.getMessage('lasmarias', msg => {
      console.log(msg);
    });

    //Get last message
    this.pubnub.history(
      {
        channel: 'lasmarias',
        reverse: false,
        count: 1 // how many items to fetch
      },
      (status, response) => {
        console.log(status);
        console.log(response);
      }
    );
  }

  render() {
    return (
      <PaperProvider theme={customTheme}>
        <SafeAreaView style={{ flex: 1 }}>
          <Navigation
            screenProps={{
              setId: data => this._setId(data),
              removeId: () => this._removeId(),
              id: this.state.id,
              name: this.state.name
            }}
          />
        </SafeAreaView>
      </PaperProvider>
    );
  }
}
