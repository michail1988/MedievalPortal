import { Component, OnInit, Input } from '@angular/core';
import { Enrolment } from '../models/enrolment'
import { EnrolmentService } from '../services/enrolment.service';
import { EmitterService } from '../services/emitter.service';

@Component( {
    selector: 'app-enrolments',
    templateUrl: './enrolments.component.html',
    styleUrls: ['./enrolments.component.css']
} )
export class EnrolmentsComponent implements OnInit {

    constructor(
        private enrolmentService: EnrolmentService
    ) { }

    ngOnInit() {
    }

 // Define input properties
    @Input() enrolment: Enrolment;
    @Input() listId: string;
    @Input() editId:string;
    
    response;
    helloWorldRespone : string;
    getHelloResponse() {
        this.response = this.enrolmentService.getHello();
    }
    
    
    getEnrolments(id:string) {
        // Call removeComment() from CommentService to delete comment
        this.enrolmentService.getEnrolments().subscribe(
                                enrolments => {
                                    // Emit list event
                                    EmitterService.get(this.listId).emit(enrolments);
                                }, 
                                err => {
                                    // Log errors if any
                                    console.log(err);
                                });
    }
}
