import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, RadioButton, Text } from 'react-native-paper';
import { theme } from '../../../helpers/styles';

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
      value: 'Efectivo'
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <RadioButton.Group
          onValueChange={value => this.setState({ value })}
          value={this.state.value}
        >
          <List.Accordion
            title="Forma de Pago"
            left={props => <List.Icon {...props} icon="credit-card" />}
          >
            {payMethods.map(method => {
              <View>
                <Text>{method.name}</Text>
                <RadioButton value={method.id} />
              </View>;
            })}
          </List.Accordion>
        </RadioButton.Group>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
