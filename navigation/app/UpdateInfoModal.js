import React from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Dialog, Text } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import { withStore } from '@spyna/react-store';
import {
  _saveDbData,
  _getDbData,
  fetchCustomers,
  fetchProducts
} from '../../helpers/api';
import { theme } from '../../helpers/styles';
import Reactotron from 'reactotron-react-native';
import PropTypes from 'prop-types';

// TODO: Review action to take when update fails
class UpdateInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepOne: true,
      stepTwo: false,
      updatingText: '',
      animating: false,
      buttonDisabled: false,
      updateError: false
    };
  }

  _fetchData = async () => {
    this.setState({
      updatingText: 'Actualizando Clientes...',
      buttonDisabled: true,
      animating: true
    });
    const customers = await fetchCustomers();
    this.setState({
      updatingText: 'Actualizando Productos...'
    });
    const products = await fetchProducts();

    //Check for errors
    if (customers.error === false) {
      if (products.error === false) {
        this.setState({
          updatingText: 'Actualización terminada.',
          animating: false,
          buttonDisabled: false,
          updateError: false
        });
        //Set updated true
        this.props.store.set('updated', new Date().toString());
        //Once updated save the new DbData to AsyncStorage
        const newDbData = this.props.navigation.getParam('newDbData');
        _saveDbData('currentDbData', newDbData);
      } else {
        this.setState({
          updatingText:
            'Hubo un problema actualizando la base de Productos. Los Clientes se actualizaron correctamente.',
          animating: false,
          buttonDisabled: false,
          updateError: true
        });
      }
    } else {
      if (products.error === false) {
        this.setState({
          updatingText:
            'Hubo un problema actualizando la base de Clientes. Los Productos se actualizaron correctamente.',
          animating: false,
          buttonDisabled: false,
          updateError: true
        });
      } else {
        this.setState({
          updatingText: 'No se pudo actualizar la App.',
          animating: false,
          buttonDisabled: false,
          updateError: true
        });
      }
    }
  };

  _stepTwo = async () => {
    this.setState({
      stepOne: false,
      stepTwo: true
    });

    this._fetchData();
  };

  _retry = () => {
    this._fetchData();
  };

  _close = () => {
    this.props.navigation.goBack();
  };

  _closeWithErrors = () => {
    this.props.store.set('updateError', true);
    this._close();
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    //Disable back button
    return true;
  }

  render() {
    const { updateError } = this.state;
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }}
      >
        <Dialog
          style={styles.dialog}
          visible={this.state.stepOne}
          dismissable={false}
        >
          <Dialog.Title style={styles.title}>ATENCION!</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.paragraph}>
              Se actualizaron datos en la App!
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={this._stepTwo}>
              <Text style={styles.button}>ACTUALIZAR</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog
          style={styles.dialog}
          visible={this.state.stepTwo}
          dismissable={false}
        >
          <Dialog.Title style={styles.title}>ACTUALIZACIÓN</Dialog.Title>
          <Dialog.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ActivityIndicator
                color={theme.PRIMARY_COLOR}
                size={30}
                style={{
                  marginRight: 16,
                  display: this.state.animating ? 'flex' : 'none'
                }}
                animating={this.state.animating}
              />
              <Text style={styles.paragraph}>{this.state.updatingText}</Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            {!updateError && (
              <Button
                onPress={this._close}
                disabled={this.state.buttonDisabled}
              >
                <Text
                  style={
                    this.state.buttonDisabled
                      ? styles.buttonDisabled
                      : styles.button
                  }
                >
                  OK
                </Text>
              </Button>
            )}
            {updateError && (
              <View style={{ flexDirection: 'row' }}>
                <Button
                  onPress={this._closeWithErrors}
                  disabled={this.state.buttonDisabled}
                >
                  <Text
                    style={
                      this.state.buttonDisabled
                        ? styles.buttonDisabled
                        : styles.button
                    }
                  >
                    CANCELAR
                  </Text>
                </Button>
                <Button
                  onPress={this._retry}
                  disabled={this.state.buttonDisabled}
                >
                  <Text
                    style={
                      this.state.buttonDisabled
                        ? styles.buttonDisabled
                        : styles.button
                    }
                  >
                    REINTENTAR
                  </Text>
                </Button>
              </View>
            )}
          </Dialog.Actions>
        </Dialog>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  title: {
    color: theme.PRIMARY_COLOR,
    fontSize: '16@ms0.3'
  },
  paragraph: {
    fontSize: '14@ms0.3'
  },
  button: {
    color: theme.PRIMARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    fontSize: '14@ms0.3'
  },
  buttonDisabled: {
    color: '#AAAAAA',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    fontSize: '14@ms0.3'
  },
  dialog: {
    maxWidth: 400,
    width: '300@ms',
    alignSelf: 'center'
  }
});

export default withStore(UpdateInfoScreen, ['updated', 'updateError']);

UpdateInfoScreen.propTypes = {
  updated: PropTypes.string,
  updateError: PropTypes.bool
};
