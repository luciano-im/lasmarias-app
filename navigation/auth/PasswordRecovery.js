import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import { loginValidator, validation } from '../../helpers/validation';
import { resetPassword } from '../../helpers/api';
import { theme } from '../../helpers/styles';
import Logo from '../../components/Logo';
import InputText from '../../components/InputText';
import Reactotron from 'reactotron-react-native';

export default class PasswordRecoveryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userText: '',
      errorText: null,
      loading: false,
      userError: ''
    };
  }

  _onChangeUser = text => {
    this.setState({
      userText: text
    });
  };

  _onBlurUser = () => {
    this.setState({
      userError: validation('email', this.state.userText, loginValidator)
    });
  };

  _validateReset = () => {
    const emailError = validation('email', this.state.userText, loginValidator);

    this.setState({
      userError: emailError
    });

    if (!emailError) {
      this._resetPassword();
    }
  };

  _resetPassword = async () => {
    this.setState({
      loginError: null,
      loading: true
    });
    await resetPassword(this.state.userText)
      .then(response => {
        // Reactotron.log(response);
        if (response.error === false) {
          this.setState({
            loading: false
          });
          this.props.navigation.navigate('PasswordRecoveryOk');
        } else {
          this.setState({
            errorText: error.msg,
            loading: false
          });
        }
      })
      .catch(error => {
        // Reactotron.error(error);
        this.setState({
          loading: false
        });
      });
  };

  render() {
    const { userText } = this.state;
    const { userError } = this.state;
    const userIsError = userError ? true : false;

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
            <Text style={styles.title}>RECUPERAR CONTRASEÑA</Text>
          </View>
          <View style={styles.inputContainer}>
            <InputText
              label="Ingresá el correo registrado:"
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
            {this.state.errorText ? (
              <Text style={styles.error}>{this.state.errorText}</Text>
            ) : null}
          </View>
        </ScrollView>
        <View style={styles.dataButtonContainer}>
          <Button
            mode="contained"
            style={styles.dataButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
            onPress={() => this._validateReset()}
          >
            <Text
              style={styles.dataButtonText}
              theme={{
                colors: {
                  text: '#FFFFFF'
                }
              }}
            >
              SOLICITAR DATOS
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
    // justifyContent: 'center'
  },
  titleContainer: {
    flex: 3.5,
    alignItems: 'center',
    justifyContent: 'flex-end'
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
    justifyContent: 'center',
    marginTop: '30@ms0.3'
  },
  input: {
    backgroundColor: 'transparent',
    fontSize: '14@ms0.3',
    width: '260@ms0.3'
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
  dataButtonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '30@ms0.3',
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  dataButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: '50@ms0.3'
  },
  dataButtonText: {
    fontSize: '16@ms0.3'
  }
});
