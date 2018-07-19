import { Component, OnInit } from '@angular/core';
import { SelectItem } from "primeng/primeng";
import { UniversityService } from "app/services/university.service";
import { University } from "app/models/university";
import { Enrolment } from "app/models/enrolment";
import { User } from "app/models/user";
import { UserService } from "app/services/user.service";
import { EmitterService } from "app/services/emitter.service";
import { AuthenticationService } from "app/services/authentication.service";
import { Router } from "@angular/router";

@Component( {
    selector: 'login-register',
    templateUrl: './login-register.component.html',
    styleUrls: ['./login-register.component.css']
} )
export class LoginRegisterComponent implements OnInit {

    loginTabVisible: boolean;
    speakerPartsVisible: boolean;

    incorrectLoginDataAlert: boolean;
    noLoginRightsAlert: boolean;
    emailRegisteredAlert: boolean;

    types: SelectItem[];

    selectedType: string;

    universities: University[];
    results: string[];

    submitted = false;

    passwordType: string;

    user = new User( '', '', '', null, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null, null, '', '', '', '' );

    repeatPassword: string; //TODO dodac walidacje
    termsAcceptation: boolean;

    loginForm;
    registerForm;

    //logowanie:
    loginEmail: string;
    password: string;

    selectedAcademicTitle: string;
    selectedAcademicStatus: string;
    selectedParticipation: string[] = [];

    academicTitles: SelectItem[];
    academicStatuses: SelectItem[];
    participationOptions: SelectItem[];

    constructor( private userService: UserService, private universityService: UniversityService,
        private authenticationService: AuthenticationService, public router: Router ) {
        this.loginTabVisible = false;
        this.speakerPartsVisible = false;

        this.types = [];
        this.types.push( { label: 'Uczestnik', value: 'Uczestnik' } );
        this.types.push( { label: 'Referent', value: 'Referent' } );
        this.types.push( { label: 'Organizator', value: 'Organizator' } );

        this.selectedType = 'Uczestnik';

        this.passwordType = 'password'

        this.loginForm = [];
        this.loginForm.email = 'input full';
        this.loginForm.password = 'input full';

        this.registerForm = [];
        this.registerForm.email = 'input full';

        this.registerForm.password = 'input string optional';
        this.registerForm.repeatPassword = 'input string optional';

        this.registerForm.username = 'input string optional';
        this.registerForm.usersurname = 'input string optional';

        this.registerForm.terms = 'simform__actions-sidetext';
        this.registerForm.university = 'input string optional';

        this.registerForm.academicStatus = 'input full';

        this.registerForm.academicTitle = 'input full';
        this.registerForm.participation = 'input full';

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
    }

    ngOnInit() {
    }

    changeToLogin() {
        this.loginTabVisible = true;
    }

    changeToRegister() {
        this.loginTabVisible = false;
    }

    isSpeakerPartsVisible() {
        return false;
        //return this.selectedType === 'Referent';
    }

    //TODO koniecznie jakas odpowiedz serwera
    //automatyczny login???
    registerUser() {

        this.emailRegisteredAlert = false;

        if ( this.validateRegisterForm() === true ) {
            this.user.registerdate = new Date();
            this.user.congressrole = this.selectedType.charAt( 0 )

            this.setAcademicTitle();
            this.setAcademicStatus();
            this.setParticipation();


            this.userService.addUser( this.user ).subscribe(
                response => {


                    if ( response.text() === 'OK' ) {
                        -                    console.log( 'udalo sie haha ' + response.text() );
                        //           
                        this.submitted = true;
                        this.router.navigate( ['enrolment-created'] );
                    }
                },
                err => {
                    // Log errors if any
                    console.log( err );

                    if ( err.status === 401 ) {
                        console.log( "401 Istnieje juz uzytkownik o podanym adresie email." );

                        this.emailRegisteredAlert = true;
                    }
                } );
        }
    }


    validateRegisterForm() {
        var result = true;

        if ( this.isEmpty( this.user.email ) ) {
            result = false;
            this.registerForm.email = 'input full validationError';
        } else {

            if ( this.validateEmail( this.user.email ) === true ) {
                this.registerForm.email = 'input full';
            } else {
                this.registerForm.email = 'input full validationError';
                result = false;
            }
        }

        if ( this.isEmpty( this.user.password ) ) {
            result = false;
            this.registerForm.password = 'input string optional validationError';
        } else {
            this.registerForm.password = 'input string optional';
        }

        if ( this.isEmpty( this.repeatPassword ) ) {
            result = false;
            this.registerForm.repeatPassword = 'input string optional validationError';
        } else {
            this.registerForm.repeatPassword = 'input string optional';
        }

        if ( this.repeatPassword != this.user.password ) {
            result = false;
            this.registerForm.repeatPassword = 'input string optional validationError';
            this.registerForm.password = 'input string optional validationError';
        }

        if ( this.isEmpty( this.user.name ) ) {
            result = false;
            this.registerForm.username = 'input string optional validationError';
        } else {
            this.registerForm.username = 'input string optional';
        }

        if ( this.isEmpty( this.user.surname ) ) {
            result = false;
            this.registerForm.usersurname = 'input string optional validationError';
        } else {
            this.registerForm.usersurname = 'input string optional';
        }

        if ( this.isEmpty( this.user.university ) ) {
            result = false;
            this.registerForm.university = 'input string optional validationError';
        } else {
            this.registerForm.university = 'input string optional';
        }

        if ( this.termsAcceptation != true ) {
            result = false;
            this.registerForm.terms = 'simform__actions-sidetext validationError';
        } else {
            this.registerForm.terms = 'simform__actions-sidetext';
        }

        if ( this.isEmpty( this.selectedAcademicStatus ) ) {
            result = false;
            this.registerForm.academicStatus = 'input full validationError';
        } else {
            this.registerForm.academicStatus = 'input full';



            if ( this.selectedAcademicStatus === '2' ) {
                if ( this.isEmpty( this.selectedAcademicTitle ) ) {
                    result = false;
                    this.registerForm.academicTitle = 'input full validationError';
                } else {
                    this.registerForm.academicTitle = 'input full';
                }
            }

        }

        if ( this.isEmpty( this.selectedParticipation ) ) {
            result = false;
            this.registerForm.participation = 'input full validationError';
        } else {
            this.registerForm.participation = 'input full';
        }


        return result;
    }

    validateLoginForm() {
        var result = true;

        if ( this.isEmpty( this.loginEmail ) ) {
            result = false;
            this.loginForm.email = 'input full validationError';
        } else {
            if ( this.validateEmail( this.loginEmail ) === true ) {
                this.loginForm.email = 'input full';
            } else {
                this.loginForm.email = 'input full validationError';
                result = false;
            }
        }

        if ( this.isEmpty( this.password ) ) {
            result = false;
            this.loginForm.password = 'input full validationError';
        } else {
            this.loginForm.password = 'input full';
        }



        return result;
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

    //TODO do porzadnej poprawy
    login() {

        this.incorrectLoginDataAlert = false;
        this.noLoginRightsAlert = false;

        if ( this.validateLoginForm() === true ) {
            this.authenticationService.login( this.loginEmail, this.password ).subscribe(
                u => {
                    this.user = u;
                    this.navigateUser( this.user.id )
                }
                , //Bind to view
                err => {
                    // Log errors if any

                    console.log( "Error na poziomie authenticationService.getUser=" + err );
                    if ( err.status === 400 ) {
                        console.log( "400 User not found" + err );
                        this.incorrectLoginDataAlert = true;
                    }

                    if ( err.status === 401 ) {
                        console.log( "401 User not confirmed" + err );

                        this.noLoginRightsAlert = true;
                    }
                } );
        }



    }

    logout() {
        this.authenticationService.logout();
    }

    showPassword() {
        this.passwordType = 'text'
    }

    hidePassword() {
        this.passwordType = 'password'
    }

    isPasswordVisible() {
        return 'text' === this.passwordType
    }

    isPasswordHidden() {
        return 'password' === this.passwordType
    }

    validateEmail( email ) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test( String( email ).toLowerCase() );
    }

    isEmpty( str ) {
        return ( !str || 0 === str.length );
    }

    incorrectLoginDataAlertVisible() {
        return this.incorrectLoginDataAlert;
    }

    noLoginRightsAlertVisible() {
        return this.noLoginRightsAlert;
    }

    emailRegisteredAlertVisible() {
        return this.emailRegisteredAlert;
    }

    navigateUser( id ) {
        this.router.navigate( ['user-profile/'] );
    }

    showAcademicTitle() {
        return this.selectedAcademicStatus === '2'
    }

    showStudentOptions() {
        return this.selectedAcademicStatus === '1'
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
        if (this.selectedParticipation ) {
            if ( this.selectedParticipation.length === 2 ) {
                this.user.participation = '3';
            } else {
                if (this.selectedParticipation[0] === '1') {
                    this.user.participation = '1';
                }
                
                if (this.selectedParticipation[0] === '2') {
                    this.user.participation = '2';
                }
            }
        }
       
    }
}
