import { Component, OnInit } from '@angular/core';
import { Article } from "app/models/article";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MenuItem } from "primeng/primeng";
import { Message } from "primeng/components/common/api";
import { WorkshopService } from "app/services/workshop.service";
import { Workshop } from "app/models/workshop";

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

    constructor(private route: ActivatedRoute,
            private router: Router, private workshopService: WorkshopService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        window.scrollTo(0, 0)
        
        this.route.data.subscribe(
            ( data: { workshop: Workshop } ) => {
                if ( data.workshop ) {
                    this.workshop = data.workshop;
                } else {
                    //TODO Michal error and redirect
                }
            }
        );
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
        
        if (this.validate()) {
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
        this.router.navigate(['/admin', {outlets: {adminRouting: ['admin-workshops']}}])
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

}
