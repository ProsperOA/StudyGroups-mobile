
import { AddCourseForm } from './add-course.form';

export const SearchStudyGroupsForm = {
  ...AddCourseForm,
  options: {
    ...AddCourseForm.options,
    fields: {
      ...AddCourseForm.options.fields,
      name: {
        label: 'Course Name'
      },
      code: {
        label: 'Course Code',
        help: 'e.g. ENGL 1234'
      },
      instructor: {
        label: 'Instructor'
      },
      term: {
        label: 'term'
      }
    }
  }
};