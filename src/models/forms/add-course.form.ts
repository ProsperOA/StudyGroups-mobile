import * as t from 'tcomb-form-native';

import { flatInputStyleSheet } from '../../shared/styles';

export const AddCourseForm = {
  type: t.struct({
    name:       t.String,
    code:       t.maybe(t.String),
    instructor: t.maybe(t.String),
    term:       t.maybe(t.String),
  }),
  options: {
    stylesheet:  flatInputStyleSheet,
    auto:       'labels',
    fields: {
      name: {
        maxLength: 20
      },
      code: {
        maxLength:  10,
        help:      'e.g. ENGL 1234'
      },
      instructor: {
        maxLength: 20
      },
      term: {
        maxLength: 10
      }
    }
  }
};