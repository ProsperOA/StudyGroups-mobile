import * as React from 'react';
import { Modal, Text, View, Dimensions } from 'react-native';
import {
  Button,
  Content,
  Container,
  Header,
  Left,
  Right,
  Root
} from 'native-base';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as t from 'tcomb-form-native';
import * as _ from 'lodash';

import { AppState } from '../../store/reducers';
import * as actions from '../../store/actions';
import { ChangePasswordForm } from '../../models/forms/change-password-form.model';
import { ChangePassword } from '../../models/change-password.model';
import globalStyles from '../../shared/styles';
import HeaderCancelButton from '../../shared/ui/header-cancel-button';
import HeaderTitle from '../../shared/ui/header-title';

const Form = t.form.Form;

interface PasswordModalProps {
  name: string;
  userID: string;
  visible: boolean;
  toggle: (name: string, visible: boolean) => void;
  changePassword: (userID: string, passwords: ChangePassword) => (
    Dispatch<actions.IChangePasswordSuccess | actions.IChangePasswordFailed>
  );
}

interface PasswordModalState {
  value: string;
  changePasswordForm: any;
}

class ChangePasswordModal extends React.Component<PasswordModalProps, PasswordModalState> {
  public state: Readonly<PasswordModalState> = {
    value: '',
    changePasswordForm: _.cloneDeep(ChangePasswordForm)
  };

  public handleChangePassword = (): void => {
    const passwords: ChangePassword = this.refs.changePasswordForm.getValue();

    if (!passwords) {
      return
    }
    else if (passwords.newPassword !== passwords.confirmPassword) {
      const form = _.cloneDeep(this.state.changePasswordForm);
      form.options.fields.confirmPassword.hasError = true;

      this.setState({ changePasswordForm: form });
      return;
    }

    this.props.changePassword(this.props.userID, passwords);
  };

  public onClose = (): void => {
    this.props.toggle(this.props.name, false);
    this.setState({ value: '' });
  };

  public render(): JSX.Element {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.visible}>
          <Root>
            <Container>
              <Header>
                <Left style={{paddingLeft: 10}}>
                  <HeaderCancelButton cancel={this.onClose} />
                </Left>
                <HeaderTitle title="Password" />
                <Right />
              </Header>
              <Content style={{paddingLeft: 15, paddingRight: 15}}>
                <View style={{marginTop: Dimensions.get('window').height / 5}}>
                  <Form
                    ref="changePasswordForm"
                    type={this.state.changePasswordForm.type}
                    options={this.state.changePasswordForm.options}
                    value={this.state.value}
                    onChange={(value: string) => this.setState({ value })} />
                  <Button
                    style={[globalStyles.btn, globalStyles.btnWarning]}
                    onPress={this.handleChangePassword}
                    block>
                    <Text style={globalStyles.btnWarningText}>update</Text>
                  </Button>
                </View>
              </Content>
            </Container>
          </Root>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = ({ auth: { user }}: AppState) => ({ userID: user.id });

const mapDispatchToProps =
  (dispatch: Dispatch<actions.IChangePasswordSuccess | actions.IChangePasswordFailed>) => ({
    changePassword: (userID: string, passwords: ChangePassword) => {
      dispatch(actions.changePassword(userID, passwords));
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordModal);