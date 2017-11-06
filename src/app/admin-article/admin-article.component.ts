import { Component, OnInit } from '@angular/core';
import { Article } from "app/models/article";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MenuItem } from "primeng/primeng";
import { Message } from "primeng/components/common/api";
import { ArticleService } from "app/services/article.service";
import { ArticleHistory } from "app/models/article-history";

@Component( {
    selector: 'admin-article',
    templateUrl: './admin-article.component.html',
    styleUrls: ['./admin-article.component.css'],
    providers: [ConfirmationService]
} )

//TODO pomyslny response
export class AdminArticleComponent implements OnInit {

    text: string;
    article: Article;

    articlesHistory: ArticleHistory[];

    msgs: Message[] = [];
    navigationItems: MenuItem[];

    constructor( private route: ActivatedRoute,
        private router: Router, private articleService: ArticleService, private confirmationService: ConfirmationService ) { }

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


        this.navigationItems = [];
        this.navigationItems.push( { label: 'Admin' } );
        this.navigationItems.push( { label: 'Artykuly' } );
        this.navigationItems.push( { label: 'Sekcja XV wiek' } );
        this.navigationItems.push( { label: 'O bitwie pod Grunwaldem', url: 'https://en.wikipedia.org/wiki/Lionel_Messi' } );
    }

    saveNew() {
        //todo get from localStorage.getItem( 'token' )
        this.article.fk_editor = '1';

        this.articleService.addArticle( this.article ).subscribe(
            articles => {
                // Emit list event
                //                //navigate
                //                EmitterService.get( this.listId ).emit( enrolments );
                // Empty model

                this.navigateBack();

            },
            err => {
                // Log errors if any
                console.log( err );
            } );
        
      //TODO Michal tymczasowo bo nie ma odpowiedzi
        this.navigateBack();
    }

    save() {
        //todo get from localStorage.getItem( 'token' )
        this.article.fk_editor = '1';

        this.articleService.updateArticle( this.article ).subscribe(
            articles => {
                // Emit list event
                //                //navigate
                //                EmitterService.get( this.listId ).emit( enrolments );
                // Empty model

                this.navigateBack();

            },
            err => {
                // Log errors if any
                console.log( err );
            } );
        
        //TODO Michal tymczasowo bo nie ma odpowiedzi
        this.navigateBack();

    }

    cancel() {
        this.navigateBack();
    }

    isNew() {
        return ( !this.article.id || 0 === this.article.id.length );
    }
    
    isDeleted() {
        return 'D' === this.article.status
    }

    getArticlesHistory() {
        this.articleService.getArticleHistory( this.article.id )
            .subscribe(
            articles => this.articlesHistory = articles, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );
    }

    confirmDelete() {
        this.confirmationService.confirm( {
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
                
                this.deleteArticle();
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
            }
        } );
    }
    
    deleteArticle() {            
        this.articleService.deleteArticle( this.article ).subscribe(
                articles => {
                    // Emit list event
                    //                //navigate
                    //                EmitterService.get( this.listId ).emit( enrolments );
                    // Empty model

                    this.navigateBack();

                },
                err => {
                    // Log errors if any
                    console.log( err );
                } );
    }
    
    
    
    activateArticle() {            
        this.articleService.activateArticle( this.article ).subscribe(
                articles => {
                    // Emit list event
                    //                //navigate
                    //                EmitterService.get( this.listId ).emit( enrolments );
                    // Empty model

                    this.navigateBack();

                },
                err => {
                    // Log errors if any
                    console.log( err );
                } );
    }
    
    navigateBack() {
        this.router.navigate(['/admin', {outlets: {adminRouting: ['admin-articles']}}])
    }
    
    

}
