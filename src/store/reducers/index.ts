import { combineReducers, Reducer } from 'redux';
import AuthReducer, { AuthState }   from '../reducers/auth.reducer';
import UserReducer, { UserState }   from '../reducers/user.reducer';
import PasswordModalReducer, { PasswordModalState } from '../reducers/change-password-modal.reducer';

export interface AppState {
  auth: AuthState,
  user: UserState,
  passwordModal: PasswordModalState
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  auth: AuthReducer,
  user: UserReducer,
  passwordModal: PasswordModalReducer
});

export default rootReducer;
