import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../helpers/styles';

// TODO: add logic
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
      zipText: ''
    };
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidContainer}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
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
          <View style={styles.nextButtonContainer}>
            <Button
              mode="contained"
              style={styles.nextButton}
              color={theme.ACCENT_COLOR}
              theme={{ roundness: 0 }}
              onPress={() =>
                this.props.navigation.navigate('ModifyDataValidation')
              }
            >
              <Text
                style={styles.nextButtonText}
                theme={{
                  colors: {
                    text: '#FFFFFF'
                  }
                }}
              >
                SIGUIENTE
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
  seller: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: theme.ACCENT_COLOR
  },
  title: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: theme.PRIMARY_COLOR
  },
  titleText: {
    fontSize: 19,
    color: 'white',
    textAlign: 'center'
  },
  sub: {
    fontSize: 15,
    width: 260,
    alignSelf: 'center',
    marginTop: 20,
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
