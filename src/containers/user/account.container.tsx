import * as React       from 'react';
import * as _           from 'lodash';
import { connect }      from 'react-redux';
import { Dispatch }     from 'redux';
import { MailComposer } from 'expo'
import { StyleSheet }   from 'react-native';
import {
  Container,
  Content,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Toast
} from 'native-base';

import * as actions               from '../../store/actions';
import ChangePasswordModal        from '../modals/change-password.modal'
import DeleteAccountModal         from '../modals/delete-account.modal';
import navService                 from '../../shared/services/navigation.service';
import { AppState }               from '../../store/reducers';
import { DARK_GRAY, DANGER_DARK } from '../../shared/styles';

interface AccountProps {
  user?: any;
  deleteAcconut?: (userID: string, password: string) => Dispatch<actions.IDeleteAccountSuccess | actions.IDeleteAccountFailed>;
}

interface AccountState {
  modals: {[modalName: string]: boolean};
}

class Account extends React.Component<AccountProps, AccountState> {
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
      textStyles: {color: DANGER_DARK},
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
      text: 'feedback',
      onPress: () => this.onSendFeedback()
    },
    {
      text: 'privacy policy'
    },
    {
      text: 'terms of use'
    },
  ];

  public onSendFeedback = (): void => {
    const showToast = (
      type: 'success' | 'warning' | 'danger',
      text: string
    ): void => {
      Toast.show({
        type,
        text,
        textStyle: {
          color:      '#fff',
          fontWeight: 'bold',
          textAlign:  'center'
        },
        position: 'bottom',
        duration:  1000
      });
    };

    MailComposer.composeAsync({
      recipients:   ['studygroups.io@gmail.com'],
      subject:      'StudyGroups Feedback',
      body:         'Please tell us how to make StudyGroups better!'
    })
    .then(res => {
      if (res.status == 'sent')
        setTimeout(() => showToast('success', 'thanks for the feedback!'), 280);
    })
    .catch(err => {
      setTimeout(() => showToast('danger', 'unable to send feedback'), 280);
    });
  };

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
                <Text style={[item.textStyles || {color: DARK_GRAY}, {fontFamily: 'rubik-medium'}]}>
                  {item.text}
                </Text>
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
    fontSize: 20,
    color: DARK_GRAY
  }
});

const mapStateToProps = ({ auth: { user }}: AppState) => ({ user });

const mapDispatchToProps =
  (dispatch: Dispatch<actions.IDeleteAccountSuccess | actions.IDeleteAccountFailed>) => ({
    deleteAccount: (userID: string, password: string) => dispatch(actions.deleteAccount(userID, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);