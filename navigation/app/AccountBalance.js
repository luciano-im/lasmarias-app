import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { withStore } from '@spyna/react-store';
import { theme } from '../../helpers/styles';
import { fetchAccountBalance } from '../../helpers/api';
import SelectCustomer from '../../components/SelectCustomer';
import AccountBalanceTable from './components/AccountBalanceTable';
import Reactotron from 'reactotron-react-native';

class AccountBalanceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountData: null,
      accumulated: 0
      // customerId: this.props.id,
      // customerName: this.props.name
    };
  }

  _formatBalance = balance => {
    return balance.charAt(0) === '-' ? '-$' + balance.slice(1) : '$' + balance;
  };

  _fetchAccount = async customer_id => {
    const accountData = await fetchAccountBalance(customer_id);

    if (accountData.error === false) {
      let accumulated = 0;
      let newAccountData = [];
      newAccountData = accountData.data.map((item, i) => {
        accumulated += item.balance;
        return {
          voucher: item.voucher,
          date: item.date,
          balance: item.balance,
          accum: accumulated
        };
      });

      this.setState({
        accountData: newAccountData,
        accumulated: accumulated
      });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      (this.props.id !== prevProps.id || this.state.accountData === null) &&
      this.props.id !== null
    ) {
      await this._fetchAccount(this.props.id);
    } else {
      if (this.props.id === null && this.state.accountData !== null) {
        this.setState({
          accountData: null
        });
      }
    }
  }

  async componentDidMount() {
    if (this.props.id !== null) {
      await this._fetchAccount(this.props.id);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.accountData !== this.state.accountData ||
      nextProps.id !== this.props.id
    );
  }

  render() {
    let content;
    if (!this.props.id) {
      content = (
        <Text
          style={{
            textAlign: 'center',
            marginTop: moderateScale(40, 0.3),
            fontSize: moderateScale(14, 0.3)
          }}
        >
          Debe seleccionar un Cliente
        </Text>
      );
    } else {
      if (!this.state.accountData) {
        content = (
          <View style={{ marginTop: moderateScale(40, 0.3) }}>
            <ActivityIndicator
              color={theme.PRIMARY_COLOR}
              size={moderateScale(25, 0.3)}
            />
          </View>
        );
      } else {
        content = (
          <View>
            <View style={styles.account}>
              <Text style={styles.accountText}>Saldo:</Text>
              <Text style={styles.accountText}>
                {this._formatBalance(this.state.accumulated.toFixed(2))}
              </Text>
            </View>
            <View style={styles.accountTable}>
              <Text style={styles.accountTableTitle}>
                COMPOSICION DEL SALDO
              </Text>
              <AccountBalanceTable data={this.state.accountData} />
            </View>
          </View>
        );
      }
    }

    return (
      <View style={styles.container}>
        <SelectCustomer navigation={this.props.navigation} />
        {/* <View style={styles.customer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="person" size={25} color="white" />
            <Text style={{ color: 'white', marginLeft: 15, fontSize: 16 }}>
              {accountData.customer}
            </Text>
          </View>
          <View>
            <MaterialIcons name="monetization-on" size={25} color="white" />
          </View>
        </View> */}
        <View style={styles.title}>
          <Text style={styles.titleText}>ESTADO DE CUENTA</Text>
        </View>
        {content}
        <View style={styles.backButtonContainer}>
          <Button
            mode="contained"
            style={styles.backButton}
            color={theme.ACCENT_COLOR}
            theme={{ roundness: 0 }}
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Text
              style={styles.backButtonText}
              theme={{
                colors: {
                  text: '#FFFFFF'
                }
              }}
            >
              SALIR
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  customer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '10@ms0.3',
    paddingHorizontal: '10@ms0.3',
    marginTop: '5@ms0.3',
    backgroundColor: theme.ACCENT_COLOR
  },
  title: {
    marginVertical: '5@ms0.3',
    paddingVertical: '3@ms0.3',
    alignItems: 'center',
    backgroundColor: theme.PRIMARY_COLOR
  },
  titleText: {
    fontSize: '19@ms0.3',
    color: 'white'
  },
  account: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    paddingHorizontal: '5@ms0.3',
    margin: '10@ms0.3',
    marginTop: '20@ms0.3'
  },
  accountText: {
    color: 'red',
    fontSize: '17@ms0.3',
    fontWeight: theme.FONT_WEIGHT_MEDIUM
  },
  accountTable: {
    paddingHorizontal: '5@ms0.3',
    margin: '10@ms0.3',
    marginTop: '20@ms0.3'
  },
  accountTableTitle: {
    color: 'red',
    fontSize: '16@ms0.3',
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    textAlign: 'center'
  },
  backButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  backButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: '50@ms0.3'
  },
  backButtonText: {
    fontSize: '16@ms0.3'
  }
});

export default withStore(AccountBalanceScreen, ['id', 'name']);
