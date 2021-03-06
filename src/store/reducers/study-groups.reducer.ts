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

    case types.CREATE_STUDY_GROUP_SUCCESS:
       let newStudyGroups = _.cloneDeep(state.userGroups);
       newStudyGroups.unshift(action.payload);

       return {...state, userGroups: newStudyGroups};

    case types.UPDATE_STUDY_GROUP_SUCCESS:
      let newStudyGroup = action.payload;
      newStudyGroups = _.cloneDeep(state.userGroups);
      let index = _.findIndex(state.userGroups, (group: any) => (
        group.id === newStudyGroup.id
      ));
      newStudyGroups[index] = newStudyGroup;

      return {...state, userGroups: newStudyGroups};

    case types.MOVE_USER_FROM_WAITLIST_TO_MEMBERS_SUCCESS:
      newStudyGroup = action.payload.studyGroup;
      newStudyGroups = _.cloneDeep(state.userGroups);
      let newUsers = _.cloneDeep(state.users);

      const groupIndex = _.findIndex(state.userGroups, (group: any) => (
        group.id === newStudyGroup.id
      ));
      const userIndex = _.findIndex(state.users.waitlist, (user: any) => (
        user.id === action.payload.userID
      ));

      newStudyGroups[groupIndex] = newStudyGroup;
      const user = newUsers.waitlist.splice(userIndex, 1)[0];
      newUsers.members.unshift(user);

      return {...state, userGroups: newStudyGroups, users: newUsers};

    case types.LEAVE_STUDY_GROUP_SUCCESS:
      const {studyGroup, userID, section} = action.payload;
      newStudyGroups = _.cloneDeep(state.userGroups);
      index = _.findIndex(state.userGroups, (group: any) => (
        group.id === studyGroup.id
      ));
      newStudyGroups[index] = studyGroup;

      newUsers = _.cloneDeep(state.users);
      index = _.findIndex(state.users[section], (user: any) => (
        user.id === userID
      ));
      newUsers[section].splice(index, 1);

      return {...state, userGroups: newStudyGroups, users: newUsers};

    case types.DELETE_STUDY_GROUP_SUCCESS:
      const studyGroupID = action.payload;

      newStudyGroups = _.cloneDeep(state.userGroups);
      index = _.findIndex(newStudyGroups, (group: any) => group.id === studyGroupID);
      newStudyGroups.splice(index, 1);

      return {...state, userGroups: newStudyGroups};

    case types.MOVE_USER_FROM_WAITLIST_TO_MEMBERS_FAILED:
    case types.LEAVE_STUDY_GROUP_FAILED:
    case types.GET_STUDY_GROUP_MEMBERS_FAILED:
    case types.CREATE_STUDY_GROUP_FAILED:
    case types.DELETE_STUDY_GROUP_FAILED:
    default:
      return state;
  }
};
