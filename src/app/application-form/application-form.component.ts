import { Component, OnInit, Input } from '@angular/core';
import { Person } from './person';
import { Enrolment } from '../models/enrolment'
import { EnrolmentService } from '../services/enrolment.service';
import { Observable } from 'rxjs/Rx';
import { EmitterService } from "app/services/emitter.service";

import { AutoCompleteModule } from 'primeng/primeng';
import { University } from "../models/university";
import { UniversityService } from "app/services/university.service";

@Component( {
    selector: 'application-form',
    templateUrl: './application-form.component.html',
    styleUrls: ['./application-form.component.css']
} )
//https://www.primefaces.org/primeng/#/autocomplete
export class ApplicationFormComponent implements OnInit {
    ngOnInit(): void {
    }

    @Input() listId: string;
    @Input() editId: string;

    universities: University[];

    constructor( private enrolmentService: EnrolmentService, private universityService: UniversityService ) {
    }

    submitted = false;

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify( this.enrolment ); }

    enrolment = new Enrolment( '', '', '', null, '', '' );


    submitEnrolment() {

        this.enrolment.date = new Date();
        this.enrolmentService.addEnrolment( this.enrolment ).subscribe(
            response => {


                if ( response.text() === 'OK' ) {
                    -                    console.log( 'udalo sie '  + response.text());
                    //           
                    this.submitted = true;
                    //                    -                    this.router.navigate( ['admin'] );
                }
            },
            err => {
                // Log errors if any
                console.log( err );
            } );


    }

    newEnrolment() {
        this.enrolment = new Enrolment( '', '', '', null, '', '' );
        this.submitted = false;
    }

    //TODO Michal usun to
    val1: string;
    abstrakt: string;
    text: string;

    results: string[];

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
        //        EmitterService.get( this.listId ).subscribe(( universities: University[] ) => { this.loadUniversities() } );


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
