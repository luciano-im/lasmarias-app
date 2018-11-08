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
        <View style={{backgroundColor: theme.PRIMARY_COLOR, padding: 10, marginTop: 10}}>
          <Searchbar
            theme={{roundness: 2}}
            placeholder='Buscar Clientes'
            onChangeText={query => { this.setState({ query: query }); }}
            value={this.state.query}
          />
        </View>
        <View>
          <View style={styles.row}>
            <BigButton label='OK' elevation={3} radius={3} icon='refresh' iconSize={32} iconColor={theme.PRIMARY_COLOR} />
            <BigButton label='OK' elevation={3} radius={3} icon='refresh' iconSize={32} iconColor='green' />
          </View>
          <View style={styles.row}>
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
    justifyContent: 'space-around'
  }
});
