import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { theme } from '../../helpers/styles';
import Logo from '../../components/Logo';
import InputPassword from '../../components/InputPassword';

// TODO: Create the sign up screen
export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userText: '',
      passText: ''
    };
  }

  _onChangePassword = text => {
    this.setState({
      passText: text
    });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Logo />
        <View style={{ flexDirection: 'column' }}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require('../../assets/user-128.png')}
          />
          <Text style={[styles.title, { color: theme.PRIMARY_COLOR }]}>
            REGISTRATE
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Ingresá tu Correo:"
            placeholder="Correo"
            style={styles.input}
            value={this.state.userText}
            onChangeText={text => this.setState({ userText: text })}
          />
          <InputPassword
            label="Ingresá tu Contraseña:"
            value={this.state.passText}
            onChangeText={this._onChangePassword}
            styles={styles.input}
          />
          <Text style={styles.helpText}>
            (Usa 8 o más caracteres con una combinacion de letras, números y
            simbolos).
          </Text>
        </View>
        <View style={styles.nextButtonContainer}>
          <Button
            mode="contained"
            style={styles.nextButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
          >
            <Text
              theme={{
                colors: {
                  text: '#FFFFFF'
                }
              }}
            >
              SIGUIENTE
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginTop: 10
  },
  inputContainer: {
    //flex: 1
  },
  input: {
    backgroundColor: 'transparent',
    width: 260
  },
  nextButtonContainer: {
    alignItems: 'center',
    //margin: 20,
    //marginTop: 30,
    flex: 1
  },
  nextButton: {
    //width: 280
  },
  helpText: {
    color: 'grey',
    width: 260,
    fontSize: 12
  }
});
