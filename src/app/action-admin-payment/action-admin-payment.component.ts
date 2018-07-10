import { Component, OnInit, Input } from '@angular/core';
import { User } from "app/models/user";
import { UserService } from "app/services/user.service";
import { ConfirmationService } from "primeng/primeng";
import { Message } from "primeng/components/common/api";

@Component( {
    selector: 'action-admin-payment',
    templateUrl: './action-admin-payment.component.html',
    styleUrls: ['./action-admin-payment.component.css'],
    providers: [ConfirmationService]
} )
export class ActionAdminPaymentComponent implements OnInit {

    msgs: Message[] = [];

    @Input() value: User;

    constructor( private userService: UserService, private confirmationService: ConfirmationService ) { }

    ngOnInit() {
    }
    
    isPaymentAccepted() {
        if ( 'Y' == this.value.payment_accepted ) {
            return true;
        }

        return false;

    }
    
    isPaymentAcceptationPending() {
        if ( 'Y' == this.value.payment_accepted ) {
            return false;
        }

        return true;
    }

    acceptPayment() {
        //TODO refresh lub dymek
        this.userService.acceptPayment( this.value ).subscribe(
            response => {


                if ( response.text() === 'OK' ) {
                    -                    console.log( 'udalo sie accepted ' + response.text() );
                    //           
                    this.value.payment_accepted = 'Y'
                }
            },
            err => {
                // Log errors if any
                console.log( err );
            } );
    }
    
    confirmPaymentReject() {
        this.confirmationService.confirm( {
            message: 'Czy na pewno chcesz anulowac status platnosci?',
            header: 'Potwierdz odrzucenie',
            icon: 'fa fa-trash',
            accept: () => {
                this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Status anulowany' }];

                this.rejectPayment();
            },
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'Anulowano' }];
            }
        } );
    }
    
    rejectPayment() {
        //TODO refresh lub dymek
        this.userService.rejectPayment( this.value ).subscribe(
            response => {


                if ( response.text() === 'OK' ) {
                    -                    console.log( 'udalo sie rejected ' + response.text() );

                    this.value.payment_accepted = 'N'
                    //           
                }
            },
            err => {
                // Log errors if any
                console.log( err );
            } );
    }
}
