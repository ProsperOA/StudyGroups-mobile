import * as t from 'tcomb-form-native';

export const DeleteAccountForm = {
  type: t.struct({
    password: t.refinement(t.String, (val: string) => val.length >= 6)
  }),
  options: {
    auto: 'labels',
    fields: {
      password: {
        textContentType: 'password',
        secureTextEntry: true,
      }
    }
  }
};