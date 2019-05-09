import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { StackActions } from 'react-navigation';
import { ScaledSheet } from 'react-native-size-matters';
import { theme } from '../../helpers/styles';
import Logo from '../../components/Logo';

export default class ModifyDataOkScreen extends React.Component {
  popAction = StackActions.pop({
    n: 1
  });

  _onPress = () => {
    this.props.navigation.dispatch(this.popAction);
    this.props.navigation.navigate('Home');
  };

  render() {
    const name = this.props.navigation.getParam('name').toUpperCase();

    return (
      <View style={styles.container}>
        <Logo />
        <View style={styles.titleContainer}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require('../../assets/check-64.png')}
          />
          <Text style={styles.title}>¡MODIFICACIÓN EXITOSA!</Text>
          <Text style={styles.seller}>{name}</Text>
          <Text style={styles.line} />
        </View>
        <View style={styles.closeButtonContainer}>
          <Button
            mode="contained"
            style={styles.closeButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
            onPress={() => this._onPress()}
          >
            <Text
              style={styles.closeButtonText}
              theme={{
                colors: {
                  text: '#FFFFFF'
                }
              }}
            >
              CERRAR
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '20@ms0.3'
  },
  title: {
    fontSize: '18@ms0.3',
    marginTop: '15@ms0.3',
    color: theme.PRIMARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  seller: {
    marginTop: '25@ms0.3',
    fontSize: '20@ms0.3'
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: '260@ms0.3',
    marginVertical: '5@ms0.3'
  },
  closeButtonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '30@ms0.3'
  },
  closeButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: '50@ms0.3'
  },
  closeButtonText: {
    fontSize: '16@ms0.3'
  }
});
