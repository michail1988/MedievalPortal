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
    types: SelectItem[];

    selectedType: string;

    universities: University[];
    results: string[];

    submitted = false;

    passwordType: string;

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify( this.user ); }

    user = new User( '', '', '', null, '', '', '', '', '', '', '', '', '' );
    repeatPassword: string; //TODO dodac walidacje

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
    submitUser() {

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
    login( event, username, password ) {

        //co to jest?
        event.preventDefault();


        this.authenticationService.login( username, password ).subscribe(
            u => this.user = u, //Bind to view
            err => {
                // Log errors if any
                console.log( "Error na poziomie authenticationService.getUser=" + err );
                console.log( "Error na poziomie err.message=" + err.message );
            } );

    }

    get diagnosticAdmin() {
        var item = localStorage.getItem( 'admintoken' );

        return 'Admin= ' + item;
    }

    get diagnosticLogin() {

        var userid = localStorage.getItem( 'userid' )
        var username = localStorage.getItem( 'username' )


        return 'Zalogowany  userid=' + userid + ' username=' + username;
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

}
