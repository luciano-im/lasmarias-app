import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { format, parse } from 'date-fns';
import { theme } from '../../../helpers/styles';

export default class OrderDetailProductsTable extends React.Component {
  render() {
    const { products } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={[styles.col1, styles.centerAlign, styles.title]}>
            PRODUCTO
          </Text>
          <Text style={[styles.col2, styles.centerAlign, styles.title]}>
            CANT.
          </Text>
          <Text style={[styles.col3, styles.centerAlign, styles.title]}>
            PRECIO
          </Text>
          <Text style={[styles.col4, styles.centerAlign, styles.title]}>
            TOTAL
          </Text>
        </View>
        {products.map((item, index) => (
          <View style={styles.row} key={item.product_id}>
            <Text style={[styles.col1, styles.centerAlign]}>
              {item.product_description}
            </Text>
            <Text
              style={[
                styles.centerAlign,
                styles.col2,
                { fontSize: moderateScale(14, 0.3) }
              ]}
            >
              {item.quantity}
            </Text>
            <Text style={styles.col3}>$ {item.price.toFixed(2)}</Text>
            <Text style={[styles.col4, styles.rightAlign]}>
              $ {item.amount.toFixed(2)}
            </Text>
          </View>
        ))}
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
    flex: 0.4,
    fontSize: '14@ms0.3'
    // backgroundColor: '#EEE'
  },
  col2: {
    flex: 0.2,
    fontSize: '14@ms0.3'
    // backgroundColor: '#CCC'
  },
  col3: {
    flex: 0.2,
    fontSize: '14@ms0.3'
    // backgroundColor: '#AAA'
  },
  col4: {
    flex: 0.2,
    fontSize: '14@ms0.3'
    // backgroundColor: '#999'
  }
});
