import React from 'react';
import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import PropTypes from 'prop-types';

export default class InputText extends React.Component {
  _onBlur = () => {
    this.props.onBlur();
  };

  _onChangeText = text => {
    this.props.onChangeText(text);
  };

  render() {
    const {
      containerStyles,
      label,
      placeholder,
      styles,
      error,
      errorText,
      value,
      ...props
    } = this.props;

    return (
      <View style={containerStyles}>
        <TextInput
          label={label}
          placeholder={placeholder}
          style={styles}
          value={value}
          onChangeText={text => this._onChangeText(text)}
          onBlur={() => this._onBlur}
          error={error}
          {...props}
        />
        <HelperText type="error" visible={error}>
          {errorText}
        </HelperText>
      </View>
    );
  }
}

InputText.propTypes = {
  containerStyles: PropTypes.object,
  styles: PropTypes.object,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  errorText: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};
