import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { lessonUnlockGuard } from './lesson-unlock.guard';

describe('lessonUnlockGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => lessonUnlockGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
