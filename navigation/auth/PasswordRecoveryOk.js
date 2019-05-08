import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import { theme } from '../../helpers/styles';
import Logo from '../../components/Logo';

export default class PasswordRecoveryOkScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <View style={styles.titleContainer}>
          <Image
            style={styles.titleImage}
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

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '50@ms0.3'
  },
  titleImage: {
    maxWidth: 60,
    height: '40@ms0.3',
    width: '40@ms0.3'
  },
  title: {
    fontSize: '18@ms0.3',
    marginTop: '15@ms0.3',
    color: theme.PRIMARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: '260@ms0.3',
    marginVertical: '15@ms0.3'
  },
  steps: {
    color: 'grey',
    width: '260@ms0.3',
    fontSize: '13@ms0.3',
    marginTop: '8@ms0.3',
    textAlign: 'center'
  },
  closeButtonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '30@ms0.3'
  },
  closeButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: '50@ms0.3'
  },
  closeButtonText: {
    fontSize: '16@ms0.3'
  }
});
