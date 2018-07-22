import { Observable } from '../../../node_modules/rxjs';
import { tap } from '../../../node_modules/rxjs/operators';

export enum RxJsLoggingLevel {
  TRACE,
  DEBUG,
  INFO,
  ERROR
}

 let rxjsLoggingLevel = RxJsLoggingLevel.INFO;

 export function setRxJsLoggingLevel(level: RxJsLoggingLevel) {
   rxjsLoggingLevel = level;
 }

export const debug = (level: number, message: string) =>
  (source: Observable<any>) => source
    .pipe(
       tap(val => {
        if (level >= rxjsLoggingLevel) {
          console.log( message + ' : ', val);
        }

       })
    );
