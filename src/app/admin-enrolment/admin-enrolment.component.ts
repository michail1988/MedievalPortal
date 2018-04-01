import { Component, OnInit } from '@angular/core';
import { User } from "app/models/user";
import { Message, SelectItem } from "primeng/primeng";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "app/services/user.service";
import { ConfirmationService, MenuItem } from "primeng/primeng";
import { University } from "app/models/university";
import { UniversityService } from "app/services/university.service";
import { ImageService } from "app/services/image.service";
import { UserHistory } from "app/models/user-history";

@Component( {
    selector: 'admin-enrolment',
    templateUrl: './admin-enrolment.component.html',
    styleUrls: ['./admin-enrolment.component.css']
} )
export class AdminEnrolmentComponent implements OnInit {

    text: string;
    user: User;

    userHistory: UserHistory[];

    msgs: Message[] = [];

    private html: any;
    private imageLoaded: boolean;

    selectedCongressRole: string;
    selectedAcademicTitle: string;

    types: SelectItem[];
    academicTitles: SelectItem[];

    universities: University[];
    results: string[];

    password1: string;
    password2: string;

    userForm;

    constructor( private route: ActivatedRoute,
        private router: Router, private userService: UserService, private confirmationService: ConfirmationService, private universityService: UniversityService,
        private imageService: ImageService ) {


        this.types = [];
        this.types.push( { label: 'Uczestnik', value: 'Uczestnik' } );
        this.types.push( { label: 'Referent', value: 'Referent' } );
        this.types.push( { label: 'Organizator', value: 'Organizator' } );

        this.academicTitles = [];
        this.academicTitles.push( { label: 'mgr', value: 'mgr' } );
        this.academicTitles.push( { label: 'Doktorant', value: 'Doktorant' } );
        this.academicTitles.push( { label: 'dr', value: 'dr' } );
        this.academicTitles.push( { label: 'dr hab.', value: 'dr hab.' } );
        this.academicTitles.push( { label: 'Profesor', value: 'Profesor' } );


        this.userForm = [];
        this.userForm.name = 'form-control';
        this.userForm.surname = 'form-control';
        this.userForm.email = 'form-control';

        this.userForm.password1 = 'form-control';
        this.userForm.password2 = 'form-control';

        console.log( 'Constructor ' )
    }

    ngOnInit() {
        this.route.data.subscribe(
            ( data: { user: User } ) => {
                if ( data.user ) {

                    console.log( 'Jest ' + data.user )
                    this.user = data.user;

                    this.selectAcademicTitle( this.user );
                    this.selectCongressRole( this.user );
                } else {
                    //TODO Michal error and redirect

                    console.log( 'Ni ma! ' )
                }
            }
        );
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
        this.router.navigate( ['/admin'] )
    }


    ///obsluga formularza

    uploadedFiles: File[] = [];

    onUpload( event ) {
        for ( let file of event.files ) {
            this.uploadedFiles.push( file );
        }

        this.msgs = [];
        this.msgs.push( { severity: 'success', summary: 'File Uploaded', detail: '' } );
    }

    getUserHistory() {
        this.userService.getUserHistory( this.user.id )
            .subscribe(
            usersH => this.userHistory = usersH, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );
    }
    
    search( event ) {
        //      EmitterService.get( this.listId ).subscribe(( universities: University[] ) => { this.loadUniversities() } );


        this.loadUniversities();
        //todo dziala wolno, jakby co drugi znak
        if ( this.universities ) {

            this.results = this.universities.map( function( uni ) {
                return uni.name;
            } )
        }
        ;
    }

    loadUniversities() {
        // Get all enrolments
        this.universityService.getUniversities( this.user.university )
            .subscribe(
            universities => this.universities = universities, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );

        console.log( this.universities );
    }

    save() {

        if ( this.validateUserForm() ) {
            //TODO !!!!!!!!!!!!!!!!!!!!!!!!
            this.user.fk_editor = this.user.id;
            this.setAcademicTitle();
            this.setCongressRole();

            this.userService.updateUser( this.user ).subscribe(
                users => {
                    // Emit list event
                    //                //navigate
                    //                EmitterService.get( this.listId ).emit( enrolments );
                    // Empty model

                    //TODO Info

                    this.msgs = [];
                    this.msgs.push( { severity: 'success', summary: 'Zapis zakonczony powodzeniem.', detail: '' } );
                },
                err => {
                    // Log errors if any
                    console.log( err );
                } );
        }

    }

