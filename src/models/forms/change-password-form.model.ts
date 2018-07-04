import * as t from 'tcomb-form-native';

const PasswordOptions = {
  textContentType: 'password',
  secureTextEntry: true,
}

export const ChangePasswordForm = {
  type: t.struct({
    currentPassword: t.String,
    newPassword:     t.refinement(t.String, (val: string) => val.length >= 6 && val.length <= 50),
    confirmPassword: t.String
  }),
  options: {
    auto: 'labels',
    fields: {
      currentPassword: {
        ...PasswordOptions,
        label: 'current password'
      },
      newPassword: {
        ...PasswordOptions,
        label: 'new password',
        error: 'pasword must contain 6 to 50 characters'
      },
      confirmPassword: {
        ...PasswordOptions,
        label: 'confirm password',
        hasError: false,
        error: 'passwords must match'
      }
    }
  }
}