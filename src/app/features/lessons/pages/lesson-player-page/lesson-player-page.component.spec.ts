import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPlayerPageComponent } from './lesson-player-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { PROGRESS_STORAGE } from '../../../../core/storage/progress-storage.token';
import { ProgressStorage } from '../../../../core/storage/progress-storage';

describe('LessonPlayerPageComponent', () => {
  let component: LessonPlayerPageComponent;
  let fixture: ComponentFixture<LessonPlayerPageComponent>;

  const storageMock: ProgressStorage = {
    load: () => ({}),
    save: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonPlayerPageComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        {
          provide: PROGRESS_STORAGE,
          useValue: storageMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonPlayerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
