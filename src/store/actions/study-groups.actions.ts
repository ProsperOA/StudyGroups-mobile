import { ActionCreator, Dispatch }   from 'redux';
import { AxiosResponse, AxiosError } from 'axios';

import * as types               from './types';
import * as notificationService from '../../shared/services/notification.service';
import axios                    from '../../shared/axios';
import { BaseFilter }           from '../../models/filters/base.filter';
import { StudyGroupsFilter }    from '../../models/filters/study-groups.filter';
import { StudyGroupSection }    from '../../models/study-group.model';

export interface IGetStudyGroupsStart {
  type: types.GET_STUDY_GROUPS_START
}

export interface IGetStudyGroupsSuccess {
  type:    types.GET_STUDY_GROUPS_SUCCESS,
  payload: any;
}

export interface IGetStudyGroupsFailed {
  type: types.GET_STUDY_GROUPS_FAILED
}

export interface IGetStudyGroupMembersSuccess {
  type:    types.GET_STUDY_GROUP_MEMBERS_SUCCESS,
  payload: any;
}

export interface IGetStudyGroupMembersFailed {
  type: types.GET_STUDY_GROUP_MEMBERS_FAILED
}

export interface IGetUserStudyGroupsSuccess {
  type:    types.GET_USER_STUDY_GROUPS_SUCCESS;
  payload: any;
}

export interface ICreateStudyGroupSuccess {
  type:    types.CREATE_STUDY_GROUP_SUCCESS;
  payload: any;
}

export interface ICreateStudyGroupFailed {
  type: types.CREATE_STUDY_GROUP_FAILED
}

export interface IGetUserStudyGroupsFailed {
  type: types.GET_USER_STUDY_GROUPS_FAILED
}

export interface IUpdateStudyGroupSuccess {
  type:    types.UPDATE_STUDY_GROUP_SUCCESS;
  payload: any;
}

export interface IUpdateStudyGroupFailed {
  type: types.UPDATE_STUDY_GROUP_FAILED
}

export interface IMoveUserFromWaitlistToMembersSuccess {
  type:    types.MOVE_USER_FROM_WAITLIST_TO_MEMBERS_SUCCESS,
  payload: {
    studyGroup: any;
    userID:     number;
  };
}

export interface IMoveUserFromWaitlistToMembersFailed {
  type: types.MOVE_USER_FROM_WAITLIST_TO_MEMBERS_FAILED
}

export interface ILeaveStudyGroupSuccess {
  type: types.LEAVE_STUDY_GROUP_SUCCESS,
  payload: {
    studyGroup: any;
    userID:     number;
    section:    StudyGroupSection
  };
}

export interface ILeaveStudyGroupFailed {
  type: types.LEAVE_STUDY_GROUP_FAILED
}

export type StudyGroupsAction =
  | IGetStudyGroupsStart
  | IGetStudyGroupsSuccess
  | IGetStudyGroupsFailed
  | IGetStudyGroupMembersSuccess
  | IGetStudyGroupMembersFailed
  | IGetUserStudyGroupsSuccess
  | IGetUserStudyGroupsFailed
  | ICreateStudyGroupSuccess
  | ICreateStudyGroupFailed
  | IUpdateStudyGroupSuccess
  | IUpdateStudyGroupFailed
  | IMoveUserFromWaitlistToMembersSuccess
  | IMoveUserFromWaitlistToMembersFailed
  | ILeaveStudyGroupSuccess
  | ILeaveStudyGroupFailed;

const getStudyGroupsSuccess: ActionCreator<IGetStudyGroupsSuccess> =
  (studyGroups: any): IGetStudyGroupsSuccess => ({
    type:    types.GET_STUDY_GROUPS_SUCCESS,
    payload: studyGroups
});

const getStudyGroupsFailed: ActionCreator<IGetStudyGroupsFailed> =
  (): IGetStudyGroupsFailed => ({
    type: types.GET_STUDY_GROUPS_FAILED
});

const getStudyGroupMembersSuccess: ActionCreator<IGetStudyGroupMembersSuccess> =
  (members: any): IGetStudyGroupMembersSuccess => ({
    type: types.GET_STUDY_GROUP_MEMBERS_SUCCESS,
    payload: members
});

