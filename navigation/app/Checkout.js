import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../../helpers/styles';
import SelectCustomer from '../../components/SelectCustomer';
import CheckoutProductsTable from './components/CheckoutProductsTable';

export default class CheckoutScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <SelectCustomer
          navigation={this.props.navigation}
          screenProps={this.props.screenProps}
        />
        <View style={styles.title}>
          <Text style={styles.titleText}>CARRITO DE PEDIDO</Text>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Pedido Nº: 000128</Text>
            <Text style={styles.headerText}>Fecha: 17/10/18</Text>
          </View>
          <View>
            <CheckoutProductsTable />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  dataContainer: {
    paddingHorizontal: 10
  },
  header: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
