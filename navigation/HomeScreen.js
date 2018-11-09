import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import BigButton from '../components/BigButton';
import { theme } from '../helpers/styles';

export default class HomeScreen extends React.Component {
  state = {
    query: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: theme.PRIMARY_COLOR, padding: 10, marginTop: 10, marginBottom: 30}}>
          <Searchbar
            theme={{roundness: 2}}
            placeholder='Buscar Clientes'
            onChangeText={query => { this.setState({ query: query }); }}
            value={this.state.query}
          />
        </View>
        <View>
          <View style={styles.row}>
            <BigButton label='Nuevo Pedido' backgroundColor={theme.PRIMARY_COLOR} textColor='white' elevation={3} radius={3} icon='cart' iconSize={38} />
            <BigButton label='Pedidos Pendientes' backgroundColor={theme.PRIMARY_COLOR} textColor='white' elevation={3} radius={3} icon='cogs' iconSize={38} />
          </View>
          <View style={styles.row}>
            <BigButton label='Historial de Pedidos' backgroundColor={theme.PRIMARY_COLOR} textColor='white' elevation={3} radius={3} icon='clipboard-text-outline' iconSize={38} />
            <BigButton label='Estado de Cuenta' backgroundColor={theme.PRIMARY_COLOR} textColor='white' elevation={3} radius={3} icon='currency-usd' iconSize={38} />
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
