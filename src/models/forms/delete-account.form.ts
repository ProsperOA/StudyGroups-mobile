import * as t from 'tcomb-form-native';

import { flatInputStyleSheet } from '../../shared/styles';

export const DeleteAccountForm = {
  type: t.struct({
    password: t.refinement(t.String, (val: string) => val.length >= 6)
  }),
  options: {
    stylesheet: flatInputStyleSheet,
    auto:      'labels',
    fields: {
      password: {
        textContentType: 'password',
        secureTextEntry: true,
        error: 'confirm password to delete account'
      }
    }
  }
};