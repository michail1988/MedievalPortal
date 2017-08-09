import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Schedule } from "app/models/schedule";


@Injectable()
export class ScheduleNewResolver implements Resolve<Schedule> {
    constructor(
        private router: Router,
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Schedule> {

        console.log('wywolano schedule new resolver')
        return Observable.create( observer => {
            observer.next( new Schedule( '', '' ) );
            observer.complete();
        } );

    }
}