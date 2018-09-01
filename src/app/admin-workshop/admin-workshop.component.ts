import { Component, OnInit } from '@angular/core';
import { Article } from "app/models/article";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MenuItem } from "primeng/primeng";
import { Message } from "primeng/components/common/api";
import { WorkshopService } from "app/services/workshop.service";
import { Workshop } from "app/models/workshop";
import { ActionAdminEnrolmentComponent } from "app/action-admin-enrolment/action-admin-enrolment.component";
import { ActionAdminPaymentComponent } from "app/action-admin-payment/action-admin-payment.component";
import { DatePipe } from "@angular/common";
import { WorkshopsUserService } from "app/services/workshops-user.service";
import { LocalDataSource } from "ng2-smart-table/ng2-smart-table";

@Component( {
    selector: 'admin-workshop',
    templateUrl: './admin-workshop.component.html',
    styleUrls: ['./admin-workshop.component.css'],
    providers: [ConfirmationService]
} )
export class AdminWorkshopComponent implements OnInit {

    text: string;
    workshop: Workshop;

    //    articlesHistory: ArticleHistory[];

    msgs: Message[] = [];
    navigationItems: MenuItem[];

    requiredFieldsAlert: boolean;
    saveSuccessAlert: boolean;

    source: LocalDataSource;

    constructor( private route: ActivatedRoute,
        private router: Router, private workshopService: WorkshopService, private worskhopsUserService: WorkshopsUserService, private confirmationService: ConfirmationService ) { }

    ngOnInit() {
        window.scrollTo( 0, 0 )

        this.route.data.subscribe(
            ( data: { workshop: Workshop } ) => {
                if ( data.workshop ) {
                    this.workshop = data.workshop;
                } else {
                    //TODO Michal error and redirect
                }
            }
        );

        this.source = new LocalDataSource();

        if ( this.workshop ) {
            this.worskhopsUserService.getUsersForWorkshop( this.workshop.id ).toPromise().then(( data ) => {
                this.source.load( data );
            } );
        }
    }

    saveNew() {
        //todo get from localStorage.getItem( 'token' )
        this.workshop.fk_editor = '1';

        this.workshopService.addWorkshop( this.workshop ).subscribe(
            workshops => {
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
        //TODO get from localStorage.getItem( 'token' )

        this.requiredFieldsAlert = false;
        this.saveSuccessAlert = false;

        if ( this.validate() ) {
            this.workshop.fk_editor = localStorage.getItem( 'userid' )

            this.workshopService.updateWorkshop( this.workshop ).subscribe(
                workshops => {
                    // Emit list event
                    //                //navigate
                    //                EmitterService.get( this.listId ).emit( enrolments );
                    // Empty model

                    this.msgs = [];
                    this.msgs.push( { severity: 'success', summary: 'Zapis zakonczony powodzeniem.', detail: '' } );

                    this.saveSuccessAlert = true;
                    window.scrollTo( 0, 0 )

                },
                err => {
                    // Log errors if any
                    console.log( err );
                    this.requiredFieldsAlert = false;
                } );

        } else {
            this.requiredFieldsAlert = true;

            this.msgs = [];
            this.msgs.push( { severity: 'error', summary: 'Proszę uzupełnic wszystkie obowiązkowe (*) pola.', detail: '' } );
        }


    }

    cancel() {
        this.navigateBack();
    }

    isNew() {
        return ( !this.workshop.id || 0 === this.workshop.id.length );
    }

    isDeleted() {
        return 'D' === this.workshop.status
    }

    //    getArticlesHistory() {
    //        this.articleService.getArticleHistory( this.article.id )
    //            .subscribe(
    //            articles => this.articlesHistory = articles, //Bind to view
    //            err => {
    //                // Log errors if any
    //                console.log( err );
    //            } );
    //    }

    confirmDelete() {
        this.confirmationService.confirm( {
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];

                this.deleteWorkshop();
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
            }
        } );
    }

    deleteWorkshop() {
        this.workshopService.deleteWorkshop( this.workshop ).subscribe(
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

        this.navigateBack();
    }



    activateWorkshop() {
        this.workshopService.activateWorkshop( this.workshop ).subscribe(
            workshops => {
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
        this.router.navigate( ['/admin', { outlets: { adminRouting: ['admin-workshops'] } }] )
    }

    validate() {
        var result = true;

        if ( this.isEmpty( this.workshop.title ) ) {
            result = false;
            //            this.userForm..password1 = 'form-control validationError';
        } else {
            //            this.userForm.password1 = 'form-control';
        }

        return result;
    }

    isEmpty( str ) {
        return ( !str || 0 === str.length );
    }

    requiredFieldsAlertVisible() {
        return this.requiredFieldsAlert
    }

    saveSuccessAlertVisible() {
        return this.saveSuccessAlert
    }

    settings = {
        columns: {
            name: {
                title: 'Imie'
            },
            surname: {
                title: 'Nazwisko'
            },
            email: {
                title: 'Email'
            },
            university: {
                title: 'Uniwersytet'
            },
            congressrole: {
                title: 'Rola',
                type: 'html',
                valuePrepareFunction: ( value ) => {
                    if ( value === 'U' ) return 'Uczestnik';
                    if ( value === 'R' ) return 'Referent';
                    if ( value === 'O' ) return 'Organizator';
                    return ''
                },
                filterFunction( cell?: any, search?: string ): boolean {
                    if ( search != null ) {
                        if ( "uczestnik".search( search ) > 0 ) {
                            if ( cell === 'U' ) {
                                return true;
                            }

                            return false;
                        }

                        if ( "referent".search( search ) > 0 ) {
                            if ( cell === 'R' ) {
                                return true;
                            }

                            return false;
                        }

                        if ( "organizator".search( search ) > 0 ) {
                            if ( cell === 'U' ) {
                                return true;
                            }

                            return false;
                        }
                    }
                    if ( search === '' ) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            academic_title: {
                title: 'Tytul',
                type: 'html',
                valuePrepareFunction: ( value ) => {
                    if ( value === '1' ) return 'mgr';
                    if ( value === '2' ) return 'dr';
                    if ( value === '3' ) return 'dr hab.';
                    if ( value === '4' ) return 'Prof. (stan.)';
                    if ( value === '5' ) return 'Prof.';

                    return ''
                }
            },
            payment: {
                title: 'Oplata',
                type: 'custom',
                renderComponent: ActionAdminPaymentComponent,
                valuePrepareFunction: ( cell, row ) => {
                    return row
                }
            },
            action: {
                title: 'Akcja',
                type: 'custom',
                renderComponent: ActionAdminEnrolmentComponent,
                valuePrepareFunction: ( cell, row ) => {
                    return row
                }
            }
        },
        actions: false
    };
}
