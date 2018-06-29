import * as t          from 'tcomb-form-native';
import { EMAIL_REGEX } from '../shared/utils';

const Email = t.refinement(t.String, val => EMAIL_REGEX.test(val))

const EmailOptions = {
  textContentType: 'emailAddress',
  placeholder:     'email'
};

const PasswordOptions = {
  textContentType: 'password',
  placeholder:     'password',
  secureTextEntry:  true,
  minLength:        6,
  maxLength:        50
};

export interface AuthCredentials {
  email:            string;
  password:         string;
  firstName?:       string;
  lastName?:        string;
}

export const LoginCredentials = {
  type: t.struct({
    email:    Email,
    password: t.String
  }),
  options: {
    auto: 'placeholders',
    fields: {
      email:    EmailOptions,
      password: PasswordOptions
    }
  }
};

export const SignUpCredentials = {
  type: t.struct({
    firstName:       t.String,
    lastName:        t.maybe(t.String),
    email:           Email,
    password:        t.String,
    confirmPassword: t.String,
  }),
  options: {
    auto: 'placeholders',
    fields: {
      firstName: {
        textContentType: 'name',
        placeholder:     'first name',
        maxLength:        20
      },
      lastName: {
        textContentType: 'name',
        placeholder:     'last name (optional)',
        maxLength:        20
      },
      email:    EmailOptions,
      password: PasswordOptions,
      confirmPassword: {
        ...PasswordOptions,
        placeholder: 'confirm password',
        error:       'passwords must match',
        hasError:     false
      }
    }
  }
}
