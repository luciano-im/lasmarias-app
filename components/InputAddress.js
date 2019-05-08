import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Divider,
  Modal,
  Portal,
  Text,
  TextInput,
  IconButton
} from 'react-native-paper';
import { ScaledSheet } from 'react-native-size-matters';

export default class InputAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: ''
    };
  }

  _hideModal = () => {
    this.props.onDismiss(false);
  };

  _handleInputAddress = () => {
    this.props.onSelect(this.state.queryString);
    this.props.onDismiss(false);
  };

  render() {
    const { visible } = this.props;

    return (
      <Portal>
        <Modal
          visible={visible}
          onDismiss={this._hideModal}
          style={styles.container}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalInner}>
              <Text style={styles.title}>{this.props.title.toUpperCase()}</Text>
              <Divider />
              <TextInput
                style={styles.input}
                mode="flat"
                label={this.props.title}
                value={this.state.queryString}
                onChangeText={text =>
                  this.setState({
                    queryString: text
                  })
                }
              />
              <View style={styles.buttonContainer}>
                <Button
                  style={styles.button}
                  icon="check"
                  mode="contained"
                  compact={true}
                  onPress={() => this._handleInputAddress()}
                />
              </View>
            </View>
          </View>
        </Modal>
      </Portal>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1
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
    padding: '8@ms0.3'
  },
  title: {
    fontSize: '18@ms0.3',
    fontWeight: 'bold',
    padding: '5@ms0.3',
    paddingBottom: '10@ms0.3',
    textAlign: 'center'
  },
  input: {
    marginBottom: '20@ms0.3',
    marginTop: '10@ms0.3'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '5@ms0.3'
  },
  button: {
    paddingVertical: '5@ms0.3',
    paddingHorizontal: '10@ms0.3'
  }
});
