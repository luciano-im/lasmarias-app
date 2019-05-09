import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, RadioButton, Text } from 'react-native-paper';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { MaterialIcons } from '@expo/vector-icons';

const deliveryMethods = [
  {
    id: 1,
    name: 'Envío a Domicilio'
  },
  {
    id: 2,
    name: 'Retiro en el Local'
  }
];

// TODO: Read delivery methods from backend
export default class DeliveryMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: null
    };
  }

  _selectMethod = val => {
    this.setState({ checked: val });
    this.props.onSelect(val);
  };

  render() {
    const { checked } = this.state;

    return (
      <View style={styles.container}>
        <List.Accordion
          style={styles.accordion}
          title={
            <Text style={styles.listTitle}>Forma de Entrega / Retiro</Text>
          }
          description={
            <Text style={styles.listDescription}>{this.state.checked}</Text>
          }
          left={props => (
            <MaterialIcons
              name="local-shipping"
              size={moderateScale(24, 0.3)}
              style={styles.accordionIcon}
            />
          )}
        >
          {deliveryMethods.map((pay, index) => (
            <List.Item
              key={index}
              style={styles.accordionItem}
              title={<Text style={styles.listTitle}>{pay.name}</Text>}
              onPress={() => {
                this._selectMethod(pay.name);
              }}
              left={props => (
                <RadioButton
                  value={pay.id}
                  status={checked === pay.name ? 'checked' : 'unchecked'}
                  uncheckedColor={'grey'}
                  onPress={() => {
                    this._selectMethod(pay.name);
                  }}
                />
              )}
            />
          ))}
        </List.Accordion>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  accordion: {
    padding: 0
  },
  accordionItem: {
    paddingVertical: 0
  },
  accordionIcon: {
    padding: 4
  },
  listTitle: {
    fontSize: '14@ms0.3'
  },
  listDescription: {
    color: 'grey',
    fontSize: '13@ms0.3'
  }
});
