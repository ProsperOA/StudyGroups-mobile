import * as types                 from '../actions/types';
import { StudyGroupsAction } from '../actions';

export interface StudyGroupsState {
  groups:  any;
  loading: boolean;
}

const initialState: Readonly<StudyGroupsState> = {
  groups:  null,
  loading: false,
};

export default (state: StudyGroupsState = initialState, action: StudyGroupsAction): StudyGroupsState => {
  switch (action.type) {
    case types.GET_STUDY_GROUPS_START:
      return {...state, loading: true};
    case types.GET_STUDY_GROUPS_SUCCESS:
      return {...state, groups: action.payload, loading: false};
    case types.GET_STUDY_GROUPS_FAILED:
      return {...state, loading: false};
    default:
      return state;
  }
};
