import { Action, ActionCreator, Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';

import axios               from '../../shared/axios';
import * as types          from './types';
import { AuthCredentials } from '../../models/auth-credentials.model';
import { storeAuthToken }  from '../../shared/auth-token';

export interface IAuthUserSuccess extends Action {
  type:    types.AUTH_USER_SUCCESS;
  payload: any;
}
export interface IAuthUserFailed extends Action {
  type: types.AUTH_USER_FAILED;
}

export interface IAuthUserStart extends Action {
  type: types.AUTH_USER_START
}

export interface ILoginSuccess extends Action {
  type: types.LOGIN_SUCCESS;
  payload: {
    user:  any;
    token: string;
  };
}

export interface ILoginFailed extends Action {
  type:    types.LOGIN_FAILED;
  payload: string;
}

export interface ISignUpSuccess extends Action {
  type: types.SIGNUP_SUCCESS;
  payload: {
    user:  any;
    token: any;
  }
}

export interface ISignUpFailed extends Action {
  type: types.SIGNUP_FAILED;
}

export type AuthAction =
  | IAuthUserStart
  | IAuthUserSuccess
  | IAuthUserFailed
  | ILoginSuccess
  | ILoginFailed
  | ISignUpSuccess
  | ISignUpFailed;

const loginSuccess: ActionCreator<ILoginSuccess> = (user: any, token: string): ILoginSuccess => ({
  type: types.LOGIN_SUCCESS,
  payload: { user, token }
});

const loginFailed: ActionCreator<ILoginFailed> = (errMsg: any): ILoginFailed => ({
  type: types.LOGIN_FAILED,
  payload: errMsg
});

const signUpSuccess: ActionCreator<ISignUpSuccess> = (user: any, token: string): ISignUpSuccess => ({
  type: types.SIGNUP_SUCCESS,
  payload: { user, token }
});

const signUpFailed: ActionCreator<ISignUpFailed> = (): ISignUpFailed => ({
  type: types.SIGNUP_FAILED,
});

const authUserSuccess: ActionCreator<IAuthUserSuccess> = (user: any): IAuthUserSuccess => ({
  type:    types.AUTH_USER_SUCCESS,
  payload: user
});

const authUserFailed: ActionCreator<IAuthUserFailed> = (user: any): IAuthUserFailed => ({
  type: types.AUTH_USER_FAILED
});

export const authUserStart: ActionCreator<IAuthUserStart> = (): IAuthUserStart => ({
  type: types.AUTH_USER_START
});

  export const authUser = (userID: number, authToken: string): any => (dispatch: Dispatch<AuthAction>) => {
    axios.get('/users/' + userID)
      .then(({ data }: AxiosResponse) => {
        const user = data.data;

        dispatch(authUserSuccess(user));
        dispatch(loginSuccess(user, authToken));
      })
      .catch(({ response }: AxiosError) => {
        dispatch(authUserFailed(response ? response.data.message : 'unable to get current user'))
        dispatch(loginFailed(''));
      });
  }

export const login = ({ email, password }: AuthCredentials): any =>
  (dispatch: Dispatch<ILoginSuccess | ILoginFailed>): void => {
    axios.post('/login', { email, password })
      .then(({ data }: AxiosResponse) => {
        const { user, auth_token } = data.data;

        storeAuthToken(user.id, auth_token);
        dispatch(loginSuccess(user, auth_token))
      })
      .catch(({ response }: AxiosError) => {
        dispatch(loginFailed(response ? response.data.message : 'unable to login'))
      });
};

export const signUp = (credentials: AuthCredentials): any =>
  (dispatch: Dispatch<ISignUpSuccess | ISignUpFailed>): void => {
    const {
      firstName: first_name,
      lastName:  last_name,
      email,
      password
    } = credentials;

    axios.post('/signup', { first_name, last_name, email, password })
      .then(({ data }: AxiosResponse) => {
        const { user, auth_token } = data.data;

        storeAuthToken(user.id, auth_token);
        dispatch(signUpSuccess(user, auth_token));
      })
      .catch(({ response }: AxiosError) => {
        dispatch(signUpFailed(response ? response.data.message : 'unable to sign up'))
      });
  }