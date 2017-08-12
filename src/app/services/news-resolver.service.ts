import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { NewsService } from "app/services/news.service";
import { News } from "app/models/news";


@Injectable()
export class NewsResolver implements Resolve<News> {
  constructor(
    private newsService: NewsService,
    private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<News> {

      
    return this.newsService.getSingleNews(route.params['id'])
           .catch((err) => this.router.navigateByUrl('/'));

  }
}