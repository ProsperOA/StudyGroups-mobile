import { combineReducers, Reducer } from 'redux';
import AuthReducer, { AuthState }   from '../reducers/auth.reducer';
import UserReducer, { UserState } from '../reducers/user.reducer';

export interface AppState {
  auth:  AuthState,
  user:  UserState
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  auth: AuthReducer,
  user: UserReducer
});

export default rootReducer;
