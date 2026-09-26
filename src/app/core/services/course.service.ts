import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly http = inject(HttpClient);

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('assets/data/courses.json');
  }

  getCourseById(courseId: string): Observable<Course | undefined> {
    return this.getCourses().pipe(map(courses => courses.find(course => course.id === courseId)));
  }
}
