import { CourseSection } from './course-section.model';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  sections: CourseSection[];
}
