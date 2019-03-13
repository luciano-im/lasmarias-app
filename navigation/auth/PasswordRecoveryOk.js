import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { theme } from '../../helpers/styles';
import Logo from '../../components/Logo';

// TODO: add password recovery logic
export default class PasswordRecoveryOkScreen extends React.Component {
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
            source={require('../../assets/check-64.png')}
          />
          <Text style={styles.title}>¡SOLICITUD ENVIADA!</Text>
          <Text style={styles.line} />
          <Text style={styles.steps}>
            Recibiras un correo con los datos de acceso para ingresar nuevamente
            a la App.
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50
  },
  title: {
    fontSize: 18,
    marginTop: 15,
    color: theme.PRIMARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: 260,
    marginVertical: 15
  },
  steps: {
    color: 'grey',
    width: 260,
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center'
  },
  closeButtonContainer: {
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
