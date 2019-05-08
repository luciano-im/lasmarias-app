import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import { theme } from '../../../helpers/styles';
import Reactotron from 'reactotron-react-native';

export default class CheckoutProductsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.products !== this.props.products ||
      nextProps.inputs !== this.props.inputs
    );
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
              />
              <TextInput
                style={styles.quantityInput}
                keyboardType="numeric"
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
              />
            </View>
            <Text style={[styles.col3, styles.price]}>
              $ {item.item.price.toFixed(2)}
            </Text>
            <IconButton
              style={[styles.quantityButton, { marginLeft: 3 }]}
              icon="delete-forever"
              color={'red'}
              size={20}
              onPress={() => this.props.onRemoveProduct(item)}
            />
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

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    paddingVertical: '5@ms0.3'
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
    height: '22@ms0.3',
    width: '22@ms0.3'
  },
  quantityInput: {
    borderColor: '#CCC',
    borderWidth: 1,
    backgroundColor: '#FFF',
    textAlign: 'center',
    width: '35@ms0.3',
    paddingHorizontal: '5@ms0.3',
    marginHorizontal: '5@ms0.3'
  },
  price: {
    color: theme.PRIMARY_COLOR
  }
});
