import React from 'react';
import {
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { theme } from '../../helpers/styles';
import Logo from '../../components/Logo';
import InputPassword from '../../components/InputPassword';

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userText: '',
      passText: '',
      passText2: '',
      errorText: null
    };
  }

  _onChangePassword = text => {
    this.setState({
      passText: text
    });
  };

  _onChangePassword2 = text => {
    this.setState({
      passText2: text
    });
  };

  _navigateSignUp2 = () => {
    if (
      this.state.userText === '' ||
      this.state.passText === '' ||
      this.state.passText2 === ''
    ) {
      this.setState({
        errorText: 'Debe completar Correo y Contraseña'
      });
    } else {
      if (this.state.passText !== this.state.passText2) {
        this.setState({
          errorText: 'Las contraseñas no coinciden'
        });
      } else {
        this.setState({
          errorText: null
        });
        this.props.navigation.navigate('SignUp2', {
          email: this.state.userText,
          password: this.state.passText,
          password2: this.state.passText2
        });
      }
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidContainer}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <ScrollView style={styles.container}>
          <Logo />
          <View style={styles.titleContainer}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require('../../assets/user-128.png')}
            />
            <Text style={styles.title}>REGISTRATE</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label="Ingresá tu Correo:"
              placeholder="Correo"
              autoCapitalize={'none'}
              autoComplete="email"
              keyboardType="email-address"
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
            <InputPassword
              label="Repetir Contraseña:"
              value={this.state.passText2}
              onChangeText={this._onChangePassword2}
              styles={styles.input}
            />
            {this.state.errorText ? (
              <Text style={styles.error}>{this.state.errorText}</Text>
            ) : null}
            <Text style={styles.helpText}>
              (Usa 8 o más caracteres con una combinacion de letras, números y
              simbolos).
            </Text>
          </View>
        </ScrollView>
        <View style={styles.nextButtonContainer}>
          <Button
            mode="contained"
            style={styles.nextButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
            onPress={() => this._navigateSignUp2()}
          >
            <Text
              style={styles.nextButtonText}
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
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  keyboardAvoidContainer: {
    flex: 1
  },
  container: {
    flex: 1
    // justifyContent: 'center'
  },
  titleContainer: {
    flex: 3.5,
    flexDirection: 'row',
    justifyContent: 'center'
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
    justifyContent: 'flex-start',
    marginTop: 30
  },
  input: {
    backgroundColor: 'transparent',
    width: 260
  },
  error: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
    width: 250
  },
  helpText: {
    color: 'grey',
    width: 260,
    fontSize: 13,
    marginTop: 10
  },
  nextButtonContainer: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  nextButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 50
  },
  nextButtonText: {
    fontSize: 16
  }
});
