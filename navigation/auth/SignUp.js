import React from 'react';
import {
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import { registerValidator, validation } from '../../helpers/validation';
import { theme } from '../../helpers/styles';
import Logo from '../../components/Logo';
import InputPassword from '../../components/InputPassword';
import InputText from '../../components/InputText';

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userText: '',
      passText: '',
      passText2: '',
      errorText: null,
      userError: '',
      passError: '',
      passError2: ''
    };
  }

  _onChangePassword = text => {
    this.setState({
      passText: text
    });
  };

  _onBlurPassword = () => {
    this.setState({
      passError: validation('password', this.state.passText, registerValidator)
    });
  };

  _onChangePassword2 = text => {
    this.setState({
      passText2: text
    });
  };

  _onBlurPassword2 = () => {
    this.setState({
      passError2: validation('password', this.state.passText, registerValidator)
    });
  };

  _onChangeUser = text => {
    this.setState({
      userText: text
    });
  };

  _onBlurUser = () => {
    this.setState({
      userError: validation('email', this.state.userText, registerValidator)
    });
  };

  _validateNavigateSignUp2 = () => {
    const emailError = validation(
      'email',
      this.state.userText,
      registerValidator
    );
    const passwordError = validation(
      'password',
      this.state.passText,
      registerValidator
    );
    const password2Error = validation(
      'password',
      this.state.passText2,
      registerValidator
    );

    this.setState({
      userError: emailError,
      passError: passwordError,
      passError2: password2Error
    });

    if (!emailError && !passwordError && !password2Error) {
      if (this.state.passText !== this.state.passText2) {
        this.setState({
          passError2: 'Las contraseñas no coinciden'
        });
      } else {
        this._navigateSignUp2();
      }
    }
  };

  _navigateSignUp2 = () => {
    this.setState({
      errorText: null
    });
    this.props.navigation.navigate('SignUp2', {
      email: this.state.userText,
      password: this.state.passText,
      password2: this.state.passText2
    });
  };

  render() {
    const { userText, passText, passText2 } = this.state;
    const { userError, passError, passError2 } = this.state;
    const userIsError = userError ? true : false;
    const passIsError = passError ? true : false;
    const pass2IsError = passError2 ? true : false;

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
              style={styles.titleImage}
              source={require('../../assets/user-128.png')}
            />
            <Text style={styles.title}>REGISTRATE</Text>
          </View>
          <View style={styles.inputContainer}>
            <InputText
              label="Ingresá tu Correo:"
              placeholder="Correo"
              style={styles.input}
              value={userText}
              onChangeText={this._onChangeUser}
              onBlur={this._onBlurUser}
              error={userIsError}
              errorText={userError}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
            />
            <InputPassword
              label="Ingresá tu Contraseña:"
              placeholder="Contraseña"
              styles={styles.input}
              value={passText}
              onChangeText={this._onChangePassword}
              onBlur={this._onBlurPassword}
              error={passIsError}
              errorText={passError}
              autoCapitalize="none"
            />
            <InputPassword
              label="Repetir Contraseña:"
              placeholder="Contraseña"
              styles={styles.input}
              value={passText2}
              onChangeText={this._onChangePassword2}
              onBlur={this._onBlurPassword2}
              error={pass2IsError}
              errorText={passError2}
              autoCapitalize="none"
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
            onPress={() => this._validateNavigateSignUp2()}
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

const styles = ScaledSheet.create({
  keyboardAvoidContainer: {
    flex: 1
  },
  container: {
    flex: 1
    // marginBottom: '40@ms0.3'
  },
  titleContainer: {
    flex: 3.5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  titleImage: {
    maxWidth: 128,
    height: '40@ms0.3',
    width: '40@ms0.3'
  },
  title: {
    fontSize: '22@ms0.3',
    marginTop: '10@ms0.3',
    color: theme.PRIMARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  inputContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '10@ms0.3'
  },
  input: {
    backgroundColor: 'transparent',
    width: '260@ms0.3'
  },
  error: {
    color: 'red',
    marginVertical: '10@ms0.3',
    textAlign: 'center',
    width: '250@ms0.3'
  },
  helpText: {
    color: 'grey',
    width: '260@ms0.3',
    fontSize: '13@ms0.3',
    marginTop: '5@ms0.3'
  },
  nextButtonContainer: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: '30@ms0.3',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  nextButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: '50@ms0.3'
  },
  nextButtonText: {
    fontSize: '16@ms0.3'
  }
});
