import * as t from 'tcomb-form-native';

import { flatInputStyleSheet } from '../../shared/styles';

export default {
  type: t.struct({
    name:            t.String,
    capacity:        t.refinement(t.Number, (val: number) => val >= 1),
    description:     t.maybe(t.String),
    meetingDate:     t.Date,
    locationDetails: t.maybe(t.String)
  }),
  options: {
    stylesheet: flatInputStyleSheet,
    auto: 'labels',
    fields: {
      name: {
        maxLength: 40,
      },
      capacity: {
        label: 'Capacity'
      },
      description: {
        label: 'Description',
        maxLength: 120,
        help: '120 characters',
        multiline: true,
        stylesheet: {
          ...flatInputStyleSheet,
          textbox: {
            ...flatInputStyleSheet.textbox,
            normal: {
              ...flatInputStyleSheet.textbox.normal,
              height: 80
            },
            error: {
              ...flatInputStyleSheet.textbox.error,
              height: 80
            }
          }
        }
      },
      locationDetails: {
        label: 'Location Details',
        maxLength: 40
      },
      meetingDate: {
        minimumDate: new Date()
      }
    }
  }
};