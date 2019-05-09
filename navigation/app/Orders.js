import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { List, Searchbar, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { withStore } from '@spyna/react-store';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { format, parse } from 'date-fns';
import es from 'date-fns/locale/es';
import { theme } from '../../helpers/styles';
import OrdersTable from './components/OrdersTable';

class OrdersScreen extends React.Component {
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
    this.setState({
      selectedDateFrom: date
    });
    this._handleHideDateFromPicker();
  };

  _handleShowDateToPicker = () => this.setState({ showDateToPicker: true });

  _handleHideDateToPicker = () => this.setState({ showDateToPicker: false });

  _handleSelectDateTo = date => {
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
          title={
            <Text style={styles.listTitle}>{this.state.selectedCustomer}</Text>
          }
          left={props => (
            <MaterialIcons
              name="person"
              size={moderateScale(24, 0.3)}
              color="white"
              style={{ padding: 0 }}
            />
          )}
          right={props => (
            <MaterialIcons
              name="close"
              size={moderateScale(24, 0.3)}
              color={theme.RED_COLOR}
            />
          )}
          style={{ padding: 0 }}
          onPress={() => this._handleRemoveSelectCustomer()}
        />
      );
    } else {
      customerComponent = (
        <List.Item
          title={<Text style={styles.listTitle}>Cliente</Text>}
          left={props => (
            <MaterialIcons
              name="person"
              size={moderateScale(24, 0.3)}
              color="white"
              style={{ padding: 0 }}
            />
          )}
          right={props => (
            <MaterialIcons
              name="chevron-right"
              size={moderateScale(24, 0.3)}
              color="white"
            />
          )}
          style={{ padding: 0 }}
          onPress={() => this._handleShowSelectCustomer()}
        />
      );
    }

    let dateFromTo;
    dateFromTo = (
      <List.Accordion
        title={<Text style={styles.listTitle}>Fecha</Text>}
        left={props => (
          <MaterialIcons
            name="date-range"
            size={moderateScale(24, 0.3)}
            color="white"
          />
        )}
        theme={{ colors: { primary: '#FFFFFF', text: '#FFFFFF' } }}
        style={{ padding: 0 }}
      >
        <List.Item
          title={<Text style={styles.listTitle}>Desde:</Text>}
          right={props =>
            this.state.selectedDateFrom ? (
              <Text
                style={{
                  color: 'white',
                  marginTop: 8,
                  fontSize: moderateScale(14, 0.3)
                }}
              >
                {this._capitalize(
                  format(this.state.selectedDateFrom, 'ddd, D MMMM YYYY', {
                    locale: es
                  }).toString()
                )}
              </Text>
            ) : (
              <MaterialIcons
                name="today"
                size={moderateScale(24, 0.3)}
                color="white"
              />
            )
          }
          style={{
            padding: 0,
            paddingHorizontal: 10
          }}
          onPress={this._handleShowDateFromPicker}
        />
        <List.Item
          title={<Text style={styles.listTitle}>Hasta:</Text>}
          right={props =>
            this.state.selectedDateTo ? (
              <Text
                style={{
                  color: 'white',
                  marginTop: 8,
                  fontSize: moderateScale(14, 0.3)
                }}
              >
                {this._capitalize(
                  format(this.state.selectedDateTo, 'ddd, D MMMM YYYY', {
                    locale: es
                  }).toString()
                )}
              </Text>
            ) : (
              <MaterialIcons
                name="today"
                size={moderateScale(24, 0.3)}
                color="white"
              />
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
            <MaterialIcons
              name="person"
              size={moderateScale(25, 0.3)}
              color="white"
            />
            <Text
              style={{
                color: 'white',
                marginLeft: moderateScale(15, 0.3),
                fontSize: moderateScale(16, 0.3)
              }}
            >
              {this.props.userData.userName} {this.props.userData.userLastName}
            </Text>
          </View>
          <View>
            <MaterialIcons
              name="assignment"
              size={moderateScale(25, 0.3)}
              color="white"
            />
          </View>
        </View>
        <View style={styles.filters}>
          <Searchbar
            placeholder="Buscar Pedido"
            onChangeText={query => this._handleSearch(query)}
            value={this.state.searchQuery}
          />
          <List.Accordion
            title={<Text style={styles.listTitle}>Filtros</Text>}
            left={props => (
              <MaterialIcons
                name="filter-list"
                size={moderateScale(25, 0.3)}
                color="white"
              />
            )}
            theme={{ colors: { primary: '#FFFFFF', text: '#FFFFFF' } }}
            style={{ padding: 0 }}
          >
            {customerComponent}
            {dateFromTo}
          </List.Accordion>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>MIS PEDIDOS</Text>
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
  listTitle: {
    fontSize: '14@ms0.3'
  },
  title: {
    paddingVertical: '3@ms0.3',
    paddingHorizontal: '10@ms0.3',
    marginVertical: '5@ms0.3',
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
    paddingRight: '10@ms0.3',
    marginTop: '5@ms0.3'
  },
  dataContainer: {
    paddingHorizontal: '10@ms0.3',
    paddingBottom: '20@ms0.3'
  },
  productList: {
    marginBottom: '25@ms0.3'
  }
});

export default withStore(OrdersScreen, ['userData']);
