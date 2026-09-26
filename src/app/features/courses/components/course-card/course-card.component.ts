import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../../../core/services/progress.service';
import { Course } from '../../../../core/models/course.model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss',
})
export class CourseCardComponent {
  readonly course = input.required<Course>();
  private readonly progressService = inject(ProgressService);

  readonly lessonCount = computed(() => this.course().sections.reduce((total, section) => total + section.lessons.length, 0));

  readonly progressPercentage = computed(() => {
    const lessonIds = this.course().sections.flatMap(section => section.lessons.map(lesson => lesson.id));

    return this.progressService.calculateProgressPercentage(lessonIds);
  });
}
