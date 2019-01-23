import React from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { Divider, IconButton, List, Text } from 'react-native-paper';
import { fetchAccountBalance } from '../helpers/api';
import { theme } from '../helpers/styles';

export default class AccountBalanceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: null,
      customerName: null,
      balance: 0
    };
  }

  // AsyncStorage functions
  _getCustomer = async user => {
    try {
      const customer = await AsyncStorage.getItem('@Customer');
      if (customer !== null) {
        return JSON.parse(customer);
      }
      console.log('Retrieving data: ' + data);
    } catch (error) {
      console.log('Error retrieving data: ' + error);
    }
  };
  //////////

  async componentDidMount() {
    // Get customers from AsyncStorage
    const customer = await this._getCustomer();
    const balance = await fetchAccountBalance(customer.customerId);
    await this.setState({
      customerId: customer.customerId,
      customerName: customer.customerName,
      balance: balance.balance
    });
  }

  render() {
    const balance = this.state.balance;
    let balanceText;
    if (balance < 0) {
      balanceText = <Text>Saldo Deudor:</Text>;
    } else if (balance > 0) {
      balanceText = <Text>Saldo Acreedor:</Text>;
    } else {
      balanceText = <Text>Saldo:</Text>;
    }

    return (
      <View style={styles.container}>
        <List.Item
          title={this.state.customerName}
          left={props => (
            <List.Icon
              {...props}
              icon="person"
              color="white"
              style={{ margin: 4 }}
            />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon="attach-money"
              color="white"
              style={{ margin: 4 }}
            />
          )}
          theme={{ colors: { text: '#FFFFFF' } }}
          style={[styles.customer, { backgroundColor: theme.ACCENT_COLOR }]}
        />
        <View
          style={[
            styles.titleContainer,
            { backgroundColor: theme.PRIMARY_COLOR }
          ]}
        >
          <Text theme={{ colors: { text: '#FFFFFF' } }} style={styles.title}>
            ESTADO DE CUENTA
          </Text>
        </View>
        <View style={styles.balance}>
          {balanceText}
          <Text>{balance}</Text>
        </View>
        <Divider />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  customer: {
    padding: 0,
    marginBottom: 5
  },
  titleContainer: {
    padding: 5,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18
  },
  balance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  }
});
