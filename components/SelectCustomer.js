import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Dialog,
  IconButton,
  List,
  Paragraph,
  Portal,
  Text
} from 'react-native-paper';
import { theme } from '../helpers/styles';
import { _removeOrder } from '../helpers/api';
import Reactotron from 'reactotron-react-native';

export default class SelectCustomer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  _showDialog = () => {
    this.setState({
      visible: true
    });
  };

  _cancelDialog = () => {
    this.setState({
      visible: false
    });
  };

  _removeCustomer = async () => {
    const { routeName } = this.props.navigation.state;
    Reactotron.log(routeName);

    await _removeOrder();
    await this.props.screenProps.removeId();
    this.setState({
      visible: false
    });

    if (routeName === 'Checkout') {
      this.props.navigation.navigate('Home');
    }
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
              onPress={() => this._showDialog()}
            />
          )}
          theme={{ colors: { text: '#FFFFFF' } }}
          style={{ padding: 0, backgroundColor: theme.ACCENT_COLOR }}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View>{content}</View>
        <Portal>
          <Dialog
            visible={this.state.visible}
            dismissable={false}
            onDismiss={this._cancelDialog}
          >
            <Dialog.Title style={styles.title}>ATENCION!</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Se perderán todos los productos que haya agregado al carrito.
                ¿Está seguro?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._cancelDialog}>
                <Text style={styles.button}>CANCELAR</Text>
              </Button>
              <Button onPress={this._removeCustomer}>
                <Text style={styles.button}>ACEPTAR</Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.PRIMARY_COLOR,
    marginVertical: 5
  },
  listIcon: {
    margin: 4
  },
  title: {
    color: theme.PRIMARY_COLOR
  },
  button: {
    color: theme.PRIMARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  }
});
