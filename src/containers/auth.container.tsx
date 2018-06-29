import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Input,
  Item,
  Text
} from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as t from 'tcomb-form-native';
import * as actions from '../store/actions';
import { AppState } from '../store/reducers';
import {
  AuthCredentials,
  LoginCredentials,
  SignUpCredentials
} from '../models/auth-credentials.model';

interface AuthProps {
  isAuth: boolean;
  login:  (credentials: AuthCredentials) => Dispatch<actions.ILoginSuccess | actions.ILoginFailed>;
  signUp: (credentials: AuthCredentials) => Dispatch<actions.ISignUpSuccess | actions.ISignUpFailed>;
}

interface AuthState {
  signingUp:         boolean;
  value:             string;
  signUpCredentials: any;
}

const Form = t.form.Form;

class Auth extends React.Component<AuthProps, AuthState> {
  public state: Readonly<AuthState> = {
    signingUp:         false,
    value:             null,
    signUpCredentials: {...SignUpCredentials}
  };

  public handleLogin = (): void => {
    const value = this.refs.loginForm.getValue();
    if (!value) return

    const { email, password } = value;
    const credentials: AuthCredentials = { email, password };

    this.props.login(credentials);
  };

  public handleSignUp = (): void => {
    const value = this.refs.signUpForm.getValue();
    if (!value) return;

    if (value.password !== value.confirmPassword) {
      this.setState(prevState => ({
        signUpCredentials: {
          ...prevState.signUpCredentials, 
          options: {
            ...prevState.signUpCredentials.options,
            fields: {
              ...prevState.signUpCredentials.options.fields,
              confirmPassword: {
                ...prevState.signUpCredentials.options.confirmPassword,
                hasError: true
              }
            }
          }
        } 
      }));

      return;
    }

    const {
      firstName,
      lastName,
      email,
      password
    } = value;

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
        type={LoginCredentials.type}
        value={this.state.value}
        options={LoginCredentials.options}
        onChange={value => this.setState({ value })}>
      </Form>
      <Button onPress={this.handleLogin} block>
        <Text>Login</Text>
      </Button>
      <Button
        onPress={() => this.setState({ signingUp: true })}
        block
        light>
        <Text>Create Account</Text>
      </Button>
    </Body>
  );

  public renderSignUp = (): JSX.Element => (
    <Body>
      <Form
        ref="signUpForm"
        type={this.state.signUpCredentials.type}
        options={this.state.signUpCredentials.options}
        value={this.state.value}
        onChange={value => this.setState({ value })}>
      </Form>
      <Button onPress={this.handleSignUp} block>
        <Text>Sign Up</Text>
      </Button>
      <Button onPress={() => this.setState({ signingUp: false })} block light>
        <Text>Back to Login</Text>
      </Button>
    </Body>
  );

  public render(): JSX.Element {
    return (
      <Container style={styles.container}>
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
    marginLeft: 15
  },
  header: {
    fontFamily: 'rubik-medium',
    fontSize: 60
  }
});

const mapStateToProps = ({ auth: { isAuth }}: AppState) => ({ isAuth });

const mapDispatchToProps = (dispatch: Dispatch<actions.AuthAction>) => ({
  login:  (credentials: AuthCredentials) => dispatch(actions.login(credentials)),
  signUp: (credentials: AuthCredentials) => dispatch(actions.signUp(credentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
