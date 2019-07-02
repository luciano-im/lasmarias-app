import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Divider, List, Modal, Portal, Text } from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';
import Reactotron from 'reactotron-react-native';
import PropTypes from 'prop-types';

export default class SelectCity extends React.Component {
  _hideModal = () => {
    this.props.onDismiss(false);
  };

  _handleSelectCity = item => {
    this.props.onSelect(item.city);
    this.props.onDismiss(false);
  };

  _renderItem = ({ item }) => {
    return (
      <List.Item
        title={<Text style={styles.listTitle}>{item.city}</Text>}
        onPress={() => this._handleSelectCity(item)}
      />
    );
  };

  render() {
    const { visible } = this.props;

    return (
      <Portal style={styles.modal}>
        <Modal
          visible={visible}
          onDismiss={this._hideModal}
          style={styles.container}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalInner}>
              <Text style={styles.title}>{this.props.title.toUpperCase()}</Text>
              <Divider />
              <FlatList
                ItemSeparatorComponent={() => <Divider />}
                data={this.props.cities}
                extraData={this.state}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </Modal>
      </Portal>
    );
  }
}

const styles = ScaledSheet.create({
  modal: {
    flex: 1
  },
  container: {
    flex: 1
  },
  listTitle: {
    fontSize: '14@ms0.3'
  },
  modalContainer: {
    justifyContent: 'center',
    // padding: '5%',
    maxWidth: 400,
    width: '300@ms',
    alignSelf: 'center'
  },
  modalInner: {
    backgroundColor: 'white',
    borderRadius: 5,
    flexShrink: 1,
    padding: '8@ms0.3'
  },
  title: {
    fontSize: '18@ms0.3',
    fontWeight: 'bold',
    padding: '5@ms0.3',
    paddingBottom: '10@ms0.3',
    textAlign: 'center'
  }
});

SelectCity.propTypes = {
  title: PropTypes.string.isRequired,
  cities: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};
