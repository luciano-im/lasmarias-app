import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import { registerValidator, validation } from '../../helpers/validation';
import { theme } from '../../helpers/styles';
import { signUp } from '../../helpers/api';
import Logo from '../../components/Logo';
import InputText from '../../components/InputText';
import Reactotron from 'reactotron-react-native';

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
      cuitText: '',
      errorText: null,
      loading: false,
      nameError: '',
      lastNameError: '',
      businessError: '',
      telError: '',
      celError: '',
      addressError: '',
      cityError: '',
      zipError: '',
      cuitError: ''
    };
  }

  _onChangeName = text => {
    this.setState({
      nameText: text
    });
  };

  _onBlurName = () => {
    this.setState({
      nameError: validation('name', this.state.nameText, registerValidator)
    });
  };

  _onChangeLastName = text => {
    this.setState({
      lastNameText: text
    });
  };

  _onBlurLastName = () => {
    this.setState({
      lastNameError: validation(
        'lastName',
        this.state.lastNameText,
        registerValidator
      )
    });
  };

  _onChangeBusiness = text => {
    this.setState({
      businessText: text
    });
  };

  _onBlurBusiness = () => {
    this.setState({
      businessError: validation(
        'customerName',
        this.state.businessText,
        registerValidator
      )
    });
  };

  _onChangeTel = text => {
    this.setState({
      telText: text
    });
  };

  _onBlurTel = () => {
    this.setState({
      telError: validation('telephone', this.state.telText, registerValidator)
    });
  };

  _onChangeCel = text => {
    this.setState({
      celText: text
    });
  };

  _onBlurCel = () => {
    this.setState({
      celError: validation('celPhone', this.state.celText, registerValidator)
    });
  };

  _onChangeAddress = text => {
    this.setState({
      addressText: text
    });
  };

  _onBlurAddress = () => {
    this.setState({
      addressError: validation(
        'customerAddress',
        this.state.addressText,
        registerValidator
      )
    });
  };

  _onChangeCity = text => {
    this.setState({
      cityText: text
    });
  };

  _onBlurCity = () => {
    this.setState({
      cityError: validation('city', this.state.cityText, registerValidator)
    });
  };

  _onChangeZip = text => {
    this.setState({
      zipText: text
    });
  };

  _onBlurZip = () => {
    this.setState({
      zipError: validation('zipCode', this.state.zipText, registerValidator)
    });
  };

  _onChangeCuit = text => {
    this.setState({
      cuitText: text
    });
  };

  _onBlurCuit = () => {
    this.setState({
      cuitError: validation('cuit', this.state.cuitText, registerValidator)
    });
  };

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

  validateSignUp = () => {
    //TODO Validate
  };

  _signUp = async () => {
    const email = this.props.navigation.getParam('email');
    const password = this.props.navigation.getParam('password');
    const password2 = this.props.navigation.getParam('password2');

    this.setState({
      errorText: null,
      loading: true
    });

    this._removeData();

    await signUp(email, password, password2, this.state)
      .then(response => {
        if (response.error === false) {
          this.setState({
            loading: false
          });
          this.props.navigation.navigate('SignUpOk', {
            name: this.state.nameText
          });
        } else {
          this.setState({
            loading: false,
            errorText: response.msg
          });
        }
      })
      .catch(error => {
        Reactotron.error(error);
        this.setState({
          loading: false,
          errorText: response.msg
        });
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
    const {
      nameText,
      lastNameText,
      businessText,
      telText,
      celText,
      addressText,
      cityText,
      zipText,
      cuitText
    } = this.state;
    const {
      nameError,
      lastNameError,
      businessError,
      telError,
      celError,
      addressError,
      cityError,
      zipError,
      cuitError
    } = this.state;
    const nameIsError = nameError ? true : false;
    const lastNameIsError = lastNameError ? true : false;
    const businessIsError = businessError ? true : false;
    const telIsError = telError ? true : false;
    const celIsError = celError ? true : false;
    const addressIsError = addressError ? true : false;
    const cityIsError = cityError ? true : false;
    const zipIsError = zipError ? true : false;
    const cuitIsError = cuitError ? true : false;

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
              style={styles.titleImage}
              source={require('../../assets/user-128.png')}
            />
            <Text style={styles.title}>REGISTRATE</Text>
          </View>
          <Text style={styles.sub}>Ingresá tus Datos Personales:</Text>
          <View style={styles.inputContainer}>
            <InputText
              label="Nombre"
              placeholder="Nombre"
              style={styles.input}
              value={nameText}
              onChangeText={this._onChangeName}
              onBlur={this._onBlurName}
              error={nameIsError}
              errorText={nameError}
            />
            <InputText
              label="Apellido"
              placeholder="Apellido"
              style={styles.input}
              value={lastNameText}
              onChangeText={this._onChangeLastName}
              onBlur={this._onBlurLastName}
              error={lastNameIsError}
              errorText={lastNameError}
            />
            <Divider />
            <InputText
              label="Nombre del Comercio"
              placeholder="Nombre del Comercio"
              style={styles.input}
              value={businessText}
              onChangeText={this._onChangeBusiness}
              onBlur={this._onBlurBusiness}
              error={businessIsError}
              errorText={businessError}
            />
            <InputText
              label="CUIT"
              placeholder="CUIT"
              style={styles.input}
              value={cuitText}
              onChangeText={this._onChangeCuit}
              onBlur={this._onBlurCuit}
              error={cuitIsError}
              errorText={cuitError}
            />
            <InputText
              label="Teléfono"
              placeholder="Teléfono"
              style={styles.input}
              value={telText}
              onChangeText={this._onChangeTel}
              onBlur={this._onBlurTel}
              error={telIsError}
              errorText={telError}
              autoComplete="tel"
              keyboardType="number-pad"
            />
            <InputText
              label="Celular"
              placeholder="Celular"
              style={styles.input}
              value={celText}
              onChangeText={this._onChangeCel}
              onBlur={this._onBlurCel}
              error={celIsError}
              errorText={celError}
              autoComplete="tel"
              keyboardType="number-pad"
            />
            <InputText
              label="Dirección del Comercio"
              placeholder="Dirección del Comercio"
              style={styles.input}
              value={addressText}
              onChangeText={this._onChangeAddress}
              onBlur={this._onBlurAddress}
              error={addressIsError}
              errorText={addressError}
              autoComplete="street-address"
            />
            <InputText
              label="Ciudad"
              placeholder="Ciudad"
              style={styles.input}
              value={cityText}
              onChangeText={this._onChangeCity}
              onBlur={this._onBlurCity}
              error={cityIsError}
              errorText={cityError}
            />
            <InputText
              label="Código Postal"
              placeholder="Código Postal"
              style={styles.input}
              value={zipText}
              onChangeText={this._onChangeZip}
              onBlur={this._onBlurZip}
              error={zipIsError}
              errorText={zipError}
              autoComplete="postal-code"
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

const styles = ScaledSheet.create({
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
  titleImage: {
    maxWidth: 128,
    height: '40@ms0.3',
    width: '40@ms0.3'
  },
  title: {
    fontSize: '22@ms0.3',
    marginTop: '10@ms0.3',
    color: theme.PRIMARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  sub: {
    fontSize: '14@ms0.3',
    width: '260@ms0.3',
    alignSelf: 'center',
    marginTop: '40@ms0.3',
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  inputContainer: {
    // flex: 5,
    alignItems: 'center'
  },
  input: {
    backgroundColor: 'transparent',
    marginBottom: '10@ms0.3',
    width: '260@ms0.3'
  },
  error: {
    color: 'red',
    marginVertical: '10@ms0.3',
    textAlign: 'center',
    width: '250@ms0.3'
  },
  loading: {
    marginVertical: '10@ms0.3'
  },
  nextButtonContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '30@ms0.3'
  },
  nextButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: '50@ms0.3'
  },
  nextButtonText: {
    fontSize: '16@ms0.3'
  }
});
