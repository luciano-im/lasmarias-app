import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
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
import { fetchInvoices, fetchOrders } from '../../helpers/api';
import Reactotron from 'reactotron-react-native';

class OrdersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      invoices: [],
      orders: [],
      filteredInvoices: [],
      filteredOrders: [],
      showDateFromPicker: false,
      showDateToPicker: false,
      selectedDateFrom: null,
      selectedDateTo: null,
      loading: false,
      errorText: null
    };
  }

  _isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  _handleSearch = query => {
    this.setState({
      searchQuery: query
    });

    if (query !== '') {
      const searchTerms = query.match(/\S+/g);
      const invoices = this.state.invoices;
      const orders = this.state.orders;

      const filteredInvoices = invoices.filter(p => {
        return searchTerms.every(q => {
          return (
            p.customer_name.toUpperCase().indexOf(q.toUpperCase()) >= 0 ||
            p.invoice_id.toUpperCase().indexOf(q.toUpperCase()) >= 0
          );
        });
      });

      const filteredOrders = orders.filter(p => {
        return searchTerms.every(q => {
          return (
            p.customer_name.toUpperCase().indexOf(q.toUpperCase()) >= 0 ||
            p.order_id
              .toString()
              .toUpperCase()
              .indexOf(q.toUpperCase()) >= 0
          );
        });
      });

      this.setState({
        filteredInvoices: filteredInvoices,
        filteredOrders: filteredOrders
      });
    } else {
      this.setState({
        filteredInvoices: this.state.invoices,
        filteredOrders: this.state.orders
      });
    }
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
    this.setState({
      loading: true,
      errorText: null
    });
    const invoices = await fetchInvoices(customer, dateFrom, dateTo);
    const orders = await fetchOrders(customer, dateFrom, dateTo);

    Reactotron.log('Invoices', invoices);
    Reactotron.log('Orders', orders);

    let dataInvoices;
    let dataOrders;
    if (invoices.error === false) {
      dataInvoices = invoices.data;
    } else {
      dataInvoices = [];
    }
    if (orders.error === false) {
      dataOrders = orders.data;
    } else {
      dataOrders = [];
    }
    let errorText;
    if (invoices.error === true) {
      errorText = invoices.msg;
    } else {
      if (orders.error === true) {
        errorText = orders.msg;
      } else {
        errorText = null;
      }
    }

    this.setState({
      loading: false,
      invoices: dataInvoices,
      orders: dataOrders,
      filteredInvoices: dataInvoices,
      filteredOrders: dataOrders,
      errorText: errorText
    });
  };

  _capitalize = text => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.id !== prevProps.id ||
      this.state.selectedDateFrom !== prevState.selectedDateFrom ||
      this.state.selectedDateTo !== prevState.selectedDateTo
    ) {
      if (
        !this.props.id &&
        !this.state.selectedDateFrom &&
        !this.state.selectedDateTo
      ) {
        this.setState({
          invoices: [],
          orders: [],
          filteredInvoices: [],
          filteredOrders: []
        });
      } else {
        if (
          (!this.state.selectedDateFrom && !this.state.selectedDateTo) ||
          (this.state.selectedDateFrom && this.state.selectedDateTo)
        ) {
          await this._fetchData(
            this.props.id,
            this.state.selectedDateFrom,
            this.state.selectedDateTo
          );
        }
      }
    }
  }

  async componentDidMount() {
    if (this.props.id !== null) {
      await this._fetchData(
        this.props.id,
        this.state.selectedDateFrom,
        this.state.selectedDateTo
      );
    }
  }

  render() {
    const errorText = this.state.errorText;
    let content;
    if (
      !this.state.loading &&
      this._isEmpty(this.state.orders) &&
      this._isEmpty(this.state.invoices) &&
      !this.state.selectedDateFrom &&
      !this.state.selectedDateTo &&
      !this.props.id & !this.state.errorText
    ) {
      content = (
        <View>
          <Text
            style={{
              textAlign: 'center',
              color: '#AAA',
              margin: moderateScale(15, 0.3),
              fontSize: moderateScale(15, 0.3)
            }}
          >
            Seleccione un Cliente o realice un filtro de fechas para ver los
            Pedidos Pendientes y Facturados
          </Text>
        </View>
      );
    } else {
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
        if (this.state.invoices === [] && this.state.orders === []) {
        } else {
          content = (
            <View>
              <View style={styles.title}>
                <Text style={styles.titleText}>PEDIDOS PENDIENTES</Text>
              </View>
              <View style={styles.dataContainer}>
                <View style={styles.productList}>
                  <OrdersTable
                    navigation={this.props.navigation}
                    data={this.state.filteredOrders}
                    type={'Order'}
                  />
                </View>
              </View>
              <View style={styles.title}>
                <Text style={styles.titleText}>FACTURAS</Text>
              </View>
              <View style={styles.dataContainer}>
                <View style={styles.productList}>
                  <OrdersTable
                    navigation={this.props.navigation}
                    data={this.state.filteredInvoices}
                    type={'Invoice'}
                  />
                </View>
              </View>
            </View>
          );
        }
      }
    }

    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoidContainer}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
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
              style={{ padding: 0, paddingVertical: 5 }}
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
                        format(
                          this.state.selectedDateFrom,
                          'ddd, D MMMM YYYY',
                          {
                            locale: es
                          }
                        ).toString()
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
          {content}
          {errorText && (
            <Text style={styles.error}>{this.state.errorText}</Text>
          )}
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
      </KeyboardAvoidingView>
    );
  }
}

const styles = ScaledSheet.create({
  keyboardAvoidContainer: {
    flex: 1
  },
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
  },
  error: {
    color: 'red',
    fontSize: '14@ms0.3',
    marginTop: 20,
    textAlign: 'center'
  }
});

export default withStore(OrdersScreen, ['id', 'userData']);
