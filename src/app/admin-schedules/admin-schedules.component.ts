import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from "ng2-smart-table/ng2-smart-table";

import { Router } from "@angular/router";
import { ScheduleService } from "app/services/schedule.service";

@Component( {
    selector: 'admin-schedules',
    templateUrl: './admin-schedules.component.html',
    styleUrls: ['./admin-schedules.component.css']
} )
export class AdminSchedulesComponent implements OnInit {

    source: LocalDataSource;
    constructor( private router: Router, private scheduleService: ScheduleService ) {
        this.source = new LocalDataSource();

        this.scheduleService.getSchedules().toPromise().then(( data ) => {
            this.source.load( data );
        } );
    }

    ngOnInit() {
    }

    //TODO Michal translacja przez serwis
    settings = {
        columns: {
            title: {
                title: 'Blok wydarzen'
            },
            action: {
                title: 'Akcja',
                type: 'html',
                valuePrepareFunction: ( cell, row ) => {
                    return '<a href="/admin-schedule/' + row.id + '">Edytuj</a>'
                }
            }
        },
        actions: false
    };
    
    createNew() {
        this.router.navigate(['/admin-schedule-new', {outlets: 'adminRouting'}]);
//        this.router.navigate( ['admin-schedule-new/'] );
    }

}
