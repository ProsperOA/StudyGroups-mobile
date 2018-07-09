export interface Course {
  name:       string;
  code:       string;
  instructor: string;
  term:       string;
}

export type CourseAction = 'create' | 'update' | 'delete' | null;