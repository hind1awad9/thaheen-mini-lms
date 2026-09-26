import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { catchError, map, of, startWith } from 'rxjs';
import { RouterLink } from '@angular/router';

import { ProgressService } from '../../../../core/services/progress.service';
import { CourseService } from '../../../../core/services/course.service';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { Course } from '../../../../core/models/course.model';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [AsyncPipe, CourseCardComponent, RouterLink],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.scss',
})
export class CoursesPageComponent {
  private readonly courseService = inject(CourseService);
  private readonly progressService = inject(ProgressService);
  readonly searchTerm = signal('');

  readonly coursesState$ = this.courseService.getCourses().pipe(
    map(courses => ({
      status: 'success' as const,
      courses,
    })),
    startWith({
      status: 'loading' as const,
      courses: [],
    }),
    catchError(() =>
      of({
        status: 'error' as const,
        courses: [],
      }),
    ),
  );

  readonly continueWatching$ = this.coursesState$.pipe(
    map(state => {
      if (state.status !== 'success') {
        return undefined;
      }

      const lessonId = this.progressService.getLastInProgressLessonId();

      if (!lessonId) {
        return undefined;
      }

      for (const course of state.courses) {
        const lesson = course.sections.flatMap(section => section.lessons).find(lesson => lesson.id === lessonId);

        if (lesson) {
          return {
            course,
            lesson,
          };
        }
      }

      return undefined;
    }),
  );

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  filterCourses(courses: Course[]): Course[] {
    const term = this.searchTerm().trim().toLocaleLowerCase();

    if (!term) {
      return courses;
    }

    return courses.filter(
      course => course.title.toLocaleLowerCase().includes(term) || course.instructor.toLocaleLowerCase().includes(term),
    );
  }
}
