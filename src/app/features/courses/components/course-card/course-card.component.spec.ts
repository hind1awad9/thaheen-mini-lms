import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CourseCardComponent } from './course-card.component';
import { PROGRESS_STORAGE } from '../../../../core/storage/progress-storage.token';
import { ProgressStorage } from '../../../../core/storage/progress-storage';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  const storageMock: ProgressStorage = {
    load: () => ({}),
    save: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
      providers: [
        provideRouter([]),
        {
          provide: PROGRESS_STORAGE,
          useValue: storageMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('course', {
      id: 'course-1',
      title: 'Test Course',
      instructor: 'Test Instructor',
      thumbnail: 'assets/images/anatomy.jpg',
      sections: [],
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
