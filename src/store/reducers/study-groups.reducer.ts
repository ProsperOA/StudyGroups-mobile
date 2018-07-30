import * as types            from '../actions/types';
import * as _                from 'lodash';
import { StudyGroupsAction } from '../actions';

export interface StudyGroupsState {
  groups:     any;
  userGroups: any;
  users:      any;
  loading:    boolean;
}

const initialState: Readonly<StudyGroupsState> = {
  groups:     null,
  userGroups: null,
  users:      null,
  loading:    false
};

const updateStudyGroups = (studyGroups: any[], newStudyGroup: any): any => {
  const newStudyGroups = _.cloneDeep(studyGroups);

  newStudyGroups.map(group => {
    if (group.id === newStudyGroup.id) return newStudyGroup;
  });

  return newStudyGroups;
};

export default (state: StudyGroupsState = initialState, action: StudyGroupsAction): StudyGroupsState => {
  switch (action.type) {
    case types.GET_STUDY_GROUPS_START:
      return {...state, loading: true};
    case types.GET_STUDY_GROUPS_SUCCESS:
      return {...state, groups: action.payload, loading: false};
    case types.GET_STUDY_GROUPS_FAILED:
      return {...state, loading: false};
    case types.GET_STUDY_GROUP_MEMBERS_SUCCESS:
      return {...state, users: action.payload};
    case types.GET_USER_STUDY_GROUPS_SUCCESS:
      return {...state, userGroups: action.payload, loading: false};
    case types.GET_USER_STUDY_GROUPS_FAILED:
      return {...state, loading: false};
    case types.UPDATE_STUDY_GROUP_SUCCESS:
      const { userGroups } = state;
      return {...state, userGroups: updateStudyGroups(userGroups, action.payload)};
    case types.GET_STUDY_GROUP_MEMBERS_FAILED:
    default:
      return state;
  }
};
