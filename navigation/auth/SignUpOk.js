import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { theme } from '../../helpers/styles';
import Logo from '../../components/Logo';

// TODO: add sign up logic
// TODO: add sign up error
export default class SignUpOkScreen extends React.Component {
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
    const name = this.props.navigation.getParam('name').toUpperCase();

    return (
      <View style={styles.container}>
        <Logo />
        <View style={styles.titleContainer}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require('../../assets/check-64.png')}
          />
          <Text style={styles.title}>¡GRACIAS POR REGISTRARTE!</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.stepsContainer}>
          <Text style={styles.steps}>
            Enviaremos un e-mail de verificación a la dirección de correo que
            registraste.
          </Text>
          <Text style={styles.steps}>Para continuar:</Text>
          <Text style={styles.steps}>1. Cerrá la App.</Text>
          <Text style={styles.steps}>
            2. Ingresá a tu cuenta de e-mail para confirmar tu cuenta haciendo
            click en el link que aparece.
          </Text>
          <Text style={styles.steps}>
            3. Luego podrás ingresar a la App nuevamente.
          </Text>
        </View>
        <View style={styles.closeButtonContainer}>
          <Button
            mode="contained"
            style={styles.closeButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text
              style={styles.closeButtonText}
              theme={{
                colors: {
                  text: '#FFFFFF'
                }
              }}
            >
              CERRAR
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
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    marginTop: 15,
    color: theme.PRIMARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  name: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: 260,
    textAlign: 'center',
    marginTop: 20
  },
  stepsContainer: {
    flex: 4,
    paddingTop: 10,
    alignItems: 'center'
  },
  steps: {
    color: 'grey',
    width: 260,
    fontSize: 13,
    marginTop: 8
  },
  closeButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 30
  },
  closeButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 50
  },
  closeButtonText: {
    fontSize: 16
  }
});
