import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from "app/models/user";
import { UserService } from '../services/user.service';
import { EmitterService } from '../services/emitter.service';
import { LocalDataSource } from "ng2-smart-table/ng2-smart-table";

import { Observable } from "rxjs";


@Component( {
    selector: 'enrolments',
    templateUrl: './enrolments.component.html',
    styleUrls: ['./enrolments.component.css']
} )
export class EnrolmentsComponent implements OnInit, OnChanges {
    // Local properties
    users: User[];
    // Input properties
    @Input() listId: string;
    @Input() editId: string;

    source: LocalDataSource;

    // Constructor with injected service
    constructor( private userService: UserService ) { }

    ngOnInit() {
        // Load enrolments

        this.source = new LocalDataSource();

        this.userService.getUsers().toPromise().then(( data ) => {
            this.source.load( data );
        } );
    }

    loadAllEnrolments() {
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
        EmitterService.get( this.listId ).subscribe(( enrolments: User[] ) => { this.loadAllEnrolments() } );

    }

    settings = {
        columns: {
            name: {
                title: 'Imie'
            },
            surname: {
                title: 'Nazwisko'
            },
            email: {
                title: 'Email'
            },
            registerdate: {
                title: 'Data zgloszenia',
                type: 'html',
                valuePrepareFunction: ( value ) => {
                    return value
                }
            },
            congressrole: {
                title: 'Rola',
                type: 'html',
                valuePrepareFunction: ( value ) => {
                    if ( value === 'P' ) return 'Uczestnik';
                    if ( value === 'S' ) return 'Referant';
                    if ( value === 'O' ) return 'Organizator';
                    return ''
                }
            },
            confirmation: {
                title: 'Akceptacja',
                type: 'html',
                valuePrepareFunction: ( value ) => {
                    if ( value === 'Y' ) return 'Tak';
                    return 'Nie'
                }
            },
            action: {
                title: 'Akcja',
                type: 'html',
                valuePrepareFunction: ( cell, row ) => {
                    return '<a href="/admin-user/' + row.id + '">Edytuj</a>' + '<p> </p>' +
                        '<a href="/admin-user/' + row.id + '">Zatwierdz</a>'
                }
            }
        },
        actions: false
    };

    showAll() {        
        this.userService.getUsers().toPromise().then(( data ) => {
            this.source.load( data );
        } );
    }

    showAcepted() {
        this.userService.getAcceptedUsers().toPromise().then(( data ) => {
            this.source.load( data );
        } );
    }

    showNotAccepted() {
        this.userService.getNotAcceptedUsers().toPromise().then(( data ) => {
            this.source.load( data );
        } );
    }

    showSpeakers() {
        this.userService.getSpeakers().toPromise().then(( data ) => {
            this.source.load( data );
        } );
    }
}
