import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { CoursesPageComponent } from './courses-page.component';
import { PROGRESS_STORAGE } from '../../../../core/storage/progress-storage.token';
import { ProgressStorage } from '../../../../core/storage/progress-storage';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  const storageMock: ProgressStorage = {
    load: () => ({}),
    save: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesPageComponent],
      providers: [
        provideHttpClient(),
        {
          provide: PROGRESS_STORAGE,
          useValue: storageMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
