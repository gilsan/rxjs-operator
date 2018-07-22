import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';
import { Course } from '../model/course';
import {   map,  tap, filter  } from 'rxjs/operators';
import { createHttpObservable } from '../utils/utils';
import { fromPromise } from '../../../node_modules/rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class Store {

  private subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject.asObservable();

  init(): any {
      createHttpObservable('/api/courses').pipe(
         tap(),
         map( res => Object.values(res['payload']))
     )
     .subscribe(
        courses  => this.subject.next(courses)
     );
  }

  selectBeginnerCourses(category: string) {
    return this.filteByCategory(category);
  }

  filteByCategory(category: string) {
    return this.courses$
    .pipe(
        map( (courses: Course[] ) => courses.filter(course => course.category === category)   )
    );
  }

  selectCourseById(courseId: number) {
    return this.courses$
    .pipe(
        map( courses  => courses.find(course => course.id == courseId)   ),
        filter(course => !!course)
    );
  }

  saveCourse(courseId: number, changes: any): Observable<any>  {
     const courses = this.subject.getValue();
     const courseIndex = courses.findIndex(course => course.id == courseId);
     const newCourses = courses.slice(0);
     newCourses[courseIndex] = {
       ...courses[courseIndex],
       ...changes
     };
     this.subject.next(newCourses);

       return  fromPromise(fetch(`/api/courses/${courseId}`, {
           method: 'PUT',
           body: JSON.stringify(changes),
           headers: {
             'content-type': 'application/json'
           }
         }));
  }

}

