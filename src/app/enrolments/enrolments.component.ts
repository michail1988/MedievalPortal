import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from "app/models/user";
import { UserService } from '../services/user.service';
import { EmitterService } from '../services/emitter.service';


import { Observable } from "rxjs";


@Component( {
    selector: 'app-enrolments',
    templateUrl: './enrolments.component.html',
    styleUrls: ['./enrolments.component.css']
} )
export class EnrolmentsComponent implements OnInit, OnChanges {
    // Local properties
    users: User[];
    // Input properties
    @Input() listId: string;
    @Input() editId: string;

    // Constructor with injected service
    constructor( private userService: UserService ) { }

    ngOnInit() {
        // Load enrolments
        this.loadEnrolments()
    }

    loadEnrolments() {
        // Get all enrolments
        this.userService.getUsers()
            .subscribe(
            enrolments => this.users = enrolments, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );
    }

    ngOnChanges( changes: any ) {
        // Listen to the 'list'emitted event so as populate the model
        // with the event payload
        EmitterService.get( this.listId ).subscribe(( enrolments: User[] ) => { this.loadEnrolments() } );

    }
}
