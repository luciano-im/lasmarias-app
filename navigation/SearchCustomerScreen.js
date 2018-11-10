import React from 'react';
import {
  FlatList,
  StyleSheet,
  View
} from 'react-native';
import {
  Divider,
  List,
  Searchbar
} from 'react-native-paper';
import { getCustomers } from '../helpers/api';
import { theme } from '../helpers/styles';
import Reactotron from 'reactotron-react-native';

export default class SearchCustomerScreen extends React.Component {
  state = {
    searchQuery: '',
  };

  _renderItem = (customer) => {
    return (
      <List.Item title={customer} />
    )
  }

  componentDidMount() {
    const data = () => { getCustomers() }
    Reactotron.log(data);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: theme.PRIMARY_COLOR, marginTop: 10, paddingTop: 10, paddingLeft: 10, paddingRight: 10}}>
          <Searchbar
            placeholder='Buscar Cliente'
            onChangeText={query => { this.setState({ searchQuery: query }); }}
            value={this.state.searchQuery}/>
          <List.Accordion
            title='Filtros'
            left={props => <List.Icon {...props} icon='filter-list' />}
            theme={{colors: {primary: '#FFFFFF', text: '#FFFFFF'}}}
            style={{padding: 0}}>
              <List.Item
                title='Dirección'
                left={props => <List.Icon {...props} style={{padding: 0}} icon='location-on' />}
                right={props => <List.Icon {...props} icon='chevron-right' />}
                style={{padding: 0}} />
              <List.Item
                title='Localidad'
                left={props => <List.Icon {...props} style={{padding: 0}} icon='location-city' />}
                right={props => <List.Icon {...props} icon='chevron-right' />}
                style={{padding: 0}} />
          </List.Accordion>
        </View>
        <FlatList
          data={this.props.promos}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
