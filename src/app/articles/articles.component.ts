import { Component, OnInit } from '@angular/core';
import { Article } from "app/models/article";
import { ArticleService } from '../services/article.service';
import { EmitterService } from '../services/emitter.service';

@Component( {
    selector: 'articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css']
} )
export class ArticlesComponent implements OnInit {

    articles: Article[];
    constructor( private articleService: ArticleService ) { }

    ngOnInit() {
        // Load articles
        this.loadArticles()
    }

    loadArticles() {
        this.articleService.getArticles()
            .subscribe(
            articles => this.articles = articles, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );
    }

}
