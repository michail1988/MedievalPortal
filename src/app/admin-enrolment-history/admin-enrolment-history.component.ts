import { Component, OnInit, Input } from '@angular/core';
import { UserHistory } from "app/models/user-history";

@Component( {
    selector: 'admin-enrolment-history',
    templateUrl: './admin-enrolment-history.component.html',
    styleUrls: ['./admin-enrolment-history.component.css']
} )
export class AdminEnrolmentHistoryComponent implements OnInit {

    @Input() userHistory:UserHistory[];
    constructor() { }

    ngOnInit() {
    }

}
