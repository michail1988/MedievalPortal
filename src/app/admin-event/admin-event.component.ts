import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService } from "primeng/primeng";
import { EventService } from "app/services/event.service";
import { LocalDataSource } from "ng2-smart-table/ng2-smart-table";
import { Event } from "app/models/event";
import { Message } from "primeng/components/common/api";

@Component( {
    selector: 'admin-event',
    templateUrl: './admin-event.component.html',
    styleUrls: ['./admin-event.component.css'],
    providers: [ConfirmationService]
} )
export class AdminEventComponent implements OnInit {

    event: Event;

    msgs: Message[] = [];

    constructor( private route: ActivatedRoute,
        private router: Router, private eventService: EventService,
        private confirmationService: ConfirmationService ) { }

    ngOnInit() {
        this.route.data.subscribe(
            ( data: { event: Event } ) => {
                if ( data.event ) {
                    this.event = data.event;
                } else {
                    //TODO Michal error and redirect
                }
            }
        );
    }

    saveNew() {


        this.eventService.addEvent( this.event ).subscribe(
            schedules => {
                // Emit list event
                //                //navigate
                //                EmitterService.get( this.listId ).emit( enrolments );
                // Empty model

                this.router.navigate( ['admin-events'] );

            },
            err => {
                // Log errors if any
                console.log( err );
            } );

        this.router.navigate( ['admin-events'] );
    }

    save() {

        this.eventService.updateEvent( this.event ).subscribe(
            articles => {
                // Emit list event
                //                //navigate
                //                EmitterService.get( this.listId ).emit( enrolments );
                // Empty model

                this.router.navigate( ['admin-events'] );

            },
            err => {
                // Log errors if any
                console.log( err );
            } );

        //TODO odpowiedz i bledy
        this.router.navigate( ['admin-events'] );
    }

    cancel() {
        this.router.navigate( ['admin-events'] );
    }

    isNew() {
        return ( !this.event.id || 0 === this.event.id.length );
    }

    confirmDelete() {
        this.confirmationService.confirm( {
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];

                this.deleteEvent();
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
            }
        } );
    }

    deleteEvent() {
        this.eventService.deleteEvent( this.event ).subscribe(
            events => {
                // Emit list event
                //                //navigate
                //                EmitterService.get( this.listId ).emit( enrolments );
                // Empty model

                this.router.navigate( ['admin-events'] );

            },
            err => {
                // Log errors if any
                console.log( err );
            } );
    }
    
    
    //todo opracowac przejscie z parametrem
    navigateBack() {
        this.router.navigate(['/admin', {outlets: {adminRouting: ['admin-schedule']}}])
    }

}
