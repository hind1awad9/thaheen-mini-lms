import { TestBed } from '@angular/core/testing';

import { ProgressService } from './progress.service';
import { ProgressStorage } from '../storage/progress-storage';
import { PROGRESS_STORAGE } from '../storage/progress-storage.token';

describe('ProgressService', () => {
  let service: ProgressService;

  const storageMock: ProgressStorage = {
    load: () => ({}),
    save: () => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProgressService,
        {
          provide: PROGRESS_STORAGE,
          useValue: storageMock,
        },
      ],
    });

    service = TestBed.inject(ProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should complete a lesson when 90% of the video is reached', () => {
    expect(service.isCompletionThresholdReached(89, 100)).toBeFalse();

    expect(service.isCompletionThresholdReached(90, 100)).toBeTrue();
  });

  it('should unlock a lesson only when the previous lesson is completed', () => {
    const lessonIds = ['lesson-1', 'lesson-2'];

    expect(service.isLessonUnlocked('lesson-1', lessonIds)).toBeTrue();

    expect(service.isLessonUnlocked('lesson-2', lessonIds)).toBeFalse();

    service.updatePosition('lesson-1', 90, 100);

    expect(service.isLessonUnlocked('lesson-2', lessonIds)).toBeTrue();
  });

  it('should calculate the course progress percentage', () => {
    const lessonIds = ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4'];

    expect(service.calculateProgressPercentage(lessonIds)).toBe(0);

    service.updatePosition('lesson-1', 90, 100);
    service.updatePosition('lesson-2', 90, 100);

    expect(service.calculateProgressPercentage(lessonIds)).toBe(50);
  });
});
