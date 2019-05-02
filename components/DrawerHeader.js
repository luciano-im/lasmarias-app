import React from 'react';
import { View, Image, Text } from 'react-native';
import { withStore } from '@spyna/react-store';

class DrawerHeader extends React.PureComponent {
  render() {
    return (
      <View>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 15
          }}
        >
          <Image
            style={{ width: 80, height: 80 }}
            source={require('../assets/user-128.png')}
          />
          <Text style={{ fontSize: 13, marginTop: 15 }}>
            {this.props.userData.userName}
          </Text>
          <Text style={{ fontSize: 13 }}>{this.props.userData.userEmail}</Text>
        </View>
        <View
          style={{ borderColor: '#CCC', borderTopWidth: 1, width: '100%' }}
        />
      </View>
    );
  }
}

export default withStore(DrawerHeader, ['userData']);
