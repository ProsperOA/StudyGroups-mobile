import { combineReducers, Reducer }             from 'redux';
import AuthReducer, { AuthState }               from './auth.reducer';
import UserReducer, { UserState }               from './user.reducer';
import StudyGroupsReducer, { StudyGroupsState } from './study-groups.reducer';

export interface AppState {
  auth:        AuthState,
  user:        UserState,
  studyGroups: StudyGroupsState
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  auth:        AuthReducer,
  user:        UserReducer,
  studyGroups: StudyGroupsReducer
});

export default rootReducer;
