import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { of, concat, merge } from 'rxjs';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  constructor() { }
  ngOnDestroy() {

  }
  ngOnInit() {

    const source1$ = of(1, 2, 3);
    const source2$ = of(4, 5, 6);
    const source3$ = of(7, 8, 9);
  //  const result$ = concat(source1$, source2$, source3$);
     const result$ = merge(source1$, source2$ , source3$);
    result$.subscribe(console.log);


   }

}
