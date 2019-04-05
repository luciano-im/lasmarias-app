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
                this._selectMethod(pay.name);
              }}
              left={props => (
                <RadioButton
                  value={pay.id}
                  status={checked === pay.name ? 'checked' : 'unchecked'}
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
