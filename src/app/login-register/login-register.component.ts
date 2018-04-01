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

    types: SelectItem[];

    selectedType: string;

    universities: University[];
    results: string[];

    submitted = false;

    passwordType: string;

    user = new User( '', '', '', null, '', '', '', '', '', '', '', '', '', '', '', '', '', '' );
    repeatPassword: string; //TODO dodac walidacje
    termsAcceptation: boolean;

    loginForm;
    registerForm;

    //logowanie:
    loginEmail: string;
    password: string;

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
        return this.selectedType === 'Referent';
    }

    //TODO koniecznie jakas odpowiedz serwera
    //automatyczny login???
    registerUser() {

        this.user.registerdate = new Date();
        this.user.congressrole = this.selectedType.charAt( 0 )
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
            } );


    }


    validateRegisterForm() {
        var result = true;

        if ( this.isEmpty( this.user.email ) ) {
            result = false;
            this.registerForm.email = 'input full validationError';
        } else {
            this.registerForm.email = 'input full';
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


        if ( this.termsAcceptation != true ) {
            result = false;
            this.registerForm.terms = 'simform__actions-sidetext validationError';
        } else {
            this.registerForm.terms = 'simform__actions-sidetext';
        }

        return result;
    }

    validateLoginForm() {
        var result = true;

        if ( this.isEmpty( this.loginEmail ) ) {
            result = false;
            this.loginForm.email = 'input full validationError';
        } else {
            this.loginForm.email = 'input full';
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

    isEmpty( str ) {
        return ( !str || 0 === str.length );
    }

    incorrectLoginDataAlertVisible() {
        return this.incorrectLoginDataAlert;
    }

    noLoginRightsAlertVisible() {
        return this.noLoginRightsAlert;
    }

    navigateUser( id ) {
        this.router.navigate( ['user-profile/'] );
    }
}
