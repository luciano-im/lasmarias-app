import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { ScaledSheet } from 'react-native-size-matters';
import { theme } from '../../helpers/styles';
import InputPassword from '../../components/InputPassword';

// TODO: add logic
export default class ModifyDataValidationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.seller}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="person" size={25} color="white" />
            <Text style={{ color: 'white', marginLeft: 15, fontSize: 16 }}>
              Vendedor 01
            </Text>
          </View>
          <View>
            <MaterialIcons name="account-box" size={25} color="white" />
          </View>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>MODIFICAR MIS DATOS</Text>
        </View>
        <Text style={styles.sub}>Validación de Datos Personales</Text>
        <Text style={styles.legend}>
          Ingresá la contraseña actual para validar los cambios realizados.
        </Text>
        <View style={styles.inputContainer}>
          <InputPassword
            label="Contraseña"
            value={this.state.passText}
            onChangeText={this._onChangePassword}
            styles={styles.input}
          />
        </View>
        <View style={styles.nextButtonContainer}>
          <Button
            mode="contained"
            style={styles.nextButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
            onPress={() => this.props.navigation.navigate('ModifyDataOk')}
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
      </ScrollView>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1
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
    textAlign: 'center',
    marginTop: '20@ms0.3',
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  legend: {
    color: 'grey',
    textAlign: 'center',
    paddingHorizontal: '20@ms0.3',
    marginVertical: '30@ms0.3'
  },

  inputContainer: {
    alignItems: 'center'
  },
  input: {
    backgroundColor: 'transparent',
    width: '260@ms0.3'
  },
  nextButtonContainer: {
    marginTop: '30@ms0.3',
    position: 'absolute',
    width: '100%',
    bottom: 0
  },
  nextButton: {
    justifyContent: 'center',
    height: '50@ms0.3'
  },
  nextButtonText: {
    fontSize: '16@ms0.3'
  }
});
