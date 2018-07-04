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
import navService from '../../shared/navigation-service';
import PasswordModal from '../modals/change-password-modal.container';

interface AccountState {
  passwordModalVisible: boolean;
}

export default class extends React.Component<{}, AccountState> {
  public state: Readonly<AccountState> = {
    passwordModalVisible: false
  };

  public list = [
    {
      divider: true,
      text: 'General',
      textStyles: styles.divider
    },
    {
      text: 'change password',
      onPress: () => this.togglePasswordModal(true)
    },
    {
      text: 'logout',
      onPress: () => this.onLogout()
    },
    {
      text: 'delete account',
      textStyles: {color: '#B11A04', fontWeight: '600'}
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

  public togglePasswordModal = (visible: boolean): void => {
    this.setState({ passwordModalVisible: visible });
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
          <PasswordModal
            visible={this.state.passwordModalVisible}
            toggle={this.togglePasswordModal} />
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