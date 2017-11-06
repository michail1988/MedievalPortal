import { Component, OnInit } from '@angular/core';
import { User } from "app/models/user";
import { Message } from "primeng/components/common/api";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "app/services/user.service";
import { ConfirmationService, MenuItem } from "primeng/primeng";

@Component( {
    selector: 'admin-enrolment',
    templateUrl: './admin-enrolment.component.html',
    styleUrls: ['./admin-enrolment.component.css']
} )
export class AdminEnrolmentComponent implements OnInit {

    text: string;
    user: User;

    msgs: Message[] = [];

    constructor( private route: ActivatedRoute,
        private router: Router, private userService: UserService, private confirmationService: ConfirmationService ) { }

    ngOnInit() {
        this.route.data.subscribe(
            ( data: { user: User } ) => {
                if ( data.user ) {
                    this.user = data.user;
                } else {
                    //TODO Michal error and redirect
                }
            }
        );
    }


    save() {
        //    //todo get from localStorage.getItem( 'token' )
        //    this.article.fk_editor = '1';
        //
        //    this.articleService.updateArticle( this.article ).subscribe(
        //        articles => {
        //            // Emit list event
        //            //                //navigate
        //            //                EmitterService.get( this.listId ).emit( enrolments );
        //            // Empty model
        //
        //            this.navigateBack();
        //
        //        },
        //        err => {
        //            // Log errors if any
        //            console.log( err );
        //        } );

    }

    cancel() {
        this.navigateBack();
    }



    confirmDelete() {
        //    this.confirmationService.confirm( {
        //        message: 'Do you want to delete this record?',
        //        header: 'Delete Confirmation',
        //        icon: 'fa fa-trash',
        //        accept: () => {
        //            this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
        //            
        //            this.deleteArticle();
        //        },
        //        reject: () => {
        //            this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
        //        }
        //    } );
    }

    activateArticle() {
        //    this.articleService.activateArticle( this.article ).subscribe(
        //            articles => {
        //                // Emit list event
        //                //                //navigate
        //                //                EmitterService.get( this.listId ).emit( enrolments );
        //                // Empty model
        //
        //                this.navigateBack();
        //
        //            },
        //            err => {
        //                // Log errors if any
        //                console.log( err );
        //            } );
    }

    navigateBack() {
        this.router.navigate( ['/admin', { outlets: { adminRouting: ['enrolments'] } }] )
    }
}
