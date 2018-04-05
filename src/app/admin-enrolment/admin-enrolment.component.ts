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
    selectedAcademicStatus: string;

    types: SelectItem[];
    academicTitles: SelectItem[];
    academicStatuses: SelectItem[];

    universities: University[];
    results: string[];

    password1: string;
    password2: string;

    userForm;

    requiredFieldsAlert: boolean;
    saveSuccessAlert: boolean;
    passwordChangedAlert: boolean;

    constructor( private route: ActivatedRoute,
        private router: Router, private userService: UserService, private confirmationService: ConfirmationService, private universityService: UniversityService,
        private imageService: ImageService ) {


        this.types = [];
        this.types.push( { label: 'Uczestnik', value: 'Uczestnik' } );
        this.types.push( { label: 'Referent', value: 'Referent' } );
        this.types.push( { label: 'Organizator', value: 'Organizator' } );

        this.academicTitles = [];
        this.academicTitles.push( { label: 'mgr', value: '1' } );
        this.academicTitles.push( { label: 'dr', value: '2' } );
        this.academicTitles.push( { label: 'dr hab.', value: '3' } );
        this.academicTitles.push( { label: 'Profesor (stanowisko)', value: '4' } );
        this.academicTitles.push( { label: 'Profesor (tytuł)', value: '5' } );

        this.academicStatuses = [];
        this.academicStatuses.push( { label: 'Student/Doktorant', value: '1' } );
        this.academicStatuses.push( { label: 'Pracownik naukowy', value: '2' } );

        this.userForm = [];
        this.userForm.name = 'form-control';
        this.userForm.surname = 'form-control';
        this.userForm.email = 'form-control';

        this.userForm.password1 = 'form-control';
        this.userForm.password2 = 'form-control';
    }

    ngOnInit() {
        this.route.data.subscribe(
            ( data: { user: User } ) => {
                if ( data.user ) {

                    console.log( 'Jest ' + data.user )
                    this.user = data.user;

                    this.selectAcademicStatus( this.user );
                    this.selectAcademicTitle( this.user );
                    this.selectCongressRole( this.user );
                } else {
                    //TODO Michal error and redirect

                    console.log( 'Ni ma! ' )
                }
            }
        );

        window.scrollTo( 0, 0 )
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

        this.requiredFieldsAlert = false;
        this.saveSuccessAlert = false;
        this.passwordChangedAlert = false;

        if ( this.validateUserForm() ) {
            //TODO !!!!!!!!!!!!!!!!!!!!!!!!
            this.user.fk_editor = localStorage.getItem( 'userid' );


            this.setAcademicTitle();
            this.setAcademicStatus();
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

                    this.saveSuccessAlert = true;
                    window.scrollTo( 0, 0 )
                },
                err => {
                    //TODO Michal jakis wlasciwy komunikat o errorze
                    this.requiredFieldsAlert = false;
                    // Log errors if any
                    console.log( err );
                } );
        } else {
            this.requiredFieldsAlert = true;

            this.msgs = [];
            this.msgs.push( { severity: 'error', summary: 'Proszę uzupełnic wszystkie obowiązkowe (*) pola.', detail: '' } );
        }

    }

    selectAcademicTitle( user: User ) {
        this.selectedAcademicTitle = this.user.academic_title;

    }

    selectAcademicStatus( user ) {
        this.selectedAcademicStatus = this.user.academic_status;
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

    setAcademicTitle() {
        if ( this.selectedAcademicTitle === '1' ) {
            this.user.academic_title = '1'
        }

        if ( this.selectedAcademicTitle === '2' ) {
            this.user.academic_title = '2'
        }

        if ( this.selectedAcademicTitle === '3' ) {
            this.user.academic_title = '3'
        }

        if ( this.selectedAcademicTitle === '4' ) {
            this.user.academic_title = '4'
        }

        if ( this.selectedAcademicTitle === '5' ) {
            this.user.academic_title = '5'
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

    setAcademicStatus() {
        if ( this.selectedAcademicStatus === '1' ) {
            this.user.academic_status = '1'
        }

        if ( this.selectedAcademicStatus === '2' ) {
            this.user.academic_status = '2'
        }
    }

    showAcademicTitle() {
        return this.selectedAcademicStatus === '2'
    }

    showStudentOptions() {
        return this.selectedAcademicStatus === '1'
    }

    resetChanges() {

        this.requiredFieldsAlert = false;
        this.saveSuccessAlert = false;
        this.passwordChangedAlert = false;

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
        this.requiredFieldsAlert = false;
        this.saveSuccessAlert = false;
        this.passwordChangedAlert = false;

        if ( this.validatePasswordForm() ) {
            this.user.fk_editor = localStorage.getItem( 'userid' );
            this.user.password = this.password1;

            this.userService.updatePassword( this.user ).subscribe(
                users => {
                    this.msgs = [];
                    this.msgs.push( { severity: 'success', summary: 'Haslo zmienione.', detail: '' } );

                    this.passwordChangedAlert = true;

                    window.scrollTo( 0, 0 )
                },
                err => {
                    // Log errors if any
                    console.log( err );

                    //TODO Michal blad
                    this.requiredFieldsAlert = true;

                    this.msgs = [];
                    this.msgs.push( { severity: 'error', summary: 'Proszę uzupełnic wszystkie obowiązkowe (*) pola.', detail: '' } );

                    window.scrollTo( 0, 0 )
                } );
        } else {
            this.requiredFieldsAlert = true;

            this.msgs = [];
            this.msgs.push( { severity: 'error', summary: 'Proszę uzupełnic wszystkie obowiązkowe (*) pola.', detail: '' } );
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

    requiredFieldsAlertVisible() {
        return this.requiredFieldsAlert
    }

    saveSuccessAlertVisible() {
        return this.saveSuccessAlert
    }

    passwordChangedAlertVisible() {
        return this.passwordChangedAlert
    }

    isEmpty( str ) {
        return ( !str || 0 === str.length );
    }
}
