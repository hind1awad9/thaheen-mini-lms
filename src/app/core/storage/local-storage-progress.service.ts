import { Injectable } from '@angular/core';
import { ProgressState } from '../models/lesson-progress.model';
import { ProgressStorage } from './progress-storage';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageProgressService implements ProgressStorage {
  private readonly storageKey = 'thaheen-lms-progress';

  load(): ProgressState {
    const storedProgress = localStorage.getItem(this.storageKey);

    if (!storedProgress) {
      return {};
    }

    try {
      return JSON.parse(storedProgress) as ProgressState;
    } catch {
      return {};
    }
  }

  save(progress: ProgressState): void {
    localStorage.setItem(this.storageKey, JSON.stringify(progress));
  }
}
