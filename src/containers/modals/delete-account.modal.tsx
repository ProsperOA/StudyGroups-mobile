import * as React   from 'react';
import * as _       from 'lodash';
import * as t       from 'tcomb-form-native';
import { connect }  from 'react-redux';
import { Dispatch } from 'redux';
import {
  Dimensions,
  Modal,
  Text,
  View
} from "react-native";
import {
  Button,
  Content,
  Container,
  Header,
  Left,
  Right,
  Root,
} from 'native-base';

import * as actions          from '../../store/actions';
import * as UI               from '../../shared/ui';
import globalStyles          from '../../shared/styles';
import { DeleteAccountForm } from '../../models/forms/delete-account.form';
import { AppState }          from '../../store/reducers';

const Form = t.form.Form;

interface DeleteAccountModalProps {
  name:    string;
  userID:  string;
  visible: boolean;
  toggle:  (name: string, visible: boolean) => void;
  deleteAccount: (userID: string, password: string) => (
    Dispatch<actions.IDeleteAccountSuccess | actions.IDeleteAccountFailed>
  );
}

interface DeleteAccountModalState {
  deleteAccountForm: any;
  value:             string;
}

class DeleteAccountModal extends React.Component<DeleteAccountModalProps, DeleteAccountModalState> {
  public state: Readonly<DeleteAccountModalState> = {
    deleteAccountForm: _.cloneDeep(DeleteAccountForm),
    value:             ''
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
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.visible}>
          <Root>
          <Container>
            <Header>
              <Left style={{paddingLeft: 10}}>
                <UI.HeaderCancelButton cancel={this.onClose} />
              </Left>
                <UI.HeaderTitle title="Delete Account" />
              <Right />
            </Header>
            <Content style={{ paddingLeft: 15, paddingRight: 15 }}>
              <View style={{ marginTop: Dimensions.get('window').height / 5 }}>
                <Form
                  ref="deleteAccountForm"
                  type={this.state.deleteAccountForm.type}
                  options={this.state.deleteAccountForm.options}
                  value={this.state.value}
                  style={{ width: 'auto' }}
                  onChange={(value: string) => this.setState({ value })} />
                <Button
                  style={[globalStyles.btn, globalStyles.btnDanger]}
                  onPress={this.handleDeleteAccount}
                  block>
                  <Text style={globalStyles.btnDangerText}>confirm</Text>
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
  (dispatch: Dispatch<actions.IDeleteAccountSuccess | actions.IDeleteAccountFailed>) => ({
    deleteAccount: (userID: string, password: string) => {
      dispatch(actions.deleteAccount(userID, password));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccountModal);