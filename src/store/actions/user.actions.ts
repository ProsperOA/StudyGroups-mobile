import * as _                        from 'lodash';
import { ActionCreator, Dispatch }   from 'redux';
import { AxiosResponse, AxiosError } from 'axios';
import { Toast }                     from 'native-base';

import * as notificationService from '../../shared/services/notification.service';
import * as types               from './types';
import axios                    from '../../shared/axios';
import navService               from '../../shared/services/navigation.service';
import { ChangePassword }       from '../../models/change-password.model';
import { ProfileInfo }          from '../../models/profile-info.model';

export interface IUpdateProfileStart {
  type: types.UPDATE_PROFILE_START
}

export interface IUpdateProfileSuccess {
  type:    types.UPDATE_PROFILE_SUCCESS;
  payload: any;
}

export interface IUpdateProfileFailed {
  type:    types.UPDATE_PROFILE_FAILED;
  payload: string;
}

export interface IUploadAvatarSuccess {
  type:    types.UPLOAD_AVATAR_SUCCESS;
  payload: any;
}

export interface IUploadAvatarFailed {
  type:    types.UPLOAD_AVATAR_FAILED;
  payload: string;
}

export interface IChangePasswordSuccess {
  type: types.CHANGE_PASSWORD_SUCCESS;
}

export interface IChangePasswordFailed {
  type: types.CHANGE_PASSWORD_FAILED;
}

export interface IDeleteAccountSuccess {
  type: types.DELETE_ACCOUNT_SUCCESS
}

export interface IDeleteAccountFailed {
  type: types.DELETE_ACCOUNT_FAILED;
}

export interface IUpdateCoursesSuccess {
  type:    types.UPDATE_COURSES_SUCCESS;
  payload: any;
}

export interface IUpdateCoursesFailed {
  type: types.UPDATE_COURSES_FAILED
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
  | IDeleteAccountFailed
  | IUpdateCoursesSuccess
  | IUpdateCoursesFailed;

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
  (): IChangePasswordSuccess => ({
    type:    types.CHANGE_PASSWORD_SUCCESS
});

const changePasswordFailed: ActionCreator<IChangePasswordFailed> =
  (): IChangePasswordFailed => ({
    type:    types.CHANGE_PASSWORD_FAILED
});

const deleteAccountSuccess: ActionCreator<IDeleteAccountSuccess> =
  (): IDeleteAccountSuccess => ({
    type: types.DELETE_ACCOUNT_SUCCESS
});

const deleteAccountFailed: ActionCreator<IDeleteAccountFailed> =
  (): IDeleteAccountFailed => ({
    type: types.DELETE_ACCOUNT_FAILED
});

const updateCoursesSuccess: ActionCreator<IUpdateCoursesSuccess> =
  (user: any): IUpdateCoursesSuccess => ({
    type:    types.UPDATE_COURSES_SUCCESS,
    payload: user
});

const updateCoursesFailed: ActionCreator<IUpdateCoursesFailed> =
  (): IUpdateCoursesFailed => ({
    type: types.UPDATE_COURSES_FAILED
});

export const updateProfileStart: ActionCreator<IUpdateProfileStart> =
  (): IUpdateProfileStart => ({
    type: types.UPDATE_PROFILE_START
});

export const updateProfile = (userID: string, profileInfo: ProfileInfo): any =>
  (dispatch: Dispatch<UserAction>) => {
    const data = {
      ...profileInfo,
      first_name: profileInfo.firstName,
      last_name:  profileInfo.lastName
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
      .then(() => {
        const toastConfig = {
          ...notificationService.defaultToastConfig,
          type: 'success',
          text: 'password updated',
        };

        Toast.show(toastConfig);
        dispatch(changePasswordSuccess());
      })
      .catch(({ response }: AxiosError) => {
        const toastConfig = {
          ...notificationService.defaultToastConfig,
          type: 'danger',
          text: response ? response.data.message : 'unable to update password'
        };

        Toast.show(toastConfig);
        dispatch(changePasswordFailed());
      });
};

export const deleteAccount = (userID: string, password: string): any =>
  (dispatch: Dispatch<IDeleteAccountSuccess | IDeleteAccountFailed>) => {
    axios.post(`/users/${userID}/delete`, { password })
      .then(() => {
        navService.navigate('Auth', { loggedOutAction: true}, true);
        dispatch(deleteAccountSuccess());
      })
      .catch(({ response }: AxiosError) => {
        const toastConfig = {
          ...notificationService.defaultToastConfig,
          type: 'danger',
          text: response ? response.data.message : 'unable to update password'
        };

        Toast.show(toastConfig);
        dispatch(deleteAccountFailed());
      });
};

export const updateCourses = (user: any, courses: any): any =>
  (dispatch: Dispatch<IUpdateCoursesSuccess | IUpdateCoursesFailed>) => {
    axios.put(`/users/${user.id}/courses`, courses)
      .then(() => dispatch(updateCoursesSuccess({ ...user, courses })))
      .catch(() => dispatch(updateCoursesFailed()));
};