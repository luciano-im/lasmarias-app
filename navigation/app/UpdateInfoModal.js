import React from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Dialog, Text } from 'react-native-paper';
import { theme } from '../../helpers/styles';

export default class UpdateInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_one: true,
      modal_two: false,
      updating: '',
      buttonDisabled: true
    };
  }

  _changeDialog = () => {
    this.setState({
      modal_one: false,
      modal_two: true
    });
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
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }}
      >
        <Dialog visible={this.state.modal_one} dismissable={false}>
          <Dialog.Title style={styles.title}>ATENCION!</Dialog.Title>
          <Dialog.Content>
            <Text>Se actualizaron datos en la App!</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={this._changeDialog}>
              <Text style={styles.button}>ACTUALIZAR</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={this.state.modal_two} dismissable={false}>
          <Dialog.Title style={styles.title}>ACTUALIZACIÓN</Dialog.Title>
          <Dialog.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ActivityIndicator
                color={theme.PRIMARY_COLOR}
                size={30}
                style={{ marginRight: 16 }}
              />
              <Text>Actualizando {this.state.updating}...</Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={this._changeDialog}
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
          </Dialog.Actions>
        </Dialog>
      </View>

      //     style={{
      //       flex: 1,
      //       alignItems: 'center',
      //       justifyContent: 'center',
      //       backgroundColor: 'rgba(0, 0, 0, 0.3)'
      //     }}
      //   >
      //     <View
      //       style={{
      //         backgroundColor: 'white',
      //         padding: 16,
      //         borderRadius: 6,
      //         elevation: 6,
      //         shadowColor: 'black',
      //         shadowOpacity: 0.15,
      //         shadowOffset: { width: 0, height: 2 },
      //         shadowRadius: 10
      //       }}
      //     >
      //       <Text>Este es mi texto</Text>
      //     </View>
      //   </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: theme.PRIMARY_COLOR
  },
  button: {
    color: theme.PRIMARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  buttonDisabled: {
    color: '#AAAAAA',
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  }
});
