import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { format, parse } from 'date-fns';
import { theme } from '../../../helpers/styles';
import PropTypes from 'prop-types';

export default class OrdersTable extends React.Component {
  _isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  render() {
    const { type } = this.props;
    const { data } = this.props;
    let headerContent;
    let itemsContent;

    if (this._isEmpty(data)) {
      headerContent = (
        <View style={{ borderBottomColor: '#CCC', borderBottomWidth: 1 }}>
          <Text
            style={{
              textAlign: 'center',
              paddingVertical: moderateScale(10, 0.3),
              paddingTop: moderateScale(15, 0.3),
              color: 'grey'
            }}
          >
            SIN DATOS
          </Text>
        </View>
      );
      itemsContent = null;
    } else {
      if (type === 'Invoice') {
        headerContent = (
          <View style={styles.row}>
            <Text style={[styles.col1, styles.centerAlign, styles.title]}>
              Fecha
            </Text>
            <Text style={[styles.col2, styles.centerAlign, styles.title]}>
              Nº
            </Text>
            <Text style={[styles.col3, styles.title]}>Cliente</Text>
            <Text style={[styles.col4, styles.centerAlign, styles.title]}>
              Importe
            </Text>
          </View>
        );
        itemsContent = data.map((item, index) => (
          <View style={styles.row} key={item.invoice_id}>
            <Text style={[styles.col1, styles.dataText, styles.centerAlign]}>
              {format(parse(item.date), 'DD/MM/YY')}
            </Text>
            <TouchableOpacity
              style={styles.col2}
              onPress={() =>
                this.props.navigation.navigate('OrderDetail', {
                  type: 'Invoice',
                  data: item
                })
              }
            >
              <Text
                style={[
                  styles.centerAlign,
                  styles.dataText,
                  {
                    color: theme.PRIMARY_COLOR,
                    fontSize: moderateScale(14, 0.3)
                  }
                ]}
              >
                {item.invoice_id}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.col3, styles.dataText]}>
              {item.customer_name}
            </Text>
            <Text style={[styles.col4, styles.dataText, styles.rightAlign]}>
              $ {item.get_total.toFixed(2)}
            </Text>
          </View>
        ));
      } else {
        headerContent = (
          <View style={styles.row}>
            <Text style={[styles.col1, styles.centerAlign, styles.title]}>
              Fecha
            </Text>
            <Text style={[styles.col2, styles.centerAlign, styles.title]}>
              Nº
            </Text>
            <Text style={[styles.col3, styles.title]}>Cliente</Text>
            <Text style={[styles.col4, styles.centerAlign, styles.title]}>
              Solicitante
            </Text>
          </View>
        );
        itemsContent = data.map((item, index) => (
          <View style={styles.row} key={item.order_id}>
            <Text style={[styles.col1, styles.dataText, styles.centerAlign]}>
              {format(parse(item.date), 'DD/MM/YY')}
            </Text>
            <TouchableOpacity
              style={styles.col2}
              onPress={() =>
                this.props.navigation.navigate('OrderDetail', {
                  type: 'Order',
                  data: item
                })
              }
            >
              <Text
                style={[
                  styles.centerAlign,
                  styles.dataText,
                  {
                    color: theme.PRIMARY_COLOR,
                    fontSize: moderateScale(14, 0.3)
                  }
                ]}
              >
                {item.order_id}
              </Text>
            </TouchableOpacity>
            <Text style={[styles.col3, styles.dataText]}>
              {item.customer_name}
            </Text>
            <Text style={[styles.col4, styles.dataText]}>
              {item.user_customer_name}
            </Text>
          </View>
        ));
      }
    }

    return (
      <View style={styles.container}>
        {headerContent}
        {itemsContent}
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
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    fontSize: '15@ms0.3'
  },
  dataText: {
    fontSize: '14@ms0.3'
  },
  centerAlign: {
    textAlign: 'center'
  },
  rightAlign: {
    textAlign: 'right'
  },
  col1: {
    flex: 0.18
    // backgroundColor: '#EEE'
  },
  col2: {
    flex: 0.2
    // backgroundColor: '#CCC'
  },
  col3: {
    flex: 0.35
    // backgroundColor: '#AAA'
  },
  col4: {
    flex: 0.27
    // backgroundColor: '#999'
  }
});

OrdersTable.propTypes = {
  navigation: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};
