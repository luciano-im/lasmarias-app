import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Divider, List, Searchbar } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import { withStore } from '@spyna/react-store';
import SelectCity from '../../components/SelectCity';
import { getCustomers, getCities } from '../../helpers/api';
import { theme } from '../../helpers/styles';
import Reactotron from 'reactotron-react-native';

class SearchCustomerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      customers: [],
      filteredCustomers: [],
      cities: [],
      selectedCity: null,
      showCitiesModal: false
    };
  }

  _handleSearch = query => {
    let searchText = query.trim().toLowerCase();
    let data = this.state.customers;

    data = data.filter(item => {
      return item.name.toLowerCase().match(searchText);
    });

    // Update search query state
    // Update filteredCustomers with a list of customers of customer state that match with the searched query
    this.setState({
      searchQuery: query,
      filteredCustomers: data
    });
  };

  _handleShowSelectCity = visible => {
    this.setState({
      showCitiesModal: visible
    });
  };

  _handleSelectCity = async city => {
    const customers = await getCustomers(city);
    // Set customers of the selected city
    this.setState({
      customers: customers,
      selectedCity: city
    });
    // Call _handleSearch to made the filter by search query over the new customers state
    this._handleSearch(this.state.searchQuery);
  };

  _handleRemoveSelectCity = async () => {
    const customers = await getCustomers(null);
    this.setState({
      customers: customers,
      selectedCity: null
    });
    // Call _handleSearch to made the filter by search query over the new customers state
    this._handleSearch(this.state.searchQuery);
  };

  _handleSelectCustomer = item => {
    this.props.store.set('id', item.customer_id);
    this.props.store.set('name', item.name);
    this.props.navigation.goBack();
  };

  _renderItem = ({ item }) => (
    <List.Item
      title={item.name}
      onPress={() => this._handleSelectCustomer(item)}
    />
  );

  async componentDidMount() {
    // Get customers asynchronously to prevent get "undefined"
    const customers = await getCustomers(this.state.selectedCity);
    const cities = await getCities();

    // Initialy load all customers in the FlatList
    this.setState({
      customers: customers,
      filteredCustomers: customers,
      cities: cities
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.filteredCustomers !== this.state.filteredCustomers ||
      nextState.showCitiesModal !== this.state.showCitiesModal
    );
  }

  render() {
    Reactotron.debug('Render SearchCustomer');

    let cityComponent;
    if (this.state.selectedCity) {
      cityComponent = (
        <List.Item
          title={this.state.selectedCity}
          left={props => (
            <List.Icon {...props} style={styles.item} icon="location-city" />
          )}
          right={props => (
            <List.Icon {...props} icon="close" color={theme.RED_COLOR} />
          )}
          style={styles.item}
          onPress={() => this._handleRemoveSelectCity()}
        />
      );
    } else {
      cityComponent = (
        <List.Item
          title="Localidad"
          left={props => (
            <List.Icon {...props} style={styles.item} icon="location-city" />
          )}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          style={styles.item}
          onPress={() => this._handleShowSelectCity(true)}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <Searchbar
            placeholder="Buscar Cliente"
            onChangeText={query => this._handleSearch(query)}
            value={this.state.searchQuery}
          />
          <List.Accordion
            title="Filtros"
            left={props => <List.Icon {...props} icon="filter-list" />}
            theme={{ colors: { primary: '#FFFFFF', text: '#FFFFFF' } }}
            style={styles.item}
          >
            {cityComponent}
          </List.Accordion>
        </View>
        <FlatList
          ItemSeparatorComponent={() => <Divider />}
          data={this.state.filteredCustomers}
          extraData={this.state}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.customer_id.toString()}
        />
        <SelectCity
          title="Localidad"
          cities={this.state.cities}
          visible={this.state.showCitiesModal}
          onDismiss={this._handleShowSelectCity}
          onSelect={this._handleSelectCity}
        />
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 0
  },
  filterContainer: {
    backgroundColor: theme.PRIMARY_COLOR,
    marginTop: '10@ms0.3',
    paddingTop: '10@ms0.3',
    paddingLeft: '10@ms0.3',
    paddingRight: '10@ms0.3'
  }
});

export default withStore(SearchCustomerScreen, ['id', 'name']);
