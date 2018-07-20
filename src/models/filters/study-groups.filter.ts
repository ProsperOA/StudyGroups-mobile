import { BaseFilter } from './base.filter';

export interface StudyGroupsFilter extends BaseFilter {
  studyGroupName: string;
  availableSpots: number;
  location:       string;
  courseCode:     string;
  courseName:     string;
  instructor:     string;
  term:           string;
  meetingDate:    string;
}