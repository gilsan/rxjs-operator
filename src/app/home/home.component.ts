import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import { Observable } from 'rxjs';

import { Store } from '../common/store.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;
    constructor(private store: Store) {

    }

    ngOnInit() {

      const courses$ = this.store.courses$;

      this.beginnerCourses$ = this.store.selectBeginnerCourses('BEGINNER');

      this.advancedCourses$ = this.store.selectBeginnerCourses('ADVANCED');


     /*
      http$
      .pipe(
         map( data => Object.values(data['payload']) )
      )
      .subscribe((data: Course[]) => {
        console.log(data);
         this.beginnerCourses = data.filter(course => course.category === 'BEGINNER');
        this.advancedCourses = data.filter(course => course.category === 'ADVANCED');
      },
     noop,
     () => console.log('complete'));
      */
    }

}
