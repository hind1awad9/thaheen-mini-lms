import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { VideoPlayerComponent } from '../../components/video-player/video-player.component';
import { CourseService } from '../../../../core/services/course.service';
import { ProgressService } from '../../../../core/services/progress.service';
import { Course } from '../../../../core/models/course.model';

@Component({
  selector: 'app-lesson-player-page',
  standalone: true,
  imports: [AsyncPipe, VideoPlayerComponent, RouterLink],
  templateUrl: './lesson-player-page.component.html',
  styleUrl: './lesson-player-page.component.scss',
})
export class LessonPlayerPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly courseService = inject(CourseService);
  readonly progressService = inject(ProgressService);

  readonly lessonContext$ = this.route.paramMap.pipe(
    switchMap(params => {
      const courseId = params.get('courseId') ?? '';
      const lessonId = params.get('lessonId') ?? '';

      return this.courseService.getCourseById(courseId).pipe(
        map(course => {
          if (!course) {
            return undefined;
          }

          const lessons = course.sections.flatMap(section => section.lessons);

          const lessonIndex = lessons.findIndex(lesson => lesson.id === lessonId);

          if (lessonIndex === -1) {
            return undefined;
          }

          return {
            course,
            lesson: lessons[lessonIndex],
            nextLesson: lessons[lessonIndex + 1],
          };
        }),
      );
    }),
  );

  onPositionChange(lessonId: string, positionSec: number, durationSec: number): void {
    this.progressService.updatePosition(lessonId, positionSec, durationSec);
  }

  getOrderedLessonIds(course: Course): string[] {
    return course.sections.flatMap(section => section.lessons.map(lesson => lesson.id));
  }
}
