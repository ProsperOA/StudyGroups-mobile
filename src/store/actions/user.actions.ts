import { Action, ActionCreator, Dispatch } from 'redux';
import { AxiosResponse, AxiosError }       from 'axios';

import axios      from '../../shared/axios';
import * as types from './types';

export interface IGetCurrentUserSuccess extends Action {
  type:    types.GET_CURRENT_USER_SUCCESS;
  payload: any;
}

export interface IGetCurrentUserFailed extends Action {
  type: types.GET_CURRENT_USER_FAILED;
}

export type UserAction =
  | IGetCurrentUserSuccess
  | IGetCurrentUserFailed;

  const getUserSuccess: ActionCreator<IGetCurrentUserSuccess> = (user: any): IGetCurrentUserSuccess => ({
    type:    types.GET_CURRENT_USER_SUCCESS,
    payload: user
  });

  const getUserFailed: ActionCreator<IGetCurrentUserFailed> = (user: any): IGetCurrentUserFailed => ({
    type:    types.GET_CURRENT_USER_FAILED
  });

  export const getUser = (userID: number): any =>
    (dispatch: Dispatch<IGetCurrentUserSuccess | IGetCurrentUserFailed>) => {
      axios.get('/users/' + userID)
        .then(({ data }: AxiosResponse) => {
          console.log(data)
          dispatch(getUserSuccess(data.data))
        })
        .catch(({ response }: AxiosError) => {
          console.log(response);
          dispatch(getUserFailed(response ? response.data.message : 'unable to get current user'))
        });
  }