import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ArticleService } from "app/services/article.service";
import { Article } from "app/models/article";


@Injectable()
export class ArticleResolver implements Resolve<Article> {
  constructor(
    private articleService: ArticleService,
    private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Article> {

      
    return this.articleService.getArticle(route.params['id'])
           .catch((err) => this.router.navigateByUrl('/'));

  }
}