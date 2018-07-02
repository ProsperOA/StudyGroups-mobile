import { Action, ActionCreator, Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import * as _ from 'lodash';
import { AccountInfo } from '../../models/account-info.model';

import axios      from '../../shared/axios';
import * as types from './types';

export interface IUpdateAccountStart extends Action {
  type: types.UPDATE_ACCOUNT_START
}

export interface IUpdateAccountSuccess extends Action {
  type:    types.UPDATE_ACCOUNT_SUCCESS;
  payload: any;
}

export interface IUpdateAccountFailed extends Action {
  type: types.UPDATE_ACCOUNT_FAILED;
}

export type UserAction =
  | IUpdateAccountStart
  | IUpdateAccountSuccess
  | IUpdateAccountFailed;

export const updateAccountStart: ActionCreator<IUpdateAccountStart> = (): IUpdateAccountStart => ({
  type: types.UPDATE_ACCOUNT_START
});

const updateAccountSuccess: ActionCreator<IUpdateAccountSuccess> =
  (user: any): IUpdateAccountSuccess => ({
    type:    types.UPDATE_ACCOUNT_SUCCESS,
    payload: user
});

const updateAccountFailed: ActionCreator<IUpdateAccountFailed> =
  (): IUpdateAccountFailed => ({
    type: types.UPDATE_ACCOUNT_FAILED
});

export const updateAccount = (userID: string, accountInfo: AccountInfo): any =>
  (dispatch: Dispatch<UserAction>) => {
    const data = {
      first_name: accountInfo.firstName,
      last_name:  accountInfo.lastName,
      ...accountInfo
    };

    _.omit(data, ['firstName', 'lastName']);

    axios.patch(`users/${userID}/account`, data)
      .then(({ data }: AxiosResponse) => dispatch(updateAccountSuccess(data.data)))
      .catch(() => dispatch(updateAccountFailed()));
}