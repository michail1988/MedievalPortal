import { Component, OnInit } from '@angular/core';
import { Message, SelectItem } from "primeng/primeng";
import { RequestOptions, Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ImageService } from "app/services/image.service";
import { UserService } from "app/services/user.service";
import { User } from "app/models/user";
import { Router } from "@angular/router";
import { AuthenticationService } from "app/services/authentication.service";
import { UniversityService } from "app/services/university.service";
import { University } from "app/models/university";

@Component( {
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
} )
export class UserProfileComponent implements OnInit {

    private html: any;
    private userId: string;

    private imageLoaded: boolean;

    user = new User( '', '', '', null, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null, null, '', '' );

    selectedCongressRole: string;
    selectedAcademicTitle: string;
    selectedAcademicStatus: string;
    selectedParticipation: string[] = [];
    selectedMeal: string;

    types: SelectItem[];
    academicTitles: SelectItem[];
    academicStatuses: SelectItem[];
    participationOptions: SelectItem[];
    mealOptions: SelectItem[];

    universities: University[];
    results: string[];

    password1: string;
    password2: string;

    userForm;

    requiredFieldsAlert: boolean;
    saveSuccessAlert: boolean;
    passwordChangedAlert: boolean;

    rangeDates: Date[];

    minDate = new Date( 2018, 8, 20, 0, 10, 0, 0 );
    maxDate = new Date( 2018, 8, 23, 0, 10, 0, 0 );

    defaultDate = new Date( 2018, 8, 20, 0, 10, 0, 0 );

    constructor( private imageService: ImageService, private userService: UserService, private universityService: UniversityService,
        private authenticationService: AuthenticationService, public router: Router ) {
        this.userId = this.userService.getLoggedUserId();

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

        this.participationOptions = [];
        this.participationOptions.push( { label: 'Konferencja', value: '1' } );
        this.participationOptions.push( { label: 'Warsztaty', value: '2' } );

        this.mealOptions = [];
        this.mealOptions.push( { label: 'Standard', value: '1' } );
        this.mealOptions.push( { label: 'Wegetariańskie', value: '2' } );
        this.mealOptions.push( { label: 'Wegańskie', value: '3' } );
        
        this.userForm = [];
        this.userForm.name = 'form-control';
        this.userForm.surname = 'form-control';
        this.userForm.email = 'form-control';

        this.userForm.password1 = 'form-control';
        this.userForm.password2 = 'form-control';

        this.userForm.participation = 'col-md-11';
    }

    ngOnInit() {

        if ( this.userId ) {
            this.html = this.imageService.getUserImage( this.userId );
            this.imageLoaded = true;
        }

        this.userService.get( this.userId ).subscribe(
            u => {
                this.user = u;

                if ( this.user ) {
                    this.selectAcademicStatus( this.user );
                    this.selectAcademicTitle( this.user );
                    this.selectCongressRole( this.user );
                    this.selectParticipation();
                    this.selectMeal();
                    this.selectAccommodation()

                   

                }
            }, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );

        window.scrollTo( 0, 0 )

    }

    msgs: Message[];

    uploadedFiles: File[] = [];

