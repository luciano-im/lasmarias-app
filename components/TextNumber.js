import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

export default class TextNumber extends React.Component {
  render() {
    const { styles, num } = this.props;

    return (
      <NumberFormat
        renderText={value => <Text style={styles}>{value}</Text>}
        value={num}
        decimalScale={2}
        displayType={'text'}
        fixedDecimalScale={true}
        thousandSeparator={'.'}
        decimalSeparator={','}
        prefix={'$'}
      />
    );
  }
}

TextNumber.propTypes = {
  styles: PropTypes.object,
  num: PropTypes.number.isRequired
};
