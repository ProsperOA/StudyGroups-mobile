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
  Thumbnail
} from 'native-base';
import { connect } from 'react-redux';
import * as t from 'tcomb-form-native';
import { AppState } from '../store/reducers';
import { AccountForm } from '../models/forms/account-form.model';

const Form = t.form.Form;

interface AccountProps {
  user: any;
}

interface AccountState {
  value: any;
}

class Account extends React.Component<AccountProps, AccountState> {
  public state: Readonly<AccountState> = {
    value: null
  };

  public handleSave = (): void => {
    const value = this.refs.accountForm.getValue();
    console.log(value);
    // TODO: save account info
  };

  public render(): JSX.Element {
    return (
      <Container>
        <Content style={{flex: 1, flexDirection: 'column'}}>
          <View style={styles.avatarView}>
            <Thumbnail source={{uri: this.props.user.avatar}} large />
            <Button transparent style={{alignSelf: 'auto'}}>
              <Text style={{fontWeight: 'bold', color: '#1F61A0'}}>
                Change Profile Photo
              </Text>
            </Button>
          </View>
          <View style={styles.accountInfo}>
            <Form
              ref="accountForm"
              type={AccountForm.type}
              options={AccountForm.options}
              value={this.state.value}
              onChange={(value: any) => this.setState({ value })} />
              <Button onPress={this.handleSave} success block>
                <Text style={styles.btnSave}>
                  Save
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
    fontFamily: 'rubik-medium'
  }
});

const mapStateToProps = ({ auth: { user }}: AppState) => ({ user });

export default connect(mapStateToProps)(Account);