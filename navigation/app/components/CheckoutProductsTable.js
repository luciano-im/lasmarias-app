import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { theme } from '../../../helpers/styles';
import Reactotron from 'reactotron-react-native';

export default class CheckoutProductsTable extends React.Component {
  constructor(props) {
    super(props);

    //this.state = {};
  }

  // _addQuantity = input => {
  //   // this.setState(prevState => {
  //   //   return { [input]: parseInt(prevState[input]) + 1 };
  //   // });
  // };

  // _subQuantity = input => {
  //   this.setState(prevState => {
  //     return { [input]: parseInt(prevState[input]) - 1 };
  //   });
  // };

  componentDidUpdate(prevProps, prevState) {
    // Reactotron.log('PrevPropsState', prevProps, prevState);
    // if (prevProps.products !== this.props.products) {
    // let myState = {};
    // this.props.products.map(item => {
    //   const key = 'input' + item.item.product_id.toString().trim();
    //   myState[key] = 1;
    // });
    // //Add products
    // myState['products'] = this.props.products;
    // this.setState({
    //   ...myState
    // });
    // }
  }

  render() {
    const { products } = this.props;
    let content = [];
    if (products !== null && products !== undefined) {
      products.map((item, index) => {
        content.push(
          <View
            style={styles.row}
            key={'input' + item.item.product_id.toString().trim()}
          >
            <Text style={styles.col1}>{item.item.name}</Text>
            <View style={[styles.col2, styles.controls]}>
              <IconButton
                style={styles.quantityButton}
                icon="remove-circle-outline"
                color={theme.PRIMARY_COLOR}
                size={20}
                onPress={() =>
                  this.props.onUpdateInput(
                    'input' + item.item.product_id.toString().trim(),
                    'sub',
                    1
                  )
                }
                // onPress={() =>
                //   this._subQuantity(
                //     'input' + item.item.product_id.toString().trim()
                //   )
                // }
              />
              <TextInput
                style={styles.quantityInput}
                keyboardType="numeric"
                // value={this.state[
                //   'input' + item.item.product_id.toString().trim()
                // ].toString()}
                value={this.props.inputs[
                  'input' + item.item.product_id.toString().trim()
                ].toString()}
                onChangeText={text => {
                  this.props.onUpdateInput(
                    'input' + item.item.product_id.toString().trim(),
                    null,
                    text
                  );
                }}
                // onChangeText={
                //   this.setState({
                //     ['input' + item.item.product_id.toString().trim()]: text
                //   })
                // }
              />
              <IconButton
                style={styles.quantityButton}
                icon="add-circle-outline"
                color={theme.PRIMARY_COLOR}
                size={20}
                onPress={() =>
                  this.props.onUpdateInput(
                    'input' + item.item.product_id.toString().trim(),
                    'add',
                    1
                  )
                }
                // onPress={() =>
                //   this._addQuantity(
                //     'input' + item.item.product_id.toString().trim()
                //   )
                // }
              />
            </View>
            <Text style={[styles.col3, styles.price]}>
              $ {item.item.price.toFixed(2)}
            </Text>
          </View>
        );
      });
    }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={[styles.col1, styles.title]}>Producto</Text>
          <Text style={[styles.col2, styles.centerAlign, styles.title]}>
            Cantidad
          </Text>
          <Text style={[styles.col3, styles.centerAlign, styles.title]}>
            Importe
          </Text>
        </View>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    paddingVertical: 5
  },
  title: {
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  centerAlign: {
    textAlign: 'center'
  },
  rightAlign: {
    textAlign: 'right'
  },
  col1: {
    flex: 0.45
    // backgroundColor: '#EEE'
  },
  col2: {
    flex: 0.3
    // backgroundColor: '#CCC'
  },
  col3: {
    flex: 0.25,
    textAlign: 'right'
    // backgroundColor: '#AAA'
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityButton: {
    margin: 0,
    height: 22,
    width: 22
  },
  quantityInput: {
    borderColor: '#CCC',
    borderWidth: 1,
    backgroundColor: '#FFF',
    textAlign: 'center',
    width: 35,
    paddingHorizontal: 5,
    marginHorizontal: 5
  },
  price: {
    color: theme.PRIMARY_COLOR
  }
});
