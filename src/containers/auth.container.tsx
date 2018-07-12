import * as React from 'react';
import {
  Keyboard,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {
  Button,
  Container,
  Content,
  Header,
  Text
} from 'native-base';
import { NavigationScreenProp, NavigationActions, StackActions } from 'react-navigation';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import * as t from 'tcomb-form-native';
import * as Animatable from 'react-native-animatable';

import Spinner from '../shared/ui/spinner';
import globalStyles from '../shared/styles';
import axios from '../shared/axios';
import * as actions from '../store/actions';
import { AppState } from '../store/reducers';
import { AuthState } from '../store/reducers/auth.reducer';
import { AuthCredentials } from '../models/auth-credentials.model';
import { LoginCredentialsForm,  SignUpCredentialsForm } from '../models/forms/auth-form.model';
import { getAuthToken } from '../shared/auth-token';

interface AuthProps extends AuthState {
  navigation: NavigationScreenProp<any, any>;
  authUserStart:  ()                                  => Dispatch<actions.IAuthUserStart>
  authUserStop:   ()                                  => Dispatch<actions.IAuthUserStop>
  authUser:       (userID: number, authToken: string) => Dispatch<actions.AuthAction>
  login:          (credentials: AuthCredentials)      => Dispatch<actions.ILoginSuccess | actions.ILoginFailed>;
  signUp:         (credentials: AuthCredentials)      => Dispatch<actions.ISignUpSuccess | actions.ISignUpFailed>;
  logout:         ()                                  => Dispatch<actions.ILogout>;
}

interface AuthStateLocal {
  signingUp:         boolean;
  value:             string;
  signUpCredentials: any;
}

const Form = t.form.Form;

class Auth extends React.Component<AuthProps, AuthStateLocal> {
  public loginViewRef: any;
  public signUpViewRef: any;
  public state: Readonly<AuthStateLocal> = {
    signingUp:         false,
    value:             '',
    signUpCredentials: {...SignUpCredentialsForm}
  };

  public handleLoginViewRef = (ref: any) => this.loginViewRef = ref;
  public handleSignUpViewRef = (ref: any) => this.signUpViewRef = ref;

  public componentWillMount(): void {
    if (this.props.navigation.getParam('loggedOutAction')) {
      this.props.logout();
      return;
    }

    this.props.authUserStart();
  }

  public componentDidMount(): void {
    getAuthToken(authToken => {
      if (authToken) {
        const [userID, token] = authToken.split('-');
        axios.defaults.headers = { 'Authorization': 'Bearer ' + token }

        this.props.authUser(+userID, token);
      }

      setTimeout(() => {
        if (this.props.loading) this.props.authUserStop();
      }, 2000);
    });
  }

  public componentDidUpdate(): void {
    if (this.props.isAuth) {
      this.navigateToTabs();
      return;
    }
  }

  public navigateToTabs = (): void => {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'Tabs' })
      ]
    });

    this.props.navigation.dispatch(resetAction);
  };

  public handleChangeAuthForm = (ref: any, signingUp: boolean): void => {
    ref.fadeIn(500);
    this.setState({ signingUp });
  };

  public handleLogin = (): void => {
    Keyboard.dismiss();

    const value = this.refs.loginForm.getValue();
    if (!value) return

    const { email, password } = value;
    const credentials: AuthCredentials = { email, password };

    this.props.authUserStart();
    this.props.login(credentials);
  };

  public handleSignUp = (): void => {
    const value = this.refs.signUpForm.getValue();
    if (!value) return;

    if (value.password !== value.confirmPassword) {
      const signUpCredentials = cloneDeep(this.state.signUpCredentials);
      signUpCredentials.options.fields.confirmPassword.hasError = true;

      this.setState({ signUpCredentials });
      return;
    }

    const { firstName, lastName, email, password } = value;
    const credentials: AuthCredentials = {
      firstName,
      lastName,
      email,
      password
    };

    this.props.signUp(credentials);
  }

  public renderLogin = (): JSX.Element => (
    <Animatable.View ref={this.handleLoginViewRef}>
      <Form
        ref="loginForm"
        type={LoginCredentialsForm.type}
        value={this.state.value}
        options={LoginCredentialsForm.options}
        onChange={(value: string) => this.setState({ value })}>
      </Form>
      <Button
        onPress={this.handleLogin}
        style={[styles.btn, globalStyles.btn, globalStyles.btnSuccess]}
        disabled={this.props.loading}
        block>
        <Text style={globalStyles.btnText}>
          login
        </Text>
      </Button>
      <Button
        onPress={() => this.handleChangeAuthForm(this.loginViewRef, true)}
        style={[styles.btn, globalStyles.btn, globalStyles.btnSecondaryOutline]}
        block
        light>
        <Text style={globalStyles.btnText}>create account</Text>
      </Button>
    </Animatable.View>
  );

  public renderSignUp = (): JSX.Element => (
    <Animatable.View ref={this.handleSignUpViewRef}>
      <Form
        ref="signUpForm"
        type={this.state.signUpCredentials.type}
        options={this.state.signUpCredentials.options}
        value={this.state.value}
        onChange={(value: string) => this.setState({ value })}>
      </Form>
      <Button
        style={[styles.btn, globalStyles.btn, globalStyles.btnSuccess]}
        onPress={this.handleSignUp}
        block>
        <Text style={globalStyles.btnText}>sign up</Text>
      </Button>
      <Button
        style={[styles.btn, globalStyles.btn, globalStyles.btnSecondaryOutline]}
        onPress={() => this.handleChangeAuthForm(this.signUpViewRef, false)}
        block
        light>
        <Text style={globalStyles.btnText}>back to login</Text>
      </Button>
    </Animatable.View>
  );

  public render(): JSX.Element {
    if (this.props.loading) return <Spinner />;

    return (
      <Container style={globalStyles.primaryBG}>
        <Header style={globalStyles.primaryBG} />
        <Content style={{paddingLeft: 15, paddingRight: 15}}>
          <View style={{alignItems: 'center', marginBottom: Dimensions.get('window').height / 6.5}}>
            <Animatable.Text
              animation="bounceIn"
              duration={2000}
              style={styles.header}>
              StudyGroups
            </Animatable.Text>
          </View>
          <Animatable.View
            animation="fadeIn"
            duration={500}>
            {this.state.signingUp ? this.renderSignUp() : this.renderLogin()}
          </Animatable.View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    color: '#fff',
    fontFamily: 'rubik-medium',
    fontSize: 60
  },
  btn: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  }
});

const mapStateToProps = ({ auth }: AppState) => ({ ...auth });

const mapDispatchToProps = (dispatch: Dispatch<actions.AuthAction>) => ({
  authUserStart: ()                                  => dispatch(actions.authUserStart()),
  authUserStop:  ()                                  => dispatch(actions.authUserStop()),
  authUser:      (userID: number, authToken: string) => dispatch(actions.authUser(userID, authToken)),
  login:         (credentials: AuthCredentials)      => dispatch(actions.login(credentials)),
  signUp:        (credentials: AuthCredentials)      => dispatch(actions.signUp(credentials)),
  logout:        ()                                  => dispatch(actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
