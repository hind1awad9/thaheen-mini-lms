import { Routes } from '@angular/router';

import { lessonUnlockGuard } from './core/guards/lesson-unlock.guard';

export const routes: Routes = [
  {
    path: 'courses',
    loadComponent: () => import('./features/courses/pages/courses-page/courses-page.component').then(m => m.CoursesPageComponent),
  },
  {
    path: 'courses/:courseId',
    loadComponent: () =>
      import('./features/courses/pages/course-details-page/course-details-page.component').then(m => m.CourseDetailsPageComponent),
  },
  {
    path: 'courses/:courseId/lessons/:lessonId',
    canActivate: [lessonUnlockGuard],
    loadComponent: () =>
      import('./features/lessons/pages/lesson-player-page/lesson-player-page.component').then(m => m.LessonPlayerPageComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'courses',
  },
];
