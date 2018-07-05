import { Action, ActionCreator, Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';
import * as _ from 'lodash';

import navService from '../../shared/navigation-service';
import { ProfileInfo } from '../../models/profile-info.model';
import axios      from '../../shared/axios';
import * as types from './types';
import { ChangePassword } from '../../models/change-password.model';

export interface IUpdateProfileStart extends Action {
  type: types.UPDATE_PROFILE_START
}

export interface IUpdateProfileSuccess extends Action {
  type:    types.UPDATE_PROFILE_SUCCESS;
  payload: any;
}

export interface IUpdateProfileFailed extends Action {
  type:    types.UPDATE_PROFILE_FAILED;
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

export interface IChangePasswordSuccess extends Action {
  type:    types.CHANGE_PASSWORD_SUCCESS;
  payload: string;
}

export interface IChangePasswordFailed extends Action {
  type:    types.CHANGE_PASSWORD_FAILED;
  payload: string;
}

export interface IDeleteAccountSuccess extends Action {
  type: types.DELETE_ACCOUNT_SUCCESS
}

export interface IDeleteAccountFailed extends Action {
  type:    types.DELETE_ACCOUNT_FAILED;
  payload: string
}

export type UserAction =
  | IUpdateProfileStart
  | IUpdateProfileSuccess
  | IUpdateProfileFailed
  | IUploadAvatarSuccess
  | IUploadAvatarFailed
  | IChangePasswordSuccess
  | IChangePasswordFailed
  | IDeleteAccountSuccess
  | IDeleteAccountFailed;

const updateProfileSuccess: ActionCreator<IUpdateProfileSuccess> =
  (user: any): IUpdateProfileSuccess => ({
    type:    types.UPDATE_PROFILE_SUCCESS,
    payload: user
});

const updateProfileFailed: ActionCreator<IUpdateProfileFailed> =
  (errMsg: string): IUpdateProfileFailed => ({
    type:    types.UPDATE_PROFILE_FAILED,
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

const changePasswordSuccess: ActionCreator<IChangePasswordSuccess> =
 (message: string): IChangePasswordSuccess => ({
   type:    types.CHANGE_PASSWORD_SUCCESS,
   payload: message
  });

const changePasswordFailed: ActionCreator<IChangePasswordFailed> =
 (errMsg: string): IChangePasswordFailed => ({
   type:    types.CHANGE_PASSWORD_FAILED,
   payload: errMsg
});

const deleteAccountSuccess: ActionCreator<IDeleteAccountSuccess> = (): IDeleteAccountSuccess => ({
  type: types.DELETE_ACCOUNT_SUCCESS
});

const deleteAccountFailed: ActionCreator<IDeleteAccountFailed> = (errMsg: string): IDeleteAccountFailed => ({
  type:    types.DELETE_ACCOUNT_FAILED,
  payload: errMsg
});

export const updateProfileStart: ActionCreator<IUpdateProfileStart> = (): IUpdateProfileStart => ({
  type: types.UPDATE_PROFILE_START
});

export const updateProfile = (userID: string, profileInfo: ProfileInfo): any =>
  (dispatch: Dispatch<UserAction>) => {
    const data = {
      first_name: profileInfo.firstName,
      last_name:  profileInfo.lastName,
      ...profileInfo
    };

    _.omit(data, ['firstName', 'lastName']);

    axios.patch(`users/${userID}/account`, data)
      .then(({ data }: AxiosResponse) => dispatch(updateProfileSuccess(data.data)))
      .catch(({ response }: AxiosError) => {
        dispatch(updateProfileFailed(response ? response.data.message : 'unable to update profile'));
      });
};

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
};

export const changePassword = (userID: string, passwords: ChangePassword): any =>
  (dispatch: Dispatch<UserAction>) => {
    const {
      currentPassword: current_password,
      newPassword:     new_password,
      confirmPassword: confirm_password
    } = passwords;

    axios.patch(`users/${userID}/password`, { current_password, new_password, confirm_password})
      .then(() => dispatch(changePasswordSuccess('pasword updated')))
      .catch(({ response }: AxiosError) => dispatch(changePasswordFailed(response ? response.data.message : 'unable to change password')));
};

export const deleteAccount = (userID: string, password: string): any =>
  (dispatch: Dispatch<IDeleteAccountSuccess | IDeleteAccountFailed>) => {
    axios.post(`users/${userID}/delete`, { password })
      .then(() => {
        navService.navigate('Auth', { loggedOutAction: true}, true);
        dispatch(deleteAccountSuccess());
      })
      .catch(({ response }: AxiosError) => {
        dispatch(deleteAccountFailed(response ? response.data.message : 'unable to delete account'));
      });
};