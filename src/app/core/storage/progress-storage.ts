import { ProgressState } from '../models/lesson-progress.model';

export interface ProgressStorage {
  load(): ProgressState;
  save(progress: ProgressState): void;
}
