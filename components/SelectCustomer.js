import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, List } from 'react-native-paper';
import { theme } from '../helpers/styles';

export default class SelectCustomer extends React.Component {
  constructor(props) {
    super(props);
  }

  _onRemoveCustomer = () => {
    this.props.screenProps.removeId();
  };

  render() {
    const { screenProps } = this.props;
    let content;
    if (!screenProps.id) {
      content = (
        <List.Item
          title="Buscar Cliente"
          left={props => (
            <List.Icon
              {...props}
              icon="search"
              color="white"
              style={styles.listIcon}
            />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon="chevron-right"
              color="white"
              style={styles.listIcon}
            />
          )}
          theme={{ colors: { text: '#FFFFFF' } }}
          style={{ padding: 0 }}
          onPress={() => this.props.navigation.navigate('SearchCustomer')}
        />
      );
    } else {
      content = (
        <List.Item
          title={screenProps.name}
          left={props => (
            <List.Icon
              {...props}
              icon="person"
              color="white"
              style={styles.listIcon}
            />
          )}
          right={props => (
            <IconButton
              {...props}
              icon="close"
              color={theme.RED_COLOR}
              onPress={() => this._onRemoveCustomer()}
            />
          )}
          theme={{ colors: { text: '#FFFFFF' } }}
          style={{ padding: 0, backgroundColor: theme.ACCENT_COLOR }}
        />
      );
    }

    return <View style={styles.container}>{content}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.PRIMARY_COLOR,
    marginVertical: 5
  },
  listIcon: {
    margin: 4
  }
});
