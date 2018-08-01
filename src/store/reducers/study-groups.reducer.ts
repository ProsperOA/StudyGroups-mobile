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
      const newStudyGroup = action.payload;
      const newStudyGroups = [...state.userGroups];
      const index = _.findIndex(state.userGroups, (group: any) => (
        group.id === newStudyGroup.id
      ));
      newStudyGroups[index] = newStudyGroup;
      return {...state, userGroups: newStudyGroups};
    case types.GET_STUDY_GROUP_MEMBERS_FAILED:
    default:
      return state;
  }
};
