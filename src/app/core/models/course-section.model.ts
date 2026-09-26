import { Lesson } from './lesson.model';

export interface CourseSection {
  id: string;
  title: string;
  lessons: Lesson[];
}
