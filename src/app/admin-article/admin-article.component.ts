import { Component, OnInit } from '@angular/core';
import { Article } from "app/models/article";
import { ActivatedRoute, Router } from "@angular/router";

@Component( {
    selector: 'admin-article',
    templateUrl: './admin-article.component.html',
    styleUrls: ['./admin-article.component.css']
} )
export class AdminArticleComponent implements OnInit {

    text: string;
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
