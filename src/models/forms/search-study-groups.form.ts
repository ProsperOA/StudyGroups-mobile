
import * as t from 'tcomb-form-native';

import { flatInputStyleSheet } from '../../shared/styles';

export const SearchStudyGroupsForm = {
  type: t.struct({
    name:       t.maybe(t.String),
    code:       t.maybe(t.String),
    instructor: t.maybe(t.String),
    term:       t.maybe(t.String),
  }),
  options: {
    stylesheet:  flatInputStyleSheet,
    auto:       'labels',
    fields: {
      name: {
        maxLength:  20,
        label:     'Name'
      },
      code: {
        maxLength:  10,
        label:     'Code',
        help:      'e.g. ENGL 1234'
      },
      instructor: {
        maxLength:  20,
        label:     'Instructor'
      },
      term: {
        maxLength: 10,
        label:     'Term'
      }
    }
  }
};