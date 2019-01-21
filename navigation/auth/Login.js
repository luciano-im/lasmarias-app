import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../helpers/styles';
import Logo from '../../components/Logo';

// TODO: creat the login screen
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userText: '',
      passText: '',
      passwordHide: true,
      passwordIcon: 'visibility-off'
    };
  }

  _changePwdType = () => {
    if (this.state.passwordIcon === 'visibility-off') {
      this.setState({
        passwordIcon: 'visibility',
        passwordHide: false
      });
    } else {
      this.setState({
        passwordIcon: 'visibility-off',
        passwordHide: true
      });
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Logo />
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{ width: 80, height: 80 }}
            source={require('../../assets/user-128.png')}
          />
          <Text style={[styles.title, { color: theme.PRIMARY_COLOR }]}>
            INGRESÁ
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Usuario"
            placeholder="Correo"
            style={[styles.input, { marginBottom: 20 }]}
            value={this.state.userText}
            onChangeText={text => this.setState({ userText: text })}
          />
          <View>
            <TextInput
              style={styles.input}
              autoCapitalize={'none'}
              label="Contraseña"
              placeholder="Contraseña"
              secureTextEntry={this.state.passwordHide}
              value={this.state.passText}
              onChangeText={text => this.setState({ passText: text })}
            />
            <MaterialIcons
              style={styles.password}
              name={this.state.passwordIcon}
              size={22}
              onPress={() => this._changePwdType()}
            />
          </View>
        </View>
        <View>
          <Button
            mode="text"
            compact={true}
            color="red"
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('ForgetPassword');
            }}
          >
            <Text uppercase={false}>Olvidé mi Contraseña</Text>
          </Button>
          <Button
            mode="text"
            compact={true}
            color="red"
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('SignUp');
            }}
          >
            <Text uppercase={false}>Registrarse</Text>
          </Button>
        </View>
        <View style={styles.loginButtonContainer}>
          <Button
            mode="contained"
            style={styles.loginButton}
            color={theme.ACCENT_COLOR}
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
  title: {
    fontSize: 22,
    marginTop: 10
  },
  inputContainer: {
    alignItems: 'center'
  },
  input: {
    backgroundColor: 'transparent',
    width: 250
  },
  password: {
    position: 'absolute',
    right: 0,
    top: 30
  },
  button: {
    marginVertical: 0
  },
  loginButtonContainer: {
    alignItems: 'center'
  },
  loginButton: {
    width: 200,
    margin: 20
  }
});
