import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { List, Searchbar, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { ScaledSheet } from 'react-native-size-matters';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { format, parse } from 'date-fns';
import es from 'date-fns/locale/es';
import { theme } from '../../helpers/styles';
import OrdersTable from './components/OrdersTable';

export default class OrdersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      orders: [],
      filteredOrders: [],
      showDateFromPicker: false,
      showDateToPicker: false,
      selectedDateFrom: null,
      selectedDateTo: null
    };
  }

  _handleSearch = query => {
    let searchText = query.trim().toLowerCase();
    let data = this.state.orders;

    data = data.filter(item => {
      return item.name.toLowerCase().match(searchText);
    });

    // Update search query state
    // Update filteredCustomers with a list of customers of customer state that match with the searched query
    this.setState({
      searchQuery: query,
      filteredOrders: data
    });
  };

  _handleShowSelectCustomer = () => {
    this.props.navigation.navigate('SearchCustomer');
  };

  _handleRemoveSelectCustomer = async () => {
    // const customers = await getCustomers(null, this.state.address);
    // this.setState({
    //   customers: customers,
    //   selectedCity: null
    // });
    // // Call _handleSearch to made the filter by search query over the new customers state
    // this._handleSearch(this.state.searchQuery);
    console.log('Borrar cliente');
  };

  _handleShowDateFromPicker = () => this.setState({ showDateFromPicker: true });

  _handleHideDateFromPicker = () =>
    this.setState({ showDateFromPicker: false });

  _handleSelectDateFrom = date => {
    console.log('A date from has been picked: ', date);
    this.setState({
      selectedDateFrom: date
    });
    this._handleHideDateFromPicker();
  };

  _handleShowDateToPicker = () => this.setState({ showDateToPicker: true });

  _handleHideDateToPicker = () => this.setState({ showDateToPicker: false });

  _handleSelectDateTo = date => {
    console.log('A date to has been picked: ', date);
    this.setState({
      selectedDateTo: date
    });
    this._handleHideDateToPicker();
  };

  _capitalize = text => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  render() {
    let customerComponent;
    if (this.state.selectedCustomer) {
      customerComponent = (
        <List.Item
          title={this.state.selectedCustomer}
          left={props => (
            <List.Icon {...props} style={{ padding: 0 }} icon="person" />
          )}
          right={props => (
            <List.Icon {...props} icon="close" color={theme.RED_COLOR} />
          )}
          style={{ padding: 0 }}
          onPress={() => this._handleRemoveSelectCustomer()}
        />
      );
    } else {
      customerComponent = (
        <List.Item
          title="Cliente"
          left={props => (
            <List.Icon {...props} style={{ padding: 0 }} icon="person" />
          )}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          style={{ padding: 0 }}
          onPress={() => this._handleShowSelectCustomer()}
        />
      );
    }

    let dateFromTo;
    dateFromTo = (
      <List.Accordion
        title="Fecha"
        left={props => <List.Icon {...props} icon="date-range" />}
        theme={{ colors: { primary: '#FFFFFF', text: '#FFFFFF' } }}
        style={{ padding: 0 }}
      >
        <List.Item
          title="Desde:"
          right={props =>
            this.state.selectedDateFrom ? (
              <Text style={{ color: 'white', marginTop: 8 }}>
                {this._capitalize(
                  format(this.state.selectedDateFrom, 'ddd, D MMMM YYYY', {
                    locale: es
                  }).toString()
                )}
              </Text>
            ) : (
              <List.Icon {...props} icon="today" />
            )
          }
          style={{
            padding: 0,
            paddingHorizontal: 10
          }}
          onPress={this._handleShowDateFromPicker}
        />
        <List.Item
          title="Hasta:"
          right={props =>
            this.state.selectedDateTo ? (
              <Text style={{ color: 'white', marginTop: 8 }}>
                {this._capitalize(
                  format(this.state.selectedDateTo, 'ddd, D MMMM YYYY', {
                    locale: es
                  }).toString()
                )}
              </Text>
            ) : (
              <List.Icon {...props} icon="today" />
            )
          }
          style={{ padding: 0, paddingHorizontal: 10 }}
          onPress={this._handleShowDateToPicker}
        />
      </List.Accordion>
    );

    return (
      <ScrollView style={styles.container}>
        <View style={styles.seller}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="person" size={25} color="white" />
            <Text style={{ color: 'white', marginLeft: 15, fontSize: 16 }}>
              Vendedor 01
            </Text>
          </View>
          <View>
            <MaterialIcons name="assignment" size={25} color="white" />
          </View>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            Seleccionar el Cliente para el pedido
          </Text>
        </View>
        <View style={styles.filters}>
          <Searchbar
            placeholder="Buscar Pedido"
            onChangeText={query => this._handleSearch(query)}
            value={this.state.searchQuery}
          />
          <List.Accordion
            title="Filtros"
            left={props => <List.Icon {...props} icon="filter-list" />}
            theme={{ colors: { primary: '#FFFFFF', text: '#FFFFFF' } }}
            style={{ padding: 0 }}
          >
            {customerComponent}
            {dateFromTo}
          </List.Accordion>
        </View>
        <View style={styles.subtitle}>
          <Text style={styles.subtitleText}>MIS PEDIDOS</Text>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.productList}>
            <OrdersTable navigation={this.props.navigation} />
          </View>
        </View>
        <DateTimePicker
          date={
            this.state.selectedDateFrom
              ? this.state.selectedDateFrom
              : new Date()
          }
          mode="date"
          isVisible={this.state.showDateFromPicker}
          onConfirm={this._handleSelectDateFrom}
          onCancel={this._handleHideDateFromPicker}
        />
        <DateTimePicker
          date={
            this.state.selectedDateTo ? this.state.selectedDateTo : new Date()
          }
          mode="date"
          isVisible={this.state.showDateToPicker}
          onConfirm={this._handleSelectDateTo}
          onCancel={this._handleHideDateToPicker}
        />
      </ScrollView>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  seller: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '10@ms0.3',
    paddingHorizontal: '10@ms0.3',
    marginTop: '5@ms0.3',
    backgroundColor: theme.ACCENT_COLOR
  },
  title: {
    paddingVertical: '10@ms0.3',
    paddingHorizontal: '4@ms0.3',
    marginVertical: '5@ms0.3',
    alignItems: 'center',
    backgroundColor: theme.PRIMARY_COLOR
  },
  titleText: {
    fontSize: '19@ms0.3',
    color: 'white',
    textAlign: 'center'
  },
  filters: {
    backgroundColor: theme.PRIMARY_COLOR,
    paddingTop: '10@ms0.3',
    paddingLeft: '10@ms0.3',
    paddingRight: '10@ms0.3'
  },
  subtitle: {
    paddingVertical: '3@ms0.3',
    paddingHorizontal: '10@ms0.3',
    marginVertical: '5@ms0.3',
    backgroundColor: theme.PRIMARY_COLOR
  },
  subtitleText: {
    fontSize: '19@ms0.3',
    color: 'white',
    textAlign: 'left'
  },
  dataContainer: {
    paddingHorizontal: '10@ms0.3',
    paddingBottom: '20@ms0.3'
  },
  productList: {
    marginBottom: '25@ms0.3'
  }
});
