import * as React from 'react';
import {
  Keyboard,
  StyleSheet,
  View,
} from 'react-native';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Spinner,
  Text,
  Title,
  Toast
} from 'native-base';
import { NavigationScreenProp, NavigationActions, StackActions } from 'react-navigation';
import { Grid, Row } from 'react-native-easy-grid';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import * as t from 'tcomb-form-native';
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
  public state: Readonly<AuthStateLocal> = {
    signingUp:         false,
    value:             '',
    signUpCredentials: {...SignUpCredentialsForm}
  };

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
    <Body>
      <Form
        ref="loginForm"
        type={LoginCredentialsForm.type}
        value={this.state.value}
        options={LoginCredentialsForm.options}
        onChange={(value: string) => this.setState({ value })}>
      </Form>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Button
          onPress={this.handleLogin}
          style={styles.btnLeft}
          disabled={this.props.loading}>
          <Text>
            {this.props.loading ? <Spinner color="#fff" /> : 'Login'}
          </Text>
        </Button>
        <Button
          onPress={() => this.setState({ signingUp: true })}
          style={styles.btnRight}
          light>
          <Text>Create Account</Text>
        </Button>
      </View>
    </Body>
  );

  public renderSignUp = (): JSX.Element => (
    <Body>
      <Form
        ref="signUpForm"
        type={this.state.signUpCredentials.type}
        options={this.state.signUpCredentials.options}
        value={this.state.value}
        onChange={(value: string) => this.setState({ value })}>
      </Form>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Button
          onPress={this.handleSignUp}
          style={styles.btnLeft}>
          <Text>Sign Up</Text>
        </Button>
        <Button
          onPress={() => this.setState({ signingUp: false })}
          style={styles.btnRight}
          light>
          <Text>Back to Login</Text>
        </Button>
      </View>
    </Body>
  );

  public render(): JSX.Element {
    if (this.props.loading) return <Spinner />;

    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>StudyGroups</Title>
          </Body>
        </Header>
        <Content>
          <Grid>
            <Row size={25} style={{justifyContent: 'center'}}>
              <Text style={styles.header}>StudyGroups</Text>
            </Row>
            <Row size={75}>
              <Card>
                <CardItem>
                  {this.state.signingUp ? this.renderSignUp() : this.renderLogin()}
                </CardItem>
              </Card>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
    marginLeft: 15,
  },
  header: {
    fontFamily: 'rubik-medium',
    fontSize: 60
  },
  btnRight: {
    flex: 0.5,
    marginLeft: 10
  },
  btnLeft: {
    flex: 0.5,
    marginRight: 10
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
