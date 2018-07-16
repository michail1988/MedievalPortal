import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Workshop } from "app/models/workshop";

@Injectable()
export class WorkshopNewResolver implements Resolve<Workshop> {

    constructor(
            private router: Router,
        ) { }

        resolve(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
        ): Observable<Workshop> {

            return Observable.create( observer => {
                observer.next( new Workshop( '', '', '', '', '', '', '', 'A' ) );
                observer.complete();
            } );

        }

}
