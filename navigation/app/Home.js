import React from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { IconButton, List } from 'react-native-paper';
import { theme } from '../../helpers/styles';
import BigButton from '../../components/BigButton';
import SelectCustomer from '../../components/SelectCustomer';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false
    };
  }

  // AsyncStorage functions
  // _setSelectedCustomer = async data => {
  //   try {
  //     await AsyncStorage.setItem('@Customer', JSON.stringify(data));
  //     Reactotron.log('Saving data: ' + data);
  //   } catch (error) {
  //     Reactotron.log('Error saving data: ' + error);
  //   }
  // };

  // _emptySelectedCustomer = async () => {
  //   try {
  //     await AsyncStorage.removeItem('@Customer');
  //     Reactotron.log('Removing customer data');
  //   } catch (error) {
  //     Reactotron.log('Error deleting data: ' + error);
  //   }
  // };
  //////////

  render() {
    return (
      <View style={styles.container}>
        <SelectCustomer
          navigation={this.props.navigation}
          screenProps={this.props.screenProps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
