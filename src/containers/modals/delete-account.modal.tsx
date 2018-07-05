import * as React from 'react';
import { Modal, Text, View } from 'react-native';
import {
  Button,
  Content,
  Container
} from 'native-base';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as t from 'tcomb-form-native';
import * as _ from 'lodash';

import { AppState } from '../../store/reducers';
import * as actions from '../../store/actions';
import { DeleteAccountForm } from '../../models/forms/delete-account-form.model';
import navService from '../../shared/navigation-service';

const Form = t.form.Form;

interface DeleteAccountModalProps {
  name:    string;
  userID:  string;
  visible: boolean;
  error:   string;
  toggle:  (name: string, visible: boolean) => void;
  deleteAccount: (userID: string, password: string ) => (
    Dispatch<actions.IDeleteAccountSuccess | actions.IDeleteAccountFailed>
  );
}

interface DeleteAccountModalState {
  value: string;
  deleteAccountForm: any;
}

class DeleteAccountModal extends React.Component<DeleteAccountModalProps, DeleteAccountModalState> {
  public state: Readonly<DeleteAccountModalState> = {
    value: '',
    deleteAccountForm: _.cloneDeep(DeleteAccountForm)
  };

  public handleDeleteAccount = (): void => {
    const value = this.refs.deleteAccountForm.getValue();

    if (!value) return;

    this.props.deleteAccount(this.props.userID, value.password);
  };

  public onClose = (): void => {
    this.props.toggle(this.props.name, false);
    this.setState({ value: '' });
  };

  public render(): JSX.Element {
    return (
      <Container>
        <Content>
          <View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.props.visible}>
              <View flex={1} alignItems="center" justifyContent="center">
                {this.props.error && <Text>{this.props.error}</Text>}
                <Form
                  ref="deleteAccountForm"
                  type={this.state.deleteAccountForm.type}
                  options={this.state.deleteAccountForm.options}
                  value={this.state.value}
                  style={{ width: 'auto' }}
                  onChange={(value: string) => this.setState({ value })} />
                <Button
                  onPress={this.handleDeleteAccount}
                  warning
                  block>
                  <Text>confirm</Text>
                </Button>
                <Button
                  onPress={this.onClose}
                  block
                  info>
                  <Text>cancel</Text>
                </Button>
              </View>
            </Modal>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, user, passwordModal }: AppState) => ({
  userID:  auth.user.id,
  error:   user.error,
  message: passwordModal.message
});

const mapDispatchToProps =
  (dispatch: Dispatch<actions.IDeleteAccountSuccess | actions.IDeleteAccountFailed>) => ({
    deleteAccount: (userID: string, password: string) => {
      dispatch(actions.deleteAccount(userID, password));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccountModal);