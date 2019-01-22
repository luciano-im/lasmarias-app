import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { theme } from '../../helpers/styles';
import Logo from '../../components/Logo';
import InputPassword from '../../components/InputPassword';

// TODO: add sign up logic
export default class SignUpScreen extends React.Component {
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
            style={{ width: 40, height: 40 }}
            source={require('../../assets/user-128.png')}
          />
          <Text style={styles.title}>REGISTRATE</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Ingresá tu Correo:"
            placeholder="Correo"
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
          <Text style={styles.helpText}>
            (Usa 8 o más caracteres con una combinacion de letras, números y
            simbolos).
          </Text>
        </View>
        <View style={styles.nextButtonContainer}>
          <Button
            mode="contained"
            style={styles.nextButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
            onPress={() => this.props.navigation.navigate('SignUp2')}
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
    flex: 2.5,
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
    flex: 5,
    alignItems: 'center'
  },
  input: {
    backgroundColor: 'transparent',
    width: 260
  },
  helpText: {
    color: 'grey',
    width: 260,
    fontSize: 12,
    marginTop: 8
  },
  nextButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 30
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
