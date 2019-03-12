import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { resetPassword } from '../../helpers/api';
import { theme } from '../../helpers/styles';
import Logo from '../../components/Logo';

export default class PasswordRecoveryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userText: '',
      errorText: null,
      loading: false
    };
  }

  _onChangePassword = text => {
    this.setState({
      passText: text
    });
  };

  _resetPassword = async () => {
    this.setState({
      loginError: null,
      loading: true
    });
    await resetPassword(this.state.passText).then(response => {
      Reactotron.log(response);
      // if (response.error === false) {
      //   this.props.navigation.navigate('App');
      // } else {
      //   this.setState({
      //     loginError: response.msg,
      //     loading: false
      //   });
      // }

      // this.props.navigation.navigate('PasswordRecoveryOk')
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
              style={{ width: 80, height: 80 }}
              source={require('../../assets/user-128.png')}
            />
            <Text style={styles.title}>RECUPERAR CONTRASEÑA</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label="Ingresá el correo registrado:"
              placeholder="Correo"
              autoCapitalize={'none'}
              autoComplete="email"
              keyboardType="email-address"
              style={styles.input}
              value={this.state.userText}
              onChangeText={text => this.setState({ userText: text })}
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
        </ScrollView>
        <View style={styles.dataButtonContainer}>
          <Button
            mode="contained"
            style={styles.dataButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
            onPress={() => this._resetPassword()}
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
    justifyContent: 'center',
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
  loading: {
    marginVertical: 10
  },
  dataButtonContainer: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 30,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  dataButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 50
  },
  dataButtonText: {
    fontSize: 16
  }
});
