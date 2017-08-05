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
    selector: 'app-login-register',
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

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify( this.user ); }

    user = new User( '', '', '', null, '', '', '', '', '', '', '', '', '' );
    repeatPassword: string; //TODO dodac walidacje

    constructor( private userService: UserService, private universityService: UniversityService,
        private authenticationService: AuthenticationService, public router: Router ) {
        this.loginTabVisible = false;
        this.speakerPartsVisible = false;

        this.types = [];
        this.types.push( { label: 'Participant', value: 'Participant' } );
        this.types.push( { label: 'Speaker', value: 'Speaker' } );
        this.types.push( { label: 'Organizer', value: 'Organizer' } );

        this.selectedType = 'Participant';
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
        return this.selectedType === 'Speaker';
    }

    //TODO koniecznie jakas odpowiedz serwera
    submitUser() {

        this.user.registerdate = new Date();
        this.user.congressrole = this.selectedType.charAt( 0 )
        this.userService.addUser( this.user ).subscribe(
            enrolments => {
                //                // Emit list event
                //                EmitterService.get( this.listId ).emit( enrolments );
                //                // Empty model
                //TODO success

            },
            err => {
                // Log errors if any
                console.log( err );
            } );

        this.submitted = true;
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
        

        this.authenticationService.getUser( username, password ).subscribe(
              enrolments => this.user = enrolments, //Bind to view
              err => {
                  // Log errors if any
                  console.log( "Error na poziomie authenticationService.getUser=" + err);
                  console.log( "Error na poziomie err.message=" + err.message);
              } );
        
        localStorage.setItem('logged', JSON.stringify(this.user))
        var item = localStorage.getItem( 'logged' );
        
        this.user = JSON.parse(item)
        console.log("this.item=" +  item)
        console.log("this.user=" +  this.user)
        console.log("s=" +  JSON.stringify(this.user))
        
        
        var currentUser = localStorage.getItem( 'currentUser' );
        console.log("Pobieram current user")
        console.log("currentUser stringify=" +  JSON.stringify(currentUser))
        console.log("currentUser=" +  currentUser)
        
        
        //zaloguj
        localStorage.setItem('token', JSON.stringify(this.user))
        
    }

    get diagnosticLogin() {
        var item = localStorage.getItem( 'token' );

        return 'Zalogowany= ' + item;
    }

    get diagnosticUser() {
        var item = localStorage.getItem( 'token' );

        return 'Zalogowany= ' + item;
    }

    
    logout() {
        this.authenticationService.logout();
    }
}
