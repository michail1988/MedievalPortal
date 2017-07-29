import { Component, OnInit } from '@angular/core';
import { SelectItem } from "primeng/primeng";
import { UniversityService } from "app/services/university.service";
import { University } from "app/models/university";
import { Enrolment } from "app/models/enrolment";

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

    //todo zmienic na user
    enrolment = new Enrolment( '', '', '', null, '', '' );
    
    constructor( private universityService: UniversityService ) {
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

    loadUniversities() {
        // Get all enrolments
        this.universityService.getUniversities( this.enrolment.university )
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
}
