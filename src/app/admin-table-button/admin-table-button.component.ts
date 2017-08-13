import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component( {
    selector: 'admin-table-button',
    templateUrl: './admin-table-button.component.html',
    styleUrls: ['./admin-table-button.component.css']
} )
export class AdminTableButtonComponent implements ViewCell, OnInit {

    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    @Output() save: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.renderValue = this.value.toString().toUpperCase();
    }

    onClick() {
        this.save.emit( this.rowData );
    }

}
