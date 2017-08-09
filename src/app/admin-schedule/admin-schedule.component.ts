import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ScheduleService } from "app/services/schedule.service";
import { ConfirmationService } from "primeng/primeng";
import { EventService } from "app/services/event.service";
import { LocalDataSource } from "ng2-smart-table/ng2-smart-table";
import { Schedule } from "app/models/schedule";
import { Message } from "primeng/components/common/api";

@Component( {
    selector: 'admin-schedule',
    templateUrl: './admin-schedule.component.html',
    styleUrls: ['./admin-schedule.component.css'],
    providers: [ConfirmationService]
} )

//todo nie dziala save
export class AdminScheduleComponent implements OnInit {

    events: Event[];
    source: LocalDataSource;
    schedule: Schedule;

    msgs: Message[] = [];

    constructor( private route: ActivatedRoute,
        private router: Router, private scheduleService: ScheduleService, private eventService: EventService,
        private confirmationService: ConfirmationService ) {
    }

    ngOnInit() {
        this.route.data.subscribe(
            ( data: { schedule: Schedule } ) => {
                if ( data.schedule ) {
                    this.schedule = data.schedule;
                } else {
                    //TODO Michal error and redirect
                }
            }
        );
        
        this.source = new LocalDataSource();

        this.eventService.getEvents(this.schedule.id).toPromise().then(( data ) => {
            this.source.load( data );
        } );
    }

    settings = {
            columns: {
                from_date: {
                    title: 'Od'
                },
                to_date: {
                    title: 'Do'
                },
                title: {
                    title: 'Wydarzenie'
                },
                description: {
                    title: 'Opis'
                },
                action: {
                    title: 'Akcja',
                    type: 'html',
                    valuePrepareFunction: ( cell, row ) => {
                        return '<a href="/event-schedule/' + row.id + '">Edytuj</a>'
                    }
                }
            },
            actions: false
        };
    
    saveNew() {


        this.scheduleService.addSchedule( this.schedule ).subscribe(
            schedules => {
                // Emit list event
                //                //navigate
                //                EmitterService.get( this.listId ).emit( enrolments );
                // Empty model

                this.router.navigate( ['admin-schedules'] );

            },
            err => {
                // Log errors if any
                console.log( err );
            } );

        this.router.navigate( ['admin-schedules'] );
    }

    save() {

        this.scheduleService.updateSchedule( this.schedule ).subscribe(
            articles => {
                // Emit list event
                //                //navigate
                //                EmitterService.get( this.listId ).emit( enrolments );
                // Empty model

                this.router.navigate( ['admin-schedules'] );

            },
            err => {
                // Log errors if any
                console.log( err );
            } );

        //TODO odpowiedz i bledy
        this.router.navigate( ['admin-schedules'] );
    }

    cancel() {
        this.router.navigate( ['admin-schedules'] );
    }

    isNew() {
        return ( !this.schedule.id || 0 === this.schedule.id.length );
    }

    confirmDelete() {
        this.confirmationService.confirm( {
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];

                this.deleteSchedule();
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
            }
        } );
    }

    deleteSchedule() {
        this.scheduleService.deleteSchedule( this.schedule ).subscribe(
            articles => {
                // Emit list event
                //                //navigate
                //                EmitterService.get( this.listId ).emit( enrolments );
                // Empty model

                this.router.navigate( ['admin'] );

            },
            err => {
                // Log errors if any
                console.log( err );
            } );
    }
    
    createNew() {
        this.router.navigate( ['admin-event-new/'] );
    }

}
