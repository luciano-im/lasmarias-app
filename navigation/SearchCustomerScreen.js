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
import SelectCity from '../components/SelectCity';
import {
  getCustomers,
  getCities
} from '../helpers/api';
import { theme } from '../helpers/styles';
import Reactotron from 'reactotron-react-native';

export default class SearchCustomerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      customers: [],
      filteredCustomers: [],
      cities: [],
      selectedCity: '',
      showCitiesModal: false,
      address: ''
    }
  }

  async componentDidMount() {
    // Get customers asynchronously to prevent get "undefined"
    const customers = await getCustomers();
    const cities = await getCities();
    this.setState({
      'customers': customers,
      'cities': cities
    });
  }

  _handleShowSelectCity = (visible) => {
    this.setState({
      showCitiesModal: visible
    });
  }

  _handleSelectCity = (item) => {
    console.log(item);
  }

  _handleSelectCustomer = (item) => {
    Reactotron.log(item);
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onSelectCustomer({
      customerId: item.id,
      customerName: item.name
    });
  }

  _renderItem = ({item}) => (
    <List.Item
      title={item.name}
      onPress= {() => this._handleSelectCustomer(item)} />
  );

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
                title='Localidad'
                left={props => <List.Icon {...props} style={{padding: 0}} icon='location-city' />}
                right={props => <List.Icon {...props} icon='chevron-right' />}
                style={{padding: 0}}
                onPress={() => this._handleShowSelectCity(true)}  />
              <List.Item
                title='Dirección'
                left={props => <List.Icon {...props} style={{padding: 0}} icon='location-on' />}
                right={props => <List.Icon {...props} icon='chevron-right' />}
                style={{padding: 0}} />
          </List.Accordion>
        </View>
        <FlatList
          ItemSeparatorComponent={() => (
            <Divider />
          )}
          data={this.state.customers}
          extraData={this.state}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.id.toString()} />
        <SelectCity
          cities={this.state.cities}
          visible={this.state.showCitiesModal}
          onDismiss={this._handleShowSelectCity}
          onSelect={this._handleSelectCity} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
