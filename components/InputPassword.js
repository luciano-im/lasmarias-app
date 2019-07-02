import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
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

  _onBlur = () => {
    this.props.onBlur();
  };

  render() {
    const {
      label,
      placeholder,
      styles,
      error,
      errorText,
      value,
      ...props
    } = this.props;

    return (
      <View style={componentStyles.inputContainer}>
        <TextInput
          style={styles}
          label={label}
          placeholder={placeholder}
          secureTextEntry={this.state.passwordHide}
          value={value}
          onChangeText={text => this.props.onChangeText(text)}
          onBlur={() => this._onBlur}
          error={error}
          {...props}
        />
        <HelperText type="error" visible={error}>
          {errorText}
        </HelperText>
        <MaterialIcons
          style={componentStyles.password}
          name={this.state.passwordIcon}
          size={22}
          onPress={() => this._changePwdType()}
        />
      </View>
    );
  }
}

const componentStyles = ScaledSheet.create({
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
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  errorText: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};
