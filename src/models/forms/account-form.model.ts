import * as t from 'tcomb-form-native';

const stylesheet = t.form.Form.stylesheet;

export const AccountForm = {
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
          ...stylesheet,
          textbox: {
            ...stylesheet.textbox,
            normal: {
              ...stylesheet.textbox.normal,
              height: 120
            },
            error: {
              ...stylesheet.textbox.error,
              height: 120
            }
          }
        }
      }
    }
  }
};