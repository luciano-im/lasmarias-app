import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { loginValidator, validation } from '../../helpers/validation';
import { getUser, changePassword } from '../../helpers/api';
import { theme } from '../../helpers/styles';
import InputPassword from '../../components/InputPassword';

export default class ModifyPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passText: '',
      newPass1: '',
      newPass2: '',
      errorText: null,
      updating: false,
      user: null,
      passError: '',
      newPass1Error: '',
      newPass2Error: ''
    };
  }

  _onChangeCurrentPassword = text => {
    this.setState({
      passText: text
    });
  };

  _onBlurCurrentPassword = () => {
    this.setState({
      passError: validation('password', this.state.passText, loginValidator)
    });
  };

  _onChangeNewPassword1 = text => {
    this.setState({
      newPass1: text
    });
  };

  _onBlurNewPassword1 = () => {
    this.setState({
      newPass1Error: validation('password', this.state.newPass1, loginValidator)
    });
  };

  _onChangeNewPassword2 = text => {
    this.setState({
      newPass2: text
    });
  };

  _onBlurNewPassword2 = () => {
    this.setState({
      newPass2Error: validation('password', this.state.newPass2, loginValidator)
    });
  };

  _validateChangePassword = () => {
    const passError = validation(
      'password',
      this.state.passText,
      loginValidator
    );
    const newPass1Error = validation(
      'password',
      this.state.newPass1,
      loginValidator
    );
    const newPass2Error = validation(
      'password',
      this.state.newPass2,
      loginValidator
    );

    this.setState({
      passError: passError,
      newPass1Error: newPass1Error,
      newPass2Error: newPass2Error
    });

    if (!passError && !newPass1Error && !newPass2Error) {
      if (this.state.newPass1 !== this.state.newPass2) {
        this.setState({
          newPass2Error: 'Las contraseñas no coinciden'
        });
      } else {
        this._changePassword();
      }
    }
  };

  _changePassword = async () => {
    const { passText, newPass1, newPass2 } = this.state;

    this.setState({
      errorText: null,
      updating: true
    });

    if (passText !== null && newPass1 !== null && newPass2 !== null) {
      const result = await changePassword(passText, newPass1, newPass2);
      if (result.error === false) {
        this.setState({
          updating: false
        });
        this.props.navigation.navigate('Auth');
      } else {
        this.setState({
          errorText: result.msg,
          updating: false
        });
      }
    }
  };

  async _onFocusScreen() {
    const user = await getUser();

    if (user.error === false) {
      const data = user.data;
      this.setState({
        user: data.related_name + ' ' + data.related_last_name,
        passError: '',
        newPass1Error: '',
        newPass2Error: ''
      });
    }
  }

  render() {
    const { user } = this.state;
    const { passText, newPass1, newPass2 } = this.state;
    const { passError, newPass1Error, newPass2Error } = this.state;
    const passIsError = passError ? true : false;
    const newPass1IsError = newPass1Error ? true : false;
    const newPass2IsError = newPass2Error ? true : false;

    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidContainer}
        behavior="padding"
        keyboardVerticalOffset={50}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <NavigationEvents onDidFocus={payload => this._onFocusScreen()} />
          <View style={styles.seller}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons
                name="person"
                size={moderateScale(25, 0.3)}
                color="white"
              />
              <Text
                style={{
                  color: 'white',
                  marginLeft: moderateScale(15, 0.3),
                  fontSize: moderateScale(16, 0.3)
                }}
              >
                {user}
              </Text>
            </View>
            <View>
              <MaterialIcons
                name="account-box"
                size={moderateScale(25, 0.3)}
                color="white"
              />
            </View>
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>CAMBIAR CONTRASEÑA</Text>
          </View>
          <View style={styles.inputContainer}>
            <InputPassword
              label="Ingresá la Contraseña actual"
              placeholder="Contraseña"
              styles={styles.input}
              value={passText}
              onChangeText={this._onChangeCurrentPassword}
              onBlur={this._onBlurCurrentPassword}
              error={passIsError}
              errorText={passError}
              autoCapitalize="none"
            />
            <InputPassword
              label="Nueva Contraseña"
              placeholder="Contraseña"
              styles={styles.input}
              value={newPass1}
              onChangeText={this._onChangeNewPassword1}
              onBlur={this._onBlurNewPassword1}
              error={newPass1IsError}
              errorText={newPass1Error}
              autoCapitalize="none"
            />
            <InputPassword
              label="Repetir Nueva Contraseña"
              placeholder="Contraseña"
              styles={styles.input}
              value={newPass2}
              onChangeText={this._onChangeNewPassword2}
              onBlur={this._onBlurNewPassword2}
              error={newPass2IsError}
              errorText={newPass2Error}
              autoCapitalize="none"
            />
            {this.state.errorText ? (
              <Text style={styles.error}>{this.state.errorText}</Text>
            ) : null}
          </View>
          <View>
            <ActivityIndicator
              animating={this.state.updating}
              color={theme.PRIMARY_COLOR}
              size={moderateScale(25, 0.3)}
              style={styles.loading}
            />
          </View>
          <Text style={styles.line} />
          <Text style={styles.legend}>
            Al guardar la nueva Contraseña serás deslogueado y redirigido a la
            pantalla de Login para que ingreses con tu Correo Usuario y la nueva
            Contraseña.
          </Text>
          <View style={styles.saveButtonContainer}>
            <Button
              mode="contained"
              style={styles.saveButton}
              color={theme.ACCENT_COLOR}
              theme={{ roundness: 0 }}
              onPress={() => this._validateChangePassword()}
            >
              <Text
                style={styles.saveButtonText}
                theme={{
                  colors: {
                    text: '#FFFFFF'
                  }
                }}
              >
                CAMBIAR CONTRASEÑA
              </Text>
            </Button>
          </View>
        </ScrollView>
        <View style={styles.backButtonContainer}>
          <Button
            mode="contained"
            style={styles.backButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Text
              style={styles.backButtonText}
              theme={{
                colors: {
                  text: '#FFFFFF'
                }
              }}
            >
              SALIR
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
    // flex: 1
  },
  seller: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '10@ms0.3',
    paddingHorizontal: '10@ms0.3',
    marginTop: '5@ms0.3',
    backgroundColor: theme.ACCENT_COLOR
  },
  title: {
    paddingVertical: '3@ms0.3',
    paddingHorizontal: '10@ms0.3',
    marginVertical: '5@ms0.3',
    backgroundColor: theme.PRIMARY_COLOR
  },
  titleText: {
    fontSize: '19@ms0.3',
    color: 'white',
    textAlign: 'center'
  },
  line: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#AAA',
    width: '90%',
    marginTop: '20@ms0.3',
    marginBottom: '10@ms0.3'
  },
  legend: {
    color: 'grey',
    paddingHorizontal: '30@ms0.3',
    textAlign: 'center',
    fontSize: '13@ms0.3'
  },
  inputContainer: {
    alignItems: 'center',
    marginTop: '20@ms0.3'
  },
  input: {
    backgroundColor: 'transparent',
    width: '260@ms0.3'
  },
  saveButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '20@ms0.3',
    marginVertical: '25@ms0.3',
    marginBottom: '80@ms0.3'
  },
  saveButton: {
    width: '280@ms0.3'
  },
  saveButtonText: {
    fontSize: '14@ms0.3'
  },
  backButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginTop: '30@ms0.3'
  },
  backButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: '50@ms0.3'
  },
  backButtonText: {
    fontSize: '16@ms0.3'
  },
  loading: {
    marginTop: '10@ms0.3'
  },
  error: {
    color: 'red',
    marginVertical: '10@ms0.3',
    textAlign: 'center',
    width: '250@ms0.3'
  }
});
