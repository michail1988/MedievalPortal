import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Article } from "app/models/article";


@Injectable()
export class ArticleNewResolver implements Resolve<Article> {
    constructor(
        private router: Router,
    ) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Article> {

        return Observable.create( observer => {
            observer.next( new Article( '', '', '', '', '', 'A' ) );
            observer.complete();
        } );

    }
}