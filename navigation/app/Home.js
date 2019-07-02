import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Modal,
  Portal,
  Snackbar,
  Text
} from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';
import PubNubReact from 'pubnub-react';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { withStore } from '@spyna/react-store';
import { format, parse, subMinutes } from 'date-fns';
import es from 'date-fns/locale/es';
import { theme } from '../../helpers/styles';
import {
  _getDbData,
  _saveDbData,
  _addProductToOrder,
  _removeOrder,
  _getOrder,
  _getPendingOrders,
  updateDbData,
  getProducts,
  fetchCustomers,
  fetchProducts,
  fetchImages
} from '../../helpers/api';
import SelectCustomer from '../../components/SelectCustomer';
import CategoryFilter from './components/CategoryFilter';
import Product from './components/Product';
import ProductDetailModal from './components/ProductDetailModal';
import ManualUpdate from './components/ManualUpdate';
import { pubnubConfig } from '../../PubnubConfig';
import Reactotron from 'reactotron-react-native';
import PropTypes from 'prop-types';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      selectedItem: null,
      products: [],
      filteredProducts: [],
      loading: true,
      snackVisible: false,
      snackText: '',
      categoryTitle: 'OFERTAS / DESTACADOS',
      category: null,
      manualUpdate: false,
      fetchingManualUpdate: false
    };

    this.userType = this.props.userData.userType;

    if (this.userType === 'VEN') {
      // Init PubNub object
      this.pubnub = new PubNubReact({
        publishKey: pubnubConfig.PUBNUB_PUBLISH_KEY,
        subscribeKey: pubnubConfig.PUBNUB_SUBSCRIBE_KEY,
        secretKey: pubnubConfig.PUBNUB_SECRET_KEY
      });
      this.pubnub.init(this);
    }
  }

  _isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

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
      productId={item.product_id.toString()}
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

  _filterCategory = (category = null, label = null) => {
    this._fetchData(category);
    const newLabel =
      label === null || label === 'ofertas'
        ? 'OFERTAS / DESTACADOS'
        : label.toUpperCase();
    this.setState({
      categoryTitle: newLabel,
      category: category
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
            (storedProducts === null ? 0 : parseInt(storedProducts.length)) + 1
          );
          this.props.navigation.navigate('Checkout');
        } else {
          Reactotron.log('Error en addProduct');
        }
      }
    }
  };

  _fetchPubNubHistory = () => {
    if (this.state.manualUpdate === true) {
      this.setState({
        fetchingManualUpdate: true
      });
    }
    this.pubnub.history(
      {
        channel: 'lasmarias',
        reverse: false,
        count: 1 // how many items to fetch
      },
      (status, response) => {
        if (this.state.manualUpdate === true) {
          this.setState({
            fetchingManualUpdate: false
          });
        }
        if (status.error === false) {
          if (this.state.manualUpdate === true) {
            this.setState({
              manualUpdate: false
            });
          }
          const msgs = response.messages;
          // If there are messages
          if (!this._isEmpty(msgs) && msgs.length > 0) {
            this._updateData(msgs[0].entry);
          } else {
            this._updateData(null);
          }
        } else {
          this._showSnack('Falló la verificación de contenido nuevo');
          if (this.state.manualUpdate === false) {
            this.setState({
              manualUpdate: true
            });
          }
          this._updateData(null);
        }
      }
    );
  };

  _fetchManualUpdate = async () => {
    this.setState({
      fetchingManualUpdate: true
    });

    const customers = await fetchCustomers();
    const products = await fetchProducts();
    //Check for errors
    if (customers.error === false && products.error === false) {
      // Fetch OK
      this.setState({
        fetchingManualUpdate: false
      });
      this.props.store.set('updateError', false);
      //Set updated to fetch SQLite
      this.props.store.set('updated', new Date().toString());
      //Once updated save the new DbData to AsyncStorage
      const newDbData = await _getDbData('newDbData');
      _saveDbData('currentDbData', newDbData);
    } else {
      this.setState({
        fetchingManualUpdate: false
      });
    }
  };

  _updateData = async dbData => {
    // If there are new data
    // Call updateDbData to compare with existing/current data
    if (dbData !== null) {
      await updateDbData(dbData);
    }
    // Check images update
    await this._checkImages();
    // Fetch SQLite data
    this._fetchData();
  };

  _fetchData = async category => {
    const products = await getProducts(category);
    this.setState({
      products: products,
      filteredProducts: products,
      loading: false
    });
  };

  _checkImages = async () => {
    const imagesFetchDate = await _getDbData('imagesFetchDate');
    if (imagesFetchDate !== null) {
      const diffMs = Date.now() - imagesFetchDate;
      const diffMins = Math.round(diffMs / 1000 / 60);

      if (diffMins > 10) {
        this._fetchImagesDate();
      }
    } else {
      this._fetchImagesDate();
    }
  };

  _fetchImagesDate = async () => {
    const imagesUpdateDate = await fetchImages('head');

    if (imagesUpdateDate.error === false) {
      const updateDate = parse(
        imagesUpdateDate.updateDate,
        'YYYY-MM-DD HH:mm:ss'
      );
      const utcOffset = updateDate.getTimezoneOffset();
      const updateDateUTC = subMinutes(updateDate, utcOffset);
      const updateDateTimestamp = updateDateUTC.getTime();

      const imagesStoredDate = await _getDbData('imagesUpdateDate');
      if (
        imagesStoredDate === null ||
        parseInt(imagesStoredDate) !== updateDateTimestamp
      ) {
        const response = await fetchImages('get', updateDateTimestamp);
        if (response.error === false) {
          const products = await getProducts(this.state.category);
          this.setState({
            products: products,
            filteredProducts: products
          });
        }
      }
    }
  };

  async componentDidMount() {
    if (this.userType === 'VEN') {
      // Subscribe to channel
      this.pubnub.subscribe({
        channels: ['lasmarias']
      });

      // Get new messages
      this.pubnub.getMessage('lasmarias', async msg => {
        this._updateData(msg.message);
      });

      // this.pubnub.deleteMessages(
      //   {
      //     channel: 'lasmarias',
      //     start: '14598598643233272',
      //     end: '16598598643233272'
      //   },
      //   result => {
      //     Reactotron.log(result);
      //   }
      // );

      //Get last message from history

      this._fetchPubNubHistory();

      const pendingOrders = await _getPendingOrders();
      this.props.store.set(
        'pendingOrders',
        pendingOrders === null || this._isEmpty(pendingOrders) === true
          ? false
          : true
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

    if (this.props.searchProductsQuery !== prevProps.searchProductsQuery) {
      if (this.props.searchProductsQuery !== null) {
        const querys = this.props.searchProductsQuery;
        const products = this.state.products;
        const filtered = products.filter(p => {
          return querys.every(q => {
            return (
              p.name.toUpperCase().indexOf(q.toUpperCase()) >= 0 ||
              p.brand.toUpperCase().indexOf(q.toUpperCase()) >= 0 ||
              p.product_id.toUpperCase().indexOf(q.toUpperCase()) >= 0
            );
          });
        });
        this.setState({
          filteredProducts: filtered
        });
      } else {
        this.setState({
          filteredProducts: this.state.products
        });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.updated !== this.props.updated ||
      nextProps.searchProductsQuery !== this.props.searchProductsQuery ||
      nextState.filteredProducts !== this.state.filteredProducts ||
      nextState.isModalVisible !== this.state.isModalVisible ||
      nextState.snackVisible !== this.state.snackVisible ||
      nextState.manualUpdate !== this.state.manualUpdate ||
      nextState.fetchingManualUpdate !== this.state.fetchingManualUpdate ||
      nextProps.updateError !== this.props.updateError
    );
  }

  render() {
    const { loading, manualUpdate } = this.state;
    const { updateError } = this.props;

    let content;
    if (loading) {
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

    let update;
    if (manualUpdate) {
      update = (
        <ManualUpdate
          loading={this.state.fetchingManualUpdate}
          onPress={this._fetchPubNubHistory}
          type="check"
        />
      );
    } else {
      if (updateError) {
        update = (
          <ManualUpdate
            loading={this.state.fetchingManualUpdate}
            onPress={this._fetchManualUpdate}
            type="fetch"
          />
        );
      }
    }

    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={payload => this._checkImages()} />
        <Snackbar
          style={{ zIndex: 20000 }}
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
          <Text style={{ fontSize: moderateScale(14, 0.3), color: 'white' }}>
            {this.state.snackText}
          </Text>
        </Snackbar>
        {update}
        <ScrollView style={styles.container}>
          <SelectCustomer navigation={this.props.navigation} />
          <CategoryFilter onPress={this._filterCategory} />
          <View style={styles.titleBackground}>
            <Text style={styles.title}>{this.state.categoryTitle}</Text>
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

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  titleBackground: {
    backgroundColor: theme.PRIMARY_COLOR,
    paddingVertical: '5@ms0.3'
  },
  title: {
    color: 'white',
    fontSize: '17@ms0.3',
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
  'searchProductsQuery',
  'userData',
  'updated',
  'updateError'
]);

HomeScreen.propTypes = {
  id: PropTypes.number,
  productsInCart: PropTypes.number,
  searchProductsQuery: PropTypes.array,
  userData: PropTypes.object,
  updated: PropTypes.string,
  updateError: PropTypes.bool
};
