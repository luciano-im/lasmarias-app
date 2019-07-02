import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { ActivityIndicator, Button, Divider, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { NavigationEvents } from 'react-navigation';
import { registerValidator, validation } from '../../helpers/validation';
import { getUser, updateUser } from '../../helpers/api';
import { theme } from '../../helpers/styles';
import InputText from '../../components/InputText';
import Reactotron from 'reactotron-react-native';

export default class ModifyDataScreen extends React.Component {
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
      loading: true,
      updating: false,
      errorText: null,
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

  _validateUpdateUser = () => {
    const nameError = validation(
      'name',
      this.state.nameText,
      registerValidator
    );
    const lastNameError = validation(
      'lastName',
      this.state.lastNameText,
      registerValidator
    );
    const businessError = validation(
      'customerName',
      this.state.businessText,
      registerValidator
    );
    const telError = validation(
      'telephone',
      this.state.telText,
      registerValidator
    );
    const celError = validation(
      'celPhone',
      this.state.celText,
      registerValidator
    );
    const addressError = validation(
      'customerAddress',
      this.state.addressText,
      registerValidator
    );
    const cityError = validation(
      'city',
      this.state.cityText,
      registerValidator
    );
    const zipError = validation(
      'zipCode',
      this.state.zipText,
      registerValidator
    );
    const cuitError = validation(
      'cuit',
      this.state.cuitText,
      registerValidator
    );

    this.setState({
      nameError: nameError,
      lastNameError: lastNameError,
      businessError: businessError,
      telError: telError,
      celError: celError,
      addressError: addressError,
      cityError: cityError,
      zipError: zipError,
      cuitError: cuitError
    });

    if (
      !nameError &&
      !lastNameError &&
      !businessError &&
      !telError &&
      !celError &&
      !addressError &&
      !cityError &&
      !zipError &&
      !cuitError
    ) {
      this._updateUser();
    }
  };

  _updateUser = async () => {
    this.setState({
      errorText: null,
      updating: true
    });

    const update = await updateUser(this.state);

    if (update.error === false) {
      this.setState({
        updating: false
      });
      this.props.navigation.navigate('ModifyDataOk', {
        name: this.state.nameText
      });
    } else {
      this.setState({
        updating: false,
        errorText: update.msg
      });
    }
  };

  async _onFocusScreen() {
    const user = await getUser();

    if (user.error === false) {
      const data = user.data;
      this.setState({
        nameText: data.related_name,
        lastNameText: data.related_last_name,
        businessText: data.related_customer_name,
        telText: data.related_telephone,
        celText: data.related_cel_phone,
        addressText: data.related_customer_address,
        cityText: data.related_city,
        zipText: data.related_zip_code,
        cuitText: data.related_cuit,
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
      });
    }
  }

  render() {
    const { loading } = this.state;
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

    let content;
    if (loading) {
      content = (
        <View>
          <ActivityIndicator
            animating={this.state.loading}
            color={theme.PRIMARY_COLOR}
            size={moderateScale(25, 0.3)}
            style={{ marginTop: moderateScale(30, 0.3) }}
          />
          <Text
            style={{
              textAlign: 'center',
              color: '#AAA',
              marginTop: moderateScale(15, 0.3),
              fontSize: moderateScale(14, 0.3)
            }}
          >
            Cargando datos...
          </Text>
        </View>
      );
    } else {
      content = (
        <View style={{ paddingBottom: moderateScale(50, 0.3) }}>
          <Text style={styles.sub}>Modificá tus Datos Personales:</Text>
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
          </View>
          <View>
            <ActivityIndicator
              animating={this.state.updating}
              color={theme.PRIMARY_COLOR}
              size={'large'}
              style={[
                styles.loading,
                { display: this.state.updating ? 'flex' : 'none' }
              ]}
            />
          </View>
          {this.state.errorText ? (
            <Text style={styles.error}>{this.state.errorText}</Text>
          ) : null}
        </View>
      );
    }

    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidContainer}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <NavigationEvents onDidFocus={payload => this._onFocusScreen()} />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.seller}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons
                name="person"
                size={moderateScale(25, 0.3)}
                color="white"
              />
              <Text
                style={{
                  color: 'white',
                  marginLeft: moderateScale(15, 0.3),
                  fontSize: moderateScale(16, 0.3)
                }}
              >
                {nameText + ' ' + lastNameText}
              </Text>
            </View>
            <View>
              <MaterialIcons
                name="account-box"
                size={moderateScale(25, 0.3)}
                color="white"
              />
            </View>
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>MODIFICAR MIS DATOS</Text>
          </View>
          {content}
          {!loading && (
            <View style={styles.saveButtonContainer}>
              <Button
                mode="contained"
                style={styles.saveButton}
                color={theme.ACCENT_COLOR}
                theme={{ roundness: 0 }}
                onPress={() => this._validateUpdateUser()}
              >
                <Text
                  style={styles.saveButtonText}
                  theme={{
                    colors: {
                      text: '#FFFFFF'
                    }
                  }}
                >
                  GUARDAR CAMBIOS
                </Text>
              </Button>
            </View>
          )}
        </ScrollView>
        <View style={styles.backButtonContainer}>
          <Button
            mode="contained"
            style={styles.backButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Text
              style={styles.backButtonText}
              theme={{
                colors: {
                  text: '#FFFFFF'
                }
              }}
            >
              SALIR
            </Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = ScaledSheet.create({
  keyboardAvoidContainer: {
    flex: 1
  },
  container: {
    justifyContent: 'center'
  },
  seller: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '10@ms0.3',
    paddingHorizontal: '10@ms0.3',
    marginTop: '5@ms0.3',
    backgroundColor: theme.ACCENT_COLOR
  },
  title: {
    paddingVertical: '3@ms0.3',
    paddingHorizontal: '10@ms0.3',
    marginVertical: '5@ms0.3',
    backgroundColor: theme.PRIMARY_COLOR
  },
  titleText: {
    fontSize: '19@ms0.3',
    color: 'white',
    textAlign: 'center'
  },
  sub: {
    fontSize: '15@ms0.3',
    width: '260@ms0.3',
    alignSelf: 'center',
    marginTop: '20@ms0.3',
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  inputContainer: {
    alignItems: 'center'
  },
  input: {
    backgroundColor: 'transparent',
    marginBottom: '10@ms0.3',
    width: '260@ms0.3'
  },
  saveButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '20@ms0.3',
    marginBottom: '80@ms0.3'
  },
  saveButton: {
    width: '280@ms0.3'
  },
  saveButtonText: {
    fontSize: '14@ms0.3'
  },
  backButtonContainer: {
    position: 'absolute',
    bottom: 0,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%'
  },
  backButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: '50@ms0.3'
  },
  backButtonText: {
    fontSize: '16@ms0.3'
  },
  loading: {
    marginVertical: '10@ms0.3'
  },
  error: {
    color: 'red',
    marginVertical: '10@ms0.3',
    textAlign: 'center',
    width: '250@ms0.3'
  }
});
