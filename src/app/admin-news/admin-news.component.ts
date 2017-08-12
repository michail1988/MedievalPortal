import { Component, OnInit } from '@angular/core';
import { News } from "app/models/news";
import { NewsService } from '../services/news.service';
import { EmitterService } from '../services/emitter.service';
import { LocalDataSource } from "ng2-smart-table/ng2-smart-table";
import { Router } from "@angular/router";

@Component( {
    selector: 'admin-news',
    templateUrl: './admin-news.component.html',
    styleUrls: ['./admin-news.component.css']
} )
export class AdminNewsComponent implements OnInit {

    news: News[];
    source: LocalDataSource;
    activeNewsView: boolean;

    constructor( private newsService: NewsService, private router: Router ) {

        this.source = new LocalDataSource();

        this.newsService.getNews().toPromise().then(( data ) => {
            this.source.load( data );
        } );

        this.activeNewsView = true;
    }

    ngOnInit() {
        // Load articles
        //    this.loadArticles()
    }

    loadNews() {
        this.newsService.getNews().toPromise().then(( data ) => {
            this.source.load( data );
        } );
    }

    loadDeletedNews() {
        this.newsService.getDeletedNews().toPromise().then(( data ) => {
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
                    return '<a href="/admin-single-news/' + row.id + '">Edytuj</a>'
                }
            }
        },
        actions: false
    };

    createNew() {
        this.router.navigate( ['admin-news-new/'] );
    }

    isShowActive() {
        return this.activeNewsView;
    }

    showDeletedNews() {
        this.loadDeletedNews();

        this.activeNewsView = false;
    }

    showActiveNews() {
        this.loadNews();

        this.activeNewsView = true;
    }

}
