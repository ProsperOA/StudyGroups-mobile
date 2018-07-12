import * as t from 'tcomb-form-native';

import { flatInputStyleSheet } from '../../shared/styles';

export const ProfileForm = {
  type: t.struct({
    firstName: t.refinement(t.String, (val: string) => val.length >= 1),
    lastName:  t.maybe(t.String),
    school:    t.maybe(t.String),
    major1:    t.maybe(t.String),
    major2:    t.maybe(t.String),
    minor:     t.maybe(t.String),
    bio:       t.maybe(t.String)
  }),
  options: {
    stylesheet: flatInputStyleSheet,
    fields: {
      firstName: {
        textContentType: 'name',
        label:           'first name',
        maxLength:        20,
        error:           'required'
      },
      lastName: {
        textContentType: 'name',
        label:           'last name',
        maxLength:        20
      },
      school: {
        label:    'school',
        maxLength: 20
      },
      major1: {
        label:     'primary major',
        maxLength:  40
      },
      major2: {
        label:     'secondary major',
        maxLength:  40
      },
      minor: {
        label:     'minor',
        maxLength:  40
      },
      bio: {
        label:     'Bio',
        maxLength:  280,
        help:      '280 characters',
        multiline: true,
        stylesheet: {
          ...flatInputStyleSheet,
          textbox: {
            ...flatInputStyleSheet.textbox,
            normal: {
              ...flatInputStyleSheet.textbox.normal,
              height: 120
            },
            error: {
              ...flatInputStyleSheet.textbox.error,
              height: 120
            }
          }
        }
      }
    }
  }
};