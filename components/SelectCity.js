import React from 'react';
import {
  FlatList,
  StyleSheet,
  View
} from 'react-native';
import {
  Divider,
  List,
  Modal,
  Portal,
  Text
} from 'react-native-paper';

export default class SelectCity extends React.Component {

  _hideModal = () => {
    this.props.onDismiss(false);
  }

  _handleSelectCity = (item) => {
    this.props.onSelect(item.city);
    this.props.onDismiss(false);
  }

  _renderItem = ({item}) => {
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
          <View style={styles.modalContainer}>
            <View style={styles.modalInner}>
              <Text style={styles.title}>{this.props.title.toUpperCase()}</Text>
              <Divider />
              <FlatList
                ItemSeparatorComponent={() => (<Divider />)}
                data={this.props.cities}
                extraData={this.state}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()} />
            </View>
          </View>
        </Modal>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: '5%'
  },
  modalInner: {
    backgroundColor: 'white',
    borderRadius: 5,
    flexShrink: 1,
    //marginBottom: 8,
    padding: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
    paddingBottom: 10,
    textAlign: 'center'
  }
});
