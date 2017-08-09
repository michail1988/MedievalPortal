import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { EventService } from "app/services/event.service";
import { Event } from "app/models/event";


@Injectable()
export class EventNewResolver implements Resolve<Event> {
    constructor(
        private router: Router,
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Event> {

        return Observable.create( observer => {
            observer.next( new Event( '', null, null, '', '', '' ) );
            observer.complete();
        } );

    }
}
