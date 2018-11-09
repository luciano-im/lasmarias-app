import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  List,
  Searchbar
} from 'react-native-paper';
import BigButton from '../components/BigButton';
import { theme } from '../helpers/styles';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: theme.PRIMARY_COLOR, marginTop: 10, marginBottom: 30}}>
          <List.Item
            title='Buscar Cliente'
            left={props => <List.Icon {...props} icon='search' color='white' />}
            right={props => <List.Icon {...props} icon='chevron-right' color={theme.ACCENT_COLOR} />}
            theme={{colors: {text: '#FFFFFF'}}}
            style={{padding: 0}}
            onPress={() => console.log('Pressed')}
          />
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
