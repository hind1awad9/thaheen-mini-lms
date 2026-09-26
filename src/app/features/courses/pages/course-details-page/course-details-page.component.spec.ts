import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsPageComponent } from './course-details-page.component';

import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { PROGRESS_STORAGE } from '../../../../core/storage/progress-storage.token';
import { ProgressStorage } from '../../../../core/storage/progress-storage';

describe('CourseDetailsPageComponent', () => {
  let component: CourseDetailsPageComponent;
  let fixture: ComponentFixture<CourseDetailsPageComponent>;

  const storageMock: ProgressStorage = {
    load: () => ({}),
    save: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetailsPageComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        {
          provide: PROGRESS_STORAGE,
          useValue: storageMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