const getStudyGroupMembersFailed: ActionCreator<IGetStudyGroupMembersFailed> =
  (): IGetStudyGroupMembersFailed => ({
    type: types.GET_STUDY_GROUP_MEMBERS_FAILED
});

const getUserStudyGroupsSuccess: ActionCreator<IGetUserStudyGroupsSuccess> =
  (studyGroups: any): IGetUserStudyGroupsSuccess => ({
    type:    types.GET_USER_STUDY_GROUPS_SUCCESS,
    payload: studyGroups
});

const getUserStudyGroupsFailed: ActionCreator<IGetUserStudyGroupsFailed> =
  (): IGetUserStudyGroupsFailed => ({
    type: types.GET_USER_STUDY_GROUPS_FAILED
});

export const getStudyGroupsStart: ActionCreator<IGetStudyGroupsStart> =
  (): IGetStudyGroupsStart => ({
    type: types.GET_STUDY_GROUPS_START
});

const createStudyGroupSuccess: ActionCreator<ICreateStudyGroupSuccess> =
  (studyGroup: any): ICreateStudyGroupSuccess => ({
    type:    types.CREATE_STUDY_GROUP_SUCCESS,
    payload: studyGroup
});


const createStudyGroupFailed: ActionCreator<ICreateStudyGroupFailed> =
  (): ICreateStudyGroupFailed => ({
    type: types.CREATE_STUDY_GROUP_FAILED
});

const updateStudyGroupSuccess: ActionCreator<IUpdateStudyGroupSuccess> =
  (studyGroup: any): IUpdateStudyGroupSuccess => ({
    type:    types.UPDATE_STUDY_GROUP_SUCCESS,
    payload: studyGroup
});

const updateStudyGroupFailed: ActionCreator<IUpdateStudyGroupFailed> =
  (): IUpdateStudyGroupFailed => ({
    type: types.UPDATE_STUDY_GROUP_FAILED
});

const moveUserFromWaitlistToMembersSuccess: ActionCreator<IMoveUserFromWaitlistToMembersSuccess> =
  (studyGroup: any, userID: number): IMoveUserFromWaitlistToMembersSuccess => ({
    type:    types.MOVE_USER_FROM_WAITLIST_TO_MEMBERS_SUCCESS,
    payload: {studyGroup, userID}
});

const moveUserFromWaitlistToMembersFailed: ActionCreator<IMoveUserFromWaitlistToMembersFailed> =
  (): IMoveUserFromWaitlistToMembersFailed => ({
    type: types.MOVE_USER_FROM_WAITLIST_TO_MEMBERS_FAILED
});

const leaveStudyGroupSuccess: ActionCreator<ILeaveStudyGroupSuccess> =
  (studyGroup: any, userID: number, section: StudyGroupSection): ILeaveStudyGroupSuccess => ({
    type: types.LEAVE_STUDY_GROUP_SUCCESS,
    payload: {
      studyGroup,
      userID,
      section
    }
});

const leaveStudyGroupFailed: ActionCreator<ILeaveStudyGroupFailed> =
  (): ILeaveStudyGroupFailed => ({
    type: types.LEAVE_STUDY_GROUP_FAILED
});

export const getStudyGroups = (filter: StudyGroupsFilter): any =>
  (dispatch: Dispatch<IGetStudyGroupsSuccess | IGetStudyGroupsFailed>): void => {
    const {
      location,
      instructor,
      term,
      studyGroupName: study_group_name,
      pageIndex:      page_index,
      pageSize:       page_size,
      availableSpots: available_spots,
      courseCode:     course_code,
      courseName:     course_name,
      meetingDate:    meeting_date
    } = filter;

    const data = {
      page_index,
      page_size,
      study_group_name,
      course_code,
      course_name,
      instructor,
      term,
      location,
      available_spots,
      meeting_date
    };

    axios.get('/study_groups', {params: data})
      .then(({ data }: AxiosResponse) => dispatch(getStudyGroupsSuccess(data.data)))
      .catch(({ response }: AxiosError) => {
        const error = response ? response.data.message : 'unable to get study groups';

        const toastConfig = {
          ...notificationService.defaultToastConfig,
          type: 'danger',
          text: error
        };

        notificationService.toast(toastConfig);
        dispatch(getStudyGroupsFailed());
      });
};

