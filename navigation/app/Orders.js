import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import {
  ActivityIndicator,
  IconButton,
  List,
  Searchbar,
  Text
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { withStore } from '@spyna/react-store';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { format, parse } from 'date-fns';
import es from 'date-fns/locale/es';
import SelectCustomer from '../../components/SelectCustomer';
import OrdersTable from './components/OrdersTable';
import { theme } from '../../helpers/styles';
import { fetchInvoices } from '../../helpers/api';
import Reactotron from 'reactotron-react-native';

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
      selectedDateTo: null,
      loading: false
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

  _handleShowDateFromPicker = () => this.setState({ showDateFromPicker: true });

  _handleHideDateFromPicker = () =>
    this.setState({ showDateFromPicker: false });

  _handleSelectDateFrom = date => {
    this.setState({
      selectedDateFrom: date
    });
    this._handleHideDateFromPicker();
    if (this.state.selectedDateTo) {
      this._fetchData(
        this.props.id,
        this.state.selectedDateFrom,
        this.state.selectedDateTo
      );
    }
  };

  _handleShowDateToPicker = () => this.setState({ showDateToPicker: true });

  _handleHideDateToPicker = () => this.setState({ showDateToPicker: false });

  _handleSelectDateTo = date => {
    this.setState({
      selectedDateTo: date
    });
    this._handleHideDateToPicker();
    if (this.state.selectedDateFrom) {
      this._fetchData(
        this.props.id,
        this.state.selectedDateFrom,
        this.state.selectedDateTo
      );
    }
  };

  _removeDateFrom = () => {
    this.setState({
      selectedDateFrom: null
    });
    if (!this.state.selectedDateTo && this.props.id) {
      this._fetchData(
        this.props.id,
        this.state.selectedDateFrom,
        this.state.selectedDateTo
      );
    }
  };

  _removeDateTo = () => {
    this.setState({
      selectedDateTo: null
    });
    if (!this.state.selectedDateFrom && this.props.id) {
      this._fetchData(
        this.props.id,
        this.state.selectedDateFrom,
        this.state.selectedDateTo
      );
    }
  };

  _fetchData = async (customer = null, dateFrom = null, dateTo = null) => {
    Reactotron.log('Fetch data');
    this.setState({
      loading: true
    });
    const invoices = await fetchInvoices(customer, dateFrom, dateTo);
    if (invoices.error === false) {
      this.setState({
        loading: false,
        orders: invoices.data,
        filteredOrders: invoices.data
      });
    } else {
      this.setState({
        loading: false,
        errorText: invoices.error.msg
      });
      Reactotron.log(invoices);
    }
  };

  _capitalize = text => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.id !== prevProps.id) {
      await this._fetchData(
        this.props.id,
        this.state.selectedDateFrom,
        this.state.selectedDateTo
      );
    }
  }

  render() {
    let content;
    if (this.state.loading) {
      content = (
        <View>
          <ActivityIndicator
            animating={this.state.loading}
            color={theme.PRIMARY_COLOR}
            size={moderateScale(25, 0.3)}
            style={{ marginTop: moderateScale(30, 0.3) }}
          />
          <Text
            style={{
              textAlign: 'center',
              color: '#AAA',
              marginTop: moderateScale(15, 0.3),
              fontSize: moderateScale(14, 0.3)
            }}
          >
            Cargando datos...
          </Text>
        </View>
      );
    } else {
      content = (
        <View style={styles.productList}>
          <OrdersTable
            navigation={this.props.navigation}
            orders={this.state.filteredOrders}
          />
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <SelectCustomer navigation={this.props.navigation} />
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
            <List.Item
              title={<Text style={styles.listTitle}>Desde:</Text>}
              left={props =>
                this.state.selectedDateFrom && (
                  <IconButton
                    icon="close"
                    color={theme.RED_COLOR}
                    size={moderateScale(20, 0.3)}
                    style={{ margin: 0, marginTop: 5 }}
                    onPress={() => this._removeDateFrom()}
                  />
                )
              }
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
                    size={moderateScale(20, 0.3)}
                    color="white"
                    style={{ margin: 5 }}
                  />
                )
              }
              style={{
                padding: 0,
                paddingHorizontal: moderateScale(10, 0.3),
                paddingVertical: moderateScale(4, 0.3)
              }}
              onPress={this._handleShowDateFromPicker}
            />
            <List.Item
              title={<Text style={styles.listTitle}>Hasta:</Text>}
              left={props =>
                this.state.selectedDateTo && (
                  <IconButton
                    icon="close"
                    color={theme.RED_COLOR}
                    size={moderateScale(20, 0.3)}
                    style={{ margin: 0, marginTop: 5 }}
                    onPress={() => this._removeDateTo()}
                  />
                )
              }
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
                    size={moderateScale(20, 0.3)}
                    color="white"
                    style={{ margin: 5 }}
                  />
                )
              }
              style={{
                padding: 0,
                paddingHorizontal: moderateScale(10, 0.3),
                paddingVertical: moderateScale(4, 0.3)
              }}
              onPress={this._handleShowDateToPicker}
            />
          </List.Accordion>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>FACTURAS</Text>
        </View>
        <View style={styles.dataContainer}>{content}</View>
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
    paddingRight: '10@ms0.3'
  },
  dataContainer: {
    paddingHorizontal: '10@ms0.3',
    paddingBottom: '20@ms0.3'
  },
  productList: {
    marginBottom: '25@ms0.3'
  }
});

export default withStore(OrdersScreen, ['id', 'userData']);
