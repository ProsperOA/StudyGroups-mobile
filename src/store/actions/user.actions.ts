import { Action, ActionCreator, Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';
import * as _ from 'lodash';
import { ProfileInfo } from '../../models/profile-info.model';
import axios      from '../../shared/axios';
import * as types from './types';

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

export type UserAction =
  | IUpdateProfileStart
  | IUpdateProfileSuccess
  | IUpdateProfileFailed
  | IUploadAvatarSuccess
  | IUploadAvatarFailed;

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