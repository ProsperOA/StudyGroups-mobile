import { ActionCreator, Dispatch } from 'redux';
import { AxiosResponse, AxiosError }       from 'axios';

import * as types                           from './types';
import axios                                from '../../shared/axios';
import { AuthCredentials }                  from '../../models/auth-credentials.model';
import { storeAuthToken, removeAuthToken }  from '../../shared/auth-token';
import { toast }                            from '../../shared/services/notification.service';

export interface IAuthUserSuccess {
  type:    types.AUTH_USER_SUCCESS;
  payload: any;
}
export interface IAuthUserFailed {
  type: types.AUTH_USER_FAILED;
}

export interface IAuthUserStart {
  type: types.AUTH_USER_START
}

export interface IAuthUserStop {
  type: types.AUTH_USER_STOP
}

export interface ILoginSuccess {
  type: types.LOGIN_SUCCESS;
  payload: {
    user:  any;
    token: string;
  };
}

export interface ILoginFailed {
  type:    types.LOGIN_FAILED;
  payload: string;
}

export interface ISignUpSuccess {
  type: types.SIGNUP_SUCCESS;
  payload: {
    user:  any;
    token: any;
  };
}

export interface ISignUpFailed {
  type:    types.SIGNUP_FAILED;
  payload: string;
}

export interface ILogout {
  type: types.LOGOUT
}

export type AuthAction =
  | IAuthUserStart
  | IAuthUserStop
  | IAuthUserSuccess
  | IAuthUserFailed
  | ILoginSuccess
  | ILoginFailed
  | ISignUpSuccess
  | ISignUpFailed
  | ILogout;

const loginSuccess: ActionCreator<ILoginSuccess> =
  (user: any, token: string): ILoginSuccess => ({
    type:    types.LOGIN_SUCCESS,
    payload: { user, token }
});

const loginFailed: ActionCreator<ILoginFailed> =
  (errMsg: any): ILoginFailed => ({
    type:    types.LOGIN_FAILED,
    payload: errMsg
});

const signUpSuccess: ActionCreator<ISignUpSuccess> =
  (user: any, token: string): ISignUpSuccess => ({
    type:    types.SIGNUP_SUCCESS,
    payload: { user, token }
});

const signUpFailed: ActionCreator<ISignUpFailed> =
  (errMsg: string): ISignUpFailed => ({
    type:    types.SIGNUP_FAILED,
    payload: errMsg
});

const authUserSuccess: ActionCreator<IAuthUserSuccess> =
  (user: any): IAuthUserSuccess => ({
    type:    types.AUTH_USER_SUCCESS,
    payload: user
});

const authUserFailed: ActionCreator<IAuthUserFailed> =
  (user: any): IAuthUserFailed => ({
    type: types.AUTH_USER_FAILED
});

export const authUserStart: ActionCreator<IAuthUserStart> =
  (): IAuthUserStart => ({
    type: types.AUTH_USER_START
});

export const authUserStop: ActionCreator<IAuthUserStop> =
  (): IAuthUserStop => ({
    type: types.AUTH_USER_STOP
});

export const logout: ActionCreator<ILogout> =
  (): ILogout => {
    removeAuthToken();
    return { type: types.LOGOUT };
};

export const authUser = (userID: number, authToken: string): any =>
  (dispatch: Dispatch<AuthAction>) => {
    axios.get('/users/' + userID)
      .then(({ data }: AxiosResponse) => {
        const user = data.data;

        dispatch(authUserSuccess(user));
        dispatch(loginSuccess(user, authToken));
      })
      .catch(({ response }: AxiosError) => {
        dispatch(authUserFailed(response ? response.data.message : 'unable to get current user'));
        dispatch(loginFailed(''));
      });
};

export const login = ({ email, password }: AuthCredentials): any =>
  (dispatch: Dispatch<ILoginSuccess | ILoginFailed>): void => {
    axios.post('/login', { email, password })
      .then(({ data }: AxiosResponse) => {
        const { user, auth_token } = data.data;

        storeAuthToken(user.id, auth_token);
        dispatch(loginSuccess(user, auth_token))
      })
      .catch(({ response }: AxiosError) => {
        const error = response ? response.data.message : 'unable to login';
        const toastConfig = {
          type: 'danger',
          text: error,
          textStyle: {
            color:      '#fff',
            fontWeight: 'bold',
            textAlign:  'center'
          },
          position: 'bottom',
        };

        toast(toastConfig);
        dispatch(loginFailed(error));
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
        dispatch(signUpFailed(response ? response.data.message : 'unable to sign up'));
      });
};