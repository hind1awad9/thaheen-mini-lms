import { inject, Injectable, signal } from '@angular/core';
import { ProgressState, LessonProgress } from '../models/lesson-progress.model';
import { PROGRESS_STORAGE } from '../storage/progress-storage.token';
import { LessonStatus } from '../models/lesson-status.enum';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private readonly storage = inject(PROGRESS_STORAGE);

  private readonly progressState = signal<ProgressState>(this.storage.load());

  readonly progress = this.progressState.asReadonly();

  getLessonProgress(lessonId: string): LessonProgress | undefined {
    return this.progressState()[lessonId];
  }

  updatePosition(lessonId: string, positionSec: number, durationSec: number): void {
    const currentProgress = this.progressState()[lessonId];

    const completed = currentProgress?.completed || this.isCompletionThresholdReached(positionSec, durationSec);

    const updatedProgress: LessonProgress = {
      lessonId,
      positionSec,
      completed,
      updatedAt: Date.now(),
    };

    this.progressState.update(state => ({
      ...state,
      [lessonId]: updatedProgress,
    }));

    this.storage.save(this.progressState());
  }

  isCompletionThresholdReached(positionSec: number, durationSec: number): boolean {
    if (durationSec <= 0) {
      return false;
    }

    return positionSec / durationSec >= 0.9;
  }

  isLessonUnlocked(lessonId: string, orderedLessonIds: string[]): boolean {
    const lessonIndex = orderedLessonIds.indexOf(lessonId);

    if (lessonIndex === -1) {
      return false;
    }

    if (lessonIndex === 0) {
      return true;
    }

    const previousLessonId = orderedLessonIds[lessonIndex - 1];

    return this.progressState()[previousLessonId]?.completed === true;
  }

  calculateProgressPercentage(lessonIds: string[]): number {
    if (lessonIds.length === 0) {
      return 0;
    }

    const completedLessons = lessonIds.filter(lessonId => this.progressState()[lessonId]?.completed === true).length;

    return Math.round((completedLessons / lessonIds.length) * 100);
  }

  getLessonStatus(lessonId: string): LessonStatus {
    const progress = this.getLessonProgress(lessonId);

    if (progress?.completed) {
      return LessonStatus.Completed;
    }

    if (progress && progress.positionSec > 0) {
      return LessonStatus.InProgress;
    }

    return LessonStatus.NotStarted;
  }

  getLastInProgressLessonId(): string | undefined {
    return Object.values(this.progressState())
      .filter(progress => progress.positionSec > 0 && !progress.completed)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .at(0)?.lessonId;
  }
}
