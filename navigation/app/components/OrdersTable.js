import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
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
          <View style={[styles.row, { flex: 1 }]}>
            <Text
              style={[styles.invoiceCol1, styles.centerAlign, styles.title]}
            >
              Fecha
            </Text>
            <Text
              style={[styles.invoiceCol2, styles.centerAlign, styles.title]}
            >
              Nº
            </Text>
            <Text
              style={[styles.invoiceCol3, styles.centerAlign, styles.title]}
            >
              Importe
            </Text>
          </View>
        );
        itemsContent = data.map((item, index) => (
          <View style={styles.row} key={item.invoice_id}>
            <View style={styles.container}>
              <View style={styles.cleanRow}>
                <Text style={styles.dataText}>{item.customer_name}</Text>
              </View>
              <View style={styles.cleanRow}>
                <Text style={[styles.invoiceCol1, styles.detailDataText]}>
                  {format(parse(item.date), 'DD/MM/YY')}
                </Text>
                <Text
                  style={[
                    styles.centerAlign,
                    styles.invoiceCol2,
                    styles.detailDataText
                  ]}
                >
                  {item.invoice_id}
                </Text>
                <Text
                  style={[
                    styles.dataText,
                    styles.rightAlign,
                    styles.invoiceCol3
                  ]}
                >
                  $ {item.get_total.toFixed(2)}
                </Text>
                <View style={styles.invoiceCol4}>
                  <IconButton
                    icon="search"
                    color={theme.PRIMARY_COLOR}
                    size={moderateScale(20, 0.3)}
                    style={{ margin: 0 }}
                    onPress={() =>
                      this.props.navigation.navigate('OrderDetail', {
                        type: 'Invoice',
                        data: item
                      })
                    }
                  />
                </View>
              </View>
            </View>
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
            <Text style={[styles.col3, styles.centerAlign, styles.title]}>
              Solicitante
            </Text>
          </View>
        );
        itemsContent = data.map((item, index) => (
          <View style={styles.row} key={item.order_id}>
            <View style={styles.container}>
              <View style={styles.cleanRow}>
                <Text style={styles.dataText}>{item.customer_name}</Text>
              </View>
              <View style={styles.cleanRow}>
                <Text
                  style={[
                    styles.col1,
                    styles.detailDataText,
                    styles.centerAlign
                  ]}
                >
                  {format(parse(item.date), 'DD/MM/YY')}
                </Text>
                <Text
                  style={[
                    styles.col2,
                    styles.detailDataText,
                    styles.centerAlign
                  ]}
                >
                  {item.order_id}
                </Text>
                <Text style={[styles.col3, styles.dataText]}>
                  {item.user_customer_name}
                </Text>
                <View style={styles.invoiceCol4}>
                  <IconButton
                    icon="search"
                    color={theme.PRIMARY_COLOR}
                    size={moderateScale(20, 0.3)}
                    style={{ margin: 0 }}
                    onPress={() =>
                      this.props.navigation.navigate('OrderDetail', {
                        type: 'Order',
                        data: item
                      })
                    }
                  />
                </View>
              </View>
            </View>
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
  cleanRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    fontSize: '15@ms0.3'
  },
  dataText: {
    fontSize: '14@ms0.3'
  },
  detailDataText: {
    color: theme.PRIMARY_COLOR,
    fontSize: '14@ms0.3'
  },
  centerAlign: {
    textAlign: 'center'
  },
  rightAlign: {
    textAlign: 'right'
  },
  invoiceCol1: {
    flex: 0.2
  },
  invoiceCol2: {
    flex: 0.4
  },
  invoiceCol3: {
    flex: 0.3
  },
  invoiceCol4: {
    flex: 0.1,
    alignItems: 'flex-end'
  },
  col1: {
    flex: 0.2
    // backgroundColor: '#EEE'
  },
  col2: {
    flex: 0.3
    // backgroundColor: '#CCC'
  },
  col3: {
    flex: 0.4
    // backgroundColor: '#AAA'
  },
  col4: {
    flex: 0.1
    // backgroundColor: '#999'
  }
});

OrdersTable.propTypes = {
  navigation: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};
