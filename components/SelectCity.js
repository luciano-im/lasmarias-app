import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet
} from 'react-native';
import {
  Divider,
  List,
  Modal,
  Portal
} from 'react-native-paper';

export default class SelectCity extends React.Component {

  _hideModal = () => {
    this.props.onDismiss(false);
  }

  _handleSelectCity = (city) => {
    console.log(city);
  }

  _renderItem = ({item}) => {
    console.log(item);
    return (
      <List.Item
        title={item.city}
        onPress= {() => this._handleSelectCity(item)} />
    );
  }

  render() {
    const {visible} = this.props;

    return (
      <Portal>
        <Modal visible={visible} onDismiss={this._hideModal} style={styles.container}>
          <ScrollView>
            <FlatList
              ItemSeparatorComponent={() => (
                <Divider />
              )}
              data={this.props.cities}
              extraData={this.state}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()} />
          </ScrollView>
        </Modal>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
