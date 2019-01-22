import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { theme } from '../../helpers/styles';
import Logo from '../../components/Logo';

// TODO: add password recovery logic
export default class PasswordRecoveryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userText: ''
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
            style={{ width: 80, height: 80 }}
            source={require('../../assets/user-128.png')}
          />
          <Text style={styles.title}>RECUPERAR CONTRASEÑA</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Ingresá el correo registrado:"
            placeholder="Correo"
            style={styles.input}
            value={this.state.userText}
            onChangeText={text => this.setState({ userText: text })}
          />
        </View>
        <View style={styles.dataButtonContainer}>
          <Button
            mode="contained"
            style={styles.dataButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
            onPress={() => this.props.navigation.navigate('PasswordRecoveryOk')}
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
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    backgroundColor: 'transparent',
    width: 260
  },
  dataButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 30
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
