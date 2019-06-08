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
      user: null
    };
  }

  _onChangeCurrentPassword = text => {
    this.setState({
      passText: text
    });
  };

  _onChangeNewPassword1 = text => {
    this.setState({
      newPass1: text
    });
  };

  _onChangeNewPassword2 = text => {
    this.setState({
      newPass2: text
    });
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
        user: data.related_name + ' ' + data.related_last_name
      });
    }
  }

  render() {
    const { user } = this.state;

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
              value={this.state.passText}
              onChangeText={this._onChangeCurrentPassword}
              styles={styles.input}
            />
            <InputPassword
              label="Nueva Contraseña"
              value={this.state.newPass1}
              onChangeText={this._onChangeNewPassword1}
              styles={styles.input}
            />
            <InputPassword
              label="Repetir Nueva Contraseña"
              value={this.state.newPass2}
              onChangeText={this._onChangeNewPassword2}
              styles={styles.input}
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
              onPress={() => this._changePassword()}
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
