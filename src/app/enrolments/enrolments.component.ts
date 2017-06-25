import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Enrolment } from '../models/enrolment'
import { EnrolmentService } from '../services/enrolment.service';
import { EmitterService } from '../services/emitter.service';


import { Observable } from "rxjs";

@Component( {
    selector: 'app-enrolments',
    templateUrl: './enrolments.component.html',
    styleUrls: ['./enrolments.component.css']
} )
export class EnrolmentsComponent implements OnInit, OnChanges {
    // Local properties
    enrolments: Enrolment[];
    // Input properties
    @Input() listId: string;
    @Input() editId: string;

    // Constructor with injected service
    constructor(private enrolmentService: EnrolmentService) {}

    ngOnInit() {
            // Load comments
            this.loadEnrolments()
    }

    loadEnrolments() {
        // Get all enrolments
         this.enrolmentService.getEnrolments()
                           .subscribe(
                                   enrolments => this.enrolments = enrolments, //Bind to view
                                err => {
                                    // Log errors if any
                                    console.log(err);
                                });
         
         console.log(this.enrolments);
    }

    ngOnChanges(changes:any) {
        // Listen to the 'list'emitted event so as populate the model
        // with the event payload
        EmitterService.get(this.listId).subscribe((enrolments:Enrolment[]) => { this.loadEnrolments()});
    }
}
