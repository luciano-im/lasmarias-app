import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { ScaledSheet } from 'react-native-size-matters';
import PropTypes from 'prop-types';

export default class InputPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordHide: true,
      passwordIcon: 'visibility-off'
    };
  }

  _changePwdType = () => {
    if (this.state.passwordIcon === 'visibility-off') {
      this.setState({
        passwordIcon: 'visibility',
        passwordHide: false
      });
    } else {
      this.setState({
        passwordIcon: 'visibility-off',
        passwordHide: true
      });
    }
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={this.props.styles}
          autoCapitalize={'none'}
          label={this.props.label}
          placeholder="Contraseña"
          secureTextEntry={this.state.passwordHide}
          value={this.props.value}
          onChangeText={text => this.props.onChangeText(text)}
        />
        <MaterialIcons
          style={styles.password}
          name={this.state.passwordIcon}
          size={22}
          onPress={() => this._changePwdType()}
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  inputContainer: {
    alignItems: 'center'
  },
  password: {
    position: 'absolute',
    right: 0,
    top: 30
  }
});

InputPassword.propTypes = {
  label: PropTypes.string.isRequired,
  styles: PropTypes.object,
  value: PropTypes.string,
  onChangeText: PropTypes.func.isRequired
};
