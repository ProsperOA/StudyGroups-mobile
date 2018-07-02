import * as React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Button,
  Container,
  Content,
  Spinner,
  Thumbnail,
  Toast
} from 'native-base';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import * as t from 'tcomb-form-native';
import * as _ from 'lodash';

import { AppState } from '../store/reducers';
import { AccountForm } from '../models/forms/account-form.model';
import { AccountInfo } from '../models/account-info.model';
import { UserState } from '../store/reducers/user.reducer';

const Form = t.form.Form;

interface AccountProps extends UserState {
  user:               any;
  updateAccountStart: ()                                         => Dispatch<actions.IUpdateAccountStart>;
  updateAccount:      (userID: string, accountInfo: AccountInfo) => Dispatch<actions.IUpdateAccountSuccess | actions.IUpdateAccountFailed>;
}

interface AccountState {
  value: any;
}

class Account extends React.Component<AccountProps, AccountState> {
  public state: Readonly<AccountState> = {
    value: null
  };

  public componentWillMount(): void {
    const user = _.cloneDeep(this.props.user);
    user.firstName = user.first_name;
    user.lastName = user.last_name;

    _.omit(user, ['first_name', 'last_name']);

    this.setState({ value: { ...user }});
  }

  public componentDidUpdate(): void {
    const { error } = this.props;

    if (error)
      Toast.show({
        text: error,
        textStyle: {
          color:      '#fff',
          fontWeight: 'bold',
          textAlign:  'center'
        },
        position: 'bottom',
        duration:  2500
      });
  }

  public handleSave = (): void => {
    const value = this.refs.accountForm.getValue();
    if (!value) return;

    this.props.updateAccountStart();

    const { firstName, lastName, school, major1, major2, minor, bio } = value;

    const accountInfo: AccountInfo = {
      firstName,
      lastName,
      school,
      major1,
      major2,
      minor,
      bio
    };

    this.props.updateAccount(this.props.user.id, accountInfo);
  };

  public render(): JSX.Element {
    return (
      <Container>
        <Content style={{flex: 1, flexDirection: 'column'}}>
          <View style={styles.avatarView}>
            <Thumbnail source={{uri: this.props.user.avatar}} large />
            <Button transparent style={{alignSelf: 'auto'}}>
              <Text style={{fontWeight: 'bold', color: '#1F61A0'}}>
                change profile photo
              </Text>
            </Button>
          </View>
          <View style={styles.accountInfo}>
            <Form
              ref="accountForm"
              type={AccountForm.type}
              options={AccountForm.options}
              value={this.state.value}
              onChange={(value: string) => this.setState({ value })} />
              <Button onPress={this.handleSave} success block>
                <Text style={styles.btnSave}>
                  {this.props.loading ? <Spinner color="#fff" /> : 'save'}
                </Text>
              </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  avatarView: {
    flex: 0.25,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15
  },
  accountInfo: {
    flex: 0.75,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 15
  },
  btnSave: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'rubik-medium',
    fontSize: 22
  }
});

const mapStateToProps = ({ auth, user }: AppState) => ({
  ...user,
  user: auth.user
});

const mapDispatchToProps = (dispatch: Dispatch<actions.UserAction>) => ({
  updateAccountStart: ()                                         => dispatch(actions.updateAccountStart()),
  updateAccount:      (userID: string, accountInfo: AccountInfo) => dispatch(actions.updateAccount(userID, accountInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);