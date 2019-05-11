import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { NavigationEvents } from 'react-navigation';
import { getUser, updateUser } from '../../helpers/api';
import { theme } from '../../helpers/styles';
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
      loading: true,
      updating: false,
      errorText: null
    };
  }

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

    Reactotron.log(user);
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
        loading: false
      });
    }
  }

  render() {
    const { loading } = this.state;
    const { nameText, lastNameText } = this.state;

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
        </ScrollView>
        <View style={styles.nextButtonContainer}>
          <Button
            mode="contained"
            style={styles.nextButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
            onPress={() => this._updateUser()}
          >
            <Text
              style={styles.nextButtonText}
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
  // nextButtonContainer: {
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  //   marginTop: '30@ms0.3'
  // },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 0,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%'
  },
  nextButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: '50@ms0.3'
  },
  nextButtonText: {
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
