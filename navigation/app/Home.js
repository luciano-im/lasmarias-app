import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Modal, Portal, Text } from 'react-native-paper';
import PubNubReact from 'pubnub-react';
import { theme } from '../../helpers/styles';
import { _saveDbData, updateDbData, getProducts } from '../../helpers/api';
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
      loading: true
    };

    // Init PubNub object
    this.pubnub = new PubNubReact({
      publishKey: pubnubConfig.PUBNUB_PUBLISH_KEY,
      subscribeKey: pubnubConfig.PUBNUB_SUBSCRIBE_KEY
    });
    this.pubnub.init(this);
  }

  _navigateCheckout = () => {
    this.props.navigation.navigate('Checkout');
  };

  _onPressItem = item => {
    this._showModal(item);
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
      onPress={this._onPressItem}
      navigateCheckout={this._navigateCheckout}
    />
  );

  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels: ['lasmarias']
    });
  }

  async componentDidMount() {
    // await updateDbData();
    // Subscribe to channel
    this.pubnub.subscribe({
      channels: ['lasmarias']
    });

    // Get new messages
    this.pubnub.getMessage('lasmarias', async msg => {
      Reactotron.log('Msg: ' + msg);
      // Save new data, later call updateDbData to compare new data vs existing/current data
      await _saveDbData('newDbData', msg.message);
      await updateDbData();
    });

    //Get last message from history
    await this.pubnub.history(
      {
        channel: 'lasmarias',
        reverse: false,
        count: 1 // how many items to fetch
      },
      async (status, response) => {
        if (status.error === false) {
          const msgs = response.messages;
          Reactotron.log('History Msg: ' + msgs);
          // Check for messages
          if (msgs !== 'undefined' && msgs.length > 0) {
            // Save new data, later call updateDbData to compare new data vs existing/current data
            await _saveDbData('newDbData', msgs[0].entry);
          }
        }
      }
    );

    const products = await getProducts(
      this.state.selectedBrand,
      this.state.selectedProductLine,
      this.state.selectedUnit
    );

    Reactotron.log('Products' + products);

    this.setState({
      products: products,
      filteredProducts: products,
      loading: false
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <ScrollView style={styles.container}>
        <SelectCustomer
          navigation={this.props.navigation}
          screenProps={this.props.screenProps}
        />
        <CategoryFilter />
        <View style={styles.titleBackground}>
          <Text style={styles.title}>OFERTAS / DESTACADOS</Text>
        </View>
        <View style={styles.listContainer}>
          {loading && (
            <View>
              <ActivityIndicator
                animating={this.state.loading}
                color={theme.PRIMARY_COLOR}
                size={25}
                style={{ marginTop: 30 }}
              />
              <Text
                style={{ textAlign: 'center', color: '#AAA', marginTop: 15 }}
              >
                Cargando datos...
              </Text>
            </View>
          )}
          <FlatList
            ItemSeparatorComponent={() => (
              <View style={{ height: 6, backgroundColor: '#EEE' }} />
            )}
            data={this.state.filteredProducts}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
        <Portal style={styles.modal}>
          <Modal
            visible={this.state.isModalVisible}
            onDismiss={this._hideModal}
            style={styles.modal}
          >
            <ProductDetailModal
              data={this.state.selectedItem}
              onDismiss={this._hideModal}
              navigateCheckout={this._navigateCheckout}
            />
          </Modal>
        </Portal>
      </ScrollView>
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
