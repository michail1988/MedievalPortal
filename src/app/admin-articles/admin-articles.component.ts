import { Component, OnInit } from '@angular/core';
import { Article } from "app/models/article";
import { ArticleService } from '../services/article.service';
import { EmitterService } from '../services/emitter.service';
import { LocalDataSource } from "ng2-smart-table/ng2-smart-table";
import { Router } from "@angular/router";

@Component( {
    selector: 'admin-articles',
    templateUrl: './admin-articles.component.html',
    styleUrls: ['./admin-articles.component.css']
} )

//https://akveo.github.io/ng2-smart-table
export class AdminArticlesComponent implements OnInit {

    articles: Article[];
    source: LocalDataSource;
    activeArticleView: boolean;

    constructor( private articleService: ArticleService, private router: Router ) {

        this.source = new LocalDataSource();

        this.articleService.getArticles().toPromise().then(( data ) => {
            this.source.load( data );
        } );
        
        this.activeArticleView = true;
    }

    ngOnInit() {
        // Load articles
//        this.loadArticles()
    }

    loadArticles() {
        this.articleService.getArticles().toPromise().then(( data ) => {
            this.source.load( data );
        } );
    }
    
    loadDeletedArticles() {
        this.articleService.getDeletedArticles().toPromise().then(( data ) => {
            this.source.load( data );
        } );
    }

    //TODO Michal translacja przez serwis
    settings = {
        columns: {
            author: {
                title: 'Autor'
            },
            title: {
                title: 'Tytul'
            },
            headline: {
                title: 'Opis - usunac'
            },
            edited: {
                title: 'Edytowal'
            },
            editdate: {
                title: 'Data edycji'
            },
            //TODO wpasowac w routingAdmin
            link: {
                title: 'Link',
                type: 'html',
                valuePrepareFunction: ( cell, row ) => {
                    return '<a href="/admin-article/' + row.id + '">Edytuj</a>'
                }
            }
        },
        actions: false
    };

    createNew() {
        this.router.navigate( ['admin-article-new/'] );
    }
    
    isShowActive() {
        return this.activeArticleView;
    }
    
    showDeletedArticles() {
        this.loadDeletedArticles();
        
        this.activeArticleView = false;
    }
    
    showActiveArticles() {
        this.loadArticles();
        
        this.activeArticleView = true;
    }
    
}
