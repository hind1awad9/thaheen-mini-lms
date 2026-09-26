import { TestBed } from '@angular/core/testing';

import { LocalStorageProgressService } from './local-storage-progress.service';

describe('LocalStorageProgressService', () => {
  let service: LocalStorageProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
