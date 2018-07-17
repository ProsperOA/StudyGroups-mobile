import { BaseFilter } from './base.filter';

export interface StudyGroupsFilter extends BaseFilter {
  availableSpots: number;
  location:       string;
  courseCode:     string;
  courseName:     string;
  instructor:     string;
  term:           string;
}