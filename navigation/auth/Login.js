import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { theme } from '../../helpers/styles';
import Logo from '../../components/Logo';
import InputPassword from '../../components/InputPassword';

// TODO: add login logic
export default class LoginScreen extends React.Component {
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
      <View style={styles.container}>
        <Logo />
        <View style={styles.titleContainer}>
          <Image
            style={{ width: 80, height: 80 }}
            source={require('../../assets/user-128.png')}
          />
          <Text style={styles.title}>INGRESÁ</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Usuario"
            placeholder="Correo"
            style={styles.input}
            value={this.state.userText}
            onChangeText={text => this.setState({ userText: text })}
          />
          <InputPassword
            label="Contraseña"
            value={this.state.passText}
            onChangeText={this._onChangePassword}
            styles={styles.input}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonFirst}
            onPress={() => {
              this.props.navigation.navigate('ForgetPassword');
            }}
          >
            <Text uppercase={false} style={styles.button}>
              Olvidé mi Contraseña
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('SignUp');
            }}
          >
            <Text uppercase={false} style={styles.button}>
              Registrarse
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginButtonContainer}>
          <Button
            mode="contained"
            style={styles.loginButton}
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
              INGRESAR
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  titleContainer: {
    flex: 3.5,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 22,
    marginTop: 10,
    color: theme.PRIMARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  inputContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  input: {
    backgroundColor: 'transparent',
    width: 260
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10
  },
  button: {
    color: 'red'
  },
  buttonFirst: {
    marginBottom: 8
  },
  loginButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginTop: 30
  },
  loginButton: {
    width: 280
  }
});
