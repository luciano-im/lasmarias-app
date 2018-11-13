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
    // Initialy load all customers in the FlatList
    this.setState({
      customers: customers,
      filteredCustomers: customers,
      cities: cities
    });
  }

  _handleSearch = (query) => {
    let searchText = query.trim().toLowerCase();
    let data = this.state.customers;

    data = data.filter((item) => {
      return item.name.toLowerCase().match(searchText);
    });

    // Update search query state
    // Update filteredCustomers with a list of customers of customer state that match with the searched query
    this.setState({
      searchQuery: query,
      filteredCustomers: data
    });
  }

  _handleShowSelectCity = (visible) => {
    this.setState({
      showCitiesModal: visible
    });
  }

  _handleSelectCity = async (city) => {
    const customers = await getCustomers(city);
    // Set customers of the selected city
    this.setState({
      customers: customers,
      selectedCity: city
    });
    // Call _handleSearch to made the filter by search query over the new customers state
    this._handleSearch(this.state.searchQuery);
  }

  _handleSelectCustomer = (item) => {
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
            onChangeText={query => this._handleSearch(query)}
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
          data={this.state.filteredCustomers}
          extraData={this.state}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.id.toString()} />
        <SelectCity
          title='Localidad'
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
