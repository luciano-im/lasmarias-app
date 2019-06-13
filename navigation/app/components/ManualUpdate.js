import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Reactotron from 'reactotron-react-native';
import PropTypes from 'prop-types';

export default class ManualUpdate extends React.Component {
  render() {
    const { loading, type } = this.props;
    const typeText =
      type === 'check'
        ? 'la verificación de contenido nuevo'
        : 'la conexión al servidor';

    return (
      <View style={styles.container}>
        <Text style={styles.textStyles}>
          <Text style={styles.textButton} onPress={() => this.props.onPress()}>
            Reintentar
          </Text>{' '}
          {typeText}
        </Text>
        {loading && (
          <ActivityIndicator
            animating={true}
            color={'white'}
            size={moderateScale(22, 0.3)}
          />
        )}
        {!loading && (
          <MaterialIcons
            name="warning"
            color={'white'}
            size={moderateScale(22, 0.3)}
          />
        )}
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FF5555',
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  textStyles: {
    color: 'white'
  },
  textButton: {
    textDecorationLine: 'underline'
  }
});

ManualUpdate.propTypes = {
  loading: PropTypes.bool,
  onPress: PropTypes.func,
  type: PropTypes.string
};
