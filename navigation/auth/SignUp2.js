import React from 'react';
import {
  AsyncStorage,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { theme } from '../../helpers/styles';
import { signUp, saveUserProfile } from '../../helpers/api';
import Logo from '../../components/Logo';
import Reactotron from 'reactotron-react-native';

// TODO: add sign up logic
export default class SignUp2Screen extends React.Component {
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
      zipText: '',
      errorText: null
    };
  }

  _saveData = async () => {
    try {
      await AsyncStorage.setItem('SignUpData', JSON.stringify(this.state));
    } catch (error) {
      Reactotron.error('Error saving data');
    }
    this.props.navigation.goBack();
  };

  _getData = async () => {
    try {
      return await AsyncStorage.getItem('SignUpData');
    } catch (error) {
      Reactotron.error('Error retrieving data');
    }
  };

  _removeData = async () => {
    try {
      await AsyncStorage.removeItem('SignUpData');
    } catch (error) {
      Reactotron.error('Error deleting data');
    }
  };

  _signUp = async () => {
    const email = await this.props.navigation.getParam('email');
    const password = await this.props.navigation.getParam('password');
    const password2 = await this.props.navigation.getParam('password2');

    this._removeData();

    await signUp(email, password, password2).then(response => {
      Reactotron.log(response);
      if (response.error === false) {
        await saveUserProfile(email, this.state).then(response => {
          Reactotron.log(response);
        });
        // this.props.navigation.navigate('SignUpResult');
      } else {
        this.setState({
          errorText: response.msg
        });
      }
    });
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this._saveData);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._saveData);
  }

  async componentDidMount() {
    const data = await this._getData();
    await this._removeData();
    this.setState(JSON.parse(data));
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidContainer}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
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
              autoComplete="tel"
              keyboardType="number-pad"
              style={styles.input}
              value={this.state.telText}
              onChangeText={text => this.setState({ telText: text })}
            />
            <TextInput
              label="Celular"
              placeholder="Celular"
              autoComplete="tel"
              keyboardType="number-pad"
              style={styles.input}
              value={this.state.celText}
              onChangeText={text => this.setState({ celText: text })}
            />
            <TextInput
              label="Dirección del Comercio"
              placeholder="Dirección del Comercio"
              autoComplete="street-address"
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
              autoComplete="postal-code"
              style={styles.input}
              value={this.state.zipText}
              onChangeText={text => this.setState({ zipText: text })}
            />
            {this.state.errorText ? (
              <Text style={styles.error}>{this.state.errorText}</Text>
            ) : null}
          </View>
          <View style={styles.nextButtonContainer}>
            <Button
              mode="contained"
              style={styles.nextButton}
              color={theme.ACCENT_COLOR}
              theme={{ roundness: 0 }}
              onPress={() => this._signUp()}
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
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  keyboardAvoidContainer: {
    flex: 1
  },
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
  error: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
    width: 250
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
