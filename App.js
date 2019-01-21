import React from "react";
import { SafeAreaView } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Navigation } from "./navigation/Navigation";
import { theme } from "./helpers/styles";
import "./ReactotronConfig";

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
