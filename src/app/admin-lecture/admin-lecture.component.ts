import { Component, OnInit } from '@angular/core';
import { Article } from "app/models/article";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MenuItem } from "primeng/primeng";
import { Message } from "primeng/components/common/api";
import { LectureService } from "app/services/lecture.service";
import { Lecture } from "app/models/lecture";

@Component( {
    selector: 'admin-lecture',
    templateUrl: './admin-lecture.component.html',
    styleUrls: ['./admin-lecture.component.css'],
    providers: [ConfirmationService]
} )
export class AdminLectureComponent implements OnInit {

    text: string;
lecture: Lecture;

//    articlesHistory: ArticleHistory[];

    msgs: Message[] = [];
    navigationItems: MenuItem[];

requiredFieldsAlert: boolean;
saveSuccessAlert: boolean;

    constructor(private route: ActivatedRoute,
            private router: Router, private lectureService: LectureService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        window.scrollTo(0, 0)
        
        this.route.data.subscribe(
            ( data: { lecture: Lecture } ) => {
                if ( data.lecture ) {
                    this.lecture = data.lecture;
                } else {
                    //TODO Michal error and redirect
                }
            }
        );
    }
    
    saveNew() {
        //todo get from localStorage.getItem( 'token' )
        this.lecture.fk_editor = '1';

        this.lectureService.addLecture( this.lecture ).subscribe(
                lectures => {
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
            this.lecture.fk_editor = localStorage.getItem( 'userid' )

            this.lectureService.updateLecture( this.lecture ).subscribe(
                    lectures => {
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
        return ( !this.lecture.id || 0 === this.lecture.id.length );
    }
    
    isDeleted() {
        return 'D' === this.lecture.status
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
                
                this.deleteLecture();
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
            }
        } );
    }
    
    deleteLecture() {            
        this.lectureService.deleteLecture( this.lecture ).subscribe(
                lectures => {
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
    
    
    
    activateLecture() {            
        this.lectureService.activateLecture( this.lecture ).subscribe(
                lectures => {
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
        this.router.navigate(['/admin', {outlets: {adminRouting: ['admin-lectures']}}])
    }
    
    validate() {
        var result = true;

        if ( this.isEmpty( this.lecture.title ) ) {
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
