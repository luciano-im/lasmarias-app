import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, RadioButton } from 'react-native-paper';

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

export default class DeliveryMethod extends React.Component {
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
          title="Forma de Entrega / Retiro"
          description={this.state.checked}
          left={props => <List.Icon {...props} icon="local-shipping" />}
        >
          {deliveryMethods.map((pay, index) => (
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

const styles = StyleSheet.create({
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
