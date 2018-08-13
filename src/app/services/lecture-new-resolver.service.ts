import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Lecture } from "app/models/lecture";

@Injectable()
export class LectureNewResolver implements Resolve<Lecture> {

    constructor(
            private router: Router,
        ) { }

        resolve(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): Observable<Lecture> {

            return Observable.create( observer => {
                observer.next( new Lecture( '', '', '', '', '', '', '', '', 'A' ) );
                observer.complete();
            } );

        }

}
