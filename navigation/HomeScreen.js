import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View
} from 'react-native';
import {
  IconButton,
  List
} from 'react-native-paper';
import BigButton from '../components/BigButton';
import { theme } from '../helpers/styles';
import Reactotron from 'reactotron-react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: null,
      customerName: null
    };
  }

  // AsyncStorage functions
  _setSelectedCustomer = async (data) => {
    try {
      await AsyncStorage.setItem('@Customer', JSON.stringify(data));
      Reactotron.log('Saving data: ' + data);
    } catch (error) {
      Reactotron.log('Error saving data: ' + error);
    }
  }

  _emptySelectedCustomer = async () => {
    try {
      await AsyncStorage.removeItem('@Customer');
      Reactotron.log('Removing customer data');
    } catch (error) {
      Reactotron.log('Error deleting data: ' + error);
    }
  }
  //////////

  _onSelectCustomer = (data) => {
    this.setState(data);
    this._setSelectedCustomer(data);
  }

  _onRemoveCustomer = () => {
    this.setState({
      customerId: null,
      customerName: null
    });
    this._emptySelectedCustomer();
  }

  render() {
    let customer;
    if(this.state.customerName) {
      customer = <List.Item
        title={this.state.customerName}
        left={
          (props) => (
            <List.Icon
              {...props}
              icon='person'
              color='white'
              style={{margin:4}} />
          )
        }
        right={
          (props) => (
            <IconButton
              {...props}
              icon='close'
              color='#FF3333'
              onPress={() => this._onRemoveCustomer()} />
          )
        }
        theme={{colors: {text: '#FFFFFF'}}}
        style={{padding: 0, backgroundColor: theme.ACCENT_COLOR}} />;
    }

    return (
      <View style={styles.container}>
        <View style={{backgroundColor: theme.PRIMARY_COLOR, marginTop: 10, marginBottom: 5}}>
          <List.Item
            title='Buscar Cliente'
            left={props => <List.Icon {...props} icon='search' color='white' />}
            right={props => <List.Icon {...props} icon='chevron-right' color={theme.ACCENT_COLOR} />}
            theme={{colors: {text: '#FFFFFF'}}}
            style={{padding: 0}}
            onPress={() => this.props.navigation.navigate('SearchCustomer', {onSelectCustomer: this._onSelectCustomer})} />
        </View>
        <View style={{marginBottom: 30}}>
          {customer}
        </View>
        <View>
          <View style={styles.row}>
            <BigButton
              label='Nuevo Pedido'
              backgroundColor={theme.PRIMARY_COLOR}
              textColor='white'
              elevation={3}
              radius={3}
              icon='shopping-cart'
              iconSize={38} />
            <BigButton
              label='Pedidos Pendientes'
              backgroundColor={theme.PRIMARY_COLOR}
              textColor='white'
              elevation={3}
              radius={3}
              icon='settings'
              iconSize={38} />
          </View>
          <View style={styles.row}>
            <BigButton
              label='Historial de Pedidos'
              backgroundColor={theme.PRIMARY_COLOR}
              textColor='white'
              elevation={3}
              radius={3}
              icon='assignment'
              iconSize={38} />
            <BigButton
              label='Estado de Cuenta'
              backgroundColor={theme.PRIMARY_COLOR}
              textColor='white'
              elevation={3}
              radius={3}
              icon='attach-money'
              iconSize={38} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20
  }
});
