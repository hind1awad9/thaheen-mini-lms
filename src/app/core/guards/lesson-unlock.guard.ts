import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';

import { CourseService } from '../services/course.service';
import { ProgressService } from '../services/progress.service';

export const lessonUnlockGuard: CanActivateFn = route => {
  const courseService = inject(CourseService);
  const progressService = inject(ProgressService);
  const router = inject(Router);

  const courseId = route.paramMap.get('courseId');
  const lessonId = route.paramMap.get('lessonId');

  if (!courseId || !lessonId) {
    return router.createUrlTree(['/courses']);
  }

  return courseService.getCourseById(courseId).pipe(
    map(course => {
      if (!course) {
        return router.createUrlTree(['/courses']);
      }

      const lessonIds = course.sections.flatMap(section => section.lessons.map(lesson => lesson.id));

      const lessonExists = lessonIds.includes(lessonId);

      if (!lessonExists) {
        return true;
      }

      const isUnlocked = progressService.isLessonUnlocked(lessonId, lessonIds);

      if (!isUnlocked) {
        return router.createUrlTree(['/courses', courseId], {
          queryParams: {
            message: 'lesson-locked',
          },
        });
      }

      return true;
    }),
  );
};
