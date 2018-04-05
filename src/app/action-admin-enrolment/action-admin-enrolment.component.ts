import { Component, OnInit, Input } from '@angular/core';
import { User } from "app/models/user";
import { UserService } from "app/services/user.service";
import { ConfirmationService } from "primeng/primeng";
import { Message } from "primeng/components/common/api";

@Component( {
    selector: 'action-admin-enrolment',
    templateUrl: './action-admin-enrolment.component.html',
    styleUrls: ['./action-admin-enrolment.component.css'],
    providers: [ConfirmationService]
} )
export class ActionAdminEnrolmentComponent implements OnInit {

    msgs: Message[] = [];

    @Input() value: User;

    constructor( private userService: UserService, private confirmationService: ConfirmationService ) { }

    ngOnInit() {
    }

    example() {
        alert( this.value.name );
    }

    isAcceptationPending() {
        if ( 'Y' == this.value.confirmation || 'N' == this.value.confirmation ) {
            return false;
        }

        return true;
    }
    
    isAccepted() {
        if ( 'Y' == this.value.confirmation ) {
            return true;
        }

        return false;
    }
    
    isRejected() {
        if ( 'N' == this.value.confirmation ) {
            return true;
        }

        return false;
    }
    
    accept() {
        //TODO refresh lub dymek
        this.userService.acceptUser( this.value ).subscribe(
            response => {


                if ( response.text() === 'OK' ) {
                    -                    console.log( 'udalo sie accepted ' + response.text() );
                    //           
                    this.value.confirmation = 'Y'
                }
            },
            err => {
                // Log errors if any
                console.log( err );
            } );
    }

    confirmReject() {
        this.confirmationService.confirm( {
            message: 'Czy na pewno chcesz odrzucic zgloszenie?',
            header: 'Potwierdz odrzucenie',
            icon: 'fa fa-trash',
            accept: () => {
                this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];

                this.reject();
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
            }
        } );
    }

    reject() {
        //TODO refresh lub dymek
        this.userService.rejectUser( this.value ).subscribe(
            response => {


                if ( response.text() === 'OK' ) {
                    -                    console.log( 'udalo sie rejected ' + response.text() );

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
