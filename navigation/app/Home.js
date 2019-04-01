import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Modal,
  Portal,
  Snackbar,
  Text
} from 'react-native-paper';
import PubNubReact from 'pubnub-react';
import { theme } from '../../helpers/styles';
import {
  _saveDbData,
  _removeOrder,
  updateDbData,
  getProducts
} from '../../helpers/api';
import SelectCustomer from '../../components/SelectCustomer';
import CategoryFilter from './components/CategoryFilter';
import Product from './components/Product';
import ProductDetailModal from './components/ProductDetailModal';
import { pubnubConfig } from '../../PubnubConfig';
import Reactotron from 'reactotron-react-native';

//TODO: Add logic and products fetch
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      selectedItem: null,
      products: [],
      filteredProducts: [],
      selectedBrand: null,
      selectedProductLine: null,
      selectedUnit: null,
      loading: true,
      snackVisible: false
    };

    this.userType = this.props.screenProps.userType;

    if (this.userType === 'VEN') {
      // Init PubNub object
      this.pubnub = new PubNubReact({
        publishKey: pubnubConfig.PUBNUB_PUBLISH_KEY,
        subscribeKey: pubnubConfig.PUBNUB_SUBSCRIBE_KEY
      });
      this.pubnub.init(this);
    }
  }

  _getCustomerId = () => {
    return this.props.screenProps.id;
  };

  _showSnackCustomer = () => {
    this.setState({
      snackVisible: true
    });
  };

  _hideSnackCustomer = () => {
    this.setState({
      snackVisible: false
    });
  };

  _showModal = selectedItem => {
    this.setState({ isModalVisible: true, selectedItem });
  };

  _hideModal = () => {
    this.setState({ isModalVisible: false });
  };

  _keyExtractor = (item, index) => item.product_id.toString();

  _renderItem = ({ item }) => (
    <Product
      name={item.name.toUpperCase()}
      brand={item.brand.toUpperCase()}
      productLine={item.product_line}
      price={item.price}
      unit={item.unit}
      packaging={item.package}
      item={item}
      showModal={this._showModal}
      customer={this._getCustomerId()}
      showSnackCustomer={this._showSnackCustomer}
    />
  );

  _updateData = async dbData => {
    // Save new data, later call updateDbData to compare new data vs existing/current data
    // Finally set new state
    await _saveDbData('newDbData', dbData);
    await updateDbData();
    this._fetchData();
  };

  _fetchData = async () => {
    const products = await getProducts(
      this.state.selectedBrand,
      this.state.selectedProductLine,
      this.state.selectedUnit
    );
    // Reactotron.log('Productos', products);
    this.setState({
      products: products,
      filteredProducts: products,
      loading: false
    });
  };

  componentDidMount() {
    if (this.userType === 'VEN') {
      // Subscribe to channel
      this.pubnub.subscribe({
        channels: ['lasmarias']
      });

      // Get new messages
      this.pubnub.getMessage('lasmarias', async msg => {
        this._updateData(msg.message);
      });

      //Get last message from history
      this.pubnub.history(
        {
          channel: 'lasmarias',
          reverse: false,
          count: 1 // how many items to fetch
        },
        (status, response) => {
          if (status.error === false) {
            const msgs = response.messages;
            // Check for messages
            if (msgs !== 'undefined' && msgs.length > 0) {
              this._updateData(msgs[0].entry);
            }
          }
        }
      );
    } else {
      // TODO: User is customer
    }
  }

  componentWillUnmount() {
    if (this.userType === 'VEN') {
      this.pubnub.unsubscribe({
        channels: ['lasmarias']
      });
    }
    _removeOrder();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.screenProps.updated !== null &&
      this.props.screenProps.updated !== prevProps.screenProps.updated
    ) {
      await this._fetchData();
    }
  }

  render() {
    const { loading } = this.state;

    let content;
    if (loading) {
      content = (
        <View>
          <ActivityIndicator
            animating={this.state.loading}
            color={theme.PRIMARY_COLOR}
            size={25}
            style={{ marginTop: 30 }}
          />
          <Text style={{ textAlign: 'center', color: '#AAA', marginTop: 15 }}>
            Cargando datos...
          </Text>
        </View>
      );
    } else {
      content = (
        <FlatList
          ItemSeparatorComponent={() => (
            <View style={{ height: 6, backgroundColor: '#EEE' }} />
          )}
          data={this.state.filteredProducts}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      );
    }

    return (
      <View style={styles.container}>
        <Snackbar
          style={{ zIndex: 10000 }}
          visible={this.state.snackVisible}
          onDismiss={() => this._hideSnackCustomer()}
          duration={5000}
          action={{
            label: 'OK',
            onPress: () => this._hideSnackCustomer()
          }}
          theme={{
            colors: {
              accent: theme.ACCENT_COLOR
            }
          }}
        >
          Debe seleccionar un Cliente
        </Snackbar>
        <ScrollView style={styles.container}>
          <SelectCustomer
            navigation={this.props.navigation}
            screenProps={this.props.screenProps}
          />
          <CategoryFilter />
          <View style={styles.titleBackground}>
            <Text style={styles.title}>OFERTAS / DESTACADOS</Text>
          </View>
          <View style={styles.listContainer}>{content}</View>
          <Portal style={styles.modal}>
            <Modal
              visible={this.state.isModalVisible}
              onDismiss={this._hideModal}
              style={styles.modal}
            >
              <ProductDetailModal
                data={this.state.selectedItem}
                onDismiss={this._hideModal}
                customer={this._getCustomerId()}
                showSnackCustomer={this._showSnackCustomer}
              />
            </Modal>
          </Portal>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleBackground: {
    backgroundColor: theme.PRIMARY_COLOR,
    paddingVertical: 5
  },
  title: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  listContainer: {
    flex: 1,
    position: 'relative'
  },
  modal: {
    flex: 1
  }
});
