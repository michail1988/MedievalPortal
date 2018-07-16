import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Workshop } from "app/models/workshop";

@Component( {
    selector: 'workshop',
    templateUrl: './workshop.component.html',
    styleUrls: ['./workshop.component.css']
} )
export class WorkshopComponent implements OnInit {

    @Input() workshop: Workshop;
    constructor( private route: ActivatedRoute,
        private router: Router ) { }

    ngOnInit() {

        window.scrollTo( 0, 0 )

    }

}
