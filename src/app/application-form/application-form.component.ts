import { Component, OnInit } from '@angular/core';
import { Person } from './person';

@Component( {
    selector: 'application-form',
    templateUrl: './application-form.component.html',
    styleUrls: ['./application-form.component.css']
} )
export class ApplicationFormComponent implements OnInit {
    ngOnInit(): void {
    }


    powers = ['Really Smart', 'Super Flexible',
        'Super Hot', 'Weather Changer'];

    model = new Person( 18, 'Dr IQ', 'Norris', 'norris@kickingass.com' );

    submitted = false;

    onSubmit() { this.submitted = true; }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify( this.model ); }

}
