import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { theme } from '../../helpers/styles';
import Logo from '../../components/Logo';

// TODO: add sign up logic
export default class SignUpScreen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameText: '',
      lastNameText: '',
      businessText: '',
      telText: '',
      celText: '',
      addressText: '',
      cityText: '',
      zipText: ''
    };
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Logo />
        <View style={styles.titleContainer}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require('../../assets/user-128.png')}
          />
          <Text style={styles.title}>REGISTRATE</Text>
        </View>
        <Text style={styles.sub}>Ingresá tus Datos Personales:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            label="Nombre"
            placeholder="Nombre"
            style={styles.input}
            value={this.state.nameText}
            onChangeText={text => this.setState({ nameText: text })}
          />
          <TextInput
            label="Apellido"
            placeholder="Apellido"
            style={styles.input}
            value={this.state.lastNameText}
            onChangeText={text => this.setState({ lastNameText: text })}
          />
          <TextInput
            label="Nombre del Comercio"
            placeholder="Nombre del Comercio"
            style={styles.input}
            value={this.state.businessText}
            onChangeText={text => this.setState({ businessText: text })}
          />
          <TextInput
            label="Teléfono"
            placeholder="Teléfono"
            style={styles.input}
            value={this.state.telText}
            onChangeText={text => this.setState({ telText: text })}
          />
          <TextInput
            label="Celular"
            placeholder="Celular"
            style={styles.input}
            value={this.state.celText}
            onChangeText={text => this.setState({ celText: text })}
          />
          <TextInput
            label="Dirección del Comercio"
            placeholder="Dirección del Comercio"
            style={styles.input}
            value={this.state.addressText}
            onChangeText={text => this.setState({ addressText: text })}
          />
          <TextInput
            label="Ciudad"
            placeholder="Ciudad"
            style={styles.input}
            value={this.state.cityText}
            onChangeText={text => this.setState({ cityText: text })}
          />
          <TextInput
            label="Código Postal"
            placeholder="Código Postal"
            style={styles.input}
            value={this.state.zipText}
            onChangeText={text => this.setState({ zipText: text })}
          />
        </View>
        <View style={styles.nextButtonContainer}>
          <Button
            mode="contained"
            style={styles.nextButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
          >
            <Text
              style={styles.nextButtonText}
              theme={{
                colors: {
                  text: '#FFFFFF'
                }
              }}
            >
              CREAR CUENTA
            </Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center'
  },
  titleContainer: {
    // flex: 2.5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    fontSize: 22,
    marginTop: 10,
    color: theme.PRIMARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  sub: {
    fontSize: 14,
    width: 260,
    alignSelf: 'center',
    marginTop: 40,
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  inputContainer: {
    // flex: 5,
    alignItems: 'center'
  },
  input: {
    backgroundColor: 'transparent',
    width: 260
  },
  nextButtonContainer: {
    // flex: 1,
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
