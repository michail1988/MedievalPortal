import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from "app/models/article";

@Component( {
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
} )

//Nawigacja: https://github.com/gothinkster/angular-realworld-example-app/blob/master/src/app/editor/editor.component.ts
//Layout: https://startbootstrap.com/template-overviews/blog-post/
export class ArticleComponent implements OnInit {

    article: Article;

    constructor( private route: ActivatedRoute,
        private router: Router ) { }

    ngOnInit() {
        this.route.data.subscribe(
            ( data: { article: Article } ) => {
                if ( data.article ) {
                    this.article = data.article;
                } else {
                    //TODO Michal error and redirect
                }
            }
        );
    }

}
