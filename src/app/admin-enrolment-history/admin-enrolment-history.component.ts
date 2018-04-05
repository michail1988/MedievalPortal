import { Component, OnInit, Input } from '@angular/core';
import { UserHistory } from "app/models/user-history";
import { SelectItem } from "primeng/primeng";

@Component( {
    selector: 'admin-enrolment-history',
    templateUrl: './admin-enrolment-history.component.html',
    styleUrls: ['./admin-enrolment-history.component.css']
} )
export class AdminEnrolmentHistoryComponent implements OnInit {

    @Input() userHistory:UserHistory[];
    
    types: SelectItem[];
    academicTitles: SelectItem[];
    academicStatuses: SelectItem[];
    
    constructor() { 
        this.types = [];
        this.types.push( { label: 'Uczestnik', value: 'Uczestnik' } );
        this.types.push( { label: 'Referent', value: 'Referent' } );
        this.types.push( { label: 'Organizator', value: 'Organizator' } );

        this.academicTitles = [];
        this.academicTitles.push( { label: 'mgr', value: '1' } );
        this.academicTitles.push( { label: 'dr', value: '2' } );
        this.academicTitles.push( { label: 'dr hab.', value: '3' } );
        this.academicTitles.push( { label: 'Profesor (stanowisko)', value: '4' } );
        this.academicTitles.push( { label: 'Profesor (tytuł)', value: '5' } );

        this.academicStatuses = [];
        this.academicStatuses.push( { label: 'Student/Doktorant', value: '1' } );
        this.academicStatuses.push( { label: 'Pracownik naukowy', value: '2' } );
    }

    ngOnInit() {
    }

}
