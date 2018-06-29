import { Action, ActionCreator, Dispatch } from 'redux';
import { AxiosResponse }                   from 'axios';

import axios               from '../../shared/axios';
import * as types          from './types';
import { AuthCredentials } from '../../models/auth-credentials.model';

export interface ILoginSuccess extends Action {
  type:    types.LOGIN_SUCCESS;
  payload: {
    user:  any;
    token: string;
  };
}

export interface ILoginFailed extends Action {
  type: types.LOGIN_FAILED
}

export interface ISignUpSuccess extends Action {
  type: types.SIGNUP_SUCCESS;
  payload: {
    user: any;
    token: string;
  }
}

export interface ISignUpFailed extends Action {
  type: types.SIGNUP_FAILED;
}

export type AuthAction =
  | ILoginSuccess
  | ILoginFailed
  | ISignUpSuccess
  | ISignUpFailed;

const loginSuccess: ActionCreator<ILoginSuccess> = (data: any): ILoginSuccess => ({
  type: types.LOGIN_SUCCESS,
  payload: {
    user:  data.user,
    token: data.auth_token
  }
});

const loginFailed: ActionCreator<ILoginFailed> = (): ILoginFailed => ({
  type: types.LOGIN_FAILED
});

const signUpSuccess: ActionCreator<ISignUpSuccess> = (data: any): ISignUpSuccess => ({
  type: types.SIGNUP_SUCCESS,
  payload: {
    user: data.user,
    token: data.auth_token
  } 
});

const signUpFailed: ActionCreator<ISignUpFailed> = (): ISignUpFailed => ({
  type: types.SIGNUP_FAILED,
});

export const login = ({ email, password }: AuthCredentials): any =>
  (dispatch: Dispatch<AuthAction>): void => {
    axios.post('/login', { email, password })
      .then(({ data }: AxiosResponse) => dispatch(loginSuccess(data.data)))
      .catch(() => dispatch(loginFailed()));
};

export const signUp = (credentials: AuthCredentials): any =>
  (dispatch: Dispatch<AuthAction>): void => {
    const { email, password } = credentials;

    const data = {
      first_name: credentials.firstName,
      last_name: credentials.lastName,
      email,
      password
    };

    axios.post('/signup', data)
      .then(({ data }: AxiosResponse) => dispatch(signUpSuccess(data.data)))
      .catch(() => dispatch(signUpFailed()));
  }