    onUpload( event ) {
        for ( let file of event.files ) {
            this.uploadedFiles.push( file );
        }

        this.msgs = [];
        this.msgs.push( { severity: 'success', summary: 'File Uploaded', detail: '' } );
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate( ['welcome'] );
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

    get userData() { return this.user; }


    save() {

        this.requiredFieldsAlert = false;
        this.saveSuccessAlert = false;
        this.passwordChangedAlert = false;

        if ( this.validateUserForm() ) {
            //TODO
            this.user.fk_editor = this.user.id;
            this.setAcademicTitle();
            this.setAcademicStatus();
            this.setCongressRole();
            this.setParticipation();
            this.setMeal();



            if ( this.user.accommodation_from ) {
                this.user.accommodation_from = new Date( this.user.accommodation_from.getTime() + ( 3 * 3600 * 1000 ) )
            }

            if ( this.user.accommodation_to ) {
                this.user.accommodation_to = new Date( this.user.accommodation_to.getTime() + ( 3 * 3600 * 1000 ) )
            }

            console.log( 'saving this.user.accommodation_from=' + this.user.accommodation_from );
            console.log( 'saving this.user.accommodation_to=' + this.user.accommodation_to );

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
                    // Log errors if any
                    console.log( err );

                    //TODO Michal jakis wlasciwy komunikat o errorze
                    this.requiredFieldsAlert = false;
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

    selectParticipation() {
        if ( this.user.participation === '1' ) {
            this.selectedParticipation[0] = '1'
        }

        if ( this.user.participation === '2' ) {
            this.selectedParticipation[0] = '2'
        }

        if ( this.user.participation === '3' ) {
            this.selectedParticipation[0] = '1'
            this.selectedParticipation[1] = '2'
        }
    }
    
    selectMeal() {
        this.selectedMeal = this.user.meal;
    }
    
    selectAccommodation() {
        console.log( 'this.user.accommodation_from=' + this.user.accommodation_from );
        console.log( 'this.user.accommodation_to=' + this.user.accommodation_to );

        if ( this.user.accommodation_from ) {
            this.user.accommodation_from = new Date( this.user.accommodation_from )
        }

        if ( this.user.accommodation_to ) {
            this.user.accommodation_to = new Date( this.user.accommodation_to )
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

    setAcademicStatus() {
        if ( this.selectedAcademicStatus === '1' ) {
            this.user.academic_status = '1'
        }

        if ( this.selectedAcademicStatus === '2' ) {
            this.user.academic_status = '2'
        }
    }

    setParticipation() {
        if ( this.selectedParticipation ) {
            if ( this.selectedParticipation.length === 2 ) {
                this.user.participation = '3';
            } else {
                if ( this.selectedParticipation[0] === '1' ) {
                    this.user.participation = '1';
                }

                if ( this.selectedParticipation[0] === '2' ) {
                    this.user.participation = '2';
                }
            }
        }

    }
    
    setMeal() {
        if ( this.selectedMeal ) {
            
            if ( this.selectedMeal === '1' ) {
                this.user.academic_status = '1'
            }

            if ( this.selectedMeal === '2' ) {
                this.user.meal = '2'
            }
            
            if ( this.selectedMeal === '3' ) {
                this.user.academic_status = '1'
            }
            
        }
    }

    showAcademicTitle() {
        return this.selectedAcademicStatus === '2'
    }

    showInvoiceData() {
        return this.user.invoice === '1' || this.user.invoice
    }

    showAccomodation() {
        console.log( 'this.user.accommodation=' + this.user.accommodation );
        return this.user.accommodation === '1' || this.user.accommodation
    }

    showStudentOptions() {
        return this.selectedAcademicStatus === '1'
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

        this.requiredFieldsAlert = false;
        this.saveSuccessAlert = false;
        this.passwordChangedAlert = false;

        if ( this.userId ) {
            this.html = this.imageService.getUserImage( this.userId );
            this.imageLoaded = true;
        }

        this.userService.get( this.userId ).subscribe(
            u => this.user = u, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );

        if ( this.user ) {
            this.selectAcademicTitle( this.user );
            this.selectCongressRole( this.user );
            this.selectParticipation();
        }

        this.userForm = [];
        this.userForm.name = 'form-control';
        this.userForm.surname = 'form-control';
        this.userForm.email = 'form-control';

        this.userForm.password1 = 'form-control';
        this.userForm.password2 = 'form-control';

        this.password1 = null;
        this.password2 = null;

        this.userForm.participation = 'col-md-11';
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


        if ( this.isEmpty( this.selectedParticipation ) ) {
            result = false;
            this.userForm.participation = 'col-md-11 validationError';
        } else {
            this.userForm.participation = 'col-md-11';
        }

        return result;
    }

    changePassword() {
        this.requiredFieldsAlert = false;
        this.saveSuccessAlert = false;
        this.passwordChangedAlert = false;

        if ( this.validatePasswordForm() ) {
            this.user.fk_editor = this.user.id;
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
