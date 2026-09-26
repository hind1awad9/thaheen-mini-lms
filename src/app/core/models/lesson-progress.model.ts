export interface LessonProgress {
  lessonId: string;
  positionSec: number;
  completed: boolean;
  updatedAt: number;
}

export type ProgressState = Record<string, LessonProgress>;
