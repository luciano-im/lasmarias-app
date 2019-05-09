import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, RadioButton } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';

const payMethods = [
  {
    id: 1,
    name: 'Efectivo'
  },
  {
    id: 2,
    name: 'Cuenta Corriente'
  },
  {
    id: 3,
    name: 'Transferencia Bancaria'
  }
];

export default class PayMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: null
    };
  }

  render() {
    const { checked } = this.state;

    return (
      <View style={styles.container}>
        <List.Accordion
          style={styles.accordion}
          title="Forma de Pago"
          description={this.state.checked}
          left={props => <List.Icon {...props} icon="credit-card" />}
        >
          {payMethods.map((pay, index) => (
            <List.Item
              key={index}
              style={styles.accordionItem}
              title={pay.name}
              onPress={() => {
                this.setState({ checked: pay.name });
              }}
              left={props => (
                <RadioButton
                  value={pay.id}
                  status={checked === pay.name ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({ checked: pay.name });
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
  }
});
