import { Component, OnInit } from '@angular/core';
import { WorkshopService } from "app/services/workshop.service";
import { Workshop } from "app/models/workshop";

@Component( {
    selector: 'workshops',
    templateUrl: './workshops.component.html',
    styleUrls: ['./workshops.component.css']
} )
export class WorkshopsComponent implements OnInit {

    workshops: Workshop[];
    constructor( private workshopService: WorkshopService ) { }

    ngOnInit() {
        this.loadWorkshops()

        window.scrollTo( 0, 0 )
    }

    loadWorkshops() {
        this.workshopService.getWorkshops()
            .subscribe(
            workshops => this.workshops = workshops, //Bind to view
            err => {
                // Log errors if any
                console.log( err );
            } );
    }

}
