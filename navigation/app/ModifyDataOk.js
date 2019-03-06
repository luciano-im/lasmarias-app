import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { theme } from '../../helpers/styles';
import Logo from '../../components/Logo';

// TODO: add logic
export default class ModifyDataOkScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <View style={styles.titleContainer}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require('../../assets/check-64.png')}
          />
          <Text style={styles.title}>¡MODIFICACIÓN EXITOSA!</Text>
          <Text style={styles.seller}>VENDEDOR 01</Text>
          <Text style={styles.line} />
        </View>
        <View style={styles.closeButtonContainer}>
          <Button
            mode="contained"
            style={styles.closeButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
            onPress={() => this.props.navigation.navigate('Home')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1
    // justifyContent: 'center'
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  title: {
    fontSize: 18,
    marginTop: 15,
    color: theme.PRIMARY_COLOR,
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  seller: {
    marginTop: 25,
    fontSize: 20
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    width: 260,
    marginVertical: 5
  },
  closeButtonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 30
  },
  closeButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 50
  },
  closeButtonText: {
    fontSize: 16
  }
});
