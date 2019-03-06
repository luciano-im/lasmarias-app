import React from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
// import { fetchAccountBalance } from "../helpers/api";
import { theme } from '../../helpers/styles';

const accountData = {
  customer: 'La Biela',
  balance: -274.98
};

export default class AccountBalanceScreen extends React.Component {
  // AsyncStorage functions
  // _getCustomer = async user => {
  //   try {
  //     const customer = await AsyncStorage.getItem("@Customer");
  //     if (customer !== null) {
  //       return JSON.parse(customer);
  //     }
  //     console.log("Retrieving data: " + data);
  //   } catch (error) {
  //     console.log("Error retrieving data: " + error);
  //   }
  // };
  //////////

  // async componentDidMount() {
  //   // Get customers from AsyncStorage
  //   const customer = await this._getCustomer();
  //   const balance = await fetchAccountBalance(customer.customerId);
  //   console.log(balance);
  //   await this.setState({
  //     customerId: customer.customerId,
  //     customerName: customer.customerName,
  //     balance: 0
  //   });
  // }

  _formatBalance = balance => {
    return balance.charAt(0) === '-' ? '-$' + balance.slice(1) : '$' + balance;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.customer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="person" size={25} color="white" />
            <Text style={{ color: 'white', marginLeft: 15, fontSize: 16 }}>
              {accountData.customer}
            </Text>
          </View>
          <View>
            <MaterialIcons name="monetization-on" size={25} color="white" />
          </View>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>ESTADO DE CUENTA</Text>
        </View>
        <View style={styles.account}>
          <Text style={styles.accountText}>Saldo:</Text>
          <Text style={styles.accountText}>
            {this._formatBalance(accountData.balance.toString())}
          </Text>
        </View>
        <View style={styles.backButtonContainer}>
          <Button
            mode="contained"
            style={styles.backButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Text
              style={styles.backButtonText}
              theme={{
                colors: {
                  text: '#FFFFFF'
                }
              }}
            >
              VOLVER
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
  },
  customer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: theme.ACCENT_COLOR
  },
  title: {
    marginVertical: 5,
    paddingVertical: 3,
    alignItems: 'center',
    backgroundColor: theme.PRIMARY_COLOR
  },
  titleText: {
    fontSize: 19,
    color: 'white'
  },
  account: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    margin: 10,
    marginTop: 20
  },
  accountText: {
    color: 'red',
    fontSize: 17,
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  backButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  backButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 50
  },
  backButtonText: {
    fontSize: 16
  }
});