export const getStudyGroupMembers = (studyGroupID: string): any =>
  (dispatch: Dispatch<IGetStudyGroupMembersSuccess | IGetStudyGroupMembersFailed>): void => {
    console.log('getting study group members')
    axios.get(`/study_groups/${studyGroupID}/members`)
      .then(({ data }: AxiosResponse) => dispatch(getStudyGroupMembersSuccess(data.data)))
      .catch(() => dispatch(getStudyGroupMembersFailed()));
};

export const getUserStudyGroups = (userID: string, filter: BaseFilter): any =>
  (dispatch: Dispatch<IGetUserStudyGroupsSuccess | IGetUserStudyGroupsFailed>): void => {
    const data = {
      page_index: filter.pageIndex,
      pageSize:   filter.pageSize
    };

    axios.get(`/users/${userID}/study_groups`, {params: data})
      .then(({ data }: AxiosResponse) => dispatch(getUserStudyGroupsSuccess(data.data)))
      .catch(() => dispatch(getUserStudyGroupsFailed()));
};

export const createStudyGroup = (studyGroup: any): any =>
  (dispatch: Dispatch<ICreateStudyGroupSuccess| ICreateStudyGroupFailed>): void => {
    axios.post('/study_groups', {...studyGroup})
      .then(() => dispatch(createStudyGroupSuccess(studyGroup)))
      .catch(({ response }: AxiosError) => {
        const error = response ? response.data.message : 'unable to update study group';

        const toastConfig = {
          ...notificationService.defaultToastConfig,
          type: 'danger',
          text: error
        };

        notificationService.toast(toastConfig);
        dispatch(createStudyGroupFailed());
      });
};

export const updateStudyGroup = (studyGroup: any): any =>
  (dispatch: Dispatch<IUpdateStudyGroupSuccess | IUpdateStudyGroupFailed>): void => {
    axios.patch(`/study_groups/${studyGroup.id}`, {...studyGroup})
      .then(() => {
        dispatch(updateStudyGroupSuccess(studyGroup));

        const toastConfig = {
          ...notificationService.defaultToastConfig,
          type: 'success',
          text: 'study group updated'
        };
        notificationService.toast(toastConfig);
      })
      .catch(({ response }: AxiosError) => {
        const error = response ? response.data.message : 'unable to update study group';

        const toastConfig = {
          ...notificationService.defaultToastConfig,
          type: 'danger',
          text: error
        };

        notificationService.toast(toastConfig);
        dispatch(updateStudyGroupFailed());
      });
};

export const moveUserFromWaitlistToMembers = (studyGroupID: number, userID: number): any =>
  (dispatch: Dispatch<IMoveUserFromWaitlistToMembersSuccess | IMoveUserFromWaitlistToMembersFailed>): void => {
    axios.patch(`/study_groups/${studyGroupID}/waitlist_to_members`, {user_id: userID})
      .then(({ data }: AxiosResponse) => {
        const studyGroup = data.data;
        dispatch(moveUserFromWaitlistToMembersSuccess({studyGroup, userID}));
      })
      .catch(({ response }: AxiosError) => {
        const error = response ? response.data.message : 'unable to join study group';

        const toastConfig = {
          ...notificationService.defaultToastConfig,
          type: 'danger',
          text: error
        };

        notificationService.toast(toastConfig);
        dispatch(moveUserFromWaitlistToMembersFailed());
      });
};

export const leaveStudyGroup = (studyGroup: any, userID: number, section: StudyGroupSection): any =>
  (dispatch: Dispatch<ILeaveStudyGroupSuccess | ILeaveStudyGroupFailed>): void => {
    axios.patch(`/study_groups/${studyGroup.id}/leave`, {user_id: userID})
      .then(() => dispatch(leaveStudyGroupSuccess(studyGroup, userID, section)))
      .catch(({ response }: AxiosError) => {
        const error = response ? response.data.message : 'unable to leave study group';

        const toastConfig = {
          ...notificationService.defaultToastConfig,
          type: 'danger',
          text: error
        };

        notificationService.toast(toastConfig);
        dispatch(leaveStudyGroupFailed());
      });
};