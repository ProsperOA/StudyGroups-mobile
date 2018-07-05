import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Text
} from 'native-base';
import { Dispatch } from 'redux';
import * as _ from 'lodash';
import * as actions from '../../store/actions';
import navService from '../../shared/navigation-service';
import ChangePasswordModal from '../modals/change-password-modal.container';
import DeleteAccountModal from '../modals/delete-account.modal';

interface AccountProps {
  deleteAcconut: (userID: string, password: string) => Dispatch<actions.IDeleteAccountSuccess | actions.IDeleteAccountFailed>;
}

interface AccountState {
  modals: {[modalName: string]: boolean};
}

export default class extends React.Component<AccountProps, AccountState> {
  public state: Readonly<AccountState> = {
    modals: {
      changePassword: false,
      deleteAccount:  false
    }
  };

  public list = [
    {
      divider: true,
      text: 'General',
      textStyles: styles.divider
    },
    {
      text: 'change password',
      onPress: () => this.toggleModal('changePassword', true)
    },
    {
      text: 'logout',
      onPress: () => this.onLogout()
    },
    {
      text: 'delete account',
      textStyles: {color: '#B11A04', fontWeight: '600'},
      onPress: () => this.toggleModal('deleteAccount', true)
    },
    {
      divider: true,
      text: 'Settings',
      textStyles: styles.divider
    },
    {
      text: 'push notifications'
    },
    {
      divider: true,
      text: 'Support',
      textStyles: styles.divider
    },
    {
      text: 'invite friends'
    },
    {
      text: 'help center'
    },
    {
      text: 'website'
    },
    {
      text: 'feedback'
    },
    {
      text: 'privacy policy'
    },
    {
      text: 'terms of use'
    },
  ];

  public onLogout = (): void => {
    navService.navigate('Auth', { loggedOutAction: true}, true);
  };

  public toggleModal = (name: string, visible: boolean): void => {
    if (Object.keys(this.state.modals).indexOf(name) === -1) return;

    const modals = _.cloneDeep(this.state.modals);
    modals[name] = visible;

    this.setState({ modals });
  };

  public render(): JSX.Element {
    return (
      <Container>
        <Content>
          <List dataArray={this.list} renderRow={item =>
            <ListItem
              style={{height: 50}}
              itemDivider={item.divider}
              onPress={item.onPress}
              noIndent>
              <Left>
                <Text style={item.textStyles}>{item.text}</Text>
              </Left>
              {!item.divider &&
                <Right>
                  <Icon name="arrow-forward" />
                </Right>}
            </ListItem>}>
          </List>

          <ChangePasswordModal
            name="changePassword"
            visible={this.state.modals.changePassword}
            toggle={this.toggleModal} />
          <DeleteAccountModal
            name="deleteAccount"
            visible={this.state.modals.deleteAccount}
            toggle={this.toggleModal} />

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    fontFamily: 'rubik-medium',
    fontSize: 18
  }
});