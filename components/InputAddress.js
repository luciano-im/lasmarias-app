import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  Button,
  Divider,
  Modal,
  Portal,
  Text,
  TextInput,
  IconButton
} from 'react-native-paper';

export default class InputAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: ''
    };
  }

  _hideModal = () => {
    this.props.onDismiss(false);
  }

  _handleInputAddress = () => {
    this.props.onSelect(this.state.queryString);
    this.props.onDismiss(false);
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
              <TextInput
                style={styles.input}
                mode='flat'
                label={this.props.title}
                value={this.state.queryString}
                onChangeText={text => this.setState({
                  queryString: text
                })} />
              <View style={styles.buttonContainer}>
                <Button
                  style={styles.button}
                  icon='check'
                  mode='contained'
                  compact={true}
                  onPress={() => this._handleInputAddress()}>
                </Button>
              </View>
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
    padding: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
    paddingBottom: 10,
    textAlign: 'center'
  },
  input: {
    marginBottom: 20,
    marginTop: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10
  }
});
