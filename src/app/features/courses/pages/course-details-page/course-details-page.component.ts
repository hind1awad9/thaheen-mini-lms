import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CourseService } from '../../../../core/services/course.service';
import { ProgressService } from '../../../../core/services/progress.service';
import { Course } from '../../../../core/models/course.model';
import { LessonStatus } from '../../../../core/models/lesson-status.enum';

@Component({
  selector: 'app-course-details-page',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './course-details-page.component.html',
  styleUrl: './course-details-page.component.scss',
})
export class CourseDetailsPageComponent {
  readonly LessonStatus = LessonStatus;

  private readonly route = inject(ActivatedRoute);
  private readonly courseService = inject(CourseService);

  readonly lockedMessage = this.route.snapshot.queryParamMap.get('message') === 'lesson-locked';
  readonly progressService = inject(ProgressService);

  readonly course$ = this.route.paramMap.pipe(
    switchMap(params => {
      const courseId = params.get('courseId') ?? '';
      return this.courseService.getCourseById(courseId);
    }),
  );

  getOrderedLessonIds(course: Course): string[] {
    return course.sections.flatMap(section => section.lessons.map(lesson => lesson.id));
  }

  hasLessons(course: Course): boolean {
    return course.sections.some(section => section.lessons.length > 0);
  }
}
