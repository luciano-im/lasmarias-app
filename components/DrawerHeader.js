import React from 'react';
import { View, Text } from 'react-native';
import { withStore } from '@spyna/react-store';
import { ScaledSheet } from 'react-native-size-matters';

class DrawerHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.userData.userName,
      email: this.props.userData.userEmail
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userData !== prevProps.userData) {
      this.setState({
        name: this.props.userData.userName,
        email: this.props.userData.userEmail
      });
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.name}>{this.state.name}</Text>
        <Text style={styles.email}>{this.state.email}</Text>
      </View>
    );
  }
}

styles = ScaledSheet.create({
  name: {
    fontSize: '13@ms0.3',
    textAlign: 'center'
  },
  email: {
    fontSize: '13@ms0.3',
    textAlign: 'center'
  }
});

export default withStore(DrawerHeader, ['userData']);
