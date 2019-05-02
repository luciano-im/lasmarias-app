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
import { withStore } from '@spyna/react-store';
import { theme } from '../../helpers/styles';
import {
  _saveDbData,
  _addProductToOrder,
  _removeOrder,
  _getOrder,
  updateDbData,
  getProducts
} from '../../helpers/api';
import SelectCustomer from '../../components/SelectCustomer';
import CategoryFilter from './components/CategoryFilter';
import Product from './components/Product';
import ProductDetailModal from './components/ProductDetailModal';
import { pubnubConfig } from '../../PubnubConfig';
import Reactotron from 'reactotron-react-native';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      selectedItem: null,
      products: [],
      filteredProducts: [],
      // selectedBrand: null,
      // selectedProductLine: null,
      // selectedUnit: null,
      loading: true,
      snackVisible: false,
      snackText: ''
    };

    this.userType = this.props.userData.userType;

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
    return this.props.id;
  };

  _showSnack = text => {
    this.setState({
      snackVisible: true,
      snackText: text
    });
  };

  _hideSnack = () => {
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
      addToCart={this._addProductToCart}
    />
  );

  _updateData = async dbData => {
    // Save new data, later call updateDbData to compare new data vs existing/current data
    // Finally set new state
    await updateDbData(dbData);
    this._fetchData();
  };

  _fetchData = async () => {
    const products = await getProducts();
    // this.state.selectedBrand,
    // this.state.selectedProductLine,
    // this.state.selectedUnit
    this.setState({
      products: products,
      filteredProducts: products,
      loading: false
    });
  };

  _addProductToCart = async product => {
    const customer = this._getCustomerId();
    const storedProducts = await _getOrder();
    let productExists = false;
    //Check if product exists in cart
    if (storedProducts !== null) {
      productExists = storedProducts.some(
        item => item.id === product.product_id
      );
    }
    if (customer === null) {
      this._showSnack('Debe seleccionar un Cliente');
    } else {
      if (storedProducts !== null && productExists) {
        this._showSnack('El producto ya existe en su Pedido');
      } else {
        // If pass validations
        this._hideModal();
        const addProduct = await _addProductToOrder(product);
        if (addProduct.error === false) {
          // Set quantity of products in cart
          this.props.store.set(
            'productsInCart',
            storedProducts === null ? 0 : parseInt(storedProducts.length) + 1
          );
          this.props.navigation.navigate('Checkout');
        } else {
          Reactotron.log('Error en addProduct');
        }
      }
    }
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
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.updated !== null &&
      this.props.updated !== prevProps.updated
    ) {
      await this._fetchData();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.filteredProducts !== this.state.filteredProducts;
  }

  render() {
    Reactotron.debug('Render Home');
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
          onDismiss={() => this._hideSnack()}
          duration={5000}
          action={{
            label: 'OK',
            onPress: () => this._hideSnack()
          }}
          theme={{
            colors: {
              accent: theme.ACCENT_COLOR
            }
          }}
        >
          {this.state.snackText}
        </Snackbar>
        <ScrollView style={styles.container}>
          <SelectCustomer navigation={this.props.navigation} />
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
                addToCart={this._addProductToCart}
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

export default withStore(HomeScreen, [
  'id',
  'productsInCart',
  'userData',
  'updated'
]);
