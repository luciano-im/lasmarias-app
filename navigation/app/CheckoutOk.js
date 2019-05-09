import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import { theme } from '../../helpers/styles';
import Logo from '../../components/Logo';
import SelectCustomer from '../../components/SelectCustomer';

export default class CheckoutOkScreen extends React.Component {
  render() {
    const order = this.props.navigation.getParam('order');

    return (
      <View style={styles.container}>
        <SelectCustomer navigation={this.props.navigation} />
        <Logo />
        <View style={styles.titleContainer}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require('../../assets/check-64.png')}
          />
          <Text style={styles.title}>¡PEDIDO REALIZADO!</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.textContainer}>
          {/* <Text style={styles.text}>
            Te enviamos el detalle del pedido por e-mail.
          </Text> */}
          <Text style={styles.text}>Nro de Pedido:</Text>
          <Text style={[styles.text, styles.state]}>{order}</Text>
          <Text style={styles.text}>Tu pedido se encuentra:</Text>
          <Text style={[styles.text, styles.state]}>PENDIENTE</Text>
          <Text style={styles.text}>
            Segui el estado del pedido ingresando al menú{' '}
            <Text style={{ color: '#111' }}>Mis Pedidos</Text>
          </Text>
        </View>
        <View style={styles.closeButtonContainer}>
          <Button
            mode="contained"
            style={styles.closeButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
            onPress={() => this.props.navigation.navigate('Home')}
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
    flex: 2.5,
    alignItems: 'center'
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
    marginTop: '20@ms0.3'
  },
  textContainer: {
    flex: 4,
    paddingTop: '10@ms0.3',
    alignItems: 'center'
  },
  text: {
    color: 'grey',
    width: '260@ms0.3',
    fontSize: '13@ms0.3',
    marginTop: '8@ms0.3',
    textAlign: 'center'
  },
  state: {
    fontSize: '18@ms0.3',
    color: theme.PRIMARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  closeButtonContainer: {
    flex: 1,
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