    selectAcademicTitle( user: User ) {
        if ( this.user.academic_title === '1' ) {
            this.selectedAcademicTitle = 'mgr'
        }

        if ( this.user.academic_title === '2' ) {
            this.selectedAcademicTitle = 'Doktorant'
        }

        if ( this.user.academic_title === '3' ) {
            this.selectedAcademicTitle = 'dr'
        }

        if ( this.user.academic_title === '4' ) {
            this.selectedAcademicTitle = 'dr hab.'
        }

        if ( this.user.academic_title === '5' ) {
            this.selectedAcademicTitle = 'Profesor'
        }
    }

    selectCongressRole( user: User ) {
        if ( this.user.congressrole === 'U' ) {
            this.selectedCongressRole = 'Uczestnik'
        }

        if ( this.user.congressrole === 'R' ) {
            this.selectedCongressRole = 'Referent'
        }

        if ( this.user.congressrole === 'O' ) {
            this.selectedCongressRole = 'Organizator'
        }
    }

    setAcademicTitle() {
        if ( this.selectedAcademicTitle === 'mgr' ) {
            this.user.academic_title = '1'
        }

        if ( this.selectedAcademicTitle === 'Doktorant' ) {
            this.user.academic_title = '2'
        }

        if ( this.selectedAcademicTitle === 'dr' ) {
            this.user.academic_title = '3'
        }

        if ( this.selectedAcademicTitle === 'dr hab.' ) {
            this.user.academic_title = '4'
        }

        if ( this.selectedAcademicTitle === 'Profesor' ) {
            this.user.academic_title = '5'
        }
    }

    setCongressRole() {
        if ( this.selectedCongressRole === 'Uczestnik' ) {
            this.user.congressrole = 'U'
        }

        if ( this.selectedCongressRole === 'Referent' ) {
            this.user.congressrole = 'R'
        }

        if ( this.selectedCongressRole === 'Organizator' ) {
            this.user.congressrole = 'O'
        }
    }

    resetChanges() {
        if ( this.user.id ) {
            this.html = this.imageService.getUserImage( this.user.id );
            this.imageLoaded = true;
        }

        this.userService.get( this.user.id ).subscribe(
            u => this.user = u, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );

        if ( this.user ) {
            this.selectAcademicTitle( this.user );
            this.selectCongressRole( this.user );
        }

        this.userForm = [];
        this.userForm.name = 'form-control';
        this.userForm.surname = 'form-control';
        this.userForm.email = 'form-control';

        this.userForm.password1 = 'form-control';
        this.userForm.password2 = 'form-control';

        this.password1 = null;
        this.password2 = null;
    }

    validateUserForm() {
        var result = true;

        if ( this.isEmpty( this.user.name ) ) {
            result = false;
            this.userForm.name = 'form-control validationError';
        } else {
            this.userForm.name = 'form-control';
        }

        if ( this.isEmpty( this.user.surname ) ) {
            result = false;
            this.userForm.surname = 'form-control validationError';
        } else {
            this.userForm.surname = 'form-control';
        }

        if ( this.isEmpty( this.user.email ) ) {
            result = false;
            this.userForm.email = 'form-control validationError';
        } else {
            this.userForm.email = 'form-control';
        }

        return result;
    }

    changePassword() {
        if ( this.validatePasswordForm() ) {
            this.user.fk_editor = this.user.id;
            this.user.password = this.password1;

            this.userService.updatePassword( this.user ).subscribe(
                users => {
                    this.msgs = [];
                    this.msgs.push( { severity: 'success', summary: 'Haslo zmienione.', detail: '' } );

                },
                err => {
                    // Log errors if any
                    console.log( err );
                } );
        }
    }

    validatePasswordForm() {
        var result = true;

        if ( this.isEmpty( this.password1 ) ) {
            result = false;
            this.userForm.password1 = 'form-control validationError';
        } else {
            this.userForm.password1 = 'form-control';
        }

        if ( this.isEmpty( this.password2 ) ) {
            result = false;
            this.userForm.password2 = 'form-control validationError';
        } else {
            this.userForm.password2 = 'form-control';
        }

        if ( this.password1 != this.password2 ) {
            result = false;
            this.userForm.password1 = 'form-control validationError';
            this.userForm.password2 = 'form-control validationError';
        }

        return result;
    }

    isEmpty( str ) {
        return ( !str || 0 === str.length );
    }
}
