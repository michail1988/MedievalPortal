import { Component, OnInit } from '@angular/core';
import { News } from "app/models/news";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MenuItem } from "primeng/primeng";
import { Message } from "primeng/components/common/api";
import { NewsService } from "app/services/news.service";
import { NewsHistory } from "app/models/news-history";

@Component( {
    selector: 'admin-single-news',
    templateUrl: './admin-single-news.component.html',
    styleUrls: ['./admin-single-news.component.css']
} )
//todo wlasciwa nawigacja
//todo co jak nie znajdzie news?
export class AdminSingleNewsComponent implements OnInit {

    text: string;
    news: News;

    newsHistory: NewsHistory[];

    msgs: Message[] = [];
    navigationItems: MenuItem[];

    constructor( private route: ActivatedRoute,
        private router: Router, private newsService: NewsService, private confirmationService: ConfirmationService ) { }

    ngOnInit() {
        this.route.data.subscribe(
            ( data: { news: News } ) => {
                if ( data.news ) {
                    this.news = data.news;
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
        this.news.fk_editor = '1';

        this.newsService.addNews( this.news ).subscribe(
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

    save() {
        //todo get from localStorage.getItem( 'token' )
        this.news.fk_editor = '1';

        this.newsService.updateNews( this.news ).subscribe(
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

        //TODO odpowiedz i bledy
    }

    cancel() {
        this.navigateBack();
    }

    isNew() {
        return ( !this.news.id || 0 === this.news.id.length );
    }

    isDeleted() {
        return 'D' === this.news.status
    }

    getNewsHistory() {
        this.newsService.getNewsHistory( this.news.id )
            .subscribe(
            n => this.newsHistory = n, //Bind to view
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

                this.deleteNews();
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
            }
        } );
    }

    deleteNews() {
        this.newsService.deleteNews( this.news ).subscribe(
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

    activateNews() {
        this.newsService.activateNews( this.news ).subscribe(
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
        this.router.navigate(['/admin', {outlets: {adminRouting: ['admin-news']}}])
    }

}
