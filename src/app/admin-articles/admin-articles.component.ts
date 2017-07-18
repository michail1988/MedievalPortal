import { Component, OnInit } from '@angular/core';
import { Article } from "app/models/article";
import { ArticleService } from '../services/article.service';
import { EmitterService } from '../services/emitter.service';
import { LocalDataSource } from "ng2-smart-table/ng2-smart-table";

@Component( {
    selector: 'admin-articles',
    templateUrl: './admin-articles.component.html',
    styleUrls: ['./admin-articles.component.css']
} )

//https://akveo.github.io/ng2-smart-table
export class AdminArticlesComponent implements OnInit {

    articles: Article[];
source: LocalDataSource;

    constructor( private articleService: ArticleService ) { 
        
        this.source = new LocalDataSource();

        this.articleService.getArticles().toPromise().then((data) => {
          this.source.load(data);
    });
    }

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
                  }
            }
          };

    data = [
            {
              author: "Leanne Graham",
              title: "Bret",
              description: "Sincere@april.biz"
            },
            {
              author: "Ervin Howell",
              title: "Antonette",
              description: "Shanna@melissa.tv"
            },
            {
                author: "Nicholas DuBuque",
                title: "Nicholas.Stanton",
                description: "Rey.Padberg@rosamond.biz"
            },
            {
                author: "Nicholas DuBuque",
                title: "Nicholas.Stanton",
                description: "Rey.Padberg@rosamond.biz"
            },
            {
                author: "Nicholas DuBuque",
                title: "Nicholas.Stanton",
                description: "Rey.Padberg@rosamond.biz"
            },
            {
                author: "Nicholas DuBuque",
                title: "Nicholas.Stanton",
                description: "Rey.Padberg@rosamond.biz"
            },
            {
                author: "Nicholas DuBuque",
                title: "Nicholas.Stanton",
                description: "Rey.Padberg@rosamond.biz"
            },
            {
                author: "Nicholas DuBuque",
                title: "Nicholas.Stanton",
                description: "Rey.Padberg@rosamond.biz"
            },
            {
                author: "Nicholas DuBuque",
                title: "Nicholas.Stanton",
                description: "Rey.Padberg@rosamond.biz"
            },
            {
                author: "Nicholas DuBuque",
                title: "Nicholas.Stanton",
                description: "Rey.Padberg@rosamond.biz"
            },
            {
                author: "Nicholas DuBuque",
                title: "Nicholas.Stanton",
                description: "Rey.Padberg@rosamond.biz"
            },
            {
                author: "Nicholas DuBuque",
                title: "Nicholas.Stanton",
                description: "Rey.Padberg@rosamond.biz"
            },
            {
                author: "Nicholas DuBuque",
                title: "Nicholas.Stanton",
                description: "Rey.Padberg@rosamond.biz"
            },
          ];
}
