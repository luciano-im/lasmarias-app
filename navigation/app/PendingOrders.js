import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  IconButton,
  Text
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { format, parse } from 'date-fns';
import es from 'date-fns/locale/es';
import { withStore } from '@spyna/react-store';
import { theme } from '../../helpers/styles';
import {
  _getPendingOrders,
  _setPendingOrders,
  _removePendingOrders,
  createOrder
} from '../../helpers/api';
import OrdersTable from './components/OrdersTable';
import Reactotron from 'reactotron-react-native';

class PendingOrdersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      isProcessing: false,
      errorText: null
    };
  }

  _isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  _removeOrder = async orderIndex => {
    const pendingOrders = this.state.orders;

    if (orderIndex !== null) {
      pendingOrders.splice(orderIndex, 1);
      if (pendingOrders === null || this._isEmpty(pendingOrders) === true) {
        await _removePendingOrders();
        this.props.store.set('pendingOrders', false);
        this.setState({
          orders: []
        });
      } else {
        await _setPendingOrders(pendingOrders);
        this.setState({
          orders: pendingOrders
        });
      }
    }
  };

  _processPendingOrders = async (orderIndex = null) => {
    this.setState({
      isProcessing: true,
      errorText: null
    });
    const pendingOrders = this.state.orders;

    // Create orders
    let response;
    let toRemove = [];
    let errorText;
    if (orderIndex !== null) {
      const order = pendingOrders[orderIndex];
      response = await createOrder(order.order, order.customer);
      if (response.error === false) {
        toRemove.push(orderIndex);
      } else {
        errorText = response.msg;
      }
    } else {
      response = await Promise.all(
        pendingOrders.map(order => createOrder(order.order, order.customer))
      );
      // Get successful requests
      response.forEach((operation, index) => {
        if (operation.error === false) {
          return toRemove.push(index);
        } else {
          errorText = operation.msg;
        }
      });
    }

    // Delete successfull requests from pendingOrders
    if (this._isEmpty(toRemove) === false) {
      for (var i = toRemove.length - 1; i >= 0; i--) {
        pendingOrders.splice(toRemove[i], 1);
      }

      if (pendingOrders === null || this._isEmpty(pendingOrders) === true) {
        await _removePendingOrders();
        this.props.store.set('pendingOrders', false);
        this.setState({
          orders: [],
          isProcessing: false
        });
      } else {
        await _setPendingOrders(pendingOrders);
        this.setState({
          orders: pendingOrders,
          isProcessing: false
        });
      }
    } else {
      this.setState({
        isProcessing: false,
        errorText: errorText
      });
    }
  };

  async componentDidMount() {
    const pendingOrders = await _getPendingOrders();
    this.setState({
      orders: pendingOrders
    });
  }

  render() {
    const { errorText } = this.state;
    const { orders } = this.state;
    let content = [];
    orders.map((order, index) => {
      const subtotal = order.order.items.reduce((total, item) => {
        // Use (+) unary operator to turn string into numbers
        return +total + +item.price * +item.quantity;
      }, []);
      const iva = (subtotal * 21) / 100;
      const total = subtotal + iva;
      content.push(
        <View style={styles.row} key={order.order.created_at}>
          <Text style={[styles.col1]}>{order.name}</Text>
          <Text style={[styles.col2, styles.centerAlign]}>
            {format(parse(order.order.date), 'DD/MM/YY')}
          </Text>
          <Text style={[styles.col3, styles.rightAlign]}>
            $ {total.toFixed(2)}
          </Text>
          <View
            style={[
              styles.col4,
              {
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }
            ]}
          >
            <IconButton
              icon="autorenew"
              style={{ margin: 0, alignSelf: 'flex-end' }}
              color={theme.PRIMARY_COLOR}
              size={20}
              disabled={this.state.isProcessing}
              onPress={() => this._processPendingOrders(index)}
            />
            <IconButton
              icon="delete-forever"
              style={{ margin: 0, alignSelf: 'flex-end' }}
              color={'red'}
              size={20}
              disabled={this.state.isProcessing}
              onPress={() => this._removeOrder(index)}
            />
          </View>
        </View>
      );
    });

    return (
      <ScrollView style={styles.container}>
        <View style={styles.seller}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="person" size={25} color="white" />
            <Text style={{ color: 'white', marginLeft: 15, fontSize: 16 }}>
              {this.props.userData.userName}
            </Text>
          </View>
          <View>
            <MaterialIcons name="assignment" size={25} color="white" />
          </View>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>MIS PEDIDOS PENDIENTES</Text>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.productList}>
            <View style={styles.row}>
              <Text style={[styles.col1, styles.rowTitle]}>CLIENTE</Text>
              <Text style={[styles.col2, styles.centerAlign, styles.rowTitle]}>
                FECHA
              </Text>
              <Text style={[styles.col3, styles.rightAlign, styles.rowTitle]}>
                IMPORTE
              </Text>
            </View>
            {content}
          </View>
        </View>
        <View>
          <ActivityIndicator
            animating={this.state.isProcessing}
            color={theme.PRIMARY_COLOR}
          />
          {errorText && (
            <Text
              style={{
                color: 'red',
                textAlign: 'center',
                paddingHorizontal: 10
              }}
            >
              Error: {errorText}
            </Text>
          )}
        </View>
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Button
            icon="autorenew"
            mode="contained"
            style={{ width: 200 }}
            disabled={this.state.isProcessing}
            onPress={() => this._processPendingOrders()}
          >
            PROCESAR TODO
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  seller: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: theme.ACCENT_COLOR
  },
  title: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: theme.PRIMARY_COLOR
  },
  titleText: {
    fontSize: 19,
    color: 'white',
    textAlign: 'left'
  },
  dataContainer: {
    paddingHorizontal: 10
  },
  productList: {
    marginBottom: 25
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    paddingVertical: 5
  },
  rowTitle: {
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  centerAlign: {
    textAlign: 'center'
  },
  rightAlign: {
    textAlign: 'right'
  },
  col1: {
    flex: 0.35
    // backgroundColor: '#EEE'
  },
  col2: {
    flex: 0.2
    // backgroundColor: '#CCC'
  },
  col3: {
    flex: 0.25
    // backgroundColor: '#AAA'
  },
  col4: {
    flex: 0.2
    // backgroundColor: '#999'
  }
});

export default withStore(PendingOrdersScreen, ['userData']);
