import React from 'react';
import { View, Image, Text } from 'react-native';
import { withStore } from '@spyna/react-store';
import { ScaledSheet } from 'react-native-size-matters';

class DrawerHeader extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <View style={styles.container}>
          <Image
            // style={styles.drawerImage}
            style={{ width: 80, height: 80 }}
            source={require('../assets/user-128.png')}
          />
          <Text style={styles.name}>{this.props.userData.userName}</Text>
          <Text style={styles.email}>{this.props.userData.userEmail}</Text>
        </View>
        <View style={styles.border} />
      </View>
    );
  }
}

styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: '15@ms0.3'
  },
  drawerImage: {
    maxWidth: 128,
    height: '80@ms0.3',
    width: '80@ms0.3'
  },
  name: {
    fontSize: '13@ms0.3',
    marginTop: '15@ms0.3'
  },
  email: {
    fontSize: '13@ms0.3'
  },
  border: {
    borderColor: '#CCC',
    borderTopWidth: 1,
    width: '100%'
  }
});

export default withStore(DrawerHeader, ['userData']);
