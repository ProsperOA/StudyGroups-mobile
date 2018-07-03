import { Action, ActionCreator, Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';
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
  type:    types.UPDATE_ACCOUNT_FAILED;
  payload: string;
}

export interface IUploadAvatarSuccess extends Action {
  type:    types.UPLOAD_AVATAR_SUCCESS;
  payload: any;
}

export interface IUploadAvatarFailed extends Action {
  type:    types.UPLOAD_AVATAR_FAILED;
  payload: string;
}

export type UserAction =
  | IUpdateAccountStart
  | IUpdateAccountSuccess
  | IUpdateAccountFailed
  | IUploadAvatarSuccess
  | IUploadAvatarFailed;

const updateAccountSuccess: ActionCreator<IUpdateAccountSuccess> =
  (user: any): IUpdateAccountSuccess => ({
    type:    types.UPDATE_ACCOUNT_SUCCESS,
    payload: user
});

const updateAccountFailed: ActionCreator<IUpdateAccountFailed> =
  (errMsg: string): IUpdateAccountFailed => ({
    type:    types.UPDATE_ACCOUNT_FAILED,
    payload: errMsg
});

const uploadAvatarSuccess: ActionCreator<IUploadAvatarSuccess> =
  (user: any): IUploadAvatarSuccess => ({
    type:    types.UPLOAD_AVATAR_SUCCESS,
    payload: user
});

const uploadAvatarFailed: ActionCreator<IUploadAvatarFailed> =
  (errMsg: string): IUploadAvatarFailed => ({
    type:    types.UPLOAD_AVATAR_FAILED,
    payload: errMsg
});

export const updateAccountStart: ActionCreator<IUpdateAccountStart> = (): IUpdateAccountStart => ({
  type: types.UPDATE_ACCOUNT_START
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
      .catch(({ response }: AxiosError) => {
        dispatch(updateAccountFailed(response ? response.data.message : 'unable to update account'));
      });
}

export const uploadAvatar = (user: any, uri: string): any =>
  (dispatch: Dispatch<UserAction>) => {
    const uriParts = uri.split('/');
    const fileName = uriParts[uriParts.length - 1]

    const formData = new FormData();
    formData.append('image', {
      uri,
      name: fileName,
      type: `image/${fileName.split('.')[1]}`
    });

    axios.post(`/users/${user.id}/avatar`, formData)
      .then(({ data }: AxiosResponse) => {
        dispatch(uploadAvatarSuccess({ ...user, avatar: data.data }))
      })
      .catch(({ response }: AxiosError) => {
        dispatch(uploadAvatarFailed(response ? response.data.message : 'unable to upload avatar'));
      });
  }