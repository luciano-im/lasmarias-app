import React from "react";
import { AsyncStorage, StyleSheet, View } from "react-native";
import { IconButton, List } from "react-native-paper";
import { fetchAccountBalance } from "../helpers/api";
import { theme } from "../helpers/styles";

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
      const customer = await AsyncStorage.getItem("@Customer");
      if (customer !== null) {
        return JSON.parse(customer);
      }
      console.log("Retrieving data: " + data);
    } catch (error) {
      console.log("Error retrieving data: " + error);
    }
  };
  //////////

  async componentDidMount() {
    // Get customers from AsyncStorage
    const customer = await this._getCustomer();
    const balance = await fetchAccountBalance(customer.customerId);
    console.log(balance);
    await this.setState({
      customerId: customer.customerId,
      customerName: customer.customerName,
      balance: 0
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <List.Item
          title={this.state.customerName}
          left={props => (
            <List.Icon
              {...props}
              icon='person'
              color='white'
              style={{ margin: 4 }}
            />
          )}
          right={props => (
            <List.Icon
              {...props}
              icon='attach-money'
              color='white'
              style={{ margin: 4 }}
            />
          )}
          theme={{ colors: { text: "#FFFFFF" } }}
          style={[styles.customer, { backgroundColor: theme.ACCENT_COLOR }]}
        />
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
  }
});
