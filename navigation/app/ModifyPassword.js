import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import { getUser, changePassword } from '../../helpers/api';
import { theme } from '../../helpers/styles';
import InputPassword from '../../components/InputPassword';

// TODO: add logic
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

  _changePassword = () => {
    const { passText, newPass1, newPass2 } = this.state;

    this.setState({
      errorText: null,
      updating: true
    });

    if (passText !== null && newPass1 !== null && newPass2 !== null) {
      const result = changePassword(passText, newPass1, newPass2);

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
      <ScrollView contentContainerStyle={styles.container}>
        <NavigationEvents onDidFocus={payload => this._onFocusScreen()} />
        <View style={styles.seller}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="person" size={25} color="white" />
            <Text style={{ color: 'white', marginLeft: 15, fontSize: 16 }}>
              {user}
            </Text>
          </View>
          <View>
            <MaterialIcons name="account-box" size={25} color="white" />
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
        <Text style={styles.line} />
        <View>
          <ActivityIndicator
            animating={this.state.updating}
            color={theme.PRIMARY_COLOR}
            size={'large'}
            style={[
              styles.loading,
              { display: this.state.updating ? 'flex' : 'none' }
            ]}
          />
        </View>
        {/* <Text style={styles.legend}>
          Al guardar la nueva Contraseña serás deslogueado y redirigido a la
          pantalla de Login para que ingreses con tu Correo Usuario y la nueva
          Contraseña.
        </Text> */}
        <View style={styles.nextButtonContainer}>
          <Button
            mode="contained"
            style={styles.nextButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
            onPress={() => this._changePassword()}
          >
            <Text
              style={styles.nextButtonText}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  seller: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: theme.ACCENT_COLOR
  },
  title: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: theme.PRIMARY_COLOR
  },
  titleText: {
    fontSize: 19,
    color: 'white',
    textAlign: 'center'
  },
  line: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#AAA',
    width: '90%',
    marginTop: 40,
    marginBottom: 10
  },
  legend: {
    color: 'grey',
    paddingHorizontal: 30,
    textAlign: 'center'
  },
  inputContainer: {
    // flex: 5,
    alignItems: 'center',
    marginTop: 40
  },
  input: {
    backgroundColor: 'transparent',
    width: 260
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginTop: 30
  },
  nextButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 50
  },
  nextButtonText: {
    fontSize: 16
  },
  loading: {
    marginVertical: 10
  },
  error: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
    width: 250
  }
});
