import * as _ from 'lodash';
import * as t from 'tcomb-form-native';

import { EMAIL_REGEX } from '../../shared/utils';

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
const { textbox } = stylesheet;

textbox.normal.fontFamily      = 'rubik-medium';
textbox.error.fontFamily       = 'rubik-medium';
textbox.normal.borderWidth     = 0;
textbox.error.borderWidth      = 0;
textbox.normal.backgroundColor = 'rgba(255, 255, 255, 0.3)';
textbox.error.backgroundColor  = 'rgba(255, 255, 255, 0.3)';
textbox.normal.color           = '#fff';
textbox.error.color            = '#fff';
textbox.normal.borderRadius    = 50;
textbox.error.borderRadius     = 50;
textbox.normal.height          = 45;
textbox.error.height           = 45;
textbox.normal.marginTop       = 5;
textbox.normal.marginBottom    = 5;
textbox.error.marginTop        = 5;
textbox.error.marginBottom     = 5;
textbox.normal.paddingLeft     = 20;
textbox.normal.paddingRight    = 20;
textbox.error.paddingLeft      = 20;
textbox.error.paddingRight     = 20;

const Email    = t.refinement(t.String, (val: string) => EMAIL_REGEX.test(val))
const Password = t.refinement(t.String, (val: string) => val.length >= 6);

const EmailOptions = {
  textContentType:      'emailAddress',
  keyboardType:         'email-address',
  placeholder:          'email',
  error:                'invalid email',
  placeholderTextColor: '#fff'
};

const PasswordOptions = {
  textContentType:      'password',
  placeholder:          'password',
  secureTextEntry:       true,
  maxLength:             50,
  error:                'required',
  placeholderTextColor: '#fff'
};

export const LoginCredentialsForm = {
  type: t.struct({
    email:    Email,
    password: Password
  }),
  options: {
    stylesheet,
    auto: 'placeholders',
    fields: {
      email:    EmailOptions,
      password: PasswordOptions
    }
  }
};

export const SignUpCredentialsForm = {
  type: t.struct({
    firstName:       t.String,
    lastName:        t.maybe(t.String),
    email:           Email,
    password:        Password,
    confirmPassword: Password,
  }),
  options: {
    stylesheet,
    auto: 'placeholders',
    fields: {
      firstName: {
        textContentType:      'name',
        placeholder:          'first name',
        maxLength:             20,
        placeholderTextColor: '#fff',
        error: 'required'
      },
      lastName: {
        textContentType:      'name',
        placeholder:          'last name (optional)',
        maxLength:             20,
        placeholderTextColor: '#fff'
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
};
