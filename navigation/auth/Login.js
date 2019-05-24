import React from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import { withStore } from '@spyna/react-store';
import Sentry from 'sentry-expo';
import { theme } from '../../helpers/styles';
import { login } from '../../helpers/api';
import Logo from '../../components/Logo';
import InputPassword from '../../components/InputPassword';
import Reactotron from 'reactotron-react-native';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userText: '',
      passText: '',
      loginError: null,
      loading: false
    };
  }

  _onChangePassword = text => {
    this.setState({
      passText: text
    });
  };

  _login = async () => {
    this.setState({
      loginError: null,
      loading: true
    });
    await login(this.state.userText, this.state.passText).then(response => {
      if (response.error === false) {
        this.props.store.set('userData', {
          userType: response.userType,
          userName: response.userName,
          userLastName: response.userLastName,
          userEmail: response.userEmail
        });

        // Set Sentry scope
        Sentry.setUserContext({
          email: response.userEmail,
          extra: {
            userType: response.userType,
            name: response.userName,
            lastName: response.userLastName
          }
        });

        this.props.navigation.navigate('App');
      } else {
        this.setState({
          loginError: response.msg,
          loading: false
        });
      }
    });
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
              style={styles.titleImage}
              source={require('../../assets/user-128.png')}
            />
            <Text style={styles.title}>INGRESÁ</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label="Usuario"
              placeholder="Correo"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
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
            <View>
              <ActivityIndicator
                animating={this.state.loading}
                color={theme.PRIMARY_COLOR}
                size={'large'}
                style={[
                  styles.loading,
                  { display: this.state.loading ? 'flex' : 'none' }
                ]}
              />
            </View>
            {this.state.loginError ? (
              <Text style={styles.error}>{this.state.loginError}</Text>
            ) : null}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonFirst}
              onPress={() => {
                this.props.navigation.navigate('PasswordRecovery');
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
              onPress={() => this._login()}
            >
              <Text
                style={styles.loginButtonText}
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
        </ScrollView>
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
    // justifyContent: 'center'
  },
  titleContainer: {
    flex: 3.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '10@ms0.3'
  },
  titleImage: {
    maxWidth: 128,
    height: '80@ms0.3',
    width: '80@ms0.3'
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
    justifyContent: 'flex-start'
  },
  input: {
    backgroundColor: 'transparent',
    width: '260@ms0.3',
    fontSize: '14@ms0.3'
  },
  error: {
    color: 'red',
    marginVertical: '10@ms0.3',
    textAlign: 'center',
    width: '250@ms0.3'
  },
  loading: {
    marginVertical: '10@ms0.3'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10@ms0.3'
  },
  button: {
    color: theme.PRIMARY_COLOR,
    fontSize: '14@ms0.3'
  },
  buttonFirst: {
    marginBottom: '8@ms0.3'
  },
  loginButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20@ms0.3',
    marginTop: '30@ms0.3'
  },
  loginButton: {
    width: '280@ms0.3'
  },
  loginButtonText: {
    fontSize: '14@ms0.3'
  }
});

export default withStore(LoginScreen, ['userData']);
