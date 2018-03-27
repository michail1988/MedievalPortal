import { Component, OnInit, Input } from '@angular/core';
import { User } from "app/models/user";
import { UserService } from "app/services/user.service";

@Component( {
    selector: 'action-admin-enrolment',
    templateUrl: './action-admin-enrolment.component.html',
    styleUrls: ['./action-admin-enrolment.component.css']
} )
export class ActionAdminEnrolmentComponent implements OnInit {

    public renderValue;

    @Input() value : User;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.renderValue = this.value;
    }

    example() {
        alert( this.value.name );
    }
    
    isAcceptationPending() {
        if ('Y' == this.value.confirmation || 'N' == this.value.confirmation) {
            return false;
        }
        
        return true;
    }
    accept() {
        //TODO refresh lub dymek
        this.userService.acceptUser( this.value ).subscribe(
                response => {


                    if ( response.text() === 'OK' ) {
                        -                    console.log( 'udalo sie accepted '  + response.text());
                        //           
                        this.value.confirmation = 'Y'
                    }
                },
                err => {
                    // Log errors if any
                    console.log( err );
                } );
    }
    
    reject() {
      //TODO refresh lub dymek
        this.userService.rejectUser( this.value ).subscribe(
                response => {


                    if ( response.text() === 'OK' ) {
                        -                    console.log( 'udalo sie rejected '  + response.text());
                        
                        this.value.confirmation = 'N'
                        //           
                    }
                },
                err => {
                    // Log errors if any
                    console.log( err );
                } );
    }
}
