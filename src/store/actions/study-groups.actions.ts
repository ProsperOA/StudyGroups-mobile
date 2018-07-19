import { ActionCreator, Dispatch }   from 'redux';
import { AxiosResponse, AxiosError } from 'axios';

import * as notificationService from '../../shared/services/notification.service';
import { StudyGroupsFilter } from '../../models/filters/study-groups.filter';

import * as types from './types';
import axios      from '../../shared/axios';

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

export type StudyGroupsAction =
  | IGetStudyGroupsStart
  | IGetStudyGroupsSuccess
  | IGetStudyGroupsFailed;

const getStudyGroupsSuccess: ActionCreator<IGetStudyGroupsSuccess> =
  (studyGroups: any): IGetStudyGroupsSuccess => ({
    type:    types.GET_STUDY_GROUPS_SUCCESS,
    payload: studyGroups
});

const getStudyGroupsFailed: ActionCreator<IGetStudyGroupsFailed> =
  (): IGetStudyGroupsFailed => ({
    type: types.GET_STUDY_GROUPS_FAILED
});

export const getStudyGroupsStart: ActionCreator<IGetStudyGroupsStart> =
  (): IGetStudyGroupsStart => ({
    type: types.GET_STUDY_GROUPS_START
});

export const getStudyGroups = (filter: StudyGroupsFilter): any =>
  (dispatch: Dispatch<IGetStudyGroupsSuccess | IGetStudyGroupsFailed>): void => {
    const {
      name,
      location,
      instructor,
      term,
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
      name,
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