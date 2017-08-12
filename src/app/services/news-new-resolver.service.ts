import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { News } from "app/models/news";


@Injectable()
export class NewsNewResolver implements Resolve<News> {
    constructor(
        private router: Router,
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<News> {

        //todo michal status
        return Observable.create( observer => {
            observer.next( new News( '', '', '', '', '', 'A' ) );
            observer.complete();
        } );

    }
}